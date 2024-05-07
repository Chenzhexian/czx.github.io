export default [
    {
        text: '首页',
        link: '/',
    },
    {
        text: '技术文档',
        children: [
            {
                text: '常用工具',
                children: [
                    '/docs/technicalDocument/常用工具/Stream流式编程.md',
                    '/docs/technicalDocument/常用工具/IDEA常用技巧.md',
                    '/docs/technicalDocument/常用工具/log日志快速定位.md',
                    '/docs/technicalDocument/常用工具/linux常用命令.md',
                    '/docs/technicalDocument/常用工具/常用工具网站.md',
                ],
            },
            {
                text: '部署相关',
                children: [
                    '/docs/technicalDocument/部署相关/frp内网穿透.md',
                    '/docs/technicalDocument/部署相关/minio安装使用.md',
                    '/docs/technicalDocument/部署相关/yarn2.0+版本安装.md',
                    '/docs/technicalDocument/部署相关/Windows系统后台运行服务.md',
                ],
            },
        ]
    },
    {
        text: '知识碎片',
        link: '/docs/knowledgeShard/',
    },
    {
        text: '阅读笔记',
        link: '/docs/readNote/',
    },
    {
        text: '公考资料',
        children: [
            {
                text: '公基',
                children: [
                    '/docs/shangan/公基/哲学.md',
                    '/docs/shangan/公基/中共党史.md',
                    '/docs/shangan/公基/宪法.md',
                    '/docs/shangan/公基/刑法.md',
                    '/docs/shangan/公基/民法.md',
                    '/docs/shangan/公基/行政法.md',
                    '/docs/shangan/公基/公务员法.md',
                    '/docs/shangan/公基/经济.md',
                    '/docs/shangan/公基/公文知识.md',
                ],
            },
            {
                text: '行测',
                children: [
                    '/docs/shangan/行测/判断.md',
                ],
            },
        ]
    },
    {
        text: '留言板',
        link: 'https://czxcab.cn/message',
    },
    {
        text: 'GitHub',
        link: 'https://github.com/Chenzhexian',
    },
    {
        text: 'Gitee',
        link: 'https://gitee.com/chenzhexian',
    },
];
