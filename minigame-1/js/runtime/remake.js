import { Databus } from "../databus.js"
let databus=new Databus();
export class Remake{
  constructor(){
    this.x=0;
    this.y=0;
    this.img=wx.createImage()
    this.img.src="img/remake.png"
    this.w=100;
    this.h=100;
  }
  render(){
    if(!databus.gamestart){
      databus.ctx.drawImage(this.img,this.x,this.y,this.w,this.h,(databus.canvas.width-this.w)/2,(databus.canvas.height-this.h)/2,this.w,this.h);
    }
  }
}