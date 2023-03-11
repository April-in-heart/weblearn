

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },


  doLogin :function(e){
    var that=this;
    var app = getApp();
      wx.getUserProfile({
        desc: '申请使用你的微信头像和昵称', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          app.globalData.userInfo= res.userInfo
          console.log(app.globalData);

          wx.login({
            success: function(res){
                console.log(res)
                //获取登录临时凭证
                var code = res.code;
                console.log(code);
                //调用后端接口 获取微信的session_key 和 openID
                wx.request({
                  url: 'http://localhost:8080/wxLogin',
                  data: {
                    "code":code,
                    "nickName": getApp().globalData.userInfo.nickName,
                    "avatar": getApp().globalData.userInfo.avatarUrl,
                  },
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  method:"POST",
                  success: function (result){
                    console.log(result);
                    app.globalData.token=result.data.data.openId;
                    app.globalData.accid=result.data.data.accid;
                    app.globalData.imToken=result.data.data.imToken;
                    if(result.data.status=="success"){
                      wx.switchTab({
                        url: '../me/me',
                      })
                    }else{
                      wx.showModal({
                        title: '提示',
                        showCancel: false,
                        content: '登录失败',
                      })
                    }
                  
                  }
                  
                 
                  
      
                })
            }
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