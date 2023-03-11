<template>
	<view class="content">
		<u-search placeholder="按用户名搜索订单" v-model="username" @custom="search"></u-search>
		<view class="box" v-for="(item,index) in item" :key="item._id" :data-id="item._id" v-if="item.current!=3" @click="drugInfo2">
			<view style="margin: 0 0 50rpx 20rpx;">当前订单号：{{item._id}}</view>
			<u-steps :current="item.current">
				<u-steps-item title="已出单" :desc="item.startTime"></u-steps-item>
				<u-steps-item title="熬制中" :desc="item.decoctTime"></u-steps-item>
				<u-steps-item title="运输中" :desc="item.distribTime"></u-steps-item>
				<u-steps-item title="订单完成" :desc="item.endTime"></u-steps-item>
			</u-steps>
			<button class="btn" @click="drugInfo1">查看详情</button>
		</view>
		<view style="display: flex; justify-content: center; margin-top: 30rpx;color: #AAAAAA;" v-if="item.length==0">当前无数据</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				username:'',
				item:[]
			}
		},
		onLoad() {
			let that=this;
			
		},
		methods:{
			search(e){
				if(e!=''&&e!=undefined){
					let that=this;
					uni.showLoading({
						title:'加载中'
					})
					const db=uniCloud.database();
					db.collection('Order_form').where({username:that.username}).get()
					.then(res=>{
						uni.hideLoading();
						that.item=res.result.data;
						console.log(res.result.data)
					})
					console.log("输入的数据：",e);//输入的数据
				}else{
					uni.showToast({
						title:'请输入用户名',
						icon:'none'
					})
				}
			},
			drugInfo1(){
				//空，通过触发父容器事件完成功能
				uni.showLoading({
					title:'加载中'
				})
			},
			//药品详情
			drugInfo2(e){
				console.log(e.currentTarget.dataset.id)
				const db = uniCloud.database();
				db.collection('Order_form').where({_id:e.currentTarget.dataset.id}).get()
				.then(res=>{
					//console.log(res)
					//存储处方信息
					uni.setStorage({
						key:'drugInfo',
						data:res.result.data[0]
					})
					uni.navigateTo({
						url:'../drugInfo/drugInfo'
					})
				})
			},
		}
	}
</script>

<style>
	.content {
		width: 100vw;
		height: 100vh;
		margin: 30rpx 0 15rpx 0;
	}
	.box{
		height: 30%;
		width: 85%;
		display: flex;
		flex-direction: column;
		margin: 5%;
		padding: 2.5%;
		/* box-shadow:盒阴影 */
		/* box-shadow: 5rpx 5rpx 15rpx 1rpx #F56C6C; */
		box-shadow: 5rpx 5rpx 25rpx 5rpx gainsboro;
	}
	.btn{
		width: 190rpx;
		height: 70rpx;
		position: relative;
		left: 35%;
		background: #77B307;
		border-radius: 50rpx;
		margin: 15rpx 0 15rpx 0;
		font-size: 30rpx;
		color: white;
	}
</style>
