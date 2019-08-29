var app = getApp();
var id;
Page({

  //页面的初始数据
  data: {
    id: 0,
    moneyid: 0,
    // input默认是1
    num: 1,
    // 使用data数据对象设置样式名
    minusStatus: 'disabled'

  },
  //生命周期函数--监听页面加载
  onLoad: function(options) {
    var DetailsId = options.id;
    var ProductDetailsUrl = app.globalData.urlBase + "/item/find?id=" + DetailsId;
    // console.log(ProductDetailsUrl);
    this.getProductDetails(ProductDetailsUrl); //获取商品详情数据
  },
  //获取商品详情数据
  getProductDetails: function(url) {
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
        that.processProductDetailsData(res.data.data);
      },
      fail: function(error) {},
    })
  },
  //处理产品详情数据
  processProductDetailsData: function(ProductDetailsData) {
    var Products = [];
    // console.log(ProductDetailsData);
    var TITLE = ProductDetailsData[0].TITLE;
    if (TITLE.length >= 8) {
      TITLE = TITLE.substring(0, 8) + "..."
    };
    var IMAGE = ProductDetailsData[0].IMAGE.split(",")
    var NORM = JSON.parse(ProductDetailsData[0].NORM)

    var typeArr = [];
    var normArr = [];
    var moneyArr = [];
    for (var i in NORM) {
      var normI = NORM[i];
      typeArr.push(normI.type);
      normArr.push(normI.norm + '$' + normI.money);
      moneyArr.push(normI.money);
    }
    console.log(typeArr);
    console.log(normArr);
    // console.log(moneyArr);

    var MoneyArr = [];
    for (var i in normArr) {
      var money = normArr[i].split("$")
      MoneyArr.push(money);
    }
    console.log(MoneyArr);

    var temp = {
      CREATED: ProductDetailsData[0].CREATED,
      IMAGE: IMAGE,
      ITEM_ID: ProductDetailsData[0].ITEM_ID,
      NORM: NORM,
      NUM: ProductDetailsData[0].NUM,
      PRICE: ProductDetailsData[0].PRICE,
      TEXT: ProductDetailsData[0].TEXT,
      TITLE: TITLE,
      YL1: ProductDetailsData[0].YL1,
      typeArr: typeArr,
      normArr: normArr,
      moneyArr: moneyArr,
      MoneyArr: MoneyArr,
    };
    Products.push(temp);
    this.setData({
      Products: Products[0]
    })
    console.log(Products[0]);
  },
  //跳转至输入地址信息
  ProductPayAddress: function(event) {
    var item_id = event.currentTarget.dataset.item_id; //获取商品id
    var price = event.currentTarget.dataset.price; //获取商品价格
    // console.log(item_id);
    var moneyid = 0;
    var moneyid = this.data.moneyid;
    var id = 0;
    var id = this.data.id;
    var num = this.data.num;
    console.log(num);
    //获取商品类型
    if (id == 0) {
      var type = this.data.Products.typeArr[0];
    } else {
      var type = this.data.typedata;
    }
    console.log(type);
    //获取商品规格商品价格
    if (moneyid == 0) {
      var money = this.data.Products.MoneyArr[0];
    } else {
      var money = this.data.normdata;
    }
    console.log(money);

    wx.navigateTo({
      url: '../../dsproductPayAddress/dsproductPayAddress' + '?itemid=' + item_id + '&price=' + price + '&type=' + type + '&money=' + money + '&num=' + num,
    })
  },

  productOrderSubmit: function(e) {
    var formData = e.detail.value;
    // console.log(formData);
    wx.setStorageSync("formData", formData)
  },
  //点击选中
  choseTxtColor: function(e) {
    var id = e.currentTarget.dataset.id; //获取自定义的ID值
    var typedata = e.currentTarget.dataset.typedata; //获取类型
    // console.log(id);
    // console.log(typedata);
    this.setData({
      id: id,
      typedata: typedata,
    })
  },

  choseTxtColor2: function(e) {
    var moneyid = e.currentTarget.dataset.moneyid; //获取自定义的ID值
    var normdata = e.currentTarget.dataset.normdata; //获取规格 价格
    // console.log(moneyid);
    // console.log(normdata);
    this.setData({
      moneyid: moneyid,
      normdata: normdata,
    })
  },

  //数量加减
  /* 点击减号 */
  bindMinus: function() {
    var num = this.data.num;
    // 如果大于1时，才可以减
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function() {
    var num = this.data.num;
    // 不作过多考虑自增1
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function(e) {
    var num = e.detail.value;
    // 将数值与状态写回
    this.setData({
      num: num
    });
  },
})