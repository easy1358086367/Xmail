import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import axios from 'axios';
import vueResource from 'vue-resource';
import ElementUI from 'element-ui';
import lazyload from 'vue-lazyload';

import {getStore} from '@/utils/storage';
import path from 'assets/js/path';

Vue.config.productionTip = false;

Vue.use(vueResource)
Vue.use(ElementUI)
Vue.use(lazyload,{
  preLoad:1.3,
  error: 'assets/img/error.png',
  loading: 'assets/img/load.gif',
  attempt: 1
})

Vue.prototype.$axios = axios

// 请求拦截
axios.interceptors.request
  .use(config=>{
    const token = getStore('token')
    if(token){
      // 表示用户已登录
      config.headers.common['Authorization'] = token
    }
    return config
  },error=>{
    return Promise.reject(error)
  })

// 添加守卫
router.beforeEach((to,from,next)=>{
  axios
    .post(path.validata,{})
    .then(res=>{
      let data = res.data
      // 用户未登录
      if(data.state !== 1){
        // 跳转至登录页面
        if(to.matched.some(record=>record.meta.auth)){
          next({
            path: '/login',
            query: {
              redirect: to.fullPath
            }
          })
        }
      }else{
        store.commit('ISLOGIN',data)
      }
    })
    .catch(error=>{
      console.log(error);
    })
    .finally(()=>{
      next()
    })
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
