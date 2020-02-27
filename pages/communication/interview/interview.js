// pages/communication/interview/interview.js
const app = getApp();
const url = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue:'',
    search_faker:'',
    listDataJson:[],
    isEmptyText:'',
    pageStart:1,
  },

  searchData:function(){
    const _that = this;
    let parameter1 = _that.data.searchValue;
    let parameter2 = _that.data.pageStart;
    let oldList = _that.data.listDataJson;
    let oldStatus =  _that.data.isEmptyText;
    wx.showLoading({ title: '搜索中...'});
    wx.request({
      url: url + 'jobInterview/getJobInterviewDTOList.json',
      method: "POST",
      data: JSON.stringify({ "pageStart": parameter2, "rows": 5, "userName": parameter1}),
      success: res => {
        if (res.data.status == 10000) {
          let dataJson = res.data.data.list;
          if (dataJson != '' && parameter2 == 1) { //第一页的数据
            _that.setData({ listDataJson: oldList});
          } else if (dataJson == '' && parameter2 == 1) { // 当没有数据
            _that.setData({ listDataJson: null, isEmptyText: '暂无数据' });
          } else if (dataJson != '' && parameter2 > 1) { // 加载其他分页的数据
            let resList = oldList.concat(dataJson);
            _that.setData({ listDataJson: resList });
          }
          if (dataJson.length == 5) { _that.setData({ isEmptyText: '下滑加载更多' }); }
          else if (0 < dataJson.length < 5) {  _that.setData({ isEmptyText: '没有更多了' }); }
          wx.hideLoading();
        } else {
         wx.showModal({
           title: '警告',
           content: '接口返回失败，状态：' + re.data.status,
         });
        }
      }
    });
  },
  searchName:function(e){
    this.setData({
      search_faker: e.detail.value
    });
  },
  searchBtn:function(){
    this.setData({
      searchValue: this.data.search_faker
    });
    this.searchData();
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _that = this;
    // 获取列表
    wx.request({
      url: url + 'jobInterview/getJobInterviewDTOList.json',
      method:"POST",
      data: JSON.stringify({ "pageStart": 1,"rows":5}),
      success: res =>{
        if(res.data.status == 10000){
          let dataJson = res.data.data.list;
          // console.log(dataJson)
          _that.setData({ listDataJson: dataJson });
          if (dataJson.length == 5) {  _that.setData({ isEmptyText: '下滑加载更多' }); }
          else if (0 < dataJson.length < 5) { _that.setData({ isEmptyText: '没有更多了' }); }
        } else {
          _that.setData({ listDataJson: null, isEmptyText: '无更多数据' });
        }
      }
    });
  },


})