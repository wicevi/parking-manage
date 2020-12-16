// pages/menupages/order_manage/order_manage.js
//获取应用实例
const app = getApp();
Page({
  data: {
    //订单数组
    orderList:null,
    orderIndex:0,
    //是否正在加载
    isLoading:false,
    //弹窗变量
    isOpenModal_info:false,
    //isOpenModal_search:false,
    //当前是在场订单界面还是离场订单
    PageCur: 'inOrder',
  },
  //导航栏切换事件
  navChange(e) {
    var tap_cur=e.currentTarget.dataset.cur;
    if(this.data.PageCur!=tap_cur){
      this.setData({
        PageCur: e.currentTarget.dataset.cur
      })
      this.loadOrder();
    }
  },
  //查看出入场图片
  viewImage(e){
    wx.previewImage({
      urls: [e.currentTarget.dataset.url] // 需要预览的图片http链接列表
    })
  },
  //点击订单事件
  tapOrder(e){
    console.log("orderManage[tapOrder:"+e.currentTarget.dataset.index+"]");
    this.setData({
      orderIndex: e.currentTarget.dataset.index
    });
    this.openModal_info();
  },
  //开启订单详情弹窗
  openModal_info(e){
    this.setData({ isOpenModal_info: true });
  },
  //关闭订单详情弹窗
  closeModal_info(e){
    this.setData({ isOpenModal_info: false });
  },
   //下拉刷新事件
   onPullDownRefresh: function () {
    //调用刷新时将执行的方法
    this.loadOrder();
  },
  //加载订单
  loadOrder:function(e){
    var this_=this;
    var url_;
    if(app.globalData.parkList&&app.globalData.parkIndex<app.globalData.parkList.length){
      this_.setData({isLoading:true});
      if(this.data.PageCur=='outOrder')url_=app.URLS.query_outorders;
      else url_=app.URLS.query_inorders;
      wx.request({
        url: app.HOST+url_,
        header:app.requestHeader,
        data:{
          ParkID:app.globalData.parkList[app.globalData.parkIndex].ID,
        },
        success:function(res){
          console.log(res);
          if(res.data.Code=="success"){
            this_.setData({orderList:res.data.Result.Plates});
            wx.showToast({
              title: '加载成功',
              image:'/images/success.png'
            })
          }else{
            wx.showModal({
              title: '加载订单异常',
              content: res.data.Message,
              showCancel:false
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
          this_.setData({isLoading:false});
          wx.stopPullDownRefresh();//停止下拉刷新
        },
      })
    }else{
      wx.showToast({
        title: '车场异常',
        image:'/images/error.png'
      })
    }
  },
  //切到前台
  onShow:function(){
    if(!this.data.orderList||this.data.orderList.length==0){
      this.loadOrder();
    }else{
      this.setData({orderList:this.data.orderList});
    }
  }
})