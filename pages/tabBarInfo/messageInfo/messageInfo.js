// pages/tabBarInfo/messageInfo/messageInfo.js
const app = getApp();
const url = app.globalData.baseUrl;
const getDate = require('../../../utils/getData.js');
let webUrl = 'ws://localhost:8063/websocket/';
let socketOpen;  //链接状态
let SocketTask; //socketD对象
let receiverId;
let initiatorId;
Page({

  data: {
    boardHieght: "",
    msgContent: '',
    msgContent_f: '',

    receiverInfo: {
      "id": "0001",
      "name": "name",
      "job": "job",
      "hp": "../../../images/hP.jpg"
    },

    initiatorInfo: {
      "id": "0001",
      "hp": "../../../images/hP.jpg"
    },

    messageList: [
      { "id": "0001", "type": "I", "content": "initiator0" },
      { "id": "0002", "type": "R", "content": "receiver0" },
      { "id": "0003", "type": "I", "content": "initiator1" },
      { "id": "0004", "type": "R", "content": "receiver1" },
      { "id": "0005", "type": "I", "content": "initiator2" },
      { "id": "0006", "type": "I", "content": "initiator3" },
      { "id": "0007", "type": "R", "content": "receiver2" },
      { "id": "0007", "type": "R", "content": "receiver3" },
      { "id": "0008", "type": "I", "content": "initiator4" },
      { "id": "0007", "type": "R", "content": "receiver3" },
      { "id": "0008", "type": "I", "content": "initiator4" },
      { "id": "0007", "type": "R", "content": "receiver3" },
      { "id": "0008", "type": "I", "content": "initiator4" },
      { "id": "0007", "type": "R", "content": "receiver3" },
      { "id": "0008", "type": "I", "content": "initiator4" }
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
    let msg = "A0001&"+_that.data.msgContent_f;
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
    // receiverId = options.rid;
    // initiatorId = options.iid;
    receiverId = "receiverId";
    initiatorId = "initiatorId";
    // webUrl = 'ws://localhost:8063/websocket/' + receiverId + "/" + initiatorId + "/B";
    webUrl = 'ws://www.hxtschool.xyz/leaflink-websocket/websocket/' + receiverId + "/" + initiatorId + "/B";
    if (!socketOpen) {
      // 创建Socket
      SocketTask = wx.connectSocket({
        url: webUrl,
        data: 'data',
        method: 'post',
        success: function (res) {
          console.log('WebSocket 连接创建成功', res);
          // 获取聊天记录
          getDate.getSessionId(arr => {
            let sessionId = '';
            if (arr.status) {
              sessionId = arr.content.sessionId;
              wx.request({
                url: url + '',
                data: {},
                header: { "Cookie": 'JSESSIONID=' + sessionId },
                method: 'GET',
                dataType: 'json',
                responseType: 'text',
                success: (result) => { },
              });
            } else {
              wx.showModal({ title: '警告', content: 'sessionId获取失败' });
            }
          });
        },
        fail: function (err) {
          wx.showToast({ title: '网络异常！', })
          console.log(err)
        },
      })
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
      // let onMessage_data = JSON.parse(onMessage.data)

      // console.log('------------------ that.data.allContentList ------------------')
      // console.log(that.data.allContentList)
      // _that.bottom();
    })
  },

  onShow: function (e) { },
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