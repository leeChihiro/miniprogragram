Page({
  //页面的初始数据
  data: {

  },
  // 生命周期函数--监听页面加载
  onLoad: function(options) {
    var that = this;
    // this.userAuthorized(); //判断用户是否授权
    wx.login({
      success: function(res) {
        that.userAuthorized();
        var code = res.code;
        console.log(code);
        if (code) {
          wx.request({
            url: 'https://ww.senluowx.cn/wx/find?code=code',
            data: {
              code: code
            },
            header: {
              "Content-Type": "json"
            },
            method: 'GET',
            dataType: 'json',
            success: function(res) {
              // console.log(res)
              if (res.statusCode == 200) {
                console.log("获取到的openid为：" + res.data.openid)
                // that.globalData.openid = res.data.openid
                wx.setStorageSync('openid', res.data.openid) //将openid存在缓存中
              } else {
                console.log(res.errMsg)
              }
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        } else {
          console.log('获取用户登录失败：' + res.errMsg);
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //判断用户是否授权
  userAuthorized: function() {
    var that = this;
    wx.getSetting({
      success: function(res) {
        // console.log(res);
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo);
              wx.setStorageSync('userInfo', res.userInfo)
              that.setData({
                userInfo: res.userInfo
              });
            }
          })
        } else {
          console.log('尚未授权');
        }
      },
    })
  },
  //跳转至主页
  toHome: function() {
    var that = this;
    wx.switchTab({
      url: '../dshome/dshome',
      fail: function() {
        console.info("跳转失败")
      }
    })
  },
})