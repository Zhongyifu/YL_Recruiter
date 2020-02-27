// pages/tabBar/companyInfo/companyInfo.js
const baiduMap = require('../../../utils/bmap-wx.min.js');
const app = getApp();
const url = app.globalData.baseUrl;
const mapAK = app.globalData.mapAk;
let wxMarkerData = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataJson:[],
    isHidden: {
      "status": true,
      "btnText": "查看全文"
    },
    isAICHidden:{
      "status": true,
      "btnText": "查看全部"
    },
    markers: [], 
    latitude: '',
    longitude: '',
    showAllAIC:false,
    fakerPhoto: ['http://b-ssl.duitang.com/uploads/item/201612/19/20161219010308_TiJhN.jpeg', 'http://pic2.zhimg.com/50/v2-1c3bd9fe6c6a28c5ca3a678549dfde28_hd.jpg','http://pic1.zhimg.com/50/v2-bf96fb79c5290318bfb4b3f70c8f88e4_hd.jpg']
  },

  showMore: function(e) {
    const _that = this;
    const status = _that.data.isHidden.status;
    _that.setData({
      isHidden: {
        "status": !status,
        "btnText": status ? "收起" : '查看全文'
      }
    });
  },

  previewImage:function(e){
    const _that = this;
    let imageSRC = e.currentTarget.dataset.src;
    let srcList = _that.data.fakerPhoto;
    wx.previewImage({
      urls: [imageSRC],
      current: imageSRC,
    })
  },

  showAllAICinfo:function(e){
    const _that = this;
    const status = _that.data.isAICHidden.status;
    _that.setData({
      isAICHidden:{
        'status':!status,
        'btnText': status ? '收起':'查看全部'
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _that = this;
    // 初始化地图数据
    const BMap = new baiduMap.BMapWX({
      'ak': mapAK
    });
    let fail = function (data) {
      console.log(data)
    };
    let success = function (data) {
      wxMarkerData = data.wxMarkerData;
      _that.setData({
        markers: wxMarkerData,
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude
      });
    }
    // 初始化页面数据
    wx.request({
      url: url + 'companyInfo/getCompanyInfo.json',
      method:'POST',
      data: JSON.stringify({"companyId":"01"}),
      success: res =>{
        // console.log(res)
        if(res.data.status == 10000){
          let dataJson = res.data.data;
          console.log(dataJson);
          if (res.data.data == ''){
            wx.showModal({
              title: '警告',
              content: '接口调用成功，但是返回了空数据',
            });
          } else {
            _that.setData({ dataJson:res.data.data });
            BMap.geocoding({
              address: res.data.data.address,
              fail: fail,
              success: success,
              iconPath: '../../../images/makerIcon_sm.png',
              iconTapPath: '../../../images/makerIcon_smb.png'
            });
          }
        }
      }
    });
  },

  onReady() {
  },
})