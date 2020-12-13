//index.js
//获取应用实例
const app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    loginSuccess:false,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    parkList: app.globalData.parkList,
    parkIndex: app.globalData.parkIndex,
    PageCur: 'home',
    //home页报表数据
    reportData:{
      data:null,
      isLoad:false,
      err_info:""
    },
    //control页数据
    controlData:{
      cameraList:[],
      cameraIndex:0,
      isOpenMonitor:false,
      vipCarControl:true,
      tempCarControl:true,
      parkPlaceControl:false,
      parkPlaceNumber:999
    },
    userInfo:app.globalData.userInfo,
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
  //获取摄像头列表数据
  queryPoint(e){
    var this_=this;
    if(app.globalData.parkList&&app.globalData.parkIndex<app.globalData.parkList.length){
      wx.request({
        url: app.HOST+app.URLS.query_point,
        header:app.requestHeader,
        data:{
          ParkID:app.globalData.parkList[app.globalData.parkIndex].ID,
        },
        success:function(res){
          console.log(res);
          if(res.data.Code=="success"){
            this_.data.controlData.cameraList=res.data.Result;
          }else{
            console.log( '加载摄像头异常：'+res.data.Message);
            wx.showToast({
              title: '加载摄像头数据异常',
              image:'/images/error.png'
            })
          }
        },
        fail:function(e){
          wx.showToast({
            title: '连接服务器异常',
            image:'/images/error.png'
          })
        },
        complete:function(res){
          this_.setData({
            controlData:this_.data.controlData
          })
        }
      })
    }else{
      wx.showToast({
        title: '车场异常',
        image:'/images/error.png'
      })
    }
  },
  //控制道闸
  controlDaozha(e){
    var this_=this;
    if(app.globalData.parkList&&app.globalData.parkIndex<app.globalData.parkList.length){
      wx.request({
        url: app.HOST+app.URLS.opengate,
        method:"POST",
        header:app.requestHeader,
        data:{
          ParkID:app.globalData.parkList[app.globalData.parkIndex].ID,
          PointID:e.ID
        },
        success:function(res){
          console.log(res);
          if(res.data.Code=="success"){
            wx.showToast({
              title: '控制道闸成功',
              image:'/images/success.png'
            })
          }else{
            console.log( '控制道闸异常：'+res.data.Message);
            wx.showToast({
              title: '控制道闸异常',
              image:'/images/error.png'
            })
          }
        },
        fail:function(e){
          wx.showToast({
            title: '连接服务器异常',
            image:'/images/error.png'
          })
        },
      })
    }else{
      wx.showToast({
        title: '车场异常',
        image:'/images/error.png'
      })
    }
  },
  //更新本日报表事件
  updateReportData(e) {
    var this_=this;
    if(app.globalData.parkList&&app.globalData.parkIndex<app.globalData.parkList.length){
      this_.data.reportData.isLoad=true;
      this_.data.reportData.data=null;
      this_.setData({
        reportData:this_.data.reportData
      })
      wx.request({
        url: app.HOST+app.URLS.query_report,
        header:app.requestHeader,
        data:{
          ParkID:app.globalData.parkList[app.globalData.parkIndex].ID,
          StartTime:util.getData(),
          Unit:"day"
        },
        success:function(res){
          console.log(res);
          if(res.data.Code=="success"){
            this_.data.reportData.data=res.data.Result[0];
          }else{
            this_.data.reportData.err_info=res.data.Message;
          }
        },
        fail:function(e){
          wx.showToast({
            title: '连接服务器异常',
            image:'/images/error.png'
          })
        },
        complete:function(res){
          this_.data.reportData.isLoad=false;
          this_.setData({
            reportData:this_.data.reportData
          })
        }
      })
    }else{
      wx.showToast({
        title: '车场异常',
        image:'/images/error.png'
      })
    }
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
    switch(type_){
      case 'open':
        this.controlDaozha({ID:value_});
      break;
    }
  },
  //退出登录按钮
  logout(e){
    var this_=this;
    wx.showModal({
      title: '确认退出',
      content: '请确认是否退出当前账户',
      success (res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'Appsession',
            success:function(e){
              app.requestHeader.Appsession=null;
              app.isLogin=false;
            }
          })
          this_.goLogin('tip=退出成功');
        } 
      }
    })
  },
  //用户界面菜单点击事件
  userMenuEvent(e){
    var type_=e.detail.type;
    var value_=e.detail.value;
    console.log("userMenuEvent[type:"+type_+" value:"+value_+"]");
    switch(type_){
      case 'logout':
        this.logout();
      break;

    }
  },
  //跳转到登录界面
  goLogin(param){
    var this_=this;
    wx.navigateTo({
      url: '/pages/login/login?'+param,
      events:{
        loginSuccess:function(e){
          this_.setData({
            loginSuccess:true
          })
        }
      }
    })
  },
  //切到前台
  onShow:function(){
    var this_=this;
    if(this.data.loginSuccess){
      wx.showToast({
        title: '登录成功',
        image: '/images/success.png'
      })
      this_.setData({
        loginSuccess:false
      })
    }
    if(!app.isLogin){
      //获取登录状态
      wx.getStorage({
        key: 'Appsession',
        success:function(e){
          //如果有 尝试验证
          this_.goLogin('Appsession='+e.data);
        },
        fail:function(e){
          //没有
          this_.goLogin('tip=请先登录');
        }
      });
    }else{
      if(this_.data.reportData.data==null){
        this_.updateReportData();
      }
      if(this_.data.controlData.cameraList.length==0){
        this_.queryPoint();
      }
      this.setData({
        parkList: app.globalData.parkList,
        parkIndex: app.globalData.parkIndex,
        userInfo:app.globalData.userInfo
      })
    }
  }
})
