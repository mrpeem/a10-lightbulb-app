//var ip = require('./ip.js');
var userData = require('../userData.json');
//var userData = ip.getUserData();
var data = require('../data.json');
var categoryList = require('../categoryListData.json');


exports.view = function(req, res) {
  var categoryTitle = req.params.categoryTitle;
  var itemId = req.params.itemId;
  var itemObj = data[itemId];
  var itemTitle = itemObj.itemTitle;
  var itemDescription = itemObj.summary;
  var itemExtraInfo = itemObj.extraInfo;
  var mediaHTML = '';
  if (itemExtraInfo.length > 0) {
    console.log("item found");

    for (var i = 0; i < itemExtraInfo.length; i++) {
      switch (itemExtraInfo[i].type) {
        case "location":
          console.log("location form is loaded");
          mediaHTML = '<div class="page-box location"><div id="location-addr">' + itemExtraInfo[0].content + '</div><div id="location-btn">' +
            ' Get Direction &gt;</div><div id="location-map"><img src="' + itemObj.extraInfo[0].imageURL + '" alt=""></div></div>';
          itemExtraInfo[i].contentHTML = mediaHTML;
          break;
        case "nearSearch":
          console.log("nearSearch form is loaded");
          var extraInfoLength = itemExtraInfo[i].container.length;
          for (var j = 0; j < extraInfoLength; j++) {
            var mediaHTML = '<div class="page-box box-btn page-box-padding weather"><a class="box-a" href="/' + categoryTitle + '/' + itemId + '/info/' + j + '/external">' +
              '<div class="box-title"><span class="box-data">' + itemExtraInfo[i].container[j].title + '</span> <span class="next">&gt;</span></div></a><div class="weather-temp">' +
              '<span id="temp-data' + j + '">' + itemExtraInfo[i].container[j].tempDataF + '</span> <span clsss="temp-options"><span class="temp-active" id="temp-f' + j + '">&deg;F</span><span class="temp-div">&nbsp;&nbsp;|</span> <span id="temp-c' + j + '">&deg;C</span></span>' +
              '</div><div class="weather-icon"><img src="' + itemExtraInfo[i].container[j].iconURL + '" alt="" width="50rem;"></div></div>';
            itemExtraInfo[i].container[j].mediaHTML = mediaHTML;
          }
        default:
          mediaHTML = '';
      }
    }



  } else {
    console.log("item not found");
  }


  //console.log(itemExtraInfo[1].contentHTML.container[0]);

  res.render('info', {
    'categoryTitle': categoryTitle,
    'itemTitle': itemTitle,
    'itemId': itemId,
    'description': itemDescription,
    'extra': itemExtraInfo,
    'mediaHTML': mediaHTML,
    'isScreenShared': userData.isScreenShared,
    'userIdNumber': userData.userIdNumber,
    'isAtChatroom': userData.isAtChatroom,
    categoryList,
    'loginStatus': userData.loginStatus

  });
};


exports.viewOne = function(req, res) {
  var categoryTitle = req.params.categoryTitle;
  var itemId = req.params.itemId;
  var itemObj = data[itemId];
  var itemTitle = itemObj.itemTitle;
  var itemDescription = itemObj.summary;
  var itemExtraInfo = itemObj.extraInfo;
  var mediaHTML = '';
  var isOneItem = true;
  if (itemExtraInfo.length > 0) {
    console.log("item found");

    for (var i = 0; i < itemExtraInfo.length; i++) {
      switch (itemExtraInfo[i].type) {
        case "location":
          console.log("location form is loaded");
          mediaHTML = '<div class="page-box location"><div id="location-addr">' + itemExtraInfo[0].content + '</div><div id="location-btn">' +
            ' Get Direction &gt;</div><div id="location-map"><img src="' + itemObj.extraInfo[0].imageURL + '" alt=""></div></div>';
          itemExtraInfo[i].contentHTML = mediaHTML;
          break;
        case "nearSearch":
          console.log("nearSearch form is loaded");
          var extraInfoLength = itemExtraInfo[i].container.length;
          for (var j = 0; j < extraInfoLength; j++) {
            var mediaHTML = '<div class="page-box box-btn page-box-padding weather"><a class="box-a" href="/' + categoryTitle + '/' + itemId + '/info/' + j + '/external">' +
              '<div class="box-title"><span class="box-data">' + itemExtraInfo[i].container[j].title + '</span> <span class="next">&gt;</span></div></a><div class="weather-temp">' +
              '<span id="temp-data' + j + '">' + itemExtraInfo[i].container[j].tempDataF + '</span> <span clsss="temp-options"><span class="temp-active" id="temp-f' + j + '">&deg;F</span><span class="temp-div">&nbsp;&nbsp;|</span> <span id="temp-c' + j + '">&deg;C</span></span>' +
              '</div><div class="weather-icon"><img src="' + itemExtraInfo[i].container[j].iconURL + '" alt="" width="50rem;"></div></div>';
            itemExtraInfo[i].container[j].mediaHTML = mediaHTML;
          }
        default:
          mediaHTML = '';
      }
    }



  } else {
    console.log("item not found");
  }


  //console.log(itemExtraInfo[1].contentHTML.container[0]);

  res.render('info', {
    'categoryTitle': categoryTitle,
    'itemTitle': itemTitle,
    'itemId': itemId,
    'description': itemDescription,
    'extra': itemExtraInfo,
    'mediaHTML': mediaHTML,
    'isScreenShared': userData.isScreenShared,
    'userIdNumber': userData.userIdNumber,
    'isAtChatroom': userData.isAtChatroom,
    categoryList,
    'loginStatus': userData.loginStatus,
    isOneItem

  });
};

exports.updateUserData = function(usrData)
{
  userData = usrData;
};
