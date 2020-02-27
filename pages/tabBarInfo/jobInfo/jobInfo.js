// pages/tabBarInfo/jobInfo/jobInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobTypeList: [{
        'id': '001',
        'name': '全部'
      },
      {
        'id': '002',
        'name': '开放中'
      },
      {
        'id': '003',
        'name': '待开放'
      },
      {
        'id': '004',
        'name': '已关闭'
      },
      {
        'id': '005',
        'name': '审核失败'
      }
    ],
    typeIdx: 1,
  },

  chooseJobType: function(e) {
    let _that = this;
    _that.setData({
      typeIdx: e.detail.value
    });
    // 发起请求找出相对应类别的职位
  },

  goToInformation:function(e){
    let _that = this;
    let jobId = e.currentTarget.dataset.id;
    // 跳转到 此职位的详情页 wx.navigateTo({});
  },

  goToAddNewJob:function(){
    wx.navigateTo({
      url: '../../addNew/job/job',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

})