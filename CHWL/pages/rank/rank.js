var homeData = require('../../data/Home-data.js')

var app = getApp();
// pages/index/rank/rank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    setTimeout(function () {
      self.setData({
        list: homeData.Datalist.list,
        hide: true
      })
    }, 500)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var self = this;
    self.setData({
      list: homeData.Datalist.list,
      hide: true
    })
    console.log(homeData.Datalist.list)
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
  
  },
  onPhone: function (event) {    
    var phonenumber = event.currentTarget.dataset.phonenumber;

    wx.makePhoneCall({
      phoneNumber: phonenumber,
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },

  onMapTap: function (event) {
  
    var XCoordinates = event.currentTarget.dataset.xcoordinates;

    var YCoordinates = event.currentTarget.dataset.ycoordinates;

    console.log(XCoordinates, YCoordinates);

    wx.openLocation
    ({
      latitude: Number(YCoordinates),
      longitude: Number(XCoordinates),
      scale: 28
    })
  },

  onlistTap: function (event) 
  {
    var index = event.currentTarget.dataset.index;
    console.log("on index  is:" + index);
    wx.navigateTo({
      url: "/pages/storedetail/storedetail?id=" + index
    })
  },
})