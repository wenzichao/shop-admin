<template>
  <div>
      <!-- 新增和批量删除按钮 -->
    <el-row type="flex" justify="space-between" class="btn">
      <div>
        <el-button type="primary" plain>添加</el-button>
        <el-button type="danger" plain @click="handelDeletMove">删除</el-button>
      </div>
      <!-- 搜索查询 -->
      <div class="inputstyle">
          <el-input placeholder="请输入内容" v-model="inquireGoods" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="handelSearch"></el-button>
          </el-input>
      </div>
    </el-row>
    <!-- 商品列表 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;margin-bottom:10px;"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="标题" width="450">
        <template slot-scope="scope">
          <el-row type="flex" align="middle">
            <!-- <img :src="scope.row.imgurl" class="goods-img"/> -->
            <div>{{ scope.row.title }}</div>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="categoryname" label="类型" width="120"></el-table-column>
      <el-table-column prop="sell_price" label="价格" width="120"></el-table-column>
      <!-- 编辑，删除按钮 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="searchValue"
    ></el-pagination>
  </div>
</template>

<script>
export default {
    data() {
        return {
        tableData: [],
        selected:[],
        inquireGoods:'',
        searchValue:0,
        pageIndex:1,
        pageSize:5
        };
    },
    // 页面的第一次渲染
    mounted() {
        this.getGoodsList();
    },
  methods: {
    // 封装一个数据刷新的方法
    getGoodsList() {
      this.$axios({
        url: `http://localhost:8899/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&searchvalue=${this.inquireGoods}`,
        method: "GET"
      }).then(res => {
        const data = res.data;
        // console.log(data);
        this.tableData = data.message;
        this.searchValue = data.totalcount
        // console.log(this.searchValue);
      });
    },
    // 多选删除
    handelDeletMove(){
        const arr = this.selected.map(item=>{
            return item.id
        })
        const ids = arr.join(",")
        this.$axios({
            url:`http://localhost:8899/admin/goods/del/${ids}`,
            method:'GET'
        }).then(res=>{
            const data = res.data
            const {status,message} = res.data
            if(status==0){
                this.$message.error(message);
                this.getGoodsList()
            }else{
                this.$message.error(message);
            }
        })
    },
    // 数据查询
    handelSearch(){
        this.getGoodsList()
    },
    // 每次选中时候触发的事件
    handleSelectionChange(val) {
        // console.log(val);
      this.selected = val;
    },
    // 点击编辑时触发的事件
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 点击删除按钮时触发的事件
    handleDelete(row) {
        const id = row.id
        this.$axios({
            url:`http://localhost:8899/admin/goods/del/${id}`,
            method:'GET'
        }).then(res=>{
            const data = res.data
            const {status,message} = res.data
            if(status==0){
                this.$message.error(message);
                this.getGoodsList()
            }else{
                this.$message.error(message);
            }
        })
    },
    // 每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val
      this.getGoodsList()
    },
    // 当前页数
    handleCurrentChange(val) {
      this.pageIndex = val
      this.getGoodsList()

    }
  }
};
</script>

<style scoped>
.btn {
  margin-bottom: 10px;
}
.inputstyle {
  width: 300px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
