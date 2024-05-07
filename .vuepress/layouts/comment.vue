<template>
    <div class="gitalk-container">
        <div id="gitalk-container"></div>
    </div>
</template>
<script setup>
import {onMounted} from 'vue';

onMounted(() => {
    let body = document.querySelector('.gitalk-container');
    let script = document.createElement('script');

    // 使用可选链 (?.) 或条件检查来确保对象存在
    script.src = 'https://czxcab.cn/file/docs/gitalk.min.js';
    body?.appendChild(script);

    script?.addEventListener('load', () => {
        const indexHtml = location.href.indexOf(".html");
        let id;
        if (indexHtml !== -1) {
            id = location.href.substring(Math.max(0, indexHtml - 50), indexHtml);
        } else {
            id = location.href.substring(Math.max(0, location.href.length - 50));
        }

        const commentConfig = {
            clientID: '98d89f5a741c2932b4b3',
            clientSecret: '78b8a32f24361f9f8535e8f31ecfafb1464f96c4',
            repo: 'myDocs',
            owner: 'Chenzhexian',
            admin: ['Chenzhexian'],
            id: id,
            distractionFreeMode: false,
        };
        const gitalk = new Gitalk(commentConfig);
        gitalk.render('gitalk-container');
    });
});
</script>

<style>
@import 'css/gittalk.css';
</style>
