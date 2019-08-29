var app = getApp();
Page({

  // 页面的初始数据
  data: {

  },
  //跳转至文章详情
  ToKnowledgeDetails:function(event){
    var knowsId = event.currentTarget.dataset.knowsid;
    // console.log(knowsId);
    wx.navigateTo({
      url: '../dsknowledge-details/dsknowledge-details?id=' + knowsId,
    })
  },
  // 生命周期函数--监听页面加载
  onLoad: function(options) {
    var knowledgeUrl = app.globalData.urlBase + "/article/getlist" + "?n=1";
    this.getKnowledge(knowledgeUrl);
  },
  //获取文章数据
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
        that.processknowledgeData(res.data.data);
        // console.log(res.data.data);
      },
      fail: function(error){},
    })
  },
  //处理文章数据
  processknowledgeData: function(knowledgeData) {
    var knowledges = [];
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
      knowledges.push(temp);
    }
    // console.log(knowledges);
    this.setData({
      knowledges: knowledges
    })
  },
})