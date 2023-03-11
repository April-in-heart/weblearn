<template>
	<view class="content">
		<view class="avatorWrapper">
			<view class="avator">
				<image class="img" src="../../static/img/aozhi.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="form">
			<input class="inputWrapper" v-model="machineName" @focus="enter(true)" @blur="enter(false)" type="number" placeholder="请输入熬药机三位数编号"/>
			<view class="warn" v-if="warn">
				<text>仅需输入数字编号</text>
			</view>
			<button class="registBtn" @tap="add">新增</button>
			<view class="warn" v-if="error">
				<text>{{error}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				machineName:'',
				warn:'',
				error:''
			}
		},
		onLoad() {

		},
		methods: {
			enter(a){
				this.warn=a
			},
			add(){
				this.machineName='NumOfMachine'+this.machineName;
				console.log(this.machineName);
				let machineName=this.machineName;
				const db = uniCloud.database();
				db.collection('Boil_machine').get()
				.then(res=>{
					if(machineName!=''&&machineName.length==15){
						for(let i=0;i<res.result.data.length;i++){
							if(machineName===res.result.data[i].name){
								this.machineName='';
								this.error='用户已存在';
								break;
							}
						}
						if(this.error!='用户已存在'){
								//合规范则将数据写入数据库
								db.collection('Boil_machine').add({
									name:machineName,
									worker:[],
									time:[],
									drugId:[]
								})
								uni.showModal({
									title:'提示',
									content:'添加成功',
									duration:2000,
									success() {
										uni.switchTab({
											url:'../index/index'
										})
									}
								})
						}
					}else{
						this.machineName='';
						this.error='请输入正确熬药机名称';
					}
				})
				this.machineName='';
			}
		}
	}
</script>

<style>
	.content {
		background: #377EB4;
		width: 100vw;
		height: 100vh;
	}
	.avatorWrapper{
		height: 25vh;
		width: 100vw;
		/* 水平垂直居中 */
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}
	.avator{
		width: 200rpx;
		height: 200rpx;
		overflow: hidden;
	}
	.avator .img{
		width: 100%
	}
	.form{
		padding: 0 60rpx;
		margin-top: 50rpx;
	}
	.inputWrapper{
		width: 100%;
		height: 80rpx;
		background: white;
		border-radius: 50rpx;
		box-sizing: border-box;
		padding: 0 20rpx;
		margin-top: 100rpx;
		text-align: center;
		font-size: 25rpx;
	}
	.warn{
		text-align: center;
		color: #F0AD4E;
		font-size: 20rpx;
		margin-top: 15rpx;
	}
	.registBtn{
		width: 100%;
		height: 80rpx;
		background: #77B307;
		border-radius: 50rpx;
		margin-top: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
	}
</style>