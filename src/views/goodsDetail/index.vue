<template>
  <div class="w store-content">
    <div class="gray-box">
      <div class="gallery-wrapper">
        <div class="gallery">
          <div class="thumbnail">
            <ul>
              <li
                v-for="(item, i) in small"
                :key="i"
                :class="{ on: isOn == i }"
                @click="changeShow(i, item)"
              >
                <img :src="item" />
              </li>
            </ul>
          </div>
          <div class="thumb">
            <div class="big">
              <img :src="show" />
            </div>
          </div>
        </div>
      </div>
      <!--右边-->
      <div class="banner">
        <div class="sku-custom-title">
          <h4>{{ product.productName }}</h4>
          <h6>
            <span>{{ product.subTitle }}</span>
            <span class="price">
              <em>¥</em>
              <i>{{ product.salePrice }}</i>
            </span>
          </h6>
        </div>
        <div class="num">
          <span class="params-name">数量</span>
          <buy-num @handleValue="getNumber"></buy-num>
        </div>
        <div class="buy">
          <el-button type="primary" @click="addCart(product.productId, product.salePrice, product.productName, product.productImageBig)">加入购物车</el-button>
          <el-button type="danger">现在购买</el-button>
        </div>
      </div>
    </div>
    <!--产品信息-->
    <div class="item-info">
      <shelf title="产品信息">
        <div slot="content">
          <div v-if="product.detail">
            <div v-html="product.detail"></div>
          </div>
          <div v-else>
            <strong>该商品暂无内容数据</strong>
          </div>
        </div>
      </shelf>
    </div>
    <div class="gotop" @click="goTop()">Top</div>
  </div>
</template>

<script>
import buyNum from "components/common/buyNum";
import shelf from "@/components/common/shelf";
import path from 'assets/js/path';

export default {
  name: "goodsDetails",
  components: {
    buyNum,
    shelf
  },
  data() {
    return {
      product: {},
      small: [],
      show: "",
      isOn: 0,
      number:1
    };
  },
  created() {
    this.getGoodsDetail();
    this.goTop()
  },
  methods: {
    async getGoodsDetail() {
      try {
        let result = await this.$axios.get(
          `${path.goodsDetail}?productId=${this.$route.query.productId}`
        );
        this.product = result.data;
        this.small = this.product.productImageSmall;
        this.show = this.small[0];
      } catch (error) {
        console.log(error);
      }
    },
    changeShow(i, url) {
      this.isOn = i;
      this.show = url;
    },
    handleVal(num) {
      console.log(num);
    },
    goTop(){
      const that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (document.documentElement.scrollTop <= 100) {
          clearInterval(timer)
        }
      }, 16)
    },
    getNumber (newNumber) {
        this.number = newNumber
    },
    addCart(id,price,name,img){
      if(this.login){
        // 表示用户已登录，并将数据存储到后台中
        this.$axios.post(path.addCart,{
          userId:getStore('id'),
          productId: id,
          productNum: this.number
        })

      }
      // 将当前商品存储到store中的cartList
      this.$store.commit('ADDCART',{
        productId: id,
        salePrice : price,
        productName : name,
        productImg : img,
        productNum : this.number
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin";

.store-content {
  clear: both;
  width: 1220px;
  min-height: 600px;
  padding: 0 0 25px;
  margin: 0 auto;
  padding-top: 1px;
}

.gray-box {
  display: flex;
  padding: 60px;
  margin: 20px 0;
  background-color: #fff;
  border-radius: 10px;
  .gallery-wrapper {
    .gallery {
      display: flex;
      width: 540px;
      .thumbnail {
        li:first-child {
          margin-top: 0px;
        }
        li {
          @include wh(80px);
          margin-top: 10px;
          padding: 12px;
          border: 1px solid #f0f0f0;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 5px;
          cursor: pointer;
          list-style: none;
          &.on {
            padding: 10px;
            border: 3px solid #ccc;
            border: 3px solid rgba(0, 0, 0, 0.2);
          }
          img {
            display: block;
            @include wh(100%);
          }
        }
      }
      .thumb {
        .big {
          margin-left: 20px;
        }
        img {
          display: block;
          @include wh(440px);
        }
      }
    }
  }
  // 右边
  .banner {
    width: 450px;
    margin-left: 50px;
    h4 {
      font-size: 24px;
      line-height: 1.25;
      color: #000;
      margin-bottom: 13px;
    }
    h6 {
      font-size: 14px;
      line-height: 1.5;
      color: #bdbdbd;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .sku-custom-title {
      overflow: hidden;
      padding: 8px 8px 18px 10px;
      position: relative;
    }
    .params-name {
      padding-right: 20px;
      font-size: 14px;
      color: #8d8d8d;
      line-height: 36px;
    }
    .num {
      padding: 29px 0 8px 10px;
      border-top: 1px solid #ebebeb;
      display: flex;
      align-items: center;
    }
    .buy {
      position: relative;
      border-top: 1px solid #ebebeb;
      padding: 30px 0 0 10px;
    }
  }
}

.item-info {
  .gray-box {
    padding: 0;
    display: block;
  }
  .img-item {
    width: 1220px;
    // padding: 1vw;
    text-align: center;
    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }
}

.no-info {
  padding: 200px 0;
  text-align: center;
  font-size: 30px;
}

.price {
  display: block;
  color: #d44d44;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-align: right;
  i {
    padding-left: 2px;
    font-size: 24px;
    font-style: normal;
  }
}
.gotop {
  position:fixed;
  bottom: 150px;
  right: 100px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  background-color: brown;
  color: #fff;
  text-align: center;
  line-height: 50px;
}
</style>