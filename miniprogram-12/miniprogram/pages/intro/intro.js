// pages/intro/intro.js
//连接云数据库
const db = wx.cloud.database()
const books = db.collection('books')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDownLoading:false,
    percentNum:0
  },
  showTips:function(content){
    wx:wx.showModal({
      content: content,
      showCancel: false,
      title: '提醒',
    })
  },
  openBook: function(path) {
    wx.openDocument({
      filePath: path,
      success: function(res) {
        console.log('打开图书成功')
      },
      fail: function(error) {
        console.log(error);
      }
    })
  },

  saveBook:function(id,path){
    var that=this;

    wx.saveFile({
      tempFilePath: path,
      success: function(res){
        //将文件地址存入本地缓存
        let newPath=res.savedFilePath;
        console.log('saveFile里的path'+newPath)
        wx.setStorageSync(id,newPath)
        //打开图书
        that.openBook(newPath);
      },
      fail: function(error){
        console.log(error)
        that.showTips('文件保存失败');
      },
    })
  },
  readBook(e){
    var that=this;
    //分别获取图书ID与服务器URL地址
    //console.log(e);
    //图书id
    let id=this.data.book._id
    //查看本地缓存
    let path=wx.getStorageSync(id);
    //如果未下载过
    if(path==''){
      console.log('未下载过')
      //切换到下载蒙层
      that.setData({
        isDownLoading:true
      })
      //图书服务器端地址
      let fileid=this.data.book.fileid;
      //下载云开发中的图书,声明一个常量
      const downloadTask = wx.cloud.downloadFile({
        fileID: fileid,
        success:res=>{
          //判断是否下载成功
          if(res.statusCode==200){
            console.log('下载成功');
            //获取地址
            path = res.tempFilePath;
            //保存并打开图书
            this.saveBook(id,path);
          }else{
            //提示用户下载失败
            this.showTips('暂时无法下载！');
          }
        },
        fail:res=>{
          //提示用户下载失败
          this.showTips('无法连接到服务器！');
        },
        complete:res=>{
          //关闭下载蒙层
          this.setData({
            isDownLoading:false
          })
        }
      })
      //监听下载进度
      downloadTask.onProgressUpdate(function(res){
        let progress=res.progress;
        that.setData({
          percentNum:progress
        })
      })
    }
    //如果已下载过
    else{
      //直接打开图书
      that.openBook(path);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //上个页面传过来的图书id
    //console.log(options.id)
    // 从云端读取图书详情
    books.doc(options.id).get({
      success:res=>{
        this.setData({
          book:res.data
        })
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