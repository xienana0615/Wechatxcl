// pages/news/news.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topNews:[],
    newsType:'guoji',
    selectState:[1,0,0,0,0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: "https://v.juhe.cn/toutiao/index",
      data:{
        type:"guoji",
        key:"a9f703a0200d68926f707f3f13629078"
      },
      header:{
        "content-type":"application/json"
      },
      success:function(res){
        console.log(res);
        if(res.data.error_code===0){
          that.setData({
            topNews:res.data.result.data
          })
        }else{
          console.log(res);
          console.log("获取失败");
        }
      }
    })
  },
  //数据受限没有详情信息，给用户一个提示就好
  bindViewTap:function(event){
    wx.showModal({
      title: '提示',
      content: '实时更新，但因为免费接口资源受限，新闻详情请访问官方网站',
      success:function(res){
        console.log(res);
        if(res.confirm){
          wx.showToast({
            title: '谢谢支持',
            duration:1000,
            icon:"success"
          })
        }else if(res.cancel){
          wx.showToast({
            title: '',
            duration:1000,
            icon:"success"
          })
        }
      }
    })
  },
  clickNation:function(){
    
    this.setData({
      newsType:"guoji",
      selectState:[1,0,0,0,0]
    })
    this.getNews();
  },
  clickSport: function () {
    this.setData({
      newsType: "tiyu",
      selectState: [0, 1, 0, 0, 0]
    })
    this.getNews();
  },
  clickScience: function () {
    this.setData({
      newsType: "keji",
      selectState: [0, 0, 1, 0, 0]
    })
    this.getNews();
  },
  clickHappy: function () {
    this.setData({
      newsType: "yule",
      selectState: [0, 0, 0, 1, 0]
    })
    this.getNews();
  },
  clickFinance: function () {
    this.setData({
      newsType: "caijing",
      selectState: [0, 0, 0, 0, 1]
    })
    this.getNews();
  },
  getNews:function(){
    var that = this;
    wx.request({
      url: "https://v.juhe.cn/toutiao/index",
      data:{
        type:this.data.newsType,
        key: "a9f703a0200d68926f707f3f13629078"
      },
      header:{
        "content-type":"application/json"
      },
      success:function(res){
        console.log(res);
        if(res.data.error_code===0){
          that.setData({
            topNews:res.data.result.data
          })
        }else{
          console.log("获取失败");
        }
      }
    })
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
    return {
      title:"热点欣慰30条~",
      desc:"分享个个人小程序，希望你喜欢~",
      success:function(res){
        wx.showToast({
          title: '分享成功',
          duration:1000,
          icon:"success"
        })
      }
    }
  }
})