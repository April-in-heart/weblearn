const recorderManager = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext();
Page({
  data: {
    openRecordingdis: "block",//录音图片的不同
    shutRecordingdis: "none",//录音图片的不同
    recordingTimeqwe:0,//录音计时
    setInter:"",//录音名称
    isplay:true //播放状态  true--播放中  false--暂停播放
  },
 
   //录音计时器
  recordingTimer:function(){
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function () {
        var time = that.data.recordingTimeqwe + 1;
   
        that.setData({
          recordingTimeqwe: time
        })
      }
      , 1000); 
  },
 
 
  //开始录音
  openRecording: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          shutRecordingdis: "block",
          openRecordingdis: "none"
        })
      }
    })
    const options = {
      duration: 120000, //指定录音的时长，单位 ms，最大为10分钟（600000），默认为1分钟（60000）
      sampleRate: 16000, //采样率
      numberOfChannels: 1, //录音通道数
      encodeBitRate: 96000, //编码码率
      format: 'mp3', //音频格式，有效值 aac/mp3
      frameSize: 50, //指定帧大小，单位 KB
    }
    //开始录音计时   
    that.recordingTimer();
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('。。。开始录音。。。')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },
 
  //结束录音
  shutRecording: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          shutRecordingdis: "none",
          openRecordingdis: "block"
        })
      }
    })
    recorderManager.stop();

  

    recorderManager.onStop((res) => {
      console.log('。。停止录音。。', res.tempFilePath)
      getApp().globalData.sound=res.tempFilePath
      //结束录音计时  
      clearInterval(that.data.setInter); 
          wx.showToast({
            title: '保存完成',
            icon:'success',
            duration:2000
          })

        
         
        
     
      
    })
  },
 

 
})
