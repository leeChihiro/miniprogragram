var app = getApp();
Page({
  //跳转至检测表详情
  ToTestDetails:function(event){
    var testId = event.currentTarget.dataset.testid;
    // console.log(testId);
    wx.navigateTo({
      url: '../dstest-details/dstest-details' + '?id=' + testId,
    })
  },
  //页面的初始数据
  data: {

  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    var testUrl = app.globalData.urlBase + "/jcb/getlist" + "?n=1";
    this.getTest(testUrl); //调用获取检测表数据方法
  },
  //获取检测表数据方法
  getTest: function (url) {
    var that = this;
    wx.request({
      url: url,
      data: {},
      mothod: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.processtesteData(res.data.data); //处理检测表返回数据
      },
      fail: function (error) { },
    })
  },
  //处理检测表返回数据方法
  processtesteData: function (testData) {
    var test = [];
    var testLength = 0;
    for (var i in testData) {
      var testI = testData[i];
      var IMAGE = testI.IMAGE.split(",");
      var TITLE = testI.TITLE;
      if (TITLE.length >= 8) {
        TITLE = TITLE.substring(0, 8) + "..."
      };
      var temp = {
        CREATED: testI.CREATED,
        IMAGE: IMAGE,
        JCB_ID: testI.JCB_ID,
        PRICE: testI.PRICE,
        TEXT: testI.TEXT,
        TITLE: TITLE
      }
      test.push(temp);
    }
    this.setData({
      test: test
    });
    // console.log(test);
  },
})