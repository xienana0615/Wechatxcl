// pages/switchcity/switchcity.js
const city=require("../../utils/util.js");
var bmap = require('../../libs/bmap-wx.js'); 
const appInstance=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchLetter:[],
    showLetter:"",
    winHeight:0,
    cityList:[],
    isShowLetter:false,
    scrollTop:0,
    scrollTopId:"",
    city:"定位中",
    currentCityCode:'',
    hotcityList:[
      {cityCode:110000,city:"北京市"},
      { cityCode: 310000, city: "上海市" },
      { cityCode: 440100, city: "广州市" },
      { cityCode: 440300, city: "深圳市" },
      { cityCode: 330100, city: "杭州市" },
      { cityCode: 320100, city: "南京市" },
      { cityCode: 420100, city: "武汉市" },
      { cityCode: 120000, city: "天津市" },
      { cityCode: 610100, city: "西安市" },
    ],
    commonCityList:[
      {cityCode:110000,city:"北京市"},
      {cityCode:3100000,city:"上海市"}
    ],
    countyList:[
      { cityCode: 110000, city: "A区" },
      { cityCode: 310000, city: "B区" },
      { cityCode: 440100, city: "C区" },
      { cityCode: 440300, city: "D区" },
      { cityCode: 330100, city: "E县" },
      { cityCode: 320100, city: "F县" },
      { cityCode: 420100, city: "G县" },
    ],
    inputName:"",
    completeList:[],
    county:"",
    condition:false,
  },
  bindCity:function(e){
    console.log(e);
    this.setData({
      condition:true,
      city:e.currentTarget.dataset.city,
      currentCityCode:e.currentTarget.dataset.code,
      scrollTop:0,
      completeList:[],
    })
   // this.selectCounty();
    appInstance.globalData.defaultCity=this.data.city;
    appInstance.globalData.defaultCounty="";
  },
  // bindCounty:function(e){
  //   this.setData({
  //     county:e.currentTarget.dataset.city
  //   })
  //   appInstance.globalData.defaultCity=this.data.county;
  //   wx.switchTab({
  //     url: '../index/index',
  //   })
  // },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // console.log(options);
      console.log(city);
      const searchLetter=city.searchLetter;
      const cityList=city.cityList();
      const sysInfo=wx.getSystemInfoSync();
   //   console.log(sysInfo);
      const winHeight = sysInfo.windowHeight;
      const itemH=winHeight/searchLetter.length;
      var tempArr=[];
      searchLetter.map((item,index)=>{
        var temp={};
        temp.name=item;
        temp.tHeight=index*itemH;
        temp.bHeight=(index+1)*itemH;
        tempArr.push(temp);
      });
   
      this.setData({
        winHeight:winHeight,
        itemH:itemH,
        searchLetter:tempArr,
        cityList:cityList
      });
      this.getLocation();
  },
  getLocation:function(){
    this.setData({
      county:""
    })
    let that =this;
    wx.getLocation({
      type:"wgs84",
      success: function(res) {
        var BMap = new bmap.BMapWX({
          ak: 'NKbx4MMdPHHBxpkC1hBVZM7U45db8Zfb'
        });    
        BMap.regeocoding({
          fail: function (error) {
            console.log(error);
          },
          success:function (res){
            console.log(res);
            that.setData({
              city: res.originalData.result.addressComponent.city,
              currentCityCode: res.originalData.result.addressComponent.adcode,
              county: res.originalData.result.addressComponent.district
            })
          }
        })
      },
    })
  },
  // selectCounty:function(){
  //   let code=this.data.currentCityCode;
  //   let that=this;
  //   wx.request({
  //     url: "https://api.map.baidu.com/ws/district/v2/getchildren?&id=" + code +"&key=NKbx4MMdPHHBxpkC1hBVZM7U45db8Zfb",
  //     success:function(res){
  //       that.setData({
  //         countyList:res.data.result[0]
  //       })
  //     },
  //     fail:function(){
  //       console.log("请求区县失败，请重试")
  //     }
  //   })
  // },
  reGetLocation:function(){
      appInstance.globalData.defaultCity=this.data.city;
      appInstance.globalData.defaultCounty=this.data.county;
      wx.switchTab({
        url: '../index/index',
      })
  },
  hotCity:function(){
    this.setData({
      scrollTop:0,
    })
  },
  bindBlur:function(){
    this.setData({
      inputName:''
    })
  },
  bindKeyInput:function(e){
    console.log(e);
    this.setData({
      inputName:e.detail.value
    });
    this.auto();
  },
  auto:function(){
    let inputSd=this.data.inputName.trim();
    let sd=inputSd.toLowerCase();
    let num=sd.length;
    console.log(city);
    const cityList=city.cityObjs;
    let finalCityList=[];
    let temp=cityList.filter((item)=>{
     // console.log(item);
        let text=item.short.slice(0,num).toLowerCase();
          return (text&&text===sd)
    })
    let tempShorter=cityList.filter((itemShorter)=>{
      if(itemShorter.shorter){
        let textShorter = itemShorter.shorter.slice(0,num).toLowerCase();
        return (textShorter&&(textShorter==sd))
      }
      return;
    })
    let tempChinese=cityList.filter((itemChinese)=>{
      let textChinese=itemChinese.city.slice(0,num);
      return (textChinese&&textChinese==sd)
    })
    if(temp[0]){
      console.log(temp);
      temp.map((item)=>{
      let testObj={};
      testObj.city=item.city;
      testObj.code=item.code;
      finalCityList.push(testObj);
      })
      this.setData({
        completeList:finalCityList
      })
    }else if(tempShorter[0]){
      console.log(tempShorter);
      tempShorter.map((item)=>{
        let testObj = {};
        testObj.city = item.city;
        testObj.code = item.code;
        finalCityList.push(testObj);

      });
      this.setData({
        completeList: finalCityList
      })
    }else if(tempChinese[0]){
      console.log(tempChinese);
        tempChinese.map((item)=>{
          let testObj = {};
          testObj.city = item.city;
          testObj.code = item.code;
          finalCityList.push(testObj);

        });
      this.setData({
        completeList: finalCityList
      })
    }else{
      return;
    }
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
    return{
      title:"很赞的全国城市切换器",
      desc:"分享个小程序，希望你喜欢",
      success:function(){
          wx.showToast({
            title: '分享成功',
            duration:1000,
            icon:"success"
          })
      }
    }
  }
})