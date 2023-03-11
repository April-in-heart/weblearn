// pages/submit/submit.js
//引入utils里的文件
var util = require('../../utils/util.js');
var wxCharts = require('../../utils/wxcharts.js');
var columnChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    chartTitle: '体质分析图',
    isMainChartDisplay: true,
    score:[],

      text:{
      /*  "status": "success",
        "data": {
            "uid": 1,
            "typeList": [
                "基本是平和质",
                "倾向是痰湿质"
            ],
            "assessmentMap": {
                "痰湿质": {
                    "id": 6,
                    "type": "痰湿质",
                    "typeDescription": "痰湿体质的主要是人体内的脏腑功能失调，容易引起气血津液，运化失调，水湿停聚，聚湿成痰而成痰瘀内均表现。",
                    "dietRecommendation": "建议饮食以清淡为原则，适宜食用具有健脾、化痰、除湿功效的食物，少吃肥肉及甜、粘、油腻的食物。",
                    "medicinalDishes": "养生推荐：冬瓜汤。冬瓜有利尿、祛痰的功效，夏季常食还可以清热解毒。痰湿体质的人一定要控制甜食和油腻的食物。",
                    "acupoint": null,
                    "medicine": null,
                    "dailyHealth": "避免涉水淋雨，久居湿地，注意保暖，防止外感寒湿之邪伤脾困脾，特别梅雨季节注意防潮湿。",
                    "sport": "多进行户外活动，坚持体育锻炼；",
                    "lifeHabbit": "不要过于安逸、贪恋床榻；节制大喜大悲，培养业余爱好，转移注意力。"
                },
                "平和质": {
                    "id": 2,
                    "type": "平和质",
                    "typeDescription": "先天的遗传条件良好，后天的饮食起居生活习惯适宜，即后天调养得当。",
                    "dietRecommendation": "饮食有节制。不要常吃过冷过热或不干净的食物",
                    "medicinalDishes": "春宜升补，即顺应阳气升发之性，食性宜清轻升发，宣透阳气，但应注意升而不散，温而不热，不吃太多的辛热升散之品，宜多食蔬菜；夏宜清补，应选用清热解暑、清淡芳香的食物，不可食用味厚发热的食物；进食宜选用寒温偏性不明显的平性药食，不宜吃大寒大热的东西，即所谓平补之法。冬宜温补，选用温热助阳之品，以扶阳散寒，如姜、桂、胡椒、羊肉、牛肉、鹿脯、枣、鳝鱼、鳖温补的常用食品。",
                    "acupoint": null,
                    "medicine": null,
                    "dailyHealth": "合理睡眠起居应有规律，不要过度疲劳。饭后宜缓行百步，不宜食后即睡。作息应有规律，应劳逸结合，保持充足的睡眠时间，注意四季养生。",
                    "sport": "根据年龄和性别，参加适度的运动。如年轻人可适当跑步、打球，老年人可适当散步、打太极拳等。",
                    "lifeHabbit": "保持乐观开朗的情绪，积极进取，节制偏激的情感，及时消除生活中不利的事件对情绪的负面影响。"
                }
            }
        }*/
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //不用that用this会报错
  let that=this;
  // // 调用函数时，传入new Date()参数，返回值是日期和时间
  // //需要现在开头引入util/js文件
  // let time = util.formatTime(new Date());
  // // 再通过setData更改Page()里面的data，动态更新页面的数据
  // that.setData({
  //   time: time
  // });
  wx.getStorage({
    key: 'Score',
    success: function (res) {
      that.setData({
        score: res.data
      });
    },
  });
  console.log(that.data)

  that.setData({
    text:getApp().globalData.text
  })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let windowWidth=450;
    try {
      console.log(this.data.score)
      //获取当前尺寸定义res
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    columnChart = new wxCharts({
      //canvas-id与new wxCharts({canvasId:”})中canvasId一致
      canvasId: 'columnCanvas',
      //图表类型，可选值为pie, line, column, area, ring
      type: 'column',
      //animation:是否有动画
      animation: true,

      //categories:类别
      categories: ['平和质','气虚质','阳虚质','阴虚质','痰湿质','湿热质','血瘀质','气郁质','特禀质'],
      // categories: ["2020/05/01", "2020/05/01", "2020/05/03", " 2020/05/04", "2020/05/05"],

      //定义series数组
      series: [{
        name: '体质',
        //颜色与图上显示的颜色绑定
        color: '#4169e1',

        data: [this.data.score[0], this.data.score[1], this.data.score[2], this.data.score[3], this.data.score[4],this.data.score[5],this.data.score[6],this.data.score[7],this.data.score[8],],

        format: function (val, name) {
          return val;
        }
      }
      ],
      yAxis: {
        format: function (val) {
          return val + '分';
        },
        //Y轴初始值
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15,
        },
        //图标下方类别标识字体颜色
        legendTextColor: '#000000'
      },
      //统计图宽度
      width: windowWidth,
      //统计图高度
      height: 250,
      //datalabel是否显示各点数据
      dataLabel: true,
    });
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