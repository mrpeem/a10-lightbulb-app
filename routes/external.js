//database
var data = require('../data.json');
var categoryList = require('../categoryListData.json');
//var ip = require('./ip.js');
var userData = require('../userData.json');
//var userData = ip.getUserData();

exports.view = function(req, res) {
  var categoryTitle = req.params.categoryTitle;
  var itemId = req.params.itemId;
  var externalId = req.params.externalId;
  var extraInfoLength = data[itemId].extraInfo.length;
  var containerIndex = 0;
  var externalURL = '';
  //need to find URL from webURL


  console.log('info length: ' + extraInfoLength);
  for (var i = 0; i < extraInfoLength; i++) {
    console.log(data[itemId].extraInfo[i]);
    if (data[itemId].extraInfo[i].type == "nearSearch") {
      console.log('found nearSearch');
      console.log('found index' + i);
      containerIndex = i;
      break;
    }
  }

  console.log(data[itemId].extraInfo[containerIndex].container[externalId].webURL);


  res.render('external', {
    'categoryTitle': categoryTitle,
    'itemId': itemId,
    'URL': data[itemId].extraInfo[containerIndex].container[externalId].webURL,
    categoryList,
    'loginStatus': userData.loginStatus
  });
};

exports.updateUserData = function(usrData)
{
  userData = usrData;
};
