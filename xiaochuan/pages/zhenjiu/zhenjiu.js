// pages/zhenjiu/zhenjiu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     content:"",
  },
  // 查询搜索的接口方法
inputSearch:function(e){
  
  this.setData({
    content:e.detail.value
  })
 
},

  search: function () {
    var that=this;
      if(this.data.content=="")
       {
         wx.showModal({
          title: '提示',
          content: '搜索内容不能为空',
          
         })
       }
       else{
         console.log(that.data.content);
         wx.request({
           url: 'http://localhost:8080/search',
           method:"POST",
           data:{
             content:that.data.content
           },
           header: {
            'content-type': 'application/json'
          },
           success:function(result){
             console.log(result.data.data);
            if(result.data.data.length==0){
              wx.showModal({
                title: '提示',
                content: '未搜索到具体方案，请检查输入是否正确。（如：咳嗽，肺炎等哮喘相关病症）',
                
               })
            }else{
             getApp().globalData.search=result.data.data;
             getApp().globalData.searchContent=that.data.content;
             wx.navigateTo({
               url: '/pages/fangan/fangan',
             })
           }
          }

           
         })

       }
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