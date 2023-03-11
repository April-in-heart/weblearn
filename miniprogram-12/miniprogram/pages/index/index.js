
//连接云数据库
const db = wx.cloud.database()
const books = db.collection('books')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    booksList:[],
  },

  
  // 跳转新页面显示图书详情
  showBookIntro(e){
    console.log(e.currentTarget.dataset.id)
    //图书id
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../intro/intro?id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //从云端读取图书信息,云数据库权限设为所有用户可读才行，写不要求
    books.get({
      success:res=>{
        this.setData({
          booksList:res.data
        })
      },
      fail:error=>{
        console.log(error)
      }
    })

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