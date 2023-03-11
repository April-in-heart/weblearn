<template>
	<canvas class="canvas" canvas-id="imgcanvas" @click="refresh" @error="canvasIdErrorCallback"></canvas>
</template>

<script>
	export default {
		//声明传过来的父组件参数属性
		props:{
			// change:Boolean
		},
		data() {
			return {
				imgcode:'',
				rpx:0,
				width: 0,
				height: 0
			}
		},
		onReady(e) {
			let that=this;
			// 通过屏幕宽度换算rpx
			// 屏幕宽度/750=1rpx
			uni.getSystemInfo({
				success(res) {
					that.width=res.windowWidth/3;//250rpx
					that.rpx=res.windowWidth/750;
					that.height=res.windowWidth/750*80;
				}
			})
			//console.log(that.height)
			that.init();
		},
		methods: {
			// 初始化验证码
			init: function() {
				//console.log('start');
				var context = uni.createCanvasContext('imgcanvas', this);
				var lw=this.rpx*5,
					w = this.width,
					h = this.height;
				context.setFillStyle("white");
				context.setLineWidth(lw);
				context.fillRect(0, 0, w, h);
				var pool = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "I", "M", "N", "O", "P", "Q", "R", "S","T", "U", "V", "W", "S", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
					],
				str = '';
				//绘制验证码
				for (var i = 0; i < 4; i++) {
					var c = pool[this.rn(0, pool.length - 1)];
					var fifty=this.rpx*50;
					var deg = this.rn(-(thirty+fifteen), (thirty+fifteen));
					var thirty = this.rpx*30;
					var fifteen = this.rpx*15;
					context.setFontSize(thirty);
					context.setTextBaseline("top");
					context.setFillStyle(this.rc(80, 150));
					context.save();//保存save之前的画布设置，必须与restore一起用才有效
					context.translate((thirty) * i + (fifty-thirty), parseInt(h / 3));//改变画布初始x,y的值
					context.rotate(deg * Math.PI / 180);//随即旋转角度-45~45度
					context.fillText(c, fifteen, 0);//35,65,95,125,
					context.restore();//恢复到save之前的画布设置
					str += c;
				}
				console.log(str)
				this.imgcode=str;
				//随机绘制40个噪点
				for (var i = 0; i < 40; i++) {
					context.beginPath();
					//位置随机，半径2，起始角0，结束角2派
					context.arc(this.rn(0, w), this.rn(0, h), this.rpx*2, 0, 2 * Math.PI);
					context.closePath();
					context.setFillStyle(this.rc(150, 200));
					context.fill();
				}
				context.draw();
				//向父组件传递参数
				this.$emit("imgChange",this.imgcode);
				//console.log('end');
			},
			//随机颜色
			rc: function(min, max) {
				var r = this.rn(min, max);
				var g = this.rn(min, max);
				var b = this.rn(min, max);
				return "rgb(" + r + "," + g + "," + b + ")";
			},
			//min~max随机值
			rn: function(max, min) {
				return parseInt(Math.random() * (max - min)) + min;
			},
			//刷新
			refresh: function() {
				this.init();
			},
			//输出错误
			canvasIdErrorCallback: function(e) {
				console.error(e.detail.errMsg)
			}
		}
	}
</script>

<style>
	.canvas{
		margin-top: 25px;
		width: 30vw;
		height: 80rpx;
	}
</style>
