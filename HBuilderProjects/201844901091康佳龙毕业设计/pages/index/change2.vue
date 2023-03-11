<template>
	<view class="content">
		<!-- 修改订单信息 -->
		<u-search placeholder="请输入订单号" v-model="drugId" @custom="search"></u-search>
		
		<!-- 订单信息 -->
		
	</view>
</template>

<script>
	export default {
		data(){
			return{
				drugId:'',
				drugInfo:''
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
					db.collection('Order_form').where({_id:that.drugId}).get()
					.then(res=>{
						uni.hideLoading();
						that.drugInfo=res.result.data[0];
						console.log(res.result.data[0]);
						if(that.drugInfo==undefined){
							uni.showToast({
								title:'数据为空',
								icon:'none'
							})
						}
					})
					console.log("输入的数据：",e);//输入的数据
				}else{
					uni.showToast({
						title:'请输入订单号',
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style>
	.content {
		width: 100vw;
		height: 100vh;
		margin: 30rpx 0 20rpx 0;
	}
</style>
