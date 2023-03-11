// pages/programdetail/programdetail.js
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (option) {
     this.setData({
       content:getApp().globalData.CheckBySelfDetail
     })
  },

 play:function(){
   var that=this
   console.log(that.data.content.sound)
   
   innerAudioContext.onError((res) => {
   // 播放音频失败的回调
  })
  innerAudioContext.src = that.data.content.sound; // 这里可以是录音的临时路径
  innerAudioContext.play()

 },

 pause:function(){
  innerAudioContext.pause()
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