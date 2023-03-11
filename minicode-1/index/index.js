const app = getApp()

Page({
  data: {
    user_data: 2
  },
  onLoad() {
    // this.setData({
    //   user_data: 3
    // }, () => {
    //   console.log(this.data.user_data)
    // })
    this.setData({
      user_data: 3
    })
    console.log(this.data.user_data)
  },
})
