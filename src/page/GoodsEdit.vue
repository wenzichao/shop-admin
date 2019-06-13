<template>
  <div class="form">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属类型">
        <el-select v-model="form.category_id" placeholder="请选择类型">
          <el-option
            v-for="(item,index) in categorys"
            :key="index"
            :label="item.title"
            :value="item.category_id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否发布">
        <el-switch v-model="form.status"></el-switch>
      </el-form-item>

      <el-form-item label="推荐类型">
        <el-checkbox label="置顶" name="type" v-model="form.is_top"></el-checkbox>
        <el-checkbox label="热门" name="type" v-model="form.is_hot"></el-checkbox>
      </el-form-item>

      <el-form-item label="内容标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="副标题">
        <el-input v-model="form.sub_title"></el-input>
      </el-form-item>

      <!-- 上传单个图片 -->
      <el-form-item label="封面图片">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8899/admin/article/uploadimg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="商品货号">
        <el-input v-model="form.goods_no"></el-input>
      </el-form-item>

      <el-form-item label="库存数量">
        <el-input v-model="form.stock_quantity"></el-input>
      </el-form-item>

      <el-form-item label="市场价格">
        <el-input v-model="form.market_price"></el-input>
      </el-form-item>

      <el-form-item label="销售价格">
        <el-input v-model="form.sell_price"></el-input>
      </el-form-item>

      <!-- 多张图片上传 -->
      <el-form-item label="图片相册">
        <el-upload
          action="http://localhost:8899/admin/article/uploadimg"
          list-type="picture-card"
          :on-success="handleUploadSuccess"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="form.fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>

        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </el-form-item>

      <el-form-item label="内容摘要">
        <el-input type="textarea" v-model="form.zhaiyao"></el-input>
      </el-form-item>

      <div class="formlist">
        <el-form-item label="内容摘要">
          <quillEditor v-model="form.content"></quillEditor>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
    data() {
        return {
            form: {
                category_id:'',     //类别id
                status:false,       //是否发布
                is_top:false,       //是否置顶
                is_hot:false,       //是否热门
                title:'',           //文章标题
                sub_title:'',       //副标题
                imgList:[],         //单张图片数据
                goods_no:'',        //商品货号
                stock_quantity:'',  //库存数量
                market_price:'',    //市场价格
                sell_price:'',      //销售价格
                fileList:[],        //多张图片
                zhaiyao:'',         //文章摘要
                is_slide:false,     //文章轮播图(无关数据，但需要)
                content:''          //文章详细内容
            },
            categorys:[],
            imageUrl: '',
            dialogImageUrl: '',
            dialogVisible: false,
            id:'',
        }
    },
    methods: {
        onSubmit() {
            // console.log(this.form);
            this.$axios({
                url:`http://localhost:8899/admin/goods/edit/${this.id}`,
                method:'POST',
                data:this.form,
                withCredentials: true
            }).then(res=>{
                // console.log(res.data);
                const {status,message} = res.data
                if(status==0){
                    this.$message.success(message)
                    this.$router.back()
                }else{
                    // this.$message.error(message)
                    this.$router.push('/login')
                }
            })
        },
        // 上传单个图片
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            const imgList = file.response
            // this.imageUrl = imgList.url;
            this.form.imgList = [imgList];
            // console.log(this.form.imgList);
        },
        // 单张图片上传大小设计
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
        // 上传多张图片成功事件
        handleUploadSuccess(res,file,fileList){
            this.form.fileList.push(file.response);
            // console.log(fileList);
            // const arr = fileList.map(item=>{
            //     return item.response
            // })
            // // console.log(arr);
            // this.form.fileList = arr
        },
        // 移除图片事件
        handleRemove(file, fileList) {
            const files = fileList.map(v => {
                return v
                })
                if(fileList.length>0){
                this.form.fileList = files
                }else{
                this.form.fileList = [];
                }
            },
        // 放大查看图片事件
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    },
    mounted(){
        // 页面刷新，渲染类别列表
        this.$axios({
            url:'http://localhost:8899/admin/category/getlist/goods',
            method:'GET',
        }).then(res=>{
            // console.log(res.data);
            const {status,message} = res.data;
            // console.log(message);
            this.categorys = message;
            // console.log(this.categorys);
        })
        // 根据id获取当前商品的数据
        const id = this.$route.params.id;
        this.id = id;
        // console.log(this.$route);
        // console.log(id);
        this.$axios({
            url:`http://localhost:8899/admin/goods/getgoodsmodel/${id}`,
            method:'GET',
        }).then(res=>{
            // console.log(res.data);
            const {status,message} = res.data;
            // message.imgList[0].shorturl = '/'+ message.imgList[0].shorturl;
            this.form = message;
            this.form.category_id = +message.category_id;
            this.imageUrl = message.imgList[0].url

            message.fileList.forEach( v => {
                v.url = 'http://localhost:8899'+v.shorturl;
            });
            // console.log(message.imgList[0].shorturl);
        })
    },
    components: {
        quillEditor
  }
}

</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.form {
  width: 800px;
}
.formlist .ql-toolbar {
  line-height: 1;
}
</style>
