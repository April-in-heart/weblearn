<template>
	<view class="content">
		<view class="box">
			<text style="font-size: 35rpx;margin-right: 15rpx;">处方单号:</text><view style="margin: 10rpx 0 20rpx 20rpx;font-size: 35rpx;">{{drugInfo._id}}</view>
			<view class="box3">
				<u-steps :current="drugInfo.current-1">
					<u-steps-item title="熬制中" :desc="drugInfo.decoctTime"></u-steps-item>
					<u-steps-item title="运输中" :desc="drugInfo.distribTime"></u-steps-item>
					<u-steps-item title="订单完成" :desc="drugInfo.endTime"></u-steps-item>
				</u-steps>
			</view>
			<view class="row">
				<text class="text">姓名:</text><view class="borderBottom">{{drugInfo.username}}</view>
				<text class="text">电话:</text><view class="borderBottom">{{drugInfo.phone}}</view>
			</view>
			<view class="row">
				<text v-if="drugInfo.decoctTime!='未开始'" class="text">熬制人员:</text><view v-if="drugInfo.decoctTime!='未开始'" class="borderBottom">{{drugInfo.decoct}}</view>
				<text v-if="drugInfo.distribTime!='未开始'" class="text">配送人员:</text><view v-if="drugInfo.distribTime!='未开始'" class="borderBottom">{{drugInfo.distribute}}</view>
			</view>
			<view class="row2" v-if="drugInfo.numOfDecoct!='请扫描熬药机条码'">
				<text class="text">熬药机名称：</text><view class="borderBottom">{{drugInfo.numOfDecoct}}</view>
			</view>
			<view class="row" v-if="flag">
				<text style="margin-left: 30rpx;color: #F56C6C;">本处方部分药品含有毒性，请严格遵守医嘱服用</text>
			</view>
			<!-- 药品 -->
			<view class="box2" @click="scancode2">
				<!-- item[3]=true表示已选，item[4]=true表示有毒性 -->
				<view v-for="(item,index) in drugInfo.drugInfo" :class="item[3]==true?'drugBox':'drugBox2'" :key="index">
					<view :class="item[4]=='true'?'border2':'border'">{{item[0]}}</view>
					<view class="right">
						<view class="border">{{item[2]}}</view>
						<view class="border">{{item[1]}}</view>
					</view>
				</view>
			</view>
			<view class="row">
				<text style="margin-left: 30rpx;">建议:{{drugInfo.docAdvice}}</text>
			</view>
			
			<button class="btn" @click="back">确定/返回</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				drugInfo:'',
				arrIndex:[0],
				i:0,
				length:'',
				flag:false,
				time:'00时:00分',
				drug:false,//药品是否全部正确
				machine:false,//机器是否扫描
				// 条形码
				options1:{
					width: 670, // 宽度 单位rpx
					height: 100, // 高度 单位rpx
					code: '',// 生成条形码的值
				},
				// 二维码
				options2:{
					code: '',// 生成二维码的值
					size: 460,// 460代表生成的二维码的宽高均为460rpx
				},
			}
		},
		onLoad(e) {
			let that=this;
			uni.showLoading({
				title:'加载中'
			})
			uni.getStorage({
				key:'drugInfo',
				success:function(res){
					//可能修改后直接退出，所以根据本地数据更新数据库
					const db=uniCloud.database();
					db.collection('Order_form').where({_id:res.data._id}).get()
					.then(res=>{
						let r=res.result.data[0];
						console.log(res.result.data[0]);
						that.drugInfo=r;
						console.log('数据库数据',r);
						that.options2.code=that.drugInfo._id;//更新二维码显示
						console.log('二维码:',that.options2.code)
						that.length=that.drugInfo.drugInfo.length;
						console.log("药品数量:",that.length);
						
						for(let m=0;m<that.length;m++){
							that.arrIndex[m]=0;
							if(that.drugInfo.drugInfo[m][4]=='true'){
								console.log(that.drugInfo.drugInfo[m][0],"有毒性");
								that.flag=true;
							}
						}
						console.log(that.arrIndex);
						//修改本地数据身份
						// let _drugInfo = uni.getStorageSync('drugInfo');
						// _drugInfo.drugInfo = that.drugInfo.drugInfo;
						// uni.setStorageSync('drugInfo',_drugInfo);
					})
				}
			})
		},
		onReady(){
			let that=this;
			setTimeout(function () {
				uni.hideLoading();
			}, 1200);
			
		},
		methods: {
			back(){
				uni.reLaunch({
					url:'../index/index'
				})
			}
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
		width: 85%;
		display: flex;
		flex-direction: column;
		/* 副轴居中对齐 */
		align-items: center;
		margin: 5%;
		padding: 2.5%;
		/* box-shadow:盒阴影 */
		box-shadow: 5rpx 5rpx 25rpx 5rpx gainsboro;
	}
	.row{
		display: flex;
		justify-content: center;
		margin: 0 0 30rpx 0;
		font-size: 35rpx;
		color: rgb(72, 190, 163);
	}
	.text{
		margin-right: 15rpx;
	}
	.borderBottom{
		margin-right: 30rpx;
		border-bottom: 1px solid rgb(72, 190, 163);
	}
	.row2{
		display: flex;
		margin: 0 0 30rpx 0;
		font-size: 35rpx;
		color: rgb(72, 190, 163);
	}
	.box2{
		display: flex;
		flex-wrap: wrap;
		align-content: space-between;
		margin: 0 0 30rpx 0;
	}
	.box3{
		height: 33%;
		width: 85%;
		display: flex;
		flex-direction: column;
		margin: 0 30rpx 30rpx 30rpx;
	}
	.drugBox{
		height: 120rpx;
		display: flex;
		margin: 0 30rpx 30rpx 30rpx;
		border: 1px solid rgb(72, 190, 163);
	}
	.drugBox2{
		height: 120rpx;
		display: flex;
		margin: 0 30rpx 30rpx 30rpx;
		border: 1px solid rgb(255,10,10);
	}
	.border{
		width: 100rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 5rpx 10rpx 5rpx 10rpx;
		border: 1px solid rgb(72, 190, 163);
	}
	.border2{
		width: 100rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 5rpx 10rpx 5rpx 10rpx;
		border: 1px solid #EE6363;
	}
	.right{
		display: flex;
		flex-direction: column;
	}
	.btn{
		height: 60rpx;
		background: #77B307;
		border-radius: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 25rpx;
		font-size: 30rpx;
		color: white;
	}
</style>
