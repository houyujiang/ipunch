var util = require('../../utils/util.js');
Page({
  data: {
    calendarConfig: {
      theme: 'default',
      highlightToday: false, // 是否高亮显示当天，区别于选中样式（初始化时当天高亮并不代表已选中当天）
      chooseAreaMode: false, // 开启日期范围选择模式，该模式下只可选择时间段
      takeoverTap: true, // 是否完全接管日期点击事件（日期不会选中），配合 onTapDay() 使用
      preventSwipe: true, // 是否禁用日历滑动切换月份
      disablePastDay: true, // 是否禁选当天之前的日期
      disableLaterDay: true, // 是否禁选当天之后的日期
    },
    projectid:'',
    day:'',
    holdDay:'',
    title:'',
    signflag:false,
  },

  onLoad(e) {
   this.init(e);
  },
  onShow(){
    this.init();
  },
  afterCalendarRender() {
    var daylist=this.data.day;
    console.log("日期数组：", daylist, typeof (daylist))
    this.calendar.setTodoLabels({
      // 待办点标记设置
      pos: 'bottom', // 待办点标记位置 ['top', 'bottom']
      dotColor: '#40', // 待办点标记颜色
      circle: false, // 待办圆圈标记设置（如圆圈标记已签到日期），该设置与点标记设置互斥
      showLabelAlways: true, // 点击时是否显示待办事项（圆点/文字），在 circle 为 true 及当日历配置 showLunar 为 true 时，此配置失效
      days:daylist
    });
  },

  init(e) {
    var pid = '';
    var title = '';
    if(e == undefined){
       pid = this.data.projectid
       title = this.data.title
    }else{
      pid = e.projectid;
      title = e.title
    }
    var arr = wx.getStorageSync('signin' +pid );
    console.log("详情：标题：",title)
    var arrRecord = arr.arrRecord ? arr.arrRecord : []
    var len = arrRecord.length;
    var dayarr = [];
    if (len > 0) {
      for (var i = 0; i <= len - 1; i++) {
        var str = arrRecord[i]['nowDay'].split("/");
        var day = {
          year : str[0],
          month :str[1],
          day :str[2],
          todoText: '已打卡'
        }
        dayarr.push(day);
      }
    } else {
      dayarr = [];
    }
    var signflag = this.isPunch(pid)
    console.log(signflag)
    this.setData({
      projectid:pid,
      day: dayarr,
      holdDay: len,
      title: title,
      signflag:signflag
    })
    console.log("解析成日历组件格式的日期数组",dayarr);
 
  },
  // 删除
  onRemoveGoal(){
  let key = this.data.projectid
  let arr = wx.getStorageSync('activity')
  let index 
  for(let i= 0;i<arr.length;i++){
    if(arr[i].projectId = key){
      index = i
      arr.splice(index,1);
    }
  }
  console.log("新数组：",arr)
  wx.setStorageSync('activity', arr)
  wx.navigateTo({
    url: '../home/home'
  })
  },
   // 判断是否打卡
   isPunch(projectid){
    var punchFlag = util.isPunched(projectid);
    return punchFlag;
  },
  // 打卡
  signIn(e){
    console.log("进来了啊！！！！！！");
    util.signIn(this.data.projectid);
    this.onLoad()
  },
  onImgOK(e) {
    this.imagePath = e.detail.path;
    this.setData({
      image: this.imagePath
    })
    console.log('imageOK:',e);
    wx.saveImageToPhotosAlbum({
      filePath: this.imagePath,
    });
  },
  saveImage() {
    var json = this.imgFactory();
    console.log('saveImage',json);
    this.setData({
      template: json
    })
    
  },
  //返回生成的海报
  imgFactory() {
    const holdDay = this.data.holdDay;
    const title = this.data.title;
    return ({
      background: '#f7f7f7',
      width: '750rpx',
      height: '1100rpx',
      borderRadius: '0rpx',
      views: [
        {
          type: 'rect',
          css: {
            left: '50rpx',
            width: '650rpx',
            top: '50rpx',
            color: '#ffffff',
            height: '900rpx',
            borderRadius: '20rpx',
            shadow: '10rpx 10rpx 5rpx #888888',
          }
        },
        {
          type: 'rect',
          css: {
            left: '50rpx',
            width: '650rpx',
            height: '640rpx',
            top: '50rpx',
            color: '#2d8cf0',
            borderRadius: '20rpx',
          }
        },
        {
          type: 'rect',
          css: {
            left: '50rpx',
            width: '650rpx',
            height: '50rpx',
            top: '640rpx',
            color: '#2d8cf0',
          }
        },
        {
          type: 'text',
          text: `「主题:${title}」`,
          css: {
            top: '100rpx',
            left: '350rpx',
            align: 'center',
            fontSize: '38rpx',
            color: '#ffffff',
            width: '550rpx',
            maxLines: '1',
          }
        },
        {
          type: 'text',
          text: `累计打卡:${holdDay} ${holdDay > 0 ? '🔥' : ''}天`,
          css: {
            top: '200rpx',
            left: '80rpx',
            width: '550rpx',
            maxLines: '1',
            fontSize: '28rpx',
            color: '#ffffff'
          }
        },
        {
          type: 'text',
          text: `连续打卡:${holdDay} ${holdDay > 0 ? '🔥' : ''}天`,
          css: {
            top: '300rpx',
            left: '80rpx',
            width: '550rpx',
            maxLines: '1',
            fontSize: '28rpx',
            color: '#ffffff'
          }
        },
        {
          type: 'text',
          text: `全部秘决只有两句话：不屈不挠，坚持到底。——陀思妥耶夫斯基`,
          css: {
            top: '400rpx',
            left: '80rpx',
            width: '550rpx',
            fontSize: '28rpx',
            color: '#ffffff',
            lineHeight: '36rpx',
            maxLines: '2',
          }
        },
        {
          type: 'text',
          text: `项目描述：简单至极的打卡应用`,
          css: {
            top: '550rpx',
            left: '80rpx',
            width: '550rpx',
            fontSize: '28rpx',
            maxLines: '4',
            color: '#ffffff',
            lineHeight: '36rpx'
          }
        },
        {
          type: 'image',
          url: `/dist/images/lizhi.jpg`,
          css: {
            bottom: '180rpx',
            left: '120rpx',
            width: '200rpx',
            height: '200rpx',
          },
        },
        {
          type: 'text',
          text: '长按识别，查看项目详情',
          css: {
            bottom: '290rpx',
            left: '350rpx',
            fontSize: '28rpx',
            color: '#666666'
          }
        },
        {
          type: 'text',
          text: '分享自「symbina米汤」',
          css: {
            bottom: '230rpx',
            left: '350rpx',
            fontSize: '28rpx',
            color: '#666666',
          }
        },
        {
          type: 'text',
          text: '2020中国加油🇨🇳，武汉加油',
          css: {
            bottom: '60rpx',
            left: '375rpx',
            align: 'center',
            fontSize: '28rpx',
            color: '#666666',
          }
        }
      ]
    })
  }
});