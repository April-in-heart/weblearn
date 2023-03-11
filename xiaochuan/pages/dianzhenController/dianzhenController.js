// pages/dianzhenController/dianzhenController.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:"未初始化蓝牙适配器",
    connectedDeviceId:"",
    deviceId:"57C54D96-46F4-4C25-2537-EA64B13AC95D",
    services:"",
    servicesUUID:"0000FFE0-0000-1000-8000-00805F9B34FB",
    serviceId:"",
    notifyCharacteristicsId:"0000FFE1-0000-1000-8000-00805F9B34FB",
    writeCharacteristicsId: "0000FFE3-0000-1000-8000-00805F9B34FB",
    sendmsg:"",
    res:"",

    name:"",
    age:"",
    hand:"",
    hiddenmodalput:true,
    show:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData:['左手','右手'],//下拉列表的数据
    index:0,//选择的下拉列表下标
    hours: '0' + 0,   // 时
    minute: '0' + 0,   // 分
    second: '0' + 0,    // 秒
    flag: 'false',
    strength:"",  //强度
    arr:[], //心率数组
    sugStrength:5,//建议强度
    sugTime:12,//建议时长
  },

 open:function(){
   this.modalinput()
 },


 close:function(){
  var that=this;
  that.setData({
    flag:false
  })
  that.lanyatest13();
  setTimeout(function () {
    that.lanyatest12();
    },500) 

  getApp().globalData.d_name=that.data.name
  getApp().globalData.d_age=that.data.age
  getApp().globalData.d_hand=that.data.hand
  getApp().globalData.d_time=that.data.hours+":"+that.data.minute+":"+that.data.second;
  getApp().globalData.d_arr=that.data.arr
  getApp().globalData.d_strength=that.data.strength

   wx.redirectTo({
     url: '/pages/dianzhenResult/dianzhenResult',
   })

},



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({    
      connectedDeviceId: options.connectedDeviceId 
    })    
  
   
  },

  lanyatest7(event){
    var that = this;
    wx.getBLEDeviceServices({
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
      deviceId: that.data.connectedDeviceId,
      success: function (res) {
        console.log('services UUID:\n', JSON.stringify(res.services));
        for (var i = 0; i < res.services.length; i++) {
          console.log("第"+(i+1) + "个UUID:" + res.services[i].uuid+"\n")
          
 
        }
        that.setData({
          services: res.services,
          info: JSON.stringify(res.services),
        })
      }
    })
 
  },
 
 
 
  lanyatest8(event){
    var that = this;
    var myUUID = that.data.servicesUUID;//具有写、通知属性的服务uuid
    console.log('UUID:' + myUUID)
    console.log('test8 deviceId'+that.data.connectedDeviceId)
    wx.getBLEDeviceCharacteristics({
      // 这里的 deviceId 需要在上面的接口中获取
      deviceId: that.data.connectedDeviceId,
      // 这里的 serviceId 需要在上面的 接口中获取
      serviceId: myUUID,
      success: function (res) {
        console.log("%c getBLEDeviceCharacteristics", "color:red;");
        for (var i = 0; i < res.characteristics.length; i++) {
          console.log('特征值：' + res.characteristics[i].uuid)
 
          if (res.characteristics[i].properties.notify) {
            console.log("notifyServicweId：", myUUID);
            console.log("notifyCharacteristicsId：", res.characteristics[i].uuid);
            that.setData({
              notifyServicweId: myUUID,
            
              notifyCharacteristicsId: "0000FFE1-0000-1000-8000-00805F9B34FB",//手动设置notifyCharacteristicsId为这个UUID，为了方便写死在这里
 
            })
          }
          if (res.characteristics[i].properties.write) {
            console.log("writeServicweId：", myUUID);
            console.log("writeCharacteristicsId：", res.characteristics[i].uuid);
            that.setData({
              writeServicweId: myUUID,
             writeCharacteristicsId: res.characteristics[i].uuid,
        //  writeCharacteristicsId: "0000FFE0-0000-1000-8000-00805F9B34FB",//手动设置writeCharacteristicsId为这个UUID，为了方便写死在这里
            })
 
          }
 
        }
        console.log('device getBLEDeviceCharacteristics:', res.characteristics);
 
        that.setData({
          msg: JSON.stringify(res.characteristics),
        })
      },
      fail: function (res) {
        console.log(res);
      },
 
    })
 
  },
 
  
 
  //必须先启用notifyCharacteristicsId才能监听characteristicValueChange事件
  lanyatest9(event){
    var that = this;
    var notifyServicweId = that.data.servicesUUID;  //具有写、通知属性的服务uuid
    var notifyCharacteristicsId = that.data.notifyCharacteristicsId;
    console.log("启用notify的serviceId", notifyServicweId);
    console.log("启用notify的notifyCharacteristicsId", notifyCharacteristicsId);
 
    wx.notifyBLECharacteristicValueChange({
      state: true, // 启用 notify 功能
      deviceId: that.data.connectedDeviceId,
      // 这里的 serviceId 就是that.data.servicesUUID
      serviceId: notifyServicweId,
 
      characteristicId: that.data.notifyCharacteristicsId,
      success: function (res) {
        //console.log('notifyBLECharacteristicValueChange success', res.errMsg)
        //var msg = '启动notify:' + res.errMsg
        that.setData({
          info: "开启notify成功"
        })
      },
      fail: function (res) {
        console.log('启动notify:' + res.errMsg);
        
      },
    })
 
 
  },
 
  
 
 
 
 
 
  lanyatest10(event){
    var that = this;
    console.log("开始接收数据");
 
    wx.onBLECharacteristicValueChange(function (res) {
      
      console.log("characteristicId：" + res.characteristicId)
      console.log("serviceId:" + res.serviceId)
      console.log("deviceId" + res.deviceId)
      console.log("Length:" + res.value.byteLength)
      console.log("hexvalue:" + that.ab2hex(res.value))
      console.log("str:" +that.getUint8Value(res.value))
      that.addArr(that.getUint8Value(res.value))
 
    })
 
  },
 
 
 
 
  lanyatest11(event){
    var that=this;
    let _this = this

 let buffer = new ArrayBuffer(9)

    let dataView = new DataView(buffer)
    //31
    dataView.setUint8(0,49)
    //20
    dataView.setUint8(1,32)
    //31
    dataView.setUint8(2,49)
    //30
    dataView.setUint8(3,48)
    //20
    dataView.setUint8(4,32)
    //31
    dataView.setUint8(5,49)
    //30
    dataView.setUint8(6,48)
    //回车
    //0D
   dataView.setUint8(7,13)
    //0A
   dataView.setUint8(8,10)
    console.log(dataView);
    console.log(buffer);

wx.writeBLECharacteristicValue({
  deviceId: that.data.connectedDeviceId,  
  serviceId: that.data.servicesUUID,
  characteristicId: that.data.writeCharacteristicsId,
  value: buffer,
  success(res) {
    console.log('写入数据成功', res.errMsg)

  },
  fail(err) {
    console.log('err', err)
  },
  
})
 
  },
 

  lanyatest12(event){
    var that = this;
    wx.closeBLEConnection({
      deviceId: that.data.connectedDeviceId,
      success: function (res) {
        that.setData({
          connectedDeviceId: "",
        })
        console.log('断开蓝牙设备成功：' + res.errMsg)
      },
      fail:function(res){
        console.log('断开蓝牙设备失败：' + res.errMsg)
      }
    })
 
  },

   //发送 0 关闭电针
   lanyatest13(event){
    var that=this;
    let _this = this

 let buffer = new ArrayBuffer(3)

    let dataView = new DataView(buffer)
    //30
    dataView.setUint8(0,48)
  
    //回车
    //0D
   dataView.setUint8(1,13)
    //0A
   dataView.setUint8(2,10)
    console.log(dataView);
    console.log(buffer);

wx.writeBLECharacteristicValue({
  deviceId: that.data.connectedDeviceId,  
  serviceId: that.data.servicesUUID,
  characteristicId: that.data.writeCharacteristicsId,
  value: buffer,
  success(res) {
    console.log('关闭电针成功', res.errMsg)

  },
  fail(err) {
    console.log('err', err)
  },
  
})
 
  },


 
  confirm: function(){ 
    var that=this;
   var  index=this.data.index
    this.setData({ 
      hiddenmodalput: true 
    })
    this.setData({
      hand:that.data.selectData[index]
    })
    var that=this;
      if(this.data.name==""||this.data.age==""||this.data.hand=="")
       {
         wx.showModal({
          title: '提示',
          content: '信息不能为空', 
         })
       }else{
    //TODO:开启电针
    this.lanyatest7();
    setTimeout(function () {
     that.lanyatest8()
      },200) 

      setTimeout(function () {
        that.lanyatest9()
         },800) 
      
    
 
  
    
    //写入数据 1 10 10
    setTimeout(function () {
      that.lanyatest11()
      },1500) 
   //开启接收数据
      setTimeout(function () {
        that.lanyatest10()
        },3000) 
    //开启计时
    that.setInterval();



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
        age:e.detail.value
      })   
    },

    input3:function(e){
      this.setData({
        strength:e.detail.value
      })   
    },

    modalinput:function(){ 
      this.setData({ 
        hiddenmodalput: !this.data.hiddenmodalput
      })
    },

     // 点击下拉显示框
 selectTap(){
  this.setData({
   show: !this.data.show
  });
  },
  // 点击下拉列表
  optionTap(e){
  let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
  this.setData({
   index:Index,
   show:!this.data.show,
  
  });
  },

// 计时器
setInterval: function () {
  const that = this
  var second = '0'+0
  var minute = '0'+0
  var hours = '0'+0   
  that.setData({
    flag:true
  })   
  setInterval(function () {  // 设置定时器
  if(that.data.flag==true){
    second++
    if (second >= 60) {
        second = 0  //  大于等于60秒归零
        minute++
        if (minute >= 60) {
            minute = 0  //  大于等于60分归零
            hours++
            if (hours < 10) {
                // 少于10补零
                that.setData({
                    hours: '0' + hours
                })
            } else {
                that.setData({
                    hours: hours
                })
            }
        }
        if (minute < 10) {
            // 少于10补零
            that.setData({
                minute: '0' + minute
            })
        } else {
            that.setData({
                minute: minute
            })
        }
    }
    if (second < 10) {
        // 少于10补零
        that.setData({
            second: '0' + second
        })
    } else {
        that.setData({
            second: second
        })
    }
  }
    
  }, 1000)
},
  

ab2hex:function(buffer) {
  let hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function(bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
},

getUint8Value(e) {
  for (var a = e, i = new DataView(a), n = "", s = 0; s < i.byteLength-2; s++) n += String.fromCharCode(i.getUint8(s));
 return n;
},

addArr(e) {
  var that = this;
    that.data.arr.push(e)
  console.log("arr-> ", that.data.arr);
}


  
})