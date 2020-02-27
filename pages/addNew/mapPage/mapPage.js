const bdMap = require('../../../utils/bmap-wx.min.js');
const appInst =  getApp();
const url = appInst.globalData.baseUrl;
const mapAK = appInst.globalData.mapAk;
const BaiduMAP = new bdMap.BMapWX({ ak: mapAK });
let wxMarkerData = [];
Page({
  data: {
    latitude: '',
    longitude: '',
    markers: [{
      id:0,
      iconPath:'/images/makerIcon_sm.png',
      latitude:'',
      longitude:''
    }],
    companyAddress: "",
    supplement: '',

    // 判断输入的地址是否正确
    isTrueAddress: false,

    provinceData:[],
    pid:'',
    pid_old:'',
    pValue:'',
    pValue_f:'',
    cityData:[],
    cid:'',
    cid_old:'',
    cValue:'',
    cValue_f:'',
    districtData:[],
    did:'',
    dValue:'',
    dValue_f:''
  },

  chooseProvince:function () { this.modal_proveince.showModal(); },
  selectProvince:function(e){ this.setData({ pid: e.currentTarget.dataset.pid,pValue_f: e.currentTarget.dataset.ptext });},
  cancelProvince:function(){ this.modal_proveince.closeModal();},
  submitProvince:function(e){
    let oldPID = this.data.pid_old;
    let newPID = this.data.pid;
    // debugger;
    if( oldPID != '' && newPID  != oldPID){
      // 用户重新选择了一个选项
      this.setData({ cValue:'', dValue:'',cid:'',cid_old:'',did:'' });
    }
    getCityData(this.data.pid,this);
    this.setData({ pValue:this.data.pValue_f, pid_old: newPID });
    this.modal_proveince.closeModal();
  },

  chooseCity:function(){ if(this.data.pValue ==""){ wx.showModal({title:"警告",content:"请先选择上一级级数据"}); return false }else{ this.modal_city.showModal();} },
  selectCity:function(e){ this.setData({ cid:e.currentTarget.dataset.cid, cValue_f:e.currentTarget.dataset.ctext }); },
  cancelCity:function(){ this.modal_city.closeModal();},
  submitCity:function(){
    let oldCID = this.data.cid_old;
    let newCID = this.data.cid;
    if( oldCID != '' && newCID != oldCID ){
      this.setData({ dValue:'',did:''});
    }
    getDistrictData(this.data.cid,this);
    this.setData({ cValue:this.data.cValue_f, cid_old: oldCID});
    this.modal_city.closeModal();
  },

  chooseDistrict:function(){ if(this.data.cValue ==''){ wx.showModal({title:"警告",content:"请先选择上一级数据"});}else{this.modal_district.showModal();}},
  selectDistrict:function(e){ this.setData({ did: e.currentTarget.dataset.did, dValue_f:e.currentTarget.dataset.dtext })},
  cancelDistrict:function(){ this.modal_district.closeModal(); },
  submitDistrict:function(){
    this.setData({ dValue:this.data.dValue_f });
    this.modal_district.closeModal();
  },
  
  inputSupplement: function(e) { this.setData({ supplement: e.detail.value }); },
  setLocation:function(){ 
    const _that = this;
    const data = this.data; 
    this.setData({ companyAddress: data.pValue + data.cValue + data.dValue + data.supplement});
    console.log("应该定位的地址：" + data.companyAddress)
    wx.request({
      url:'http://api.map.baidu.com/geocoding/v3/?address='+ data.companyAddress +'&city='+ data.cValue +'&output=json&ak='+ mapAK,
      method:'GET',
      success: res => {
        // console.log(res.data)
        if(res.data.status == 1 && res.data.msg == 'Internal Service Error:无相关结果'){
          _that.setData({ isTrueAddress:false }); 
          wx.showModal({ title:"警告",content:'请输入正确的地址' });
          return false;
        } else if(res.data.status == 0){
          let location = res.data.result.location;
          _that.setData({
            isTrueAddress: true,
            latitude: location.lat,
            longitude: location.lng,
            'markers[0].latitude': location.lat,
            'markers[0].longitude': location.lng,
            'markers[0].iconPath':'/images/makerIcon_sm.png'
          });
        } else {
          _that.setData({ isTrueAddress: false }); 
          wx.showModal({ title:"警告",content:'SDK接口出错，返回值：'+ res.data.status });
          return false;
        }
      },
      fail: res =>{ }
    })
  },

  completeBtn: function() {
    if(this.data.isTrueAddress){
      let districtId = this.data.did;
      let address= this.data.companyAddress;
      let latitude = this.data.latitude;
      let longitude = this.data.longitude;
      let pages =  getCurrentPages();
      // let curPages = pages[pages.length - 1];
      let prvePages = pages[pages.length - 2];
      prvePages.setData({ jobDistrictId:districtId,jobAddress:address,latitude:latitude,longitude:longitude });
      wx.navigateBack({ delta: 1 });
    } else {
      wx.showModal({
        title:"警告",
        content:'请填写正确的地址或者验证您输入的地址'
      });
      return false;
    }
  },

  onLoad: function(options) {
    const _that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) { wx.authorize({scope: 'scope.userLocation',success() {}})};
        wx.getLocation({
          type: 'wgs84',
          altitude: false,
          isHighAccuracy:true,
          success: (result)=>{
            _that.setData({
              latitude:result.latitude,
              longitude:result.longitude,
              makers:[{
                latitude: result.latitude,
                longitude: result.longitude,
              }]
            });
          },
        });
      }
    }); 
    // 初始化弹窗
    _that.modal_proveince = _that.selectComponent('#provinceModal');
    _that.modal_city = _that.selectComponent('#cityModal');
    _that.modal_district = _that.selectComponent('#districtModal');
    // 优先获取 行政区划：省 的具体数据
    wx.request({
      url:url + 'chinaProvince/getProvinceList.json',
      success: res => {
        // console.log(res.data.data)
        if(res.data.status == 10000){
          if(res.data.data != ''){
            _that.setData({ provinceData: res.data.data });
          } else {
            wx.showToast({ title:"获取数据为空",icon:'none' });
          }
        } else {
          wx.wx.showModal({ title: '警告', content: '接口调用出错，状态：' + res.data.status});
        }
      }
    });
    BaiduMAP.regeocoding({
      fail: (res) => { console.log(res); },
      success: (res) => { 
        wxMarkerData = res.wxMarkerData;
        _that.setData({
          markers: wxMarkerData,
          latitude: wxMarkerData[0].latitude,
          longitude: wxMarkerData[0].longitude
        });
      },
      // iconPath: '/images/makerIcon_sm.png',
      // iconTapPath: '/images/makerIcon_smb.png'
    });
  },
});

const getCityData = (pid,_that) =>{
  wx.request({
    url: url + 'chinaProvince/getCityList.json',
    method:"POST",
    data:JSON.stringify({"provinceId":pid}),
    success: res => {
      if(res.data.status == 10000){
        if(res.data.data != ''){
          _that.setData({ cityData: res.data.data });
        } else {
          wx.shotToast({ title:"为获取到任何市级数据", icon:'none' });
        }
      } else {
        wx.showModal({ title:'警告',  content:'接口调用出错，状态：' + res.data.status });
      }
    }
  });
}

const getDistrictData = (cid, _that) => {
  wx.request({
    url: url + 'chinaProvince/getDistrictList.json',
    method:'POST',
    data:JSON.stringify({"cityId":cid}),
    success: res => {
      if(res.data.status == 10000){
        if(res.data.data != ''){ _that.setData({ districtData:res.data.data });}
        else { wx.showToast({ title:'为获取到任何区划数据',icon:"none"});}
      } else {
        wx.showModal({  title:'警告',content:'接口调用出错,状态:' +res.data.status });
      }
    }
  });
}  

