var app = getApp();
Page({

  // 页面的初始数据
  data: {},

  //生命周期函数--监听页面加载
  onLoad: function(options) {
    var knowsId = options.id;
    var KnowledgeDetailsUrl = app.globalData.urlBase + "/article/find" + "?id=" + knowsId;
    // console.log(KnowledgeDetailsUrl);
    //调用获取文章详情方法
    this.getKnowledgeDetails(KnowledgeDetailsUrl);
  },

  getKnowledgeDetails: function(url) {
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
        that.processknowledgeDetailsData(res.data.data);
      },
      fail: function(error) {},
    })
  },
  processknowledgeDetailsData: function(knowledgeDetailsData) {
    // console.log(knowledgeDetailsData[0]);
    var knowledgeDetails = [];
    var IMAGE = knowledgeDetailsData[0].IMAGE.split(",");
    var temp = {
      ARTICLE_ID: knowledgeDetailsData[0].ARTICLE_ID,
      CREATED: knowledgeDetailsData[0].CREATED,
      IMAGE: IMAGE,
      TEXT: knowledgeDetailsData[0].TEXT,
      TITLE: knowledgeDetailsData[0].TITLE,
    }
    knowledgeDetails.push(temp);
    // console.log(knowledgeDetails);
    this.setData({
      knowledgeDetails: knowledgeDetails
    })
    // console.log(knowledgeDetails);
  },
})