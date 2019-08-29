var app = getApp();
Page({

  //页面的初始数据
  data: {

  },
  //跳转至商品规格
  toProductSpec:function(event){
    var DetailsId = event.currentTarget.dataset.detailsid;
    console.log(DetailsId);
    wx.navigateTo({
      url: '../dsproducts-specification/dsproducts-specification' + '?id=' + DetailsId,
    })
  },
  //生命周期函数--监听页面加载
  onLoad: function(options) {
    var DetailsId = options.id;
    console.log(DetailsId);
    var ProductDetailsUrl = app.globalData.urlBase + "/item/find?id=" + DetailsId;
    console.log(ProductDetailsUrl);
    this.getProductDetails(ProductDetailsUrl); //获取商品详情数据
  },
  //获取商品详情数据
  getProductDetails: function(url) {
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
        that.processProductDetailsData(res.data.data);
      },
      fail: function(error) {},
    })
  },
  //处理产品详情数据
  processProductDetailsData: function(ProductDetailsData) {
    var Products = [];
    // console.log(ProductDetailsData);
    var IMAGE = ProductDetailsData[0].IMAGE.split(",")
    var NORM = JSON.parse(ProductDetailsData[0].NORM)
    var temp = {
      CREATED: ProductDetailsData[0].CREATED,
      IMAGE: IMAGE,
      ITEM_ID: ProductDetailsData[0].ITEM_ID,
      NORM: NORM,
      NUM: ProductDetailsData[0].NUM,
      PRICE: ProductDetailsData[0].PRICE,
      TEXT: ProductDetailsData[0].TEXT,
      TITLE: ProductDetailsData[0].TITLE,
      YL1: ProductDetailsData[0].YL1,
    };
    Products.push(temp);
    this.setData({
      Products: Products
    })
    // console.log(Products);
  }
})