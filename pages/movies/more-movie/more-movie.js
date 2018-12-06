// pages/movies/more-movie/more-movie.js
var app=getApp();
var util=require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[],
    navigateTitle:"",
    requestUrl:"",
    totalCount:0,
    isEmpty:true,
    hiddenLoading:false,
    disableRemind:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var category=options.category;
    this.data.navigateTitle=category;
    var dataUrl="";
    switch(category){
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
        case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
        case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    wx.setNavigationBarTitle({
      title: category,
    })
    this.data.requestUrl=dataUrl;
    util.http(dataUrl,this.processDoubanData);
  },
  onPullDownRefresh:function(event){
    var refreshUrl = this.data.requestUrl + "?star=0&count=20";
    this.data.movies={};
    this.data.isEmpty=true;
    this.data.totalCount=0;
    util.http(refreshUrl,this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  onReachBottom:function(event){
    var nextUrl = this.data.requestUrl+"?start="+this.data.totalCount+"&count=20";
    utl.http(nextUrl,this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  processDoubanData:function(moviesDouban){
    var movies=[];
    console.log(moviesDouban);
    if(moviesDouban.subjects.length<=0){
      var _this=this;
      if(_this.data.disableRemind){
        _this.setData({
          disableRemind:trie
        });
        setTimeout(function(){
          _this.setData({
            disableRemind:true
          })
        },2000);
      }
    }
    for(var idx in moviesDouban.subjects){
      var subject=moviesDouban.subjects[idx];
      var title=subject.title;
      if(title.length>=6){
        title=title.substring(0,6)+"...";
      }
      var score=subject.rating.average+"";
      var temp={
        stars:util.convertToStarsArray(subject.rating.stars),
        title:title,
        average:score.length==1?subject.rating.average+".0":subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id,
      }
      movies.push(temp);
    }
    var totalMovies={};
    if(!this.data.isEmpty){
      totalMovies=this.data.movies.concat(movies);
    }else{
      totalMovies=movies;
      this.data.isEmpty=false;
    }
    this.setData({
      movies:totalMovies
    });
    console.log(movies);
    this.data.totalCount+=20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
    this.setData({
      hiddenLoading:true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  },
  onMovieTap:function(event){
    var movieId=event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail>id='+movieId,
    })
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