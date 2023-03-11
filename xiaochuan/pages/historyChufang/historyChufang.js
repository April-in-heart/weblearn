// pages/myscheme.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      
    ],
  },
 
    /**
   * 
   *查看
   */
  selectmys:function(e){
    let id = e.currentTarget.dataset.id;
    console.log(id);
    
    //通过id查看自诊信息
    wx.request({
      url: 'http://localhost:8080/getCheckBySelfDetail/'+id,
      method:"GET",
      success:function(result){
        console.log(result.data.data);
         getApp().globalData.CheckBySelfDetail=result.data.data
         wx.navigateTo({
           url: '/pages/CheckBySelfDetail/CheckBySelfDetail',
         })
      }
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
    var that=this;
    wx.request({
      url: 'http://localhost:8080/getHistoryChufang',
      method:"GET",
      header: {
       'content-type': 'application/json'
     },
      success:function(result){
         
        console.log(result.data);
        that.setData({list:result.data.data})
      }
     
     
     
  })
  },

 
  
 
  showkaifang: function (e) {
    var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/historyChufangDetail/historyChufangDetail?id='+id,
      })
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