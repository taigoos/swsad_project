//index.js
var Bmob = require('../../utils/bmob.js')
var util = require('../../utils/util.js')
var common = require('../../utils/common.js')
var that
Page({
  data: {
    campus: ["东校区", "南校区", "北校区", "珠海校区"],
    campusIndex: 3,
    limit: 2,
    skip: 0,
    postList: []
  },
  onShareAppMessage: function () {
    return {
      title: '闲钱快',
      desc: '最大的挣钱平台分享给你!',
      path: '/pages/index/index'
    }
  },
  onLoad: function () {
    that = this;
    var Post = Bmob.Object.extend("post");
    var query = new Bmob.Query(Post);
    query.equalTo("campus", this.data.campus[this.data.campusIndex]);
    query.descending('updatedAt');
    query.limit(this.data.limit);
    query.find({
      success: function (results) {
        that.setData({
          postList: results,
          skip: results.length
        })
      },
      error: function (error) {
        console.log("onLoad查询post失败: " + error.code + " " + error.message);
      }
    })

  },

  onPullDownRefresh: function () {
    var Post = Bmob.Object.extend("post");
    var query = new Bmob.Query(Post);
    query.equalTo("campus", that.data.campus[this.data.campusIndex]);
    query.descending('updatedAt');
    query.limit(this.data.limit);
    query.find({
      success: function (results) {
        that.setData({
          postList: results,
          skip: results.length
        })
      },
      error: function (error) {
        console.log("onLoad查询post失败: " + error.code + " " + error.message);
      }
    })

  },

  bindGetUserInfo: function (e) {
    var that = this;
    //此处授权得到userInfo
    console.log(e.detail.userInfo);
    //接下来写业务代码

  },

  onReachBottom: function () {
    var Post = Bmob.Object.extend("post");
    var query = new Bmob.Query(Post);
    query.equalTo("campus", that.data.campus[this.data.campusIndex]);
    query.descending('updatedAt');
    query.skip(this.data.skip);
    query.limit(this.data.limit);
    query.find({
      success: function (results) {
        if (results.length > 0) {
          var nl = that.data.postList.concat(results);
          that.setData({
            skip: that.data.skip + results.length,
            postList: nl
          })
        }
        else {
          wx.showToast({
            title: '已全部加载',
            icon: 'success',
            duration: 3000
          })
        }
        wx.stopPullDownRefresh()
      },
      error: function (error) {
        console.log("onReachBottom查询post失败: " + error.code + " " + error.message);
      }
    })
  },

  bindCampusChange: function (e) {
    this.setData({
      campusIndex: e.detail.value
    })
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    var Post = Bmob.Object.extend("post");
    var query = new Bmob.Query(Post);
    query.equalTo("campus", this.data.campus[this.data.campusIndex]);
    query.descending('updatedAt');
    query.limit(this.data.limit);
    query.find({
      success: function (results) {
        that.setData({
          postList: results,
          skip: results.length
        })
      },
      error: function (error) {
        console.log("hideInput查询post失败: " + error.code + " " + error.message);
      }
    })
  },

  clearInput: function () {
    this.setData({
      inputVal: ""
    });
    var Post = Bmob.Object.extend("post");
    var query = new Bmob.Query(Post);
    query.equalTo("campus", this.data.campus[this.data.campusIndex]);
    query.descending('updatedAt');
    query.limit(this.data.limit);
    query.find({
      success: function (results) {
        that.setData({
          postList: results,
          skip: results.length
        })
      },
      error: function (error) {
        console.log("clearInput查询post失败: " + error.code + " " + error.message);
      }
    })
  },

  bindSearch: function (e) {
    this.getList(e.detail.value);
    console.log(e.detail.value)
    this.setData({
      inputVal: e.detail.value
    });
  },

  getList: function (k) {
    var Post = Bmob.Object.extend("post");
    var queryTaskName = new Bmob.Query(Post);
    var queryTaskAuthor = new Bmob.Query(Post);
    queryTaskName.equalTo("taskName", k);
    queryTaskAuthor.equalTo("taskAuthor", k);
    var mainQuery = Bmob.Query.or(queryTaskName, queryTaskAuthor);
    mainQuery.equalTo("campus", that.data.campus[this.data.campusIndex]);
    mainQuery.descending('updatedAt');
    //mainQuery.limit(this.data.limit);
    mainQuery.find({
      success: function (results) {
        console.log(results)
        that.setData({
          postList: results
        })
      },
      error: function (error) {
        console.log("getList查询pos失败: " + error.code + " " + error.message);
      }
    });
  }

})
