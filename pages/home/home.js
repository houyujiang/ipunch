var util = require('../../utils/util.js');
import { showToast } from '../../utils/UIUtil'


Page({
  data: {
    showFlag: true,
    isCreating: false,
    projectList: [],
    template: {}
  },

  // 页面加载完成触发一次，仅一次
  onLoad() {
    this.initData();
  },
  onShow(options) {
    this.initData();
  },
  onPullDownRefresh() {
    this.initData();
  },
  //
  initData() {
    var arr = wx.getStorageSync('activity');
    console.log("打卡时间数组：",arr)
    var projectList=[];
   
    //遍历缓存数据并组装
    if(arr.length >0){
      var showFlag = false;
      arr.forEach((item,i)=> {
        var punchFlag = util.is
        var listdata = {
          projectId: item.projectId,
          title:item.title,
          content: item.content,
          createTime: item.createTime,
          punchFlag: this.isPunch(item.projectId)
        };
        projectList.push(listdata)
      })
    }else{
      showFlag = true;
    }
    console.log("home init", projectList)
    // 数据存入页面
    this.setData({
      showFlag: showFlag,
      projectList: projectList
    })
  },
  // 打卡图标
  isPunch(projectid){
    var punchFlag = util.isPunched(projectid);
    return punchFlag;
  },
  // 打卡事件
  signIn(e){
    console.log("进来了啊！！！！！！");
    console.log("点击打卡事件，事件ID：", typeof (e.currentTarget.dataset.projectid));
    util.signIn(e.currentTarget.dataset.projectid)
  },
  //跳转打卡日历页面
  detail(e){
    console.log(e.currentTarget.dataset)
    var projectid = e.currentTarget.dataset.projectId;
    var title = e.currentTarget.dataset.title;
    console.log("页面跳转 ID参数：", projectid);
    wx.navigateTo({
      url: '../detail/detail?projectid=' + projectid +'&title='+title,
    })
  },
  // 添加新打卡任务
  add() {
    wx.navigateTo({
      url: '../create/create'
    }),
    console.log("跳转到创建打卡计划界面")
  },
  onCreateGoal() {
    this.setData({
      isCreating: true
    })
  },

  onCancelCreate() {
    this.setData({
      isCreating: false
    })
  },
  onAddGoal(e){
    var goalTitle = e.detail    
    if (!goalTitle.length) {
      showToast('标题不能为空')
      return
    }
    const createtime = util.formatTime(new Date())
    var data = {
      createTime: createtime,
      title: goalTitle,
      projectId: Math.random().toString(36).substr(2, 15)
    }
    //产生主题的唯一id
    // 数据保存
    // 缓存中的数据类型是string  console.log(typeof(arr))
    const arr = wx.getStorageSync('activity');
    const stoarr = []
    if (arr.length) {
      arr.forEach((item, i) => {
        stoarr.push(item);
      })
    }
    console.log("存入标题：",data)
    stoarr.push(data)
    wx.setStorageSync('activity', stoarr);
    this.setData({
      isCreating: false,
      showFlag: false
    })
    this.onLoad() 
    console.log("submit ok!");
  }
})