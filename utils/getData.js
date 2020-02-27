const app = getApp();
const url = app.globalData.baseUrl;
// 各项选择框的数据

// 行业数据
function getIndustryData(callBack) {
  let indList = [];
  wx.request({
    url: url + 'tradeType/findList.json',
    method:'POST',
    success(res) {
      indList = res.data.data;
      callBack(indList);
    }
  });
}

// 公司规模
function getScaleData(callBack) {
  let scale = [];
  wx.request({
    url: url + 'personnelSizeType/findList.json',
    method: 'POST',
    success: res => {
      scale = res.data.data;
      callBack(scale)
    }
  });
}

// 工作年限
function getWorkExperienceData(callBack) {
  let exp = [];
  wx.request({
    url: url + 'workingLifeType/findWorkingLifeList.json',
    method: 'POST',
    success: res => {
      exp = res.data.data;
      callBack(exp);
    }
  });
}

// 学历水平
function getDegreeData(callBack) {
  let degree = [];
  wx.request({
    url: url + 'educationalBackgroundType/findEducationalList.json',
    method:"POST",
    success(res) {
      degree = res.data.data;
      callBack(degree);
    }
  });
}

// 薪资范围
function getSalaryData(callBack) {
  let salary = this;
  wx.request({
    url: url + 'salaryRangeType/findSalaryList.json',
    success(res) {
      salary = res.data.data;
      callBack(salary);
    }
  });
}

// 职位类型
function getJobTypeData(callBack) {
  let jobType = this;
  wx.request({
    url: url + 'job/findJobList.json',
    method: 'POST',
    success(res) {
      jobType = res.data.data;
      callBack(jobType);
    }
  });
}

// 技能标签
function getSkillData(callBack){
  let skillList =  [];
  wx.request({
    url: url + 'workSkillLabel/findList.json',
    success(res) {
      skillList = res.data.data;
      callBack(skillList);
    }
  });
}

// 求职状态
const getSeekStatus = callBack =>{
  let statusList = [];
  wx.request({
    url: url + 'applicantStatusType/findList.json',
    method:"POST",
    success: res => {
      statusList = res.data.data;
      callBack(statusList);
    }
  })
}

// 获取后端session信息，用于判断用户的登录状态
const checkSession = () =>{
  // const url = 'http://localhost:8082';
  const url = 'https://www.hxtschool.xyz/leaflink-recruiter-web/';
  // let isLogin = true;
  let sessionValue = wx.getStorageSync('wechat_session');
  wx.request({
    url: url + 'login/checkSession.json',
    method:'POST',
    data: JSON.stringify({ "wechatSession": sessionValue }),
    success: res_check =>{
      // console.log(res.data.status);
      if(res_check.data.status == 20022){
        // 后端会话失效，需要重新登录
        wx.login({
          success: res_login =>{
            // console.log(res_login)
            wx.request({
              url: url + 'login/miniProgramcLogin.json',
              method:'POST',
              data:JSON.stringify({"code": res_login.code }),
              success: result => {
                // console.log(result)
                wx.setStorageSync("wechat_session", result.data.data);
              }
            });
          }
        });
      }
    }
  })
}

// 获取sessionId 
const getSessionId = callBack =>{
  let msg = {};
  wx.getStorage({
    "key":'wechat_session',
    complete: res =>{ 
      // console.log(res)
      // console.log('---------------- getSessionId')
      if(res.errMsg.split(':')[1] == 'ok'){
        // console.log('success');
        msg.content = res.data;
        msg.message = 'success';
        msg.status = true;
      } else if (res.errMsg.split(':')[1] == 'fail data not found'){
        // console.log('not found');
        msg.content = '';
        msg.message = 'success';
        msg.status = true;
      } else if (res.errMsg.split(':')[2] == 'data not found'){
        // console.log('not found');
        msg.content = '';
        msg.message = 'success';
        msg.status = true;
      } else {
        // console.log('fail')
        msg.message = 'fail';
        msg.status = false;
      }
      callBack(msg)
    }
  });
}

module.exports = {
  getIndustry: getIndustryData,
  getScale: getScaleData,
  getWorkExp: getWorkExperienceData,
  getDegree: getDegreeData,
  getSalary: getSalaryData,
  getJobType: getJobTypeData,
  getSkill: getSkillData,
  getSeekStatus:getSeekStatus,
  checkSession: checkSession,
  getSessionId:getSessionId
}