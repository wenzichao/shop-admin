<template>
  <div>
    <div class="navTop"></div>
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      background-color="#041f38"
      text-color="#999"
      active-text-color="#fff"
      :collapse='isShow'
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>购物商城</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <router-link to='/admin/goods-list'>商品管理</router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link to='/admin/category-list'>栏目管理</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-service"></i>
          <span>会员管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">会员列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>商城订单</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">订单管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  props:['isShow']
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  /* padding-left: 1px; */
  width: 200px;
  min-height: 400px;
}
.el-menu{
  border: none
}
.navTop {
  height: 60px;
  z-index: 3;
  background-color: #05294b;
}
</style>
