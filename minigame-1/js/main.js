import { Databus } from "./databus.js";
import { Bg } from "./runtime/bg.js";
import { Bottom } from "./runtime/bottom.js";
import { Remake } from "./runtime/remake.js";
import { Star } from "./runtime/star.js";
import { Music } from "runtime/music.js"
import { People } from "player/people.js"
import { Score } from "player/score.js"

let databus=new Databus();


export class Main{
  constructor(){
    this.canvas=wx.createCanvas()
    this.ctx=this.canvas.getContext('2d')
    //put
    databus.canvas=this.canvas
    databus.ctx=this.ctx;
    this.init();
    this.regEvent();
  }
  //初始化信息
  init(){
    this.music=new Music();//背景音乐
    this.bg=new Bg();//背景
    this.bottom=new Bottom();//底部月球平面
    this.remake=new Remake();//重新开始
    this.people=new People();//小人
    this.score=new Score();//分数
    this.createstar();//调用生成障碍物的方法
    this.startgame();
  }
  startgame(){
    if(databus.gamestart){
      this.bg.render();
      //画布只有先来后到，后创建的在上面
        if(databus.oblist.length==0){
          this.createstar();//调用生成障碍物的方法
        }else{
          //清除障碍物
          if(databus.oblist[0].y+databus.oblist[0].img.height>=databus.canvas.height){
            databus.oblist.shift()//shift删除数组第一个元素的值返回第一个元素的值，移除该障碍物
          }
          //如果星星坐标超过了20+两颗星星间距，并且oblish里有两个元素，始绘制下一个星星
          if(databus.oblist[databus.oblist.length-1].y>=140){
            this.createstar();//调用生成障碍物的方法
          }
      }
      databus.oblist.forEach(function(val){
        val.render();//绘制障碍物
      })
      this.bottom.render();
      this.people.render();
      this.score.render();
      //循环startgame()方法
      let timer=requestAnimationFrame(()=>this.startgame())
      databus.timer=timer
    }
    else{
      console.log("游戏结束")
      for(let i=0;i<databus.oblist.length;i++){
        databus.oblist.shift();//清除所有星星
      }
      databus.score=0;
      databus.scorenum=0;
      this.remake.render();
      cancelAnimationFrame(databus.timer)
      wx.triggerGC()//回收
    }
  }
  //生成障碍物
  createstar(){
    //高度
    const top=20;//障碍物高度
    //距左边距离
    const minLeft=databus.canvas.width/8;
    const maxLeft=databus.canvas.width*7/8;
    const left=minLeft+(Math.random()*(maxLeft-minLeft));
    databus.oblist.push(new Star('img/star.png',left,top))//星星
  }
  regEvent(){
    wx.onTouchStart((result) => {
      if(databus.gamestart){
        //游戏为开始状态,点击屏幕则小人跳起
        databus.start=true
        //console.log("开始点"+result.touches[0].pageX+"是"+result.touches[0].pageY)
        this.people.startX = result.touches[0].pageX;
        this.people.startY = result.touches[0].pageY;
      }
      else{
        //如果游戏为结束状态，点击则清除remake图标，重新初始化游戏
        console.log("游戏开始,初始化信息,改变游戏状态");
        databus.gamestart=true;
        this.init();
      }
    })  
    wx.onTouchMove((result) => {
      if(databus.gamestart){
        //console.log("移动点"+result.touches[0].pageX+"是"+result.touches[0].pageY)
        this.people.touchX = result.touches[0].pageX;
        this.people.touchY = result.touches[0].pageY;
      }
    })
  }
  //碰撞检测
}