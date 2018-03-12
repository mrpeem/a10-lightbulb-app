var data = require('../data.json');
//var ip = require('./ip.js');
var userData = require('../userData.json');
//var userData = ip.getUserData();

//return -1 if not logged in (cannot add)
//return 0 if removing from list
//return 1 if adding to list
//false otherwise (not logged in)
exports.bookmark = function(itemID)
{
	if (!userData.loginStatus) //not logged in
	{
		return -1
	}

	//logged in; check if item is alerady bookmarked
	var itemIndex = this.checkBookmark(itemID);

	if (itemIndex != -1) //already bookmarked; removed from list
	{
		userData.bookmarkedList.splice(itemIndex, 1);
		return 0;
	}
	else
	{
		userData.bookmarkedList.push(data[itemID]);		
		return 1;
	}
}

//return index of item if bookmarked; -1 otherwise
exports.checkBookmark = function(itemID)
{
	console.log("checkBookmark; itemID = "+itemID);
	for (var i = 0; i < userData.bookmarkedList.length; i++)
	{
		if (itemID == userData.bookmarkedList[i].id)
		{
			return i;
		}
	}
	return -1;
}

exports.getUserData = function()
{
  return userData;
}


exports.updateUserData = function(usrData)
{
  userData = usrData;
};