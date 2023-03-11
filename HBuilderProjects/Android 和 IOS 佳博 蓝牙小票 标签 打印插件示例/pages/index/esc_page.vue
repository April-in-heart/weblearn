<template>
	
	<view class="content">
	<view>
	<button @click="printer01" >打印-小票样单一</button>
	<button @click="printer02" >打印-小票样单二</button>
	<button @click="printer03" >打印-小票样单三</button>
	</view>
	 <text>{{tip}}</text>
	</view>
	
</template>

<script>
	const plug= uni.requireNativePlugin('Html5app-Gprinter');
	export default {
		data() {
			return {
				tip: ''
			}
		},
		onLoad() {
	
		},
		methods: {
			printer01()
			{
				        //打印样票一
				        //制作小票格式，
						var data=[];  //定义一个数组
						var line={};  //每添加一个，代表一行字
						
						//加入本地 logo图片,需要转换成平台绝对路径
						var imgage=plus.io.convertLocalFileSystemURL("static/chanel-logo.png"); 
						line.image=imgage;
						line.width="300";
						line.center="center";
						line.bottom="1";
						data.push(line);
					
				         //加入base64 logo图片
						line={};
				        let base64='data:image/png;base64,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'; 
						line.image=base64;
						line.width="140";
						line.center="center";
						line.bottom="1";
						data.push(line);
						
						
						line={};
						line.text="万达广场欢迎您";
						line.center="center";
						line.font="max";
						line.bottom="6";
						line.zoom=5;
						data.push(line); //每添加一个，代表一行字
						
						line={};
						line.text="收银员:00056";
						line.center="left";
						line.font="bold";
						line.bottom="1";
						line.reversemode=1; // 是否反白 1 或 0
						line.rightspacing=10; //设置字符右间距
						data.push(line);
						
						line={};  
						line.text="单号:00256933";
						line.center="left";
						line.font="normal";
						line.zoom="2";
						line.bottom="2";
						line.rotatin=1; // 文字90度旋转，0=>不变，1=> 90度旋转
				 		data.push(line);
						
						line={};  
						line.text="业务日期：2019-05-30 18:15:25";
						line.center="left";
						line.font="normal";
						line.bottom="1";
						data.push(line);
						
						line={};
						line.text="------------------------------";
						line.center="left";
						line.font="normal";
						line.bottom="1";
						data.push(line);
						
						line={};
						line.title=["宫保鸡丁","*1","66.0"];
						line.left=[0,60,80];
						line.center="left";
						line.font="normal";
						line.bottom="1";
						data.push(line);
						
						line={};
						line.title=["青椒肉丝","*1","66.0"];
						line.left=[0,60,80];
						line.center="left";
						line.font="normal";
						line.bottom="1";
						data.push(line);
						
						line={};
						line.title=["青椒肉丝+宫保鸡丁","*1","66.0"];
						line.left=[0,60,80];
						line.center="left";
						line.font="normal";
						line.bottom="3";
						data.push(line);
							
				
						
						line={}; 
						line.text="------------------------------";
						line.center="left";
						line.font="normal";
						line.bottom="2";
						data.push(line);
						
						line={};
						line.text="数量：3 ,金额：￥1220.00";
						line.center="left";
						line.font="bold";
						line.bottom="1";
						data.push(line);
						
						line={};
						line.text="实收金额：￥1220.00";
						line.center="left";
						line.font="bold";
						line.bottom="2";
						data.push(line);
						
						line={};
						line.text="活动期间满500送100";
						line.center="left";
						line.font="normal";
						line.bottom="1";
						data.push(line);
						
						line={};
						line.text="折让金额500";
						line.center="left";
						line.font="normal";
						line.bottom="1";
						data.push(line);
						
						line={};
						line.text="折后金额2029";
						line.center="left";
						line.font="normal";
						line.bottom="3";
						data.push(line);
						
						line={};
						line.text="30天内可凭小票换开发票";
						line.center="left";
						line.font="normal";
						line.bottom="2";
						data.push(line);
						
						line={};
						line.text="活动商品，不退不换";
						line.center="left";
						line.font="normal";
						line.bottom="2";
						data.push(line);
						
						//加入条型码
						line={};
						line.barcode="20138702770";
						line.type="CODE128";
						line.height="100";
						line.position="BELOW";
						line.width="2";
						line.center="center";
						line.bottom="2";
						data.push(line);
						
						//加入二维码
						line={};
						line.qrcode="https://mp.weixin.qq.com/";
						line.size="5";
						line.center="center";
						line.bottom="3";
						line.errorlevel="L";
						data.push(line);
				
				
				const _this=this;
				plug.printer({"ESC":data},ret=>{
					 _this.tip=JSON.stringify(ret);
					 console.log(_this.tip);
				});
			},
			printer02()
			{
				
				//打印样票二
				//制作小票格式，
				var data=[];  //定义一个数组
				var line={};  //每添加一个，代表一行字
				
				line={};
				line.text="人人乐购物中心";
				line.center="center";
				line.font="max";
				line.bottom="5";
				line.zoom=3;
				data.push(line); //每添加一个，代表一行字
				
				line={};
				line.text="机号:02   收银员:0007";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="时间:2021-12-28 14:45:12";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="--------------------------------";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.title=["商品名称","数量","单价","小计"];
				line.left=[0,46,65,80];
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.title=["小青菜","*1","4.90","4.90"];
				line.left=[0,50,65,80];
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.title=["西红杭","*2","2.30","4.60"];
				line.left=[0,50,65,80];
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.title=["散装菜","*3","2.30","6.90"];
				line.left=[0,50,65,80];
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="--------------------------------";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.title=["数量:6件","金额合计:15.90"];
			    line.pageWidth="--------------------------------";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.title=["付款:现金","15.90"];
				line.font="normal";
				line.pageWidth="--------------------------------";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.title=["现金找零","4.90"];
				line.font="normal";
				line.pageWidth="--------------------------------";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="会员卡:10023655";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="姓名:张三";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="当前积分:1023";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="合计:40.26";
				line.center="center";
				line.font="max";
				line.bottom="3";
				line.zoom=2;
				data.push(line); 
				
				line={};
				line.text="电脑小票号：200012369658523";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="谢谢惠顾,欢迎下次光临";
				line.center="center";
				line.font="normal";
				line.bottom="3";
				data.push(line);
				
				const _this=this;
				plug.printer({"ESC":data},ret=>{
					 _this.tip=JSON.stringify(ret);
					 console.log(_this.tip);
				});
			},
			printer03()
			{
				
				//打印样票一
				//制作小票格式，
				var data=[];  //定义一个数组
				var line={};  //每添加一个，代表一行字
				
				//加入本地 logo图片,需要转换成平台绝对路径
				var imgage=plus.io.convertLocalFileSystemURL("static/chanel-logo.png"); 
				line.image=imgage;
				line.width="300";
				line.center="center";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="便民超市,欢迎光临";
				line.center="center";
				line.font="bold";
				line.bottom="2";
				data.push(line); //每添加一个，代表一行字
				
				line={};
				line.text="机号:02   收银员:0008";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="时间:2021-12-30 14:40:12";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="--------------------------------";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.title=["品名","数量","单价","金额"];
				line.left=[0,46,65,80];
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.title=["笔记本","*1","4.90","4.90"];
				line.left=[0,50,65,80];
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.title=["橡皮","*2","2.30","4.60"];
				line.left=[0,50,65,80];
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.title=["三角板","*2","3.50","3.60"];
				line.left=[0,50,65,80];
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.title=["转笔刀","*2","2.60","4.60"];
				line.left=[0,50,65,80];
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="--------------------------------";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="应收:23.90元 优惠0元";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="实收:30元 找零钱6.1元";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="钱款当面核对,质量问题凭小票退换";
				line.center="left";
				line.font="normal";
				line.bottom="2";
				data.push(line);
				
				//加入二维码
				line={};
				line.qrcode="https://mp.weixin.qq.com/";
				line.size="5";
				line.center="center";
				line.bottom="2";
				line.errorlevel="L";
				data.push(line);
				
				line={};
				line.text="扫码有惊喜!";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="--------------------------------";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				line={};
				line.text="END";
				line.center="center";
				line.font="normal";
				line.bottom="2";
				data.push(line);
				
				const _this=this;
				plug.printer({"ESC":data},ret=>{
					 _this.tip=JSON.stringify(ret);
					 console.log(_this.tip);
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
	button{ margin-bottom:10px;}
</style>
