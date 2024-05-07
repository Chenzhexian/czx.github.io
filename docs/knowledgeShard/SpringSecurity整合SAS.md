---
title: SpringSecurity整合SAS
---

## 背景
升级到SpringBoot3.x版本后SpringSecurity也对应升级到了6.x的版本，我们可以从[迁移文档](https://github.com/spring-projects/spring-security/wiki/OAuth-2.0-Migration-Guide)中看到，SpringSecurity5.2.x版本后Oauth2模块已经被移除，取而代之的是一个新的项目SAS（Spring Authorization Server）

Spring Authorization Server官方文档：[https://spring.io/projects/spring-authorization-server](https://spring.io/projects/spring-authorization-server)

## demo地址
基于SpringBoot3.2.2版本搭建了一个Oauth2认证授权的demo，我放到了gitee上了

项目地址：[https://gitee.com/chenzhexian/oauth2-sso-demo](https://gitee.com/chenzhexian/oauth2-sso-demo)

## 前置知识
### spring security
这个大家可以自己去b站找视频看，这里推荐up主三更的视频，[视频链接](https://www.bilibili.com/video/BV1mm4y1X7Hc/?spm_id_from=333.337.search-card.all.click)

讲的很清楚很适合小白，我也会出一个文档方便大家学习

### Oauth2
OAuth 2.0（Open Authorization 2.0）是一种授权协议，用于授权第三方应用程序访问用户资源，而不必暴露用户的凭证。OAuth 2.0 的设计目标是为互联网上的客户端提供一种简单而标准的方法，以便安全地访问受保护的资源。

[Oauth2协议文档](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-10)

#### 核心角色
- 资源所有者（RO）：
  - 定义： 有权授予对受保护资源的访问的实体。当资源所有者是一个人时，称为最终用户。有时简称为 "RO"。
  - 解释： 资源所有者是对特定资源的访问具有控制权的实体。在 OAuth 的上下文中，这可能是一个有权决定是否允许对其受保护资源进行访问的个人用户（最终用户）。

- 资源服务器（RS）：
  - 定义： 托管受保护资源的服务器，能够使用访问令牌接受和响应受保护资源的请求。资源服务器通常通过 API 可访问。有时简称为 "RS"。
  - 解释： 资源服务器负责托管和管理受保护资源。它接收来自客户端的请求，其中包括访问令牌，并验证这些令牌，以确定客户端是否具有访问所请求资源的必要权限。

- 客户端（Client）：
  - 定义： 代表资源所有者请求受保护资源并经其授权的应用程序。术语 "客户端" 不涉及任何特定的实现特征（例如，应用程序是否在服务器、桌面或其他设备上执行）。
  - 解释： 客户端是代表资源所有者请求对资源的访问的应用程序。这可以是移动应用、Web 应用程序或任何需要与受保护资源交互的软件。客户端获取资源所有者的授权，以访问这些资源。

- 授权服务器（AS）：
  - 定义： 在成功验证资源所有者并获得授权后，向客户端发放访问令牌的服务器。
  - 解释： 授权服务器负责验证资源所有者并对客户端进行授权。一旦授权被授予，授权服务器将发放访问令牌给客户端。然后客户端使用这些访问令牌访问资源服务器上的受保护资源。

![](https://czxcab.cn/file/docs/sas1.jpg)


#### 授权模式
- 授权码模式（`authorization_code`）：最正规的模式，客户端先将用户导向认证服务器，登录后获取授权码，然后进行授权，最后根据授权码获取访问令牌
- 刷新模式（`refresh_token`）：用刷新码获取
- 客户端模式（`client_credentials`）：第三方应用自己本身需要获取资源
- 密码模式（`resource owner password credentials`）：直接带用户名和密码去向认证服务器申请令牌

:::warning 注意
密码模式由于安全性问题已经被弃用了
:::

这边主要讲一下授权码模式，先来看一下文档给的流程图

![](https://czxcab.cn/file/docs/sas2.jpg)

1. Client Registration (客户端注册):
   - 客户端（应用程序）在授权服务器注册，并获得一个唯一的客户端标识符（Client Identifier）和可重定向的URI（Redirection URI）。

2. User Authentication (用户身份验证):
   - 用户代理（通常是用户的浏览器）通过客户端提供的重定向URI将用户导向授权服务器。用户在授权服务器上进行身份验证。

3. Authorization Grant (授权授予):
   - 用户授权成功后，授权服务器将生成一个授权码，并将其发送回客户端提供的重定向URI。这个授权码是客户端获取访问令牌的凭证。

4. Token Request (令牌请求):
   - 客户端使用先前获得的授权码向授权服务器请求访问令牌。为了进行这个请求，客户端需要提供其客户端标识符、客户端密钥和授权码等信息。

5. Access Token Response (访问令牌响应):
   - 如果所有信息都有效，授权服务器将颁发访问令牌给客户端。此时，客户端可以使用访问令牌来访问资源服务器上受保护的资源。


#### 认证方式
- `client_secret_basic`：最常用，客户端的 client_id 和 client_secret，传递给授权服务器
- `client_secret_post`：常用，客户端的 client_id 和 client_secret，传递给授权服务器，参数传递方式不同
- `client_secret_jwt`：利用 JWT 进行认证
- `private_key_jwt`：方式就是利用 JWT 进行认证。请求方拥有自己的公私钥（密钥对）

## 官方demo
了解完上面的前置知识，我们开始搭建项目，首先按照官方文档来个快速入门的demo，进入[官方文档](https://docs.spring.io/spring-authorization-server/reference/getting-started.html)，可以看到我们只需要引入依赖并进行配置即可实现

![](https://czxcab.cn/file/docs/sas3.jpg)

使用idea快速搭建一个SpringBoot项目，版本选择`3.2.2`版本，依赖配置如下:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.2</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>org.czx</groupId>
    <artifactId>oauth2-sso-demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>pom</packaging>
    <name>oauth2-sso-demo</name>
    <description>oauth2-sso-demo</description>
    <modules>
        <module>auth-server</module>
        <module>resource-server-one</module>
        <module>resource-server-two</module>
        <module>auth-server-plus</module>
    </modules>
    <properties>
        <java.version>17</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>com.alibaba.fastjson2</groupId>
            <artifactId>fastjson2</artifactId>
            <version>2.0.40</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

### 授权服务
上面这个是父模块，下面的子模块作为我们的实际项目，然后我们创建一个子模块`auth-server`，也就是我们的授权服务器，maven配置如下:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.czx</groupId>
        <artifactId>oauth2-sso-demo</artifactId>
        <version>0.0.1-SNAPSHOT</version>
    </parent>

    <artifactId>auth-server</artifactId>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-oauth2-authorization-server</artifactId>
        </dependency>
    </dependencies>
</project>
```
搭建好后整体项目结构如下:

![](https://czxcab.cn/file/docs/sas4.jpg)
#### 配置
两种方式:
1. yml配置文件直接配置相关参数
2. 创建配置类进行配置

> 这里我们使用配置类的形式，这样能更好理解相关配置，yml配置文件也会给出来，也是直接修改官方文档里的配置

##### yml配置
```yaml
server:
  port: 3000

logging:
  level:
    org.springframework.security: trace

spring:
  security:
    user:
      name: user1
      password: password
    oauth2:
      authorizationserver:
        client:
          messaging-client:
            registration:
              client-id: "test"
              client-secret: "{noop}test"
              client-authentication-methods:
                - "client_secret_basic"
              authorization-grant-types:
                - "authorization_code"
                - "refresh_token"
                - "client_credentials"
              redirect-uris:
                - "http://baidu.com"
              post-logout-redirect-uris:
                - "http://baidu.com"
              scopes:
                - "openid"
                - "profile"
                - "message.read"
                - "message.write"
            require-authorization-consent: true
```

##### 配置类
```java
package org.czx.auth.config;

/**
 * @Author: czx
 * @Date: 2024-02-04 15:41
 * @Description:
 */
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.UUID;

import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.MediaType;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.OidcScopes;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.server.authorization.client.InMemoryRegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.oauth2.server.authorization.settings.AuthorizationServerSettings;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.util.matcher.MediaTypeRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    @Order(1)
    public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http)
            throws Exception {
        OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);
        http.getConfigurer(OAuth2AuthorizationServerConfigurer.class)
                .oidc(Customizer.withDefaults());	// Enable OpenID Connect 1.0
        http
                // Redirect to the login page when not authenticated from the
                // authorization endpoint
                .exceptionHandling((exceptions) -> exceptions
                        .defaultAuthenticationEntryPointFor(
                                new LoginUrlAuthenticationEntryPoint("/login"),
                                new MediaTypeRequestMatcher(MediaType.TEXT_HTML)
                        )
                )
                // Accept access tokens for User Info and/or Client Registration
                .oauth2ResourceServer((resourceServer) -> resourceServer
                        .jwt(Customizer.withDefaults()));

        return http.build();
    }

    @Bean
    @Order(2)
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http)
            throws Exception {
        http
                .authorizeHttpRequests((authorize) -> authorize
                        .anyRequest().authenticated()
                )
                // Form login handles the redirect to the login page from the
                // authorization server filter chain
                .formLogin(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails userDetails = User.withDefaultPasswordEncoder()
                .username("user")
                .password("password")
                .roles("USER")
                .build();

        return new InMemoryUserDetailsManager(userDetails);
    }

    @Bean
    public RegisteredClientRepository registeredClientRepository() {
        RegisteredClient oidcClient = RegisteredClient.withId(UUID.randomUUID().toString())
                .clientId("test")
                .clientSecret("{noop}test")
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                .redirectUri("http://baidu.com")
                .postLogoutRedirectUri("http://baidu.com")
                .scope(OidcScopes.OPENID)
                .scope(OidcScopes.PROFILE)
                .scope("message.read")
                .scope("message.write")
                .clientSettings(ClientSettings.builder().requireAuthorizationConsent(true).build())
                .build();

        return new InMemoryRegisteredClientRepository(oidcClient);
    }

    @Bean
    public JWKSource<SecurityContext> jwkSource() {
        KeyPair keyPair = generateRsaKey();
        RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
        RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();
        RSAKey rsaKey = new RSAKey.Builder(publicKey)
                .privateKey(privateKey)
                .keyID(UUID.randomUUID().toString())
                .build();
        JWKSet jwkSet = new JWKSet(rsaKey);
        return new ImmutableJWKSet<>(jwkSet);
    }

    private static KeyPair generateRsaKey() {
        KeyPair keyPair;
        try {
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            keyPair = keyPairGenerator.generateKeyPair();
        }
        catch (Exception ex) {
            throw new IllegalStateException(ex);
        }
        return keyPair;
    }

    @Bean
    public JwtDecoder jwtDecoder(JWKSource<SecurityContext> jwkSource) {
        return OAuth2AuthorizationServerConfiguration.jwtDecoder(jwkSource);
    }

    @Bean
    public AuthorizationServerSettings authorizationServerSettings() {
        return AuthorizationServerSettings.builder().build();
    }

}
```

**重要组件**
> - `SecurityFilterChain` -> authorizationServerSecurityFilterChain: Spring Security的过滤器链，用于协议端点的。
> - `SecurityFilterChain` -> defaultSecurityFilterChain： Spring Security的过滤器链，用于Spring Security的身份认证
> - `UserDetailsService` ：主要进行用户身份验证
> - `RegisteredClientRepository`：主要用于管理客户端
> - `JWKSource`：用于签名访问令牌
> - `KeyPair`： 启动时生成的带有密钥的KeyPair实例，用于创建上面的JWKSource
> - `JwtDecoder`：JwtDecoder的一个实例，用于解码已签名的访问令牌
> - `AuthorizationServerSettings`：用于配置Spring Authorization Server的AuthorizationServerSettings实例。

#### 测试
##### 访问授权服务
为了方便测试，上面的配置中，客户端的回调地址我已经改成了百度的，我的端口是3000，授权方式用授权码模式，认证方式用`client_secret_basic`

使用游览器访问地址:
[http://127.0.0.1:3000/oauth2/authorize?client_id=test&response_type=code&scope=openid&redirect_uri=http://baidu.com](http://127.0.0.1:3000/oauth2/authorize?client_id=test&response_type=code&scope=openid&redirect_uri=http://baidu.com)

> 参数说明:
> - `response_type`：这个意思是相应的方式为code码
> - `client_id`：即客户端的id，即上面配置中在RegisteredClientRepository配置的
> - `scope`：请求授权范围，也需要在上面的配置中
> - `redirect_uri`：授权通过后，重定向回来的地址

请求后会跳转到默认的登录页面，我们进行登录，账号密码就是配置类中userDetailsService里的账号密码

![](https://czxcab.cn/file/docs/sas5.jpg)

登录后就会回调到百度地址，可以发现跳转的链接后面带上了`code`值

![](https://czxcab.cn/file/docs/sas6.jpg)

##### 获取access_token
**请求地址**: [http://127.0.0.1:3000/oauth2/token](http://127.0.0.1:3000/oauth2/token)

**请求类型**: POST

**请求体**: application/x-www-form-urlencoded

![](https://czxcab.cn/file/docs/sas7.jpg)

> 参数说明
> - `grant_type`：即授权方式，authorization_code即授权码模式
> - `code`：即授权码，上面重定向到百度给我们的授权码
> - `redirect_uri`：重定向的url

**请求头**: `Authorization` 值 `Basic dGVzdDp0ZXN0`

![](https://czxcab.cn/file/docs/sas8.jpg)

> 参数说明
> - `Authorization`： 将 `clientId` 和 `clientSecret` 通过 ‘:’ 号拼接，并使用 Base64 进行编码得到一串字符，再在前面加个`Basic `前缀（Basic后有一个空格）

:::warning 注意
这种认证方式是`client_secret_basic`，如果使用`client_secret_post`就直接将clientId 和 clientSecret 放到表单去发送请求
:::

![](https://czxcab.cn/file/docs/sas9.jpg)

### 资源服务
我们创建一个子模块`resource-server-two`，也就是我们的授权服务器，maven配置如下:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.czx</groupId>
        <artifactId>oauth2-sso-demo</artifactId>
        <version>0.0.1-SNAPSHOT</version>
    </parent>

    <artifactId>resource-server-two</artifactId>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
        </dependency>
    </dependencies>
</project>
```

#### 配置
资源服务的配置相对简单，重点配置在yml文件里

##### yml配置文件
```yaml
server:
  port: 3002

logging:
  level:
    root: INFO
    org.springframework.web: INFO
    org.springframework.security: trace
    org.springframework.security.oauth2: trace

spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: http://127.0.0.1:3000
```
##### 配置类
```java
package org.czx.resource2.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@EnableMethodSecurity
@Configuration(proxyBeanMethods = false)
public class ResourceServer2Config {
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
				.authorizeHttpRequests(authorizeHttpRequest->
						authorizeHttpRequest.anyRequest().authenticated())
				.oauth2ResourceServer(oauth->
						oauth.jwt(Customizer.withDefaults()));
		return http.build();
	}
}
```

#### 测试
写一个测试的接口，使用`@PreAuthorize`注解配置接口访问权限，需要有message.read的应用范围
```java
@RestController
public class TestController {
	@GetMapping("/test")
	@PreAuthorize("hasAuthority('SCOPE_message.read')")
	public String getMessages() {
		return "测试";
	}
}
```

然后我们重复上面的[访问授权服务](#访问授权服务)，但是要注意`scope`这个参数要变为`message.read`，然后接下来的流程就和上面一样了，直到我们获取到`access_token`后，我们调用我们的测试接口

![](https://czxcab.cn/file/docs/sas11.jpg)

请求头: `Authorization`值 `Bearer access_token`，将获取的access_token放入请求头，前面加上`Bearer `，注意Bearer后面有个空格

上面有提到把`scope`换成message.read，如果我们没有换还是使用openid，那么就会报下面拒绝访问的错误

![](https://czxcab.cn/file/docs/sas12.jpg)
