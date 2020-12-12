//app.js
App({
  isLogin:false,//全局登录状态
  HOST:"http://47.103.217.112",
  requestHeader:{'content-type': 'application/x-www-form-urlencoded'},//请求头
  URLS:{
    login:"/app/login",
    query_parks:"/app/config/parks/query",
    prepay:"/app/io/order/prepay",
    history_park:"/app/plate/history_park/query",
    vipinfo:"/app/vip/query",
    rentpay:"/app/vip/order/build"
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
    //获取登录状态
    wx.getStorage({
      key: 'Appsession',
      success:function(e){
        //如果有 尝试验证
        wx.navigateTo({
          url: '/pages/login/login?Appsession='+e.data,
        })
      }
    });
  },
  globalData: {
    parkList:[],
    parkIndex:0
  }
})