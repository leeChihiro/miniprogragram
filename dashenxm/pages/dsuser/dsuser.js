// pages/dsuser/dsuser.js
Page({
  //页面的初始数据
  data: {

  },
  //跳转至关于我们
  toAbout: function() {
    wx.navigateTo({
      url: '../dsabout/dsabout',
    })
  },
  //跳转至检测订单
  toTestOrders: function() {
    wx.navigateTo({
      url: '../dsorder/testOrder/testOrder',
    })
  },
  //跳转至商品订单
  toProductOrders: function () {
    wx.navigateTo({
      url: '../dsorder/productOrder/productOrder',
    })
  },
  //跳转至客服页面
  toQuestion:function(){
    wx.switchTab({
      url: '../dscontent/dscontent',
      fail: function () {
        console.info("跳转失败")
      }
    })
  },
  //生命周期函数--监听页面加载
  onLoad: function(options) {
    this.userAuthorized(); //判断用户是否授权
    this.getOpenId();
  },
  //判断用户是否授权
  userAuthorized: function() {
    var that = this;
    wx.getSetting({
      success: function(res) {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            lang: "zh_CN",
            success: function(res) {
              console.log(res.userInfo);
              that.setData({
                userInfo: res.userInfo
              })
            }
          })
        } else {
          console.log('尚未授权');
        }
      },
    })
  },
  //从缓存中获取openId
  getOpenId: function () {
    // var that = this;
    var openId = wx.getStorageSync('openid')
    this.setData({
      openId: openId
    })
    console.log(openId);
  },
})