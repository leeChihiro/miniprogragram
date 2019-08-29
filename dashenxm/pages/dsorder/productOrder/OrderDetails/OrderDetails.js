var app = getApp()
Page({
  //页面的初始数据
  data: {

  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    var that = this;
    var orderid = options.orderid;
    console.log(orderid);
    var getProductDetailsUrl = app.globalData.urlBase + "/order/find?id=" + orderid; //获取商品详情数据
    wx.request({
      url: getProductDetailsUrl,
      data: {},
      mothod: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res.data.data)
        that.processProductDetailsData(res.data.data);
      },
      fail: function (error) { },
    })
  }, 
  //处理商品详情数据
  processProductDetailsData: function (ProductDetailsData){
    console.log(ProductDetailsData[0]);
    var IMAGE = ProductDetailsData[0].IMAGE.split(",");
    var NORM = ProductDetailsData[0].NORM.split(",");
    switch (ProductDetailsData[0].STATUS) {
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
    var productOrderDetailsData = [];
    var temp = {
      CREATED: ProductDetailsData[0].CREATED,
      IMAGE: IMAGE,
      ITEMID: ProductDetailsData[0].ITEMID,
      ITEM_ID: ProductDetailsData[0].ITEM_ID,
      NORM: NORM,
      NUM: ProductDetailsData[0].NUM,
      OPENID: ProductDetailsData[0].OPENID,
      ORDER_ID: ProductDetailsData[0].ORDER_ID,
      PHONE: ProductDetailsData[0].PHONE,
      PRICE: ProductDetailsData[0].PRICE,
      ADDRESS: ProductDetailsData[0].REWARD,
      SHR: ProductDetailsData[0].SHR,
      STATUS: STATUS,
      SUM: ProductDetailsData[0].SUM,
      TEXT: ProductDetailsData[0].TEXT,
      TITLE: ProductDetailsData[0].TITLE,
      USERNAME: ProductDetailsData[0].USERNAME,
    }
    productOrderDetailsData.push(temp);
    console.log(productOrderDetailsData);
    this.setData({
      DetailsData: productOrderDetailsData[0],
    })
  },
})