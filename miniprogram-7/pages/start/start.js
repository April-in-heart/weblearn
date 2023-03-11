// pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  initial:function(){
    this.setData({
      answer:Math.round(Math.random()*100),//0-100随机数
      count:0,//回合数
      tip:'',//提示语句
      x:-1,//用户猜的数字
      isGameStart:true//游戏是否开始
    })
  },
  getNumber:function(e){
    //console.log(e.detail.value);
    this.setData({
      x:e.detail.value
    })
  },
  guess:function(){
    let x=this.data.x//前面那个是临时变量
    this.setData({x:-1})//重置x为初始值
    if(x<0){
      //弹出提示框
      wx.showToast({
        title: '不能小于0',
      })
    }else if(x>100){
      wx.showToast({
        title: '不能大于100',
      })
    }else{
      //回合数加一
      let count=this.data.count+1;
      //获取当前提示语句
      let tip=this.data.tip;
      let answer=this.data.answer;
      if(x==answer){
        tip+='\n第'+count+'回合：'+x+',猜对了！'
        //游戏直接结束
        this.setData({isGameStart:false})
      }
      else if(x>answer){
        tip+='\n第'+count+'回合：'+x+',大了！'
      }
      else if(x<answer){
        tip+='\n第'+count+'回合：'+x+',小了！'
      }

      if(count==8){
        tip+='\n游戏结束'
        this.setData({
          isGameStart:false
        })
      }

      //更新提示语句和回合数
      this.setData({
        tip:tip,
        count:count
      })
    }
  },

  reStartGame:function(){
    //游戏初始化
    this.initial();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //游戏初始化
    this.initial();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})