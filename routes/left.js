//var ip = require('./ip.js');
var userData = require('../userData.json');
//var userData = ip.getUserData();
var categoryList = require('../categoryListData.json');




exports.view = function(req, res) {

  var catagoryTitle = req.params.categoryTitle;
  var itemIndex = userData.currentItemIndex;
  var length = userData.categoryList.length;
  var mediaHTML = '';

  console.log('catagoryTitle: ' + catagoryTitle);
  console.log('itemIndex: ' + itemIndex);
  console.log('length' + length);

  if (itemIndex === 0) {
    itemIndex = length;
  }
  itemIndex--;
  userData.currentItemIndex = itemIndex;


  console.log("currentItemIndex: " + itemIndex);

  var itemObj = userData.categoryList[itemIndex];
  var itemTitle = itemObj.itemTitle;
  var caption = itemObj.caption;
  var itemURL = itemObj.URL;
  var itemType = itemObj.type;
  var itemID = itemObj.id;
  console.log(itemType);
  console.log(itemURL);
  console.log('catagoryTitle: ' + catagoryTitle);
  switch (itemType) {
    case 'image':
      console.log('image Type');
      mediaHTML = '<img id="media" src="' + itemURL + '" alt="">';
      break;

    case 'video':
      console.log('video Type');
      mediaHTML = '<video style="width:100%;" controls><source src=' + itemURL + ' type=video/mp4></video>';
      break;

    case 'literature':
      mediaHTML = '<img id="media" src="' + itemURL + '" alt="">';
      break;
      case 'music':
        mediaHTML = '<audio style="width:70%;" controls><source src="'+ itemURL + '" type="audio/ogg">Your browser does not support the audio element.</audio>';
        break;
    default:
      console.log('check mediaType!');
      break;
  }

  console.log('Last catagoryTitle: ' + catagoryTitle);
  res.render('play', {
    'pageTitle': catagoryTitle,
    'type': mediaHTML,
    'itemTitle': itemTitle,
    'caption': caption,
    'itemID': itemID,
    'isScreenShared': userData.isScreenShared,
    'userIdNumber': userData.userIdNumber,
    'isAtChatroom': userData.isAtChatroom,
    categoryList,
    'loginStatus': userData.loginStatus
  });

};

exports.updateUserData = function(usrData)
{
  userData = usrData;
};
