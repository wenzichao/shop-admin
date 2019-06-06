import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入异步请求模块
import axios from 'axios'
// 引入页面
import Login from './page/login.vue'
import Index from './components/index.vue'
//注册饿了么UI
Vue.use(ElementUI)
// 注册路由模块
Vue.use(VueRouter)

Vue.config.productionTip = false
// 把axios绑定到原型
Vue.prototype.$axios = axios;

const routes = [
  {path:'/',component:Index},
  {path:'/login',component:Login}
];

const router = new VueRouter({ routes });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
