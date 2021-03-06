//var ip = require('./ip.js');
var userData = require('../userData.json');
//var userData = ip.getUserData();
var data = require('../data.json');
var categoryList = require('../categoryListData.json');
var wholeUserData = require('../wholeUserData.json');
var dataTypeList = require('../dataType.json');
var userIP = require('../userIP.json');
var defaultUserData = require('../defaultUserData.json');

var ipIndex = userData.ipIndex;

function addMediaHTML(){};

//----------------------------------------------------
//------------------ main functions ------------------
//----------------------------------------------------

exports.view = function(req, res) {
  console.log("exports.view in routes/profile.js");

  var loginStatus = userData.loginStatus;
  console.log("User is loggeed in: " + loginStatus);
  if (loginStatus)
  {
    console.log(userData);
  }

  if (!loginStatus) //not logged in; show pop up 
  { 
    res.render('profile_popup');
  } 
  else //logged in; show profile page
  {
    addMediaHTML();
    res.render('profile', userData);  
  }
};

exports.edit = function(req, res) {
  res.render('profile_edit', userData);
}

//return true if successful login; false otherwise
exports.login = function(email, password, userName, img, actualName)
{
  console.log("in ROUTES/PROFILE.LOGIN; email = "+email);
  //check if existing user (matching email and password in database)
  var i;
  if ( (i = this.existingUser(email, password, true)) != -1)
  {
    populateUserData(i);
    return true;
  }

  //-----------------------

  var facebook_google_login = userName != null;

  //not existing user; if Facebook or Google login, create user based on extracted info
  if (facebook_google_login)
  {
    this.register(email, password, userName, img, actualName)

    return true;
  }

  return false; //not existing user and manual login = invalid login info  
}


exports.register = function(email, password, userName, img, actualName)
{
  var i;
  if ( (i = this.existingUser(email, password, false) != -1) )
  {
    return false;
  }

  //user doesn't exist; register user with provided info
  var id = wholeUserData.length;
  var newUser = createNewUser(id, userName, password, email, img, actualName);

  wholeUserData.push(JSON.parse( JSON.stringify(newUser) ));
  populateUserData(id); 

  for (var i = 0; i < data.length; i++) {
    userData.categoryList.push(data[i])
  }


  return true;
}


exports.logout = function()
{ 
  //stores data in wholeUserData
  wholeUserData[userData.userIdNumber] = JSON.parse(JSON.stringify(userData));

  //replace userData with default user data
  userData = JSON.parse(JSON.stringify(defaultUserData));
};


//------------------ side/helper functions ------------------

//return userIdNumber if user exists; -1 otherwise
exports.existingUser = function(email, password, checkPassword)
{
  for (var i = 0; i < wholeUserData.length; i++) 
  {
    //user alreay exists
    if (email == wholeUserData[i].email) 
    {
      if (checkPassword && password != wholeUserData[i].password)
      {
        return -1;
      }
      return i;
    }
  }

  return -1; //new user
}

//return userIdNumber if user exists; -1 otherwise
exports.existingUserName = function(userName)
{
  for (var i = 0; i < wholeUserData.length; i++) 
  {
    //user alreay exists
    if (userName == wholeUserData[i].userName) 
    {
      return true;
    }
  }

  return false; //new user
}

//helper function to create new users
function createNewUser(id, userName, password, email, img, actualName) {
  var newUser = JSON.parse(JSON.stringify(defaultUserData));

  newUser.userIdNumber = id;
  newUser.userName = userName;
  newUser.password = password;
  newUser.profileImgURL = img;
  newUser.actualName = actualName;
  newUser.email = email;
  newUser.loginStatus = true;
  return newUser;
}

//helper function to populate userData after new user/existing user logs in
//sets userData to values from wholeUserData
function populateUserData(userIdNumber) {
  userData = JSON.parse(JSON.stringify(wholeUserData[userIdNumber]));
  userData["currentPageViewed"] = null;
  userData["currentCategorySelected"] = null;
  userData["loginStatus"] = true;
  userData["ipIndex"] = ipIndex;
}

exports.getUserData = function()
{
  return userData;
}

exports.updateUserData = function(usrData)
{
  userData = usrData;
};

exports.changeInfo = function(email, actualName, userName, description)
{
  var existingEmail = false;
  var existingUserName = false;

  if (userData.email != email) //try to change email
  {
    existingEmail = this.existingUser(email, "", false) != -1;
  }

  if (userData.userName != userName) //try to change username
  {

    existingUserName = this.existingUserName(userName);
  }

  if (!existingEmail) //change email if it doesn't exist
  {
    userData["email"] = email;
  }
  if (!existingUserName) //change username if it doesn't exist
  {
    userData["userName"] = userName;
  }

  //change actualName and description regardless
  userData["actualName"] = actualName;
  userData["description"] = description;

  console.log(userData);
  return existingEmail+" "+existingUserName;
}

exports.changePassword = function(originalPassword, newPassword1, newPassword2)
{
  var correctPassword = (userData.password == originalPassword)? true : false;
  var validPassword = (newPassword1 == newPassword2)? true : false;

  if (correctPassword && validPassword) //valid new password
  {
    userData['password'] = newPassword2;
  }

  console.log(userData);
  return correctPassword+" "+validPassword;
}

function addMediaHTML()
{
  console.log("addMediaHTML in routes/profile");
  for (var i = 0; i < userData.bookmarkedList.length; i++)
  {
    var mediaHTML = getMediaHTML(userData.bookmarkedList[i]);
    userData.bookmarkedList[i]['mediaHTML'] = mediaHTML;
  }

  /*
  for (var i = 0; i < user.UPLOADLIST.length; i++)
  {
    var mediaHTML = getMediaHTML(userData.UPLOADLIST[i]);
    userData.UPLOADLIST[i]['mediaHTML'] = mediaHTML
  }*/

  for (var i = 0; i < userData.sharedList.length; i++)
  {
    var mediaHTML = getMediaHTML(userData.sharedList[i]);
    userData.sharedList[i]['mediaHTML'] = mediaHTML
  }
  
}

function getMediaHTML(item)
{
  var mediaHTML;
  switch(item.type)
  {
    case 'image':
          console.log('image Type');
          mediaHTML = '<img id="mediaHTML" src="'+item.URL+'" alt="">';
          break;
      case 'video':
          console.log('video Type');
          mediaHTML = '<video id="mediaHTML" style="width:100%;" controls><source src='+ item.URL+' type=video/mp4></video>';
          break;
      case 'literature':
          mediaHTML = '<img id="mediaHTML" src="' + item.URL + '" alt="">';
          break;
      case 'music':
        mediaHTML = '<div id="mediaHTML"> <audio id="audio" style="width:70%;" controls><source src="'
                    + item.URL + '" type="audio/ogg">Your browser does not support the audio element.'
                    +'</audio></div>';
        break;
      default:
          console.log('check mediaType!');
          break;
  }

  return mediaHTML;

}
