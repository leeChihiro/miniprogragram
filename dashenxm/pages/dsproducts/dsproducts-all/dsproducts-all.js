var app = getApp()
Page({
  // 页面的初始数据
  data: {
    currentTab: 0,
    ////页面初始存储数据
    All: {},
    product_1: {},
    product_2: {},
    product_3: {},

  },
  toProductsDetails: function() {
    wx.navigateTo({
      url: '../dsproducts-details/dsproducts-details',
    })
  },
  //生命周期函数--监听页面加载
  onLoad: function(options) {
    var ProductsCategory = wx.getStorageSync("ProductsCategory")
    // console.log(ProductsCategory);
    var productsUrl_All = app.globalData.urlBase + "/item/getlist?" + "n=1&type=0&id=0";
    var productsUrl_1 = app.globalData.urlBase + "/item/getlist?" + "n=1&type=1&id=" + ProductsCategory[0].SORT_ID;
    var productsUrl_2 = app.globalData.urlBase + "/item/getlist?" + "n=1&type=1&id=" + ProductsCategory[1].SORT_ID;
    var productsUrl_3 = app.globalData.urlBase + "/item/getlist?" + "n=1&type=1&id=" + ProductsCategory[2].SORT_ID;
    var productsCategoryUrl = app.globalData.urlBase + '/sort/getlist?' + 'type=0&sort_id=0';

    //获取产品分类
    this.getProductsCategory(productsCategoryUrl); //获取商品分类
    //按分类获取产品
    this.getProducts(productsUrl_All, "All");
    this.getProducts(productsUrl_1, "product_1");
    this.getProducts(productsUrl_2, "product_2");
    this.getProducts(productsUrl_3, "product_3");
  },
  //获取产品数据
  getProducts: function(url, typekey) {
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
        that.processProductsData(res.data.data, typekey); //处理获取到产品的数据
      },
      fail: function(error) {},
    })
  },
  //处理获取到产品的数据
  processProductsData: function(ProductsData, typekey) {
    // console.log(ProductsData);
    var product = [];
    for (var i in ProductsData) {
      var ProductsI = ProductsData[i];
      if (ProductsI.IMAGE != null) {
        var IMAGE = ProductsI.IMAGE.split(",");
      }
      var TITLE = ProductsI.TITLE;
      if (TITLE.length >= 8) {
        TITLE = TITLE.substring(0, 8) + "..."
      };
      var temp = {
        CREATED: ProductsI.CREATED,
        IMAGE: IMAGE,
        ITEM_ID: ProductsI.ITEM_ID,
        NORM: ProductsI.NORM,
        NUM: ProductsI.NUM,
        PRICE: ProductsI.PRICE,
        TEXT: ProductsI.TEXT,
        TITLE: TITLE,
        YL1: ProductsI.YL1,
      }
      product.push(temp);
    };
    var readyData = {};
    readyData[typekey] = {
      product: product,
    };
    this.setData(readyData);
  },
  //获取商品分类
  getProductsCategory: function(url) {
    var that = this;
    wx.request({
      url: url,
      data: '',
      mothod: 'GET',
      header: {
        "Content-Type": "json"
      },
      dataType: 'json',
      success: function(res) {
        // console.log(res.data.data)
        //处理获取到的数据
        that.processProductsCategoryData(res.data.data)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //处理获取到的分类
  processProductsCategoryData: function (ProductsCategoryData) {
    this.setData({
      Category: ProductsCategoryData
    })
  },
  //跳转至商品详情
  toProductsDetails: function (event) {
    var DetailsId = event.currentTarget.dataset.detailsid;
    console.log(DetailsId);
    wx.navigateTo({
      url: '../dsproducts-details/dsproducts-details?id=' + DetailsId,
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