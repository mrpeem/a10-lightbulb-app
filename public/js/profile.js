//var socket = io.connect('http://localhost:3000');
var socket = io.connect('https://a9-team2.herokuapp.com/');

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


function changeDescription(description)
{
  socket.emit("changeDescription", description);
}

function logout()
{
  socket.emit('logout');
}
