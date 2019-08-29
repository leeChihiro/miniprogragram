var homeData = require('../../data/Home-data.js')

var WxParse = require('../../wxParse/wxParse.js');

var app = getApp();

const CouponListUrl = require('../../config').CouponListUrl

const DownLoadUrl = require('../../config').DownLoadUrl

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StoreDetail: {},
    CouponList: {},
    motto: '查看地理位置',
    isshow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) 
  {
    var that = this;
    
    var newindex = options.newid;

    var index = options.id;

    if (newindex != null) 
    {
      this.data.currentindex = newindex;
    
      var storedata = homeData.Datalist.newlist[newindex];
    }
    else {
      this.data.currentindex = index;
      var storedata = homeData.Datalist.list[index];
    }

    WxParse.wxParse('storedata_Introduction', 'html', storedata.Introduction, that, 5)

    wx.request({
      url: CouponListUrl,
      data: { StoreID: storedata.StoreID },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          StoreDetail: storedata,
          CouponList: res.data.data
        })
      },
      fail: function () {
        console.log("fail")
      },
      complete: function () {
        isshow: false
      }
    })
  },
  onMapTap: function (event) {
    var that = this;
    var XCoordinates = that.data.StoreDetail.XCoordinates;
    var YCoordinates = that.data.StoreDetail.YCoordinates;
    // console.log(XCoordinates, YCoordinates);
    wx.openLocation({
      latitude: Number(YCoordinates),
      longitude: Number(XCoordinates),
      scale: 28
    })
  },
  onPhone: function (event) {
    var phonenumber = this.data.StoreDetail.PhoneNumber;

    wx.makePhoneCall({
      phoneNumber: phonenumber,
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })

  },
  onCouponTap: function (event) {
    var that = this;
    var CouponID = event.currentTarget.dataset.couponid;
    var StoreID = that.data.StoreDetail.StoreID;
    wx.getStorage({
      key: 'MemberShipID',
      success: function (res) {
        wx.request({
          url: DownLoadUrl,
          data: { CouponID: CouponID, StoreID: StoreID, MemberShipID: res.data },
          success: function (retVal) {
            console.log(retVal.data)
            that.showToast(retVal.data);
          },
          fail: function () {
            console.log("fail")
          },
          complete: function () {
          }
        })
      },
    })
  },
  showToast: function (retVal) {
    var showtitle;

    switch (retVal) {
      case 0:
        wx.showToast({
          title: '优惠券已领光',
          duration: 1000,
          icon: "success"
        })
        // showtitle = '优惠券已领光';
        break;
      case 1:
        wx.showToast({
          title: '领取成功',
          duration: 1000,
          icon: "success"
        })
        // showtitle = '领取成功';
        break;
      case 2:
        wx.showToast({
          title: '达到领取上限',
          duration: 1000,
          icon: "success"
        })
        // showtitle = '优惠券达到领取上限';
        break;
      case 3:
        wx.showToast({
          title: '已有优惠券',
          duration: 1000,
          icon: "success"
        })
        // showtitle = '您在该门店已有优惠券';
        break;
    }
    // wx.showToast({
    //   title: showtitle,
    //   duration: 1000,
    //   icon: "success"
    // })
  }
})