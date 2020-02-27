// pages/tabBarInfo/myJobList/myJobList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected:false,
    itemList:[
      {'id':0,'name':'选择一','selected':true},
      { 'id': 1, 'name': '选择二', 'selected': false}
    ],
    resultList:[],
  },
  selectSearch:function(e){
    this.setData({
      selected: !this.data.selected
    });
  },
  selectFun:function(e){
    const _that = this;
    let itemLists = _that.data.itemList;
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: '',
      method:'POST',
      data: { 'search': e.currentTarget.dataset.id},
      success(res){
        if(res.statusCode === 200){
          if(res.data != null){

          }
          for (let i in itemLists){
            if (itemLists[i].id == e.currentTarget.dataset.id){
              itemLists[i].selected = true;
            } else {
              itemLists[i].selected = false;
            }
          }
          _that.setData({
            selected:false,
            itemList: itemLists
          });
          wx.hideLoading();
        }
      }
    })
  },
  showMoreInfo:function(e){
    console.log(e.currentTarget.dataset.id) //职位id
    wx.navigateTo({
      url: '',
    })
  },
  addNewJob:function(e){
    wx.navigateTo({
      url: '../../addNew/job/job',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 发起请求获得用户已发布的职位
  },

})