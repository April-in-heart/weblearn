Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDownLoading:false,
    percentNum:0,
    booksList:[{id:'001',image:'https://img9.doubanio.com/view/subject/s/public/s27243455.jpg',text:'Java编程思想 （第4版）',fileUrl:'http://localhost:8088/books/001.pdf'},{id:'002',image:'https://img9.doubanio.com/view/subject/s/public/s4645974.jpg',text:'三体',fileUrl:'http://localhost:8088/books/002.pdf'},{id:'003',image:'https://img9.doubanio.com/view/subject/s/public/s1242786.jpg',text:'鲁宾逊漂流记',fileUrl:'http://localhost:8088/books/001.pdf'},{id:'004',image:'https://img2.doubanio.com/view/subject/s/public/s33841163.jpg',text:'暗夜与黎明',fileUrl:'http://localhost:8088/books/001.pdf'},{id:'005',image:'https://img3.doubanio.com/view/subject/s/public/s29107491.jpg',text:'算法（第4版）',fileUrl:'http://localhost:8088/books/001.pdf'},{id:'006',image:'https://img9.doubanio.com/view/subject/s/public/s9114855.jpg',text:'数学之美',fileUrl:'http://localhost:8088/books/001.pdf'}],
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
    let id=e.currentTarget.dataset.id
    let fileUrl=e.currentTarget.dataset.file;
    //查看本地缓存
    let path=wx.getStorageSync(id);
    //如果未下载过
    if(path==''){
      console.log('未下载过')
      //切换到下载蒙层
      that.setData({
        isDownLoading:true
      })
      //下载图书,声明一个常量
      const downloadTask = wx.downloadFile({
        url: 'fileUrl',
        success:function(res){
          //关闭下载蒙层
          that.setData({
            isDownLoading:false
          })
          //判断是否下载成功
          if(res.statusCode==200){
            console.log('下载成功');
            //获取地址
            path = res.tempFilePath;
            //保存并打开图书
            that.saveBook(id,path);
          }else{
            //提示用户下载失败
            that.showTips('暂时无法下载！');
          }
        },
        fail:function(error){
          //关闭下载蒙层
          that.setData({
            isDownLoading:false
          })
          //提示用户下载失败
          that.showTips('无法连接到服务器！');
        },
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