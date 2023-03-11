<template>
	<view class="content">
		<view class="box">
			<text style="font-size: 35rpx;margin-right: 15rpx;">处方单号:</text><view style="margin: 0 0 50rpx 20rpx;font-size: 35rpx;">{{drugInfo._id}}</view>
			<view class="row">
				<view class="line">
					<text class="text">姓名:</text><view class="borderBottom">{{drugInfo.username}}</view>
				</view>
				<view class="line">
					<text class="text2">电话:</text><view class="borderBottom">{{drugInfo.phone}}</view>
				</view>
			</view>
			<view class="row">
				<view class="line">
					<text class="text">熬制人员:</text><view class="borderBottom">{{drugInfo.decoct}}</view>
				</view>
				<view class="line">
					<text class="text3">开始时间:</text><view class="borderBottom2">{{drugInfo.decoctTime}}</view>
				</view>
			</view>
			<view class="row" v-if="flag">
				<text style="margin-left: 30rpx;color: #F56C6C;">本处方部分药品含有毒性，请严格遵守医嘱熬制</text>
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
				<text class="text">建议:{{drugInfo.docAdvice}}</text>
			</view>
			<view class="row">
				<text class="text">熬药机名称：</text><view class="borderBottom">{{drugInfo.numOfDecoct}}</view>
			</view>
			<button :class="drug?'btn':'nbtn'" @click="scancode1">扫描熬药机二维码</button>
			
			
			<view class="row">
				<text class="text">设置熬药提醒时间:</text><picker class="borderBottom" mode="time" value="00:30" @change="change">{{time}}</picker>
				<button class="btn2" @click="start">开始</button>
			</view>
			
			<button :class="machine?'btn':'nbtn'" @click="end">熬制完成开始配送</button>
			<!-- 条形码 -->
			<!-- <w-barcode :options="options1"></w-barcode> -->
			<!-- 二维码 -->
			<w-qrcode :options="options2"></w-qrcode>
		</view>
	</view>
</template>

<script>
	let workers=[];//熬药机工作人员记录
	let times=[];//熬药机事件记录
	let drugIds=[];//熬药机记录处方
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
					code: 'EA888',// 生成条形码的值
				},
				// 二维码
				options2:{
					code: '222',// 生成二维码的值
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
						console.log(that.options2.code)
						that.length=that.drugInfo.drugInfo.length;
						console.log("药品数量：",that.length);
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
			scancode1(event){
				let that=this;
				//所有药品信息正确才可扫描熬药机
				if(that.drug==true){
					uni.scanCode({
						// 只允许通过相机扫码
						//onlyFromCamera: true,
					    success: function (res) {
					        console.log('条码类型：' + res.scanType);
					        console.log('条码内容：' + res.result);
							let rs=res.result;
							const db = uniCloud.database();
								//扫描熬药机二维码,判断是否是熬药机再更新数据
								let arr=res.result.split(0);
								console.log("分割数组：",arr);
								//判断规则
								if(arr[0]=='NumOfMachine'){
									that.machine=true;
									that.drugInfo.numOfDecoct=res.result;
									db.collection('Boil_machine').where({name:res.result}).get()
									.then(res=>{
										workers=res.result.data[0].worker;
										workers.push(that.drugInfo.decoct);
										drugIds=res.result.data[0].drugId;
										drugIds.push(that.drugInfo._id);
										times=res.result.data[0].time;
										
										//当前时间
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
												console.log(ymd+'|'+hms);
												console.log('res:',res);
												times.push([ymd,hms]);
												console.log("workers:",workers,"times:",times,"drugIds:",drugIds);
												db.collection('Order_form').where({_id:that.drugInfo._id}).update({
													numOfDecoct:rs
												})
												db.collection('Boil_machine').where({name:res.result}).update({
													drugId:drugIds,
													worker:workers,
													time:times
												})
												
												},
											fail(e){console.log(e)}
										});
										
										
									
									
									})
								}else{
									uni.showModal({
										title:'提示',
										content:'请扫描正确二维码',
										success: function (res) {
											if (res.confirm) {
												console.log('用户点击确定');
											} else if (res.cancel) {
												console.log('用户点击取消');
											}
										}
									})
								}
					    }
					});
				}else{
					let unselected=[];
					for(let m=0;m<that.length;m++){
						if(that.arrIndex[m]==0){
							console.log(that.drugInfo.drugInfo[m][0],"未选");
							unselected.push(that.drugInfo.drugInfo[m][0])
						}
					}
					uni.showToast({
						title:'提示:'+unselected+'未选',
						icon:'none',
						duration:2000,
					})
					console.log("未选择药品：",unselected)
				}
			},
			scancode2(event){
				let that=this;
				//判断药品信息是否正确
					uni.scanCode({
						// 只允许通过相机扫码
						//onlyFromCamera: true,
						success: function (res) {
							console.log('条码类型：' + res.scanType);
							console.log('条码内容：' + res.result);
								//扫描药品二维码，判断是否是药品二维码
								let j=0;
								for(j;j<that.length;j++){
									if(that.arrIndex[j]==0&&res.result==that.drugInfo.drugInfo[j][0]){
										//药品二维码正确,arrIndex每个元素对应是否选择,0否1是
										that.i+=1;
										that.arrIndex[j]=1;
										that.drugInfo.drugInfo[j][3]=true;
										console.log("已配对数量：",that.i);
										console.log("已配对药物：",res.result);
										console.log("arrIndex:",that.arrIndex)
										break;
									}else if(that.arrIndex[j]==1&&res.result==that.drugInfo.drugInfo[j][0]){
										console.log(that.drugInfo.drugInfo[j][0],"已被选择")
										uni.showToast({
											title:that.drugInfo.drugInfo[j][0]+'已被选择,请勿重复扫码',
											icon:'none',
											duration:2000,
										})
									}else if(j==that.length-1&&res.result!=that.drugInfo.drugInfo[j][0]){
										console.log("警告:",that.drugInfo.drugInfo[j][0],"未在药方中")
										uni.showToast({
											title:'警告:'+that.drugInfo.drugInfo[j][0]+'不在药方中！',
											icon:'none',
											duration:2000,
										})
									}
								}
								if(that.i==that.length)that.drug=true;
						}
					});
			},
			change(e){
				this.time=e.detail.value;
				//console.log(e)
			},
			start(){
				let content='';
				let hm='',h='',m='',time='';
				if(this.time!='00时:00分'){
					hm=this.time.split(':');
					h=hm[0];
					m=hm[1];
					time=(h*60*60*1000)+(m*60*1000);
					content=this.drugInfo.numOfDecoct+'已经完成熬制，请尽快处理';
					uni.showToast({
						title:'开始计时',
						icon:'none',
						duration:2000,
						success() {
							//开始计时，完成时提醒
							let i=setTimeout(function(){
								uni.showModal({
									title:'提示',
									content:content,
									success: function (res) {
										if (res.confirm) {
											clearTimeout(i);
											console.log('用户点击确定');
										} else if (res.cancel) {
											clearTimeout(i);
											console.log('用户点击取消');
										}
									}
								})
							},time);
						}
					})
				}else{
					content='请选择时间';
					uni.showModal({
						content:content
					})
				}
			},
			end(){
				let that=this;
				if(that.machine==true){
					//更新订单状态等待配送人员接单开始配送
					const db = uniCloud.database();
					db.collection('Order_form').where({_id:that.drugInfo._id}).update({
						current:2
					})
					.then(res=>{
						uni.showToast({
							icon:'success',
							title:'熬制完成',
							duration:1000,
							success() {
								uni.reLaunch({
									url:'../index/index'
								})
							}
						})
					})
				}else{
					uni.showToast({
						title:'提示:请扫描熬药机后再点击此按钮',
						icon:'none',
						duration:2000,
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
		width: 90vw;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: flex-start;
		margin: 0 0 30rpx 0;
		font-size: 35rpx;
		color: rgb(72, 190, 163);
	}
	.line{
		display: flex;
		flex-direction: row;
	}
	.text{
		margin: 0 10rpx 0 50rpx;
	}
	.text2{
		margin: 0 10rpx 0 90rpx;
	}
	.text3{
		position: absolute;
		right: 210rpx;
	}
	.borderBottom{
		margin-right: 30rpx;
		border-bottom: 1px solid rgb(72, 190, 163);
	}
	.borderBottom2{
		position: absolute;
		right: 80rpx;
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
		font-size: 30rpx;
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
	.nbtn{
		height: 60rpx;
		background: #DADBDE;
		border-radius: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 25rpx;
		font-size: 30rpx;
		color: #767A82;
	}
	.btn2{
		width: 120rpx;
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #77B307;
		border-radius: 50rpx;
		font-size: 30rpx;
		color: white;
	}
</style>
