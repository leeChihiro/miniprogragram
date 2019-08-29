const CouponDetail = require('../../config').ceshiCouponDetail

var app = getApp();

Page({
  data: {
    MyCoupon: {},
    retVal: "",
    motto: "返回首页"
  },

  onLoad: function (options) {
    var that = this;
    var StoreID = decodeURIComponent(options.scene)
    //var StoreID = 20642;
    wx.getStorage({
      key: 'MemberShipID',
      success: function (res) {
        wx.request({
          url: CouponDetail,
          data: { StoreID: StoreID, MemberShipID: res.data },
          success: function (retVal) {
            console.log(retVal.data)
            that.setData({
              MyCoupon: retVal.data.detail,
              retVal: retVal.data.retVal
            })
          },
          fail: function () {
            console.log("fail")
          },
          complete: function () {
          }
        })
      },
    })

  },
  onTap: function (event) {
    wx.switchTab({
      url: "../Home/Home"
    });
  }
})