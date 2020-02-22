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
    day:'',
    holdDay:'',
  },

  onLoad(e) {
   this.init(e);
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
    var arr = wx.getStorageSync('signin' + e.projectid);
    console.log("日历初始化 打卡数组", arr.arrRecord);
    var arrRecord = arr.arrRecord ? arr.arrRecord : []
    var len = arrRecord.length;

    console.log("日历初始化 打卡数组长度", len);
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
    this.setData({
      day: dayarr,
      holdDay: len
    })
    console.log("解析成日历组件格式的日期数组",dayarr);
 
  }
});