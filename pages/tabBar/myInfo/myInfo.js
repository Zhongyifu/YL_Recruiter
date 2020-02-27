// pages/information/myInfo/myInfo.js
const app = getApp();
const url = app.globalData.baseUrl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    labebA: '',
    labebB: '',
    labebC: '',
    userName: '',
    userHeadPortrait: ''
  },
  goToLableA: function() {
    wx.navigateTo({
      url: '../../communication/communicated/communicated',
    });
  },
  goToLableB: function() {
    wx.navigateTo({
      url: '../../communication/interview/interview',
    });
  },
  goToLableC: function() {
    wx.navigateTo({
      url: '../../communication/favorite/favorite',
    });
  },
  toMyInfo:function(){
    wx.navigateTo({
      url: '../../communication/myInfo/myInfo',
    });
  },
  toSetting:function(){
    wx.navigateTo({
      url: '../../communication/setting/setting',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _that = this;
    wx.getStorage({
      key: 'wechat_session',
      success: (result)=>{
        let sessionId = result.data.sessionId == undefined ? '':result.data.sessionId;
<<<<<<< HEAD
        console.log(sessionId)
=======
        // console.log(sessionId)
>>>>>>> 282a0282a1770843611da72881ed34e4f1e51b7a
        wx.request({
          url: url + 'recruiterInfo/getMineInfo.json',
          method: 'POST',
          header:{"Cookie":'JSESSIONID=' + sessionId },
          success: (res) => {
<<<<<<< HEAD
            console.log(res)
=======
            // console.log(res)
>>>>>>> 282a0282a1770843611da72881ed34e4f1e51b7a
            if (res.statusCode == 200) {
              if (res.data.data != null) {
                let dataJson = res.data.data;
                _that.setData({
                  labebA: dataJson.communicationStatisticsCount,
                  labebB: dataJson.jobInterviewCount,
                  labebC: dataJson.recruiterCollectionCount,
                  userName: dataJson.recruiterName,
                  userHeadPortrait: dataJson.recruiterImg,
                });
              }
            }
          }
        })
      },
      fail: ()=>{
        wx.showModal({ title:'警告',content:'sessionID获取出错'})
      },
    });

  },
})