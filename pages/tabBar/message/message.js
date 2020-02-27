// pages/tabBar/message/message.js
const getDate = require('../../../utils/getData.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unReadMeg: "99+",
    messageList:[]
  },
  messageInfo: function (e) {
    let _that = this;
    let mid = e.currentTarget.dataset.mid;
    wx.navigateTo({
      url: '',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getDate.getSessionId(arr => {
      let sessionId = '';
      console.log('sessionId:' + arr.content.sessionId)
      if (arr.status) {
        sessionId = arr.content.sessionId;
        wx.request({
          url: '',
          method: "POST",
          header: { "Cookie": 'JSESSIONID=' + sessionId },
          success:res=>{
            console.log(res)
          }
        })
      } else { wx.showModal({ title: "警告", content: "获取sessionId出错." }); }
    });
  },
})