//database
//var ip = require('./ip.js');
var userData = require('../userData.json');
//var userData = ip.getUserData();
var data = require('../data.json');
var categoryList = require('../categoryListData.json');

//env setting
var numberOfItemsSelected = 10;
var itemIndex = userData.currentItemIndex;
var mediaHTML ='';
var totalNumberOfItems = data.length;


exports.view = function(req, res){
  var categoryTitle = req.params.categoryTitle;




  //check either random or regular category
  if(categoryTitle === "random")
  {
    //needs to generate random index from all item database
    //to check duplicated index random number
    var randomIndexContainer =[];


    for (var i = 0; i < numberOfItemsSelected; i++) {
      var randomNumber = Math.floor(Math.random() * totalNumberOfItems);

      //check if this is first index to put
      if(randomIndexContainer.length === 0){
        randomIndexContainer.push(randomNumber);
      }
      else {
        var found = randomIndexContainer.find(function(element){
          return element === randomNumber;
        });

        do {
          //if 0 is found in array
          if(found === 0){
            found++;
          }
          var randomNumber = Math.floor(Math.random() * totalNumberOfItems);
          found = randomIndexContainer.find(function(element){
            return element ==randomNumber;
          });
        }while(found);

        randomIndexContainer.push(randomNumber);

      }




    }
    // need to make category is empty.
    if(userData.categoryList.length === 0){

    }
    else{
      console.log('need to make a list empty');
      userData.categoryList = [];
    }
    //need to push
    for (var i = 0; i < randomIndexContainer.length; i++) {
//      console.log("data[randomIndexContainer[i]]:" +data[randomIndexContainer[i]] );
      userData.categoryList.push(data[randomIndexContainer[i]])

    }






  }
  else {
    console.log("you selected : " + categoryTitle);
    var count = 0;
    userData.categoryList = [];


    for (var i = 0; i < totalNumberOfItems; i++) {

      if(categoryTitle === data[i].category){
        console.log('found ' + 'id: '+data[i].id);
        userData.categoryList.push(data[data[i].id]);
        count++;
      }

    }
    console.log("found count: " + count);
    console.log("length " + userData.categoryList.length);


  }


  console.log("current Item (Ready To View):" + userData.categoryList[itemIndex].URL);
  
  //need to check type
  var categoryListUser = userData.categoryList;

  switch (categoryListUser[itemIndex].type) {
    case 'image':
        console.log('image Type');
        mediaHTML = '<img id="media" src="'+categoryListUser[itemIndex].URL+'" alt="">';
        break;
    case 'video':
        console.log('video Type');
        mediaHTML = '<video style="width:100%;" controls><source src='+ categoryListUser[itemIndex].URL+' type=video/mp4></video>';
        break;
    case 'literature':
        mediaHTML = '<img id="media" src="' + categoryListUser[itemIndex].URL + '" alt="">';
        break;
        case 'music':
          mediaHTML = '<audio style="width:70%;" controls><source src="'+ categoryListUser[itemIndex].URL + '" type="audio/ogg">Your browser does not support the audio element.</audio>';
          break;
    default:
        console.log('check mediaType!');
        break;
  }



  console.log(categoryTitle);
  console.log("isScreenShared:" +userData.isScreenShared);


  res.render('play',{
    'pageTitle': categoryTitle,
    'type': mediaHTML,
    'itemTitle' : categoryListUser[itemIndex].itemTitle,
    'caption': categoryListUser[itemIndex].caption,
    'itemID': categoryListUser[itemIndex].id,
    'isScreenShared' : userData.isScreenShared,
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
