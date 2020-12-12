//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    isLogin:app.isLogin,
    parkList: app.globalData.parkList,
    parkIndex: app.globalData.parkIndex,
    PageCur: 'home',
    //home页报表数据
    reportData:{
      date:"2020-11-05",
      allMoney:666,
      orderList:[
        {
          type:"临时车辆订单",
          number:15,
          money:66
        },
        {
          type:"VIP车辆订单",
          number:6,
          money:0
        },
        {
          type:"VIP办理订单",
          number:2,
          money:600
        }
      ]
    },
    //control页数据
    controlData:{
      cameraList:[
        {
          cameraName:"出口摄像头1",
          cameraId:"123",
        },
        {
          cameraName:"大门入口摄像头",
          cameraId:"124",
        },
      ],
      cameraIndex:0,
      isOpenMonitor:false,
      gates:[
        {
          gateId:1231,
          direction:"进",
          name:"协和医院东门入口",
          isHaveBackupOpen:false
        },
        {
          gateId:1232,
          direction:"进",
          name:"协和医院南门入口",
          isHaveBackupOpen:false
        },
        {
          gateId:1233,
          direction:"出",
          name:"协和医院东门出口",
          isHaveBackupOpen:true
        },
      ],
      vipCarControl:true,
      tempCarControl:true,
      parkPlaceControl:false,
      parkPlaceNumber:999
    }
  },
  //顶部车场切换事件
  parkChange(e) {
    app.globalData.parkIndex = e.detail.value;
    this.setData({
      parkIndex: app.globalData.parkIndex
    })
  },
  //底部标签点击事件
  navChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  //摄像头选择事件
  cameraChange(e){
    this.data.controlData.cameraIndex=e.detail.cameraIndex;
    this.setData({
      controlData: this.data.controlData
    })
  },
  //控制事件
  controlEvent(e){
    var type_=e.detail.type;
    var value_=e.detail.value;
    console.log("controlEvent[type:"+type_+" value:"+value_+"]");
  },
  //切到前台
  onShow:function(){
    this.setData({
      isLogin:app.isLogin,
      parkList: app.globalData.parkList,
      parkIndex: app.globalData.parkIndex,
    })
  }
})
