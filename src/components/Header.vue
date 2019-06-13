<template>
    <el-row type="flex" justify="space-between">
        <div class="arrow" @click="handelShrink"><i class="el-icon-back"></i></div>
        <div>
            {{user.uname}} {{user.realname}}
            <span @click="handelClick" class="hand">退出</span>
        </div>
    </el-row>
</template>

<script>
export default {
    data(){
        return {
            user:{}
        }
    },
    props:['realname'],
    methods:{
        handelShrink(){
             this.$emit('change')
        },
        handelClick(){
            this.$axios({
                url:'http://localhost:8899/admin/account/logout',
                method:'GET',
                withCredentials: true
            }).then(res =>{
                const {status,message} = res.data
                if(status==0){
                    // 成功提示的信息
                    this.$message.success(message)
                    // 返回登陆页
                    this.$router.push('/login')
                    // 移除本地缓存
                    localStorage.removeItem('user')
                }
            })
        }
    },
    mounted(){
        // 获取仓库中的数据渲染到页面中
        this.user = this.$store.state.user 
        // console.log(this.user);
    }
}
</script>

<style scoped>
    .arrow,.hand{
        cursor:pointer;
    }
</style>
