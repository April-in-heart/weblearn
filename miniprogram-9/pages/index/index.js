Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'请选择日期',
    disease:'请选择病名',
    syndrome:'请选择证型',
    method:'请选择治疗方法',
    medicine:[{name:'药名',zuoFa:'做法',grammage:'g'},{name:'药名',zuoFa:'做法',grammage:'g'},{name:'药名',zuoFa:'做法',grammage:'g'},{name:'药名',zuoFa:'做法',grammage:'g'},{name:'药名',zuoFa:'做法',grammage:'g'},{name:'药名',zuoFa:'做法',grammage:'g'},{name:'药名',zuoFa:'做法',grammage:'g'},{name:'药名',zuoFa:'做法',grammage:'g'}],
    diseaseItems:['哮喘','流产','小儿咳嗽','肺结核','风热'],
    syndromeItems:['寒哮','心肺气虚','水湿','气滞证'],
    methodItems:['辛温解表','清热祛湿','补气','清热解毒','活血祛瘀'],
    drugNameItems:['白豆蔻仁','白茯苓','神曲','葛花','淡竹茹','人参片','陈米','生荷叶'],
    zuoFaItems:['打粉','包煎','先下','先煎','后下','炮制'],
    grammageItems:['30','5','10','15','20','6','3','12','25','35'],
  },

  //单选按钮发生变化
  changesex(e) {
    this.setData({
      //更新性别数据
      sex: e.detail.value
    })
    console.log(e.detail.value);
  },
  dateChange: function (e) {
    let value = e.detail.value;//获得选择的日期
    this.setData({ date: value });//将选项名称更新到WXML页面上
  },
  diseaseChange: function (e) {
    let i = e.detail.value;//获得选项的数组下标
    let value = this.data.diseaseItems[i];//获得选项的值
    this.setData({disease:value});//将选项名称更新到WXML页面上
  },
  syndromeChange: function (e) {
    let i = e.detail.value;//获得选项的数组下标
    let value = this.data.syndromeItems[i];//获得选项的值
    this.setData({syndrome:value});//将选项名称更新到WXML页面上
  },
  methodChange: function (e) {
    let i = e.detail.value;//获得选项的数组下标
    let value = this.data.methodItems[i];//获得选项的值
    this.setData({method:value});//将选项名称更新到WXML页面上
  },
  bindView:function(e){
    //console.log(e);
    this.setData({
      index:e.currentTarget.dataset.tabindex//将药品下标传入全局
    })
  },
  drugNameChange: function (e) {
    let that=this;
    let i = e.detail.value;//获得选项的数组下标
    let index = this.data.index;
    let value = this.data.drugNameItems[i];//获得选项的值
    this.setData({
      ['medicine['+index+'].name']:value
    });//将选项名称更新到WXML页面上
    //console.log(this.data.medicine[index].name);
  },
  zuoFaChange: function (e) {
    let that=this;
    let i = e.detail.value;//获得选项的数组下标
    let index = this.data.index;
    let value = this.data.zuoFaItems[i];//获得选项的值
    this.setData({
      ['medicine['+index+'].zuoFa']:value
    });//将选项名称更新到WXML页面上
    //console.log(this.data.medicine[index].zuoFa);
  },
  grammageChange: function (e) {
    let that=this;
    let i = e.detail.value;//获得选项的数组下标
    let index = this.data.index;
    let value = this.data.grammageItems[i];//获得选项的值
    this.setData({
      ['medicine['+index+'].grammage']:value
    });//将选项名称更新到WXML页面上
    //console.log(this.data.medicine[index].grammage);
  },
  cancel:function(){
    wx.showToast({

      title: '已取消',
 
      icon: 'none',
 
      duration: 2000//持续的时间
 
    })
  },
  save:function(){
    for(let i=0,j=8;i<j;i++){
      console.log(this.data.medicine[i]);
      if(this.data.medicine[i].name=='药名'||this.data.medicine[i].zuoFa=='做法'||this.data.medicine[i].grammage=='g'){
        console.log(this.data.medicine[i])
        this.data.medicine.splice(i,1);
        i-=1;//下标减一
        j-=1;//总数减一
      }
    }
    //存储数据
    wx.setStorage({
      // key作为引用时的依据
      key: "Medicine",
      //将subOrder中数据提交
      data: this.data.medicine
    });
    wx.showToast({

      title: '保存成功',
 
      icon: 'success',
 
      duration: 2000//持续的时间
 
    })
    wx.redirectTo({
      url: '/pages/submit/submit'
    });
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