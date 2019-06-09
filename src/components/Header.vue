<template>
    <el-row type="flex" justify="space-between">
        <div class="arrow" @click="handelShrink"><i class="el-icon-back"></i></div>
        <div>
            用户名：{{realname}} 
            <router-link to='/login' style="display:inline">退出</router-link>
        </div>
    </el-row>
</template>

<script>
export default {
    props:['realname'],
    methods:{
        handelShrink(){
             this.$emit('change')
        }
    }
}
</script>

<style scoped>
    .arrow{
        cursor:pointer;
    }
</style>
