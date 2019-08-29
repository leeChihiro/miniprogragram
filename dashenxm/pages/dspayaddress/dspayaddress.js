var app = getApp();
Page({
  //从缓存中获取openId
  getOpenId: function() {
    // var that = this;
    var openId = wx.getStorageSync('openid')
    this.setData({
      openid: openId
    })
    console.log(openId);
  },
  //页面的初始数据
  data: {

  },

  //生命周期函数--监听页面加载
  onLoad: function(options) {
    var title = options.title;
    var price = options.price;
    var jcb_id = options.jcb_id;
    //将传递进来的数据保存
    var orderData = {
      title: title,
      price: price,
      jcb_id: jcb_id,
    }
    this.setData({
      orderData: orderData
    })
    wx.setStorageSync('orderData', orderData)
  },
  //提交订单
  formSubmit: function(e) {
    //从缓存中获取数据，openid userinfo orderData
    var that = this;
    var openId = wx.getStorageSync('openid')
    console.log(openId);
    var userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo);
    var orderData = wx.getStorageSync('orderData')
    console.log(orderData);

    var formData = e.detail.value;
    console.log(formData.username);
    //判断空值
    var username = e.detail.value.name;
    var mobil = e.detail.value.mobil;
    var address = e.detail.value.address;
    if (username == "" || mobil == "" || address == "") {
      wx.showModal({
        title: '提示',
        content: '请输入完整信息',
        success: function(res) {
          console.log(res);
        },
        fail: function(res) {},
        complete: function(res) {},
      })
      return false;
    } else {
      console.log("填写正确")
    }
    //判断手机号码
    if (mobil.length != 11) {
      wx.showModal({
        title: '提示',
        content: '请填写正确手机号码',
        success: function(res) {
          console.log(res);
        },
        fail: function(res) {},
        complete: function(res) {},
      })
      return false;
    } else {
      console.log("填写正确")
    }

    //创建订单
    var setTestOrderUrl = app.globalData.urlBase + '/jcbdd/creat' + '?openid=' + openId + '&username=' + userInfo.nickName + '&jcid=' + orderData.jcb_id + '&price=' + orderData.price + '&shdz=' + formData.username + '&phone=' + formData.mobil + '&shr=' + formData.address;
    console.log(setTestOrderUrl);
    wx.request({
      url: setTestOrderUrl,
      data: {},
      mothod: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        console.log(res.data.data);
        var JCBDD_ID = res.data.data.JCBDD_ID;
        wx.setStorageSync('jcbdd_id', res.data.data.JCBDD_ID) //将JCBDD_ID存在缓存中
        var openid = res.data.data.openid;
        var sum = res.data.data.PRICE;

        that.payMoney(JCBDD_ID, openid, sum);
      },
      fail: function(error) {},
    })
  },
  //支付接口
  payMoney: function(JCBDD_ID, openid, sum) {
    var that = this;
    var payMoneyUrl = app.globalData.urlBase + '/wx/pay' + '?orderid=' + JCBDD_ID + '&openid=' + openid + '&sum=' + sum;
    wx.request({
      url: payMoneyUrl,
      data: {},
      mothod: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        console.log(res.data);
        var appId = '';
        // var timeStamp = that.createTimeStamp();
        // var nonceStr = that.randomString();
        var param = {
          "timeStamp": res.data.timeStamp,
          "package": "prepay_id=" + res.data.prepay_id,
          "paySign": res.data.paySign,
          "signType": "MD5",
          "nonceStr": res.data.nonceStr,
        }
        that.pay(param)
      },
      fail: function(error) {},
    })
  },
  /* 支付   */
  pay: function(param) {
    var that = this;
    console.log(param);
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: param.signType,
      paySign: param.paySign,
      success: function(res) {
        // success
        console.log("支付成功")
        wx.navigateBack({
          delta: 1,
          success: function(res) {
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            })
          },
        })
        that.ChangeOrderStatus();
      },
      fail: function() {
        // fail
        console.log("支付失败")
      },
      complete: function(res) {
        // complete
        console.log(res)
      }
    })
  },
  //改变订单状态
  ChangeOrderStatus: function() {
    var JCBDD_ID = wx.getStorageSync('jcbdd_id')
    console.log(JCBDD_ID);
    var ChangeOrderStatusUrl = app.globalData.urlBase + '/wx/success' + '?id=' + JCBDD_ID;
    wx.request({
      url: ChangeOrderStatusUrl,
      data: {},
      mothod: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        console.log(res.data);
      },
      fail: function(error) {},
    })
  },


  /* 时间戳产生函数   */
  createTimeStamp: function() {
    return parseInt(new Date().getTime() / 1000) + ''
  },
  /* 随机数 */
  randomString: function() {
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = chars.length;
    var pwd = '';
    for (var i = 0; i < 32; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },
})