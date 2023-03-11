import { Databus } from "../databus.js"
let databus=new Databus();

export class Bottom{
  constructor(){
    this.img=wx.createImage();
    this.img.src='img/bottom.png'
    this.w=500;
    this.h=142;
    this.x=0;
    this.y=databus.canvas.height-this.h*2/3;
  }
  render(){
    if(databus.start){
      if(databus.bottomjump && this.y<=databus.canvas.height){
        this.y+=databus.offsetY
        databus.bottomjump=false;
      }
      if(databus.bottomdown){
        this.y=databus.canvas.height-this.h*2/3
        databus.bottomdown=false
        databus.gamestart=false
        databus.start=false
      }
    }
    else{
      this.y=databus.canvas.height-this.h*2/3
    }
    //图像资源地址，开始裁剪的x,y,被裁剪图像的w,h,画布上放置图像的坐标，图像的w,h
    databus.ctx.drawImage(this.img,0,0,this.w,this.h,this.x,this.y,databus.canvas.width,this.h)
  }
}