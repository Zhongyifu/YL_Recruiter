// pages/addNew/recruiter/recruiter.js
import WxValidate from '../../../utils/WxValidate.js'
// const WxValidate = require('../../../utils/WxValidate');
const until = require('../../../utils/util.js');
const getData = require('../../../utils/getData.js');
const app = getApp();
const url = app.globalData.baseUrl;
Page({
  data: {
    hR_HP: '',
    cheackSex: '男',
    userSex:'男', // init
    birthady: '',
    userBirthady: '',
    companyScope: '',
    companyScopes: [],
    industryList: [],
    isModalShow: false
  },

  close_Company: function(e) {
    if (e.detail.isShowModal == false) {  this.setData({ isModalShow: false }); }
  },

  onLoad: function(option) {
    let _that = this;
    _that.initValidate()
    _that.modal_Company = _that.selectComponent("#modal_Company");
    _that.modal_Industry = _that.selectComponent("#modal_Industry");
    _that.setData({
      birthday_staty: until.retirementDate(until.formatTime(new Date)),
      birthday_end: until.formatTime(new Date)
    });
    //  后期可以将 communication/myinfo/myinfo 整合在一起
    // let key = option.key;
    // if(key == 'register'){
    //   // 由注册进入
    // } else if ( key == 'info'){
    //   // 由详情进入
    //   getData.getSessionId( arr => {
    //     let sessionId = '';
    //     if(arr.status){
    //       sessionId = arr.content;
    //       wx.request({
    //         url: url + 'recruiterInfo/getRecruiterInfo.json',
    //         method:'POST',
    //         header:{"Cookie":'JSESSIONID=' + sessionId},
    //         success: res =>{
    //           console.log(res)
    //           if(res.data.status == 10000){
    //             if(res.data.data != ''){
    //               let dataJson = res.data.data;
    //               _that.setData({
    //                 hR_HP:dataJson.recruiterImg,
    //                 userBirthady: dataJson.
    //               });
    //             } else {
    //               wx.showModal({ title:"警告",  content:'接口返回数据为空'})
    //             }
    //           } else {
    //             wx.showModal({ title:"警告",  content:"接口返回出错,状态：" + res.data.status });
    //           }
    //         }
    //       });
    //     }
    //   });
    // }
  },

  chooseHP: function(e) {
    let _that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        let path = res.tempFilePaths[0];
        getData.getSessionId( arr =>{
          let sessionId = '';
          if(arr.status){
            sessionId = arr.content.sessionId;
            wx.showLoading({ title: '上传中...' });
            // 上传到服务器缓存
            wx.uploadFile({
              url: url + 'uploadphoto/uploadCachePhoto.json',
              filePath: path,
              name: 'file',
              formData: { 'file': path  },
              header: {
                'content-type': 'multipart/form-data',
                'Cookie': 'JSESSIONID=' + sessionId
              },
              success: res_upload => {
                // console.log(res_upload.data)
                let dataJson = JSON.parse(res_upload.data);
                // console.log(dataJson)
                let imgCashUrl = dataJson.data;
                // 上传到服务器
                wx.request({
                  url: url + 'register/updateUserImg.json',
                  data: {  'img': imgCashUrl  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Cookie': 'JSESSIONID=' + sessionId
                  },
                  success: result => {
                    if(result.data.status == 10000){ _that.setData({ hR_HP: path,userHP: result.data.data });}
                    else { wx.showModal({ title:"警告",content:'接口错误，状态：' + res.data.status });}
                  },
                  complete: result => {
                    wx.hideLoading();
                  }
                })
              }
            });
          }
        });
      }
    })
  },

  chooseSex: function(e) {
    let _that = this;
    _that.setData({ userSex: e.detail.value });
  },

  chooseBirthady: function(e) {
    this.setData({ userBirthady: e.detail.value, isBirthday: true });
  },

  chooseCompany: function(e) {
    let _that = this;
    let isEmpty_ind = _that.data.industryList;
    let isEmpty_sca = _that.data.companyScopes;
    // console.log(isEmpty_ind == '')
    _that.modal_Company.showModal();
    _that.setData({ isModalShow: true });
    if (isEmpty_ind == ''){  getData.getIndustry( arr => {  _that.setData({ industryList: arr  }); });  }
    else { _that.setData({ industryList: isEmpty_ind });}
    if (isEmpty_sca == '') { getData.getScale(arr => { _that.setData({ companyScopes: arr }); }) }
    else { _that.setData({ companyScopes: isEmpty_sca }); }
  },

  chooseScope: function(e) {
    let _that = this;
    _that.setData({
      scopeIdx: e.detail.value,
      companyScope: _that.data.companyScopes[e.detail.value].typeId,
      isScope: true
    });
  },

  chooseIndustry: function() {
    this.modal_Industry.showModal();
  },

  submit_Industry: function(e) {
    let _that = this;
    _that.setData({
      indCheck: e.currentTarget.dataset.id,
      indText: e.currentTarget.dataset.text,
      indChectStatus: true
    });
    _that.modal_Industry.closeModal();
  },

  companyInfoForm: function(e) {
    let _that = this;
    // 把数据缓存起来，等待主页面的提交一起提交
    let companyName = e.detail.value.companyName;
    let comanyProfile = e.detail.value.comanyProfile;
    let companyIndustry = _that.data.indCheck;
    let companyScale = _that.data.companyScope;
    let companyInfo = {};
    companyInfo.companyName = companyName;
    companyInfo.comanyProfile = comanyProfile;
    companyInfo.companyIndustry = companyIndustry;
    companyInfo.companyScale = companyScale;
    wx.setStorage({ key: 'companyInfo', data: companyInfo, });
    _that.modal_Company.closeModal();
    // 把公司全称传到主页面用作显示
    _that.setData({  companyName: companyName,  isCompany: true  });
  },

  userInfoFomr: function(e) {
    let _that = this;
    let userHP = _that.data.userHP;
    let userSex = _that.data.userSex;
    let userName = e.detail.value.userName;
    let userBirthady = _that.data.userBirthady;
    let userEmail = e.detail.value.userEmail;
    let userJob = e.detail.value.userJob;
    let userPhone = e.detail.value.userPhone;
    let userCompany = '';
    let validateJson = {};
    validateJson.userName = userName;
    validateJson.userBirthady = userBirthady;
    validateJson.userEmail = userEmail;
    validateJson.userPhone = userPhone;
    validateJson.userJob = userJob;

    getData.getSessionId( arr => {
      let sessionId ='';
      if(arr.status){
        sessionId = arr.content.sessionId;    // 获取公司的信息
        wx.getStorage({
          key: 'companyInfo',
          success: res => {
            userCompany = res.data;
            // 验证数据
            if (!_that.WxValidate.checkForm(validateJson)) {
              const error = this.WxValidate.errorList[0];
              _that.showError(error);
              return false;
            } 
            wx.showLoading({  title: '提交中...' });
            // 发起请求
            wx.request({
              url: url + 'register/updateRecruiterInfo.json',
              method:"POST",
              header: { 'Cookie': 'JSESSIONID=' + sessionId },
              data:JSON.stringify({
                'userName': userName,
                'userSex': userSex,
                'userImg': userHP,
                'userBirthday': userBirthady,
                'recruiterMail': userEmail,
                'recruiterJob': userJob,
                'userPhone': userPhone,
                'companyFullName': userCompany.companyName,
                'companyIntroduction': userCompany.comanyProfile,
                'companyTradeTypeId': userCompany.companyIndustry,
                'companySizeTypeId': userCompany.companyScale
              }),
              success: res =>{
                // console.log(res);
                if(res.data.status == 10000){
                  wx.showToast({title:'保存成功',icon:'success'});
                  // wx.switchTab({ url: '../../tabBar/JobSeeker/JobSeeker', });
                  wx.reLaunch({ url:'../job/job'});
                }
              }
            });
          },
          fail: res => {
            wx.showModal({
              title: '警告',
              content: '请填写您任职公司的相关信息',
            })
          }
        });
      }else{  wx.showModal({  title:"警告", content:"获取sessionId出错." }); }
    });
  },

  //关于表单验证的弹窗提示
  showError: function (error) {
    wx.showModal({
      content: error.msg,
      showCancel: true
    });
  },

  //配置验证规则
  initValidate: function(e) {
    const rules = {
      userName: {
        required: true,
        rangelength: [2, 4]
      },
      userEmail: {
        required: true,
        email: true
      },
      userBirthady: {
        required: true
      },
      userJob:{
        required: true
      },
      userPhone:{
        tel:true,
        required:true
      }
    };
    const ruleMsg = {
      userName: {
        required: '请填写您的真实姓名',
        rangelength: '请填写正确的姓名'
      },
      userEmail: {
        required: '请填写您的E-Mail',
        email: '请填写正确的E-Mail地址'
      },
      userBirthady: {
        required: '请填写您的出生日期'
      },
      userJob:{
        required:'请填写您的现任职位'
      },
      userPhone:{
        tel:'请填写正确的手机号码',
        required:'请填写您的手机号码'
      }
    };

    this.WxValidate = new WxValidate(rules, ruleMsg);
  },
});