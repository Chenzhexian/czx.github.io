import Layout from '../.vuepress/layouts/Layout.vue'
import { defineClientConfig } from 'vuepress/client';

export default defineClientConfig({
    enhance({ app, router, siteData }) {
    },
    setup() {
        // ...
    },
    rootComponents: [
        // ...
    ],
    layouts: {
        Layout,
    },
});
