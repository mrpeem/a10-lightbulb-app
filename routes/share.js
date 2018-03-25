//var ip = require('./ip.js');
var userData = require('../userData.json');
//var userData = ip.getUserData();
var data = require('../data.json');
var wholeUserData = require('../wholeUserData.json');
var categoryList = require('../categoryListData.json');


exports.linkview = function(req, res) {
  var categoryTitle = req.params.categoryTitle;
  var itemId = req.params.itemId;
  var itemObj = data[itemId];
  var itemTitle = itemObj.itemTitle;
  var mediaHTML = '';
  var type = itemObj.type;
  console.log(type);
  switch (type) {
    case 'image':
      console.log('image Type');
      mediaHTML = '<img id="media" src="' + itemObj.URL + '" alt="">';
      break;
    case 'video':
      console.log('video Type');
      mediaHTML = '<video style="width:100%;" controls><source src=' + itemObj.URL + ' type=video/mp4></video>';
      break;

    case 'literature':
      mediaHTML = '<img id="media" src="' + itemObj.URL + '" alt="">';
      break;

      case 'music':
        mediaHTML = '<audio style="width:70%;" controls><source src="'+ itemObj.URL  + '" type="audio/ogg">Your browser does not support the audio element.</audio>';
        break;

    default:
      console.log('check mediaType!');
      break;
  }
  res.render('link', {
    "type": mediaHTML,
    "itemTitle": itemTitle,
    "caption": itemObj.caption,
    "des": itemObj.summary,
    "itemID": itemId,
    'loginStatus': userData.loginStatus,
    'isScreenShared': userData.isScreenShared,
    'userIdNumber': userData.userIdNumber,
    'isAtChatroom': userData.isAtChatroom
  });
};

exports.view = function(req, res) {
  data['viewAlt'] = false;
  var categoryTitle = req.params.categoryTitle;
  var itemId = req.params.itemId;
  var itemObj = data[itemId];
  var itemTitle = itemObj.itemTitle;
  var mediaHTML = '';
  var categoryListUser = userData.categoryList;
  var currentItemIndex = userData.currentItemIndex;
  var userIdNumber = 0;
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
    'isAtChatroom': userData.isAtChatroom,
    'data': data

  });
};

exports.viewAlt = function(req, res) {
  data['viewAlt'] = true;
  var categoryTitle = req.params.categoryTitle;
  var itemId = req.params.itemId;
  var itemObj = data[itemId];
  var itemTitle = itemObj.itemTitle;
  var mediaHTML = '';
  var categoryListUser = userData.categoryList;
  var currentItemIndex = userData.currentItemIndex;
  var userIdNumber = 0;
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
    'isAtChatroom': userData.isAtChatroom,
    'data': data

  });
};

exports.infoview = function(req, res) {
  var itemId = req.params.itemId;
  var itemObj = data[itemId];
  var itemTitle = itemObj.itemTitle;
  var itemDescription = itemObj.summary;
  var itemExtraInfo = itemObj.extraInfo;
  var mediaHTML = '';
  console.log(itemExtraInfo.length);
  console.log(itemObj);
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
            var mediaHTML = '<div class="page-box box-btn page-box-padding weather"><a class="box-a" href="/sharedlink/' + itemId + '/info/' + j + '/external">' +
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




  res.render('linkinfo', {
    'itemTitle': itemTitle,
    'itemId': itemId,
    'description': itemDescription,
    'extra': itemExtraInfo,
    'mediaHTML': mediaHTML,
    'loginStatus': userData.loginStatus

  });
};

exports.shareview = function(req, res) {
  var categoryTitle = req.params.categoryTitle;
  var itemId = req.params.itemId;
  var itemObj = data[itemId];
  var itemTitle = itemObj.itemTitle;
  var itemDescription = itemObj.summary;
  var itemExtraInfo = itemObj.extraInfo;
  var mediaHTML = '';


  console.log(itemExtraInfo.length);
  console.log(itemObj);

  switch (itemObj.type) {
    case 'image':
      console.log('image Type');
      mediaHTML = '<div class="preview-content"><img id="media" src="' + itemObj.URL + '" alt=""></div>';
      break;
    case 'video':
      console.log('video Type');
      mediaHTML = '<video style="width:100%;" controls><source src=' + itemObj.URL + ' type=video/mp4></video>';
      break;
    case 'literature':
      mediaHTML = '<div class="preview-content"><img id="media" src="' + itemObj.URL + '" alt=""></div>';
      break;

      case 'music':
        mediaHTML = '<audio style="width:70%;" controls><source src="'+ itemObj.URL  + '" type="audio/ogg">Your browser does not support the audio element.</audio>';
        break;

    default:
      console.log('check mediaType!');
      break;
  }


  console.log("userData loginStatus: " +userData.loginStatus );

  res.render('linkshare', {
    'categoryTitle': categoryTitle,
    'itemTitle': itemTitle,
    'itemId': itemId,
    'description': itemDescription,
    'extra': itemExtraInfo,
    'mediaHTML': mediaHTML,
    'loginStatus': userData.loginStatus

  });
};

exports.viewOne = function(req, res) {
  var categoryTitle = req.params.categoryTitle;
  var itemId = req.params.itemId;
  var itemObj = data[itemId];
  var itemTitle = itemObj.itemTitle;
  var mediaHTML = '';
  var categoryListUser = userData.categoryList;
  var currentItemIndex = userData.currentItemIndex;
  var userIdNumber = 0;
  var isOneItem = true;
  if (userData.loginStatus) {
    userIdNumber = userData.userIdNumber;
  } else {
    // dummy data
    userIdNumber = 0;
  }



  switch (itemObj.type) {
    case 'image':
      console.log('image Type');
      mediaHTML = '<div class="preview-content"><img id="media" src="' + itemObj.URL + '" alt=""></div>';
      break;
    case 'video':
      console.log('video Type');
      mediaHTML = '<video style="width:100%;" controls><source src=' + itemObj.URL + ' type=video/mp4></video>';
      break;
    case 'literature':
      mediaHTML = '<div class="preview-content"><img id="media" src="' + itemObj.URL + '" alt=""></div>';
      break;

      case 'music':
        mediaHTML = '<audio style="width:70%;" controls><source src="'+ itemObj.URL  + '" type="audio/ogg">Your browser does not support the audio element.</audio>';
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
    'isAtChatroom': userData.isAtChatroom,
    isOneItem

  });
};

exports.email = function(email, link)
{
  console.log("exports.email");
  console.log("Shared "+link+" with "+email);
  const nodemailer = require('nodemailer');

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, account) => {
      
      // default SMTP transport (fake account)
      /*let transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
              user: account.user, // generated ethereal user
              pass: account.pass // generated ethereal password
          }
      });*/

      var transporter = nodemailer.createTransport(
      {
        service: 'gmail',
        auth: {
          user: 'cogs120.tricia.8am.team2@gmail.com',
          pass: 'teamnumber2'
        }
      });

      //var host = "http://localhost:3000/";
      var host = "https://a9-team2.herokuapp.com/" //switch when deploying

      // setup email data with unicode symbols
      let mailOptions = {
          from: '"Our Appname" <do_not_reply@appname.com>', // sender address
          to: email, // list of receivers
          subject: 'Check this out! ✔', // Subject line
          text: host+link, // plain text body
          html: '<b><a href="'+host+link+'">View Inspiration!</a></b>' // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL (only with generated email): %s', nodemailer.getTestMessageUrl(info));

          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });
  });
}

exports.updateUserData = function(usrData)
{
  userData = usrData;
};
