

import { Databus } from "../databus.js"
let databus=new Databus();
import { Music } from "../runtime/music.js"
let music=new Music();

export class People{
  constructor(){
    this.img=wx.createImage();
    this.img.src='img/people.png';
    this.w=27;
    this.h=60;
    this.x=(databus.canvas.width-45)/2;
    this.y=databus.canvas.height-this.h-28;
    this.time=0;
    this.newy=databus.canvas.height-this.h-25
    this.startX;
    this.startY;
    this.touchX;
    this.touchY;
    this.offsetY=0;
  }
  render(){
    //游戏开始状态
    if(databus.start){
      //下落 h=(g*t*t)/2
      let g
      //如果是向上
      if(this.time<=17){
        g=0.98/4//模拟的重力加速度
        this.offsetY=(g*(16-this.time)*(19-this.time))/2
        this.newy-=this.offsetY
        this.time++;
      }
      if(this.time>17){
        // 如果是向下
        g=0.98/20//模拟的重力加速度
        this.offsetY=(g*(this.time-15)*(this.time-15))/2
        this.newy+=this.offsetY
        //到30就不加速了
        if(this.time<=38){
          this.time++;
        }
      }
      for(let i=0;i<databus.oblist.length;i++){
        //console.log("开始循环判断"+databus.oblist[i].y)
        //如果人底部碰到星星头部跳起
        if((this.newy+this.h)>=(databus.oblist[i].y-5) && (this.newy+this.h)<=(databus.oblist[i].y+5) && (this.x+this.w)>=databus.oblist[i].x && this.x<=(databus.oblist[i].x+databus.oblist[i].w)){
          //console.log("碰到星星,背景下移")
          this.time=0;//时间清零继续跳
          //所有背景下移
          databus.starjump=true;
          databus.bgjump=true;
          databus.bottomjump=true;
          music.starJump()
          databus.oblist.splice(i,1);
          databus.score+=1
          databus.scorenum+=databus.score;
          break;
        }
      }
      if(this.time>17 && this.newy>=databus.canvas.height-this.h-70){
        //游戏结束
        //反向绘制背景，底部和星星
        databus.stardown=true;
        databus.bgdown=true;
        databus.bottomdown=true;
        this.time=0
      }
      if(this.touchX>this.startX && this.startX<=databus.canvas.width-2){
          this.startX+=2;
          this.x=this.touchX;
          //console.log("移动开始")
      }
      if(this.touchX<this.startX && this.startX>=2){
          this.startX-=2;
          this.x=this.touchX;
          //console.log("移动中")
      }
    }
    //图像资源地址，开始裁剪的x,y,被裁剪图像的w,h,画布上放置图像的坐标，图像的w,h
    databus.ctx.drawImage(this.img,0,0,this.w,this.h,this.x,this.newy,this.w,this.h)
  }
}