// pages/communication/setting/setting.js
const app = getApp();
const url = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkRemind:false,
    greetingStr1:'',
    greetingStr2:'',
    greetingStr3:'',
    isSendMsgInterview: true,
    isSendSMSInterview: true,
    isAutoGreeting: true,
    isDefault_gs1:false,
    isDefault_gs2:false,
    isDefault_gs3:false,
    userPhone:'',
    userPhone_faker:''
  },

  updateRemind: function(e) {
    const _that = this;
    let status = e.detail.value;
    let oldStatus = _that.data.isSendMsgInterview;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: url + 'recruiterInfo/updateIsInterviewReminder.json',
      method: 'POST',
      data: JSON.stringify({ 'isInterviewReminder': status }),
      success(res) {
        if (res.statusCode === 200) {
          _that.setData({ isSendMsgInterview: !oldStatus });
          wx.showToast({
            title: '成功',
            duration: 1500
          });
        } else {
          wx.showModal({
            title: '警告',
            content: '接口调用出错，状态：'+ res.statusCode,
          })
        }
      }
    });
    wx.hideLoading();
  },

  updateSMS:function(e){
    const _that = this;
    let status = e.detail.value ? '1':'0';   
    let oldStatus = _that.data.isSendSMSInterview;  
    wx.showLoading({ title: '操作中...' });
    wx.request({
      url: url + 'recruiterInfo/updateIsMessageReminder.json',
      method:'POST',
      data: JSON.stringify({'isMessageReminder':status}),
      success:res=>{
        if(res.statusCode == 200){
          wx.showToast({
            title: '成功',
          });
        _that.setData({ isSendSMSInterview: !oldStatus });
        
        } else {
          wx.showModal({
            title: '警告',
            content: '接口调用出错，状态:' + res.statusCode,
          })
        }
      }
    });
    wx.hideLoading();
  },


  updateGreeting:function(e){
    const _that = this;
    _that.modal_editGreeting.showModal();
    let gs0 = '';
    let gs1 = '';
    let gs2 = '';
    let de0 = false;
    let de1 = false;
    let de2 = false;
    // 发起请求获取用户已经设置过的问候语
    wx.request({
      url: url + 'greet/findList.json',
      success:res=>{
        if(res.statusCode == 200){
          if(res.data != null){
            let dataJson = res.data.data;
            console.log(dataJson)
            for(let item in dataJson){
              if (item == 0) { gs0 = dataJson[item].greetContent; de0 = dataJson[item].isDefault == '1' ? true : false }
              else if (item == 1) { gs1 = dataJson[item].greetContent; de1 = dataJson[item].isDefault == '1' ? true : false }
              else if (item == 2) { gs2 = dataJson[item].greetContent; de2 = dataJson[item].isDefault == '1' ? true : false }
            }
            _that.setData({
              greetingStr1: gs0,
              isDefault_gs1:de0,
              greetingStr2: gs1,
              isDefault_gs2: de1,
              greetingStr3: gs2,
              isDefault_gs2: de2,
            });
          }
        }
      }
    })
  },

  updateAutoGreeting:function(e){
    const _that = this;
    let status = e.detail.value;
    let oldStatus = _that.data.isAutoGreeting;
    wx.showLoading({ title: '操作中...' });
    wx.request({
      url: url + 'recruiterInfo/updateIsSendDefaultGreet.json',
      method:'POST',
      data: JSON.stringify({ isSendDefaultGreet: status}),
      success: res =>{
        if(res.statusCode == 200){
          wx.hideLoading();
          wx.showToast({
            title: '成功',
          });
          _that.setData({ isAutoGreeting: !oldStatus });
        } else {
          wx.showModal({
            title: '警告',
            content: '接口调用出错,状态：'+ res.statusCode,
          })
        }
      }
    })
  },

  editGreetingForm:function(e){
    let formJson = e.detail.value;
    console.log(formJson);
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: url + 'greet/update.json',
      method:'POST',
      data: formJson,
      success(res){
        if(res.statusCode === 200){
          wx.showToast({
            title: '成功',
          }),
          wx.hideLoading();
        }
      }
    })
  },

  changeGreetion:function(e){
    const _that = this;
    console.log(e)
    let gid = e.detail.value;
    wx.request({
      url: url + 'recruiterInfo/updateDefaultGreetIdByRercruiterId.json',
      method:"POST",
      data: JSON.stringify({ 'defaultGreetId': gid}),
      success: res => {
        if(res.statusCode == 200){
          wx.showToast({
            title: '修改成功',
          });
        }
      }
    });
  },

  updateUserPhone:function(e){
    const _that = this;
    _that.modal_editUserPhone.showModal();
    // 发起请求获取用户之前设置的手机号码
    wx.request({
      url: url + 'recruiterInfo/getRecruiterPhone.json',
      method:"POST",
      success: res =>{
        let dataJson = res.data;
        if (dataJson.status == 10000){
          _that.setData({
            userPhone: dataJson.data.recruiterPhone
          });
        }
      }
    })
  },
  editInput_userPhone:function(e){
    let fakerValue = e.detail.value;
    this.setData({
      userPhone_faker: fakerValue
    });
  },
  submitUserPhone:function(e){
    const _that = this;
    wx.showLoading({
      title: '操作中...',
    });
    let phone = _that.data.userPhone_faker;
    const test = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (test.test(phone)){
      wx.request({
        url: url + 'recruiterInfo/updateRecruiterPhone.json',
        method:'POST',
        data: JSON.stringify({ 'userPhone': phone}),
        success:res =>{
          if(res.data.status == 10000){
            wx.showToast({
              title: '修改成功',
            });
            _that.modal_editUserPhone.closeModal();
          }
        }
      })
    } else {
      wx.showModal({
        title: '警告',
        content: '输入的手机号码有误',
      });
      wx.hideLoading();
      return false;
    }
    wx.hideLoading();
  },

  loginOut: function(e) {
    wx.showModal({
      title: '警告',
      content: '确定要退出吗？',
      success(res) {
        if (res.confirm) {
          wx.reLaunch({
            url: '../login/login/login',
          });
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _that = this;
    _that.modal_editGreeting = _that.selectComponent('#editGreeting');
    _that.modal_editUserPhone = _that.selectComponent('#editUserPhone');
    // 调用接口，获取提醒设置的状态
    wx.request({
      url: url + 'recruiterInfo/getSetting.json',
      method:'POST',
      success:res=>{
        if(res.statusCode == 200){
          if(res.data.data != null){
            let dataJson = res.data.data;
            // 面试发送消息
            if (dataJson.isInterviewReminder == '1'){
              _that.setData({ isSendMsgInterview: true });
            } else if (dataJson.isInterviewReminder == '0') {
              _that.setData({ isSendMsgInterview: false });
            }
            //面试发送短信
            if (dataJson.isMessageReminder =='1'){
              _that.setData({ isSendSMSInterview: true });
            } else if (dataJson.isMessageReminder == '0'){
              _that.setData({ isSendSMSInterview: false });
            }
            // 招呼设置
            if (dataJson.isSendDefaultGreet == '1'){
              _that.setData({ isAutoGreeting: true });
            } else if (dataJson.isSendDefaultGreet == '0') {
              _that.setData({ isAutoGreeting: false });
            }
          }
        }
      }
    })
  },
})