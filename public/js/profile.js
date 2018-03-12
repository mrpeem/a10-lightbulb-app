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



function logout()
{
  socket.emit('logout');
}

function changeInfo(email, actualName, userName, description)
{
  socket.emit("changeInfo", email, actualName, userName, description);
  socket.once('validInfo', function(existingEmail, existingUserName)
  {
    var text = (existingEmail == 'true')? "*email already exists*" : "";
    $('#email-taken').text(text);

    text = (existingUserName == 'true')? "*username already exists*" : "";
    $('#username-taken').text(text);

    //reaload page if all info are valid
    if(existingEmail == 'false' && existingUserName == 'false')
    {
      location.reload();
    }

  });
}

function changePassword(originalPassword, newPassword1, newPassword2)
{
  socket.emit("changePassword", originalPassword, newPassword1, newPassword2);
  socket.once('validPassword', function(correctPassword, validPassword)
  {
 
    var text = (correctPassword == 'false')? "*Incorrect password*" : "";
    $('#incorrect-password').text(text);

    text = (validPassword == 'false')? "*Password does not match" : "";
    $('#invalid-password').text(text);

    //reaload page if all info are valid
    if(correctPassword == 'true' && validPassword == 'true')
    {
      location.reload();
    }

  });
}