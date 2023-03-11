// pages/index2/index2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:false,//下方按钮
    tabindex:0,//题目下标
    answ_index:0,//答案下标
    isshow:true,
    sum:0,//总分数
    //体质分数
    pinghe:0,
    qixu:0,
    yangxu:0,
    yinxu:0,
    tanshi:0,
    shire:0,
    xueyu:0,
    qiyu:0,
    tebing:0,

    list:[{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},{tabindex:null,answ_index:null,score:0},],//存储各个题目分数
    submit:0,//已提交题数
    top_text:"请根据您的真实体验和感觉回答以下问题。",
    question:[
      {index:0,text:'1.您精力充沛吗？',show:true},{index:1,text:'2.您容易疲乏吗？',show:false},{index:2,text:'3.您容易气短（呼吸急促，接不上气）吗?',show:false},{index:3,text:'4.您容易心慌吗?',show:false},{index:4,text:'5.您容易头晕或站起时晕眩吗?',show:false},{index:5,text:'6.您喜欢安静、懒得说话吗?',show:false},{index:6,text:'7.您说话声音低弱无力吗?',show:false},{index:7,text:'8.您感到闷闷不乐，情绪低沉吗?',show:false},{index:8,text:'9.您容易精神紧张，焦虑不安吗?',show:false},{index:9,text:'10.您多愁善感，感情脆弱吗?',show:false},{index:10,text:'11.您容易感到害怕或受到惊吓吗?',show:false},{index:11,text:'12.您胁肋部或乳房胀痛吗?',show:false},{index:12,text:'13.您感到胸闷或腹部胀满吗?',show:false},{index:13,text:'14.您无缘无故叹气吗?',show:false},{index:14,text:'15.您感到身体沉重不轻松或不爽快吗?',show:false},{index:15,text:'16.您感到手脚心发热吗?',show:false},{index:16,text:'17.您手脚发凉吗?',show:false},{index:17,text:'18.您胃脘部，背部或腰膝部怕冷吗?',show:false},{index:18,text:'19.您感到怕冷，衣服比别人穿得多吗?',show:false},{index:19,text:'20.您感觉身体，脸上发热吗?',show:false},{index:20,text:'21.您您比一般人耐受不了寒冷（冬天的寒冷，夏天的冷空调，电扇等）吗?',show:false},{index:21,text:'22.您比别人容易感冒吗?',show:false},{index:22,text:'23.您没有感冒也会打喷嚏吗?',show:false},{index:23,text:'24.您没有感冒也会鼻塞，流鼻涕吗?',show:false},{index:24,text:'25.您有因季节变化，温度变化或一位等原因而咳喘的现象吗?',show:false},{index:25,text:'26.您活动量稍大就容易出虚汗吗?',show:false},{index:26,text:'27.您容易忘事（健忘）吗?',show:false},{index:27,text:'28.您有额部油脂分泌多的现象吗?',show:false},{index:28,text:'29.您口唇的颜色比一般人红吗?',show:false},{index:29,text:'30.您容易过敏（药物，食物，气味，花粉，季节交替时，气候变化等）吗?',show:false},{index:30,text:'31.您的皮肤起荨麻疹（风团，风疹块，风疙瘩）吗?',show:false},{index:31,text:'32.您的皮肤因过敏出现过紫癜（紫红色淤点，瘀斑）吗?',show:false},{index:32,text:'33.您的皮肤在不知不觉中会出现青紫瘀斑（皮下出血）吗?',show:false},{index:33,text:'34.您的皮肤一抓就红，并出现抓痕吗?',show:false},{index:34,text:'35.您皮肤或口唇干吗?',show:false},{index:35,text:'36.您的两颧部有细微红丝吗？',show:false},{index:36,text:'37.您身体上有哪里疼痛吗？',show:false},{index:37,text:'38.您面部两颧潮红或偏红吗？',show:false},{index:38,text:'39.您面部或鼻部有油腻感或者油亮发光吗？',show:false},{index:39,text:'40.您面色晦暗或容易出现褐斑吗？',show:false},{index:40,text:'41.您容易生痤疮或皮肤容易生疮疖吗？',show:false},{index:41,text:'42.您上眼睑比别人肿（上眼睑有轻微隆起的现象）吗？',show:false},{index:42,text:'43.您容易有黑眼圈吗？',show:false},{index:43,text:'44.您感到眼睛干涩吗？',show:false},{index:44,text:'45.您口唇颜色偏暗吗？',show:false},{index:45,text:'46.您感到口干咽燥、总想喝水吗？',show:false},{index:46,text:'47.您咽喉部有异物感，且吐之不出、咽之不下吗？',show:false},{index:47,text:'48.您感到口苦或嘴里有异味吗？',show:false},{index:48,text:'49.您嘴里有粘粘的感觉吗？',show:false},{index:49,text:'50.您腹部肥满松软吗？',show:false},{index:50,text:'51.您平时贪多，特别是感到咽喉部总有痰堵着吗？',show:false},{index:51,text:'52.您吃（喝）凉的东西会感到不舒服或怕吃（喝）凉的东西吗？',show:false},{index:52,text:'53.您能适应外界自然和社会环境的变化吗？',show:false},{index:53,text:'54.您容易失眠吗？',show:false},{index:54,text:'55.您受凉或吃（喝）凉的东西后，容易腹泻、拉肚子吗？',show:false},{index:55,text:'56.您大便粘滞不爽、有解不尽的感觉吗？',show:false},{index:56,text:'57.您容易便秘或大便干燥吗？',show:false},{index:57,text:'58.您舌苔厚腻或有舌苔厚厚的感觉吗？',show:false},{index:58,text:'59.您小便时尿道有发热感、尿色浓（深）吗？',show:false},{index:59,text:'60.您的阴囊部位潮湿吗？',show:false}
    ],
    answer:[
      {index:0,text:'没有(根本不)',click:false},{index:1,text:'很少(有一点)',click:false},{index:2,text:'有时(有些)',click:false},{index:3,text:'经常(相当)',click:false},{index:4,text:'总是(非常)',click:false}
    ]
  },

  question(event){
    let that=this;
    let tabindex=event.currentTarget.dataset.tabindex;
    let answ_index=this.data.answ_index;
    let flag=this.data.flag;
    this.setData({
      tabindex:tabindex
    })
    if(!flag){
      this.data.flag=false;
      this.setData({
        flag:this.data.flag
      })
    if(tabindex<59){
      // wx.setStorage({
      //   // key作为引用时的依据
      //   key: "score",
      //   //将subOrder中数据提交
      //   data: this.data.list
      // });
      //{tabindex:'',answ_index:'',score:''}
      this.data.question[tabindex].show=!this.data.question[tabindex].show;
      this.setData({
        tabindex:this.data.tabindex
      })
      this.data.question[tabindex+1].show=!this.data.question[tabindex+1].show;
      this.setData({
        question:this.data.question
      })
    }if(tabindex>=59){
      wx.showToast({

        title: '已经是最后一题了',
   
        icon: 'none',
   
        duration: 2000//持续的时间
   
      })
    }
  }
  if(flag){
    this.data.flag=false;
    this.setData({
      flag:this.data.flag
    })
    if(tabindex>0){
      this.data.question[tabindex].show=!this.data.question[tabindex].show;
      this.setData({
        tabindex:this.data.tabindex
      })
      this.data.question[tabindex-1].show=!this.data.question[tabindex-1].show;
      this.setData({
        question:this.data.question
      })
    }if(tabindex<=0){
      wx.showToast({

        title: '已经是第一题了',
   
        icon: 'none',
   
        duration: 2000//持续的时间
   
      })
    }
  }
  for(let i=0;i<this.data.list.length;i++){
    let item=this.data.list[i];
    console.log('question里问题下标：'+this.data.list[i].tabindex);
    //如果以前选了该题一样的答案，不作处理
    if(item.tabindex==tabindex&&item.answ_index==this.answer){
      console.log('数据重复，不作处理');
      continue;
    }else if(item.tabindex==tabindex&&item.answ_index!=answ_index){
      //如果以前选了这道题的答案，这次不一样，重新插入
      item.answ_index=answ_index;
      item.score=answ_index+1;
      this.setData({
        item:item
      });
      console.log(this.data.list);
      console.log('更新成果');
      break;
    }else if(item.tabindex==null&&item.answ_index==null){
      //如果之前没选过该题，直接插入
      item.tabindex=tabindex;
      item.answ_index=answ_index;
      item.score=answ_index+1;
      this.setData({
        item:item
      });
      console.log(this.data.list);
      console.log('插入成功');
      break;
    }
  }
    console.log('question里问题下标:'+this.data.tabindex);
    console.log('question里答案下标:'+this.data.answ_index);
  },
  answer(event){
    let that=this;
    let answ_index=this.data.answ_index;
    let index=event.target.dataset.index;
    for(let i=0;i<5;i++){
      if(i!=index){
        this.data.answer[i].click=false;
      }
    }
    this.data.answer[index].click=!this.data.answer[index].click;
    console.log('answer里答案下标：'+this.data.answer[index].index);
    this.setData({
        answer:this.data.answer
    })
    this.setData({
      answ_index:this.data.answer[index].index
    })
    
  },
  primer(event){
    let that=this;
    let tabindex=this.data.tabindex;
    if(tabindex>=0){
      let flag=this.data.flag;
      flag=true;
      this.setData({
        flag:flag
      })
      console.log('primer里tabindex'+tabindex)
      console.log('primer里点击上一题flag改变'+flag);
    }
    this.setData({
      tabindex:this.data.tabindex
    })
  },
  next(event){

  },
  submit(event){
    let question=this.data.question;
    let pinghe=this.data.pinghe;
    let qixu=this.data.qixu;
    let yangxu=this.data.yangxu;
    let yinxu=this.data.yinxu;
    let tanshi=this.data.tanshi;
    let shire=this.data.shire;
    let xueyu=this.data.xueyu;
    let qiyu=this.data.qiyu;
    let tebing=this.data.tebing;
    // for(let i=0;i<5;i++){
    //   if(question[i].show)
    // }
    pinghe+=this.data.list[0].score+(6-this.data.list[1].score)+(6-this.data.list[6].score)+(6-this.data.list[7].score)+(6-this.data.list[20].score)+this.data.list[52].score+(6-this.data.list[53].score)+(6-this.data.list[26].score);

    
    qixu+=this.data.list[1].score+this.data.list[2].score+this.data.list[3].score+this.data.list[4].score+this.data.list[5].score+this.data.list[6].score+this.data.list[21].score+this.data.list[25].score;

    yangxu+=this.data.list[16].score+this.data.list[17].score+this.data.list[18].score+this.data.list[20].score+this.data.list[21].score+this.data.list[51].score+this.data.list[54].score;

    yinxu+=this.data.list[15].score+this.data.list[19].score+this.data.list[34].score+this.data.list[37].score+this.data.list[43].score+this.data.list[45].score+this.data.list[56].score+this.data.list[28].score;

    tanshi+=this.data.list[12].score+this.data.list[14].score+this.data.list[49].score+this.data.list[27].score+this.data.list[41].score+this.data.list[57].score+this.data.list[48].score+this.data.list[50].score;

    shire+=this.data.list[38].score+this.data.list[40].score+this.data.list[47].score+this.data.list[55].score+this.data.list[58].score+this.data.list[59].score;

    xueyu+=this.data.list[32].score+this.data.list[35].score+this.data.list[36].score+this.data.list[39].score+this.data.list[42].score+this.data.list[26].score+this.data.list[44].score;

    qiyu+=this.data.list[7].score+this.data.list[8].score+this.data.list[9].score+this.data.list[10].score+this.data.list[11].score+this.data.list[13].score+this.data.list[46].score;

    tebing+=this.data.list[22].score+this.data.list[23].score+this.data.list[24].score+this.data.list[29].score+this.data.list[30].score+this.data.list[31].score+this.data.list[33].score;

    pinghe=[(pinghe-8)/(8*4)]*100;
    qixu=[(qixu-8)/(8*4)]*100;
    yangxu=[(yangxu-7)/(7*4)]*100;
    yinxu=[(yinxu-8)/(8*4)]*100;
    tanshi=[(tanshi-8)/(8*4)]*100;
    shire=[(shire-6)/(6*4)]*100;//湿热少了一个问题
    xueyu=[(xueyu-7)/(7*4)]*100;
    qiyu=[(qiyu-7)/(7*4)]*100;
    tebing=[(tebing-7)/(7*4)]*100;

    this.setData({
      pinghe,
      qixu,
      yangxu,
      yinxu,
      tanshi,
      shire,
      xueyu,
      qiyu,
      tebing
    })
    
    console.log('平和：'+this.data.pinghe+'气虚：'+this.data.qixu+'阳虚：'+this.data.yangxu+'阴虚：'+this.data.yinxu+'痰湿：'+this.data.tanshi+'湿热：'+this.data.shire+'血瘀：'+this.data.xueyu+'气郁：'+this.data.qiyu+'特禀：'+this.data.tebing);

    wx.request({
      url:'http://localhost:8080/identify', 
      data: {
        pingHe: pinghe,
        yangXu: yangxu,
        yingXu: yinxu,
        qiXu: qixu,
        tanShi: tanshi,
        shiRe: shire,
        xueYu: xueyu,
        qiYu: qiyu,
        teLin: tebing
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success:function (result) {
        console.log(result);
       if(result.data.status=="success"){
        wx.redirectTo({
          url: '/pages/submit/submit'
        });
    
      }
      else{
        wx.showModal({
          title: '提示',
          showCancel: true,
          content: result.data.data.errorMsg,
          
        })
      }   
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '网络不在状态',
          success(res) {}
        })
      }
    })

   
    
  },
  show:function(){
    this.setData({
      isshow: !this.data.isshow
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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