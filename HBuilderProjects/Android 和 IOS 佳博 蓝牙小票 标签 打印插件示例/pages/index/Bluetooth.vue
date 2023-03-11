<template>
	<view >
		
	<view class="list"  v-for="(item, index) in data" :key="index">
		<view class="print" @click="connec(item.address)">连接打印机</view>
		<view>{{item.deviceName}}</view>
		<view>{{item.address}}</view>
    </view>
	
	<view class="but">
		<button @click="pairedDevices">获取已配对的蓝牙设备</button>
		<button @click="searchDevices">搜索蓝牙</button>
		<button @click="cancelSearch">取消搜索</button>
	</view>
	<view>{{tip}}</view>
	</view>
</template>

<script>
	const plug=uni.requireNativePlugin('Html5app-Gprinter'); 
	export default {
		data() {
			return {
				tip: '',
				data:[]
			}
		},
		onLoad() {
		},
		methods: {
			pairedDevices()
			{
				let _this=this;
				//获取已配对的蓝牙设备
				plug.pairedDevices(function(e){	
					console.log(JSON.stringify(e));
					if(e.code=="0")
					{
						_this.data=e.list;
					}else
					{
					  uni.showToast({title:"未有配对的设备",icon:"none"});
					}
					
				});
				
			},
			searchDevices()
			{
				let _this=this;
				 //搜索蓝牙设备
				plug.searchDevices(function(e){	
					console.log(JSON.stringify(e));
					if(e.code=="0")
					{
						_this.data=e.list;
					}else
					{
					  uni.showToast({title:e.msg,icon:"none"});
					}
					
				});
				
				
			},
			cancelSearch()
			{
				//取消搜索
				plug.cancelSearch();
			},
			connec(address)
			{
				let _this=this;
				//连接打印机
				plug.connectDevices({address:address},ret=>{
					
					_this.tip=JSON.stringify(ret);
					console.log(JSON.stringify(ret));
					
					
				});
				
			}
		 }
		
		}
</script>
<style>
	.list{ margin: 15px; font-size: 14px; border-bottom: solid 1px #999999;}
	.but{ margin: 10px;margin-top: 35px;}
	.print{float: right; height: 30px; line-height: 30px; text-align: center; width: 100px; background-color: #007AFF;color:#FFFFFF;}
</style>
