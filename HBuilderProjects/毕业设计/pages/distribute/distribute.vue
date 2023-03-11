<template>
	<view content>
		<map style="width: 100vw;height: 60vh;" :scale="scale" :latitude="latitude" :longitude="longitude" :markers="points" :polyline="polyline"></map>
		<view class="box">
			<view class="row">
				<view class="text0">提示：请先确认单号是否与物品单号一致再开始配送</view>
			</view>
			<view class="row">
				<text class="text">单号</text><view class="text">{{id}}</view>
			</view>
			<view class="row">
				<text class="text">联系人:</text>
				<u--text mode="name" :text="name" format="encrypt"></u--text>
			</view>
			<view class="row">
				<text class="text">联系电话:</text><view class="text">{{phone}}</view>
			</view>
			<view class="row">
				<text class="text">配送地址:</text><view class="text">{{address}}</view>
			</view>
			<view class="row">
				<text class="text">预计需要</text><view class="text">{{h==''?'':h+'小时'}}{{m}}分{{s}}秒</view>
			</view>
			<view class="row">
				<text class="text">预计送达时间:</text><view class="text">{{time}}</view>
			</view>
			<view class="row">
				<button class="btn" @click="end">送达</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scale:'',
				id:'',
				name:'',
				phone:'',
				time:'',
				h:'',
				m:'',
				s:'',
				index:0,
				address:'',
				latitude: 0,
				longitude: 0,
                polyline:[
                    {//指定一系列坐标点，从数组第一项连线至最后一项
                    　　　　points:[
                           　　{latitude: 0,longitude: 0},
                          　　 {latitude: 0,longitude: 0},
                    　　　　],
                    　　　　color:"#77B307",//线的颜色
                    　　　　width:2,//线的宽度
                    　　}
                ],
				points: [{
					id:0,
					title:'起始点',
					width:50,
					height:50,
					latitude: 0,
					longitude: 0,
					iconPath: '/static/img/peisong.png',
					callout:{//自定义标记点上方的气泡窗口 点击有效  
					　　content:'',//文本
					　　color:'#ffffff',//文字颜色
					　　fontSize:14,//文本大小
					　　borderRadius:2,//边框圆角
					　　bgColor:'#00c16f',//背景颜色
					　　display:'ALWAYS',//常显
					},
				  
				}, {
					id:1,
					title:'终点',
					width:50,
					height:50,
					alpha:0.7,   //透明度
					latitude: 0,
					longitude: 0,
					iconPath: '../../static/img/mine2.png'
				}]
			}
		},
		onLoad(e) {
			let that=this;
			uni.showLoading({
				title:'加载中'
			})
			uni.getStorage({
				key:'avatar',
				success(res) {
					uni.getLocation({
						success(res) {
							let Longitude=res.longitude;
							let Latitude=res.latitude;
							that.points[0].longitude=Longitude;//当前经度
							that.points[0].latitude=Latitude;//当前纬度
							that.polyline[0].points[0].longitude=Longitude;
							that.polyline[0].points[0].latitude=Latitude;
							console.log('当前经纬度：',that.points[0].longitude,that.points[0].latitude);
							uni.getStorage({
								key:'drugInfo',
								success(res) {
									that.id=res.data._id;
									that.phone=res.data.phone;
									that.name=res.data.username;
									console.log(res.data)
									that.address=res.data.address[res.data.index][0];
									
									let hms=res.data.distribTime.split(':');
									
									that.$nextTick(()=>{
										console.log('wait')
									})
									
									const db=uniCloud.database();
									db.collection('identity').where({username:that.name}).get()
									.then(res=>{
										console.log(res.result.data[0].avatar);
										that.points[1].iconPath=res.result.data[0].avatar;
									})
									db.collection('Order_form').where({_id:that.id}).get()
									.then(res=>{
										that.index=res.result.data[0].index;
										//longitude
										let ads0=res.result.data[0].address[that.index][1];
										//latitude
										let ads1=res.result.data[0].address[that.index][2];
										that.points[1].longitude=ads0;//当前经度
										that.points[1].latitude=ads1;//当前纬度
										that.polyline[0].points[1].longitude=ads0;
										that.polyline[0].points[1].latitude=ads1;
										that.longitude=((Longitude-ads0)/2+ads0).toFixed(6);
										that.latitude=((Latitude-ads1)/2+ads1).toFixed(6);
										
										//计算距离与需要的时间
										let h=0,m=0,s=0;
										let speed=5;//骑手速度
										
										let start_lon=that.points[0].longitude;
										let start_lat=that.points[0].latitude;
										let end_lon=that.points[1].longitude;
										let end_lat=that.points[1].latitude;
										let radLat1 = (start_lat * Math.PI) / 180.0;
										let radLat2 = (end_lat * Math.PI) / 180.0;
										let a = radLat1 - radLat2;
										let b = (start_lon * Math.PI) / 180.0 - (end_lon * Math.PI) / 180.0;
										let x = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
										x = x * 6378.137; // 地球半径;
										x = Math.round(x * 10000) / 10000;
										x=x*1400;
										let Distance=Math.ceil(x);
										console.log('距离为：'+x+'m')
										//计算地图缩放比例3~19,比例尺可以稍大，不能稍小，所以从
										if(Distance>1000000){that.scale=4;}
										else if(Distance>500000){that.scale=5;}
										else if(Distance>200000){that.scale=6;}
										else if(Distance>100000){that.scale=7;}
										else if(Distance>50000){that.scale=9;}
										else if(Distance>20000){that.scale=10;}
										else if(Distance>10000){that.scale=11;}
										else if(Distance>5000){that.scale=12;}
										else if(Distance>2000){that.scale=13;}
										else if(Distance>1000){that.scale=14;}
										else if(Distance>500){that.scale=15;}
										else{that.scale=16;}
										console.log("当前缩放比例：",that.scale);
										
										
										h=parseInt(Distance/(3600*speed));
										m=parseInt((Distance-h*(3600*speed))/(60*speed));
										s=parseInt((Distance-h*(3600*speed)-m*(60*speed))/speed);
										that.h=h;
										that.m=m;
										that.s=s;
										console.log("时分秒：",h,m,s);
										that.points[0].callout.content='距离你'+Distance+'米'+'需要'+(h==''?'':h+'小时')+m+'分';
										let Time=(parseInt(hms[0])+h)+":"+(parseInt(hms[1])+m)+":"+(parseInt(hms[2])+s);
										console.log("当前时间:",hms,"预计时间:",Time);
										that.time=Time;
										
										that.$nextTick(()=>{
											//DOM元素更新后进行，确保渲染出数据
											console.log('end')
										})
										
										console.log("中心点经纬度：",that.longitude,that.latitude)
										console.log("数据库经纬度：",ads0,ads1);
									})
									
									
								}
							})
						}
					})
				}
			})
		},
		onReady(){
			setTimeout(function () {
				uni.hideLoading();
			}, 300);
		},
		methods: {
			end(){
				let that=this;
				uniCloud.callFunction({
					name:'serverDate',
					success(res){
						var date,time,ymd,hms,result;//date:Thu, 07 Apr 2022 15:57:16 GMT
						date=res.header.date.split(' ');
						console.log("res:",res.header.date)
						console.log("date:",date)
						time=date[4].split(':');
						//解析月
						switch(date[2]){
							case "Jan":
								date[2]=1;
								break;
							case "Feb":
								date[2]=2;
								break;
							case "Mar":
								date[2]=3;
								break;
							case "Apr":
								date[2]=4;
								break;
							case "May":
								date[2]=5;
								break;
							case "Jun":
								date[2]=6;
								break;
							case "Jul":
								date[2]=7;
								break;
							case "Aug":
								date[2]=8;
								break;
							case "Sept":
								date[2]=9;
								break;
							case "Oct":
								date[2]=10;
								break;
							case "Nov":
								date[2]=11;
								break;
							case "Dec":
								date[2]=12;
								break;
						}
						hms=(parseInt(time[0])+8)+':'+time[1]+':'+time[2];
						ymd=date[3]+'/'+date[2]+'/'+date[1];
						result=ymd+'|'+hms;
						uni.showModal({
							title:'提示',
							content:'是否确认送达？',
							success: function (res) {
								if (res.confirm) {
									uni.showToast({
										title:'送达成功',
										icon:'none',
										duration:2000,
										success() {
											//根据单号更新时间
											const db = uniCloud.database();
											db.collection('Order_form').where({_id:that.id}).update({
												endTime:hms,
												current:3
											})
											.then(res=>{
												console.log('用户点击确定');
												console.log('数据更新成功');
												uni.reLaunch({
													url:'../index/index'
												})
											})
										}
									})
								} else if (res.cancel) {
									
									console.log('用户点击取消');
								}
							}
						})
					},
					fail(e){console.log(e)},
					complete(){}
				});
				
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
		width: 96vw;
		display: flex;
		flex-direction: column;
		/* 副轴居中对齐 */
		/* align-items: center; */
		margin: 20rpx 0 0 15rpx;
		/* box-shadow:盒阴影 */
		box-shadow: 5rpx 5rpx 25rpx 5rpx gainsboro;
	}
	.row{
		display: flex;
		justify-content: flex-start;
		margin: 10rpx 0 30rpx 20rpx;
		font-size: 35rpx;
		/* color: rgb(72, 190, 163); */
	}
	.btn{
		width: 240rpx;
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #77B307;
		margin-bottom: 20rpx;
		border-radius: 50rpx;
		font-size: 30rpx;
		color: white;
	}
	.text0{
		color: #F56C6C;
		font-size: 26rpx;
		margin-top: 15rpx;
	}
	.text{
		margin-right: 15rpx;
	}
</style>
