// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:['四川省','成都市','温江区'],
    now:{
      tmp:0,
      cond_text:'未知',
      cond_code:'999',
      hum:0,
      vis:0,
      pres:0,
      wind_dir:0,
      wind_spd:0,
      wind_sc:0
    }
  },

  //刷新省市区信息
  regionChange:function(e){
    this.setData({
      region:e.detail.value
    })
    //更新天气
    this.getWeather();
  },


  //刷新实况天气数据,在onload方法里用this.方法调用
  getWeather:function(){
    var that=this;//接口里无法使用this关键字

    //发送请求
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/now',
      //请求的附带信息
      data:{
        location:that.data.region[1],
        key:'d742cf69041c4b5fb1fb3939aa878227'
      },
      //服务器请求成功返回的内容
      success:function(res){
        //console.log(res.data.HeWeather6[0].now);
        that.setData({
          now:res.data.HeWeather6[0].now
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWeather();
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