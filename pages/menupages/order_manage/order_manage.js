// pages/menupages/order_manage/order_manage.js
//获取应用实例
const app = getApp();
var util = require('../../../utils/util.js');
Page({
  data: {
    //筛选类别
    typeList:[
      {
        title:"全部",
        type:0
      },
      {
        title:"未结算",
        type:1
      },
      {
        title:"已结算",
        type:2
      }
    ],
    typeIndex:0,
    //排序类别
    sortList:[
      {
        title:"进场时间",
        type:0
      },
      {
        title:"离场时间",
        type:1
      },
    ],
    sortIndex:0,
    //时间范围
    startDate:util.getDate(),
    endDate:util.getDate(),
    //订单数组
    OrderList:null,
    orderIndex:0,
    //是否正在加载
    isLoading:false,
    //弹窗变量
    isOpenModal_info:false,
    isOpenModal_add:false,
    //照片列表
    inPartPhoto:null
  },
  //添加订单 图片操作 
  chooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      success: (res) => {
        this.setData({
          inPartPhoto: res.tempFilePaths[0]
        })
      }
    });
  },
  //删除图片
  deleteImage(){
    this.setData({
      inPartPhoto: null
    })
  },
  //查看图片
  viewImage(e){
    wx.previewImage({
      urls: [e.currentTarget.dataset.url] // 需要预览的图片http链接列表
    })
  },
  //订单开始时间范围切换事件
  startDateChange(e) {
    console.log("orderManage[startDateChange:"+e.detail.value+"]");
    this.data.startDate = e.detail.value;
    this.setData({
      startDate: this.data.startDate
    })
  },
  //订单结束时间范围切换事件
  endDateChange(e) {
    console.log("orderManage[endDateChange:"+e.detail.value+"]");
    this.data.endDate = e.detail.value;
    this.setData({
      endDate: this.data.endDate
    })
  },
  //筛选类型切换事件
  selectChange(e){
    console.log("orderManage[selectChange:"+e.detail.value+"]");
    this.data.typeIndex = e.detail.value;
    this.setData({
      typeIndex: this.data.typeIndex
    })
  },
  //排序切换事件
  sortChange(e) {
    console.log("orderManage[sortChange:"+e.detail.value+"]");
    this.data.sortIndex = e.detail.value;
    this.setData({
      sortIndex: this.data.sortIndex
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
    this.setData({
      isOpenModal_info: true
    });
  },
  //关闭订单详情弹窗
  closeModal_info(e){
    this.setData({
      isOpenModal_info: false
    });
  },
   //开启新建订单弹窗
   openModal_add(e){
    this.setData({
      isOpenModal_add: true
    });
  },
  //关闭新建订单弹窗
  closeModal_add(e){
    this.setData({
      isOpenModal_add: false
    });
  },
  //查询按钮
  queryBtn:function(e){
    if(!this.data.isLoading){
      this.loadOrder();
    }
  },
  //加载订单
  loadOrder:function(e){
    var this_=this;
    if(app.globalData.parkList&&app.globalData.parkIndex<app.globalData.parkList.length){
      this_.setData({isLoading:true});
      wx.request({
        url: app.HOST+app.URLS.query_orders,
        header:app.requestHeader,
        data:{
          ParkID:app.globalData.parkList[app.globalData.parkIndex].ID,
          StartTime:this_.data.startDate,
          EndTime:this_.data.endDate
        },
        success:function(res){
          console.log(res);
          if(res.data.Code=="success"){
            this_.setData({OrderList:res.data.Result});
            wx.showToast({
              title: '加载成功',
              image:'/images/success.png'
            })
          }else{
            console.log( '加载订单异常：'+res.data.Message);
            wx.showToast({
              title: '加载订单异常',
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
          this_.setData({isLoading:false});
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
    if(!this.data.OrderList||this.data.OrderList.length==0){
      this.loadOrder();
    }
  }
})