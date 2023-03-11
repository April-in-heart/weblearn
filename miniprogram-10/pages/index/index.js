// index.js
// 获取应用实例
const app = getApp()
//生成随机颜色
function getRandomColor(){
  let color=[]
  for(let i=0;i<3;i++){
    //Math.floor去尾，不是四舍五入
    let c=Math.floor(Math.random()*256).toString(16);
    c=c.length==1?'0'+c:c;
    color.push(c);
  }
  //join('')表示将数组元素根据空格合并到一起
  return '#'+color.join('');
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    danmuTxt:'',
    list:[{id:'1001',title:'杨国宜先生口述校史实录',videoUrl:'http://arch.ahnu.edu.cn/__local/6/CB/D1/C2DF3FC847F4CE2ABB67034C595_025F0082_ABD7AE2.mp4?e=.mp4'},{id:'1002',title:'舒华山先生口述校史实录',videoUrl:'https://arch.ahnu.edu.cn/__local/E/2F/3B/9F772666C25304984D615C18374_143C6C4F_747458A.mp4?e=.mp4'},{id:'1003',title:'唐成伦先生口述校史实录',videoUrl:'https://arch.ahnu.edu.cn/__local/E/31/EB/2F368A265E6C842BB6A63EE5F97_425ABEDD_7167F22.mp4?e=.mp4'},{id:'1004',title:'任兴田先生口述校史实录',videoUrl:'https://arch.ahnu.edu.cn/__local/4/E1/C6/3CD65724F5868782B1519CEAF86_5F7F0F43_6D89DE2.mp4?e=.mp4'}],
  },
  playVideo:function(e){
    //暂停正在播放的的视频
    this.videoCtx.stop();
    //更新视频地址
    this.setData({
      src:e.currentTarget.dataset.url
    })
    //播放新的视频
    this.videoCtx.play();
  },
  getDanmu:function(e){
    this.setData({
      danmuTxt:e.detail.value
    })
  },
  sendDanmu:function(){
    //发送弹幕
    this.videoCtx.sendDanmu({
      text:this.data.danmuTxt,
      color:getRandomColor()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //创建视频上下文
    this.videoCtx = wx.createVideoContext('myVideo');
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