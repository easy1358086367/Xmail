import Vue from "vue";
import VueRouter from "vue-router";


// 异步加载
const index = ()=>import('@/views/index');
const login = ()=>import('@/views/login/index');
const home = ()=>import('@/views/home/index');
const goods = ()=>import('@/views/goods/index');
const thanks = ()=>import('@/views/thanks/index');
const goodsDetail = ()=>import('@/views/goodsDetail/index');
const user = ()=>import('@/views/user/index');
const search = ()=>import('@/views/search/index');

// 正常加载
// import index from "@/views/index";
// import login from "@/views/login";
// import home from '@/views/home';
// import goods from '@/views/goods';
// import thanks from '@/views/thanks';
// import goodsDetail from '@/views/goodsDetail';
// import user from '@/views/user';

Vue.use(VueRouter);

const routes = [
  {
    path : '/',
    redirect : '/home',
    name : 'home',
    component : index,
    children : [
      {
        path : 'home',
        component : home
      },
      {
        path : 'goods',
        component : goods
      },
      {
        path : 'thanks',
        component : thanks
      },
      
      {
        path: '/goodsDetail',
        component: goodsDetail,
        name:'goodsDetail'
      },
      {
        path:'/search',
        component : search,
        name:'search'
      }
    ],
    
  },
  {
    path : '/login',
    component : login, 
    name : 'login'
  },
  {
    path: '/user',
    component: user,
    name: 'user',
    meta: {
      // 需要守卫
      auth: true
    }
  }
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
