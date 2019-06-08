<template>
  <div class="form-wrapper">
    <el-form
    :model="form"
    :rules="rules"
    ref="form"
    label-width="80px"
    class="form"
  >
    <p>登录</p>
    <el-form-item label="账号" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="btn">
      <el-button type="primary" @click="onSubmit">登录</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password:""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
      }
    };
  },
  methods: {
    onSubmit(){
      const data = {
        uname:this.form.username,
        upwd:this.form.password
      }
      this.$refs.form.validate((valid) => {
          if (valid) {
            this.$axios({
              url:'http://localhost:8899/admin/account/login',
              method:'POST',
              data,
              withCredentials: true
            }).then(res=>{
              // console.log(res.data);
              const {message,status} = res.data
              if(status==0){
                this.$router.push('/?realname='+message.realname)
              }
              if(status==1){
                this.$message.error(message);
              }
            })
          } 
        });
    },
    resetForm(form) {
      this.$refs[form].resetFields();
    }
  }
};
</script>

<style scoped>
  .form-wrapper{
    width: 100%;
    position: absolute;
    top:0;
    bottom:0;
    /* background-color: #ccc; */
  }
  .form{
    width: 500px;
    position: absolute;
    left: 50%;
    margin-left: -250px;
    top: 50%;
    margin-top: -116px;
  }
  .form p{
    text-align: center;
    margin-bottom: 20px;
    color: #409EFF;
  }
  .btn{
    margin-left: 112px;
  }
</style>
