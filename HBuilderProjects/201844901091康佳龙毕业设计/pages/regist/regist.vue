<template>
	<view class="content">
		<view class="avatorWrapper">
			<view class="avator">
				<image class="img" src="../../static/img/aozhi.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="form">
			<input class="inputWrapper" v-model="username" type="text" value="" placeholder="请输入用户名"/>
			<input class="inputWrapper" v-model="password1" @focus="enter(true)" @blur="enter(false)" type="password" value="" placeholder="请输入密码"/>
			<view class="warn" v-if="warn">
				<text>密码至少8-16个字符，至少1个大写字母，1个小写字母和1个数字</text>
			</view>
			<input class="inputWrapper" v-model="password2" type="password" value="" placeholder="确认密码"/>
			<input class="inputWrapper" v-model="phone" type="number" value="" placeholder="请输入手机号"/>
			<view class="imgWrapper">
				<input class="imageCode" v-model="imgcode" type="text" placeholder="验证码" />
				<imgcode ref="child" @imgChange="codeChange"></imgcode>
			</view>
			<button class="registBtn" @tap="regist">注册</button>
			<view class="warn" v-if="error">
				<text>{{error}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	//图形验证码组件
	import imgcode from "@/components/imgcode.vue";
	export default {
		components:{imgcode},
		data() {
			return {
				username:'',
				password1:'',
				password2:'',
				phone:'',
				imgcode:'',
				warn:'',
				error:''
			}
		},
		onLoad() {

		},
		methods: {
			enter(a){
				this.warn=a
			},
			codeChange(e){
				this.trueImgCode=e;
				//console.log(this.trueImgCode);
			},
			regist(){
				let username=this.username;
				let password1=this.password1;
				let password2=this.password2;
				let phone=this.phone;
				let imgcode=this.imgcode.toUpperCase();//自动变为大写
				let trueImgCode=this.trueImgCode;
				//判断用户名和密码是否合乎规范
				//密码至少8-16个字符，至少1个大写字母，1个小写字母和1个数字
				let key=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(password1);
				const db = uniCloud.database();
				db.collection('identity').get()
				.then(res=>{
					if(username!=''&&password1!=''&&password2!=''&&phone!=''&&imgcode!=''){
						if(!key){
							this.error='密码不符合规范,请重新输入';
							this.password1='';
							this.password2='';
							this.imgcode='';
							this.$refs.child.refresh();
						}else if(password1!=password2){
							this.error='两次密码不一致,请重新输入';
							this.imgcode='';
							this.$refs.child.refresh();
						}else if(imgcode!=trueImgCode){
							this.imgcode='';
							this.$refs.child.refresh();
							this.error='验证码错误';
						}else if(phone.length!=11){
							this.phone='';
							this.imgcode='';
							this.error='请检查手机号是否为11位';
							this.$refs.child.refresh();
						}else{
							for(let i=0;i<res.result.data.length;i++){
								if(username===res.result.data[i].username){
										this.error='用户已存在';
										this.password='';
										this.imgcode='';
										this.$refs.child.refresh();
									break;
								}
							}
							if(this.error!='用户已存在'){
								//合规范则将数据写入数据库
								const db=uniCloud.database();
								db.collection('identity').add({
									username: this.username,
									truepsw: this.password1,
									identity: ["用户"],
									address: [["cdutcm",103.8559,30.68144]],
									index: 0,
									phone: this.phone,
									default: "用户",
									"avatar": "../../static/img/mine2.png"
								})
								//console.log("注册成功");
								uni.navigateTo({
									url:'../login/login'
								})
							}
						}
					}else{
						this.imgcode='';
						this.$refs.child.refresh();
						this.error='请将数据填写完整';
					}
				})
				.catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style>
	.content {
		background: #377EB4;
		width: 100vw;
		height: 100vh;
	}
	.avatorWrapper{
		height: 25vh;
		width: 100vw;
		/* 水平垂直居中 */
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}
	.avator{
		width: 200rpx;
		height: 200rpx;
		overflow: hidden;
	}
	.avator .img{
		width: 100%
	}
	.form{
		padding: 0 60rpx;
		margin-top: 50rpx;
	}
	.inputWrapper{
		width: 100%;
		height: 80rpx;
		background: white;
		border-radius: 20px;
		box-sizing: border-box;
		padding: 0 20px;
		margin-top: 25px;
		text-align: center;
		font-size: 25rpx;
	}
	.imgWrapper{
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 80rpx;
	}
	.warn{
		text-align: center;
		color: #F0AD4E;
		font-size: 20rpx;
		margin-top: 15rpx;
	}
	.imageCode{
		width: 50%;
		height: 80rpx;
		background: white;
		border-radius: 20px;
		box-sizing: border-box;
		padding: 0 20px;
		margin-top: 25px;
		text-align: center;
		font-size: 25rpx;
	}
	.registBtn{
		width: 100%;
		height: 80rpx;
		background: #77B307;
		border-radius: 50rpx;
		margin-top: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
	}
</style>