<template>
	<view class="content">
		<view class="top">
			<text style="margin-left: 30rpx;" @click="cancel">取消</text>
			<text class="text" @click="ensure">确定</text>
		</view>
		
		<view class="menu">
			<u-icon name="phone" size="40rpx"></u-icon>
			<text>当前电话:</text>
			<text style=" margin-left:20rpx;font-size: 33rpx; color: rgb(72, 190, 163);">{{phone}}</text>
		</view>
		
		<view class="menu">
			<u-icon name="phone-fill" size="40rpx"></u-icon>
			<text>修改电话:</text>
			<input style=" margin-left:20rpx;font-size: 33rpx; color: rgb(72, 190, 163);" placeholder="请输入" v-model="newPhone"></input>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				name:'获取失败',
				phone:'获取失败',
				newPhone:''
			}
		},
		onLoad() {
			let that=this;
			uni.showLoading({
				title:'加载中'
			})
			//获取用户信息
			uni.getStorage({
			    key: 'user_info',
			    success: function (res) {
					that.name=res.data.username
					that.phone=res.data.phone;
					console.log('获取userinfo成功:',res.data.phone);
					//根据name连接数据库获取地址
					const db=uniCloud.database();
					db.collection('Order_form').where({username:that.name}).get()
					.then(res => {
						console.log('查询结果：',res.result.data[0].phone)
						that.phone=res.result.data[0].phone;
					})
			    }
			});
		},
		onReady(){
			setTimeout(function () {
				uni.hideLoading();
			}, 1200);
		},
		methods:{
			ensure(){
				let that=this;
				if(that.newPhone==''){
					uni.showModal({
						title:'提示',
						content:'请勿输入空值',
						duration:3000
					})
				}else if(that.newPhone.length!=11){
					uni.showModal({
						title:'提示',
						content:'请输入11位手机号',
						duration:3000
					})
				}else{
					//修改本地数据身份
					let _userInfo = uni.getStorageSync('user_info');
					_userInfo.phone = that.newPhone;
					uni.setStorageSync('user_info',_userInfo);
					const db=uniCloud.database();
					db.collection('identity').where({username:that.name}).update({
						phone:that.newPhone
					})
					db.collection('Order_form').where({username:that.name}).update({
						phone:that.newPhone
					})
					uni.showModal({
						title:'提示',
						content:'电话修改成功',
						duration:3000,
						success() {
							console.log("用户修改电话为：",that.phone);
							uni.switchTab({
								url:'../mine/mine'
							})
						}
					})
				}
			},
			cancel(){
				console.log("用户取消");
				uni.switchTab({
					url:'../mine/mine'
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
	.top{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
		width: 100%;
		padding: 10rpx;
		font-size: 28rpx;
		background-color: #377EB4;
	}
	.text{
		position: absolute;
		right: 30rpx;
		color: white;
	}
	.menu{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
		width: 100%;
		margin-top: 15rpx;
		padding: 20rpx;
		font-size: 35rpx;
		background-color: #FFFFFF;
	}
</style>
