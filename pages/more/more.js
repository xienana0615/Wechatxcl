// pages/more/more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      selectState:[0,0,0,0,0],
      selectIndex:0
  },
  clickDict:function(){
    this.setData({
      selectState:[1,0,0,0,0],
      selectIndex:1  
    });
    wx.showToast({
      title: '还没空做啊',
      duration:3000,
      icon:"success"
    })
  },
  clickExpre:function(){
   
    this.setData({
      selectState: [0, 1, 0, 0, 0],
      selectIndex: 2
    });
    wx.showToast({
      title: '还没空做啊',
      duration: 3000,
      icon: "success"
    })
  },
  clickMore: function () {
 
    this.setData({
      selectState: [0, 0, 1, 0, 0],
      selectIndex: 3
    });
   wx.showActionSheet({
     itemList: ["给你一个小彩蛋---"],
    itmeColor:"#405f60",
    success:function(res){
      wx.navigateTo({
        url: '../logs/logs',
      })
    }
   })
  },
  clickGithub:function(){
    this.setData({
      selectState: [0, 0, 0, 1, 0],
      selectIndex: 4
    });
  },
  clickBlog: function () {
    this.setData({
      selectState: [0, 0, 0, 0, 1],
      selectIndex: 5
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})