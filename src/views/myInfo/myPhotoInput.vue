<template>
	<div class="container">
		<!--:file-list="fileList" -->
		<div class="fileBox">
		  <div class="fileBox_left">
			<el-form
			:model="userMessage"
			size="medium"
			class="common-form-inline"
			>
			<el-form-item label="姓名">
				<el-input v-model="userMessage.userName" placeholder="姓名" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="工号">
				<el-input v-model="userMessage.userNumber" placeholder="工号" :disabled="true"></el-input>
			</el-form-item>
			<!--<el-form-item label="是否合格">
				<el-input v-model="isQualified"  :disabled="true"></el-input>
			</el-form-item>-->
			</el-form>
		  </div>
			 <div class="upload">
			 	<el-upload
			 	class="upload-demo"
			 	ref="upload"
				:beforeUpload = "beforeAvatarUpload"
			 	:on-preview="handlePictureCardPreview"
			 	:on-remove="handleRemove"
			 	:on-change="handleChange"
			 	action="user/SanyBasicShrUser/fileUpload"
				:file-list="fileList"
			 	:auto-upload="false"
			 	list-type="picture-card"
			 	name='file'
			 	id="formBiao"
			 	:http-request="uploadSectionFile"
			 	enctype="multipart/form-data"
			 	accept=".jpg,.png">
				<el-button slot="trigger" size="small" type="primary" class="fileButton btnIsBlue" v-show="isFileBtnShow">
				      选择文件
				</el-button>

			 	</el-upload>
				<div style="text-align: center;margin:25px;">
					<el-button
					style="margin-left: 10px;"
					size="small"
					type="success"
					v-show="uploadShow"
					@click="submitUpload">
						上传到服务器
					</el-button>
				</div>
				<div slot="tip" class="el-upload__tip" >
					<span v-html="pictureMessage"></span>
				</div>
				<el-dialog :visible.sync = "dialogVisible">
					  <img :src="dialogImageUrl" alt="" width="100%">
				</el-dialog>

			 </div>

		</div>

	</div>
</template>

<script>
	import http from '../../api/http'
	import {reqlowerHair} from '../../api'
	export default {
		name: 'myPhotoInput',
		data() {
			return {
				fileType: '',
				previewImg: '',
				isQualified:'',
				uploadShow:false,
				isFileBtnShow:true,
				dialogVisibleImg: false,
				dialogImageUrl:'',
				userMessage:{},
				dialogVisible:false,//控制模态框是否显示
				pictureMessage:'您还未上传照片信息，请您上传(只能上传jpg/png文件，且不超过1M)',
				fileList: []
			};
		},
		/* watch:{
			userMessage(val){

			}
		},
		computed:{
			userMessage(){
				return this.$store.state.loginDataArr
			},
		}, */
		mounted(){
			/*判断是否有照片*/
			this.isQualified = sessionStorage.imgVerify==1?'合格':sessionStorage.imgVerify==0?'未上传':'不合格'
			this.userMessage = {userNumber:sessionStorage.userNumber,userName:sessionStorage.username,
			     imgUrlUpload:sessionStorage.imgUrlUpload,imgVerify:sessionStorage.imgVerify};
			if(this.userMessage.imgUrlUpload){
				this.pictureMessage = '您已有照片点击选择文件可重新上传(只能上传jpg/png文件，且不超过2M)'
				this.lookPicShow = true;
				this.dialogImageUrl = this.userMessage.imgUrlUpload
				document.getElementsByClassName('el-upload--picture-card')[0].style.background = `url(${this.dialogImageUrl}) no-repeat`;
				document.getElementsByClassName('el-upload--picture-card')[0].style.backgroundSize = '100% 100%';
			}else{
				document.getElementsByClassName('el-upload--picture-card')[0].style.background = 'url(img/kby.400938f2.png) no-repeat;';
			}

		},
		methods: {
			/*
			  判断照片上传状态的函数
			*/
		   async getLowerHair(){
				//aa
				const res = await reqlowerHair(sessionStorage.userNumber);
				if(res && res.data.code ===200){
					console.log(res.data.data)
					if(res.data.data.isSub == 2){
						//照片未下发
						this.$confirm('文件下发失败, 是否继续?', '提示', {
						  confirmButtonText: '确定',
						  cancelButtonText: '取消',
						  type: 'warning'
						}).then(() => {
						   this.getLowerHair();
						}).catch(() => {
						  this.$message({
						    type: 'info',
						    message: '未重新下发'
						  });
						});
					}else{
					   //照片已下发判断是否合格
					  if(res.data.data.imgVerify==0){
						  this.isQualified = '未上传'
					  }else if(res.data.data.imgVerify==1){
						  this.isQualified = '照片合格'
					  }else if(res.data.data.imgVerify==2){
						  this.isQualified = '照片不合格'
					  }

					}
				}
			},
			submitUpload () {
				 this.$refs.upload.submit();//相当于调用了uploadSectionFile函数
			},
			/*
			  删除照片时的钩子函数
			*/
			handleRemove(file, fileList) {
				this.uploadShow = false;
				this.lookPicShow = false;
				this.isFileBtnShow = true;
				document.getElementsByClassName('el-upload--picture-card')[0].style.display = 'inline-block';
			},
			/*放大照片时的回调函数*/
			handlePictureCardPreview(file){
           this.dialogImageUrl = file.url;
					 this.dialogVisible = true;
			},
			/*
			 点击照片时的钩子函数
			*/
			handlePreview(file) {
				this.fileType = file.name;
				console.log(file.name);
			},
			/*
			  文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
			*/
			handleChange(file, fileList) {
				this.uploadShow = true;
				this.lookPicShow = true;
				this.dialogImageUrl = file.url;
				document.getElementsByClassName('el-upload--picture-card')[0].style.display= 'none';
				this.isFileBtnShow = false;
			},
			beforeAvatarUpload(file){
				   if(file.size/1024/1024>2){
						 this.$message({
						 	type: 'warning',
						 	message: '文件大小不能超过2M,请重新上传'
						 });
						 return false;
					 }
			},
			viewImg() {
				 this.dialogVisible = true;
			},
			uploadSectionFile(param){//覆盖默认的上传值，可以自定义上传行为
			    var fileObj = param.file;
			    var form = new FormData(document.getElementById('formBiao'));
			    form.append("file", fileObj);
			    this.fileUpload(form);
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
				  .then(_ => {
						done();
					})
					.catch(_ => {});
			},
			/*
			  上传文件携带form对象
			*/
			 async fileUpload(formData){
			 	const res = await http.postFileData('/user/SanyBasicShrUser/fileUpload',formData);
				if(res&&res.data.code===200){
					this.$message('上传成功')
					const {code,data,msg} = res.data
					this.dialogImageUrl = data;
					sessionStorage.imgUrlUpload = data;
					this.uploadShow = false;
					this.fileList = [];
					document.getElementsByClassName('el-upload--picture-card')[0].style.display= 'inline-block';
					this.isFileBtnShow = true;
					document.getElementsByClassName('el-upload--picture-card')[0].style.background = `url(${this.dialogImageUrl}) no-repeat`;
				    document.getElementsByClassName('el-upload--picture-card')[0].style.backgroundSize = '100% 100%'
				    /* const res1 = await reqlowerHair(sessionStorage.userNumber);
				    console.log(res1) */
				    //20190327注销调用这个接口
					// this.getLowerHair()

				}else{
					this.$message({
						type: 'warning',
						message: '上传失败'
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {

		.upload {
			width: 100%;
			margin-top: 20px;
			.upload-demo{
				width:90%;
				//min-width: 1400px;
				margin:0 auto;
				text-align: center;
				/deep/ .el-upload-list--picture-card .el-upload-list__item{
					     width:200px;
						 height:200px;
				}
				/deep/ .el-upload--picture-card{
					   /* width:650px;
					   height:400px; */
					   width:200px;
					   height:200px;
					   position:relative;
				}
				/deep/ .el-icon-plus{
							font-size:150px;
							position:absolute;
							left:50%;
							top:50%;
							margin-left:-75px;
							margin-top:-75px;
				}
			}
		}

    /deep/ .el-dialog__body{
			text-align:center;
			img{
				height:100%;
				max-height: 500px;
				width:auto;
				max-width:100%;
			}
		}
		.fileBox{
			display: flex;
			width:100%;
			height:92%;
			margin:20px auto;
			background:#FFFFFF;
			padding: 20px;
			/*box-shadow: 0 0 20px rgba(0, 0, 0, 0.1) inset;*/
			/deep/ .el-form.common-form-inline{
				position:absolute;
				overflow: hidden;
			}
			/deep/ .el-form-item.el-form-item--medium{
				// float:left;
				.el-input--medium .el-input__inner{
					width:240px;
					height:35px;
				}
			}
			/deep/ .el-upload--picture-card{
				background:url(../../assets/images/kby.png) no-repeat;
				background-position: 50% 50%;
			}
			/deep/ .fileButton{
								 position:absolute;
								 bottom:-70px;
								 left: 50%;
								 margin-left: -40px;
			}
			.el-upload__tip{
				text-align: center;
				color:#9DAEBE;
				font-size:16px;
				margin-top:80px;
			}
		}
	}
</style>
