<template>
  <div class="crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">管理后台</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {};
</script>

<style>
    .crumbs{
        padding-left: 20px;
        border-bottom: 1px solid #999;
        padding-bottom: 20px;
    }
</style>
