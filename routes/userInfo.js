//var ip = require('./ip.js');
var userData = require('../userData.json');
//var userData = ip.getUserData();
var data = require('../data.json');
var wholeUserData = require('../wholeUserData.json');
var categoryList = require('../categoryListData.json');

exports.view = function(req, res) {
  var categoryTitle = req.params.categoryTitle;
  var itemId = req.params.itemId;
  var itemObj = data[itemId];
  var itemTitle = itemObj.itemTitle;
  var mediaHTML = '';
  var categoryListUser = userData.categoryList;
  var currentItemIndex = userData.currentItemIndex;
  var userIdNumber = null;
  var index = 0;
  if (userData.loginStatus) {
    // if a user logged in
    userIdNumber = userData.userIdNumber;
    userData.isScreenShared = true;
  } else {
    // need to logged in and updated userIdNumber
    //dummy
    userIdNumber = 0;
    var needLogin = true;
  }



  var currentUserListLength = userData.categoryList.length;
  console.log('currentUserListLength: ' + currentUserListLength);
  for (var i = 0; i < currentUserListLength; i++) {
    console.log(userData.categoryList[i]);
    console.log(itemId);
    index++;
    if (itemId == userData.categoryList[i].id) {
      console.log('index: ' + index);
      break;
    }
  }
  userData.currentItemIndex = index - 1;
  var categoryListUser = userData.categoryList;
  //console.log(categoryList[index-1].type);
  if (index - 1 < 0) {
    index = 0;
  }
  switch (categoryListUser[index - 1].type) {
    case 'image':
      console.log('image Type');
      mediaHTML = '<img id="media" src="' + categoryListUser[index - 1].URL + '" alt="">';
      break;
    case 'video':
      console.log('video Type');
      mediaHTML = '<video style="width:100%;" controls><source src=' + categoryListUser[index - 1].URL + ' type=video/mp4></video>';
      break;
    case 'literature':
      mediaHTML = '<img id="media" src="' + categoryListUser[index - 1].URL + '" alt="">';
      break;

      case 'music':
        mediaHTML = '<audio style="width:70%;" controls><source src="'+ categoryListUser[index - 1].URL  + '" type="audio/ogg">Your browser does not support the audio element.</audio>';
        break;
    default:
      console.log('check mediaType!');
      break;
  }

  console.log('categoryTitle: ' + categoryTitle);
  res.render('play', {
    'pageTitle': categoryTitle,
    'type': mediaHTML,
    'itemId': itemId,
    'itemTitle': categoryListUser[index - 1].itemTitle,
    'caption': categoryListUser[index - 1].caption,
    'itemID': categoryListUser[index - 1].id,
    'isScreenShared': userData.isScreenShared,
    'userIdNumber': userData.userIdNumber,
    categoryList,
    'loginStatus': userData.loginStatus,
    needLogin
  });
};

exports.view2 = function(req, res) {
  var categoryTitle = req.params.categoryTitle;
  var itemId = req.params.itemId;
  var itemObj = data[itemId];
  var index = 0;
  var mediaHTML = '';

  //find index number from userlist
  var currentUserListLength = userData.categoryList.length;
  console.log('currentUserListLength: ' + currentUserListLength);
  for (var i = 0; i < currentUserListLength; i++) {
    console.log(userData.categoryList[i]);
    console.log(itemId);
    index++;
    if (itemId == userData.categoryList[i].id) {
      console.log('index: ' + index);
      break;
    }
  }
  userData.currentItemIndex = index - 1;
  var categoryListUser = userData.categoryList;
  //console.log(categoryList[index-1].type);
  if (index - 1 < 0) {
    index = 0;
  }
  switch (categoryListUser[index - 1].type) {
    case 'image':
      console.log('image Type');
      mediaHTML = '<img id="media" src="' + categoryListUser[index - 1].URL + '" alt="">';
      break;
    case 'video':
      console.log('video Type');
      mediaHTML = '<video style="width:100%;" controls><source src=' + categoryListUser[index - 1].URL + ' type=video/mp4></video>';
      break;
      case 'literature':
        mediaHTML = '<img id="media" src="' + categoryListUser[index - 1].URL + '" alt="">';
        break;
        case 'music':
          mediaHTML = '<audio style="width:70%;" controls><source src="'+ categoryListUser[index - 1].URL  + '" type="audio/ogg">Your browser does not support the audio element.</audio>';
          break;
    default:
      console.log('check mediaType!');
      break;
  }

  console.log('categoryTitle: ' + categoryTitle);
  userData.isScreenShared = false;
  res.render('play', {
    'pageTitle': categoryTitle,
    'type': mediaHTML,
    'itemId': itemId,
    'itemTitle': categoryListUser[index - 1].itemTitle,
    'caption': categoryListUser[index - 1].caption,
    'itemID': categoryListUser[index - 1].id,
    'isScreenShared': userData.isScreenShared,
    'userIdNumber': userData.userIdNumber,
    categoryList,
    'loginStatus': userData.loginStatus
  });
};

exports.enterChatRoom = function(req, res) {
  var categoryTitle = req.params.categoryTitle;
  var itemId = req.params.itemId;
  var itemObj = data[itemId];
  var index = 0;
  var mediaHTML = '';
  userData.isAtChatroom = true;

  //find index number from userlist
  var currentUserListLength = userData.categoryList.length;
  console.log('currentUserListLength: ' + currentUserListLength);
  for (var i = 0; i < currentUserListLength; i++) {
    console.log(userData.categoryList[i]);
    console.log(itemId);
    index++;
    if (itemId == userData.categoryList[i].id) {
      console.log('index: ' + index);
      break;
    }
  }
  userData.currentItemIndex = index - 1;
  var categoryListUser = userData.categoryList;
  //console.log(categoryList[index-1].type);
  if (index - 1 < 0) {
    index = 0;
  }
  switch (categoryListUser[index - 1].type) {
    case 'image':
      console.log('image Type');
      mediaHTML = '<img id="media" src="' + categoryListUser[index - 1].URL + '" alt="">';
      break;
    case 'video':
      console.log('video Type');
      mediaHTML = '<video style="width:100%;" controls><source src=' + categoryListUser[index - 1].URL + ' type=video/mp4></video>';
      break;
      case 'literature':
        mediaHTML = '<img id="media" src="' + categoryListUser[index - 1].URL + '" alt="">';
        break;
        case 'music':
          mediaHTML = '<audio style="width:70%;" controls><source src="'+ categoryListUser[index - 1].URL  + '" type="audio/ogg">Your browser does not support the audio element.</audio>';
          break;
    default:
      console.log('check mediaType!');
      break;
  }


  console.log('isAtChatroom: ' + userData.isAtChatroom);
  res.render('play', {
    'pageTitle': categoryTitle,
    'type': mediaHTML,
    'itemId': itemId,
    'itemTitle': categoryListUser[index - 1].itemTitle,
    'caption': categoryListUser[index - 1].caption,
    'itemID': categoryListUser[index - 1].id,
    'isScreenShared': userData.isScreenShared,
    'userIdNumber': userData.userIdNumber,
    'isAtChatroom': userData.isAtChatroom,
    categoryList,
    'loginStatus': userData.loginStatus
  });
};


exports.exitChatRoom = function(req, res) {
  var categoryTitle = req.params.categoryTitle;
  var itemId = req.params.itemId;
  var itemObj = data[itemId];
  var index = 0;
  var mediaHTML = '';
  userData.isAtChatroom = false;

  //find index number from userlist
  var currentUserListLength = userData.categoryList.length;
  console.log('currentUserListLength: ' + currentUserListLength);
  for (var i = 0; i < currentUserListLength; i++) {
    console.log(userData.categoryList[i]);
    console.log(itemId);
    index++;
    if (itemId == userData.categoryList[i].id) {
      console.log('index: ' + index);
      break;
    }
  }
  userData.currentItemIndex = index - 1;
  var categoryListUser = userData.categoryList;
  //console.log(categoryList[index-1].type);
  if (index - 1 < 0) {
    index = 0;
  }
  switch (categoryListUser[index - 1].type) {
    case 'image':
      console.log('image Type');
      mediaHTML = '<img id="media" src="' + categoryListUser[index - 1].URL + '" alt="">';
      break;
    case 'video':
      console.log('video Type');
      mediaHTML = '<video style="width:100%;" controls><source src=' + categoryListUser[index - 1].URL + ' type=video/mp4></video>';
      break;
      case 'literature':
        mediaHTML = '<img id="media" src="' + categoryListUser[index - 1].URL + '" alt="">';
        break;
        case 'music':
          mediaHTML = '<audio style="width:70%;" controls><source src="'+ categoryListUser[index - 1].URL  + '" type="audio/ogg">Your browser does not support the audio element.</audio>';
          break;
    default:
      console.log('check mediaType!');
      break;
  }


  console.log('isAtChatroom: ' + userData.isAtChatroom);
  res.render('play', {
    'pageTitle': categoryTitle,
    'type': mediaHTML,
    'itemId': itemId,
    'itemTitle': categoryListUser[index - 1].itemTitle,
    'caption': categoryListUser[index - 1].caption,
    'itemID': categoryListUser[index - 1].id,
    'isScreenShared': userData.isScreenShared,
    'userIdNumber': userData.userIdNumber,
    'isAtChatroom': userData.isAtChatroom,
    categoryList,
    'loginStatus': userData.loginStatus

  });
};


exports.exitChatRoomInfo = function(req, res) {
  var categoryTitle = req.params.categoryTitle;
  var itemId = req.params.itemId;
  var itemObj = data[itemId];
  var itemTitle = itemObj.itemTitle;
  var itemDescription = itemObj.summary;
  var itemExtraInfo = itemObj.extraInfo;
  var mediaHTML = '';
  userData.isAtChatroom = false;
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
    'loginStatus': userData.loginStatus

  });
};


exports.enterChatRoomInfo = function(req, res) {
  var categoryTitle = req.params.categoryTitle;
  var itemId = req.params.itemId;
  var itemObj = data[itemId];
  var itemTitle = itemObj.itemTitle;
  var itemDescription = itemObj.summary;
  var itemExtraInfo = itemObj.extraInfo;
  var mediaHTML = '';
  userData.isAtChatroom = true;
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
    'loginStatus': userData.loginStatus

  });
};

exports.exitShareInfo = function(req, res) {
  var categoryTitle = req.params.categoryTitle;
  var itemId = req.params.itemId;
  var itemObj = data[itemId];
  var itemTitle = itemObj.itemTitle;
  var itemDescription = itemObj.summary;
  var itemExtraInfo = itemObj.extraInfo;
  var mediaHTML = '';
  userData.isAtChatroom = false;
  userData.isScreenShared = false;

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
    'loginStatus': userData.loginStatus


  });
};

exports.shareView = function(req, res) {
  var userIdNumber = req.params.userIdNumber;
  var itemIndex = req.params.itemId;
  var categoryTitle = req.params.categoryTitle;
  var mediaHTML = '';
  console.log(wholeUserData[userIdNumber]);
  userData.userRole = "viewer";
  userData.categoryList = [];
  userData.isScreenShared = true;
  var length = wholeUserData[userIdNumber].categoryList.length;
  console.log(length);
  for (var i = 0; i < length; i++) {
    userData.categoryList.push(wholeUserData[userIdNumber].categoryList[i]);
  }

  console.log(userData.categoryList);



  console.log("current Item (Ready To View):" + userData.categoryList[itemIndex].URL);
  //need to check type
  var categoryListUser = userData.categoryList;

  switch (categoryListUser[itemIndex].type) {
    case 'image':
      console.log('image Type');
      mediaHTML = '<img id="media" src="' + categoryListUser[itemIndex].URL + '" alt="">';
      break;
    case 'video':
      console.log('video Type');
      mediaHTML = '<video style="width:100%;" controls><source src=' + categoryListUser[itemIndex].URL + ' type=video/mp4></video>';
      break;
      case 'literature':
        mediaHTML = '<img id="media" src="' + categoryListUser[itemIndex].URL + '" alt="">';
        break;

        case 'music':
          mediaHTML = '<audio style="width:70%;" controls><source src="'+ categoryListUser[itemIndex].URL  + '" type="audio/ogg">Your browser does not support the audio element.</audio>';
          break;
    default:
      console.log('check mediaType!');
      break;
  }



  console.log(categoryTitle);
  console.log("isScreenShared:" + userData.isScreenShared);


  res.render('play', {
    'pageTitle': categoryTitle,
    'type': mediaHTML,
    'itemTitle': categoryListUser[itemIndex].itemTitle,
    'caption': categoryListUser[itemIndex].caption,
    'itemID': categoryListUser[itemIndex].id,
    'isScreenShared': userData.isScreenShared,
    'userIdNumber': userData.userIdNumber,
    'isAtChatroom': userData.isAtChatroom,
    categoryList,
    'loginStatus': userData.loginStatus
  });
};

exports.enterChatRoomShare = function(req, res) {
  var categoryTitle = req.params.categoryTitle;
  var itemId = req.params.itemId;
  var itemObj = data[itemId];
  var itemTitle = itemObj.itemTitle;
  var mediaHTML = '';
  var categoryListUser = userData.categoryList;
  var currentItemIndex = userData.currentItemIndex;
  var userIdNumber = 0;
  userData.isAtChatroom = true;
  if (userData.loginStatus) {
    userIdNumber = userData.userIdNumber;
  } else {
    // dummy data
    userIdNumber = 0;
  }



  switch (categoryListUser[currentItemIndex].type) {
    case 'image':
      console.log('image Type');
      mediaHTML = '<div class="preview-content"><img id="media" src="' + categoryListUser[currentItemIndex].URL + '" alt=""></div>';
      break;
    case 'video':
      console.log('video Type');
      mediaHTML = '<video style="width:100%;" controls><source src=' + categoryListUser[currentItemIndex].URL + ' type=video/mp4></video>';
      break;

      case 'literature':
        mediaHTML = '<div class="preview-content"><img id="media" src="' + categoryListUser[currentItemIndex].URL + '" alt=""></div>';
        break;
        case 'music':
          mediaHTML = '<audio style="width:70%;" controls><source src="'+ categoryListUser[currentItemIndex].URL  + '" type="audio/ogg">Your browser does not support the audio element.</audio>';
          break;
    default:
      console.log('check mediaType!');
      break;
  }



  res.render('share', {
    'categoryTitle': categoryTitle,
    'itemTitle': itemTitle,
    'itemId': itemId,
    'mediaHTML': mediaHTML,
    'itemIdTotal': itemId,
    'userIdNumber': userIdNumber,
    categoryList,
    'loginStatus': userData.loginStatus,
    'isScreenShared': userData.isScreenShared,
    'userIdNumber': userData.userIdNumber,
    'isAtChatroom': userData.isAtChatroom

  });


  //console.log(itemExtraInfo[1].contentHTML.container[0]);


};
exports.exitChatRoomShare = function(req, res) {
  var categoryTitle = req.params.categoryTitle;
  var itemId = req.params.itemId;
  var itemObj = data[itemId];
  var itemTitle = itemObj.itemTitle;
  var mediaHTML = '';
  var categoryListUser = userData.categoryList;
  var currentItemIndex = userData.currentItemIndex;
  var userIdNumber = 0;
  userData.isAtChatroom = false;
  if (userData.loginStatus) {
    userIdNumber = userData.userIdNumber;
  } else {
    // dummy data
    userIdNumber = 0;
  }



  switch (categoryListUser[currentItemIndex].type) {
    case 'image':
      console.log('image Type');
      mediaHTML = '<div class="preview-content"><img id="media" src="' + categoryListUser[currentItemIndex].URL + '" alt=""></div>';
      break;
    case 'video':
      console.log('video Type');
      mediaHTML = '<video style="width:100%;" controls><source src=' + categoryListUser[currentItemIndex].URL + ' type=video/mp4></video>';
      break;
      case 'literature':
        mediaHTML = '<div class="preview-content"><img id="media" src="' + categoryListUser[currentItemIndex].URL + '" alt=""></div>';
        break;

        case 'music':
          mediaHTML = '<audio style="width:70%;" controls><source src="'+ categoryListUser[currentItemIndex].URL  + '" type="audio/ogg">Your browser does not support the audio element.</audio>';
          break;
    default:
      console.log('check mediaType!');
      break;
  }



  res.render('share', {
    'categoryTitle': categoryTitle,
    'itemTitle': itemTitle,
    'itemId': itemId,
    'mediaHTML': mediaHTML,
    'itemIdTotal': itemId,
    'userIdNumber': userIdNumber,
    categoryList,
    'loginStatus': userData.loginStatus,
    'isScreenShared': userData.isScreenShared,
    'userIdNumber': userData.userIdNumber,
    'isAtChatroom': userData.isAtChatroom

  });


  //console.log(itemExtraInfo[1].contentHTML.container[0]);


};

exports.updateUserData = function(usrData)
{
  userData = usrData;
};
