<template>
  <div id="search-container">
    <mail-goods class="small-img" v-for="item in datas" :goods="item" :key="item.productId" />
  </div>
</template>

<script>
import path from "assets/js/path";
import mailGoods from "@/components/content/mailGoods";
export default {
  components: {
    mailGoods,
  },
  data() {
    return {
      datas: [],
    };
  },
  methods: {
    async getGoods() {
      const goods = await this.$axios
        .get(`${path.allGoods}?page=1&size=32`)
        .then((resp) => resp.data.data);
      return goods;
    },
    async init() {
      let keyword = this.$route.query.value;
      let goods = await this.getGoods();
      this.datas = goods.filter(
        (item) => item.productName.indexOf(keyword) != -1
      );
      console.log(this.datas);
    },
  },
  created() {
      this.init()
  },
};
</script>

<style>
#search-container {
    width: 80%;
    margin: 0 auto;
}
.small-img {
  display: inline-block;
  width: 25%;
  overflow: hidden;
}
</style>