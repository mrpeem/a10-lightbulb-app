
//var ip = require('./ip.js');
var userData = require('../userData.json');
//var userData = ip.getUserData();
var data = require('../data.json');
var categoryList = require('../categoryListData.json');
console.log("preference.js");

exports.view = function(req, res){
	res.render('preference', {
  "categoryList": categoryList,
  'loginStatus': userData.loginStatus});
  console.log(categoryList);
  console.log(data);
};

exports.updateUserData = function(usrData)
{
  userData = usrData;
};