// pages/game/game.js

var num = [['00','01','02'],['10','11','12'],['20','21','22']]
var w=100
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isWin:false
  },

  restartGame(){
    this.setData({isWin:false})
    this.shuffle();
    this.drawCanvas();
  },

  isWin(){
    for(let i=0;i<3;i++){
      for(let j=0;j<3;j++){
        //如果有方块位置不对
        if(num[i][j]!=i*10+j){
          return false;
        }
      }
    }
    //游戏成功，更新状态
    this.setData({
      isWin:true
    })
    return true;
  },

  touchBox(e){

    //如果游戏成功则结束
    if(this.data.isWin){
      return;//终止本段函数
    }

    //console.log(e.changedTouches[0].x)
    var x=e.changedTouches[0].x
    var y=e.changedTouches[0].y
    var row=parseInt(y/w);
    var col=parseInt(x/w);
    //若点击的不是空白区域才移动方块
    if(num[row][col]!='22'){
      this.moveBox(row,col);
      this.drawCanvas();
      //判断游戏是否成功
      if(this.isWin()){
        //在画面上绘制提示语句
        let ctx=this.ctx;
        ctx.drawImage(this.data.level,0,0)
        ctx.setFillStyle('#e64340')//文字颜色
        ctx.setTextAlign('center')//文字位置
        ctx.setFontSize(60)
        ctx.fillText('游戏成功',150,150)
        ctx.draw();
      }
    }
  },

  // 移动被点击的方块
  moveBox(i,j){
    // 不在最上方才能上移
    if(i>0){
      // 如果上方为空白
      if(num[i-1][j]=='22'){
        num[i-1][j]=num[i][j]
        num[i][j]='22'
        return
      }
    }
    // 下移
    if(i<2){
      // 如果上方为空白
      if(num[i+1][j]=='22'){
        num[i+1][j]=num[i][j]
        num[i][j]='22'
        return
      }
    }
    // 左
    if(j>0){
      // 如果上方为空白
      if(num[i][j-1]=='22'){
        num[i][j-1]=num[i][j]
        num[i][j]='22'
        return
      }
    }
    // 右
    if(j<2){
      // 如果上方为空白
      if(num[i][j+1]=='22'){
        num[i][j+1]=num[i][j]
        num[i][j]='22'
        return
      }
    }
  },

  shuffle(){
    num = [['00','01','02'],['10','11','12'],['20','21','22']];
    // 记录空白方块行列
    var row=2,col=2;
    // 随机打乱方块顺序
    for(var i=0;i<100;i++){
      // 方向 上0下1左2右3 round四舍五入
      var direction=Math.round(Math.random()*3)
      //console.log(direction)
      if(direction==0){
        // 空白方块不能在最上面一行
        if(row!=0){
          // 交换位置
          num[row][col]=num[row-1][col]
          num[row-1][col]='22'
          row-=1;
        }
      }
      if(direction==1){
        if(row!=2){
          // 交换位置
          num[row][col]=num[row+1][col]
          num[row+1][col]='22'
          row+=1;
        }
      }
      if(direction==2){
        if(col!=0){
          // 交换位置
          num[row][col]=num[row][col-1]
          num[row][col-1]='22'
          col-=1;
        }
      }
      if(direction==3){
        if(col!=2){
          // 交换位置
          num[row][col]=num[row][col+1]
          num[row][col+1]='22'
          col+=1;
        }
      }
    }
  },

  drawCanvas(){
    let ctx=this.ctx;
    // 清空画布
    ctx.clearRect(0,0,300,300)
    // 双重for循环绘图
    for(let i=0;i<3;i++){
      for(let j=0;j<3;j++){
        if(num[i][j]!='22'){
          // 获取行和列
          var row=parseInt(num[i][j]/10)
          var col=parseInt(num[i][j]%10)
          // 绘制方块
          ctx.drawImage(this.data.level,col*w,row*w,w,w,j*w,i*w,w,w)
        }
      }
    }
    ctx.draw()// 调用后才画
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.level)
    this.setData({
      level:options.level
    })
    this.ctx=wx.createCanvasContext('myCanvas')
    this.shuffle();
    this.drawCanvas();
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