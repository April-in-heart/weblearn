<template>
	<view class="content">
		<view class="newslist" v-for="(item,index) in news" :key="index" @tap="openinfo" :data-newsid="item.post_id">
			<image :src="item.cover" mode="widthFix"></image>
			<view class="news-title">{{item.title}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				news:[]
			}
		},
		onLoad() {
			uni.showLoading({
				title:'加载中...'
			})
			uni.request({
				url:'https://unidemo.dcloud.net.cn/api/news',
				method:'GET',
				data:{},
				success: (res) => {
					console.log(res);
					this.news=res.data;
					uni.hideLoading();
				},
				fail: () => {
					
				},
				complete: () => {
					
				}
			});
		},
		methods: {
			openinfo(e){
				var newsid=e.currentTarget.dataset.newsid;
				uni.navigateTo({
					url:'../info/info?newsid='+newsid
				});
			}
		}
	}
</script>

<style>
	.content{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.newslist{
		display: flex;
		width: 94%;
		padding: 10upx 0;
		margin: 12upx 0;
	}
	.newslist image{
		width: 200upx;
		margin-right: 12upx;
		flex-shrink: 0;
	}
	.news-title{
		width: 100%;
		font-size: 28upx;
	}
</style>
