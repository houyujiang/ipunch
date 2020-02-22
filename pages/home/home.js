var util = require('../../utils/util.js');

Page({
  data: {
    showFlag: true,
    projectList: []
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
    console.log("点击打卡事件，事件ID：", typeof (e.currentTarget.dataset.projectid));
    util.signIn(e.currentTarget.dataset.projectid)
  },
  //跳转打卡日历页面
  detail(e){
    var projectid = e.currentTarget.dataset.projectid;
    console.log("页面跳转 ID参数：", projectid)
    wx.navigateTo({
      url: '../detail/detail?projectid='+projectid,
    })
  },
  // 添加新打卡任务
  add() {
    wx.navigateTo({
      url: '../create/create'
    }),
    console.log("跳转到创建打卡计划界面")
  },
  

})