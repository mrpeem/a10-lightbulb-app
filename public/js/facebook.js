function checkLoginState() {

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {

  console.log('Facebook login status changed.');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
        console.log('Successfully logged in with Facebook');
         FB.api('/me?fields=name,first_name,last_name,email,id,picture.width(480)', changeUser);
  }
}

function changeUser(response) {  
    //after clicking on FB sign in, set all informations to input box (some are hidden) then call
    //route file; info will be extracted from input boxes in route files
    $("#email1").attr('value', response.email);
    $("#exampleInputPassword1").attr('value', response.id);
    $("#fb_gg_name").attr('value', response.name);
    $("#fb_gg_image").attr('value', response.picture.data.url);
    $("#fb_gg_username").attr('value', response.first_name+"."+response.last_name+"."+response.id);
    
    //automatically click login (so it seems like it's 1 step, when it's really 2)
    $("#login-btn").click();
}
