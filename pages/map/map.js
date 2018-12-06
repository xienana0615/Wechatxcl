// pages/map/map.js
var bmap=require("../../libs/bmap-wx.js");
var wxMarkerData=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
      markers:[],
      latitude:'',
      longitude:'',
      placeData:{title:"点击图上的Maker获取详细信息"},
      searchMethod:"酒店",
      bitmap:'',
      fail:'',
      success:"",
      selectState:[1,0,0]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
   // console.log(that);
    var BMap = new bmap.BMapWX({
      ak: 'NKbx4MMdPHHBxpkC1hBVZM7U45db8Zfb'     
    })
    that.setData({
      bitmap: BMap
    });
    var fail=function(data){
      console.log(data);
    };
    var success=function(data){
    //  console.log(data);
      wxMarkerData=data.wxMarkerData;
      console.log(wxMarkerData);
      that.setData({
        markers: wxMarkerData,
        fail:fail
      }),
      that.setData({
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude
      })
    };
    that.setData({
      success:success
    });
  },
  markertap:function(e){
    var that=this;
    var id=e.markerId;
    that.showSearchInfo(wxMarkerData,id);
    that.changeMarkerColor(wxMarkerData,id);
  },
  showSearchInfo:function(data,i){
    var that=this;
    console.log(data[i]);
    that.setData({
      placeData:{
        title:"名称："+data[i].title+"\n",
        address:"地址："+data[i].address+"\n",
        telephone: data[i].telephone == undefined ? "电话：暂无信息" : "电话：" + data[i].telephone
      }
    })
  },
  changeMarkerColor:function(data,id){
    var that=this;
    var markersTemp=[];
    for(var i=0;i<data.length;i++){
      if(i==id){
        data[i].iconPath="../../images/marker_blue.png";
      }else{
        data[i].iconPath="../../images/marker_red.png"
      }
      markersTemp[i]=data[i];
    }
    that.setData({
      markers:markersTemp
    })
  },
  clickHotel:function(){
    this.setData({
      searchMethod:"酒店",
      selectState:[1,0,0],
      placeData:{title:"点击图上marker获取附近-酒店-信息"}
    });
   // this.onShow();
    this.data.bitmap.search({
      "query": this.data.searchMethod,
      fail: this.data.fail,
      success: this.data.success,
      iconPath: '../../images/marker_red.png',
      iconTapPath: "../../images/marker_red.png"
    });
  },
  clickFood: function () {
    this.setData({
      searchMethod: "美食",
      selectState: [0, 1, 0],
      placeData: { title: "点击图上marker获取附近-美食-信息" }
    });
  //   this.onShow();
    this.data.bitmap.search({
      "query": this.data.searchMethod,
      fail: this.data.fail,
      success: this.data.success,
      iconPath: '../../images/marker_red.png',
      iconTapPath: "../../images/marker_red.png"
    });
  },
  clickService: function () {
    this.setData({
      searchMethod: "生活服务",
      selectState: [0, 0, 1],
      placeData: { title: "点击图上marker获取附近-生活服务-信息" }
    });
   //  this.onShow();
    this.data.bitmap.search({
      "query": this.data.searchMethod,
      fail: this.data.fail,
      success: this.data.success,
      iconPath: '../../images/marker_red.png',
      iconTapPath: "../../images/marker_red.png"
    });
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
        title:"地图服务",
        desc:"分享个小程序，希望你喜欢",
        success:function(res){
          wx.showToast({
            title: '分享成功',
            duration:1000,
            icon:"success"
          })
        }
      }
  },
  makertap:function(e){

  }
})