// pages/tabBarInfo/messageInfo/messageInfo.js
Page({

  data: {
    boardHieght:"",
  },

  getKeyboardH:function(e){
    console.log("up" + e.detail.height )
    this.setData({ boardHieght: e.detail.height   });
  },
  restKeyboard:function(){
    console.log("down")
    this.setData({ boardHieght: "0" });
  },
  onLoad: function (options) {

  },

})