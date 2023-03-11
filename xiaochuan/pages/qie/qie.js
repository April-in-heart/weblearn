// pages/qie/qie.js
var last = 'twoisSelect';
var currentlist = 'bothmailist';
var bothvalue = [];
var leftvalue = [];
var rightvalue = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    twoisSelect: true,
    leftisSelect: false,
    rightisSelect: false,
    title: `您的脉搏<b style="color:#2089dc">一分钟</b>跳动数`,
    mainum: 0,
    bothlist: [],
    leftlist: [],
    rightlist: [],
    mailist: [],
    leftmailist: [{
        name: '数',
        isoption: false
      },
      {
        name: '浮'
      },
      {
        name: '玹'
      },
      {
        name: '滑'
      },
      {
        name: '洪'
      },
      {
        name: '大'
      },
      {
        name: '实'
      },
      {
        name: '迟'
      },
      {
        name: '沉'
      },
      {
        name: '缓'
      },
      {
        name: '涩'
      },

      {
        name: '细'
      },
      {
        name: '小'
      },
      {
        name: '虚'
      },
      {
        name: '长'
      },

      {
        name: '紧'
      },
      {
        name: '动'
      },
      {
        name: '革'
      },

      {
        name: '微'
      },
      {
        name: '濡'
      },
      {
        name: '芤'
      },
      {
        name: '短'
      }, {
        name: '散'
      }, {
        name: '弱'
      }, {
        name: '伏'
      }, {
        name: '结'
      }, {
        name: '代'
      }, {
        name: '促'
      }, {
        name: '有力'
      }, {
        name: '无力'
      },
      {
        name: '平'
      },
    ],
    bothmailist: [{
        name: '数',
        isoption: false
      },
      {
        name: '浮'
      },
      {
        name: '玹'
      },
      {
        name: '滑'
      },
      {
        name: '洪'
      },
      {
        name: '大'
      },
      {
        name: '实'
      },
      {
        name: '迟'
      },
      {
        name: '沉'
      },
      {
        name: '缓'
      },
      {
        name: '涩'
      },

      {
        name: '细'
      },
      {
        name: '小'
      },
      {
        name: '虚'
      },
      {
        name: '长'
      },

      {
        name: '紧'
      },
      {
        name: '动'
      },
      {
        name: '革'
      },

      {
        name: '微'
      },
      {
        name: '濡'
      },
      {
        name: '芤'
      },
      {
        name: '短'
      }, {
        name: '散'
      }, {
        name: '弱'
      }, {
        name: '伏'
      }, {
        name: '结'
      }, {
        name: '代'
      }, {
        name: '促'
      }, {
        name: '有力'
      }, {
        name: '无力'
      },
      {
        name: '平'
      },
    ],
    rightmailist: [{
        name: '数',
        isoption: false
      },
      {
        name: '浮'
      },
      {
        name: '玹'
      },
      {
        name: '滑'
      },
      {
        name: '洪'
      },
      {
        name: '大'
      },
      {
        name: '实'
      },
      {
        name: '迟'
      },
      {
        name: '沉'
      },
      {
        name: '缓'
      },
      {
        name: '涩'
      },

      {
        name: '细'
      },
      {
        name: '小'
      },
      {
        name: '虚'
      },
      {
        name: '长'
      },

      {
        name: '紧'
      },
      {
        name: '动'
      },
      {
        name: '革'
      },

      {
        name: '微'
      },
      {
        name: '濡'
      },
      {
        name: '芤'
      },
      {
        name: '短'
      }, {
        name: '散'
      }, {
        name: '弱'
      }, {
        name: '伏'
      }, {
        name: '结'
      }, {
        name: '代'
      }, {
        name: '促'
      }, {
        name: '有力'
      }, {
        name: '无力'
      },
      {
        name: '平'
      },
    ],
  },
  clearcgc:function(id){
    this.setData({
      ['mailist[' + id + '].cun']: false,
      ['mailist[' + id + '].guan']: false,
      ['mailist[' + id + '].chi']: false,
    })
  },
  findMdata:function(value,list){
    for (let i = 0; i < list.length; i++) {
        let va = list[i];
        if(va.search(value)!=-1){
          return true;
        }
    }
    return false;
  },
  addMData: function (value,id) {
    if (currentlist == 'bothmailist') {
      if (bothvalue.indexOf(value) != -1 || this.findMdata(value,bothvalue) ){
        bothvalue.pop(value);
        this.clearcgc(id);
      }
      else
        bothvalue.push(value);
    } else if (currentlist == 'leftmailist' ) {
      if (leftvalue.indexOf(value) != -1 || this.findMdata(value,leftvalue)){
        leftvalue.pop(value);
        this.clearcgc(id);
      }
      else
        leftvalue.push(value);
    } else {
      if (rightvalue.indexOf(value) != -1 || this.findMdata(value,rightvalue)){
        rightvalue.pop(value);
        this.clearcgc(id);
      }
      else
        rightvalue.push(value);
    }
    return;
  },
  addCGCData: function (value, cgc) {
    if (currentlist == 'bothmailist') {
      let va = '';
      for (let i = 0; i < bothvalue.length; i++) {
        va = bothvalue[i];
        let con = bothvalue[i][0];
        if(con != value){
          continue;
        }
        if ( bothvalue.indexOf(value) != -1 || va.search(value) != -1 ) {
          if (va.search(cgc) != -1) {
            let newva = va.split(cgc).join("");
            bothvalue[i] = newva;
          } else {

            bothvalue[i] += cgc;
          }
          break;
        } 
        else {
      
          return false;
        }
      }
    } else if (currentlist == 'leftmailist') {
      let va = '';
   
      for (let i = 0; i < leftvalue.length; i++) {
        va = leftvalue[i];
        let con = leftvalue[i][0];
        if(con != value){
          continue;
        }
        if (leftvalue.indexOf(value) != -1 || va.search(value) != -1) {
          if (va.search(cgc) != -1) {
            let newva = va.split(cgc).join("");
            leftvalue[i] = newva;
          } else {
            leftvalue[i] += cgc;
          }

          break;
        } else {
          return false;
        }
      }
    } else {
      let va = '';
    
      for (let i = 0; i < rightvalue.length; i++) {
        va = rightvalue[i];
        let con = rightvalue[i][0];
        if(con != value){
          continue;
        }
        if (rightvalue.indexOf(value) != -1 || va.search(value) != -1) {
          if (va.search(cgc) != -1) {
            let newva = va.split(cgc).join("");
            rightvalue[i] = newva;
          } else {
            rightvalue[i] += cgc;
          }
          break;
        } else {
          return false;
        }
      }
    }
    return true;
  },
  clear:function(){
    let i =0;
    while (i < this.data.mailist.length) {
      this.setData({
        ['mailist[' + i + '].cun']: false,
        ['mailist[' + i + '].guan']: false,
        ['mailist[' + i + '].chi']: false,
        ['mailist[' + i + '].isoption']: false,
      })
      i++;
    }
  },
   /**cleardata
   * 自定义函数--清空选择的脉象
   */
  cleardata:function(e){
    if(currentlist=='bothmailist'){
      bothvalue = [];
      this.setData({bothlist:bothvalue})
      wx.showToast({
        title: '两侧脉象已清空',
        icon:'none'
      })
    }else if(currentlist=='leftmailist'){
      leftvalue=[];
      this.setData({leftlist:leftvalue})
      wx.showToast({
        title: '左脉象已清空',
        icon:'none'
      })
    }else{
      this.setData({rightlist:rightvalue})
      rightvalue=[];
      wx.showToast({
        title: '右脉象已清空',
        icon:'none'
      })
    }
    this.clear();
  },
     /**
   * 自定义函数--确认选择的脉象
   */
  suredata:function(e){
    if(currentlist=='bothmailist'){
      this.setData({bothlist:bothvalue})
      wx.showToast({
        title: '两侧脉象已确定',
        icon:'none'
      })
    }else if(currentlist=='leftmailist'){
      this.setData({leftlist:leftvalue})
      wx.showToast({
        title: '左脉象已确定',
        icon:'none'
      })
    }else{
      this.setData({rightlist:rightvalue})
      wx.showToast({
        title: '右脉象已确定',
        icon:'none'
      })
    }
  },
  /**
   * 自定义函数--获取脉象寸关尺
   */
  getCGC: function (e) {
    let id = e.target.id;
    let idvalue = '';
    let index = e.currentTarget.dataset.index;
    if (id == 'cun')
      idvalue = '寸';
    if (id == 'guan')
      idvalue = '关';
    if (id == 'chi')
      idvalue = '尺';
    if(this.data.mailist[index].isoption){
      if(this.addCGCData(this.data.mailist[index].name, idvalue)){
        this.setData({
          ['mailist[' + index + '].' + id]: !this.data.mailist[index][id],
        })
      }
    }else{
      
        wx.showToast({
          title: '请先选择脉象',
          icon: 'none'
        })
    }

  },
  /**
   * 自定义函数--获取脉象id
   */
  getMId: function (e) {
    let id = e.target.id;
    this.setData({
      ['mailist[' + id + '].isoption']: !this.data.mailist[id].isoption
    })
  
    this.addMData(this.data.mailist[id].name,id);
 
  },
  /**
   * 自定义函数--封装数据，上传数据库
   */
  submit: function (e) {
  

      var qie="两侧："+bothvalue+";"+"左："+leftvalue+";"+"右："+rightvalue
      getApp().globalData.qie=qie
      getApp().globalData.mainum= this.data.mainum
      console.log(qie);
      wx.navigateBack({
        delta: 1,
      })
  },
  /**
   * 自定义函数--获取脉搏跳动数
   */
  getnumber: function (e) {
    let value = e.detail.value;
    this.setData({
      mainum: value
    })
  },
  /**changetitle
   * 自定义函数--选择两侧、左、右的脉象
   */
  changetitle: function (e) {
    let id = e.target.id;
    currentlist = e.currentTarget.dataset.currentlist;
    this.setData({
      [last]: false
    })
    this.setData({
      [id]: !this.data[id]
    })
    last = id;
    this.setData({
      mailist: this.data[currentlist]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let i = 0;
    while (i < this.data.mailist.length) {
      this.setData({
        ['bothmailist[' + i + '].cun']: false,
        ['leftmailist[' + i + '].cun']: false,
        ['rightmailist[' + i + '].cun']: false,
      })
      this.setData({
        ['bothmailist[' + i + '].guan']: false,
        ['leftmailist[' + i + '].guan']: false,
        ['rightmailist[' + i + '].guan']: false,
      })
      this.setData({
        ['bothmailist[' + i + '].chi']: false,
        ['leftmailist[' + i + '].chi']: false,
        ['rightmailist[' + i + '].chi']: false,
      })
      i++;
    }
    this.setData({
      mailist: this.data.bothmailist
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