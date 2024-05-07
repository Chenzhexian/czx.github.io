import {defineUserConfig} from "vuepress";
import { defaultTheme } from '@vuepress/theme-default';
import navbar from "./navbarConfig";
import sidebar from "./sidebarConfig";
import { docsearchPlugin } from '@vuepress/plugin-docsearch';
import { viteBundler } from '@vuepress/bundler-vite';
export default defineUserConfig({
    base: "/note/",
    title: "czx的笔记",
    description: "爱看不看不看拉倒",
    lang: 'zh-CN',
    head: [
        ['link', {rel: 'icon', href: 'https://czxcab.cn/file/myblog/me.jpg'}],
        ['meta', {name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no'}]
    ],
    bundler: viteBundler({
        // vite bundler options here
    }),
    plugins: [
        docsearchPlugin({
            appId: 'IL1ZJG41IK',
            apiKey: 'ec181693e7b08f078c69f2f1a4030565',
            indexName: 'czxcabcn',
            locales: {
                '/': {
                    placeholder: '搜索文档',
                    translations: {
                        button: {
                            buttonText: '搜索文档',
                        },
                    },
                }
            },
        }),
    ],
    // 主题配置
    theme: defaultTheme({
        navbar: navbar,
        sidebar: sidebar,
        lastUpdatedText: "最近更新",
    }),
});
