var app = getApp()
Page({
  // 页面的初始数据
  data: {
    currentTab: 0,
    ////页面初始存储数据
    testOrder_0: {},
    testOrder_10: {},
    testOrder_1: {},
    testOrder_2: {},
    testOrder_3: {},
    testOrder_4: {},
  },
  // http://192.168.0.118:8080/dsajk/jcbdd/getlist  获取检测表订单
  // openid = 用户openid
  // type = 订单状态 0未付款  10已付款  1待收工具 2发送样本(添加回执单) 3检测中  4 检测结束
  //生命周期函数--监听页面加载
  onLoad: function(options) {
    var openid = wx.getStorageSync("openid")
    console.log(openid);
    //按检测表订单状态获取检测表订单信息
    var getTestOrderUrl_0 = app.globalData.urlBase + "/jcbdd/getlist" + "?openid=" + openid + "&type=0&n=1";
    var getTestOrderUrl_10 = app.globalData.urlBase + "/jcbdd/getlist" + "?openid=" + openid + "&type=10&n=1";
    var getTestOrderUrl_2 = app.globalData.urlBase + "/jcbdd/getlist" + "?openid=" + openid + "&type=2&n=1";
    var getTestOrderUrl_3 = app.globalData.urlBase + "/jcbdd/getlist" + "?openid=" + openid + "&type=3&n=1";
    var getTestOrderUrl_4 = app.globalData.urlBase + "/jcbdd/getlist" + "?openid=" + openid + "&type=4&n=1";
    var getTestOrderUrl_1 = app.globalData.urlBase + "/jcbdd/getlist" + "?openid=" + openid + "&type=1&n=1";

    this.getTestOrder(getTestOrderUrl_10, "testOrder_10");
    this.getTestOrder(getTestOrderUrl_0, "testOrder_0");
    this.getTestOrder(getTestOrderUrl_1, "testOrder_1");
    this.getTestOrder(getTestOrderUrl_2, "testOrder_2");
    this.getTestOrder(getTestOrderUrl_3, "testOrder_3");
    this.getTestOrder(getTestOrderUrl_4, "testOrder_4");

  },
  //获取检测订单
  getTestOrder: function(url, typekey) {
    var that = this;
    wx.request({
      url: url,
      data: {},
      mothod: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        console.log(res.data.data);
        that.processTestOrder(res.data.data, typekey);
      },
      fail: function(error) {},
    })
  },
  //处理获取到的数据
  processTestOrder: function(testOrderData, typekey) {
    console.log(testOrderData);
    var OrderData = [];
    for (var i in testOrderData) {
      var testOrderDataI = testOrderData[i];
      var IMAGE = testOrderDataI.IMAGE.split(",");
      var YL1 = testOrderDataI.YL1.split(",");
      var temp = {
        ADDRESS: testOrderDataI.ADDRESS,
        CREATED: testOrderDataI.CREATED,
        IMAGE: IMAGE,
        JCBDD_ID: testOrderDataI.JCBDD_ID,
        JCID: testOrderDataI.JCID,
        OPENID: testOrderDataI.OPENID,
        PHONE: testOrderDataI.PHONE,
        PRICE: testOrderDataI.PRICE,
        SHR: testOrderDataI.SHR,
        STATUS: testOrderDataI.STATUS,
        TEXT: testOrderDataI.TEXT,
        TITLE: testOrderDataI.TITLE,
        USERNAME: testOrderDataI.USERNAME,
        BOOL: true,
        YL1: YL1,
      }
      OrderData.push(temp);
    }
    var readyData = {};
    readyData[typekey] = {
      OrderData: OrderData,
    };
    console.log(readyData);
    this.setData(readyData);
  },
  //跳转至发送样本页面
  fillEMS: function(event) {
    var jcbddid = event.currentTarget.dataset.jcbddid;
    console.log(jcbddid);
    wx.navigateTo({
      url: 'fillEMS/fillEMS?jcbddid=' + jcbddid,
    })
  },
  //跳转至报表页面
  toReport:function(event){
    var completedata = event.currentTarget.dataset.completedata;
    console.log(completedata);
    wx.setStorageSync('ReportData', completedata)
    wx.navigateTo({
      url: 'Report/Report',
    })
  },
  //跳转至检测表订单详细页面
  toDetails:function(event){
    var jcbddid = event.currentTarget.dataset.jcbddid;
    console.log(jcbddid);
    wx.navigateTo({
      url: 'Details/Details?jcbddid=' + jcbddid,
    })
  },
  //点击支付未付款订单
  toPay: function(event) {
    var that = this;
    var jcbddid = event.currentTarget.dataset.jcbddid;
    this.setData({
      JCBDDID: jcbddid
    })
    console.log(this.data.JCBDDID);
    var openid = event.currentTarget.dataset.openid;
    var price = event.currentTarget.dataset.price;
    wx.setStorageSync('jcbddid', jcbddid);
    console.log(jcbddid, openid, price);
    var payMoneyUrl = app.globalData.urlBase + '/wx/pay' + '?orderid=' + jcbddid + '&openid=' + openid + '&sum=' + price;
    wx.request({
      url: payMoneyUrl,
      data: {},
      mothod: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        console.log(res.data);
        var appId = '';
        // var timeStamp = that.createTimeStamp();
        // var nonceStr = that.randomString();
        var param = {
          "timeStamp": res.data.timeStamp,
          "package": "prepay_id=" + res.data.prepay_id,
          "paySign": res.data.paySign,
          "signType": "MD5",
          "nonceStr": res.data.nonceStr,
        }
        that.pay(param)
      },
      fail: function(error) {},
    })
  },
  /* 支付   */
  pay: function(param) {
    var that = this;
    console.log(param);
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: param.signType,
      paySign: param.paySign,
      success: function(res) {
        // success
        console.log("支付成功")
        wx.navigateBack({
          delta: 1,
          success: function(res) {
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            })
          },
        })
        that.ChangeOrderStatus();
      },
      fail: function() {
        console.log("支付失败")
      },
      complete: function(res) {
        console.log(res)
      }
    })
  },
  //改变订单状态
  ChangeOrderStatus: function() {
    var JCBDD_ID = this.data.JCBDDID;
    // var JCBDD_ID = wx.getStorageSync('jcbddid');
    console.log(JCBDD_ID);
    var ChangeOrderStatusUrl = app.globalData.urlBase + '/wx/success' + '?id=' + JCBDD_ID;
    wx.request({
      url: ChangeOrderStatusUrl,
      data: {},
      mothod: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        console.log(res.data);
      },
      fail: function(error) {},
    })
  },

  //滑动切换
  swiperTab: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
})