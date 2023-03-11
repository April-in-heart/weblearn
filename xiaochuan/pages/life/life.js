// pages/life.js
var dieto = [];
var option = "";
//定义封装的数据（用户点击提交）
var lifeDataset = [];
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
      flagsmoke:false,
      flagwine:false,
      isDiet:false,
      isSleep:false,
      isSport:false,
      isWork:false,
      isEmotion:false,
      isLive:false,
      age:"",
      gender:"",
      profession:"",
      disease:"",
      sleep:"",
      sport:"",
      work:"",
      emotion:"",
      live:"",
      smokeage:"",
      samount:"",
      wineage:"",
      wamount:"",
      sleepo:"",
      sporto:"",
      worko:"",
      emotiono:"",
      liveo:"",
      /** */
      diet:[],
      dietlist:[
        {
          id:0,
          isOption:false,
          context:"喜甘甜",
        },
        {
          id:1,
          isOption:false,
          context:"喜辛辣",
        },
        {
          id:2,
          isOption:false,
          context:"喜酸",
        },
        {
          id:3,
          isOption:false,
          context:"喜咸",
        },
        {
          id:4,
          isOption:false,
          context:"喜清淡",
        },
        {
          id:5,
          isOption:false,
          context:"喜油腻",
        },
        {
          id:6,
          isOption:false,
          context:"喜炙烤",
        },
        {
          id:7,
          isOption:false,
          context:"喜冷、凉",
        },
        {
          id:8,
          isOption:false,
          context:"喜热",
        },
        {
          id:9,
          isOption:false,
          context:"好吸烟",
        },
        {
          id:10,
          isOption:false,
          context:"喜饮酒",
        },
      ],
      sleeplist:[
        {
          id:0,
          isOption:false,
          context:"早睡早起",
        },
        {
          id:1,
          isOption:false,
          context:"晚睡晚起",
        },
        {
          id:2,
          isOption:false,
          context:"早睡晚起",
        },
        {
          id:3,
          isOption:false,
          context:"晚睡早起",
        },
        {
          id:4,
          isOption:false,
          context:"不规律",
        },
      ],
      sportlist:[
        {
          id:0,
          isOption:false,
          context:"经常运动",
        },
        {
          id:1,
          isOption:false,
          context:"有时运动",
        },
        {
          id:2,
          isOption:false,
          context:"不太运动",
        }
      ],
      worklist:[
        {
          id:0,
          isOption:false,
          context:"20小时及以上/周",
        },
        {
          id:1,
          isOption:false,
          context:"10-20小时/周",
        },
        {
          id:2,
          isOption:false,
          context:"5-10小时/周",
        },
        {
          id:3,
          isOption:false,
          context:"小于5小时/周",
        },
        {
          id:4,
          isOption:false,
          context:"无",
        },
      ],
      emotionlist:[
        {
          id:0,
          isOption:false,
          context:"悲伤居多"
        },
        {
          id:1,
          isOption:false,
          context:"愤怒居多"
        },  {
          id:2,
          isOption:false,
          context:"焦虑居多"
        },
        {
          id:3,
          isOption:false,
          context:"高兴/开心居多"
        },
        {
          id:4,
          isOption:false,
          context:"平静居多"
        }
      ],
      livelist:[
        {
          id:0,
          isOption:false,
          context:"阴暗潮湿"
        },
        {
          id:1,
          isOption:false,
          context:"干燥"
        },
        {
          id:2,
          isOption:false,
          context:"环境适宜"
        }
      ]
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
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  changeinputBoxShow:function(e){
    wx.hideKeyboard({
      success: (res) => {
        
      },
    })
    this.setData({inputBoxShow:true});
    option = e.target.id;
    this.setData({
      [option]:true,
    })
  },
  showInputBox: function () {
    this.setData({ inputBoxShow: true });
    this.setData({ isScroll: false });
    },
        /**
     * 判断用户信息是否填写完善
     */
    foxMess:function(){
      if(this.data.age==""){
        wx.showToast({
          title: '请输入您的年龄！',
          icon:'none'
        })
        return false;
      }else if(this.data.gender==""){
        wx.showToast({
          title: '请选择你的性别！',
          icon:'none'
        })
         return false;
      }else if(this.data.profession==""){
        wx.showToast({
          title: '请输入您的职业！',
          icon:'none'
        })
        return false;
      }else if(this.data.disease==""){
        wx.showToast({
          title: '请选择疾病状态！',
          icon:'none'
        })
         return false;
      }else if(this.data.diet==""){
        wx.showToast({
          title: '请选择您的饮食习惯！',
          icon:'none'
        })
        return false;
      }else if(this.data.sleep==""){
        wx.showToast({
          title: '请选择您的睡眠习惯！',
          icon:'none'
        })
        return false;
      }else if(this.data.sport==""){
        wx.showToast({
          title: '请选择您的运动习惯！',
          icon:'none'
        })
        return false;
      }else if(this.data.work==""){
        wx.showToast({
          title: '请选择您的加班情况！',
          icon:'none'
        })
        return false;
      }else if(this.data.emotion==""){
        wx.showToast({
          title: '请选择您的情绪状态！',
          icon:'none'
        })
        return false;
      }else if(this.data.live==""){
        wx.showToast({
          title: '请选择您的居住环境！',
          icon:'none'
        })
        return false;
      }else if(!this.data.flagsmoke && (this.data.smokeage=="" || this.data.samount=="")){
        wx.showToast({
          title: '您的烟龄或者吸烟量未输入！',
          icon:'none'
        })
        return false;
      }else if(!this.data.flagwine && (this.data.wineage=="" || this.data.wamount=="")){
          wx.showToast({
            title: '您的酒龄或者饮酒量未输入！',
            icon:'none'
          })
          return false;
      }else{
        return true;
      }
  },
    /**
     * 用户点击取消
     */
    invisible: function(e){
    this.setData({ inputBoxShow: false });
    this.setData({ isScroll: true });
    this.setData({[option]:false});
    },
    /**
     * 用户点击选项(可多选)
     */
    changeOption:function(e){
      let index = e.target.id;
      let name = e.currentTarget.dataset.name;
      let that = this;
      let isOption = that.data[name][index].isOption;
      let context = that.data[name][index].context;
      if(!isOption){
        that.setData({
          [name+'['+index+'].isOption']:true,
        })
        dieto.push(context);
      }else{
        that.setData({
          [name+'['+index+'].isOption']:false,
        })
        dieto.pop(context);
      }
    
    },
        /**
     * 用户点击选项（单选）
     */
    changeUOption:function(e){
      let index = e.target.id;
      let name = e.currentTarget.dataset.name;
      let listvalue = e.currentTarget.dataset.listvalue;
      let that = this;
      let isOption = that.data[name][index].isOption;
      let context = that.data[name][index].context;
      if(!isOption){
        that.setData({
          [name+'['+index+'].isOption']:true,
          [listvalue]:context,
        })
        for(let i = 0; i < that.data[name].length; i ++){
          if(i == index){
            continue;
          }else{
            this.setData({
              [name+'['+i+'].isOption']:false,
            })
          }
        }
      }else{
        that.setData({
          [name+'['+index+'].isOption']:false,
          [listvalue]:"",
        })
      }
    
    },
    /**
     * 用户确定选项
     */
    ensureOption:function(e){
      this.setData({ inputBoxShow: false });
      this.setData({ isScroll: true });
      this.setData({
          diet:dieto,
          sleep:this.data.sleepo,
          sport:this.data.sporto,
          work:this.data.worko,
          emotion:this.data.emotiono,
          live:this.data.liveo,
        
        });
      this.setData({[option]:false});
      //在input中显示用户选的选项

    },
    /**
     * 用户点击提交，封装数据
     */
    submit:function(){


      var that=this;
        if(this.foxMess()){
            wx.request({
              url: 'http://localhost:8080/lifeSave',
              method:"POST",
              header: {
                'content-type': 'application/json'
              },
              data:{
                token:getApp().globalData.token,
                age:that.data.age,
                gender:that.data.gender,
                profession:that.data.profession,
                disease:that.data.disease,
                diet:that.data.diet,
                sleep:that.data.sleep,
                sport:that.data.sport,
                work:that.data.work,
                emotion:that.data.emotion,
                live:that.data.live,
                smokeAge:that.data.smokeage,
                smokeCount:that.data.samount,
                wineAge:that.data.wineage,
                wineCount:that.data.wamount, 
              },

              success:function(e){
                
                wx.navigateTo({
                  url: '/pages/index2/index2',
                })
              }


            })

          
         
       
        
        }
    
  
    },
    /**
     * 把用户输入的信息存入data
     */
    saveData:function(e){
      let inputbox = e.currentTarget.dataset.inputbox;
      this.setData({
        [inputbox]:e.detail.value,
       })
       console.log(inputbox+e.detail.value);
    },
    /**
     * 
     */
    saveData2:function(e){
      let box = e.currentTarget.dataset.box;
      this.setData({
        [box]:e.detail.value,
       })
    },
    /**
     * 用户烟龄（酒龄）选择无
     */
    checkNo:function(e){
        //选中烟龄无，烟龄，吸烟量输入框不可输入
        if(e.currentTarget.id == "cigarette" && e.detail.value == "true"){
          this.setData({flagsmoke:true});
          this.setData({smokeage:"",samount:""})
        }
        //选中酒龄无，酒龄，饮酒量输入框不可输入
        else if(e.currentTarget.id == "wine" && e.detail.value == "true"){
            this.setData({flagwine:true})
            this.setData({wineage:"",wamount:""})
        }
        //取消选中烟龄无，烟龄，吸烟量输入框可输入
        if(e.currentTarget.id == "cigarette" && e.detail.value == ""){
          this.setData({flagsmoke:false});
        }
        //取消选中酒龄无，酒龄，饮酒量输入框可输入
        else if(e.currentTarget.id == "wine" && e.detail.value == ""){
            this.setData({flagwine:false})
        }
    

    },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})