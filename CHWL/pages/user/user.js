const MyCenterUrl = require('../../config').MyCenterUrl;

const GiveUpUrl = require('../../config').GiveUpUrl;

var util = require('../../utils/util.js');

var app = getApp();


Page({
  data: 
  {
    tabObj: [
      { tabId: "wsy", name: "未使用" },
      { tabId: "ysy", name: "已使用" },
      { tabId: "ygq", name: "已过期" },
      { tabId: "yfq", name: "已放弃" }
    ],
    curIndex: 0,
    toView: "wsy",
    couponArr: [
      { pic: "/images/coupon/coupon-pic.jpg" },
      { pic: "/images/coupon/coupon-pic-1.jpg" },
      { pic: "/images/coupon/coupon-pic-2.jpg" },
      { pic: "/images/coupon/coupon-pic-3.jpg" }
    ], 
    notusedCouponList: {},
    usedCouponList   : {},
    expireCouponlist : {},
    giveupCouponlist : {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    this.getNoUsedCouponlist(0);

    this.getUsedCouponlist(1);

    this.getExpireCouponlist(2);

    this.getGiveUpCouponlist(4);
  },
  onTabSwitch: function (even) {
    this.setData({
      toView: even.target.dataset.tabId,
      curIndex: even.target.dataset.id
    });
  },
  onConSwitch: function (even) {
    var len = this.data.tabObj.length;
    var scrollWidth = even.detail.scrollWidth / len;
    var scrollLeft = even.detail.scrollLeft;
    this.setData({
      curIndex: Math.round(scrollLeft / scrollWidth)
    });
  },
  getNoUsedCouponlist: function (event) {
    var that = this;
    wx.getStorage({
      key: 'MemberShipID',
      success: function (res) {
        wx.request({
          url: MyCenterUrl,
          data: { MemberShipID: res.data, CenterType: event },
          header: {
            'content-type': 'application/json' // 默认值  
          },
          success: function (retVal) {
            console.log(retVal.data.data)
            that.setData({
              notusedCouponList: retVal.data.data
            })
          },
          fail: function () {
            console.log("fail")
          },
          complete: function () {
            that.setData({
              isshow: false
            })
          }
        })
      },
    })
  },
  getGiveUpCouponlist: function (event) {
    var that = this;
    wx.getStorage({
      key: 'MemberShipID',
      success: function (res) {
        wx.request({
          url: MyCenterUrl,
          data: { MemberShipID: res.data, CenterType: event },
          header: {
            'content-type': 'application/json' // 默认值  
          },
          success: function (retVal) {
            console.log(retVal.data.data)
            that.setData({
              giveupCouponlist: retVal.data.data
            })
          },
          fail: function () {
            console.log("fail")
          },
          complete: function () {
            that.setData({
              isshow: false
            })
          }
        })
      },
    })
  },
  getUsedCouponlist: function (event) {
    var that = this;
    wx.getStorage({
      key: 'MemberShipID',
      success: function (res) {
        wx.request({
          url: MyCenterUrl,
          data: { MemberShipID: res.data, CenterType: event },
          header: {
            'content-type': 'application/json' // 默认值  
          },
          success: function (retVal) {
            console.log(retVal.data.data)
            that.setData({
              usedCouponList: retVal.data.data
            })
          },
          fail: function () {
            console.log("fail")
          },
          complete: function () {
            that.setData({
              isshow: false
            })
          }
        })
      },
    })
  },
  getExpireCouponlist: function (event) {
    var that = this;
    wx.getStorage({
      key: 'MemberShipID',
      success: function (res) {
        wx.request({
          url: MyCenterUrl,
          data: { MemberShipID: res.data, CenterType: event },
          header: {
            'content-type': 'application/json' // 默认值  
          },
          success: function (retVal) {
            console.log(retVal.data.data)
            that.setData({
              expireCouponlist: retVal.data.data
            })
          },
          fail: function () {
            console.log("fail")
          },
          complete: function () {
            that.setData({
              isshow: false
            })
          }
        })
      },
    })
  }
})