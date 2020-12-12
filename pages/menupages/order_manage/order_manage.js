// pages/menupages/order_manage/order_manage.js
//获取应用实例
const app = getApp();
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
    //车场列表
    parkList:app.globalData.parkList,
    parkIndex:app.globalData.parkIndex,
    //排序类别
    sortList:[
      {
        title:"创建时间",
        type:0
      },
      {
        title:"结算时间",
        type:1
      },
    ],
    sortIndex:0,
    //时间范围
    startDate:"2020-11-17",
    endDate:"2020-11-17",
    //订单缩影
    briefOrder:[
      {
        plate:"闽C82T66",
        type:"临时",
        state:"已结算",
        createTime:"2020-11-17 09:10:36",
        inPic:"https://tse4-mm.cn.bing.net/th/id/OIP.4T26wqsKhx41jEteRT2e-QHaEK?pid=Api&rs=1",
        finishTime:"2020-11-17 12:14:21",
        outPic:"http://img-download.pchome.net/download/1k0/e5/48/o2qfcm-1dgf.jpg",
        parkingHours:38000,//停车时长
        parkingFee:4300//停车费用
      },
      {
        plate:"京A88888",
        type:"VIP",
        state:"未结算",
        createTime:"2020-11-17 08:15:32",
        inPic:"http://www.3dmgame.com/uploads/allimg/140912/226_140912090811_2.jpg",
        finishTime:"",
        outPic:"",
        parkingHours:8600,//停车时长
        parkingFee:1000//停车费用
      },
    ],
    orderIndex:0,
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
  //车场切换事件
  parkChange(e) {
    console.log("orderManage[parkChange:"+e.detail.value+"]");
    app.globalData.parkIndex = e.detail.value;
    this.setData({
      parkIndex: app.globalData.parkIndex
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
  //切到前台
  onShow:function(){
    this.setData({
      parkIndex: app.globalData.parkIndex
    })
  }
})