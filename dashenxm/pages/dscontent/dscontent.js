var app = getApp();
var Question = require('../../data/dahome-data.js')
Page({
  //页面的初始数据
  data: {

  },
  //生命周期函数--监听页面加载
  onLoad: function(options) {
    var QuestionUrl = app.globalData.urlBase + "/zhucaidan/getlist" + "?n=2";
    this.getQusetion(QuestionUrl);
    this.setData({
      fixedQusetionData: Question.QuestionList,
    })
  },
  //获取问题列表
  getQusetion: function(url) {
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
        that.processQusetionData(res.data.data); //处理问题数据方法
      },
      fail: function(error) {},
    })
  },
  //处理问题数据
  processQusetionData: function(QusetionData) {
    console.log(QusetionData);
    this.setData({
      QusetionData: QusetionData,
    })
  },
  //跳转至问题详情
  toQuestionDetails: function(event) {
    var title = event.currentTarget.dataset.title;
    var text = event.currentTarget.dataset.text;
    // console.log(title, text);
    wx.navigateTo({
      url: 'dscontent-question/dscontent-question?title=' + title + '&text=' + text,
    })
  },
})