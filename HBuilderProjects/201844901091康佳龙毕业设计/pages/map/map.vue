<template>
	<view class="content">
		
		<view class="top">
			<text style="margin-left: 30rpx;" @click="cancel">取消</text>
			<text class="text" @click="ensure">确定</text>
		</view>
		
		<view class="menu">
			<u-icon name="map-fill" size="40rpx"></u-icon>
			<text>当前地址:</text>
			<text style="font-size: 33rpx; color: rgb(72, 190, 163);">{{address}}</text>
		</view>
		
		<view class="menu">
			<text>收货地址:</text>
			<view @click="addLocation" style="position: absolute;right: 60rpx;">
				<text>新增地址</text>
				<image class="img" src="../../static/img/add.png" mode="widthFix"></image>
			</view>
		</view>
		
		<view v-for="(item, index) in adsList" :key="item.id" :data-index="index" :data-address="item[0]" class="menu2" @click="choose" @longpress="delete1">
			<view class="line"></view>
			<text style="font-size: 35rpx;margin-bottom: 5rpx;">{{item[0]}}</text>
			<u--text mode="name" :text="name" format="encrypt"></u--text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				adsList:[],//地址列表
				phone:'',
				index:0,
				address:''//当前选择的地址
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
					that.name=res.data.username;
					console.log('获取userinfo成功:',res.data.username);
					//根据name连接数据库获取地址
					const db=uniCloud.database();
					db.collection('identity').where({username:that.name}).get()
					.then(res => {
						console.log('查询结果：',res.result.data[0].address[that.index][0])
						that.adsList=res.result.data[0].address;
						that.phone=res.result.data[0].phone;
						that.index=res.result.data[0].index;
						that.address=res.result.data[0].address[that.index][0];
					})
			    }
			});
		},
		onReady(){
			setTimeout(function () {
				uni.hideLoading();
			}, 300);
		},
		methods: {
			addLocation() {
				let that=this;
				uni.chooseLocation({
					success(res) {
						let longitude=res.longitude;
						let latitude=res.latitude;
						that.address=res.address+res.name;
						let newads=[that.address,res.longitude,res.latitude];
						that.adsList.push(newads);
						console.log("新增地址与地址表：",that.address,that.adsList)
						//根据name连接数据库获取地址并新增地址
						const db=uniCloud.database();
						db.collection('identity').where({username:that.name}).update({
							address:that.adsList
						})
						db.collection('Order_form').where({username:that.name}).update({
							address:that.adsList,
						})
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
					}
				})
			},
			delete1(e){
				let that=this;
				uni.showModal({
					title:"警告",
					content:"是否删除",
					success(res) {
						if (res.confirm) {
							that.adsList.splice(e.currentTarget.dataset.index,1);
							const db=uniCloud.database();
							db.collection('identity').where({username:that.name}).update({
								address:that.adsList,
							})
							db.collection('Order_form').where({username:that.name}).update({
								address:that.adsList,
							})
							console.log("地址表：",that.adsList)
						}
					}
				})
			},
			choose(e){
				this.address=e.currentTarget.dataset.address;
				this.index=e.currentTarget.dataset.index;
				console.log("选择了下标为"+e.currentTarget.dataset.index+"的地址")//默认地址在地址表的下标
			},
			ensure(){
				let that=this;
				
				const db=uniCloud.database();
				db.collection('identity').where({username:that.name}).update({
					index:that.index
				})
				db.collection('Order_form').where({username:that.name}).update({
					index:that.index
				})
				.then(res=>{
					uni.showModal({
						content:"保存成功",
						success() {
							console.log("地址下标：",that.index)
							uni.switchTab({
								url:'../mine/mine'
							})
						}
					})
				})
			},
			cancel(){
				let that=this;
				//取消则清空选择的地址
				uni.setStorage({
					key:"address",
					data:'',
					success() {
						uni.switchTab({
							url:'../mine/mine'
						})
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
	.top{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
		width: 100vw;
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
		width: 98%;
		margin-top: 15rpx;
		padding: 20rpx;
		font-size: 35rpx;
		background-color: #FFFFFF;
	}
	.img{
		width: 40rpx;
		height: 70rpx;
		margin-top: 5rpx;
		position: absolute;
		right: 5;
	}
	.menu2{
		display: flex;
		flex-direction: column;
		width: 98%;
		padding: 0 0 20rpx 20rpx;
		font-size: 40rpx;
		background-color: #FFFFFF;
	}
	.line{
		width: 95%;
		height: 1rpx;
		margin-bottom: 10rpx;
		border-top: solid #F1F1F1 1px;
	}
</style>
