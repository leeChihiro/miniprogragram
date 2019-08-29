var app = getApp()
Page({
  // 页面的初始数据
  data: {
    currentTab: 0,
    ////页面初始存储数据
    productOrder_0: {},
    productOrder_10: {},
    productOrder_1: {},
    productOrder_2: {},
  },
  // http://192.168.0.118:8080/dsajk/order/getlist  获取产品订单列表
  // openid = 用户openid
  // type = 订单状态 0未付款  10待发货(已付款) 1已发货 2已收货
  onLoad: function(options) {
    var openid = wx.getStorageSync("openid")
    console.log(openid);
    //按检测表订单状态获取检测表订单信息
    var getProductOrderUrl_0 = app.globalData.urlBase + "/order/getlist" + "?openid=" + openid + "&type=0&n=1";
    var getProductOrderUrl_10 = app.globalData.urlBase + "/order/getlist" + "?openid=" + openid + "&type=10&n=1";
    var getProductOrderUrl_1 = app.globalData.urlBase + "/order/getlist" + "?openid=" + openid + "&type=1&n=1";
    var getProductOrderUrl_2 = app.globalData.urlBase + "/order/getlist" + "?openid=" + openid + "&type=2&n=1";
    this.getProductOrder(getProductOrderUrl_0, "productOrder_0");
    this.getProductOrder(getProductOrderUrl_10, "productOrder_10");
    this.getProductOrder(getProductOrderUrl_1, "productOrder_1");
    this.getProductOrder(getProductOrderUrl_2, "productOrder_2");

  },
  //获取商品订单
  getProductOrder: function(url, typekey) {
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
        that.processProductOrder(res.data.data, typekey);
      },
      fail: function(error) {},
    })
  },
  //处理获取到的数据
  processProductOrder: function(ProductOrderData, typekey) {
    console.log(ProductOrderData);
    var productOrderData = [];
    for (var i in ProductOrderData) {
      var ProductOrderDataI = ProductOrderData[i];
      var IMAGE = ProductOrderDataI.IMAGE.split(',');
      var temp = {
        CREATED: ProductOrderDataI.CREATED,
        IMAGE: IMAGE,
        ITEMID: ProductOrderDataI.ITEMID,
        NORM: ProductOrderDataI.NORM,
        NUM: ProductOrderDataI.NUM,
        OPENID: ProductOrderDataI.OPENID,
        ORDER_ID: ProductOrderDataI.ORDER_ID,
        PHONE: ProductOrderDataI.PHONE,
        PRICE: ProductOrderDataI.PRICE,
        REWARD: ProductOrderDataI.REWARD,
        SHR: ProductOrderDataI.SHR,
        STATUS: ProductOrderDataI.STATUS,
        SUM: ProductOrderDataI.SUM,
        TEXT: ProductOrderDataI.TEXT,
        TITLE: ProductOrderDataI.TITLE,
        USERNAME: ProductOrderDataI.USERNAME,
        BOOL: true,
      }
      productOrderData.push(temp);
    }
    var readyData = {};
    readyData[typekey] = {
      productOrderData: productOrderData,
    };
    console.log(readyData);
    this.setData(readyData);
  },
  //确认收货
  ConfirmReceipt: function(event) {
    var ORDER_ID = event.currentTarget.dataset.orderid;
    var ConfirmReceiptUrl = app.globalData.urlBase + "/order/qrsh" + "?orderid=" + ORDER_ID;
    console.log(ConfirmReceiptUrl);
    wx.request({
      url: ConfirmReceiptUrl,
      data: {},
      mothod: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        console.log(res);

      },
      fail: function(error) {},
    })
  },
  //跳转至订单详细页面
  toProductOrderDetails:function(event){
    var orderid = event.currentTarget.dataset.orderid;
    console.log(orderid);
    wx.navigateTo({
      url: 'OrderDetails/OrderDetails?orderid=' + orderid,
    })
  },
  //点击支付
  toPay: function(event) {
    var that = this;
    var orderid = event.currentTarget.dataset.orderid;
    this.setData({
      ORDERID: orderid
    })
    console.log(this.data.ORDERID);
    var openid = event.currentTarget.dataset.openid;
    var sum = event.currentTarget.dataset.sum;
    console.log(orderid, openid, sum);
    var payMoneyUrl = app.globalData.urlBase + '/wx/pay' + '?orderid=' + orderid + '&openid=' + openid + '&sum=' + sum;
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
    var ORDER_ID = this.data.ORDERID;
    console.log(ORDER_ID);
    var ChangeOrderStatusUrl = app.globalData.urlBase + '/wx/success' + '?id=' + ORDER_ID;
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