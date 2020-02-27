// pages/tabBarInfo/comInfo/incomplete.js
// const percentValue = {
// "1":[]
// };
Page({

  /**
   * 页面的初始数据
   */
  data: {
    percent: 50,
    isUpload: false, //是否选中了一张logo图片,
    isIPOType: false, // 是否选择了上市状态
    isRestTime: false, // 是否选择了休息时间
    isOverTime: false, // 是否选择了加班情况
    isWelfare: false, // 是否选择了公司福利
    isUploadComPhoto: false, //是否上传了至少一张公司照片

    list_IPO: [{
        'typeId': '0001',
        'typeName': '已上市'
      },
      {
        'typeId': '0002',
        'typeName': '未上市'
      }
    ],
    ipoIdx: '',
    websiteUrl: '',
    comProfile: '',
    // 工作时间
    time_amH_S: 0,
    time_amM_S: 0,
    time_amM_E: 0,
    time_amM_E: 0,
    time_pmM_S: 0,
    time_pmM_S: 0,
    time_pmM_E: 0,
    time_pmM_E: 0,
    // 休息时间
    restTimeList: [{
      'typeId': '0001',
      'typeName': '双休'
    }, {
      'typeId': '0002',
      'typeName': '单休'
    }, {
      'typeId': '0003',
      'typeName': '大小周'
    }, {
      'typeId': '0004',
      'typeName': '轮休'
    }],
    restIdx: '',
    // 加班情况
    overTimeList: [{
      'typeId': '0001',
      'typeName': '从不加班'
    }, {
      'typeId': '0002',
      'typeName': '偶尔加班'
    }, {
      'typeId': '0003',
      'typeName': '经常加班'
    }, {
      'typeId': '0004',
      'typeName': '每天都加班'
    }],
    overIdx: '',
    // 公司福利
    welfare_selected: [],
    welfareList: [{
      'typeId': '0001',
      'typeName': '下午茶下午茶'
    }, {
      'typeId': '0002',
      'typeName': '加班餐补'
    }, {
      'typeId': '0003',
      'typeName': '弹性打卡'
    }, {
      'typeId': '0004',
      'typeName': '加班费'
    }, {
      'typeId': '0001',
      'typeName': '下午茶'
    }, {
      'typeId': '0002',
      'typeName': '加班餐补'
    }, {
      'typeId': '0003',
      'typeName': '弹性打卡'
    }, {
      'typeId': '0004',
      'typeName': '加班费'
    }],
    // 公司照片
    comPhotoSrcList: []
  },

  getPercent: function(number) {
    let percentVal = 0;
    switch (number) {
      case 1:
        percentVal = 10
        break;
      case 2:
        percentVal = 20
        break;
      case 3:
        percentVal = 30
        break;
      case 4:
        percentVal = 40
        break;
      case 5:
        percentVal = 50
        break;
      case 6:
        percentVal = 60
        break;
      case 7:
        percentVal = 70
        break;
      case 8:
        percentVal = 80
        break;
      case 9:
        percentVal = 90
        break;
      case 10:
        percentVal = 100
        break;
    }
    this.setData({
      percent: percentVal
    });
  },

  // 完善各项信息
  uplodaLogo: function(e) {
    this.modal_Logo.showModal();
  },
  chooseList: function(e) {
    let _that = this;
    let value = e.detail.value;
    _that.setData({
      ipoIdx: value,
      isIPOType: true
    });
  },
  cancel_IPO: function(e) {
    let _that = this;
    _that.setData({
      ipoIdx: '',
      isIPOType: false
    });
  },
  writeWebsite: function(e) {
    this.modal_Website.showModal();
  },
  writeProfile: function(e) {
    this.modal_Profile.showModal();
  },
  chooseWorkTime: function(e) {
    this.modal_WorkTime.showModal();
  },
  chooseRestTime: function(e) {
    let _that = this;
    _that.setData({
      restIdx: e.detail.value,
      isRestTime: true
    });
  },
  cancel_Rest: function(e) {
    this.setData({
      isRestTime: false
    });
  },
  chooseWorkOverTime: function(e) {
    let _that = this;
    _that.setData({
      overIdx: e.detail.value,
      isOverTime: true
    });
  },
  cancel_overTime: function(e) {
    this.setData({
      isOverTime: false
    });
  },
  chooseWelfare: function(e) {
    this.modal_Welfare.showModal();
  },
  uplodaPhotos: function(e) {
    this.modal_Photos.showModal();
  },

  // 触发事件
  uplodaLogoImg: function(e) {
    let _that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        _that.setData({
          isUpload: true,
          logoSrc: tempFilePaths
        });
      }
    });
  },
  submitLogoImg: function(e) {
    let _that = this;
    // 将图片上传到缓存 

    // 将图片上传到服务器
  },
  inputWebSite: function(e) {
    let _that = this;
    _that.setData({
      websiteUrl: e.detail.value
    });
  },
  submitWebsite: function(e) {
    let _that = this;
    let url = _that.data.websiteUrl;
    // 提交请求
  },
  inputProfile: function(e) {
    let _that = this;
    _that.setData({
      comProfile: e.detail.value
    });
  },
  submitProfile: function(e) {
    let _that = this;
    let profile = e.detail.value;
    // 发起请求确认
  },
  // 上班时间 （简单验证）
  validate_Time: function(time, value) {
    let status = false;
    if (time == 'hour') {
      if (value >= 12) {
        wx.showToast({
          title: '请填写正确的值!',
          icon: 'none'
        });
        status = false;
      } else {
        status = true;
      }
    } else if (time == 'minute') {
      if (value > 59) {
        wx.showToast({
          title: '请填写正确的值!',
          icon: 'none'
        });
        status = false;
      } else {
        status = true;
      }
    }
    return status;
  },
  validate_submit:function(time){
    if (time == 0 || time == undefined){
      wx.showModal({
        title: '警告',
        content: '请填写完整的作息时间',
      });
    }
  },
  time_amH_S_F: function(e) {
    // 上午 上班时间 时针
    if (this.validate_Time('hour', e.detail.value)) {
      this.setData({
        time_amH_S: e.detail.value
      });
    }
  },
  time_amM_S_F: function(e) {
    // 上午 上班时间 分针
    if (this.validate_Time('minute', e.detail.value)) {
      this.setData({
        time_amM_S: e.detail.value
      });
    }
  },
  time_amH_E_F: function(e) {
    // 上午 下班时间 时针
    if (this.validate_Time('hour', e.detail.value)) {
      this.setData({
        time_amH_E: e.detail.value
      });
    }
  },
  time_amM_E_F: function(e) {
    // 上午 上班时间 分针
    if (this.validate_Time('minute', e.detail.value)) {
      this.setData({
        time_amM_E: e.detail.value
      });
    }
  },
  time_pmH_S_F: function(e) {
    // 下午 上班时间 时针
    if (this.validate_Time('hour', e.detail.value)) {
      this.setData({
        time_pmH_S: e.detail.value
      });
    }
  },
  time_pmM_S_F: function(e) {
    // 下午 上班时间 分针
    if (this.validate_Time('minute', e.detail.value)) {
      this.setData({
        time_pmM_S: e.detail.value
      });
    }
  },
  time_pmH_E_F: function(e) {
    // 下午 下班时间 时针
    if (this.validate_Time('hour', e.detail.value)) {
      this.setData({
        time_pmH_E: e.detail.value
      });
    }
  },
  time_pmM_E_F: function(e) {
    // 下午 下班时间 分针
    if (this.validate_Time('minute', e.detail.value)) {
      this.setData({
        time_pmM_E: e.detail.value
      });
    }
  },
  comfirmDate_workTime: function(e) {
    let _that = this;
    let tiemStr_am_s = _that.data.time_amH_S + _that.data.time_amM_S;
    let tiemStr_am_e = _that.data.time_amH_E + _that.data.time_amM_E;
    let tiemStr_pm_s = _that.data.time_pmH_S + _that.data.time_pmM_S;
    let tiemStr_pm_e = _that.data.time_pmH_E + _that.data.time_pmM_E;
    _that.validate_submit(_that.data.time_amH_S);
    _that.validate_submit(_that.data.time_amM_S);
    _that.validate_submit(_that.data.time_amH_E);
    _that.validate_submit(_that.data.time_amM_E);
    _that.validate_submit(_that.data.time_pmH_S);
    _that.validate_submit(_that.data.time_pmM_S);
    _that.validate_submit(_that.data.time_pmH_E);
    _that.validate_submit(_that.data.time_pmM_E);
    console.log('上午上班时间' + tiemStr_am_s + '~' + tiemStr_am_e);
    console.log('下午上班时间' + tiemStr_pm_s + '~' + tiemStr_pm_e);
    // 发起请求
  },
  selectWelfare: function(e) {
    // 选择已有的福利
    let _that = this;
    // debugger
    let welfareList = _that.data.welfareList;
    let welfare_selected = _that.data.welfare_selected;
    let index = e.currentTarget.dataset.idx;
    let typeId = e.currentTarget.dataset.id;
    let typeItm = welfareList[index];
    console.log(typeItm.isSelected)
    if (typeItm.isSelected == false) {
      typeItm.isSelected = true;
      welfare_selected.push({
        'id': typeId
      });
      _that.setData({
        welfare_selected: welfare_selected
      });
    } else if (typeItm.isSelected == true) {
      typeItm.isSelected = false;
      welfare_selected.splice((index - 1), 1);
      _that.setData({
        welfare_selected: welfare_selected
      });
    } else if (typeItm.isSelected == undefined) {
      typeItm.isSelected = true;
      welfare_selected.push({
        'id': typeId
      });
      _that.setData({
        welfare_selected: welfare_selected
      });
    }
    _that.setData({
      welfareList: welfareList
    });
  },
  comfirmDate_welfare: function(e) {
    let _that = this;
    let dateJson = _that.data.welfare_selected;
    _that.setData({
      isWelfare: true
    });
    // 发起请求 发送这些数据
    _that.modal_Welfare.closeModal();
  },
  cancel_welfare: function(e) {
    this.setData({
      isWelfare: false
    });
    this.modal_Welfare.closeModal();
  },
  uplodaComPhoto: function(e) {
    let _that = this;
    let comPhotoSrcList = _that.data.comPhotoSrcList;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        for (let i in tempFilePaths) {
          comPhotoSrcList.push(tempFilePaths[i]);
        }
        _that.setData({
          isUploadComPhoto: true,
          comPhotoSrcList: comPhotoSrcList
        });
      }
    });
  },
  comfirmDate_comPhoto: function(e) {
    let _that = this;
    let photoList = _that.data.comPhotoSrcList;
    // 发起请求传输图片 
    // 上传成功之后，保留 photoList 的数据
    _that.modal_Photos.closeModal();
  },
  cancel_comPhoto: function(e) {
    // 取消上传，清空目前的 comPhotoSrcList
    wx.showModal({
      title: '提示',
      content: '确定不上传这些图片吗？',
      success: res => {
        if (res.confirm) {
          this.setData({
            photoList: []
          });
          this.modal_Photos.closeModal();
        } else if (res.cancel) {
          return false;
        }
      }
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _that = this;
    _that.getPercent(2);
    // 初始化 模态框
    _that.modal_Logo = _that.selectComponent("#logo");
    _that.modal_Website = _that.selectComponent("#website");
    _that.modal_Profile = _that.selectComponent("#profile");
    _that.modal_WorkTime = _that.selectComponent("#workTime");
    _that.modal_WorkOvertime = _that.selectComponent("#workOvertime");
    _that.modal_Welfare = _that.selectComponent("#welfare");
    _that.modal_Photos = _that.selectComponent("#photos");
  },


})