// pages/user/user.js
Component({
  /**
   * 页面的初始数据
   */
  properties: {
    
  },
  data: {
    
  },
  methods:{
    logout:function(e){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  }
})