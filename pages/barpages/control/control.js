// pages/control/control.js
Component({
  properties:{
    controlSet:{
      type:Object,
      value:null
    }
  },
  methods:{
    selectCamera(e){
      var cameraIndex_=e.detail.value;
      this.triggerEvent("cameraChange", {
        cameraIndex:cameraIndex_
      });
    },
    tapEvent(e){
      var type_=e.currentTarget.dataset.type;
      var value_=e.currentTarget.dataset.value;
      this.triggerEvent("controlEvent", {
        type:type_,
        value:value_
      });
    }
  }
})