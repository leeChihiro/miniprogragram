const AdvertUrl = require('../../config').AdvertUrl
var app = getApp();
// pages/home/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    AdvertList: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var AdvertID = options.id;

    wx.request({
      url: AdvertUrl,
      data: { AdvertID: AdvertID},
      header: {
        'content-type': 'application/json' // 默认值  
      },
      success: function (retVal) {
        console.log(retVal.data.data)
        that.setData({
          AdvertList: retVal.data.data
        })
      },
      fail: function () {
        console.log("fail")
      },
      complete: function () {
       }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})