// pages/demo03/picker/picker.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectorItems:['苹果','香蕉','葡萄'],
    multiSelectorItems: [['罗宋汤', '蘑菇汤'], ['牛排', '猪排', '鱼排'], ['冰淇淋', '鸡蛋布丁']]
  },
  /**
   * 自定义函数--监听picker变化
   */
  selectorChange: function (e) {
    let i = e.detail.value;//获得选项的数组下标
    let value = this.data.selectorItems[i];//获得选项的值
    this.setData({selector:value});//将选项名称更新到WXML页面上
  },
  multiSelectorChange: function (e) {
    let arrayIndex = e.detail.value;//获得选项的数组下标
    let array = this.data.multiSelectorItems;//获得选项数组
    let value = new Array();//声明一个空数组，用于存放最后选择的值
    for(let i=0;i<arrayIndex.length;i++){
      let k = arrayIndex[i];//第i个数组的元素下标
      let v = array[i][k];//获得第i个数组的元素值
      value.push(v);//往数组中追加新元素
    }
    this.setData({ multiSelector: value });//将选项名称更新到WXML页面上
  },
  timeChange: function (e) {
    let value = e.detail.value;//获得选择的时间
    this.setData({ time: value });//将选项名称更新到WXML页面上
  },
  dateChange: function (e) {
    let value = e.detail.value;//获得选择的日期
    this.setData({ date: value });//将选项名称更新到WXML页面上
  },
  regionChange: function (e) {
    let value = e.detail.value;//获得选择的省市区
    this.setData({ region: value });//将选项名称更新到WXML页面上
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