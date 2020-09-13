<template>
  <div class="home">
    <!-- 轮播图 -->
    <div class="banner">
      <el-carousel indicator-position="outside" class="swiper" height="480px">
        <el-carousel-item v-for="item in banner" :key="item.id">
          <router-link to="/">
            <img class="img" v-if="item.picUrl" :src="item.picUrl" alt />
            <img class="img" v-if="item.picUrl2" :src="item.picUrl2" alt />
            <img class="img" v-if="item.picUrl3" :src="item.picUrl3" alt />
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div v-for="item in homeList" :key="item.id">
      <!-- 活动板块 -->
      <div class="activity-panel panel" v-if="item.type === 1">
        <el-row>
          <el-col :span="8" v-for="o in item.panelContents" :key="o.id" style="width:25%">
            <el-card :body-style="{ padding: '0px' }">
              <a href="#">
                <img class="image" v-if="o.picUrl" :src="o.picUrl" alt />
                <img class="image" v-if="o.picUrl2" :src="o.picUrl2" alt />
                <img class="image" v-if="o.picUrl3" :src="o.picUrl3" alt />
              </a>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <!-- 商品板块 -->
      <div class="panel" v-if="item.type === 2">
        <myshelf :title="item.name">
          <div slot="content" class="hot">
            <mail-goods v-for="o in item.panelContents" :key="o.id" :goods="o" class="hot-item"></mail-goods>
          </div>
        </myshelf>
      </div>
      <div class="panel other" v-if="item.type === 3">
        <myshelf :title="item.name">
          <div slot="content">
            <div class="big-img" v-for="i in item.panelContents" :key="i.id" v-if="i.type != 0">
              <img :src="i.picUrl" alt />
            </div>
            <mail-goods
              class="small-img"
              v-for="i in item.panelContents"
              :key="Math.random() * i.id"
              :goods="i"
              v-if="i.type === 0"
            ></mail-goods>
          </div>
        </myshelf>
      </div>
    </div>
  </div>
</template>

<script>
import myshelf from "components/common/shelf";
import mailGoods from "components/content/mailGoods";
import path from 'assets/js/path';


export default {
  data() {
    return {
      // 轮播图数据
      banner: [],

      homeList: []
    };
  },
  components: {
    myshelf,
    mailGoods
  },
  async created() {
    try {
      console.log(path.home);
      let res = await this.$axios.get(path.home);
      if (res.data.code === 200) {
        let result = res.data.result;
        this.homeList = result;
        // 获取轮播图的数据
        let item = result.find(item => item.type === 0);
        this.banner = item.panelContents;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
};
</script>

<style scoped>
.home {
  width: 80%;
  margin: 0 auto;
}

.swiper {
  position: relative;
  padding-top: 20px;
}

.img {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;

  border-radius: 10px;
}

.panel {
  margin-top: 25px;
}

.image {
  width: 100%;
}

.hot-item {
  display: inline-block;
  width: 50%;
}
.big-img{
  display: inline-block;
  width: 50%;
}
.big-img img {
  width: 100%;
}
.small-img {
  display: inline-block;
  width: 25%;
  overflow: hidden;
}

.other {
  display: flex;
}
</style>