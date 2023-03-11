//food.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    /* 首先显示第一个分类 */
    //先在data中设置一个变量，下面的事件通过改变变量的值，让给其他事件也能使用这个变量tabindex
    tabIndex: 0,
    // 统计食物数量num和总卡路里ocal
    orderCount: {
      ocal: 0,
      num: 0
    },
    items:[],
    subOrders: [],
    //用于判断下方栏是否显示
    bottomFlag: false,
    // 提交的数据
    orders: true,
    //判断有多少个左元素
    leftchild:10,
    leftitems: [{
      left_id: 1,
      left_name: "谷物/100g",
      ishaveright: true,
      rightchild:6,
      right: [{
        right_id: 1,
        right_name: "米饭",
        cal: 109,
        image: "../images/food.png",
        //active用于判断添加按钮是否改变状态
        active: false,
        num: 1
      },
      {
        right_id: 2,
        right_name: "白粥",
        cal: 50,
        image: "../images/food.png",
        active: false,
        num: 1
      },
      {
        right_id: 3,
        right_name: "小米粥",
        cal: 46,
        image: "../images/food.png",
        active: false,
        num: 1
      },
      {
        right_id: 4,
        right_name: "拉面",
        cal: 180,
        image: "../images/food.png",
        active: false,
        num: 1
      },
      {
        right_id: 5,
        right_name: "麦片",
        cal: 365,
        image: "../images/food.png",
        active: false,
        num: 1
      },
      {
        right_id: 6,
        right_name: "米粉",
        cal: 120,
        image: "../images/food.png",
        active: false,
        num: 1
      },
      ]
    },
    {
      left_id: 2,
      left_name: "肉类/100g",
      ishaveright: true,
      rightchild: 3,
      right: [{
        right_id: 7,
        right_name: "猪肉",
        cal: 235,
        image: "../images/food2.jpg",
        active: false,
        num: 1
      },
      {
        right_id: 8,
        right_name: "牛肉",
        cal: 179,
        image: "../images/food2.jpg",
        active: false,
        num: 1
      },
      {
        right_id: 9,
        right_name: "羊肉",
        cal: 252,
        image: "../images/food2.jpg",
        active: false,
        num: 1
      },
      ]
    },
    {
      left_id: 3,
      left_name: "蛋类/100g",
      ishaveright: true,
      rightchild: 1,
      right: [{
        right_id: 10,
        right_name: "鸡蛋(白皮)",
        cal: 138,
        image: "../images/food2.jpg",
        active: false,
        num: 1
      },
      ]
    },
    {
      left_id: 4,
      left_name: "乳制品/100g",
      ishaveright: true,
      rightchild: 1,
      right: [{
        right_id: 11,
        right_name: "猪肉",
        cal: 235,
        image: "../images/food2.jpg",
        active: false,
        num: 1
      },
      ]
    },
    {
      left_id: 5,
      left_name: "运动/100g",
      ishaveright: true,
      rightchild: 1,
      right: [{
        right_id: 12,
        right_name: "慢跑、小时",
        cal: -655,
        image: "../images/manpao.jpg",
        active: false,
        num: 1
      },
      ]
    },
    {
      left_id: 6,
      left_name: "乳制品/100g",
      ishaveright: true,
      rightchild: 1,
      right: [{
        right_id: 13,
        right_name: "猪肉",
        cal: 235,
        image: "../images/food2.jpg",
        active: false,
        num: 1
      },
      ]
    },
    {
      left_id: 7,
      left_name: "乳制品/100g",
      ishaveright: true,
      rightchild: 1,
      right: [{
        right_id: 14,
        right_name: "猪肉",
        cal: 235,
        image: "../images/food2.jpg",
        active: false,
        num: 1
      },
      ]
    },
    {
      left_id: 8,
      left_name: "乳制品/100g",
      ishaveright: true,
      rightchild: 1,
      right: [{
        right_id: 15,
        right_name: "猪肉",
        cal: 235,
        image: "../images/food2.jpg",
        active: false,
        num: 1
      },
      ]
    },
    {
      left_id: 9,
      left_name: "乳制品/100g",
      ishaveright: true,
      rightchild: 1,
      right: [{
        right_id: 16,
        right_name: "猪肉",
        cal: 235,
        image: "../images/food2.jpg",
        active: false,
        num: 1
      },
      ]
    },
    {
      left_id: 10,
      left_name: "乳制品/100g",
      ishaveright: true,
      rightchild: 1,
      right: [{
        right_id: 17,
        right_name: "猪肉",
        cal: 235,
        image: "../images/food2.jpg",
        active: false,
        num: 1
      },
      ]
    },
    ],
  },


  //下方栏点击提交触发事件
  submit: function (event) {
    let subOrders = this.data.subOrders; // 将选择的数据存储
    for(var i=0;i<this.data.leftchild;i++){
      for(var j=0;j<this.data.leftitems[i].rightchild;j++){
        if(this.data.leftitems[i].right[j].active===true)
          subOrders.push(this.data.leftitems[i].right[j])
      }
    }
    this.setData({
      subOrders
    })
    console.log(subOrders);
    // 将选中的食物存储在本地，可以在其他页面onload中用wx.getStorage获取数据
    wx.setStorage({
      // key作为引用时的依据
      key: "orders",
      //将subOrder中数据提交
      data: subOrders
    });


    // 判断是否有选中菜品
    if (this.data.orderCount.num !== 0) {
      // 跳转到选择菜单
      wx.redirectTo({
        url: '../order/order'
      });
    } else {
      wx.showToast({
        title: '您未选中任何食物',
        icon: 'none',
        duration: 2000
      })
    }
  },


  //存放左侧菜单数据，用于右边菜单生成
  tabMenu: function (event) {
    let that = this
    //用index来存放index下标的值
    let index = event.target.dataset.index;
    //this.setdata更新数据信息
    this.setData({
      tabIndex: index
    });
    console.log("left" + this.data.tabIndex)
    // console.log(this.data.leftitems[this.data.tabIndex].right)
    // this.setData({
    //   //将数组right的数据赋给items
    //   items: this.data.leftitems[this.data.tabIndex].right
    // });
  },


  /* 添加按钮触发事件 */
  addOrder: function (event) {
    let that = this;
    let tabIndex = this.data.tabIndex;
    console.log("left" + tabIndex)
    /* 取右边id */
    let id = event.target.dataset.id;
    /* 取右边下标 */
    let index = event.target.dataset.index;
    let param = this.data.leftitems[tabIndex].right[index];
    // let subOrders = this.data.subOrders; // 将选择的数据存储
    // 改变添加按钮的状态
    param.active ? param.active = false : param.active = true;
    //splice() 方法向/从数组(right)中添加/删除项目，然后返回被删除的项目.
    //index:必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
    //1:必需。要删除的项目数量。如果设置为 0，则不会删除项目。
    //param:可选。向数组添加的新项目。
    //返回值：array，包含被添加项目的新数组，如果有的话。
    // console.log(this.data.leftitems[tabIndex].right[index])
    // this.data.leftitems[tabIndex].right.splice(index, 1, param);
    // //更新右边数据  注意，items也是数组
    // this.setData({
    //   //将数组right的数据赋给items
    //   items: this.data.leftitems[tabIndex].right
    // });
    // console.log(subOrders)
    // // 将已经确定的菜单添加到购物单列表
    // if (this.data.leftitems[tabIndex].right[index].active) {
    //   subOrders.push(this.data.leftitems[tabIndex].right[index]);//如果this.data.items的active为true,将其存入suborder中
    //     // item.active=false;
    // }
    // else{
    //   subOrders.splice(event.currentTarget.dataset.index,1)
    // }

    // // 改变cal和num的值
    // let ocal = 0;
    // let num = subOrders.length;
    // subOrders.forEach(item => {
    //   ocal += item.cal; // 总cal求和,item为数组suborder里的每一个元素
    // });
    if (this.data.leftitems[tabIndex].right[index].active){
      this.data.orderCount.ocal += this.data.leftitems[tabIndex].right[index].cal;
      this.data.orderCount.num +=1;
    }
    else if (this.data.orderCount.num>=1){
      this.data.orderCount.ocal -= this.data.leftitems[tabIndex].right[index].cal;
      this.data.orderCount.num -= 1;
    }
    // 设置显示对应的总数和ocal
    this.setData({
      orderCount: this.data.orderCount
    });
    // 判断底部提交菜单显示隐藏
    if (this.data.orderCount.num == 0) {
      this.setData({
        bottomFlag: false
      });
    } else {
      this.setData({
        bottomFlag: true
      });
    }

    // // 将选中的食物存储在本地，可以在其他页面onload中用wx.getStorage获取数据
    // wx.setStorage({
    //   // key作为引用时的依据
    //   key: "orders",
    //   //将subOrder中数据提交
    //   data: subOrders
    // });
    //需要现在开头引入util/js文件
    let time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    that.setData({
      time: time
    });
    wx.setStorage({
      // key作为引用时的依据
      key: "oldtime",
      //将subOrder中数据提交
      data: this.data.time
    });
  },

// //加减方法
//   del: function (event) {
//     let that = this;
//     let items = this.data.items;
//     let id = event.target.dataset.id;
//     let tabIndex = this.data.tabIndex;
//     let index = event.target.dataset.index;
//     let param = this.data.leftitems[tabIndex].right[index];
//     if (param.num > 0) {
//       param.num--; // 每点一次减少1
//     } else {
//       param.num = 0; // 最低为0
//     }
//     // 改变添加按钮的状态
//     this.data.items.splice(index, 1, param);
//     that.setData({
//       items: this.data.items
//     });
//     //判断底部提交菜单显示隐藏
//     if (items.length == 0) {
//       this.setData({
//         bottomFlag: false
//       });
//     } else {
//       this.setData({
//         bottomFlag: true
//       });
//     }

//     //改变cal和num的值
//     let ocal = 0;
//     let num = items.length;
//     items.forEach(item => {
//       ocal += item.cal; // 总cal求和,item为数组suborder里的每一个元素
//     });
//     let orderCount = {
//       ocal,
//       num
//     }
//     // 设置显示对应的总数和ocal
//     this.setData({
//       orderCount
//     });
//     console.log(orderCount)
//     // 将选中的食物存储在本地，可以在其他页面onload中用wx.getStorage获取数据
//     wx.setStorage({
//       // key作为引用时的依据
//       key: "items",
//       //将subOrder中数据提交
//       data: items
//     });
//   },
//   // 点击对应菜单加按钮
//   add: function (event) {
//     let that = this;
//     let items = this.data.items;
//     let id = event.target.dataset.id;
//     let tabIndex = this.data.tabIndex;
//     let index = event.target.dataset.index;
//     let param = this.data.leftitems[tabIndex].right[index];
//     param.num++; // 每点一次增加1
//     // 改变添加按钮的状态
//     //splice() 方法向/从数组(subOrder)中添加/删除项目，然后返回被删除的项目.
//     //index:必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
//     //1:必需。要删除的项目数量。如果设置为 0，则不会删除项目。
//     //param:可选。向数组添加的新项目。
//     //返回值：array，包含被删除项目的新数组，如果有的话。
//     this.data.items.splice(index, 1, param);
//     //更新数据
//     that.setData({
//       items: this.data.items
//     });
//     //判断底部提交菜单显示隐藏
//     if (items.length == 0) {
//       this.setData({
//         bottomFlag: false
//       });
//     } else {
//       this.setData({
//         bottomFlag: true
//       });
//     }

//     //改变cal和num的值
//     let ocal = 0;
//     let num = items.length;
//     items.forEach(item => {
//       ocal += item.cal; // 总cal求和,item为数组suborder里的每一个元素
//     });
//     let orderCount = {
//       ocal,
//       num
//     }
//     // 设置显示对应的总数和ocal
//     this.setData({
//       orderCount
//     });
//     console.log(orderCount)
//     // 将选中的食物存储在本地，可以在其他页面onload中用wx.getStorage获取数据
//     wx.setStorage({
//       // key作为引用时的依据
//       key: "items",
//       //将subOrder中数据提交
//       data: items
//     });
//   },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // console.log("onLoad")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log("onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log("onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log("onHide")
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