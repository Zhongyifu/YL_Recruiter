// pages/authentication/person/person.js
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userRealName: "",
    userIdNumber: '',
    editRealName: '',
    editIdNumber: '',
  },
  updateUserRealName: function(e) {
    this.modal_editUserRealName.showModal();
  },
  editInput_userRealName: function(e) {
    if (util.isSpaceBtn(e.detail.keyCode)) {
      this.setData({
        userRealName: this.data.userRealName
      });
    } else {
      this.setData({
        editRealName: e.detail.value
      });
    }
  },
  submitUserRealName: function(e) {
    const _that = this;
    wx.showModal({
      title: '警告',
      content: '确定保存修改？',
      success(res) {
        if (res.confirm) {
          //确认修改
          wx.showLoading({
            title: '加载中',
          });
          wx.hideLoading();
          _that.modal_editUserRealName.closeModal();
        } else if (res.cancel) {
          // 取消修改
          _that.modal_editUserRealName.closeModal();
        }
      }
    });
  },

  updateUserIdNumber: function(e) {
    this.modal_editUserIdNumber.showModal();
  },
  editInput_userIdNumber: function(e) {
    if (util.isSpaceBtn(e.detail.keyCode)) {
      this.setData({
        userIdNumber: this.data.userIdNumber
      });
    } else {
      this.setData({
        editIdNumber: e.detail.value
      });
    }
  },
  submitUserIdNumber: function(e) {
    const _that = this;
    wx.showModal({
      title: '警告',
      content: '确定保存修改？',
      success(res) {
        if (res.confirm) {
          //确认修改
          wx.showLoading({
            title: '加载中',
          });
          wx.hideLoading();
          _that.modal_editUserIdNumber.closeModal();
        } else if (res.cancel) {
          // 取消修改
          _that.modal_editUserIdNumber.closeModal();
        }
      }
    });
  },
  nextPage:function(e){
    wx.navigateTo({
      url: '',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _that = this;
    _that.modal_editUserRealName = _that.selectComponent("#editUserRealName");
    _that.modal_editUserIdNumber = _that.selectComponent("#editUserIdNumber");

    //判空操作
    let userRealNameStr = '121231';
    let userIdNumberStr = '';
    _that.setData({
      userRealName: userRealNameStr == "" ? '请选择' : userRealNameStr,
      userIdNumber: userIdNumberStr == "" ? '请选择' : userIdNumberStr
    });
  },

})