//app.js
App({
  isLogin:false,//全局登录状态
  HOST:"http://47.103.217.112",
  requestHeader:{'content-type': 'application/x-www-form-urlencoded'},//请求头
  URLS:{
    login:"/app/login",
    query_parks:"/app/config/parks/query",
    query_report:"/app/park/income/query",
    query_point:"/app/config/point/query",
    opengate:"/app/config/point/opengate",
  },
  onLaunch: function () {
    //获取导航栏相关
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    });
  },
  globalData: {
    parkList:[],
    parkIndex:0,
    userInfo:{
      userName:'null',
      userGroup:'null'
    }
  }
})