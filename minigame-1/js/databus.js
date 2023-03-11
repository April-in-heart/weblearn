
// 全局状态管理器

let instance

export class Databus{
  constructor(){
    if(instance){
      return instance;//如果对象已经存在则不创建，避免多个对象混乱
    }else{
      instance=this;
      this.gamestart=true;//游戏状态
      this.canvas;
      this.ctx;
      this.timer;
      this.start=false
      this.oblist=[];//存放障碍物数组
      this.starjump=false;
      this.bgjump=false;
      this.bottomjump=false;
      this.stardown=false;
      this.bgdown=false;
      this.bottomdown=false;
      this.offsetY=100;
      this.time=0;
      this.score=0;
      this.scorenum=0;
    }
  }
}