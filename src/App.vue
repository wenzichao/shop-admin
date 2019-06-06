<template>
  <div>
    <!-- <Index></Index> -->
    <router-link to='/login'>登录</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import Index from './components/index.vue'

export default {
  mounted(){
  //   this.$axios({
  //     url:'https://api.github.com/users',
  //     method:'GET',
  // }).then(res => {
  //   console.log(res);
  // })
  }
}
</script>

<style>

</style>
