//app.js 

// 禅道地址 http://192.168.100.13/zentao/my/  zhongyifu 123456
App({
  onLaunch: () => { },
  userLogin: () => {
    let _that = this;
    const url = 'https://www.hxtschool.xyz/leaflink-recruiter-web/';
    return new Promise(function (resolve, reject) {
      wx.login({
        success: result => {
          if (result.code) {
            // console.log('用户授权登录，code值为：' + result.code);
            wx.request({
              url: url + 'login/miniProgramcLogin.json',
              data: { "code": result.code },
              success: res => {
                if (res.data.status == 10000) {
                  let storageData = { 'sessionId': res.data.data.sessionId };
                  wx.setStorageSync('wechat_session', storageData);
                  _that.globalData.sessionId = res.data.data.sessionId;
                  resolve(res.data);
                } else {
                  reject('error');
                  wx.showModal({ title: '警告', content: '登录失败，状态：' + res.data.status });
                }
              },
              fail: res =>{
                wx.showModal({ title:'警告',content:'接口调用失败！'});
              }
            });
          } else {
            reject("error");
          }
        }
      });
    })
  },
  globalData: {
    userInfo: null,
    sessionId: null,
    // mapAk: 'm64BiNF0ohF4A6zGYxgAx8mZdMpe2pgK',
    mapAk: 'mlRdXCvj5cYSHUQHYGzVr45GTrRgSBZc',
    baseUrl: 'http://localhost:8082/', //环境变量
    // baseUrl: 'https://www.hxtschool.xyz/leaflink-recruiter-web/', //环境变量
  }
})