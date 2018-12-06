// pages/movies/movie-detail/movie-detail.js
import {Movie} from "class/Movie.js";
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{},
    visible:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId=options.id;
    var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
    var movie=new Movie(url);
    console.log(movie);
    movie.getMovieData((movie)=>{
      console.log(movie);
      this.setData({
        movie:movie
      });
      this.setData({
        visible:true
      })
    })
  },
  viewMoviePosstImg:function(e){
    var src=e.currentTarget.dataset.src;
    wx.previewImage({
      current:src,
      urls: [src],
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

  }
})