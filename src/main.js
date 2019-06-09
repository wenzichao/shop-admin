import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入异步请求模块
import axios from 'axios'
// 引入页面
import Login from './page/Login.vue'
import Admin from './page/Admin.vue'
import GoodsList from './page/GoodsList.vue'
import CategoryList from './page/CategoryList.vue'
import Member from './page/Member.vue'
import OrderList from './page/OrderList.vue'

//注册饿了么UI
Vue.use(ElementUI)
// 注册路由模块
Vue.use(VueRouter)

Vue.config.productionTip = false
// 把axios绑定到原型
Vue.prototype.$axios = axios;

const routes = [
  {path:'/',redirect:'/admin/goods-list',meta:'首页'},
  {path:'/login',component:Login,meta:'登录'},
  {path:'/admin',component:Admin,meta:'后台管理',children:[
    {path:'goods-list',component:GoodsList,meta:'商品管理'},
    {path:'category-list',component:CategoryList,meta:'栏目管理'},
    {path:'member',component:Member,meta:'会员列表'},
    {path:'orderlist',component:OrderList,meta:'订单管理'}
  ]}
];

const router = new VueRouter({ routes });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
