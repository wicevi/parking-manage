// pages/control/control.js
Component({
  properties:{
    controlSet:{
      type:Object,
      value:null
    }
  },
  data:{
    outMode:[
      {
        name:"免费放行",
        value:"free"
      },
      {
        name:"最低收费",
        value:"minprice"
      },
      {
        name:"人工确认",
        value:"manual"
      },
    ],
  },
  methods:{
    selectCamera(e){
      var cameraIndex_=e.detail.value;
      this.triggerEvent("cameraChange", {
        cameraIndex:cameraIndex_
      });
    },
    selectNoPlateOutMode(e){
      var NoPlate_OutMode_index_=e.detail.value;
      this.triggerEvent("NoPlateOutModeChange", {
        NoPlate_OutMode_index:NoPlate_OutMode_index_
      });
    },
    tapEvent(e){
      var type_=e.currentTarget.dataset.type;
      var value_=e.currentTarget.dataset.value;
      this.triggerEvent("controlEvent", {
        type:type_,
        value:value_
      });
    }, 
  }
})