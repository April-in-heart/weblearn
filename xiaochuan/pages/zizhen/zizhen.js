// pages/zizhen/zizhen.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    manChoose:false,
    img:"./man.png",
    sex:"男",
    age:"",
    selectorItems:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'
  ,'31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60',
  '61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80'],
  image1:"",
  image2:"",
  image3:"",
  name:"",
  phone:"",
  hiddenmodalput:true,
  },
  /**
   * 自定义函数--选择年龄
   */
  selectorChange: function (e) {
    let i = e.detail.value;//获得选项的数组下标
    let valueAge = this.data.selectorItems[i];//获得选项的值
    this.setData({selector:valueAge,});//将选项名称更新到WXML页面上

    this.setData({age:valueAge})
    console.log("年龄："+valueAge)
  },
  /**
   * 自定义函数--选择性别和性别对应的图片
   */
  choose:function(){
    let value=this.data.manChoose;
    if(value==true)
    {
      this.setData({
        img:"./man.png",
        sex:"男",
        manChoose:false
      })
    }
    else{
      this.setData({
        img:"./woman.png",
        sex:"女",
        manChoose:true
      })
    }
    let valuesex=this.data.sex;
    console.log("性别："+valuesex)
  },
  /**
   * 自定义函数--点击”望"显示底部弹出框
   */
  clickme: function () {
    this.showModal();
  },
  /**
   * 自定义函数--点击显示弹窗
   */
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

   /**
   * 自定义函数--点击空白处隐藏弹窗
   */
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
   /**
   * 自定义函数--舌相照片
   */
  shexiangPhoto:function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {

        wx.showToast({
          title: '正在上传中',
          icon: 'loading',
          duration: 1500
        })

        var tempFilePaths = res.tempFilePaths
        wx.setStorageSync('tempFilePaths', res.tempFilePaths)
          that.setData({
            image1:"",
            sourcess: res.tempFilePaths  //这个用于展示添加的图片，并非服务器图片地址
          })
          
          
          var tempFilePaths = wx.getStorageSync('tempFilePaths')
            
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[0], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              console.log('data:image/png;base64,' + res.data)
              that.setData({
                image1:'data:image/png;base64,' + res.data,
              })
            }
          })
        }
      
      })
       

         
  },
  xingtiPhoto: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {

        wx.showToast({
          title: '正在上传中',
          icon: 'loading',
          duration: 1500
        })

        var tempFilePaths = res.tempFilePaths
        wx.setStorageSync('tempFilePaths', res.tempFilePaths)
          that.setData({
            image2:"",
            sourcess: res.tempFilePaths  //这个用于展示添加的图片，并非服务器图片地址
          })
          
          
          var tempFilePaths = wx.getStorageSync('tempFilePaths')
            
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[0], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              console.log('data:image/png;base64,' + res.data)
              that.setData({
                image2:'data:image/png;base64,' + res.data,
              })
            }
          })
        }
      
      })
  },

  mianxiangPhoto: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {

        wx.showToast({
          title: '正在上传中',
          icon: 'loading',
          duration: 1500
        })

        var tempFilePaths = res.tempFilePaths
        wx.setStorageSync('tempFilePaths', res.tempFilePaths)
          that.setData({
            image3:"",
            sourcess: res.tempFilePaths  //这个用于展示添加的图片，并非服务器图片地址
          })
          
          
          var tempFilePaths = wx.getStorageSync('tempFilePaths')
            
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[0], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              console.log('data:image/png;base64,' + res.data)
              that.setData({
                image3:'data:image/png;base64,' + res.data,
              })
            }
          })
        }
      
      })
  },

  confirm: function(){ 
    this.setData({ 
      hiddenmodalput: true 
    })
    var that=this;
      if(this.data.name==""||this.data.phone=="")
       {
         wx.showModal({
          title: '提示',
          content: '姓名或手机号不能为空', 
         })
       }
       else{
       
         
         wx.request({
           url: 'http://localhost:8080/checkBySelf',
           method:"POST",
           data:{
             name:that.data.name,
             phone:that.data.phone,
             age:that.data.age,
             image1:that.data.image1,
             image2:that.data.image2,
             image3:that.data.image3,
             gender:that.data.sex,
             token:getApp().globalData.token,
             sound:getApp().globalData.sound,
             qie:getApp().globalData.qie,
             mainum:getApp().globalData.mainum,
             wen:getApp().globalData.wen,
           },
           header: {
            'content-type': 'application/json'
          },
           success:function(result){
              
              wx.redirectTo({
                url: '/pages/result/result',
              })
           
           }
          
          
          
       })
      }
    },
    cancel: function(){ 
      this.setData({ 
        hiddenmodalput: true
       }); 
    },
    input:function(e){
  
      this.setData({
        name:e.detail.value
      })
     
    },

    input2:function(e){
      this.setData({
        phone:e.detail.value
      })   
    },

    modalinput:function(){ 
      this.setData({ 
        hiddenmodalput: !this.data.hiddenmodalput
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().globalData.sound=""
    getApp().globalData.wen=""
    getApp().globalData.qie=""
    getApp().globalData.mainum=""
  },


  checkHistory:function(){
    wx.navigateTo({
      url: '/pages/checkHistory/checkHistory',
    })

  }

})