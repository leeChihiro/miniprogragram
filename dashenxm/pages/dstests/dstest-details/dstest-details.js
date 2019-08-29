var app = getApp();
Page({

  //页面的初始数据
  data: {

  },
  //跳转至确认订单页面
  PayAddress: function(event) {
    var title = event.currentTarget.dataset.title;
    var price = event.currentTarget.dataset.price;
    var jcb_id = event.currentTarget.dataset.jcb_id;
    // console.log(price);
    wx.navigateTo({
      url: '../../dspayaddress/dspayaddress' + '?title=' + title + '&price=' + price + '&jcb_id=' + jcb_id,
    })
  },
  //生命周期函数--监听页面加载
  onLoad: function(options) {
    var testId = options.id;
    var TestDetailsUrl = app.globalData.urlBase + "/jcb/find" + "?id=" + testId;
    // console.log(TestDetailsUrl);
    //调用获取检测表详情方法
    this.getTestDetails(TestDetailsUrl);
  },
  //获取监测表详情
  getTestDetails: function(url) {
    var that = this;
    wx.request({
      url: url,
      data: {},
      mothod: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        // console.log(res.data.data);
        that.processTestDetailsData(res.data.data); //处理检测表详情数据
      },
      fail: function(error) {},
    })
  },
  //处理检测表详情数据
  processTestDetailsData: function(TestDetailsData){
    var TestDetails = [];
    var IMAGE = TestDetailsData[0].IMAGE.split(",");
    var temp = {
      CREATED: TestDetailsData[0].CREATED,
      IMAGE: IMAGE,
      JCB_ID: TestDetailsData[0].JCB_ID,
      PRICE: TestDetailsData[0].PRICE,
      TEXT: TestDetailsData[0].TEXT,
      TITLE: TestDetailsData[0].TITLE,
    }
    TestDetails.push(temp);
    this.setData({
      TestDetails: TestDetails[0]
    })
    console.log(TestDetails[0]);
  },
})