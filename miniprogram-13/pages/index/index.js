// index.js
// 获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guest:[{src:'/images/avator/avatar1.jpg',name:'QQ'},{src:'/images/avator/avatar2.jpg',name:'girl'},{src:'/images/avator/avatar1.jpg',name:'201844901091康佳龙'}],
    latitude:30.685761,
    longitude:103.807587
  },
  showGuide:function(){
  //  var that=this;

    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude
    })
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
