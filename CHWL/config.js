/**
 * 小程序配置文件
 */
//var host = "jlynhr.com.cn/vote/Service"
var host = "localhost:50516/Service"

var config = {
  host,
  //登录url 
  openIdUrl: `http://${host}/UserAuth.ashx`,

  //首页url
  RequestUrl: `http://${host}/Service.ashx?type=Home`,

  //广告ADurl
  AdvertUrl: `http://${host}/Service.ashx?type=Advert`,
  
  //我的url
  MyCenterUrl: `http://${host}/Service.ashx?type=MyCenter`,

  //优惠券列表url
  CouponListUrl: `http://${host}/Service.ashx?type=CouponList`,

  //收藏优惠券
  DownLoadUrl: `http://${host}/Service.ashx?type=DownLoad`,

  //放弃优惠券
  GiveUpUrl: `http://${host}/Service.ashx?type=GiveUpCoupon`,

  //使用优惠券
  CouponDetail: `http://${host}/Service.ashx?type=CouponDetail`,

};

module.exports = config