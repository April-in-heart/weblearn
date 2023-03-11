// pages/pay/pay.js
Page({

  pay:function(){
    if (that.data.orderCount.num>0) {
    //跳转到warn1页面食物卡路里摄入不足
      if (that.data.orderCount.num <= 1500){
        wx.redirectTo({
          url: 'pages/warn1/warn1'
     });
    }
    // 跳转到warn2页面食物卡路里摄入健康
      else if (that.data.orderCount.num<1800){
        wx.redirectTo({
          url: 'pages/warn2/warn2'
        });
      }
      //跳转到warn3页面食物卡路里摄入过多
      else if (that.data.orderCount.num < 3000) {
        wx.redirectTo({
          url: 'pages/warn3/warn3'
        });
      }
    }
    else{
      wx.showToast({
        title: '您未选中任何商品',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {

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