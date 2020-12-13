// pages/barpages/home/home.js
Component({
  /**
   * 页面的初始数据
   */
  properties: {
    showReport:{
      type:Object,
      value:null
    }
  },
  data: {
    menus: [
      {
        title: '订单管理',
        name: 'order manage',
        color: 'cyan',
        icon: 'edit',
        path:'/pages/menupages/order_manage/order_manage'
      },
      {
        title: '收费调整',
        name: 'fee adjust',
        color: 'blue',
        icon: 'refund',
        path:'/pages/menupages/fee_adjust/fee_adjust'
      },
      {
        title: '车辆管理',
        name: 'car manage',
        color: 'orange',
        icon: 'taxi',
        path:'/pages/menupages/car_manage/car_manage'
      },
      {
        title: '历史报表',
        name: 'historical report',
        color: 'brown',
        icon: 'time',
        path:'/pages/menupages/historical_report/historical_report'
      },
      {
        title: '黑名单管理',
        name: 'blacklist manage',
        color: 'black',
        icon: 'peoplelist',
        path:'/pages/menupages/blacklist_manage/blacklist_manage'
      },
    ],
  },
  methods:{
    refresh:function(e){
      this.triggerEvent("Fresh",null);
    }
  },
})