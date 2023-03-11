<template>
	<view class="content">
	<view>
	<button @click="openDefault" >打开默认蓝牙搜索</button>
	<button @click="open" >打开自定义蓝牙搜索页面</button>
	<button @click="connectIP" >端口ip连接打印机</button>
	<button @click="connectUSB" >USB连接打印机</button>
	<button @click="state" >打印机状态</button>
	<button @click="dis" >断开打印机</button>
	</view>
	<view class="print_btu">
			<button @click="openEscPage" >ESC 打印小票</button>
			<button @click="openTscPage" >TSC 打印标签</button>
			<button @click="openCPCLPage" >CPCL 打印面单</button>
	</view>	
	 <text>{{tip}}</text>
	</view>
</template>

<script>
	const plug= uni.requireNativePlugin('Html5app-Gprinter');
	export default {
		data() {
			return {
				tip: '',
				numindex:0
			}
		},
		onLoad() {
	
		},
		methods: {
			openDefault()
			{
				//默认的蓝牙连接打印机.搜索框
				const _this=this;
				plug.BluetoothPort({setBackgroundColor:"#2088d2"},result=>{
					
					_this.tip=JSON.stringify(result);
					console.log(_this.tip);
					
				});
			},
			open(){
				
				//打开自定义蓝牙搜索页面
				uni.navigateTo({
					"url":"./Bluetooth"
				});
				
			},
			connectIP()
			{
				//端口网络连接
				let _this=this;
				plug.connectIP({},ret=>{	
					
					_this.tip=JSON.stringify(ret);
					console.log(_this.tip);
					
					
				});
				
			},
			connectUSB()
			{
				//端口网络连接
				let _this=this;
				plug.connectUSB({setBackgroundColor:"#2088d2"},ret=>{	
					
					_this.tip=JSON.stringify(ret);
					console.log(_this.tip);
				
				});
				
			},
			state(){
				
				//查询打印机状态 
				let _this=this;
				plug.state({},ret=>{
					
					_this.tip=JSON.stringify(ret);
					console.log(_this.tip);
				});
				
				
			},
			dis()
			{
				//断开打印机
				let _this=this;
				_this.numindex=0;
				plug.disconnect({},ret=>{	
					_this.tip=JSON.stringify(ret);
					console.log(_this.tip);
				});
				
			},
			openEscPage()
			{
				uni.navigateTo({
					url:"./esc_page"
				});
			},
			openTscPage(){
				uni.navigateTo({
					url:"./tsc_page"
				});
			},
			openCPCLPage(){
				
				uni.navigateTo({
					url:"./cpcl_page"
				});
				
			}
		}	
	}
</script>

<style>
	.content {
			margin:45px;
			margin-top:30px;
		}
	.print_btu{ margin-top: 35px;}	
	button{ margin-bottom:10px;}
</style>
