<template>
	<view class="content">
		<view class="avatarWrapper">
			
			<image class="img" :src="avatar" mode="widthFix"></image>
			<text class="name">{{name}}</text>
			<block v-if="avatar=='../../static/img/mine.png'">
				<button class="imgbtn" @click="clickimg">点击获取头像信息</button>
			</block>
			<!-- 分栏 -->
			<view class="menu">
				<view class="items" @click="cgAdress">
					<text>地址管理</text>
					<image class="img2" src="../../static/img/zhankai.png" mode="widthFix"></image>
				</view>
				<view class="items" @click="cgPhone">
					<text>联系电话</text>
					<image class="img2" src="../../static/img/zhankai.png" mode="widthFix"></image>
				</view>
				<view class="items">
					<text>设置</text>
					<image class="img2" src="../../static/img/zhankai.png" mode="widthFix"></image>
				</view>
				
				<view class="items">
					<text>当前身份 :</text>
					<picker style="margin-left:25rpx;color: #9ACAFC;" mode="selector" :range="columns" @change="changeIdentity">{{identity}}</picker>
				</view>
				
			</view>
			<!-- 登陆/注销 -->
			<button v-if="name=='未登录'" class="login" @click="changeToLogin">登录/注册</button>
			<button v-else class="cancel" @click="cancel">注销</button>
		</view>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				columns:[],
				name:'未登录',
				identity:'用户',
				avatar:'../../static/img/mine.png',
				islogin:'true'
			}
		},
		onLoad() {
			uni.showLoading({
				title:'加载中'
			})
		},
		onShow() {
			let that=this;
			//获取用户信息
			uni.getStorage({
			    key: 'user_info',
			    success: function (res) {
					//console.log(res)
					that.columns=res.data.identity;
					that.name=res.data.username;
					that.identity=res.data.default;
					that.islogin=res.data.islogin;
			    }
			});
			uni.getStorage({
				key:'avatar',
				success:function(res){
					that.avatar=res.data;
					//console.log(res.data)
				}
			});
			if(that.name!='未登录'){
				//改变登陆按钮状态
				that.islogin=true;
			}
		},
		onReady(){
			setTimeout(function () {
				uni.hideLoading();
			}, 300);
		},
		methods: {
			//获取用户头像
			clickimg(){
				let that=this;
				uni.showLoading({
					title:'加载中'
				})
				setTimeout(function () {
					uni.hideLoading();
				}, 800);
				// 获取微信用户信息注意不能再 open-type="getUserInfo"只能把getuserprofile当作普通方法调用
				uni.getUserProfile({
				   desc:'Wexin',     // 这个参数是必须的
				   success:res=>{
					   //console.log(res);
					   //this.avatar=res.userInfo.avatarUrl;
					   uni.setStorage({
						key:'avatar',
						data:res.userInfo.avatarUrl,
						success: function () {
							that.avatar=res.userInfo.avatarUrl;
							const db=uniCloud.database();
							db.collection('identity').where({username:that.name}).update({
								avatar:that.avatar
							})
							console.log('用户头像存储成功');
							console.log(res.userInfo.avatarUrl);
						}
					   })
				   },
				   fail:err=>{
					   console.log(err)
				   }
				})
			},
			//跳转到地址选择
			cgAdress(){
				wx.navigateTo({
					url:'../map/map'
				})
			},
			//跳转到修改电话
			cgPhone(){
				wx.navigateTo({
					url:'../mine/phone'
				})
			},
			//改变身份
			changeIdentity(e){
				let i=e.detail.value
				this.identity=this.columns[i];
				//修改数据库中身份
				const db=uniCloud.database();
				db.collection('identity').where({username:this.name}).update({default:this.identity});
				//修改本地数据身份
				let _userInfo = uni.getStorageSync('user_info');
				_userInfo.default = this.identity;
				uni.setStorageSync('user_info',_userInfo);
				//使用relaunch可以跳转到tabbar界面并触发on load事件刷新页面
				uni.reLaunch({
					url:'../mine/mine'
				})
				console.log('切换到'+this.identity+'身份')
			},
			//跳转到登陆界面
			changeToLogin(){
				wx.navigateTo({
					url:'../login/login'
				})
			},
			//注销
			cancel(){
				this.name='未登录';
				this.avatar='../../static/img/mine.png';
				this.identity='';
				this.islogin=false;
				var data=[this.name,this.identity,this.islogin];
				wx.setStorage({
					key:'avatar',
					data:this.avatar
				})
				wx.setStorage({
					key:'user_info',
					data:'data',
					success() {
					console.log(data)
					}
				})
			}
		}
	}
</script>

<style>
	.content {
		width: 100vw;
		height: 100vh;
		background: #F1F1F1;
	}
	.imgbtn{
		width: 50%;
		height: 70rpx;
		background: #77B307;
		border-radius: 50rpx;
		margin-top: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
	}
	.menu{
		width: 100%;
		font-size: 40rpx;
		margin-top: 60rpx;
	}
	.items{
		display: flex;
		flex-direction: row;
		height: 65rpx;
		margin: 15rpx;
		padding: 15rpx;
		background-color: #FFFFFF;
	}
	.img2{
		width: 40rpx;
		height: 70rpx;
		margin-top: 10rpx;
		position: absolute;
		right: 30rpx;
	}
	.login{
		width: 45%;
		height: 70rpx;
		background: #77B307;
		border-radius: 50rpx;
		margin-top: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
	}
	.cancel{
		width: 45%;
		height: 70rpx;
		background: #C0C0C0;
		border-radius: 50rpx;
		margin-top: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #DD6161;
	}
	.avatarWrapper {
	  display: flex; /*弹性盒子*/
	  flex-direction: column; /* 默认从左往右说明布局row，改为从上往下垂直布局column */
	  align-items: center;
	  padding-top: 50rpx;
	}
	.img {
	  /* 统一规定宽750rpx */
	  width: 128rpx;
	  height: 128rpx;
	  margin: 5rpx 0 0 0;
	  border-radius: 50%; /* 设为圆形图片 */
	}
	.name {
	  color: #aaa;
	}
</style>
