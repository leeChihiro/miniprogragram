var app = getApp()
Page({
  //页面的初始数据
  data: {

  },
  //生命周期函数--监听页面加载
  onLoad: function(options) {
    var that = this;
    var jcbddid = options.jcbddid;
    console.log(jcbddid);
    var getTestDetailsUrl = app.globalData.urlBase + "/jcbdd/find?id=" + jcbddid;
    wx.request({
      url: getTestDetailsUrl,
      data: {},
      mothod: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        console.log(res.data.data)
        that.processTestDetailsData(res.data.data);
      },
      fail: function(error) {},
    })
  },
  processTestDetailsData: function(TestDetailsData) {
    console.log(TestDetailsData);
    var IMAGE = TestDetailsData[0].IMAGE.split(",");
    var YL1 = TestDetailsData[0].YL1.split(",");

    switch (TestDetailsData[0].STATUS) {
      case "0":
        var STATUS = "未付款";
        break;
      case "10":
        var STATUS = "已付款";
        break;
      case "1":
        var STATUS = "待收工具";
        break;
      case "2":
        var STATUS = "发送样本";
        break;
      case "3":
        var STATUS = "检测中";
        break;
      case "4":
        var STATUS = "检测结束";
        break;
    }
    console.log(STATUS);
    var DetailsData = [];
    var temp = {
      ADDRESS: TestDetailsData[0].ADDRESS,
      CREATED: TestDetailsData[0].CREATED,
      IMAGE: IMAGE,
      JCBDD_ID: TestDetailsData[0].JCBDD_ID,
      JCID: TestDetailsData[0].JCID,
      OPENID: TestDetailsData[0].OPENID,
      PHONE: TestDetailsData[0].PHONE,
      PRICE: TestDetailsData[0].PRICE,
      SHR: TestDetailsData[0].SHR,
      STATUS: STATUS,
      TEXT: TestDetailsData[0].TEXT,
      TITLE: TestDetailsData[0].TITLE,
      USERNAME: TestDetailsData[0].USERNAME,
      YL1: YL1,
      sum: TestDetailsData[0].sum,
    }
    DetailsData.push(temp);
    console.log(DetailsData);
    this.setData({
      DetailsData: DetailsData[0],
    })
  },
})