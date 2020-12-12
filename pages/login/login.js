// pages/login/login.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogining:false,
    username:"",
    password:"",
    isVisible:false,//密码是否可见
  },
  visibleChange:function(e){
    this.setData({
      isVisible:!this.data.isVisible
    })
  },
  nameChange:function(e){
    this.setData({
      username:e.detail.value
    })
  },
  pwChange:function(e){
    this.setData({
      password:e.detail.value
    })
  },
  //微信登录 获取appCode登录用户
  wxLogin:function(e){
    console.log("username:"+this.data.username+" password:"+this.data.password);
    if(this.data.username.length<1){
      wx.showToast({
        title: "请输入用户名",
        image:"/images/error.png"
      })
      return;
    }
    if(this.data.password.length<1){
      wx.showToast({
        title: "请输入用户密码",
        image:"/images/error.png"
      })
      return;
    }
    this.setData({
      isLogining:true
    });
    wx.login({
      success: res => {
        this.userLogin(res.code);
      },
      fail: res => {
        this.setData({
          isLogining:false
        });
        wx.showModal({
          title: '登录失败',
          content: '错误码：0x0001(微信登录失败)',
          showCancel:false
        })
      },
    })
  },
  //用户登录
  userLogin:function(appCode){
    var this_=this;
    console.log("appCode:"+appCode)
    wx.request({
      url: app.HOST+app.URLS.login,
      data:{
        Username:this_.data.username,
        Password:this_.data.password,
        AppCode:appCode
      },
      header: app.requestHeader,
      success: function(res){
        console.log(res);
        if(res.data.Code=='success'){
          //登录成功
          
        }else{
          //登录失败
          wx.showModal({
            title: '登录失败',
            content: res.data.Message,
            showCancel:false
          })
        }
      },
      fail:function(res){
        console.log(res);
        wx.showModal({
          title: '登录失败',
          content: '错误码：0x0002(服务器登录失败)',
          showCancel:false
        })
      },
      complete:function(res){
        this_.setData({
          isLogining:false
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var appSession=options.Appsession;
    if(appSession!=null){//登录验证
      this.setData({
        isLogining:true
      });
      app.requestHeader.Appsession=appSession;
      wx.request({
        url: app.HOST+app.URLS.query_parks,
        header: app.requestHeader,
        success: function(res){
          console.log(res);
        },
        fail:function(res){
          console.log(res);

        },
        complete:function(res){
          this.setData({
            isLogining:false
          });
        }
      });
    }
  },
})