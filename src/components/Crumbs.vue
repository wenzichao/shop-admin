<template>
  <div class="crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,index) in item" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: []
    };
  },
  methods: {
    getlist() {
      const arr = this.$route.matched;
      let item = [];
      arr.forEach(v => {
        item.push(v.meta);
      });
      this.item = item;
    }
  },
  watch: {
    $route() {
      // console.log(this.$route);
      this.getlist()
    }
  },
  mounted(){
    this.getlist()
  }
};
</script>

<style>
.crumbs {
  padding-left: 20px;
  border-bottom: 1px solid #999;
  padding-bottom: 15px;
  margin-bottom: 15px;
}
</style>
