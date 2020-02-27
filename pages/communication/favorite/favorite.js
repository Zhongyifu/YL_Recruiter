// pages/communication/favorite/favorite.js
const app = getApp();
const url = app.globalData.baseUrl;
let listData = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listDataJson:[],
    isEmptyText: '无更多数据',
    searchValue:'',
    searchUse:'',
    pageStart:1
  },

  searchData:function(e){
    const _that = this;
    let parameter1 = _that.data.searchUse;
    let parameter2 = _that.data.pageStart;
    let oldList = _that.data.listDataJson;
    let oldStatus = _that.data.isEmptyText;
    wx.request({
      url: url + 'applicantInfo/getListByRecruiterCollection.json',
      method: 'POST',
      data: JSON.stringify({ "pageStart": parameter2, "row": 5, "userName": parameter1 }),
      success: res => {
        if (res.data.status == 10000) {
          let dataJson = res.data.data.list;
          if (dataJson != '' && parameter2 == 1) { //第一页的数据
            _that.setData({ listDataJson: oldList });
          } else if (dataJson == '' && parameter2 == 1){ // 当没有数据
            _that.setData({ listDataJson: null, isEmptyText: '暂无数据'});
          } else if (dataJson != '' && parameter2 > 1){ // 加载其他分页的数据
            let resList = oldList.concat(dataJson);
            _that.setData({ listDataJson: resList });
          }
          if (dataJson.length = 5) { _that.setData({ isEmptyText: '下滑加载更多' }); }
          else if (0 < dataJson.length < 5) { _that.setData({ isEmptyText: '没有更多了' }); }
        }
      }
    });
  },
  
  showInfo: function (e) {
    let _that = this;
    let index = e.currentTarget.dataset.index;
  },
  searchName: function (e) {
    this.setData({
      searchValue: e.detail.value
    });
  },
  searchBtn:function(e){
    const _that = this;
    _that.setData({
      searchUse: _that.data.searchValue
    });
    _that.searchData();
  },

  // 触底加载下一个分页的数据
  onReachBottom:function(){
    this.setData({
      pageStart: this.data.pageStart + 1
    });
    this.searchData();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _that = this;
    _that.modal_Info = _that.selectComponent("#favoriteInfo");
    // 默认加载第一页
    wx.request({
      url: url + 'applicantInfo/getListByRecruiterCollection.json',
      method: 'POST',
      data: JSON.stringify({ 'pageStart': 1, 'row': 5 }),
      success: res => {
        if (res.data.status == 10000) {
          if (res.data.data.list != null) {
            let dataJson = res.data.data.list;
            _that.setData({ listDataJson: dataJson});
            if (dataJson.length == 5) { _that.setData({ isEmptyText: '下滑加载更多' }); }
            else if (0 < dataJson.length < 5) { _that.setData({ isEmptyText: '没有更多了' }); }
          } else {
            _that.setData({ listDataJson: null, isEmptyText: '无更多数据' });
          }
        }
      }
    });
  },
})