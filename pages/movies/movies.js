// pages/movies/movies.js
var util=require("../../utils/util.js");
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    comingSoon:{},
    top250:{},
    searchResult:{},
    containerShow:true,
    searchPanelShow:false,
    searchText:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersURl = app.globalData.doubanBase +
      "/v2/movie/in_theaters" + "?start=0&count=6";
    var comingSoonUrl = app.globalData.doubanBase +"/v2/movie/coming_soon" + "?start=0&count=6"; 
    var top250Url = app.globalData.doubanBase +
      "/v2/movie/top250" + "?start=0&count=6";
      this.getMovieListData(inTheatersURl,"inTheaters","正在热映");
      this.getMovieListData(comingSoonUrl,"comingSoon","即将上映");
      this.getMovieListData(top250Url,"top250","豆瓣Top250");
  },
  onMoreTap:function(event){
    var category=event.currentTarget.dataset.category;
    console.log(category);
    wx.navigateTo({
      url: 'more-movie/more-movie?category='+category
    })
  },
  onMovieTap:function(event){
    var movieId=event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url:"movie-detail/movie-detail?id="+movieId
    })
  },
  getMovieListData:function(url,settedKey,categoryTitle){
    wx.showNavigationBarLoading();
    var that=this;
    wx.request({
      url:url,
      method:"get",
      header:{
        "content-type":"json"
      },
      success:function(res){
        that.processDoubanData(res.data,settedKey,categoryTitle);
      },
      fail:function(error){
        console.log(error);
        }
    })
  },
  processDoubanData:function(moviesDouban,settedKey,categoryTitle){
    var movies=[];
    for(var idx in moviesDouban.subjects){
      var subject=moviesDouban.subjects[idx];
      var title=subject.title;
      if(title.length>6){
        title=title.substring(0,6)+"...";
      }
      var score=subject.rating.average+"";
      var temp={
        stars:util.convertToStarsArray(subject.rating.stars),
        title:title,
        average:score.length==1?subject.rating.average+".0":subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id
      }
      movies.push(temp);
    }
    var readyData={};
    readyData[settedKey]={
      categoryTitle:categoryTitle,
      movies:movies
    }
    this.setData(readyData);
    wx.hideNavigationBarLoading();
  },
  onBindFocus:function(event){
    console.log(event);
    this.setData({
      containerShow:false,
      searchPanelShow:true
    })
  },
  onBindBlur:function(event){
    console.log(event);
    var text=event.detail.value;
    var searchUrl = app.globalData.doubanBase+"/v2/movie/search?q="+text;
    this.getMovieListData(searchUrl,"searchResult","")
  },
  onCancelImgTap:function(event){
    this.setData({
      containerShow:true,
      searchPanelShow:false,
      searchResult:{},
      searchText:"",
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
      title:"豆瓣电影",
      desc:"一起看电影吧"
    }
  }
})