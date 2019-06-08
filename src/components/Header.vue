<template>
    <el-row type="flex" justify="space-between">
        <div class="arrow" @click="handelShrink"><i class="el-icon-back"></i></div>
        <div>
            {{realname}} 
            <router-link to='/login'>退出</router-link>
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
