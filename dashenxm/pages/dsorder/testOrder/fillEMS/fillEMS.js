var app = getApp()
Page({

  //页面的初始数据
  data: {

  },
  //生命周期函数--监听页面加载
  onLoad: function(options) {
    var jcbddid = options.jcbddid;
    this.setData({
      jcbddid: jcbddid
    })
  },
  emsInput: function(e) {
    this.setData({
      ems: e.detail.value
    })
  },
  //获取用户输入的ems
  BtnClick: function(e) {
    // console.log(this.data.jcbddid);
    // console.log("ems："+ this.data.ems)
    if (this.data.ems == undefined) {
      console.log("错误")
      return false;
    }else{
      var postEmsUrl = app.globalData.urlBase + "/jcbdd/ems2" + "?jcbddid=" + this.data.jcbddid + "&ems=" + this.data.ems;
      console.log(postEmsUrl);
      wx.request({
        url: postEmsUrl,
        data: {},
        mothod: 'GET',
        header: {
          "Content-Type": "json"
        },
        success: function (res) {
          console.log(res);
          wx.navigateBack({
            delta: 2,
          })
        },
        fail: function (error) { },
      })
    }
  },

  // http://localhost:8080/dsajk/jcbdd/ems2 添加回执订单号
// jcbddid = 检测表订单id
// ems = 运单号
})