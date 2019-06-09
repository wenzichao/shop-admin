<template>
  <div>
    <el-row type="flex" justify="space-between" class="btn">
      <div>
        <el-button type="primary" plain>添加</el-button>
        <el-button type="danger" plain @click="handelDeletMove">删除</el-button>
      </div>
      <!-- 搜索查询 -->
      <div class="inputstyle">
        <el-input placeholder="会员名称" v-model="inquireGoods" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handelSearch"></el-button>
        </el-input>
      </div>
    </el-row>
    <!-- 会员列表 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;margin-bottom:20px"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="gender" label="性别" width="120"></el-table-column>
      <el-table-column prop="age" label="年龄" width="120"></el-table-column>
      <el-table-column prop="phone" label="手机号码" width="150"></el-table-column>
      <el-table-column prop="emait" label="邮箱" width="150"></el-table-column>
      <el-table-column prop="time" label="时间" width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="10">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "h哈哈",
          gender: "男",
          age:'28',
          phone:13800138000,
          emait:'100@qq.com',
          time:'2018-12-12'
        }
      ],
    };
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
  }
};
</script>

<style scoped>
.btn {
  margin-bottom: 10px;
}
</style>
