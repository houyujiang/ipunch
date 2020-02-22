// pages/create/create.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectId:'',
    title: '',
    content: '',
    createTime:'',
  },

  onLoad(){
    this.setData({
      createTime: util.formatTime(new Date()),
      projectId: Math.random().toString(36).substr(2, 15)
    })
  },
  // 标题，简介 设定
  titleChange(e) {
    this.setData({
      title: e.detail.value
    })
  },
  contentChange(e) {
    console.log("content!", e),
    this.setData({ 
      content: e.detail.value
    })
  },
  /**
   * 提交按钮
   */
  createActivity(){
    // 活动名称自然不可为空
    if (this.data.title.length == 0) {

      wx.showModal({
        title: 'Hey, 客官',
        content: '请先给计划起个名字',
        showCancel: false
      })
      return;
    }
    //产生主题的唯一id
    // 数据保存
    // 缓存中的数据类型是string  console.log(typeof(arr))
    var arr = wx.getStorageSync('activity');
    var stoarr = []
    if (arr.length) {
      arr.forEach((item, i) => {
        stoarr.push(item);
      })
    }
    stoarr.push(this.data)
    wx.setStorageSync('activity', stoarr);
    wx.switchTab({
      url: '../home/home',
    })
    console.log("submit ok!");
  }
})