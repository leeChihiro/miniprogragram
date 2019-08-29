var app = getApp();
Page({

  //页面的初始数据
  data: {

  },

  //生命周期函数--监听页面加载
  onLoad: function(options) {
    var title = options.title;
    var text = options.text;
    // console.log(title, text);
    var data = {
      title: title,
      text: text,
    }
    this.setData({
      data: data,
    })
  },

})