// pages/fangan/fangan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    contentList:[
    ],
    hiddenmodalput:true,
    name:"",

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
    this.setData({
      contentList:getApp().globalData.search
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

  },
  modalinput:function(){ 
    this.setData({ 
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  cancel: function(){ 
    this.setData({ 
      hiddenmodalput: true
     }); 
  },
  confirm: function(){ 
    this.setData({ 
      hiddenmodalput: true 
    })
    var that=this;
      if(this.data.name=="")
       {
         wx.showModal({
          title: '提示',
          content: '方案名称不能为空', 
         })
       }
       else{
         console.log(that.data.contentList);
         
         wx.request({
           url: 'http://localhost:8080/saveProgram',
           method:"POST",
           data:{
             name:that.data.name,
             searchList:that.data.contentList,
             token:getApp().globalData.token,
             searchContent:getApp().globalData.searchContent
           },
           header: {
            'content-type': 'application/json'
          },
           success:function(result){
             console.log(result.data);
               if(result.data.status==20001){
                wx.showModal({
                  title: '提示',
                  content: '方案名称已存在，请换一个名称', 
                 })
               }else{
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 1000
                })
               }
             
                      
           }
          
          
          
       })
      }
    },


   input:function(e){
  
    this.setData({
      name:e.detail.value
    })
   
  }
})