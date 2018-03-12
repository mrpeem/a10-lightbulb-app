var socket = io.connect('http://localhost:3000');
//var socket = io.connect('https://a9-team2.herokuapp.com/');

//var socket = io.connect('https://a8-cogs120team2.herokuapp.com/');


function checkLoginStatus(signedIn)
{
  if (!signedIn)
  {
    $(".profile").attr({
      "data-toggle": "modal",
      "data-target": "#profile_popup",
      "href" : "/profile"
    });
  }
  else
  {
    $(".profile").attr("href", "/profile");
  }
};



function changeInfo(email, actualName, userName, description)
{
  socket.emit("changeInfo", email, actualName, userName, description);
  socket.once('validInfo', function(existingEmail, existingUserName)
  {
    if (existingEmail == 'true') //show error message if email exist
    {
      $('#email-taken').text("*email already exists*");
    }
    if (existingUserName == 'true') //show error message if username exist
    {
      $('#username-taken').text("*username already exists*");
    }

    //reaload page if all info are valid
    if(existingEmail == 'false' && existingUserName == 'false')
    {
      location.reload();
    }

  });

}



function logout()
{
  socket.emit('logout');
}
