

import { Databus } from "../databus.js"
let databus=new Databus();

export class Score{
  constructor(){
    this.scorenum=0;
  }
  render(){
    //计分
    databus.ctx.font='30px 黑体';
    databus.ctx.fillStyle='#fff';
    databus.ctx.fillText("得分:"+databus.scorenum,40,100,200)
  }
}