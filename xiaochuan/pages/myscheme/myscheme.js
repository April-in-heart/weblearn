// pages/myscheme.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schemelist:[
      
    ],
  },
  /**
   * 
   *删除我的方案
   */
  delectmys:function(e){
    var id = e.currentTarget.dataset.id;
    var that=this;
    wx.showModal({
      "title":"提示",
      "content":"确定要删除该方案吗？",
      success (res) {
        if (res.confirm) {
           //通过方案id删除我的方案  
      wx.request({
        url: 'http://localhost:8080/deleteProgram/'+id,
        method:"DELETE",
        success:function(result){
          console.log(result.data.data);
          if(result.data.status=="success"){
           
            wx.request({
              url: 'http://localhost:8080/getAllProgram/'+getApp().globalData.token,
              method:"GET",
              success:function(result){
                console.log(result.data.data);
                that.setData({
                  schemelist:result.data.data
                })
              }
            })
          }
        
        }
      })

        } else if (res.cancel) {
        console.log('用户点击取消')
        }
      }
    })

  },
    /**
   * 
   *查看我的方案
   */
  selectmys:function(e){
    let id = e.currentTarget.dataset.id;
    console.log(id);
    
    //通过方案id查看方案详情
    wx.request({
      url: 'http://localhost:8080/getProgram/'+id,
      method:"GET",
      success:function(result){
        console.log(result.data.data);
         getApp().globalData.programdetail=result.data.data
         wx.navigateTo({
           url: '/pages/programdetail/programdetail',
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
          url: 'http://localhost:8080/getAllProgram/'+getApp().globalData.token,
          method:"GET",
          success:function(result){
            console.log(result.data.data);
            that.setData({
              schemelist:result.data.data
            })
          }
        })
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