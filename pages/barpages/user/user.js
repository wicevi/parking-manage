// pages/user/user.js
Component({
  /**
   * 页面的初始数据
   */
  properties: {
    userData:{
      type:Object,
      vvalue:null
    },
  },
  data: {
    
  },
  methods:{
    tapEvent(e){
      var type_=e.currentTarget.dataset.type;
      var value_=e.currentTarget.dataset.value;
      this.triggerEvent("userMenuEvent", {
        type:type_,
        value:value_
      });
    }
  }
})