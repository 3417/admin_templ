import Vue from 'vue';
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
Vue.use(VueRouter);
const router =  new VueRouter({
    mode:"hash",
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: {
                title: '首页'
            },
            
        },
    ]
})

export default router;
