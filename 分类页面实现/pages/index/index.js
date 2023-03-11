//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

    },
    //添加
  res: function(e) {
    //初始化，小程序调用函数前必须要要先调用初始化
    wx.cloud.init()
    const db = wx.cloud.database()
    // 2. 构造查询语句
    // collection 方法获取一个集合的引用
    // where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等），具体见文档查看支持列表
    // get 方法会触发网络请求，往数据库取数据
    db.collection('books').where({
    publishInfo: {
    country: 'United States'
      }
    }).get({
    success: function(res) {
    // 输出 [{ "title": "The Catcher in the Rye", ... }]
    console.log(res)
  }
})

  },



})