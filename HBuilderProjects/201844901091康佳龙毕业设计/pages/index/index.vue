<template>
	<view class="content">
		<!-- 若当前无数据 -->
		<view v-if="length==0" class="none">当前无数据</view>
		
		<!-- 用户 -->
		<view v-if="identity==='用户'">
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
		</view>
		
		<!-- 熬制人员 -->
		<!-- 多个人员从订单池选择订单，选择后改变状态其他人不可选，扫描二维码添加药物熬制，熬制完成distribTime变为只有hms，current变为1 -->
		<view v-if="identity==='熬制人员'">
			<view class="box" v-for="(item,index) in item" :key="item._id" :data-id="item._id" v-if="item.current==0" @click="docEnsure2">
				<view style="margin: 0 0 50rpx 20rpx;">当前订单号：{{item._id}}</view>
				<u-steps :current="item.current">
					<u-steps-item title="已出单" :desc="item.startTime"></u-steps-item>
					<u-steps-item title="熬制中" :desc="item.decoctTime"></u-steps-item>
					<u-steps-item title="运输中" :desc="item.distribTime"></u-steps-item>
					<u-steps-item title="订单完成" :desc="item.endTime"></u-steps-item>
				</u-steps>
				<button class="btn" @click="docEnsure1">开始抓药</button>
			</view>
		</view>
		
		<!-- 配送人员 -->
		<view v-if="identity==='配送人员'">
			<view class="box" v-for="(item,index) in item" :key="item._id" :data-id="item._id" v-if="item.current==2" @click="distEnsure2">
				<view style="margin: 0 0 50rpx 20rpx;">当前订单号：{{item._id}}</view>
				<u-steps :current="item.current">
					<u-steps-item title="已出单" :desc="item.startTime"></u-steps-item>
					<u-steps-item title="熬制中" :desc="item.decoctTime"></u-steps-item>
					<u-steps-item title="运输中" :desc="item.distribTime"></u-steps-item>
					<u-steps-item title="订单完成" :desc="item.endTime"></u-steps-item>
				</u-steps>
				<button class="btn" @click="distEnsure1">接单</button>
			</view>
		</view>
		
		<!-- 管理员 -->
		<view v-if="identity==='管理员'">
			<view class="box2">
				<view class="menu" v-for="(item,index) in menus" :key="index" :data-menu=item[0] @click="goto">
					<image style="width: 15vw" mode="widthFix" :src="item[1]"></image>
					<text class="text">{{item[0]}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				username:'',
				identity:'',
				item:[],
				menus:[['搜索订单','../../static/img/view.png'],['修改订单','../../static/img/change2.png'],['添加用户','../../static/img/addp.png'],['修改用户','../../static/img/change.png'],['添加机器','../../static/img/add.png']],
				length:1,
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
						db.collection('Order_form').where({current:0}).get()
						.then(res => {
							that.length=res.result.data.length;
							console.log(res.result.data.length)
							that.item=res.result.data;
						})
					}else if(res.data.default=='配送人员'){
						db.collection('Order_form').where({current:2}).get()
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
			}, 1200);
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
			docEnsure1(){
				//空，通过触发父容器事件完成功能
				uni.showLoading({
					title:'加载中'
				})
			},
			//开始熬制
			docEnsure2(e){
				let that=this;
					//解析熬制开始时间后传入服务器
					uniCloud.callFunction({
						name:'serverDate',
						success(res){
							var date,time,ymd,hms,result;
							date=res.header.date.split(' ');
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
							// console.log(ymd+'|'+hms);
							// console.log('res:',res);
							//根据单号更新时间
							console.log(e.currentTarget.dataset.id)
							const db = uniCloud.database();
							db.collection('Order_form').where({_id:e.currentTarget.dataset.id}).update({
								decoctTime:hms,
								decoct:that.name,
								current:1
							})
							db.collection('Order_form').where({_id:e.currentTarget.dataset.id}).get()
							.then(res=>{
								//存储处方信息
								uni.setStorage({
									key:'drugInfo',
									data:res.result.data[0]
								})
								//console.log('index数据：',res.result.data[0])
								uni.navigateTo({
									url:'../boil/boil'
								})
							})
							},
						fail(e){console.log(e)},
						complete(){}
					});
			},
			distEnsure1(){
				//空，通过触发父容器事件完成功能
				uni.showLoading({
					title:'加载中'
				})
			},
			distEnsure2(e){
				let that=this;
				uniCloud.callFunction({
					name:'serverDate',
					success(res){
						var date,time,ymd,hms,result;
						date=res.header.date.split(' ');
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
						//根据单号更新时间
						console.log(e.currentTarget.dataset.id)
						const db = uniCloud.database();
						db.collection('Order_form').where({_id:e.currentTarget.dataset.id}).update({
							distribTime:hms,
							distribute:that.name,
							//测试用,测试完成后改为3
							current:2
						})
						db.collection('Order_form').where({_id:e.currentTarget.dataset.id}).get()
						.then(res=>{
							//console.log(res)
							//存储处方信息
							uni.setStorage({
								key:'drugInfo',
								data:res.result.data[0]
							})
							uni.navigateTo({
								url:'../distribute/distribute'
							})
						})
				},
					fail(e){console.log(e)},
					complete(){}
				});
			},
			goto(e){
				//判断跳向哪个页面
				let data=e.currentTarget.dataset.menu
				console.log('页面参数：',e.currentTarget.dataset.menu)
				if(data=='搜索订单'){
					uni.navigateTo({
						url:'../index/search'
					})
				}else if(data=='修改订单'){
					uni.navigateTo({
						url:'../index/change2'
					})
				}else if(data=='添加用户'){
					uni.navigateTo({
						url:'../index/adduser'
					})
				}else if(data=='修改用户'){
					uni.navigateTo({
						url:'../index/change'
					})
				}else if(data=='添加机器'){
					uni.navigateTo({
						url:'../index/addmachine'
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
		margin: 60rpx 0 20rpx 0;
	}
	.none{
		height: 40vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.box{
		height: 33%;
		width: 85%;
		display: flex;
		flex-direction: column;
		margin: 5%;
		padding: 2.5%;
		/* box-shadow:盒阴影 */
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
	.mbtn{
		width: 60vw;
		height: 70rpx;
		position: relative;
		left: 20%;
		background: #77B307;
		border-radius: 50rpx;
		margin: 35rpx 0 35rpx 0;
		font-size: 30rpx;
		color: white;
	}
	.box2{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: 2%;
		padding: 2%;
	}
	.menu{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 1% 0 1% 0;
		padding: 2%;
	}
	.text{
		font-size: 35rpx;
		margin-top: 10rpx;
	}
</style>
