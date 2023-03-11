<template>
	
	<view class="content">
	<view>
	<button @click="printerTsc" >打印-TSC 标签样板</button>
    <button @click="printerTscVi" >打印-TSC纯指令打印</button>
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
			printerTsc()
			{
				
				//制作标签格式，
				var data=[];  //定义一个数组
				var line={};  //每添加一个，代表一行字
				
				//设置标签纸大小
				line={};
				line.width=45; //mm
				line.height=25; //mm
				line.gap=3; //标签纸之间，间隙长度 mm
				line.page=1; //打印几份
				line.direction=0;
				data.push(line); //每添加一个，代表一行字
				
				//添加文字
				line={};
				line.text="APP开发社区";
				line.rotation=0;
				line.x=20;
				line.y=28;
				line.xscal=1;
				line.yscal=1;
				data.push(line); //每添加一个，代表一行字
				
				
				//添加图片
				var imgage=plus.io.convertLocalFileSystemURL("static/gprinter.png"); 
				line={};
				line.image=imgage;
				line.x=20;
				line.y=65;
				line.width=80;
				data.push(line);
				
				
				//添加黑块
				line={};
				line.addBar={x:10,y:10,width:200,height:4};
				data.push(line);
				
				//添加方框
				line={};
				line.addBox={x:10,y:25,xend:180,yend:50,thickness:2};
				data.push(line);
								
		
				//添加二维码		
				line={};
				line.qrcode="12345";
				line.x=205; //横坐标
				line.y=25; //纵坐标
				line.width=3; //二维码大小
				line.rotation=0;  // 角度：有四个值：0，90，180，270 
				data.push(line);
	
	            //添加条型码         
				line={};
				line.barcode="20201201";
				line.x=110; //横坐标
				line.y=115; //纵坐标
				line.type="CODE128"; //条型码类型
				line.height=40; //条型码高度
				line.readable=true; //是否显示文字在条型下方
				line.rotation=0;  // 角度：有四个值：0，90，180，270
				data.push(line);
				
				let _this=this;
				plug.printer({"TSC":data},ret=>{
					
					 _this.tip=JSON.stringify(ret);
					 console.log(_this.tip);
				});
		   },
		   printerTscVi()
		   {
			   // TSC 指令打印标签, TSC 指令的用法，参考TSC 指令使用说明
			   
			   let image=plus.io.convertLocalFileSystemURL("static/gprinter.png");
			   	
			   let str="SIZE 40 mm,15 mm \n";
			       str+="GAP 2 mm,0 mm \n";
			   	   str+"SET RESPONSE NO \n";
			   	   str+="CLS \n";
			   	   str+="TEXT 120,50,\"TSS24.BF2\",0,1,1,\"中国 FOR TEXT\" \n";
			   	   str+="BITMAP 0,20,100,"+image+" \n";
			   	   str+=" PRINT 1 \n";
			   
			   plug.writeTSC({"tsc":str},function(e){	
			   	 console.log(JSON.stringify(e));
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
