// pages/weather/weather.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekday:["周日","周一","周二","周三","周四","周五","周六"],
    showday:["今天","明天",""],
    city:"",
    district:"",//区域
    now:"",
    forecast:"",
    quality:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var date=new Date();
    that.setData({
      "showday[2]":this.data.weekday[date.getDay()+2%7]
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
      var that=this;
      var city=app.globalData.defaultCity.slice(0,2);
      that.setData({
        city:app.globalData.defaultCity,
        district:app.globalData.defaultCoubty
      })
      that.getWeather(city);
  },
getWeather:function(city){
var that=this;
that.setData({
  now:app.globalData.weatherData.now,
  forecast:app.globalData.weatherData.daily_forecast,
  quality:app.globalData.air
})
},
bindCity:function(){
  wx.reLaunch({
    url: '../switchcity/switchcity',
  })
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