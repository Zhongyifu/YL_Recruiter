// pages/tabBar/JobSeeker/JobSeeker.js
const app = getApp();
const url = app.globalData.baseUrl;
const codeString = app.globalData.codeString;
const getDate = require('../../../utils/getData.js');
let allJobTypeNode = [];
// 分类处理获得的职位类型的数据
let jobTypeNode_ones = [];
let jobTypeNode_twos = [];
let jobTypeNode_threes = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sessionId:'',

    seekerList: [], 
    isEmptyText:'没有更多了',
    // 搜索相关
    searchInput: '',
    search_faker:'',

    more_eduList:[],
    eduId:'',
    eduId_faker:"",

    more_satatus:[],
    statusId:'',
    statusId_faker:'',

    salaryId: "",
    salaryList: [],

    experienceList: [],
    expId: '',
    // 职位类型相关
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
    // 模态框弹出状态
    isOpen_jobType:false,
    isOpen_exp:false,
    isOpen_more:false,
    // 分页
    pageStart:1
  },

  // all search function
  searchAllDate: function () {
    const _that = this;
    let pageStart = _that.data.pageStart;
    wx.request({
      url: url +"applicantInfo/getApplicantInfoListByParams.json",
      method:'POST',
      data:JSON.stringify({"rows":5,
      "pageStart": pageStart,
      "userName": _that.data.searchInput,
      "jobThreeId": _that.data.jobTypeId,
      "workingLifeTypeId": _that.data.expId,
      "educationalBackgroundTypeId": _that.data.eduId,
      "salaryRangeTypeId": _that.data.salaryId,
      "applicantStatusTypeId":_that.data.statusId
     }),
      success: (res) => {
        if (res.data.status == 10000) {
          let dataJson = res.data.data.list;
          if (dataJson == null && pageStart == 1){ _that.setData({ seekerList: null }); }
          else if (dataJson != null && pageStart == 1){ _that.setData({ seekerList:dataJson,isEmptyText:'下拉加载更多'})}
          else if (dataJson != null && pageStart > 1){
            let oldList = _that.data.seekerList;
            let newList = oldList.concat(dataJson);
            _that.setData({ seekerList:newList });
          }
          console.log(dataJson)
          console.log(dataJson =='')
          console.log(dataJson == null)
          if (dataJson == null ){
            _that.setData({ isEmptyText: '没有更多了' });
          } else {
            if (0 < dataJson.length < 5) { _that.setData({ isEmptyText: '没有更多了' }); }
            else if (dataJson.length == 5) { _that.setData({ isEmptyText: '下拉加载更多' }); }
          }
        } else {
          wx.showModal({
            title: '警告',
            content: '搜索接口出错，状态：' + res.data.status,
          });
        }
      }
    })
  },

  // input search 
  searchInput: function (e) {
    this.setData({
      search_faker: e.detail.value
    });
  },

  searchBtn: function (e) {
    this.setData({ searchInput: this.data.search_faker, pageStart:1 });
    this.searchAllDate();
  },

  //search function: 
  // jobType
  searchJobType: function () {
    const _that = this;
    if(_that.data.isOpen_jobType){
      _that.modal_searchJobType.closeModal();
    } else {
      _that.modal_searchJobType.showModal();
    }
    _that.setData({ isOpen_jobType:!_that.data.isOpen_jobType,isOpen_exp:false,isOpen_more:false});
    _that.modal_searchExperience.closeModal();
    _that.modal_more.closeModal();
  },
  openNodeTwo: function (e) {
    const _that = this;
    let status = _that.data.openNodeTwo;
    if (status) {
      _that.setData({ openNodeTwo: false });
    } else {
      let index = e.currentTarget.dataset.index;
      setJobTypeNode_two(index, _that);
      _that.setData({  openNodeTwo: true, checked_index_one: index  });
    }
  },
  openNodeThree: function (e) {
    const _that = this;
    let status = _that.data.openNodeThree;
    if (status) {
      _that.setData({  openNodeThree: false });
    } else {
      let index_two = e.currentTarget.dataset.index;
      let index_one = _that.data.checked_index_one;
      setJobTypeNode_three(index_one, index_two, _that);
      _that.setData({ openNodeThree: true });
    }
  },
  selectedItem: function (e) {
    const _that = this;
    let idStr = e.currentTarget.dataset.tid;
    let text = e.currentTarget.dataset.text;
    _that.setData({  jobTypeId: idStr,  jobType_faker: text });
  },
  submitJobType: function (e) {
    if (this.data.jobType_faker != '') {
      this.setData({ jobType: this.data.jobType_faker,pageStart:1,isOpen_jobType:false });
      this.searchAllDate();
    }
    this.modal_searchJobType.closeModal();
  },

  // experience
  searchExperience: function () {
    const _that = this;
    getDate.getWorkExp( arr => { _that.setData({ experienceList:arr });});
    if(_that.data.isOpen_exp){ _that.modal_searchExperience.closeModal(); } 
    else { _that.modal_searchExperience.showModal(); }
    _that.setData({ isOpen_jobType:false,isOpen_exp:!_that.data.isOpen_exp,isOpen_more:false });
    _that.modal_more.closeModal();
    _that.modal_searchJobType.closeModal();
  },
  selectExp: function (e) {
    this.setData({ expId:e.currentTarget.dataset.index,pageStart:1,isOpen_exp:false });
    this.searchAllDate();
    this.modal_searchExperience.closeModal();
  },

  // more 
  searchMore:function(){
    const _that = this;
    // 获取学历相关
    getDate.getDegree( eduList =>{ _that.setData({ more_eduList: eduList }); });
    // 获取 求职状态相关
    getDate.getSeekStatus( statusList =>{ _that.setData({ more_satatus: statusList}); });
    if(_that.data.isOpen_more){ _that.modal_more.closeModal();}
    else { _that.modal_more.showModal(); }
    _that.setData({ isOpen_jobType:false,isOpen_exp:false,isOpen_more:!_that.data.isOpen_more });
    _that.modal_searchExperience.closeModal();
    _that.modal_searchJobType.closeModal();
  },

  selectEducation:function(e){
    this.setData({ eduId_faker:e.currentTarget.dataset.index});
  },

  selectStatus:function(e){
    this.setData({ statusId_faker:e.currentTarget.dataset.index});
  },
  
  submitMoreSearch:function(e){
    const _that = this;
    _that.setData({
      eduId:_that.data.eduId_faker,
      statusId:_that.data.statusId_faker,
      pageStart:1,
      isOpen_jobType:false,
      isOpen_exp:false,
      isOpen_more:false
    });
    _that.searchAllDate();
    _that.modal_more.closeModal();
  },

  // 触底加载下一个分页的数据
  onReachBottom:function(){
    this.setData({  pageStart: this.data.pageStart + 1  });
    this.searchAllDate();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _that = this;

    // 判断进入页面的用户是否注册了账号
    getDate.getSessionId(arr =>{
      let sessionId = '';
      // console.log('sessionId:'+ arr.content.sessionId)
      if(arr.status){
          sessionId = arr.content.sessionId;
          wx.request({
            url: url + 'login/checkSession.json',
            header:{ "Cookie":'JSESSIONID=' + sessionId },
            success: res_check =>{
              if(res_check.data.status == 20022){
                wx.login({
                  success: res_login =>{ 
                    wx.request({
                      url: url + 'login/miniProgramcLogin.json',
                      data:{ "code": res_login.code },
                      success: res_mini =>{
                        if ( res_mini.data.status == 10000) {
                          // 判断用户是否已经注册
                          //  console.log(res_mini.data.data.unRegister)
                           let storageData = { 'sessionId': res_mini.data.data.sessionId };
                           wx.setStorageSync('wechat_session', storageData);
                           _that.setData({ sessionId: sessionId });
                          if( res_mini.data.data.unRegister === '0'){
                            // 未注册
                            wx.showModal({
                              title:"提示",
                              content:"您还未绑定手机号码，请前往绑定",
                              success:()=>{ wx.redirectTo({ url:'../../login/bind/bindUser' }); } });
                          } else{
                            _that.onLoad();
                          }
                        } else { wx.showToast({ title: '登录失败' }); }
                      }
                    });
                  }
                });
              } else if(res_check.data.status ==10000 ){
                wx.login({
                  success:res_login =>{
                    wx.request({
                      url:url+'login/checkBind.json',
                      data:{"code": res_login.code },
                      header:{"Cookie":'JSESSIONID=' + sessionId },
                      success: res_bind =>{
                        // console.log('checkBind：'+ res_bind.data.status)
                        if( res_bind.data.status == 20016){
                          _that.modal_searchJobType = _that.selectComponent('#search_jobType');
                          _that.modal_searchExperience = _that.selectComponent('#search_experience');
                          _that.modal_more = _that.selectComponent('#search_more');
                          // 获取列表数据
                          wx.request({
                            url: url + "applicantInfo/getApplicantInfoListByParams.json",
                            method: 'POST',
                            data: JSON.stringify({ "pageStart": 1, "rows": 5 }),
                            success: res => {
                              if (res.data.status == 10000) {
                                // console.log(res.data.data.list)
                                _that.setData({ seekerList: res.data.data.list });
                              }
                            }
                          });
                          // 获取搜索项，职位类型的相关数据
                          getDate.getJobType(function (arr) {
                            allJobTypeNode = arr;
                            setJobTypeNode_one(_that)
                          });
                        } else if(res_bind.data.status == 10000 ){
                          wx.showModal({
                            title:"提示",
                            content:"您还未绑定手机号码，请前往绑定",
                            success:()=>{  wx.redirectTo({ url:'../../login/bind/bindUser'}); }
                          });
                        }
                      }
                    });
                  }
                });
              }
            },
            fail: res_check =>{  console.log(res_check) }
          });
      }else{  wx.showModal({ title:"警告",  content:"获取sessionId出错."  }); }
    });

    // getDate.getSessionId(arr =>{
    //   let sessionId = '';
    //   if( arr.status ){
    //     sessionId = arr.content.sessionId;
    //     app.userLogin().then( res => {
    //       console.log('promise 方法回调');
    //       console.log(res);
    //       if(res.errorCode == 0){ }
    //     });
    //   }
    // });
  },
})

// sfm 第二层数据的标识
// tfm 第三层数据的标识
const setJobTypeNode_one = (that) => { // onde one
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

const setJobTypeNode_two = (index, that) => { // two
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

const setJobTypeNode_three = (column0, column1, that) => { // three
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