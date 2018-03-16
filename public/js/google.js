
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

var googleUser = {};
var startApp = function() 
{ 
  gapi.load('auth2', function()
  {
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    auth2 = gapi.auth2.init(
    {
      client_id: '504698465144-baibi5gb2iusfmsdsaqka7rlkj4mo8u4.apps.googleusercontent.com'
    });

    attachSignin(document.getElementById('customBtn1'));
  });

  alert("start");
  start(callback=>
  {
    console.log(callback);
  });

};

function start(callback)
{
  gapi.load('auth2', function()
  {
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    callback(gapi.auth2.init(
    {
      client_id: '504698465144-baibi5gb2iusfmsdsaqka7rlkj4mo8u4.apps.googleusercontent.com'
    }));
  });
}

function googleSignIn(i)
{
  start(callback=>
  {
    var element = document.getElementById('customBtn1');
    
    if (i == 0) //only execute when clicked with real button 
    {
      $('#glogin2-btn').click(); //click from dummy button; only do this once
    }

    callback.attachClickHandler(element, {},
    function(googleUser) 
    {
      var profile = googleUser.getBasicProfile();
      $("#email1").attr('value', profile.getEmail());
   
      var email = profile.getEmail();
      var pWord = profile.getId();
      var usrName = profile.getGivenName()+"."+profile.getFamilyName()+"."+profile.getId();
      var usrImg = profile.getImageUrl();
      var actualName = profile.getName();
      login(email, pWord, usrName, usrImg, actualName);
    });
  });


}

function attachSignin(element) {
  console.log(element.id);
  auth2.attachClickHandler(element, {},
    function(googleUser) {
      alert("a")
    	var profile = googleUser.getBasicProfile();
		$("#email1").attr('value', profile.getEmail());
   
      var email = profile.getEmail();
      var pWord = profile.getId();
      var usrName = profile.getGivenName()+"."+profile.getFamilyName()+"."+profile.getId();
      var usrImg = profile.getImageUrl();
      var actualName = profile.getName();
      login(email, pWord, usrName, usrImg, actualName);
    });
}

