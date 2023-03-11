// pages/lanyatest/lanyatest.js
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
    notifyCharacteristicsId:"",
    writeCharacteristicsId: "",
    sendmsg:"",
    res:"",
    
  },
 
  onLoad:function(){
  
   
  },

 search: function() {
   this.lanyatest1();
   this.lanyatest3();
   this.lanyatest4();
 },

  lanyatest1(event){
    var that = this;
    console.log("test1")
    wx.openBluetoothAdapter({
      success: function (res) {
        console.log('初始化蓝牙适配器成功')
        //页面日志显示
        that.setData({
          info: '初始化蓝牙适配器成功'
        })
      },
      fail: function (res) {
        console.log('请打开蓝牙和定位功能')
        that.setData({
          info: '请打开蓝牙和定位功能'
        })
      }
    })
  },
 
 
 

 
 
 
  lanyatest3(event){
    console.log("test3");
    var that = this;
    wx.startBluetoothDevicesDiscovery({
 //    services: ['0000FF00-0000-1000-8000-00805F9B34FB'], //如果填写了此UUID，那么只会搜索出含有这个UUID的设备，建议一开始先不填写或者注释掉这一句
   
      success: function (res) {
        that.setData({
          info: "搜索设备" + JSON.stringify(res),
        })
        console.log('搜索设备返回' + JSON.stringify(res))
 
      }
    })
 
  },
 
 
 
 
  lanyatest4(event){
    console.log("Test4")
    var that = this;
    wx.getBluetoothDevices({
      success: function (res) {
 
        that.setData({
          info: "设备列表\n" + JSON.stringify(res.devices),
          devices: res.devices
        })
        console.log('搜设备数目：' + res.devices.length)
        console.log('设备信息：\n' + JSON.stringify(res.devices)+"\n")
      }
    })
 
  },
 
 
 
  lanyaconnect(event){
    var that = this;
    wx.createBLEConnection({
      deviceId: event.currentTarget.id,
      success: function (res) {
        console.log('调试信息：' + res.errMsg);
        that.setData({
          connectedDeviceId: event.currentTarget.id,
          info: "MAC地址：" + event.currentTarget.id  + '  调试信息：' + res.errMsg,
          
        })
       wx.navigateTo({
         url: '/pages/dianzhenController/dianzhenController?connectedDeviceId='+event.currentTarget.id,
       })

      },
      fail: function () {
        console.log("连接失败");
      },
 
    })
 
  },
 
 
  lanyatest6(event){
    var that = this;
    wx.stopBluetoothDevicesDiscovery({
      success: function (res) {
        console.log("停止搜索" + JSON.stringify(res.errMsg));
        that.setData({
          info: "停止搜索"  + JSON.stringify(res.errMsg),
        })
      }
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
           //   writeCharacteristicsId: "0000FEE7-0000-1000-8000-00805F9B34FB",//手动设置writeCharacteristicsId为这个UUID，为了方便写死在这里
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
      console.log("hexvalue:" + ab2hex(res.value))
      that.setData({
        info: that.data.info + ab2hex(res.value)
      })
 
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
 
 

 
})
 
