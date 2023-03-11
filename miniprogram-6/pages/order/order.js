//引入utils里的文件
var util = require('../../utils/util.js');
var app = getApp();
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    i: app.globalData.i,
    caldata: app.globalData.caldata,
    // 统计食物数量和卡路里
    orderCount: {
      num: 0,
      ocal: 0
    },
    bottomFlag: false,
    // 提交的菜单
    orders: true,
    items: [],
    age: '',
    height: '',
    weight: '',
    sex: '',
    manhealth: '',
    womanhealth: '',
    oldtime: ''

  },

  // 点击对应菜单减按钮
  del: function (event) {
    let that = this;
    let id = event.target.dataset.id;
    let index = event.target.dataset.index;
    let param = this.data.items[index];
    if (param.num > 0) {
      param.num--; // 每点一次减少1
    } else {
      param.num = 0; // 最低为0
    }
    // 改变添加按钮的状态
    this.data.items.splice(index, 1, param);
    that.setData({
      items: this.data.items
    });
    let ocal = 0;
    let num = 0;
    // 将已经确定总卡路里和数量求和
    this.data.items.forEach(item => {
      ocal += item.cal * item.num;
      num += item.num;
    });
    let orderCount = {
      num,
      ocal
    }
    // 设置显示对应的总数和全部卡路里
    this.setData({
      orderCount
    });
  },
  // 点击对应菜单加按钮
  add: function (event) {
    let that = this;
    let id = event.target.dataset.id;
    let index = event.target.dataset.index;
    let param = this.data.items[index];
    let subOrders = []; // 食物清单列表存储动态数据
    param.num++; // 每点一次增加1
    // 改变添加按钮的状态
    //splice() 方法向/从数组(subOrder)中添加/删除项目，然后返回被删除的项目.
    //index:必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
    //1:必需。要删除的项目数量。如果设置为 0，则不会删除项目。
    //param:可选。向数组添加的新项目。
    //返回值：array，包含被删除项目的新数组，如果有的话。
    this.data.items.splice(index, 1, param);
    //更新数据
    that.setData({
      items: this.data.items
    });
    let ocal = 0;
    let num = 0;
    // 将已经确定总卡路里和数量求和   为了访问其中每一个元素,采用数组的遍历方法
    this.data.items.forEach(item => {
      ocal += item.cal * item.num;
      num += item.num;
    });
    let orderCount = {
      num,
      ocal
    }
    // 设置显示对应的总数和全部卡路里
    this.setData({
      orderCount
    });
  },
  // 点击确定按钮
  ensure: function () {
    let that = this;
    let str = '您一共选中了' + that.data.orderCount.num + '件食物，一共' + that.data.orderCount.ocal + '千卡，确认要提交吗？'
    let manhealth = (that.data.height * 13.7) + (that.data.weight * 5) - (that.data.age * 6.8) + 66
    this.setData({
      manhealth
    });
    let womanhealth = (that.data.height * 9.6) + (that.data.weight * 1.7) - (that.data.age * 4.7) + 655
    this.setData({
      womanhealth
    });
    wx.showModal({
      title: '温馨提示',
      content: str,
      success: function (res) {
        // 至少选中一种食物才能支付
        console.log(manhealth)
        console.log(womanhealth)
        if (that.data.orderCount.num !== 0) {
          if (res.confirm) {
            // confirm：确定 跳转到总结页面
            //man
            if (that.data.sex == 'man' && that.data.orderCount.ocal > 0 && that.data.orderCount.ocal < that.data.manhealth - 300) {
              wx.redirectTo({
                url: '/pages/low/low'
              });
            }
            else if (that.data.sex == 'man' && that.data.orderCount.ocal > (that.data.manhealth - 300) && that.data.orderCount.ocal < (that.data.manhealth + 300)) {
              wx.redirectTo({
                url: '/pages/mid/mid'
              });
            }
            else if (that.data.sex == 'man' && that.data.orderCount.ocal > (that.data.manhealth + 300)) {
              wx.redirectTo({
                url: '/pages/high/high'
              });
            }
            //woman
            else if (that.data.sex == 'woman' && that.data.orderCount.ocal > 0 && that.data.orderCount.ocal < that.data.womanhealth - 500) {
              wx.redirectTo({
                url: '/pages/low/low'
              });
            }
            else if (that.data.sex == 'woman' && that.data.orderCount.ocal > (that.data.womanhealth - 300) && that.data.orderCount.ocal < (that.data.womanhealth + 300)) {
              wx.redirectTo({
                url: '/pages/mid/mid'
              });
            }
            else if (that.data.sex == 'woman' && that.data.orderCount.ocal > (that.data.womanhealth + 300)) {
              wx.redirectTo({
                url: '/pages/high/high'
              });
            }
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        } else {
          wx.showToast({
            title: '您还没选择任何一种食物呢，快去重新选择吧',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })

    // 调用函数时，传入new Date()参数，返回值是日期
    //需要现在开头引入util/js文件
    let time = util.formatTime(new Date());

    // 再通过setData更改Page()里面的data，动态更新页面的数据
    that.setData({
      time: time
    });
    let ftdata = {
      ocal: this.data.orderCount.ocal,
      time: this.data.time,
    }
    if (time > this.data.oldtime) {
      app.globalData.caldata.splice(app.globalData.i, 1, ftdata);
      app.globalData.i = app.globalData.i + 1;
    }
    else {
      app.globalData.caldata.splice(app.globalData.i, 1, ftdata);
    }

    console.log(app.globalData.i)
    console.log(app.globalData.caldata)
    console.log(this.data)
    wx.setStorage({
      key: 'caldata',
      data: 'caldata',
    })
    wx.setStorage({
      // key作为引用时的依据
      key: "caldata",
      //将subOrder中数据提交
      data: app.globalData.caldata
    });
  },


  //获得index和food数据
  onLoad: function (options) {
    let that = this;
    // 取出food传过来的数据
    wx.getStorage({
      key: 'orders',
      success: function (res) {
        that.setData({
          items: res.data
        });
        // 总卡路里统计汇总
        let ocal = 0;
        let num = res.data.length;
        res.data.forEach(item => {
          ocal += (item.cal * item.num); // 总卡路里求和
        });
        let orderCount = {
          num,
          ocal
        }
        // 设置显示对应的总数和总卡路里
        that.setData({
          orderCount
        });
      }
    })
    //获取index传来的数据
    wx.getStorage({
      key: 'Age',
      success: function (res) {
        that.setData({
          age: res.data
        });
      },
    })
    wx.getStorage({
      key: 'Height',
      success: function (res) {
        that.setData({
          height: res.data
        });
      },
    })
    wx.getStorage({
      key: 'Weight',
      success: function (res) {
        that.setData({
          weight: res.data
        });
      },
    })
    wx.getStorage({
      key: 'Sex',
      success: function (res) {
        that.setData({
          sex: res.data
        });
      },
    })
    wx.getStorage({
      key: 'caldata',
      success: function (res) {
        that.setData({
          caldata: res.data
        });
      },
    })
    wx.getStorage({
      key: 'oldtime',
      success: function (res) {
        that.setData({
          oldtime: res.data
        });
      },
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

  },
  onPullDownRefresh: function () {

    // 用户触发了下拉刷新操作

    // 拉取新数据重新渲染界面

    // wx.stopPullDownRefresh() // 可以停止当前页面的下拉刷新。

  },
  onReachBottom: function () {

    // 当界面的下方距离页面底部距离小于100像素时触发回调

  }
})