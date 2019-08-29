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
    var item_id = options.itemid;
    var price = options.price;
    var type = options.type;
    var money = options.money;
    var num = options.num;
    console.log(num);
    var formData = wx.getStorageSync("formData");
    console.log(formData, item_id, price, type, money)
    var norm = money.split(",");
    console.log(norm);
    var int_price = parseFloat(price);
    var int_money = parseFloat(norm[1]);
    var pricesum = int_price + int_money;
    console.log(pricesum);
    //将传递进来的数据保存存入缓存中
    var ProductOrderData = {
      type1: formData.type,
      type:type,
      norm: norm[0],
      money: norm[1],
      num: num,
      sum: formData.sum,
      item_id: item_id,
      price: pricesum,
    }
    this.setData({
      ProductOrderData: ProductOrderData
    })
    wx.setStorageSync('ProductOrderData', ProductOrderData) //存入缓存中

    var showsum = pricesum * num;
    console.log(showsum);
    this.setData({
      showsum: showsum
    })
  },

  //提交订单
  formSubmit: function(e) {
    //从缓存中获取数据，openid userinfo ProductOrderData
    var that = this;
    var openId = wx.getStorageSync('openid')
    console.log(openId);
    var userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo);
    var ProductOrderData = wx.getStorageSync('ProductOrderData')
    console.log(ProductOrderData);

    var formData = e.detail.value;
    console.log(formData.mobil);
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

    // http://192.168.0.118:8080/dsajk/order/creat		 创建商品订单
    // 参数: openid = 用户openid username = 用户名字 itemid = 商品ID num = 购买数量 price = 单价
    // shdz = 收货地址 norm = 规格 phone = 电话 shr = 收货人
    //创建订单
    var setProductOrderUrl = app.globalData.urlBase + '/order/creat' + '?openid=' + openId + '&username=' + userInfo.nickName + '&itemid=' + ProductOrderData.item_id + '&num=' + ProductOrderData.num + '&price=' + ProductOrderData.price + '&shdz=' + formData.address + '&norm=' + '类型:' + ProductOrderData.type + ',' + '规格:' + ProductOrderData.norm + ',' + '价格:' + ProductOrderData.money + '&phone=' + formData.mobil + '&shr=' + formData.username;
    console.log(setProductOrderUrl);
    wx.request({
      url: setProductOrderUrl,
      data: {},
      mothod: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        console.log(res.data.data);
        var ORDER_ID = res.data.data.ORDER_ID;
        console.log(ORDER_ID);
        wx.setStorageSync('order_id', ORDER_ID) //将ORDER_ID存在缓存中
        var openid = res.data.data.openid;
        var sum = res.data.data.SUM;
        that.payMoney(ORDER_ID, openid, sum); //调用支付接口
      },
      fail: function(error) {},
    })
  },
  //手机号处理
  checkPhoneNum: function(mobil) {
    var str = /^1\d{10}$/;
    if (str.test(mobil)) {
      return true
    } else {
      wx.showModal({
        title: '提示',
        content: '填写正确手机号码',
        success: function(res) {
          console.log(res);
        },
        fail: function(res) {},
        complete: function(res) {},
      })
      return false;
    }
  },
  //支付接口
  payMoney: function(ORDER_ID, openid, sum) {
    var that = this;
    var payMoneyUrl = app.globalData.urlBase + '/wx/pay' + '?orderid=' + ORDER_ID + '&openid=' + openid + '&sum=' + sum;
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
    var ORDER_ID = wx.getStorageSync('order_id')
    console.log(ORDER_ID);
    var ChangeOrderStatusUrl = app.globalData.urlBase + '/wx/success' + '?id=' + ORDER_ID;
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