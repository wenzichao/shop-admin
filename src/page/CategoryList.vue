<template>
    <div>
        <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ data.title }}</span>
                <span>
                    <el-input v-model='data.sort_id' size="mini" @blur="handelBlur($event,data)" class='ip'></el-input>
                </span>
                <span>
                    <el-button type="text" size="mini">编辑</el-button>
                </span>
            </span>
        </el-tree>
    </div>
</template>

<script>
export default {
       data() {
      const data = [];
      return {
        data: data
      }
    },
    methods:{
        handelBlur(event,data){
            // console.log(123)
            // console.log(event);
            this.$axios({
                url:'http://localhost:8899/admin/category/edit/'+data.category_id,
                method:'POST',
                data:{
                    ...data,
                    sort_id:event.target.value,
                    withCredentials: true
                }
            }).then(res=>{
                // console.log(res.data);
                const {message} = res.data
                this.getGoodList();
                this.$message.success(message)

            })
        },
        getGoodList(){
            this.$axios({
            url:'http://localhost:8899/admin/category/getlist/goods',
            method:'GET',
        }).then(res =>{
            // console.log(res.data);
            const {status,message} = res.data;
            this.data = message;
            // console.log(this.data);
        })
        }
    },
    mounted(){
        this.getGoodList()
    }
  };
</script>

<style scoped>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    .ip >>> input{
        width: 80px;
        height: 18px;
        line-height: 18px;
    }
</style>
