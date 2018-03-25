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
var startApp = function() {
gapi.load('auth2', function(){
  // Retrieve the singleton for the GoogleAuth library and set up the client.
  auth2 = gapi.auth2.init({
    client_id: '504698465144-baibi5gb2iusfmsdsaqka7rlkj4mo8u4.apps.googleusercontent.com',
    cookiepolicy: 'single_host_origin',
    // Request scopes in addition to 'profile' and 'email'
    //scope: 'additional_scope'
  });
  attachSignin(document.getElementById('customBtn1'));
});
};

function attachSignin(element) {
console.log(element.id);
auth2.attachClickHandler(element, {},
    function(googleUser) {
    	var profile = googleUser.getBasicProfile();
		$("#email1").attr('value', profile.getEmail());
	    $("#exampleInputPassword1").attr('value', profile.getId());
	    $("#fb_gg_name").attr('value', profile.getName());
	    $("#fb_gg_image").attr('value', profile.getImageUrl());
	    $("#fb_gg_username").attr('value', profile.getGivenName()+"."+profile.getFamilyName()+"."+profile.getId());
	    
	    //automatically click login (so it seems like it's 1 step, when it's really 2)
	    $("#login-btn").click();     
    });
}

