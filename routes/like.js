var data = require('../data.json');
//var ip = require('./ip.js');
var userData = require('../userData.json');
//var userData = ip.getUserData();

//return true if successfully liked (user logged in);
//false otherwise (not logged in)
exports.like = function(itemID)
{
	console.log("in routes/like");

	if (!userData.loginStatus) //not logged in
	{
		return -1
	}

	//logged in; check if item is alerady liked
	var itemIndex = this.checkLike(itemID);

	if (itemIndex != -1) //already liked; removed from list
	{
		userData.likedList.splice(itemIndex, 1);
		return 0;
	}
	else
	{
		userData.likedList.push(data[itemID]);
		return 1;
	}
}

//return index of item if liked; -1 otherwise
exports.checkLike = function(itemID)
{
	console.log("checkLike; itemID = "+itemID);
	for (var i = 0; i < userData.likedList.length; i++)
	{
		if (itemID == userData.likedList[i].id)
		{
			return i;
		}
	}
	return -1;
}

exports.updateUserData = function(usrData)
{
  userData = usrData;
};