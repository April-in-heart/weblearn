<template>
	<view class="content">
		<!-- <view class="top">
			<view class="topBox">年</view>
			<view class="topBox">月</view>
			<view class="topBox">日</view>
		</view> -->
		
		<!-- 若当前无数据 -->
		<view v-if="length==0" class="none">当前无数据</view>
		
		<!-- 用户 -->
		<view v-if="identity==='用户'">
			<view class="box" v-for="(item,index) in item" :key="item._id" :data-id="item._id" @click="drugInfo2">
				<view style="margin: 0 0 50rpx 20rpx;">订单号：{{item._id}}</view>
				<u-steps :current="item.current">
					<u-steps-item title="已出单" :desc="item.startTime"></u-steps-item>
					<u-steps-item title="熬制中" :desc="item.decoctTime"></u-steps-item>
					<u-steps-item title="运输中" :desc="item.distribTime"></u-steps-item>
					<u-steps-item title="订单完成" :desc="item.endTime"></u-steps-item>
				</u-steps>
				<button class="btn" @click="drugInfo1">查看详情</button>
			</view>
		</view>
		
		<!-- 熬制人员 -->
		<view v-if="identity==='熬制人员'">
			<view class="box" v-for="(item,index) in item" :key="item._id" :data-id="item._id" @click="drugInfo2">
				<view style="margin: 0 0 50rpx 20rpx;">订单号：{{item._id}}</view>
				<u-steps :current="item.current">
					<u-steps-item title="已出单" :desc="item.startTime"></u-steps-item>
					<u-steps-item title="熬制中" :desc="item.decoctTime"></u-steps-item>
					<u-steps-item title="运输中" :desc="item.distribTime"></u-steps-item>
					<u-steps-item title="订单完成" :desc="item.endTime"></u-steps-item>
				</u-steps>
				<button class="btn" @click="drugInfo1">查看详情</button>
			</view>
		</view>
		
		<!-- 配送人员 -->
		<view v-if="identity==='配送人员'">
			<view class="box" v-for="(item,index) in item" :key="item._id" :data-id="item._id" @click="drugInfo2">
				<view style="margin: 0 0 50rpx 20rpx;">订单号：{{item._id}}</view>
				<u-steps :current="item.current">
					<u-steps-item title="已出单" :desc="item.startTime"></u-steps-item>
					<u-steps-item title="熬制中" :desc="item.decoctTime"></u-steps-item>
					<u-steps-item title="运输中" :desc="item.distribTime"></u-steps-item>
					<u-steps-item title="订单完成" :desc="item.endTime"></u-steps-item>
				</u-steps>
				<button class="btn" @click="drugInfo1">查看详情</button>
			</view>
		</view>
		
		<!-- 管理员 -->
		<view v-if="identity==='管理员'">
			<view class="box" v-for="(item,index) in item" :key="item._id" :data-id="item._id" @click="drugInfo2">
				<view style="margin: 0 0 50rpx 20rpx;">订单号：{{item._id}}</view>
				<u-steps :current="item.current">
					<u-steps-item title="已出单" :desc="item.startTime"></u-steps-item>
					<u-steps-item title="熬制中" :desc="item.decoctTime"></u-steps-item>
					<u-steps-item title="运输中" :desc="item.distribTime"></u-steps-item>
					<u-steps-item title="订单完成" :desc="item.endTime"></u-steps-item>
				</u-steps>
				<button class="btn" @click="drugInfo1">查看详情</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				identity:'',
				item:[],
				length:1,
			}
		},
		computed:{
			time(){
				
			}
		},
		onLoad(e) {
			let that=this;
			uni.showLoading({
				title:'加载中'
			})
			//获取用户信息
			uni.getStorage({
			    key: 'user_info',
			    success: function (res) {
					that.name=res.data.username;
					that.identity=res.data.default;
			        console.log(that.identity+'身份获取成功');
					//根据name连接数据库获取订单数据
					const db=uniCloud.database();
					if(res.data.default=='用户'){
						db.collection('Order_form').where({username:that.name}).get()
						.then(res => {
							that.length=res.result.data.length;
							console.log(res.result.data.length)
							that.item=res.result.data;
						})
					}else if(res.data.default=='熬制人员'){
						db.collection('Order_form').where({decoct:that.name}).get()
						.then(res => {
							that.length=res.result.data.length;
							console.log(res.result.data.length)
							that.item=res.result.data;
						})
					}else if(res.data.default=='配送人员'){
						db.collection('Order_form').where({distribute:that.name}).get()
						.then(res => {
							that.length=res.result.data.length;
							console.log(res.result.data.length)
							that.item=res.result.data;
						})
					}else{
						db.collection('Order_form').get()
						.then(res => {
							that.length=res.result.data.length;
							console.log(res.result.data.length)
							that.item=res.result.data;
						})
					}
			    }
			});
		},
		onReady(){
			setTimeout(function () {
				uni.hideLoading();
			}, 300);
		},
		methods: {
			drugInfo1(){
				//空，通过触发父容器事件完成功能
				uni.showLoading({
					title:'加载中'
				})
			},
			//药品详情
			drugInfo2(e){
				//根据单号更新时间
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
	.top{
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.topBox{
		height: 4%;
		width: 4%;
		display: flex;
		flex-direction: column;
		margin: 1%;
		padding: 1%;
		border: #9ACAFC 2rpx solid;
		/* box-shadow:盒阴影 */
		box-shadow: 5rpx 5rpx 25rpx 5rpx gainsboro;
	}
	.none{
		height: 40vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.box{
		height: 40%;
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
