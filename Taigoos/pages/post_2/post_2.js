// post_2.js
var Bmob = require('../../utils/bmob.js');
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ownerId: '',
    
    questionTitle: '',
    question_1: '',
    question_2: '',
    question_3: '',
    question_1_1: '',
    question_1_2: '',
    question_1_3: '',
    question_2_1: '',
    question_2_2: '',
    question_2_3: '',
    question_3_1: '',
    question_3_2: '',
    question_3_3: '',

    buttonLoading: false
  },

  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function () {
    var that = this

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

  bindquestionTitleInput: function (e) {
    this.setData({
      questionTitle: e.detail.value
    })
  },
  bindquestion_1Input: function (e) {
    this.setData({
      question_1: e.detail.value
    })
  },
  bindquestion_2Input: function (e) {
    this.setData({
      question_2: e.detail.value
    })
  },
  bindquestion_3Input: function (e) {
    this.setData({
      question_3: e.detail.value
    })
  },


  bindquestion_1_1Input: function (e) {
    this.setData({
      question_1_1: e.detail.value
    })
  },
  bindquestion_1_2Input: function (e) {
    this.setData({
      question_1_2: e.detail.value
    })
  },
  bindquestion_1_3Input: function (e) {
    this.setData({
      question_1_3: e.detail.value
    })
  },


  bindquestion_2_1Input: function (e) {
    this.setData({
      question_2_1: e.detail.value
    })
  },
  bindquestion_2_2Input: function (e) {
    this.setData({
      question_2_2: e.detail.value
    })
  },
  bindquestion_2_3Input: function (e) {
    this.setData({
      question_2_3: e.detail.value
    })
  },


  bindquestion_3_1Input: function (e) {
    this.setData({
      question_3_1: e.detail.value
    })
  },
  bindquestion_3_2Input: function (e) {
    this.setData({
      question_3_2: e.detail.value
    })
  },
  bindquestion_3_3Input: function (e) {
    this.setData({
      question_3_3: e.detail.value
    })
  },

  bindSubmit: function () {
    var that = this;
    this.setData({
      buttonLoading: true
    })

    var Post = Bmob.Object.extend("qCall");
    var post = new Post();
    post.set("ownerId", this.data.ownerId);
    post.set("questionTitle", this.data.questionTitle);
    post.set("question_1", this.data.question_1);
    post.set("question_2", this.data.question_2);
    post.set("question_3", this.data.question_3);
    post.set("question_1_1", this.data.question_1_1);
    post.set("question_1_2", this.data.question_1_2);
    post.set("question_1_3", this.data.question_1_3);
    post.set("question_2_1", this.data.question_2_1);
    post.set("question_2_2", this.data.question_2_2);
    post.set("question_2_3", this.data.question_2_3);
    post.set("question_3_1", this.data.question_3_1);
    post.set("question_3_2", this.data.question_3_2);
    post.set("question_3_3", this.data.question_3_3);
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