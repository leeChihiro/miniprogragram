var app = getApp();
Page({
  // 页面的初始数据
  data: {

  },
  toHot: function() {
    wx.navigateTo({
      url: '../../dshot/dshot',
    })
  },
  //跳转至商品详情
  toProductsDetails: function(event) {
    var DetailsId = event.currentTarget.dataset.detailsid;
    console.log(DetailsId);
    wx.navigateTo({
      url: '../dsproducts-details/dsproducts-details' + '?id=' + DetailsId,
    })
  },
  //跳转至商品中心
  toProductsCenter: function(event) {
    var index = event.currentTarget.dataset.index;
    // console.log(index);
    wx.navigateTo({
      url: '../dsproducts-all/dsproducts-all' + '?index' + index,
    })
  },
  //生命周期函数--监听页面加载
  onLoad: function(options) {
    var productsUrl = app.globalData.urlBase + "/item/getlist?" + "n=1&type=0&id=0";
    var productsCategoryUrl = app.globalData.urlBase + '/sort/getlist?' + 'type=0&sort_id=0';
    this.getProducts(productsUrl); //获取商品数据
    this.getProductsCategory(productsCategoryUrl); //获取商品分类
  },
  //获取商品数据
  getProducts: function(url) {
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
        that.processProductsData(res.data.data); //处理商品数据
      },
      fail: function(error) {},
    })
  },
  //处理商品数据
  processProductsData: function(ProductsData) {
    // console.log(ProductsData);
    var product = [];
    var productLength = 0;
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
      productLength = productLength + 1;
      if (productLength <= 4) {
        product.push(temp);
      }
    };
    this.setData({
      product: product
    })
    // console.log(product);
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
        console.log(res.data.data)
        //处理获取到的数据
        that.processProductsCategoryData(res.data.data);
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //处理获取到的分类
  processProductsCategoryData: function(ProductsCategoryData) {
    this.setData({
      Category: ProductsCategoryData
    })
    wx.setStorageSync("ProductsCategory", ProductsCategoryData)
  },
  //获取输入value
  searchInput: function(e) {
    this.setData({
      search: e.detail.value
    })
  },
  //搜索商品
  searchProduct: function(event) {
    var that = this;
    var condition = this.data.search;
    console.log(condition);
    var searchUrl = app.globalData.urlBase + '/item/findbytj' + '?tj=' + condition;
    wx.request({
      url: searchUrl,
      data: {},
      mothod: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        // console.log(res.data.data);
        that.processSearchData(res.data.data);
      },
      fail: function(error) {},
    })
  },

  //处理获取到的数据
  processSearchData: function(searchData) {
    console.log(searchData);
    for (var i in searchData) {
      var ProductData = [];
      var itemI = searchData[i];
      var IMAGE = itemI.IMAGE.split(",");
      var NORM = JSON.parse(itemI.NORM);
      var YL5 = itemI.YL5.split(",");
      var productTemp = {
        CREATED: itemI.CREATED,
        IMAGE: IMAGE,
        ITEM_ID: itemI.ITEM_ID,
        NORM: NORM,
        NUM: itemI.NUM,
        PRICE: itemI.PRICE,
        TEXT: itemI.TEXT,
        TITLE: itemI.TITLE,
        YL1: itemI.YL1,
        YL5: YL5,
      }
      ProductData.push(productTemp);
      console.log(ProductData);
    }
    if (searchData == "") {
      wx.showModal({
        title: '提示',
        content: '搜索信息为空',
        success: function (res) {
          console.log(res);
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      this.setData({
        ProductData: ProductData,
      })
    }
  },

})