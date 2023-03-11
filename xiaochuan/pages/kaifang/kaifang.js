var util=require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkSelf:[],
    id:'',
    name:'',
    gender:'',
    phone:'',
    keshi:'',
    age:'',
    date:'',
    zhushu:'',
    maleChecked:"",
    femaleChecked:"",
    disease:'请选择病名',
    syndrome:'请选择证型',
    advice:'',
    method:'请选择治疗方法',
    c_name:'',
    medicine:[{name:'药名',zuoFa:'做法',grammage:'g'},{name:'药名',zuoFa:'做法',grammage:'g'},{name:'药名',zuoFa:'做法',grammage:'g'},{name:'药名',zuoFa:'做法',grammage:'g'},{name:'药名',zuoFa:'做法',grammage:'g'},{name:'药名',zuoFa:'做法',grammage:'g'},{name:'药名',zuoFa:'做法',grammage:'g'},{name:'药名',zuoFa:'做法',grammage:'g'}],
    diseaseItems:['哮喘','流产','小儿咳嗽','肺结核','风热'],
    syndromeItems:['寒哮','心肺气虚','水湿','气滞证'],
    methodItems:['辛温解表','清热祛湿','补气','清热解毒','活血祛瘀'],
    drugNameItems:['白豆蔻仁','白茯苓','神曲','葛花','淡竹茹','人参片','陈米','生荷叶'],
    zuoFaItems:['打粉','包煎','先下','先煎','后下','炮制'],
    grammageItems:['1g','2g','3g','4g','5g','6g','7g','8g','9g','10g','11g','12g','13g','14g'],
  },

  //单选按钮发生变化
  changesex(e) {
    this.setData({
      //更新性别数据
      gender: e.detail.value
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
    console.log(this.data.medicine[index].name);
  },
  zuoFaChange: function (e) {
    let that=this;
    let i = e.detail.value;//获得选项的数组下标
    let index = this.data.index;
    let value = this.data.zuoFaItems[i];//获得选项的值
    this.setData({
      ['medicine['+index+'].zuoFa']:value
    });//将选项名称更新到WXML页面上
    console.log(this.data.medicine[index].zuoFa);
  },
  grammageChange: function (e) {
    let that=this;
    let i = e.detail.value;//获得选项的数组下标
    let index = this.data.index;
    let value = this.data.grammageItems[i];//获得选项的值
    this.setData({
      ['medicine['+index+'].grammage']:value
    });//将选项名称更新到WXML页面上
    console.log(this.data.medicine[index].grammage);
  },
  cancel:function(){
    wx.showToast({

      title: '已取消',
 
      icon: 'none',
 
      duration: 2000//持续的时间
 
    })
  },
  save:function(){
    var that=this;
   
    var str="";
    for(let i=0,j=8;i<j;i++){
      if(this.data.medicine[i].name!="药名"&&this.data.medicine[i].zuoFa!="做法"&&this.data.medicine[i].grammage!="g")
        str+=this.data.medicine[i].name+","+this.data.medicine[i].zuoFa+","+this.data.medicine[i].grammage+";"
      
    }
    console.log(str);
     
wx.request({
  url: 'http://localhost:8080/saveChufang',
  method:"POST",
  data:{
    id:that.data.id,
    doctorId:getApp().globalData.doctorInfo.id,
    name:that.data.name,
    gender:that.data.gender,
    phone:that.data.phone,
    age:that.data.age,
    keshi:that.data.keshi,
    date:that.data.date,
    zhushu:that.data.zhushu,
    disease:that.data.disease,
    syndrome:that.data.syndrome,
    advice:that.data.advice,
    method:that.data.method,
    chufangName:that.data.c_name,
    medicine:str
  

  },
  header: {
   'content-type': 'application/json'
 },
})

    wx.showToast({

      title: '保存成功',
 
      icon: 'success',
 
      duration: 2000//持续的时间
 
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({id:options.id})
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
      url: 'http://localhost:8080/getCheckBySelfDetail/'+that.data.id,
      method:"GET",
     success:function(result){
       console.log(result.data.data)
        that.setData({
          checkSelf:result.data.data
        })

        that.setData({
          name:that.data.checkSelf.name,
          phone:that.data.checkSelf.phone,
          age:that.data.checkSelf.age,
         
        })
        
        if(that.data.checkSelf.gender=='男')
         {
           that.setData({
             maleChecked:'checked',
             gender:'male',
           })
         }

         if(that.data.checkSelf.gender=='女')
         {
           that.setData({
            femaleChecked:'checked',
             gender:'female'
           })
         }

        var DATE = util.formatDate(new Date());
      that.setData({
       date: DATE,
      });
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
    
  },

   name_input:function(e){
  
    this.setData({
      name:e.detail.value
    })
   
  },

  phone_input:function(e){
  
    this.setData({
      phone:e.detail.value
    })
   
  },
  keshi_input:function(e){
  
    this.setData({
      keshi:e.detail.value
    })
   
  },
  age_input:function(e){
  
    this.setData({
      age:e.detail.value
    })
   
  },
  zhushu_input:function(e){
  
    this.setData({
      zhushu:e.detail.value
    })
   
  },

  advice_input:function(e){
  
    this.setData({
     advice:e.detail.value
    })
   
  },

  c_name_input:function(e){
  
    this.setData({
     c_name:e.detail.value
    })
   
  }

})