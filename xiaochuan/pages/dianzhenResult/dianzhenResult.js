// pages/dianzhenResult/dianzhenResult.js
import * as echarts from '../../ec-canvas/echarts';
let chartLine;
var data_cur = [];//每分钟的心率数
Page({

  /**
   * 页面的初始数据
   */
  data: {
     name:"",
     age:"",
     hand:"",
     strength:"",
     arr:[],
     time:"",
     ecLine: {
      onInit: function (canvas, width, height) {
        //初始化echarts元素
        chartLine = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chartLine);
        var xData = []; // x轴数据 设为空
       

        var option = getOption(xData, data_cur);
        chartLine.setOption(option);
      }
    },
    start:'00:00:00',
    end:'00:00:00',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name:getApp().globalData.d_name,
      age:getApp().globalData.d_age,
      hand:getApp().globalData.d_hand,
      strength:getApp().globalData.d_strength,
      arr:getApp().globalData.d_arr,
      time:getApp().globalData.d_time,
      end:getApp().globalData.d_time
    })

    
    data_cur=this.data.arr;
   
    if(data_cur.length==0){
      setTimeout(() => {
        wx.showToast({
          title: '无心率数据',
          icon:'none'
        })
      }, 1000);
  
    }


   wx.request({
     url: 'http://10.211.240.23:8080/dianzhenSave',
     method:"POST",
     data:{
      name:getApp().globalData.d_name,
      token:getApp().globalData.token,
      age:getApp().globalData.d_age,
      position:getApp().globalData.d_hand,
      strength:getApp().globalData.d_strength,
      arr:getApp().globalData.d_arr,
      time:getApp().globalData.d_time

     },
     header: {
      'content-type': 'application/json'
    },
    success:function(){
      console.log("保存成功")
    },
    fail:function(e){
      console.log("保存失败"+e)
    }
    
   })

  },

  
})

function getOption(xData, data_cur) {
  var option = {
    backgroundColor: "#fff",
    color: ["#2089dc", "#f2960d", "#67E0E3", "#9FE6B8"],
    title: {
      text: '心率',
      textStyle: {
        fontWeight: '500',
        fontSize: 15,
        color: '#000'
      },
      x: 'center',
      y: '0'
    },

    grid: {
      top: '15%',
      left: '1%',
      right: '3%',
      bottom: '2rpx',
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xData || [],
      axisLine:{
        lineStyle:{
          color:"#2089dc"
        }
      },
      axisLabel: {
        interval: 100000,
        showMinLabel: true,
        showMaxLabel: true,
        
        formatter: function (value, index) {
          return value.substring(0, 2) * 1;
        },
        textStyle: {
          fontsize: '10px'
        },
        
      }
    },
    yAxis: {
      x: 'center',
      name: '脉搏间隔(ms)',
      type: 'value',
      min: 0,
      max:1000,
      axisLine:{
        lineStyle:{
          color:"#2089dc"
        }
      }
    },
    series: [{
      name: '单位毫秒',
      zIndex: 2,
      type: 'line',
      smooth: true,
      symbolSize: 0,
      data: data_cur || []
    }]
  };
  return option;
}