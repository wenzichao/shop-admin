<template>
    <el-container>
      <el-aside width="auto">
          <Navigtion :isShow='isShow'></Navigtion>
      </el-aside>
      <el-container>
        <el-header><Header @change='handelChangeShow' :realname='realname'/></el-header>
        <el-main>
            <Crunbs></Crunbs>    
            Main
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
// 头部样式
import Header from '../components/Header.vue'
// 左侧导航栏
import Navigtion from '../components/Navigtion.vue'
// 面包屑导航
import Crunbs from '../components/Crumbs.vue'
export default {
    data(){
        return {
            isShow:false,
            realname:'',
        }
    },
    methods:{
        handelChangeShow(){
            this.isShow = !this.isShow
        }
    },
    mounted(){
        var query = this.$route.query
        this.realname = query.realname
        // console.log(query);
    },
    components:{
        Header,
        Navigtion,
        Crunbs
    }
};
</script>

<style>
.el-header,
.el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
    background-color: #041f38;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > div > .el-container {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
