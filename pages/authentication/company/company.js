// pages/authentication/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasChoose: false,
    auIndex: 0,
    authentication: [{
        'typeId': 0,
        'typeName': '营业执照认证'
      },
      {
        'typeId': 1,
        'typeName': '企业招聘授权书'
      },
    ],
    isUpload: false,
    interimURL: {},
    uploadPath: [],

    hasError:false,
    errorText:''
  },

  chooseWay: function(e) {
    const _that = this;
    // const authentication = _that.data.authentication;
    // console.log(e.detail.value)
    // console.log(authentication[e.detail.value].typeId)
    _that.setData({
      hasChoose: true,
      auIndex: e.detail.value,
    });
  },

  downTemp: function(e) {
    wx.downloadFile({
      url: '',
      success(res) {
        if (res.statusCode == 200) {
          //手机\内部存储\tencent\MicroMsg\wxanewfiles\ 下载下来的文件本地存放地址
          const filePath = res.tempFilePath;
          wx.showModal({
            title: '提示',
            content: '下载成功需要打开该文件吗？',
            success(result) {
              if (result.confirm) {
                wx.openDocument({
                  filePath: filePath,
                });
              }
            }
          })

        }
      }
    })
  },

  uploadFile: function(e) {
    const _that = this
    wx.chooseImage({
      success: function(res) {
        _that.setData({
          isUpload: true,
          interimURL: res.tempFilePaths
        });
      },
    })
  },

  nextPage: function(e) {
    const _that = this;
    console.log(_that.data);
    if (!_that.data.hasChoose) {
      _that.setData({
        hasError:true,
        errorText:'请选择一种企业认证方式'
      });
      setTimeout(function () {
        _that.setData({
          hasError: false,
          errorText: ''
        });
      }, 2000);
      return false;
    } else {
      if (_that.data.uploadPath.length == 0) {
        _that.setData({
          hasError: true,
          errorText: '请上传相关认证材料'
        });
        setTimeout(function () {
          _that.setData({
            hasError: false,
            errorText: ''
          });
        }, 2000);
        return false;
      } else {
        wx.showModal({
          title: '提示',
          content: '确定提交上诉数据吗？',
          success(res) {
            if (res.confirm) {
              wx.showLoading({
                title: '操作中...',
              });
              wx.uploadFile({
                url: '', //上传至缓存服务器
                filePath: _that.data.interimURL,
                name: 'authenticationImg',
                success(res) {
                  if (statusCode == 200) {
                    wx.request({
                      url: '', //上传至系统服务器
                      method: 'POST',
                      data: JSON.stringify({
                        'selectedItem': _that.data.auIndex,
                        'uploadImgURL': res.data
                      }),
                      success(res) {
                        if (res.statusCode == 200) {
                          wx.hideLoading();
                          wx.navigateTo({
                            url: '', //跳转前往下一步
                          });
                        }
                      }
                    })
                  }
                }
              })
            }
          }
        });
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 调用接口 判断用户是否已经认证过
  },

})