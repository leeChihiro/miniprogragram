var app = getApp();
Page({
  //跳转至检测列表
  toTest: function() {
    wx.navigateTo({
      url: '../dstests/dstest/dstest',
    })
  },
  //跳转至产品主页
  toProductIndex: function() {
    wx.navigateTo({
      url: '../dsproducts/dsproducts-index/dsproducts-index',
    })
  },
  //跳转至文章主页
  toKnowledge: function() {
    wx.navigateTo({
      url: '../dsknowledges/dsknowledge/dsknowledge',
    })
  },
  //跳转至文章详情
  ToKnowledgeDetails: function (event) {
    var knowsId = event.currentTarget.dataset.knowsid;
    // console.log(knowsId);
    wx.navigateTo({
      url: '../dsknowledges/dsknowledge-details/dsknowledge-details?id=' + knowsId,
    })
  },
  //跳转至搜索页面
  toSearch: function() {
    wx.navigateTo({
      url: '../dssearch/dssearch',
    })
  },
  //页面的初始数据
  data: {

  },
  // 生命周期函数--监听页面加载
  onLoad: function(options) {
    var knowledgeUrl = app.globalData.urlBase + "/article/getlist" + "?n=1"; //封装文章接口地址
    var MainMenuUrl = app.globalData.urlBase + "/zhucaidan/getlist" +"?n=1" //封装主菜单地址

    this.getKnowledge(knowledgeUrl); //调用获取文章方法
    this.getMainMenu(MainMenuUrl); //调用获取主菜单方法

    this.userAuthorized();//判断用户是否授权
  },
  //判断用户是否授权
  userAuthorized: function() {
    wx.getSetting({
      success: function (res) {
        // console.log(res);
        if (res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:function(res){
              // console.log(res);
            }
          })
        }else{
          console.log('尚未授权');
        }
      },
    })
  },
  //获取文章方法
  getKnowledge: function(url) {
    var that = this;
    wx.request({
      url: url,
      data: {},
      mothod: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        that.processknowledgeData(res.data.data); //调用处理文章数据方法
      },
      fail: function(error) {},
    })
  },
  //处理文章数据
  processknowledgeData: function(knowledgeData) {
    var knowledges = [];
    var knowledgeLength = 0;
    for (var i in knowledgeData) {
      var KnowledgeI = knowledgeData[i];
      var ImageArr = KnowledgeI.IMAGE.split(",");
      var temp = {
        ARTICLE_ID: KnowledgeI.ARTICLE_ID,
        CREATED: KnowledgeI.CREATED,
        image: ImageArr,
        TEXT: KnowledgeI.TEXT,
        TITLE: KnowledgeI.TITLE,
      }
      knowledgeLength = knowledgeLength + 1;
      if (knowledgeLength <= 3) {
        knowledges.push(temp);
      }
    }
    // console.log(knowledges);
    this.setData({
      knowledges: knowledges
    })
  },
  //获取主菜单数据
  getMainMenu:function(url){
    var that = this;
    wx.request({
      url: url,
      data: {},
      mothod: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.processMenuData(res.data.data); //调用处理主菜单数据方法
      },
      fail: function (error) { },
    })
  },
  //处理主菜单数据
  processMenuData: function (MenuData){
    this.setData({
      Menus: MenuData
    })
  },
})