{

}
    // https://ww.senluowx.cn
//https://ww.senluowx.cn/zhucaidan/getlist  获得主菜单和客服问题  *** 

// http://192.168.0.118:8080/dsajk/article/getlist   n分页  获取文章列表 ***
//参数: n=分页

// http://192.168.0.118:8080/dsajk/item/getlist	   获取全部商品列表 ***
//参数: n=分页 &type=目录 0 1 2 &id=商品种类 yl

// http://192.168.0.118:8080/dsajk/jcb/getlist        获取检测表列表 ***
//参数: n=分页

// http://192.168.0.118:8080/dsajk/order/creat		 创建商品订单 ******
// 参数: openid = 用户openid username = 用户名字 itemid = 商品ID num = 购买数量 price = 单价
// shdz = 收货地址 norm = 规格 phone = 电话 shr = 收货人

// http://localhost:8080/dsajk/jcbdd/creat  创建检测表订单 ****
// openid = 用户openid username = 用户名字 jcid = 检测ID 
// price = 单价 shdz = 收货地址 phone = 电话 shr = 收货人

// http://192.168.0.118:8080/dsajk/order/getlist  获取产品订单列表 *****
// openid = 用户openid
// type = 订单状态 0未付款  10待发货(已付款) 1已发货 2已收货

// http://192.168.0.118:8080/dsajk/jcbdd/getlist  获取检测表订单 *****
// openid = 用户openid
// type = 订单状态 0未付款  10已付款  1待收工具 2发送样本(添加回执单) 3检测中  4 检测结束

// http://192.168.0.118:8080/dsajk/sort/getlist   全部分类  ********
// type = 0返回一级目录 输入sort_id值返回二级目录

// http://localhost:8080/dsajk/order/qrsh 确认收货 ******
// orderid = 订单id

// http://localhost:8080/dsajk/jcbdd/ems2 添加回执订单号 **********
// jcbddid = 检测表订单id
// ems = 运单号





//http://localhost:8080/dsajk/item/find		商品详细 ***
//id = 商品ID

//http://localhost:8080/dsajk/jcb/find		检测表详细 ***
//id = 检测表ID

//http://localhost:8080/dsajk/article/find	文章详细 ***
//id = 文章ID

// http://localhost:8080/dsajk/wx/find  	获取openid ***
// code = 登陆的授权code

// https://ww.senluowx.cn/wx/pay            微信小程序支付  ***
// orderid：订单id
// openid：用户openid
// sum：交易金额

// https://ww.senluowx.cn/wx/success        确认支付成功后更改订单状态 ***
// id：订单状态

// http://localhost:8080/dsajk/item/findbytj  商品搜索   ************
// tj = 条件

// https://ww.senluowx.cn/zhucaidan/findbytj  主菜单搜索    *********
// tj = 条件

//http://localhost:8080/dsajk/jcbdd/find     检测表订单详细   **********
//  id = 检测表订单ID

//http://localhost:8080/dsajk/order/find		商品订单详细  **********
//id = 订单ID




// http://localhost:8080/dsajk/reward/creat 添加地址
// openid = 用户openid
// phone = 电话
// name = 收货人姓名
// address = 地址

// http://localhost:8080/dsajk/reward/getlist 获得自己列表
// openid = 用户openid