import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        // 获取本地缓存中的数据
        user:JSON.parse(localStorage.getItem('user')) || {}
    },
    mutations:{
        getUser(state,data){
            state.user = data
            // 将数据放进本地缓存中
            localStorage.setItem('user',JSON.stringify(data))
        }
    }
})

export default store