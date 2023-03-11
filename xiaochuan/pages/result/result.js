// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFold:false,
    showView: true
  },

   /**
   * 自定义函数--返回上个页面
   */
  back:function(){
    wx.navigateBack()
  },
  /**
   * 自定义函数--箭头转换
   */
  showAll: function (e) {
    this.setData({
     isFold: !this.data.isFold,
    })
   },

   test:function(){
      wx.redirectTo({
        url: '/pages/index2/index2'
      })
   },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    showView: (options.showView == "true" ? true : false)
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