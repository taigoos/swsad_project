// pages/my/myQ/myQ.js
var Bmob = require('../../../utils/bmob.js')
var util = require('../../../utils/util.js')
var util = require('../../../utils/common.js')
var that
Page({
  data: {
    limit: 10,
    skip: 0,
    postList: []
  },

  onLoad: function () {
    that = this;
    var Post = Bmob.Object.extend("qCall");
    var query = new Bmob.Query(Post);
    query.equalTo("ownerId", Bmob.User.current().id);
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
  onShow: function () {
    var Post = Bmob.Object.extend("qCall");
    var query = new Bmob.Query(Post);
    query.equalTo("ownerId", Bmob.User.current().id);
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
        console.log("onShow查询post失败: " + error.code + " " + error.message);
      }
    })
  },

  onPullDownRefresh: function () {
    this.onShow();

  },

  onReachBottom: function () {
    var Call = Bmob.Object.extend("qCall");
    var query = new Bmob.Query(Call);
    query.equalTo("ownerId", Bmob.User.current().id);
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
      },
      error: function (error) {
        console.log("onReachBottom查询post失败: " + error.code + " " + error.message);
      }
    })
  },

  deletePost: function (event) {
    var objectId = event.target.dataset.id;
    wx.showModal({
      title: '操作提示',
      content: '确定要删除该问卷？',
      success: function (res) {
        if (res.confirm) {
          //删除日记
          var Call = Bmob.Object.extend("qCall");
          //创建查询对象，入口参数是对象类的实例
          var query = new Bmob.Query(Call);
          query.equalTo("objectId", objectId);
          query.destroyAll({
            success: function () {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 3000
              })
              that.onShow();
            },
            error: function (err) {
              common.showTip('删除失败', 'loading');
            }
          });
        }
      }
    })
  },

})
