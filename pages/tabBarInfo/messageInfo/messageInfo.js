// pages/tabBarInfo/messageInfo/messageInfo.js
"use strict";
const app = getApp();
const url = app.globalData.baseUrl;
const getDate = require('../../../utils/getData.js');
let webUrl = 'ws://localhost:8063/websocket/';
let socketOpen;  //链接状态
let SocketTask; //socketD对象
let applicantId;
let recruiterId;
Page({

  data: {
    boardHieght: "",
    msgContent: '',
    msgContent_f: '',

    receiverInfo: {
      "id": "0001",
      "name": "最多四字",
      "job": "job",
      "hp": "../../../images/hP.jpg"
    },

    initiatorInfo: {
      "id": "0001",
      "hp": "../../../images/hP.jpg"
    },

    messageList: [
      { "id": "0001", "type": "I", "content": "initiator0","msgStatus":"icon-isRead","msgType":"A001" },
      { "id": "0002", "type": "R", "content": "receiver0", "msgStatus":"icon-unRead","msgType":"A002"},
      { "id": "0003", "type": "I", "content": "initiator1", "msgStatus":"icon-warning","msgType":"A003"},
      { "id": "0004", "type": "I", "content": "A0004", "msgStatus":"icon-loading","msgType":"A004"},
    ]
  },

  getKeyboardH: function (e) {
    this.setData({ boardHieght: e.detail.height });
  },
  restKeyboard: function () {
    this.setData({ boardHieght: "0" });
  },
  inputMessage: function (e) {
    this.setData({ msgContent_f: e.detail.value });
  },

  // 发送文字消息
  sendMessage: function (e) {
    let _that = this;
    let msg = "A0001&" + _that.data.msgContent_f;
    // _that.setData({ messageList: _that.data.messageList.concat(msg), afterSend: "" });
    if (socketOpen) {
      // 如果打开了socket就发送数据给服务器
      sendSocketMessage(msg)
      // _that.bottom()
    }
  },

  // 获取hei的id节点然后屏幕焦点调转到这个节点  
  bottom: function () { this.setData({ scrollTop: 1000000 }); },

  onLoad: function (options) {
    let _that = this;
    let sessionId = '';
    let msgTemolete;  // 消息UI模版
    let dataList = _that.data.messageList;

    return false;
    // receiverId = options.rid;
    // initiatorId = options.iid;
    applicantId = "f0870e37a0724656be2d7ac9d1eaf38c";
    recruiterId = "9fcb0f2cd58249bb8de0638d6fb5d105";
    webUrl = 'ws://localhost:8063/websocket/' + applicantId + "/" + recruiterId + "/B";
    // webUrl = 'ws://www.hxtschool.xyz/leaflink-websocket/websocket/' + receiverId + "/" + initiatorId + "/B";
    // 获取聊天记录
    getDate.getSessionId(arr => {
      if (arr.status) { sessionId = arr.content.sessionId; } 
      else { wx.showModal({ title: '警告', content: 'sessionId获取失败' }); }
    });
    if (!socketOpen) {
      // 创建Socket
      SocketTask = wx.connectSocket({
        url: webUrl,
        data: 'data',
        method: 'post',
        success: function (res) {
          console.log('WebSocket 连接创建成功', res);
          wx.request({
            url: url + '',
            data: {"pageStart":"1","rows":10},
            header: { "Cookie": 'JSESSIONID=' + sessionId },
            method: 'GET',
            dataType: 'json',
            success: (result) => {
              console.log(result);
             if(result.status === 10000){
               if(result.data != null){
                 let dataJson = result.data;
                 for(let i in dataJson){
                   // 消息是否已读 
                   if(dataJson[i].isRead === "0"){
                     dataJson[i].push({"msesageStatus":"icon-unRead"});
                   } else if(dataJson[i].isRead === "1"){
                     dataJson[i].push({"msesageStatus":"icon-isRead"});
                   }

                   // 某条记录的归属 0=招聘者发出  1=求职者发出
                   if(dataJson[i].sender === "0"){
                     dataJson[i].push({"messageType":"R"});
                   } else if(dataJson[i].sender === "1"){
                     dataJson[i].push({"messageType":"A"});
                   }

                   // 区分消息类型 
                   if(dataJson[i].messageType === "A0001"){
                    //  文字消息
                    
                   } else if(dataJson[i].messageType === "A0002"){
                    //  职位消息
                   } else if(dataJson[i].messageType === "A0003"){
                    //  简历消息
                   } else if(dataJson[i].messageType === "A0004"){
                    //  面试消息
                   } else if(dataJson[i].messageType === "A0005"){
                    //  请求交换手机号
                   } else if(dataJson[i].messageType === "A0006"){
                    //  请求交换微信号
                   }
                 }
               }
             } else {
              wx.showToast({ title: '接口调用成功单返回错误！stauts:' + result.status });
             }
            },
          });
        },
        fail: function (err) {
          wx.showToast({ title: '网络异常！' });
          console.log(err)
        }
      });
    }
    
    SocketTask.onOpen(res => {
      socketOpen = true;
      console.log('监听 WebSocket 连接打开事件。', res)
    })
    SocketTask.onClose(onClose => {
      console.log('监听 WebSocket 连接关闭事件。', onClose)
      socketOpen = false;
    })
    SocketTask.onError(onError => {
      console.log('监听 WebSocket 错误。错误信息', onError)
      socketOpen = false
    })
    SocketTask.onMessage(onMessage => {
      console.log('监听 WebSocket 接受到服务器的消息事件。服务器返回的消息', JSON.parse(onMessage.data))
    })
  },

  onHide: function () { SocketTask.close() },

})

//通过 WebSocket 连接发送数据，需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。
function sendSocketMessage(msg) {
  // console.log('通过 WebSocket 连接发送数据', JSON.stringify(msg))
  SocketTask.send({
    data: JSON.stringify(msg)
  }, function (res) {
    console.log('已发送', res)
  })
}