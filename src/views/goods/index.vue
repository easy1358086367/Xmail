<template>
  <div class="goods">
    <div class="nav">
      <div class="w">
        <a
          @click="handleSort(i)"
          :class="{active:i === isActive}"
          href="javascript:;"
          v-for="(item,i) in navList"
          :key="i"
        >{{item.title}}</a>
        <div class="price-interval">
          <input type="number" class="input" placeholder="价格" v-model="min" />
          <span style="margin: 0 5px">-</span>
          <input type="number" placeholder="价格" v-model="max" />
          <el-button type="primary" size="small" style="margin-left: 10px;" @click="priceFilter">确定</el-button>
        </div>
      </div>
    </div>
    <div>
      <div class="goods-box w">
        <mail-goods class="small-img" v-for="item in goodsList" :key="item.productId" :goods="item"></mail-goods>
      </div>
      <div class="w" style="float:right">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-sizes="[8, 10, 20, 40]"
            :page-size="size"
            layout="total,sizes, prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mailGoods from "components/content/mailGoods";
import path from 'assets/js/path';

export default {
  components: {
    mailGoods
  },
  data() {
    return {
      max: "",
      min: "",
      navList: [
        { title: "综合排序" },
        { title: "价格从低到高" },
        { title: "价格从高到低" }
      ],
      isActive: 0,
      goodsList: [],
      page: 1,
      size: 20,
      sort: "",
      total: null
    };
  },
  created() {
    this.getAllGoods();
  },
  watch: {
      $route: 'getAllGoods'
  },
  methods: {
    // 获取商品列表数据
    async getAllGoods() {
      let oldUrl = `${path.allGoods}?page=${this.page}&size=${this.size}&sort=${this.sort}&priceGt=${this.min}&priceLte=${this.max}`
      let newUrl = this.$route.query.cid ? oldUrl+'&cid=1184': oldUrl
      try {
        let res = await this.$axios.get(
          newUrl
        );
        this.goodsList = res.data.data;
        this.total = res.data.total;
      } catch (error) {
        console.log(error);
      }
    },
    // 重置axios请求
    reset() {
      this.page = 1;
      this.size = 20;
    },
    // 导航实现
    handleSort(i) {
      this.isActive = i;
      switch (i) {
        // 综合排序
        case 0:
          this.reset();
          this.sort = "";
          this.getAllGoods();
          break;
        // 升序
        case 1:
          this.reset();
          this.sort = 1;
          this.getAllGoods();
          break;
        // 降序
        case 2:
          this.reset();
          this.sort = -1;
          this.getAllGoods();
          break;

        default:
          break;
      }
    },
    priceFilter() {
      this.reset();
      this.getAllGoods();
    },

    handleSizeChange(val) {
        this.size = val
        this.getAllGoods()
    },
    handleCurrentChange(val) {
        this.page = val
        this.getAllGoods()
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin.scss";
@import "../../assets/css/theme.scss";

*{
  text-decoration: none;
}
.goods {
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
}

.nav {
  height: 60px;
  line-height: 60px;
  > div {
    display: flex;
    align-items: center;
    a {
      padding: 0 30px 0 0;
      height: 100%;
      @extend %block-center;
      font-size: 12px;
      color: #999;
      &.active {
        color: #5683ea;
      }
      &:hover {
        color: #5683ea;
      }
    }
    input {
      @include wh(80px, 30px);
      border: 1px solid #ccc;
    }
    input + input {
      margin-left: 10px;
    }
  }
  .price-interval {
    padding: 0 15px;
    @extend %block-center;
    input[type="number"] {
      border: 1px solid #ccc;
      text-align: center;
      background: none;
      border-radius: 5px;
    }
  }
}

.goods-box {
  overflow: hidden;
  > div {
    float: left;
    border: 1px solid #efefef;
  }
}

.no-info {
  padding: 100px 0;
  text-align: center;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  .no-data {
    align-self: center;
  }
}

.img-item {
  display: flex;
  flex-direction: column;
}

.el-pagination {
  align-self: flex-end;
  margin: 3vw 10vw 2vw;
}

.section {
  padding-top: 8vw;
  margin-bottom: -5vw;
  width: 1218px;
  align-self: center;
}

.recommend {
  display: flex;
  > div {
    flex: 1;
    width: 25%;
  }
}

.small-img {
  display: inline-block;
  width: 25%;
  overflow: hidden;
}
</style>