var app = getApp();
Page({

  //页面的初始数据
  data: {

  },
  //生命周期函数--监听页面加载
  onLoad: function(options) {

  },
  //获取输入value
  searchInput: function(e) {
    this.setData({
      search: e.detail.value
    })
  },
  //搜索全部
  searchAll: function(event) {
    var that = this;
    var condition = this.data.search;
    console.log(condition);
    var searchUrl = app.globalData.urlBase + '/zhucaidan/findbytj' + '?tj=' + condition;
    wx.request({
      url: searchUrl,
      data: {},
      mothod: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        console.log(res.data.data);
        that.processSearchData(res.data.data);
      },
      fail: function(error) {},
    })
  },
  //处理获取到的数据
  processSearchData: function(searchData) {
    console.log(searchData);

    //检测表数据
    var test = searchData.jcb;
    var TestData = [];
    if (test == "") {} else {
      for (var i in test) {
        var testI = test[i];
        var IMAGE = testI.IMAGE.split(",");
        var testTemp = {
          CREATED: testI.CREATED,
          IMAGE: IMAGE,
          JCB_ID: testI.JCB_ID,
          PRICE: testI.PRICE,
          TEXT: testI.TEXT,
          TITLE: testI.TITLE,
        }
        TestData.push(testTemp);
        console.log(TestData);
      }
    }

    //产品数据
    var item = searchData.item;
    var ProductData = [];
    if (item == "") {} else {
      for (var i in item) {
        var itemI = item[i];
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
    }

    //处理文章数据
    var article = searchData.article;
    var ArticleData = [];
    if (article == "") {} else {
      for (var i in article) {
        var articleI = article[i];
        var IMAGE = articleI.IMAGE.split(",");
        var articleTemp = {
          ARTICLE_ID: articleI.ARTICLE_ID,
          CREATED: articleI.CREATED,
          IMAGE: IMAGE,
          TEXT: articleI.TEXT,
          TITLE: articleI.TITLE
        }
        ArticleData.push(articleTemp);
        console.log(ArticleData);
      }
    }
    if (test == "" && item == "" && article == "") {
      wx.showModal({
        title: '提示',
        content: '搜索信息为空',
        success: function(res) {
          console.log(res);
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      this.setData({
        TestData: TestData,
        ProductData: ProductData,
        ArticleData: ArticleData,
      })
    }

  },
  //跳转至商品详情
  toProductsDetails: function(event) {
    var DetailsId = event.currentTarget.dataset.detailsid;
    // console.log(DetailsId);
    wx.navigateTo({
      url: '../dsproducts/dsproducts-details/dsproducts-details' + '?id=' + DetailsId,
    })
  },
  //跳转至文章详情
  ToKnowledgeDetails: function(event) {
    var knowsId = event.currentTarget.dataset.knowsid;
    // console.log(knowsId);
    wx.navigateTo({
      url: '../dsknowledges/dsknowledge-details/dsknowledge-details?id=' + knowsId,
    })
  },
  //跳转至检测表详情
  ToTestDetails: function(event) {
    var testId = event.currentTarget.dataset.testid;
    // console.log(testId);
    wx.navigateTo({
      url: '../dstests/dstest-details/dstest-details' + '?id=' + testId,
    })
  },
})