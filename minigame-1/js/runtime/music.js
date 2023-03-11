import { Databus } from "../databus.js"
let databus=new Databus();

let instance
//统一音频管理
export class Music{
  constructor(){
    if(instance){
      return instance
    }else{
      instance=this
      this.bgmAudio=wx.createInnerAudioContext()
      this.starAudio=wx.createInnerAudioContext()
      this.bgmAudio.src='cloud://database-0gk2ebvo540a8986.6461-database-0gk2ebvo540a8986-1306070699/audio/bgm.mp3'
      this.starAudio.src='cloud://database-0gk2ebvo540a8986.6461-database-0gk2ebvo540a8986-1306070699/audio/special.mp3'
      this.bgmAudio.loop=true//循环播放
      this.playBgm()
    }
  }
  playBgm(){
    this.bgmAudio.play();
  }
  starJump(){
    this.starAudio.play();
  }
}