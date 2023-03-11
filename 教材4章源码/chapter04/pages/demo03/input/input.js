// pages/demo03/input/input.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 自定义函数--监听输入框事件
   */
  getBlur: function (e) {
    console.log("getBlur触发，文本框失去焦点，当前值为："+e.detail.value);
  },
  getInput: function (e) {
    console.log("getInput触发，输入框内容发生改变，当前值为："+e.detail.value);
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