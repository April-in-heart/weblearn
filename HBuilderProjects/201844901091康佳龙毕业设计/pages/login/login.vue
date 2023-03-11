<template>
	<view class="content">
		<view class="avatorWrapper">
			<view class="avator">
				<image class="img" src="../../static/img/aozhi.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="form">
			<input class="inputWrapper" v-model="username" type="text" placeholder="请输入用户名"/>
			<input class="inputWrapper" v-model="password" @focus="enter(true)" @blur="enter(false)" type="password" placeholder="请输入密码"/>
			<view class="warn" v-if="warn">
				<text>密码至少8-16个字符，至少1个大写字母，1个小写字母和1个数字</text>
			</view>
			<view class="imgWrapper">
				<input class="imageCode" v-model="imgcode" type="text" placeholder="验证码" />
				<imgcode ref="child" @imgChange="codeChange"></imgcode>
			</view>
			<button class="loginBtn" @click="login">登录</button>
			<view class="warn" v-if="error">
				<text>{{error[0]!=''?error[0]:error[1]}}</text>
			</view>
			<view class="forgotBtn">
				<text>找回密码</text>
				<text @click="regist">注册</text>
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
				password:'',
				imgcode:'',
				truepsw:'',
				trueImgCode:'',
				warn:'',
				error:['',''],
				flag:false,//是否显示登陆界面
			}
		},
		onLoad() {
			let that=this;
			//获取用户输入信息
			uni.getStorage({
			    key: 'user_info',
			    success: function (res) {
					that.username=res.data.username;
					that.password=res.data.truepsw;
			    }
			});
			
			//连接数据库判断用户名密码验证码是否正确
			const db=uniCloud.database()
			db.collection('identity').get()
			.then(res => {
				//.then()异步执行，当.then()前的方法执行完后再执行then()内部的程序
				for(let i=0;i<res.result.data.length;i++){
					if(that.username===res.result.data[i].username){
						let truepsw=res.result.data[i].truepsw;
						if(that.password===truepsw){
							//跳转到tabbar只能用此语句
							//并关闭非tabbar页面
							uni.reLaunch({
								url:'../index/index'
							})
						}
					}
				}
			})
			.catch(err => {
				console.log(err)
			})
			
		},
		methods: {
			enter(a){
				this.warn=a
			},
			codeChange(e){
				this.trueImgCode=e;
				//console.log(this.trueImgCode);
			},
			login(){
				let username=this.username;
				let password=this.password;
				let imgcode=this.imgcode.toUpperCase();//自动变为大写
				let trueImgCode=this.trueImgCode;
				//连接数据库判断用户名密码验证码是否正确
				const db=uniCloud.database()
				db.collection('identity').get()
				.then(res => {
					//.then()异步执行，当.then()前的方法执行完后再执行then()内部的程序
					for(let i=0;i<res.result.data.length;i++){
						if(username===res.result.data[i].username){
							let truepsw=res.result.data[i].truepsw;
							if(password!=truepsw){
								this.error[0]='用户名或密码错误';
								this.password='';
								this.imgcode='';
								this.$refs.child.refresh();
								break;
							}else if(imgcode!=trueImgCode){
								this.error[0]='验证码错误';
								this.imgcode='';
								this.$refs.child.refresh();
								break;
							}
							else{
								//合规范则异步存储信息并登录
								//console.log(username);
								uni.setStorage({
								    key: 'user_info',
								    data: res.result.data[i],
								    success: function () {
										console.log(res.result.data[i])
								        console.log('用户信息存储成功');
								    }
								});
								//跳转到tabbar只能用此语句
								//并关闭非tabbar页面
								uni.reLaunch({
									url:'../mine/mine'
								})
							}
						}
					}
					this.password='';
					this.imgcode='';
					this.$refs.child.refresh();
					this.error[1]='用户名错误，请重新检查后输入';
					//console.log(res.result.data.length);
				})
				.catch(err => {
					console.log(err)
				})
			},
			regist(){
				uni.redirectTo({
					url:'../regist/regist'
				})
				console.log("regist");
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
		padding: 0 100rpx;
		margin-top: 70px;
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
	.loginBtn{
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
	.forgotBtn{
		text-align: center;
		color: #EAF6F9;
		font-size: 25rpx;
		margin-top: 20px;
	}
	.forgotBtn text{
		margin-left: 40px;
		margin-right: 40px;
	}
</style>