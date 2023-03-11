<template>
	<view class="content">
		<!-- 修改用户信息 -->
		<u-search placeholder="请输入用户名" v-model="username" @custom="search"></u-search>
		
		<!-- 用户信息 -->
		<view class="box" v-if="userInfo!=''&&userinfo!=undefined">
			<view class="row">
				<text>用户名：</text>
				<text>{{userInfo.username}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data(){
			return{
				username:'',
				userInfo:''
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
					db.collection('identity').where({username:that.username}).get()
					.then(res=>{
						uni.hideLoading();
						that.userInfo=res.result.data[0];
						console.log(res.result.data[0]);
						if(that.userInfo==undefined){
							uni.showToast({
								title:'数据为空',
								icon:'none'
							})
						}
					})
					console.log("输入的数据：",e);//输入的数据
				}else{
					uni.showToast({
						title:'请输入用户名',
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
