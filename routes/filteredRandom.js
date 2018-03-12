//database
//var ip = require('./ip.js');
var userData = require('../userData.json');
//var userData = ip.getUserData();
var dataType = require('../dataType.json');
var data = require('../data.json');


exports.view = function(req, res) {
  var filterOption = req.params.title
  var totalNumberOfData = data.length;
  userData.categoryList = [];
  var mediaHTML = '';


  console.log("you selected " + filterOption + " option");
  console.log("currently " + totalNumberOfData + " items in data.json");

  for (var i = 0; i < totalNumberOfData; i++) {
    if (data[i].type == filterOption) {
      console.log("item id " + i + " is matched with " + filterOption);
      userData.categoryList.push(data[i]);
    }
  }

  console.log("after search filteroption categoryList has " + userData.categoryList.length + ' items');


  switch (filterOption) {
    case 'image':
      console.log('image Type');
      mediaHTML = '<img id="media" src="' + userData.categoryList[userData.currentItemIndex].URL + '" alt="">';
      break;
    case 'video':
      console.log('video Type');
      mediaHTML = '<video style="width:100%;" controls><source src=' + userData.categoryList[userData.currentItemIndex].URL + ' type=video/mp4></video>';
      break;

    case 'literature':
      mediaHTML = '<img id="media" src="' + userData.categoryList[userData.currentItemIndex].URL + '" alt="">';
      break;
    case 'music':
      mediaHTML = '<audio style="width:70%;" controls><source src="'+ userData.categoryList[userData.currentItemIndex].URL + '" type="audio/ogg">Your browser does not support the audio element.</audio>';
      break;
    default:
      console.log('check mediaType!');
      break;
  }



 console.log("filtered room");
 console.log(userData);

  res.render('play', {
    "isScreenShared": userData.isScreenShared,
    "userIdNumber": userData.userIdNumber,
    "pageTitle": filterOption,
    "itemID": userData.currentItemIndex,
    'type': mediaHTML,
    'isOneItem': false,
    'isAtChatroom': userData.isAtChatroom,
    'itemTitle': userData.categoryList[userData.currentItemIndex].itemTitle,
    'caption': userData.categoryList[userData.currentItemIndex].caption



  });

};

exports.updateUserData = function(usrData)
{
  userData = usrData;
};
