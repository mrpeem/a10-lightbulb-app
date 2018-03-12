//database
//var ip = require('./ip.js');
var userData = require('../userData.json');
//var userData = ip.getUserData();
var popularCategoryList = require('../popularCategoryListData.json');
var categoryList = require('../categoryListData.json');
var dataType = require('../dataType.json');
var data = require('../data.json');

console.log("userData ipIndex: "+userData.ipIndex);

//variables
var loginStatus = userData.loginStatus;
var totalNumberOfItems = data.length;

//set current page = home
userData.currentPageViewed = "home";
var randomNumber = Math.floor(Math.random() * totalNumberOfItems);

var todayItem = data[randomNumber];
var mediaHTML = '';
var todayType = todayItem.type;
var todayCategoryTitle = todayItem.category;
var todayItemId = todayItem.id;

console.log('todayType:' + todayType);

switch (todayType) {
  case 'image':
    console.log('image Type');
    mediaHTML = '<img id="media" src="' + todayItem.URL + '" alt="">';
    break;
  case 'video':
    console.log('video Type');
    mediaHTML = '<video style="width:100%;" controls><source src=' + todayItem.URL + ' type=video/mp4></video>';
    break;

  case 'literature':
    mediaHTML = '<img id="media" src="' + todayItem.URL + '" alt="">';
    break;

  default:
    console.log('check mediaType!');
    break;
}




//check a user is logged in or not
if (loginStatus) {
  //a returning user
  console.log('you are logged in already');
  //favorite categotyList should be shown
  var favoriteList = userData.favoriteList;
  console.log(favoriteList);
  //update currentCategorySelected to print "Favorite" text
  userData.currentCategorySelected = "Favorite";
  // copy 4 most favorite categories
  // from favoriteList to userList in userData.json
  userData.userList = [];
  for (var i = 0; i < 4; i++) {
    userData.userList.push(favoriteList[i]);
  }
} else {
  //a new user
  console.log('you are not logged in yet');
  //popular categoryList should be shown

  //update currentCategorySelected to print "Popular" text
  userData.currentCategorySelected = "Popular";

  // copy 4 most popular categories
  // from popularCategoryList to userList in userData.json
  userData.userList = [];
  for (var i = 0; i < 4; i++) {
    userData.userList.push(popularCategoryList[i]);
  }

}
var userList = userData.userList;

exports.updateUserData = function(usrData)
{
  userData = usrData;
};

exports.view = function(req, res) {  
  userData.currentItemIndex = 0;
  console.log(userList);
  res.render('index', {
    'currentCategorySelected': userData.currentCategorySelected,
    'currentUserCategoryList': userList,
    'loginStatus': userData.loginStatus,
    categoryList,
    userData,
    'dataTypeList': dataType,
    'mediaHTML': mediaHTML,
    'categoryTitle': todayCategoryTitle,
    'itemId': todayItemId
  });
};

exports.updateUserData = function(usrData)
{
  userData = usrData;
};
