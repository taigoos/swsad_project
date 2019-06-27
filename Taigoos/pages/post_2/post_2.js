// post.js
var Bmob = require('../../utils/bmob.js');
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ownerId: '',
    ownerNickname: '',
    ownerGender: 1,
    ownerPic: '',
    taskFound: false,

    taskImg: '',
    taskName: '',
    taskAuthor: '',
    taskPress: '',
    taskPrice: '',

    isTexttask: false,
    courseName: '',
    conditions: ["10分钟内","10-60分钟", "一天内", "一周内"],
    conditionIndex: 0,
    campus: ["东校区", "南校区", "北校区", "珠海校区"],
    campusIndex: 0,
    currentPrice: '',
    postRemark: '',
    buttonLoading: false
  },

  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function () {
    var that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
        ownerPic: userInfo.avatarUrl,
        ownerNickname: userInfo.nickName,
        ownerGender: userInfo.gender + ''
      }),
        console.log('ownerNickname:', that.data.ownerNickname)
        console.log('ownerGender:', that.data.ownerGender)
        console.log('ownerPic:', that.data.ownerPic)
    }),
      this.setData({
        ownerId: Bmob.User.current().id
      })
    console.log('ownerId:', this.data.ownerId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  bindTaskNameInput: function (e) {
    this.setData({
      taskName: e.detail.value
    })
  },
  bindTaskAuthorInput: function (e) {
    this.setData({
      taskAuthor: e.detail.value
    })
  },
  bindTaskPressInput: function (e) {
    this.setData({
      taskPress: e.detail.value
    })
  },
  bindTaskPriceInput: function (e) {
    this.setData({
      taskPrice: e.detail.value
    })
  },

  bindNeedCourse: function (e) {
    this.setData({
      isTexttask: e.detail.value
    })
    if (!this.data.isTexttask) {
      this.setData({
        courseName: ''
      })
    }
  },
  bindCourseInput: function (e) {
    this.setData({
      courseName: e.detail.value
    })
  },

  bindConditionChange: function (e) {
    this.setData({
      conditionIndex: e.detail.value
    })
  },

  bindCampusChange: function (e) {
    this.setData({
      campusIndex: e.detail.value
    })
  },

  bindCurrentPriceInput: function (e) {
    this.setData({
      currentPrice: e.detail.value
    })
  },

  bindPostRemarkInput: function (e) {
    this.setData({
      postRemark: e.detail.value
    })
  },

  bindSubmit: function () {
    var that = this;
    this.setData({
      buttonLoading: true
    })

    var Post = Bmob.Object.extend("post");
    var post = new Post();
    post.set("ownerId", this.data.ownerId);
    post.set("ownerNickname", this.data.ownerNickname);
    post.set("ownerGender", this.data.ownerGender);
    post.set("taskImg", this.data.taskImg);
    post.set("taskName", this.data.taskName);
    post.set("taskAuthor", this.data.taskAuthor);
    post.set("taskPress", this.data.taskPress);
    post.set("taskPrice", this.data.taskPrice);
    post.set("isTexttask", this.data.isTexttask);
    post.set("courseName", this.data.courseName);
    post.set("condition", this.data.conditions[this.data.conditionIndex]);
    post.set("campus", this.data.campus[this.data.campusIndex]);
    post.set("currentPrice", parseInt(this.data.currentPrice));
    post.set("taskRemark", this.data.taskRemark);
    //添加数据，第一个入口参数是null
    post.save(null, {
      success: function (result) {
        // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
        console.log("创建post成功, objectId:" + result.id);
        that.setData({
          buttonLoading: false
        });
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 3000
        })
      },
      error: function (result, error) {
        // 添加失败
        console.log('创建post失败',result,error);
        that.setData({
          buttonLoading: false
        })
      }
    });
  }
})