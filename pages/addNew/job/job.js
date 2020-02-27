const setDate = require('../../../utils/getData.js');
const app = getApp();
const url = app.globalData.baseUrl;
let allJobTypeNode = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    jobName: '请填写',
    jobType: '请选择',
    jobSkill: '请选择',
    jobExperience: '请选择',
    jobEducation: '请选择',
    jobSalary: '请选择',
    jobIntro: '请填写',
    jobAddress: '请选择',
    jobDistrictId:'',
    longitude:'',
    latitude:'',
    jobName_faker:'',

    jobTypeNode_one: [],
    jobTypeNode_oneRs: jobTypeNode_ones,
    checked_index_one: '', // 用于确认第三层菜单的具体归属
    openNodeTwo: false,
    jobTypeNode_two: [],
    jobTypeNode_twoRs: jobTypeNode_twos,
    openNodeThree: false,
    jobTypeNode_three: [],
    jobTypeNode_threeRs: jobTypeNode_threes,
    jobTypeId: '', //被选中的职位类型id
    jobType_faker: "", //被选中的职位类型名称

    jobSkillNode: [],
    skillId: '',
    jobSkill_faker: '',

    jobExpNode: [],
    expId: '',
    jobExp_faker: '',

    jobEduNode: '',
    eduId: '',
    jobEdu_faker: '',

    jobSalaryNode: '',
    salaryId: '',
    jobSalary_faker: '',

    jobIntro_faker: '',
    jobIntroLenght: 0,
    isMax: false,

    allFakerDate:[],
  },
  updateJobName: function() { this.modal_editJobName.showModal();},
  editInput_jobName:function(e){  this.setData({ jobName_faker:e.detail.value}); },
  submitJobName:function(){  this.setData({ jobName: this.data.jobName_faker}); this.modal_editJobName.closeModal();},
  updateJobType: function() {
    const _that = this;
    _that.modal_editJobType.showModal();
  },
  openNodeTwo: function(e) {
    const _that = this;
    let status = _that.data.openNodeTwo;
    if (status) { _that.setData({ openNodeTwo: false }); } 
    else {
      let index = e.currentTarget.dataset.index;
      setJobTypeNode_two(index, _that);
      _that.setData({ openNodeTwo: true, checked_index_one: index  });
    }
  },
  openNodeThree: function(e) {
    const _that = this;
    let status = _that.data.openNodeThree;
    if (status) { _that.setData({  openNodeThree: false });  } 
    else {
      let index_two = e.currentTarget.dataset.index;
      let index_one = _that.data.checked_index_one;
      setJobTypeNode_three(index_one, index_two, _that);
      _that.setData({  openNodeThree: true });
    }
  },
  selectedItem: function(e) {
    const _that = this;
    let idStr = e.currentTarget.dataset.tid;
    let text = e.currentTarget.dataset.text;
    _that.setData({ jobTypeId: idStr, jobType_faker: text });
  },
  submitJobType: function(e) {
    if (this.data.jobType_faker != '') {  this.setData({ jobType: this.data.jobType_faker }); }
    this.modal_editJobType.closeModal();
  },

  updateJopbSkill: function(e) {
    const _that = this;
    _that.modal_editJobSkill.showModal();
  },
  inputJobSkill:function(e){
    this.setData({jobSkill_faker: e.detail.value });
  },
  // selectedSkill: function(e) {
  //   const _that = this;
  //   let skillId = e.currentTarget.dataset.labid;
  //   let text = e.currentTarget.dataset.text;
  //   _that.setData({skillId: skillId,jobSkill_faker: text });
  // },
  submitJobSkill: function(e) {
    const _that = this;
    if (_that.data.jobSkill_faker != '') { 
      let fakerString = _that.data.jobSkill_faker;
      let fixString = fakerString.replace(/，/g,',');
      let fakerArr = fixString.split(',');
      _that.setData({ jobSkill: fakerArr }); 
    }
    _that.modal_editJobSkill.closeModal();
  },

  updateJobExperience: function(e) {
    const _that = this;
    _that.modal_editJobExperience.showModal();
    setDate.getWorkExp( arr => { _that.setData({ jobExpNode: arr }); });
  },
  selectedExp: function(e) {
    const _that = this;
    let expId = e.currentTarget.dataset.typeid;
    let text = e.currentTarget.dataset.text;
    _that.setData({ expId: expId, jobExp_faker: text });
  },
  submitJobExp: function(e) {
    const _that = this;
    if (_that.data.jobExp_faker != '') {
      _that.setData({ jobExperience: _that.data.jobExp_faker });
      _that.modal_editJobExperience.closeModal();
    }
  },

  updateJobEducation: function(e) {
    const _that = this;
    _that.modal_editJobEducation.showModal();
    setDate.getDegree( arr => { _that.setData({ jobEduNode: arr }); });
  },
  selectedEdu: function(e) {
    const _that = this;
    let typeId = e.currentTarget.dataset.typeid;
    let text = e.currentTarget.dataset.text;
    _that.setData({eduId: typeId,jobEdu_faker: text});
  },
  submitJobEdu: function(e) {
    const _that = this;
    if (_that.data.jobEdu_faker != '') {_that.setData({jobEducation: _that.data.jobEdu_faker});}
    _that.modal_editJobEducation.closeModal();
  },

  updateJobSalary: function(e) {
    const _that = this;
    setDate.getSalary( arr => { _that.setData({jobSalaryNode: arr});});
    _that.modal_editJobSalary.showModal();
  },
  selectedSalary: function(e) {
    const _that = this;
    let typeId = e.currentTarget.dataset.typeid;
    let text = e.currentTarget.dataset.text;
    _that.setData({ salaryId: typeId, jobSalary_faker: text });
  },
  submitJobSalary: function(e) {
    const _that = this;
    if (_that.data.jobExp_faker != '') {_that.setData({ jobSalary: _that.data.jobSalary_faker }); }
    _that.modal_editJobSalary.closeModal();
  },

  updateJobIntro: function() { this.modal_updateJobIntro.showModal(); },
  inputJobIntro: function(e) {
    if (this.data.jobIntroLenght >= 51) {
      this.setData({ isMax: true });}
      else {
      this.setData({
        isMax: false,
        jobIntroLenght: e.detail.cursor,
        jobIntro_faker: e.detail.value
      });
    }
  },
  submitJobIntro: function(e) {
    this.setData({ jobIntro: this.data.jobIntro_faker });
    this.modal_updateJobIntro.closeModal();
  },

  updateJobAddress: function(e) {
    this.setData({ emptyValue:''});
    // _that.modal_editJobAddress.showModal();
    wx.navigateTo({ url: '../mapPage/mapPage'})
  },

  submitAllData:function(e){
    const _that = this;
    // console.log(_that.data);
    // return false;
    wx.showModal({
      title: '提示',
      content: '确定提交这个职位吗？',
      success(res) {
        let allDataJson = {};
        allDataJson.jobName = _that.data.jobName;
<<<<<<< HEAD
        allDataJson.jobTypeId = _that.data.jobType;
        allDataJson.skillLabelId = _that.data.jobSkill;
=======
        allDataJson.jobTypeId = _that.data.jobTypeId;
        allDataJson.skillLabelName = _that.data.jobSkill;
>>>>>>> 282a0282a1770843611da72881ed34e4f1e51b7a
        allDataJson.workingLifeTypeId = _that.data.expId;
        allDataJson.educationalBackgroundTypeId = _that.data.eduId;
        allDataJson.salaryRangeTypeId =  _that.data.salaryId;
        allDataJson.jobContent = _that.data.jobIntro;
        allDataJson.districtId = _that.data.jobDistrictId;
        allDataJson.address = _that.data.jobAddress;
        allDataJson.longitude = _that.data.longitude;
        allDataJson.latitude = _that.data.latitude;
        console.log(allDataJson)
<<<<<<< HEAD
=======
        // 数据验证
>>>>>>> 282a0282a1770843611da72881ed34e4f1e51b7a
        setDate.getSessionId( arr=> {
          let sessionId ='';
          if(arr.status){
            sessionId = arr.content.sessionId;
            wx.request({
              url: url + 'job/saveJob.json',
              method: 'POST',
              data: JSON.stringify(allDataJson),
              header: { 'Cookie': 'JSESSIONID=' + sessionId },
              // dataType: 'json',
              // responseType: 'text',
              success: function(res) {
                if(res.data.status == '10000'){
                  wx.showModal({
                    title: '提示',
                    content: '保存成功，是否继续添加？',
                    success:(res)=>{
                      if (res.confirm) {
                      // 点击确认，刷新本页面，继续添加
                      _that.onLoad();
                      } else if(res.cancel){
                      // 点击取消，跳转前往职位列表
                      wx.switchTab({
                        url: '../../tabBar/JobSeeker/JobSeeker',
                      })
                      }
                    },
                  })
                } else {
                  wx.showModal({ title:'警告',  content:"接口返回出错，状态：" + res.data.status });
                }
              },
              fail: function(res) {
                console.log('fail')
                console.log(res)
              },
            })
          }
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载   getSkillData
   */
  onLoad: function(options) {
    const _that = this;
    _that.modal_editJobName = _that.selectComponent('#editJobName');
    _that.modal_editJobType = _that.selectComponent('#editJobType');
    _that.modal_editJobSkill = _that.selectComponent('#editJobSkill');
    _that.modal_editJobExperience = _that.selectComponent('#editJobExperience');
    _that.modal_editJobEducation = _that.selectComponent('#editJobEducation');
    _that.modal_editJobSalary = _that.selectComponent('#editJobSalary');
    _that.modal_updateJobIntro = _that.selectComponent('#editJobIntro');
    // _that.modal_editJobAddress = _that.selectComponent('#editJobAddress');
    // 获取 预设的职位类型
    setDate.getJobType( arr =>{ allJobTypeNode = arr; setJobTypeNode_one(_that) });
    // console.log("jobDistrictId:"+_that.data.jobDistrictId)
    // console.log("jobAddress:"+_that.data.jobAddress)
    // if(Object.keys(options).length == 0){ console.log('options is null') } 
    // else {
    // const companyAddress = options.a;
    // const supplement = options.b;
    // _that.setData({ jobDistrictId: companyAddress,jobAddress: supplement });}
  }
})


// 分类处理获得的职位类型的数据
let jobTypeNode_ones = [];
let jobTypeNode_twos = [];
let jobTypeNode_threes = [];
// sfm 第二层数据的标识
// tfm 第三层数据的标识
let setJobTypeNode_one = (that) => { // onde one
  let item, num = 0;
  jobTypeNode_ones = [];
  for (let i = 0; i < allJobTypeNode.length; i++) {
    item = allJobTypeNode[i];
    if (item.sfm == undefined && item.tfm == undefined) {
      jobTypeNode_ones[num] = item;
      num++;
    }
  }
  that.setData({
    jobTypeNode_oneRs: jobTypeNode_ones
  });
}

let setJobTypeNode_two = (index, that) => { // two
  let item, num = 0;
  jobTypeNode_twos = [];
  for (var i = 0; i < allJobTypeNode.length; i++) {
    item = allJobTypeNode[i];
    if (item.sfm != undefined && item.ffm == jobTypeNode_ones[index].ffm && item.tfm == undefined) {
      jobTypeNode_twos[num] = item;
      num++;
    }
  }
  if (jobTypeNode_twos.length == 0) {
    jobTypeNode_twos[0] = {
      name: ''
    };
  }
  that.setData({
    jobTypeNode_twoRs: jobTypeNode_twos,
  });
}

let setJobTypeNode_three = (column0, column1, that) => { // three
  var item, num = 0;
  jobTypeNode_threes = [];
  for (var i = 0; i < allJobTypeNode.length; i++) {
    item = allJobTypeNode[i];
    if (item.tfm != undefined && item.ffm == jobTypeNode_ones[column0].ffm && item.sfm == jobTypeNode_twos[column1].sfm) {
      jobTypeNode_threes[num] = item;
      num++;
    }
  }
  if (jobTypeNode_threes.length == 0) {
    jobTypeNode_threes[0] = {
      name: ''
    };
  }
  that.setData({
    jobTypeNode_threeRs: jobTypeNode_threes,
  })
}