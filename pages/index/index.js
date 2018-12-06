// //index.js
// //获取应用实例
// const app = getApp()

// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       thi//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })

var app=getApp();
var util=require("../../utils/util.js");
var bmap = require('../../libs/bmap-wx.js'); 
Page({
    // 页面初始化数据
    data:{
      location:"",
      county:"",
      sliderList:[
        { selected: true, imageSoure:'../../images/2.jpg'},
        { selected: false, imageSoure: 'http://pic1.win4000.com/wallpaper/9/538544be6ae36.jpg' },
        { selected: false, imageSoure: '../../images/2.jpg' }
      ],
      today:"",
      inTheaters:{"aa":"bb"},
      containerShow:true,
      weatherData:"",
      air:"",
      dress:""
    },
    //轮播图绑定change事件，修改图标的属性是否被选中
  switchTab:function(e){
  // console.log(e.detail.current); =>1,2,0
    var sliderList=this.data.sliderList;
    var i,item;
    for(i=0;item=sliderList[i];++i){
      item.selected=e.detail.current==i;
    }
    this.setData({
      sliderList:sliderList
    })
  },
  //更新当前日期
  onLoad:function(options){
    //更新当前时间
    // console.log(util.formatTime(new Date()));
    app.globalData.day=util.formatTime(new Date()).split(" ")[0];
    this.setData({
      today:app.globalData.day
    })
    
    //定位当前位置
    this.getLocation();
    //获取豆瓣电影正在热映信息
    var inTheatersUrl=app.globalData.doubanBase+"/v2/movie/in_theaters"+"?star=0&count=6";
    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
    //获取用户信息
    wx.getUserInfo({
      success:function(res){
       // console.log(res);
        var log=Date.now();
      //  console.log(log);
        res.userInfo.logtime=util.formatTime(new Date(log));
     //   console.log(res.userInfo.logtime);
     var userInfos=wx.getStorageSync("userInfos")||[];
        userInfos.unshift(res.userInfo);
        wx.setStorageSync("userInfos", userInfos)
      },
      fail:function(error){
        console.log(error);
      }
    })
  },
  getLocation:function(){
    var that=this;  
    wx.getLocation({
      type:"wgs84",
      success:function(res){
        var BMap = new bmap.BMapWX({
          ak: 'NKbx4MMdPHHBxpkC1hBVZM7U45db8Zfb'
        });        
        BMap.regeocoding({
          fail: function(error){
              console.log(error);
          },
          success: function(res){
             app.globalData.defaultCity = app.globalData.defaultCity ? app.globalData.defaultCity:res.originalData.result.addressComponent.city;
            app.globalData.defaultCounty = app.globalData.defaultCounty ? app.globalData.defaultCounty : res.originalData.result.addressComponent.district;
           // console.log(this);
            that.setData({
              location: app.globalData.defaultCity,
              county: app.globalData.defaultCounty
            })
             that.getWeather();
             that.getAir();
          }
        });
      }
    })
  },
  getWeather:function(e){
    var length=this.data.location.length;
    var city=this.data.location.slice(0,length-1);
    var that=this;
    var param={
      key:app.globalData.heWeatherKey,
      location:city,
    };
    wx.request({
      url: app.globalData.heWeatherBase+"/s6/weather",
      data:param,
      header:{
        'content-type':'application/json'
      },
      success:function(res){
       // console.log(res);
        app.globalData.weatherData=res.data.HeWeather6[0].status=="unknown city"?"":res.data.HeWeather6[0];
        var weatherData=app.globalData.weatherData?app.globalData.weatherData.now:"暂无该城市天气信息";
        var dress = app.globalData.weatherData ? res.data.HeWeather6[0].lifestyle[1] : {txt:"暂无该城市的天气"};
        that.setData({
          weatherData,
          dress:dress
        });
      }
    })
  },
  getAir:function(e){
    var length=this.data.location.length;
    var city=this.data.location.slice(0,length-1);
    var that=this;
    var param={
      key: app.globalData.heWeatherKey,
      location:city
    };
    wx.request({
      url:app.globalData.heWeatherBase+"/s6/air/now",
      data:param,
      header:{
        "content-type":"application/json"
      },
      success:function(res){
       // console.log(res.data);
        app.globalData.air=res.data.HeWeather6[0].status=="unkonwn city"?"":res.data.HeWeather6[0].air_now_city;
      //  console.log(app.globalData.air);
        that.setData({
          air:app.globalData.air
        });
      }
    });
  },
  getMovieListData:function(url,setterKey,categoryTitle){
    wx.showNavigationBarLoading();//在当前页面显示导航条加载动画
    var that=this;
   // console.log(that);
    wx.request({
      url:url,
      method:"GET",
      header:{
        "content-type":"json"
      },
      success:function(res){
     //  console.log(res);
        that.processDoubanData(res.data,setterKey,categoryTitle);
      },
      fail:function(error){
        console.log(error);
      }
    });
  },
  processDoubanData:function(moviesDouban,setterKey,categoryTitle){
    var movies=[];
    for(var idx in moviesDouban.subjects){
      var subject=moviesDouban.subjects[idx];
      var title=subject.title;
      if(title.length>=6){
        title=title.substring(0,6)+"...";
      }
      var temp={
        stars:util.convertToStarsArray(subject.rating.stars),
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id
      }
      movies.push(temp);
    }
    var readyData={};
    readyData[setterKey]={
      categoryTitle:categoryTitle,
      movies:movies
    }
   // console.log(readyData.inTheaters);
    this.setData(
      readyData
    );
    console.log(this);
    wx.hideNavigationBarLoading();
  },
  //引入电影模板，绑定了点击方法，这里写跳转方法即可
  onMovieTap:function(event){
    var movieId=event.currentTarget.dataset.movieid;
    console.log(movieId);
    wx.navigateTo({
      url:"../movies/movie-detail/movie-detail?id="+movieId
    })
  },
  //点击更多电影，跳转页面
  onMoreTap:function(event){
    wx.switchTab({
      url: '../movies/movies',
    })
  },
  //点击更改定位切换城市页面
  jump:function(){
    //关闭本页去切换城市，返回时就可以重新初始化定位信息
    wx.reLaunch({
      url: '../switchcity/switchcity'
    })
  },
  //点击天气跳转到天气页面
  gotoWeather:function(){
    wx.navigateTo({
      url: '../weather/weather',
    })
  },
  ///用户点击右上角分享
  onShareAppMessage:function(){
    return {
      title:"e 生活",
      desc:"分享个小程序，希望你喜欢",
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

