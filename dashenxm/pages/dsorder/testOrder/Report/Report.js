var app = getApp()
Page({
  //页面的初始数据
  data: {

  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    var reportData = wx.getStorageSync('ReportData');
    console.log(reportData);
    
    this.setData({
      reportData: reportData
    })
  },
})