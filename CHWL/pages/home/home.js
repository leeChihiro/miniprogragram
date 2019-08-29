var homeData = require('../../data/Home-data.js')

var app = getApp();

Page({
  /**
   * 页面的初始数据 //
   */
  data: {
    //小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A
    // 而这个动作A的执行，是在onLoad函数执行之后发生的
    Newlist: {},
    list: {},
    Advertlist: {},
    classifyList: {},
    classifyList2: {}
  },

  /**
   * 生命周期函数--监听页面加载//   
   */
  onLoad: function (options) {
    var self = this;
    setTimeout(function () {
      self.setData({
        Advertlist: homeData.Datalist.advertlist,
        Newlist: homeData.Datalist.newlist,
        list: homeData.Datalist.list,
        classifyList: homeData.Datalist.classifyList,
        classifyList2: homeData.Datalist.classifyList2,
        hide: true
      })
    }, 500)
  },
  onlistTap: function (event) {
    var index = event.currentTarget.dataset.index;
    // console.log("on index  is:" + index);
    wx.navigateTo({
      url: "../storedetail/storedetail?id=" + index
    })
  },
  onNewlistTap: function (event) {
    var index = event.currentTarget.dataset.index;
    // console.log("on index  is:" + index);
    wx.navigateTo({
      url: "../storedetail/storedetail?newid=" + index
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onclassifylistTap: function (event) {
    var id = event.currentTarget.dataset.id;
    console.log("on id  is:" + id);

    switch (id) {
      case 1:
        console.log("111111111111" + id);
        wx.redirectTo({
          url: '../rank/rank'
         })
        // wx.navigateTo({
        //   url: "../rank/rank"
        // })
        break;
      case 2:
        wx.navigateTo({
          url: "../university/university?id=" + id
        })
        break;
      case 3:
        wx.navigateTo({
          url: "../mybaby/mybaby?id=" + id
        })
        break;
      case 4:
        wx.showToast({
          title: '敬请期待',
          duration: 1000,
          icon: "success"
        })
        break;
      case 5:
        wx.navigateTo({
          url: "../user/user"
        })
        break;
      case 6:
        wx.showToast({
          title: '敬请期待',
          duration: 1000,
          icon: "success"
        })
        break;
      case 7:
        wx.showToast({
          title: '敬请期待',
          duration: 1000,
          icon: "success"
        })
        break;
      case 8:
        wx.showToast({
          title: '敬请期待',
          duration: 1000,
          icon: "success"
        })
        break;
      default:
        break;
    }
  }
})