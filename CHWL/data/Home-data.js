const HomeUrl = require('../config').RequestUrl

var local_database = {
  newlist: [],
  list: [],
  advertlist: [],
  classifyList: [],
  classifyList2: []
}

wx.request({
  url: HomeUrl,
  success: function (res) {
    console.log(res.data.newlist)
    console.log(res.data.list)
    console.log(res.data.advertlist)
    console.log(res.data.classifyList)
    local_database.newlist = res.data.newlist,
    local_database.advertlist = res.data.advertlist,
    local_database.list = res.data.list,
    local_database.classifyList = res.data.classifyList,
    local_database.classifyList2 = res.data.classifyList2
  },
  fail: function () {
    console.log("fail")
  },
  complete: function () {
  }
})

module.exports = {
  Datalist: local_database,
}