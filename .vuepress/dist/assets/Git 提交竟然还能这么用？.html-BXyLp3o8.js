import{_ as s,r as c,o as l,c as r,a as t,b as e,d as i,e as n}from"./app-CzSBTTj3.js";const p={},o=n('<h1 id="git-提交竟然还能这么用" tabindex="-1"><a class="header-anchor" href="#git-提交竟然还能这么用"><span>Git 提交竟然还能这么用？</span></a></h1><p>Git 是主流的代码版本控制系统，是团队协作开发中必不可少的工具。</p><p>这篇文章，主要是给大家分享 Git 的核心功能 <code>提交</code>（Commit）的作用，帮助大家更好地利用 Git 这一工具来提高自己的开发工作效率。</p><h2 id="什么是-git-提交" tabindex="-1"><a class="header-anchor" href="#什么是-git-提交"><span>什么是 Git 提交？</span></a></h2><p>Git 提交是指将你的代码保存到 Git 本地存储库，就像用 Word 写长篇论文时进行保存文件一样。每次 Git 提交时都会创建一个唯一的版本，除了记录本次新增或发生修改的代码外，还可以包含提交信息，来概括自己这次提交的改动内容。</p><p>如下图，就是一次 Git 提交：</p><p><img src="https://czxcab.cn/file/docs/git1.jpg" alt="图片"></p><h2 id="git-提交的作用" tabindex="-1"><a class="header-anchor" href="#git-提交的作用"><span>Git 提交的作用</span></a></h2><p>Git 提交有很多作用，我将它分为 <strong>基础用法</strong> 和 <strong>其他妙用</strong> 。</p><h3 id="基本作用" tabindex="-1"><a class="header-anchor" href="#基本作用"><span>基本作用</span></a></h3><h4 id="历史记录" tabindex="-1"><a class="header-anchor" href="#历史记录"><span>历史记录</span></a></h4><p>Git 提交最基本的作用就是维护项目的历史记录。每次提交都会记录代码库的状态，包括文件的添加、修改和删除；还包括一些提交信息，比如提交时间、描述等。这使得我们可以通过查看所有的历史提交来追溯项目的开发进度和历程，了解每个提交中都发生了什么变化。</p><p>在企业开发中，如果一个人写了 Bug，还死不承认，那么就可以搬出 Git 提交记录，每一行代码是谁提交的都能很快地查出来，谨防甩锅！</p><h4 id="版本控制" tabindex="-1"><a class="header-anchor" href="#版本控制"><span>版本控制</span></a></h4><p>另一个 Git 提交的基本作用是版本控制。每个提交都代表了代码库的一个版本，这意味着开发者可以随时切换代码版本进行开发，恢复旧版本的代码、或者撤销某次提交的代码改动。</p><p>推荐新手使用可视化工具而不是 Git 命令进行版本的切换和撤销提交，在不了解 Git 工作机制的情况下使用命令操作很容易出现问题。</p><p>如下图，在 JetBrains 系列开发工具中，右键某个提交，就可以切换版本或撤销提交了：</p><p><img src="https://czxcab.cn/file/docs/git2.jpg" alt="图片"></p><h4 id="代码对比" tabindex="-1"><a class="header-anchor" href="#代码对比"><span>代码对比</span></a></h4><p>你可以轻松地查看两个提交之间的所有代码更改，便于快速了解哪些部分发生了变化。这对于解决代码冲突、查找错误或审查代码非常有帮助。</p><p>在 JetBrains 系列开发工具中，只需要选中 2 个提交，然后点右键，选择 <code>Compare Versions</code> 就能实现代码对比了：</p><p><img src="https://czxcab.cn/file/docs/git3.jpg" alt="图片"></p><p>改动了哪些代码一目了然：</p><p><img src="https://czxcab.cn/file/docs/git4.jpg" alt="图片"></p><p>一般情况下，如果我们因为某次代码改动导致项目出现了新的 Bug。通过这种方式对比本次改动的所有代码，很快就能发现 Bug 出现的原因了。</p><h3 id="其他妙用" tabindex="-1"><a class="header-anchor" href="#其他妙用"><span>其他妙用</span></a></h3><p>除了基本作用外，Git 提交还有一些妙用~</p><h4 id="记录信息" tabindex="-1"><a class="header-anchor" href="#记录信息"><span>记录信息</span></a></h4><p>像上面提到的，Git 提交不仅能用于记录代码更改，我们还可以在提交信息中包含有关这次更改的重要信息。比如本次改动代码的介绍、代码更改的原因、相关的任务（需求单）或功能等。可以简单理解为给本次工作写总结和描述。</p><p>如果提交信息编写得非常清晰完善，那么项目的团队成员可以更容易地理解每个提交，甚至能做到 “提交即文档”，提高协作和项目维护效率。</p><p>这里给大家推荐一种很常用的提交信息规范 —— 约定式提交，每次提交信息都需要遵循以下的结构：</p>',31),d={href:"https://www.conventionalcommits.org/zh-hans/v1.0.0/",target:"_blank",rel:"noopener noreferrer"},h=n(`<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&lt;类型&gt;[可选 范围]: &lt;描述&gt;

[可选 正文]

[可选 脚注]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://czxcab.cn/file/docs/git5.jpg" alt="图片"></p><p>当然，这种方式有利有弊，可能有同学会觉得 “我注释都懒得写，你还让我写提交信息？” 这取决于你们项目的规模和紧急程度等因素，反正团队内部保持一致就好。</p><h4 id="自动化构建部署" tabindex="-1"><a class="header-anchor" href="#自动化构建部署"><span>自动化构建部署</span></a></h4><p>大厂研发流程中，一般都是使用 CI / CD（持续集成和持续部署）平台，以流水线的形式自动构建部署项目的。</p><p>Git 提交可以和 CI / CD 平台进行集成，比如自动监视代码库中的提交，并在每次提交后自动触发构建和部署任务。一个典型的使用场景是，每次代码开发完成后，先提交代码到测试分支，然后 CI / CD 平台监测到本次提交，并立即在测试环境中构建和部署，而不需要人工操作，从而提交效率。</p><p>GitHub Actions 和 GitHub Webhooks 都可以实现上述功能，感兴趣的同学可以尝试下。</p>`,7),g={href:"https://docs.github.com/zh/actions/quickstart",target:"_blank",rel:"noopener noreferrer"},m=t("p",null,[t("img",{src:"https://czxcab.cn/file/docs/git6.jpg",alt:"图片"})],-1),u=t("h2",{id:"实践",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#实践"},[t("span",null,"实践")])],-1),_=t("p",null,"以上就是本次分享，Git 提交的实践其实非常简单，我建议大家每次做新项目时，无论大小，都用 Git 来托管你的项目，并且每开发完一个功能或解决 Bug，都进行一次提交。等项目完成后回过头来看这些提交记录，都是自己宝贵的财富。",-1);function b(G,f){const a=c("ExternalLinkIcon");return l(),r("div",null,[o,t("blockquote",null,[t("p",null,[e("《约定式提交》文档："),t("a",d,[e("https://www.conventionalcommits.org/zh-hans/v1.0.0/"),i(a)])])]),h,t("blockquote",null,[t("p",null,[e("GitHub Actions 文档教程："),t("a",g,[e("https://docs.github.com/zh/actions/quickstart"),i(a)])])]),m,u,_])}const v=s(p,[["render",b],["__file","Git 提交竟然还能这么用？.html.vue"]]),k=JSON.parse('{"path":"/docs/knowledgeShard/Git%20%E6%8F%90%E4%BA%A4%E7%AB%9F%E7%84%B6%E8%BF%98%E8%83%BD%E8%BF%99%E4%B9%88%E7%94%A8%EF%BC%9F.html","title":"Git提交","lang":"zh-CN","frontmatter":{"title":"Git提交"},"headers":[{"level":2,"title":"什么是 Git 提交？","slug":"什么是-git-提交","link":"#什么是-git-提交","children":[]},{"level":2,"title":"Git 提交的作用","slug":"git-提交的作用","link":"#git-提交的作用","children":[{"level":3,"title":"基本作用","slug":"基本作用","link":"#基本作用","children":[]},{"level":3,"title":"其他妙用","slug":"其他妙用","link":"#其他妙用","children":[]}]},{"level":2,"title":"实践","slug":"实践","link":"#实践","children":[]}],"git":{"updatedTime":1715061248000,"contributors":[{"name":"czx","email":"2504058202@qq.com","commits":1}]},"filePathRelative":"docs/knowledgeShard/Git 提交竟然还能这么用？.md"}');export{v as comp,k as data};
