import Vue from "vue";
import Vuex from "vuex";

import {setStore,getStore,removeStore} from '@/utils/storage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: false,//登录状态
    userInfo: null,//用户信息
    cartList: [],//购物车列表
    showCart: false,
  },
  mutations: {
    SHOWCART(state,bool){
      state.showCart = bool
    },
    // 登录
    ISLOGIN(state,info){
      state.userInfo = info
      state.login = true
      setStore('userInfo',info)
    },
    LOGINOUT(state){
      state.userInfo = null
      state.login = false
      removeStore('userInfo')
    },
    // 购物车商品添加
    ADDCART(state,{productId,salePrice,productName,productImg,productNum=1}){
      let goods = {
        productId,
        salePrice,
        productName,
        productImg
      }
      let flag = true
      state.cartList.forEach((item)=>{
        if (item.productId == productId) {
          if(item.productNum >= 1){
            flag = false
            item.productNum += parseInt(productNum)
          }
        }
      })
      if (!state.cartList.length || flag) {
        goods.productNum = productNum
        state.cartList.push(goods)
      }
      setStore('buyCart',{
        carList:state.cartList
      })
    },
    // 初始化购物车
    INITBUYCART(state){
      let initCart = getStore('buyCart')
      if(initCart){
        state.cartList = JSON.parse(initCart).carList
      }
    }
  },
  actions: {},
  modules: {}
});
