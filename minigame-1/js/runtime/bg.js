
import { Databus } from "../databus.js"
let databus=new Databus();

//导出类到其他页面使用
export class Bg{
  //构造函数
  constructor(){
    // wx.createImage()可以创建图片对象，返回值为图片对象
    this.img=wx.createImage();
    this.img.src='img/bg.jpg'
    this.x=0;
    this.y=0;
    this.w=225;
    this.h=400;
    //底部坐标变化
    this.newy=0;
    //移动速度
    this.speed=2;
  }
  //绘制背景
  render(){
    if(this.newy<=databus.canvas.height){
      if(databus.bgjump){
        this.newy+=databus.offsetY
        //console.log("背景"+databus.offsetY)
        databus.bgjump=false;
        //console.log("背景下移")
      }
      if(databus.bgdown){
        //console.log("背景上移")
        this.newy-=databus.offsetY
        databus.bgdown=false
      }
      //垂直坐标=垂直坐标+移动的像素
      this.newy=this.newy+this.speed;
    }else{
      //如果y大于滚动出去的值，则清零
      this.newy=0;
    }
  /**
   * 背景图重绘函数
   * 绘制两张图片，两张图片大小和屏幕一致
   * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
   * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
   */
    databus.ctx.drawImage(this.img,this.x,this.y,this.w,this.h,0,-databus.canvas.height+this.newy,databus.canvas.width,databus.canvas.height);
    databus.ctx.drawImage(this.img,this.x,this.y,this.w,this.h,0,this.newy,databus.canvas.width,databus.canvas.height);
  }
}