// pages/tabBarInfo/myInfo/myInfo.js
const app = getApp();
const url = app.globalData.baseUrl;
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sessionId: "",

    userProfile: '',
    userName: '',
    userSex: '',
    userWechat: '',
    userEmail: '',
    companyName: "",
    companyId: "",
    companyJob: '',
    companyIntro: '',
    introMax: 0,
    introMaxColor: 'rgba(0,0,0,.3)',
    isShowModal: false, // modal 是否弹起
    editName: '',
    editSex: '',
    editWechat: '',
    editEmail: '',
    editCompanyName: '',
    editCompanyJob: '',
    editCompanyIntro: '',
    userSexItems: [],
  },

  updateProfile: function(e) {
    const _that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: url + 'recruiterInfo/updateRecruiterImg.json',
          filePath: tempFilePaths[0],
          name: 'headP',
          success: res => {
            console.log(res)
            if (res.data.status == 10000) {
              wx.showToast({
                title: '修改成功'
              });
              _that.setData({
                userProfile: tempFilePaths
              });
            } else {
              wx.showModal({
                title: '警告',
                content: '接口调用成功，但返回值错误!状态：' + res.data.status,
              })
            }
          },
          fail: res => {
            wx.showModal({
              title: '警告',
              content: '接口调用失败',
            });
          }
        });
      }
    })
  },

  updateUserName: function(e) {
    this.modal_editUserName.showModal();
  },
  editInput_userName: function(e) {
    if (util.isSpaceBtn(e.detail.keyCode)) { this.setData({ userName: this.data.userName }); } 
    else { this.setData({ editName: e.detail.value  }); }
  },
  submitUserName: function(e) {
    const _that = this;
    wx.showModal({
      title: '警告',
      content: '将用户名变更为：' + _that.data.editName,
      success(res) {
        if (res.confirm) {
          //确认修改
          wx.showLoading({title: '加载中',});
          wx.request({
            url: url + 'recruiterInfo/updateRecruiterUserName.json',
            method: 'POST',
<<<<<<< HEAD
            data: JSON.stringify({
              'userName': _that.data.editName
            }),
            success: res => {
              if (res.data.status == 10000) {
                _that.setData({
                  userName: _that.data.editName
                });
                wx.showToast({
                  title: '修改成功'
                });
=======
            header:{ "Cookie":'JSESSIONID=' + _that.data.sessionId },
            data: {'userName': _that.data.editName },
            success: res => {
              if (res.data.status == 10000) {
                _that.setData({  userName: _that.data.editName });
                wx.showToast({ title: '修改成功' });
>>>>>>> 282a0282a1770843611da72881ed34e4f1e51b7a
                wx.hideLoading();
                _that.modal_editUserName.closeModal();
              }
            }
          })
        } else if (res.cancel) { _that.modal_editUserName.closeModal(); }
      }
    });
  },

  updateUserSex: function(e) {
    this.modal_editUserSex.showModal();
  },
  editInput_userSex: function(e) {
    let userSexItems = this.data.userSexItems;
    for (let i = 0, len = userSexItems.length; i < len; ++i) {  userSexItems[i].checked = userSexItems[i].value == e.detail.value; }
    this.setData({ userSexItems: userSexItems,  editSex: e.detail.value });
  },
  submitUserSex: function(e) {
    const _that = this;
    wx.showModal({
      title: '警告',
      content: '将性别变更为：' + _that.data.editSex,
      success(res) {
        if (res.confirm) {
          //确认修改
          wx.showLoading({
            title: '加载中'
          });
          wx.request({
            url: url + 'recruiterInfo/updateRecruiterSex.json',
            method: 'POST',
<<<<<<< HEAD
=======
            header:{ "Cookie":'JSESSIONID=' + _that.data.sessionId },
>>>>>>> 282a0282a1770843611da72881ed34e4f1e51b7a
            data: JSON.stringify({
              'userSex': _that.data.editSex
            }),
            success: res => {
              if (res.data.status == 10000) {
                _that.setData({
                  userSex: _that.data.editSex
                });
                wx.showToast({
                  title: '修改成功'
                });
                wx.hideLoading();
                _that.modal_editUserSex.closeModal();
              }
            }
          })
        } else if (res.cancel) {
          // 取消修改
          _that.modal_editUserSex.closeModal();
        }
      }
    });
  },

  updateUserWechat: function(e) {
    this.modal_editUserWchat.showModal();
  },
  editInput_userWechat: function(e) {
    if (util.isSpaceBtn(e.detail.keyCode)) {
      // 按下了空格键
      this.setData({ userWechat: this.data.userWechat });
    } else {
      this.setData({ editWechat: e.detail.value });
    }
  },
  submitUserWechat: function(e) {
    const _that = this;
    let verification = util.isSpecial(_that.data.editWechat);
    if (!verification.status) {
<<<<<<< HEAD
      wx.showModal({
        title: '警告',
        content: verification.errorMsg,
      })
=======
      wx.showModal({ title: '警告', content: verification.errorMsg,  })
>>>>>>> 282a0282a1770843611da72881ed34e4f1e51b7a
    } else {
      wx.showModal({
        title: '警告',
        content: '将微信号变更为：' + _that.data.editWechat,
        success(res) {
          if (res.confirm) {
            //确认修改
            wx.showLoading({
              title: '加载中'
            });
            wx.request({
              url: url + 'recruiterInfo/updateRecruiterWechat.json',
              method: "POST",
<<<<<<< HEAD
=======
              header:{ "Cookie":'JSESSIONID=' + _that.data.sessionId },
>>>>>>> 282a0282a1770843611da72881ed34e4f1e51b7a
              data: JSON.stringify({
                'userWechat': _that.data.editWechat
              }),
              success: res => {
                if (res.data.status == 10000) {
                  wx.showToast({
                    title: '修改成功'
                  });
                  wx.hideLoading();
                  _that.modal_editUserWchat.closeModal();
                }
              }
            })
          } else if (res.cancel) {
            // 取消修改
            _that.modal_editUserWchat.closeModal();
          }
        }
      });
    }
  },

  updateUserEmail: function(e) {
    this.modal_editUserEmail.showModal();
  },
  editInput_userEmail: function(e) {
    if (util.isSpaceBtn(e.detail.keyCode)) {
      // 按下了空格键
      this.setData({ userEmail: this.data.userEmail });
    } else {
      this.setData({ editEmail: e.detail.value });
    }
  },
  submitUserEmail: function(e) {
    const _that = this;
    if (util.isEmail(_that.data.editEmail)) {
      wx.showModal({
        title: '警告',
        content: '将邮箱号变更为：' + _that.data.editEmail,
        success(res) {
          if (res.confirm) {
            //确认修改
            wx.showLoading({
              title: '加载中'
            });
            wx.request({
              url: url + 'recruiterInfo/updateRecruiterMailbox.json',
              method: "POST",
<<<<<<< HEAD
              data: JSON.stringify({
                'recruiterMail': _that.data.editEmail
              }),
              success: res => {
                if (res.data.status == 10000) {
                  _that.setData({
                    userEmail: _that.data.editEmail
                  });
                  wx.showToast({
                    title: '修改成功'
                  });
=======
              header:{ "Cookie":'JSESSIONID=' + _that.data.sessionId },
              data: JSON.stringify({ 'recruiterMail': _that.data.editEmail  }),
              success: res => {
                if (res.data.status == 10000) {
                  _that.setData({ userEmail: _that.data.editEmail });
                  wx.showToast({ title: '修改成功'  });
>>>>>>> 282a0282a1770843611da72881ed34e4f1e51b7a
                  wx.hideLoading();
                  _that.modal_editUserEmail.closeModal();
                }
              }
            })
          } else if (res.cancel) {
            // 取消修改
            _that.modal_editUserEmail.closeModal();
          }
        }
      });
    } else {
      wx.showModal({
        title: '警告',
        content: '请输入正确的电子邮箱!'
      });
      return false;
    }
  },

  updateCompany: function(e) {
    this.modal_editCompanyName.showModal();
  },
  editInput_companyName: function(e) {
    if (util.isSpaceBtn(e.detail.keyCode)) { this.setData({ companyName: this.data.companyName }); } 
    else { this.setData({ editCompanyName: e.detail.value  }); }
  },
  submitCompanyName: function(e) {
    const _that = this;
    wx.showModal({
      title: '警告',
      content: '将公司名称变更为：' + _that.data.editCompanyName,
      success(res) {
        if (res.confirm) {
          //确认修改
          wx.showLoading({
            title: '加载中'
          });
          wx.request({
            url: url + 'companyInfo/updateCompanyInfo.json',
            method: "POST",
<<<<<<< HEAD
=======
            header:{ "Cookie":'JSESSIONID=' + _that.data.sessionId },
>>>>>>> 282a0282a1770843611da72881ed34e4f1e51b7a
            data: JSON.stringify({
              'companyId': _that.data.companyId,
              'companyFullName': _that.data.editCompanyName
            }),
            success: res => {
<<<<<<< HEAD
              console.log(e)
              if (res.data.status == 10000) {
                _that.setData({
                  companyName: _that.data.editCompanyName
                });
                wx.showToast({
                  title: '修改成功'
                });
=======
              if (res.data.status == 10000) {
                _that.setData({ companyName: _that.data.editCompanyName  });
                wx.showToast({ title: '修改成功' });
>>>>>>> 282a0282a1770843611da72881ed34e4f1e51b7a
                wx.hideLoading();
                _that.modal_editCompanyName.closeModal();
              }
            },
            complete: res => {
              console.log('2')
              console.log(res)
            }
          })
        } else if (res.cancel) {
          // 取消修改
          _that.modal_editCompanyName.closeModal();
        }
      }
    });
  },

  updateCompanyJob: function(e) {
    this.modal_editCompanyJob.showModal();
  },
  editInput_companyJob: function(e) {
    if (util.isSpaceBtn(e.detail.keyCode)) {
      this.setData({
        companyJob: this.data.companyJob
      });
    } else {
      this.setData({
        editCompanyJob: e.detail.value
      });
    }
  },
  submitCompanyJob: function(e) {
    const _that = this;
    wx.showModal({
      title: '警告',
      content: '将担任的职位变更为：' + _that.data.editCompanyJob,
      success(res) {
        if (res.confirm) {
          //确认修改
<<<<<<< HEAD
          wx.showLoading({
            title: '加载中'
          });
          wx.request({
            url: url + 'recruiterInfo/updateRecruiterJob.json',
            method: 'POST',
=======
          wx.showLoading({ title: '加载中' });
          wx.request({
            url: url + 'recruiterInfo/updateRecruiterJob.json',
            method: 'POST',
            header:{ "Cookie":'JSESSIONID=' + _that.data.sessionId },
>>>>>>> 282a0282a1770843611da72881ed34e4f1e51b7a
            data: JSON.stringify({
              'recruiterJob': _that.data.editCompanyJob
            }),
            success: res => {
              if (res.data.status == 10000) {
<<<<<<< HEAD
                _that.setData({
                  companyJob: _that.data.editCompanyJob
                });
                wx.showToast({
                  title: '修改成功'
                });
=======
                _that.setData({ companyJob: _that.data.editCompanyJob });
                wx.showToast({ title: '修改成功' });
>>>>>>> 282a0282a1770843611da72881ed34e4f1e51b7a
                wx.hideLoading();
                _that.modal_editCompanyJob.closeModal();
              }
            }
          })
        } else if (res.cancel) {
          // 取消修改
          _that.modal_editCompanyJob.closeModal();
        }
      }
    });
  },


  updataCompanyIntro: function(e) {
    this.modal_editCompanyIntro.showModal();
    this.setData({ introMax: this.data.companyIntro.length });
  },
  editInput_companyIntro: function(e) {
    if (e.detail.value.length >= 50) {
      this.setData({
        introMaxColor: 'red',
        introMax: e.detail.value.length,
      });
    } else {
      this.setData({
        introMax: e.detail.value.length,
        editCompanyIntro: e.detail.value
      });
    }
  },
  submitCompanyIntro: function(e) {
    const _that = this;
    wx.showModal({
      title: '警告',
      content: '确定要修改团队介绍吗？',
      success(res) {
        if (res.confirm) {
          //确认修改
          wx.showLoading({
            title: '加载中'
          });
          wx.request({
            url: url + 'recruiterInfo/updateTeamIntroduction.json',
            method: 'POST',
<<<<<<< HEAD
=======
            header:{ "Cookie":'JSESSIONID=' + _that.data.sessionId },
>>>>>>> 282a0282a1770843611da72881ed34e4f1e51b7a
            data: JSON.stringify({
              'teamIntroduction': _that.data.editCompanyIntro
            }),
            success: res => {
              if (res.data.status) {
<<<<<<< HEAD
                _that.setData({
                  companyIntro: _that.data.editCompanyIntro
                });
                wx.showToast({
                  title: '修改成功'
                });
=======
                _that.setData({ companyIntro: _that.data.editCompanyIntro });
                wx.showToast({ title: '修改成功' });
>>>>>>> 282a0282a1770843611da72881ed34e4f1e51b7a
                wx.hideLoading();
                _that.modal_editCompanyIntro.closeModal();
              }
            }
          })
        } else if (res.cancel) {
          // 取消修改
          _that.modal_editCompanyIntro.closeModal();
        }
      }
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _that = this;
    _that.modal_editUserName = _that.selectComponent("#editUserName");
    _that.modal_editUserSex = _that.selectComponent("#editUserSex");
    _that.modal_editUserWchat = _that.selectComponent("#editUserWchat");
    _that.modal_editUserEmail = _that.selectComponent("#editUserEmail");
    _that.modal_editCompanyName = _that.selectComponent("#editCompanyName");
    _that.modal_editCompanyJob = _that.selectComponent("#editCompanyJob");
    _that.modal_editCompanyIntro = _that.selectComponent("#editCompanyIntro");
    wx.getStorage({
      key: 'wechat_session',
      success: res => {
        let sessionId = res.data.sessionId == undefined ? '' : res.data.sessionId;
        wx.request({
          url: url + 'recruiterInfo/getRecruiterInfo.json',
          method: "POST",
          header: { "Cookie": 'JSESSIONID=' + sessionId },
          success: (res) => {
<<<<<<< HEAD
=======
            _that.setData({ sessionId:sessionId })
>>>>>>> 282a0282a1770843611da72881ed34e4f1e51b7a
            console.log(res)
            if (res.statusCode == 200) {
              if (res.data != null) {
                let dataJson = res.data.data;
                // console.log(dataJson)
<<<<<<< HEAD
                if (dataJson.recruiterSex == '男') {
=======
                if (dataJson.recruiterSex == '男' || dataJson.recruiterSex == null) {
>>>>>>> 282a0282a1770843611da72881ed34e4f1e51b7a
                  _that.setData({
                    userSexItems: [{
                      name: '男',
                      value: '男',
                      checked: true
                    }, {
                      name: '女',
                      value: '女',
                      checked: false
                    }]
                  });
                } else if (dataJson.recruiterSex == '女') {
                  _that.setData({
                    userSexItems: [{
                      name: '男',
                      value: '男',
                      checked: false
                    }, {
                      name: '女',
                      value: '女',
                      checked: true
                    }]
                  });
                }
                _that.setData({
                  userProfile: dataJson.recruiterImg,
                  userName: dataJson.recruiterName,
                  userSex: dataJson.recruiterSex,
                  userWechat: dataJson.userWechat,
                  userEmail: dataJson.recruiterMail == null ? '暂缺' : dataJson.recruiterMail,
                  companyName: dataJson.companyFullName == null ? '暂缺' : dataJson.companyFullName,
                  companyId: dataJson.companyId,
                  companyJob: dataJson.recruiterJob,
                  companyIntro: dataJson.teamIntroduction == null ? '暂无' : dataJson.teamIntroduction,
                });
              }
            } else {
              wx.showModal({
                title: '警告',
                content: '接口出错，状态：' + res.statusCode,
              });
            }
          }
        })
      },
    })

  },
})