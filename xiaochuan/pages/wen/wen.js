// pages/wen/wen.js
var last = "alllist";//控制menu单选
var delast = "low";//控制症状程度单选
var deg = "alllistx";//标记当前选择的症状
var deg_index = 0;
var symlen = 0;
var sure = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOption:true,
    opistrue:false,
    low:false,
    medi:false,
    high:false,
    emotionlist:false,
    dietlist:false,
    blist:false,
    voicelist:false,
    skinlist:false,
    twolist:false,
    fourlist:false,
    bodylist:false,
    headlist:false,
    alllist:true,
    fivelist:false,
    txtlist:[  ],
    alllistx:[],
    emotionlistx:[
      {
        txt:'失眠',
        opistrue:false
      },
      {
        txt:'嗜睡',
        opistrue:false
      },
      {
        txt:'睡中流延',
        opistrue:false
      },
      {
        txt:'睡中介齿',
        opistrue:false
      },
      {
        txt:'烦躁',
        opistrue:false
      },
      {
        txt:'精神不振',
        opistrue:false
      },
      {
        txt:'精神亢奋',
        opistrue:false
      },
      {
        txt:'情感低落',
        opistrue:false
      },
      {
        txt:'神智错乱',
        opistrue:false
      },
    ],
    dietlistx:[
      {
        txt:'食欲不振',
        opistrue:false
      },
      {
        txt:'食欲旺盛',
        opistrue:false
      },
      {
        txt:'偏食酸辣',
        opistrue:false
      },
      {
        txt:'偏食生冷',
        opistrue:false
      },
      {
        txt:'食少无味',
        opistrue:false
      },
      {
        txt:'食则胀饱',
        opistrue:false
      },
      {
        txt:'食后作泻',
        opistrue:false
      },
      {
        txt:'食后则吐',
        opistrue:false
      },
      {
        txt:'进食梗塞',
        opistrue:false
      },
      {
        txt:'厌油',
        opistrue:false
      },
      {
        txt:'多食易饥',
        opistrue:false
      }
    ],
    blistx:[
      {
        txt:'小便如脂膏',
        opistrue:false
      },
      {
        txt:'尿黄',
        opistrue:false
      },
      {
        txt:'尿痛',
        opistrue:false
      },
      {
        txt:'尿路结石',
        opistrue:false
      },
      {
        txt:'尿血',
        opistrue:false
      },
      {
        txt:'便秘',
        opistrue:false
      },
      {
        txt:'大便频数',
        opistrue:false
      },
      {
        txt:'小便灼热',
        opistrue:false
      }
    ],
    voicelistx:[
      {
        txt:'失音',
        opistrue:false
      },
      {
        txt:'气粗声高息涌',
        opistrue:false
      },
      {
        txt:'喉间有哮鸣音',
        opistrue:false
      },
      {
        txt:'喉中痰鸣',
        opistrue:false
      },
      {
        txt:'鸡鸣样回声',
        opistrue:false
      },
      {
        txt:'猪羊鸣叫',
        opistrue:false
      },
      {
        txt:'惊呼鸣叫',
        opistrue:false
      }
    ],
    skinlistx:[
      {
        txt:'浮肿',
        opistrue:false
      },
      {
        txt:'皮肤潮红',
        opistrue:false
      },
      {
        txt:'皮肤斑疹',
        opistrue:false
      },
      {
        txt:'皮肤按之凹陷',
        opistrue:false
      },
      {
        txt:'局部青紫',
        opistrue:false
      },
      {
        txt:'皮肤粗糙',
        opistrue:false
      },
      {
        txt:'创色蜡黄',
        opistrue:false
      },
      {
        txt:'皲裂',
        opistrue:false
      },
      {
        txt:'毛发不荣',
        opistrue:false
      }
    ],
    twolistx:[
      {
        txt:'外阴糜烂',
        opistrue:false
      },
      {
        txt:'滑精',
        opistrue:false
      },
      {
        txt:'带下量多',
        opistrue:false
      },
      {
        txt:'阴冷',
        opistrue:false
      },
      {
        txt:'肛门灼热',
        opistrue:false
      },
      {
        txt:'阴道干涩',
        opistrue:false
      },
      {
        txt:'月经不调',
        opistrue:false
      }
      ,
      {
        txt:'睾丸疼痛',
        opistrue:false
      }
    ],
    fourlistx:[
      {
        txt:'四肢水肿',
        opistrue:false
      },
      {
        txt:'关节肿胀',
        opistrue:false
      },
      {
        txt:'四肢酸痛',
        opistrue:false
      },
      {
        txt:'腿痛',
        opistrue:false
      },
      {
        txt:'手足抽搐',
        opistrue:false
      },
      {
        txt:'手足心汗',
        opistrue:false
      },
      {
        txt:'下肢酸困',
        opistrue:false
      },
      {
        txt:'四肢厥冷',
        opistrue:false
      },
      {
        txt:'手足颤动',
        opistrue:false
      }
    ],
    bodylistx:[
      {
        txt:'腹泻',
        opistrue:false
      },
      {
        txt:'肠鸣',
        opistrue:false
      },
      {
        txt:'乳房胀痛',
        opistrue:false
      },
      {
        txt:'胸胁胀痛',
        opistrue:false
      },
      {
        txt:'小腹痛',
        opistrue:false
      },
      {
        txt:'腰痛',
        opistrue:false
      },
      {
        txt:'腰膝酸软',
        opistrue:false
      },
      {
        txt:'胃脘痛',
        opistrue:false
      },
      {
        txt:'灼胃腹热',
        opistrue:false
      }
    ],
    headlistx:[
      {
        txt:'面部油亮',
        opistrue:false
      },
      {
        txt:'头晕耳鸣',
        opistrue:false
      },
      {
        txt:'偏头痛',
        opistrue:false
      },
      {
        txt:'头痛',
        opistrue:false
      },
      {
        txt:'头重',
        opistrue:false
      },
      {
        txt:'头汗',
        opistrue:false
      },
      {
        txt:'头皮多屑',
        opistrue:false
      },
      {
        txt:'面黄',
        opistrue:false
      },
      {
        txt:'痉笑面容',
        opistrue:false
      }
    ],
    fivelistx:[
      {
        txt:'口苦口干',
        opistrue:false
      },
      {
        txt:'黑眼圈',
        opistrue:false
      },
      {
        txt:'鼻塞',
        opistrue:false
      },
      {
        txt:'胖大舌',
        opistrue:false
      },
      {
        txt:'口黏腻',
        opistrue:false
      },
      {
        txt:'目痛',
        opistrue:false
      },
      {
        txt:'目痒',
        opistrue:false
      },
      {
        txt:'目赤红肿',
        opistrue:false
      },
      {
        txt:'视物模糊',
        opistrue:false
      }
    ],
    symlist:[
      
    ],
  },
      /**
   * 自定义函数--增加症状
   */
  addSym: function (e) {
    //console.log(e)
    if(!sure){
      wx.showToast({
        title: '请选择症状程度',
        icon:'none'
      })
    }else{
    sure=false;
    let degree="";
    let flag=false;
    let index = -1;
    if(delast=='low')
     degree="#7bc798";
    else if(delast=='medi')
      degree="#ffab1a";
    else
      degree="red";
    let value = this.data[deg][deg_index].txt;
    for(let i of this.data.symlist){
      index++;
      if(i.txt==value){
        flag=true;
        break;
      }
    }
    if(!flag){
      this.setData({ 
        ['symlist['+symlen+'].txt']:value,
        ['symlist['+symlen+'].degree']:degree,
      })
      this.setData({['txtlist['+deg_index+'].opistrue']:!this.data.txtlist[deg_index].opistrue})
      symlen++;
    }else{
      this.setData({ 
        ['symlist['+index+'].degree']:degree,
      })
      //console.log(index)
    }
    this.setData({ 
      opistrue:false,
      [delast]:false})
    }
   // console.log(this.data.symlist)
  },
     /**
   * 自定义函数--删除症状
   */
  cancelSym: function (e) {
   // console.log(e)
   let id = e.target.id;
   let va = this.data.symlist[id].txt;
   this.data.symlist.splice(id,1);
   this.setData({symlist:this.data.symlist,})
   symlen--;

   //console.log( this.data.symlist)
   let index = 0;
   for(let value of this.data.txtlist){
      if(va == value.txt){
       // console.log(value.txt)
        this.setData({
          ['txtlist['+index+'].opistrue']:false
        })
        break;
      }
      index++
   }
 // console.log(this.data.symlist)
  },
      /**
   * 自定义函数--提交问诊数据
   */
  submitdata: function (e) {
    //封装数据上传数据库,data
    let data = this.data.symlist;
    let index = 0;
    var wen="";
    for(let sym of data){
      if(sym.degree=='#7bc798'){
        wen+=data[index].txt+":"+"轻微"+";"
      }else if(sym.degree=='#ffab1a'){
        wen+=data[index].txt+":"+"中等"+";"
      }else{    
        wen+=data[index].txt+":"+"严重"+";"
      }
      index++;
    }
    
    console.log(wen);

   getApp().globalData.wen=wen

   wx.navigateBack({
     delta: 1,
   })

  },
    /**
   * 自定义函数--改变menu
   */
   changemenu: function (e) {
    //console.log(e)
    let part = e.currentTarget.dataset.menuindex;
    this.setData({[last]:!this.data[last]})
    this.setData({[part]:!this.data[part]})
    last = part;
    this.setData({txtlist:this.data[part+'x']})
    deg = part+'x';
  },
    /**
   * 自定义函数--取消选择症状程度
   */
  imgcancel: function (e) {
    //console.log(e)
    this.setData({opistrue:false,[delast]:false})
    sure=false;
  },
    /**
   * 自定义函数--选择症状程度
   */
  degree: function (e) {
    //console.log(e)
    sure=true;
    let degree = e.currentTarget.dataset.degree;
    this.setData({[delast]:false})
    this.setData({[degree]:!this.data[degree]})
    delast = degree;
  },
  /**
   * 自定义函数--改变radio
   */
  changeop: function (e) {
    //console.log(e)
    let index = e.target.id;
    deg_index = index;
    let flag = this.data.txtlist[index].opistrue;
    if(flag){
      this.setData({['txtlist['+index+'].opistrue']:false})
      for(let i = 0; i < this.data.symlist.length; i ++){
        console.log(this.data.txtlist[index].txt)
        if(this.data.symlist[i].txt==this.data.txtlist[index].txt){
          this.data.symlist.splice(i,1);
          this.setData({symlist:this.data.symlist})
          symlen--;
          break;
        }
      }
    }else{
      this.setData({opistrue:true})
    }
    //this.setData({['txtlist['+index+'].opistrue']:!this.data.txtlist[index].opistrue})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let all = this.data.blistx.concat(this.data.bodylistx).concat(this.data.headlistx).concat(this.data.emotionlistx).concat(this.data.fourlistx).concat(this.data.fivelistx).concat(this.data.twolistx).concat(this.data.skinlistx).concat(this.data.dietlistx).concat(this.data.voicelistx);

   // console.log(all)
    this.setData({alllistx:all})
      this.setData({txtlist:this.data.alllistx})

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