// pages/communication/communicated/communicated.js
const app = getApp();
const url = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchName:'',
    search_faker:'',
    listDataJson:[],
    isEmptyText:'暂无更多',
    pageStart:1,
  },
  searchData:function(e){
    const _that = this;
    let parameter1 = _that.data.searchName;
    let parameter2 = _that.data.pageStart;
    wx.request({
      url: url + 'applicantInfo/getListByMessageCommunication.json',
      method:'POST',
      data: JSON.stringify({ "pageStart": parameter2, "rows": 5, "userName": parameter1 }),
      success: res => {
        console.log(res)
        if(res.data.status == 10000){
          let dataJson = res.data.data.list;
          if (dataJson != '' && parameter2 == 1) { _that.setData({ listDataJson:dataJson  }); }
          else if(dataJson == '' && parameter2 == 1){ _that.setData({  listDataJson: null });}
          else if (dataJson != '' && parameter2 > 1) { 
            let oldList = _that.data.listDataJson;
            let newList = oldList.concat(dataJson)
            _that.setData({ listDataJson:newList });
          }
          if (dataJson.length == 5) { _that.setData({ isEmptyText: '下滑加载更多' }); }
          else if (0 < dataJson.length < 5) { _that.setData({ isEmptyText: '没有更多了' }); }
          wx.hideLoading();
        } else {
          wx.showModal({
            title: '警告',
            content: '接口调用成功，但返回失败.状态：'+ res.data.status,
          });
        }
      }
    })
  },
  searchName:function(e){
    this.setData({ search_faker: e.detail.value });
  },
  searchBtn:function(e){
    this.setData({ searchName: this.data.search_faker,pageStart:1 });
    this.searchData();
  },

  // 跳转至消息页面，查看具体的沟通内容
  showInfo:function(e){},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _that = this;
    // 加载第一页
    wx.request({
      url: url + 'applicantInfo/getListByMessageCommunication.json',
      method:'POST',
      data: JSON.stringify({"pageStart":1,"rows":5}),
      success: res =>{
        // console.log(res)
        if(res.data.status == 10000){
          // let dataJson = res.data.data.list;
          // console.log(dataJson)
          _that.setData({ listDataJson: res.data.data.list });
        }
      }
    })
  },
})