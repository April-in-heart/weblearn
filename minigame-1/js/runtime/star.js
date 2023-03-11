

import { Databus } from "../databus.js"
let databus=new Databus();

export class Star{
  //传参数是星星还是流星，还有动态随机生成位置
  constructor(src,x,y){
    this.x=x;
    this.y=y;
    this.w=40;
    this.h=40;
    this.img=wx.createImage();
    this.img.src=src;
    this.speed=2;
  }
  render(){
      this.y+=this.speed;
      //图像下移
      if(databus.starjump){ 
        // 如果人碰到星星则所有星星下移,offsetY为负数
        //console.log("星星下移")
        //console.log("星星"+databus.offsetY)
        this.y+=databus.offsetY
        for(let i=databus.oblist.length;;){
          if(i<=0){
            databus.starjump=false
            break;
          }else{
            i--
          }
        }
      }
      if(databus.stardown){
        //console.log("星星上移")
        this.y-=databus.offsetY
        databus.stardown=false
      }
      //图像资源地址，开始裁剪的x,y,被裁剪图像的w,h,画布上放置图像的坐标，图像的w,h
      databus.ctx.drawImage(this.img,0,0,this.w,this.h,this.x,this.y,this.w,this.h)
  }
}