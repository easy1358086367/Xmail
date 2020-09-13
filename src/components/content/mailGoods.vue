<template>
  <div >
    <el-col>
      <el-card :body-style="{padding:0}" class="mail-goods">
        <div>
          <a>
            <img class="good-img" v-lazy="goods.productImageBig" alt />
          </a>
        </div>
        <h6 class="good-title">{{goods.productName}}</h6>
        <h3 class="sub-title ellipsis">{{goods.subTitle}}</h3>
        <div class="good-price pr">
          <div class="ds pa">
            <a href='javascript:;' @click="toDetail">
              <el-button type="default" >查看详情</el-button>
            </a>
            <a href='javascript:;'>
              <el-button 
              type="primary" 
              @click="addCart(goods.productId, goods.salePrice, goods.productName, goods.productImageBig)"
              >加入购物车</el-button>
            </a>
          </div>
          <p class="price">
            <span style="font-size:14px">￥</span>
            <span>{{Number(goods.salePrice).toFixed(2)}}</span>
          </p>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import {getStore} from '@/utils/storage';
import path from 'assets/js/path';

export default {
  props: ["goods"],
  computed: {
    login(){
      return this.$store.state.login
    }
  },
  methods: {
    toDetail() {
      // 编程式导航
      this.$router.push({
        path: `goodsDetail?productId=${this.goods.productId}`
      })
    },
    addCart(id,price,name,img){
      if(this.login){
        // 表示用户已登录，并将数据存储到后台中
        this.$axios.post(path.addCart,{
          userId:getStore('id'),
          productId: id,
          productNum: 1
        })

      }
      // 将当前商品存储到store中的cartList
      this.$store.commit('ADDCART',{
        productId: id,
        salePrice : price,
        productName : name,
        productImg : img
      })

    }
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.mail-goods{
    background: #fff;
    height: 430px;
}
.good-img {
  margin: 50px auto 10px;
  width: 206px;
  height: 206px;
  display: block;
}
.good-title {
  line-height: 1.2;
  font-size: 16px;
  color: #424242;
  margin: 0 auto;
  padding: 0 14px;
  text-align: center;
  overflow: hidden;
}
.sub-title {
  text-align: center;
  line-height: 1.2;
  font-size: 12px;
  color: #d0d0d0;
  padding: 10px;
}

.price {
  margin: 15px 0;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #d44d44;
  font-family: Arial;
  font-size: 18px;
  font-weight: 700;
}

.ds{
  display: flex;
  justify-content:space-evenly
}
.el-button{
  width: 100px;
  height: 30px;
}
</style>