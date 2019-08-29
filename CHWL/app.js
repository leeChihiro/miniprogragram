const openIdUrl = require('./config').openIdUrl

//app.js
App({
  onLaunch: function () 
  {
    // 登录
    wx.login({
      success: function (res) 
      {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) 
        {
          console.log(res.code);

          wx.request({
            url: openIdUrl,
            data: { code: res.code },
            method: 'GET',
            success: function (res) {
              console.log(res.data);
              wx.setStorage({
                key: 'MemberShipID',
                data: res.data,
              })
            },
            fail: function (res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
            }
          })
        }
      },
      fail: function (err) {
        console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid: null
  }
})