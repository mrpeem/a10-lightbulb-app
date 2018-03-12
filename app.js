
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var fs = require('fs');


var index = require('./routes/index');
var dataSelector = require('./routes/dataSelector');
var right = require('./routes/right');
var left = require('./routes/left');
var info = require('./routes/info');
var share = require('./routes/share');
var show = require('./routes/show');
var external = require('./routes/external');
var userInfo = require('./routes/userInfo');
var browse = require('./routes/browse');
var preference = require('./routes/preference');
var filteredrRandom = require('./routes/filteredRandom');
var profile = require('./routes/profile');
var bookmark = require('./routes/bookmark');
var like = require('./routes/like');


var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.view);
app.get('/browse', browse.view);
app.get('/profile', profile.view);
app.get('/profile_register', profile.register);
app.get('/profile_logout', profile.logout);

//app.get('/profile_goodle', profile.google);
app.get('/sharedChat/:userIdNumber/:categoryTitle/:itemId/show', userInfo.shareView);
app.get('/userData/:userIdNumber/:categoryTitle/:itemId/setShare', userInfo.view);
app.get('/userData/:userIdNumber/:categoryTitle/:itemId/unsetShare', userInfo.view2);
app.get('/userData/:userIdNumber/:categoryTitle/:itemId/unsetShareInfo', userInfo.exitShareInfo);
app.get('/userData/:userIdNumber/:categoryTitle/:itemId/setChat', userInfo.enterChatRoom);
app.get('/userData/:userIdNumber/:categoryTitle/:itemId/setChatInfo', userInfo.enterChatRoomInfo);
app.get('/userData/:userIdNumber/:categoryTitle/:itemId/setChatShare', userInfo.enterChatRoomShare);
app.get('/userData/:userIdNumber/:categoryTitle/:itemId/unsetChat', userInfo.exitChatRoom);
app.get('/userData/:userIdNumber/:categoryTitle/:itemId/unsetChatInfo', userInfo.exitChatRoomInfo);
app.get('/userData/:userIdNumber/:categoryTitle/:itemId/unsetChatShare', userInfo.exitChatRoomShare);
app.get('/sharedlink/:itemId/show', share.linkview);
app.get('/sharedlink/:itemId/show/info', share.infoview);
app.get('/sharedlink/:itemId/show/share', share.shareview);
app.get('/app/:categoryTitle', dataSelector.view);
app.get('/:categoryTitle/right', right.view);
app.get('/:categoryTitle/left', left.view);
app.get('/:categoryTitle/:itemId/info', info.view);
app.get('/:categoryTitle/:itemId/infoOne', info.viewOne);
app.get('/:categoryTitle/:itemId/share', share.view);
app.get('/:categoryTitle/:itemId/share/viewAlt', share.viewAlt);
app.get('/:categoryTitle/:itemId/shareOne', share.viewOne);
app.get('/:categoryTitle/:itemId/show', show.view);
app.get('/:categoryTitle/:itemId/showOneItem', show.viewOneItem);
app.get('/:categoryTitle/:itemId/info/:externalId/external', external.view);
app.get('/preference', preference.view);
app.get('/app/:title/filteredRandom', filteredrRandom.view);
//app.get('/:categoryTitle/:itemId/info/:externalId/external/:webaddress', external.webview);
app.post('/email', share.email);




// Example route
// app.get('/users', user.list);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
/*
io.on('connection', function(socket){
  console.log('a user connected');
});

*/

var usernames = {};
var rooms = ['room1', 'room2', 'room3'];

io.sockets.on('connection', function(socket){
  console.log('a user connected');

  socket.on('addUser', function(username){
    socket.username = username;
    console.log(username + "has logged in");
    socket.room = rooms[0];
    usernames[username] = socket.username;
    socket.join(socket.room);
    updateClient(socket, username, socket.room);
    updateChatRoom(socket, 'connected');
    updateRoomList(socket, socket.room);

  });

  //send message
  socket.on('sendChat', function(data){
    console.log(socket.username + "sent a message");
    io.sockets.in(socket.room).emit('updateChat', socket.username, data);
  });

  socket.on('disconnect', function(){
    delete usernames[socket.username];
    io.sockets.emit('updateUsers', usernames);

    updateGlobal(socket, 'disconnected');
    socket.leave(socket.room);
  });

  //check login in (both manual input and social media login)
  socket.on('login', function (email, password, userName, img, actualName)
  {
    var validLogin = profile.login(email, password, userName, img, actualName);
    console.log('logged in successfully: '+validLogin);

    if (!validLogin)
    {
      socket.emit('failedLogin');
    }
    else
    {
      socket.emit('successfulLogin');

      updateUserData( profile.getUserData() );
    }
  });


  socket.on('facebook_google_login', function(email, password, userName, img, actualName)
  {
    profile.facebook_google_login();
    updateUserData( profile.getUserData() );
  });

  //registering
  socket.on('register', function (email, password, userName, img, actualName) 

  {
    var alreadyExist = profile.existingUser(email, password, false);

    if (alreadyExist != -1)
    {
      socket.emit('alreadyExist');
    }
    else
    {
      profile.register(email, password, userName, img, actualName);
      socket.emit('successfulLogin');

      updateUserData( profile.getUserData() );
    }
  });

  socket.on('logout', function()
  {
    profile.logout();
    updateUserData( profile.getUserData() );

  });


  //bookmark item
  socket.on('bookmark', function(itemID, pageLoad)
  {
    var bookmarked;
    if (pageLoad) //simply check if item is bookmarked
    {
      bookmarked = bookmark.checkBookmark(itemID);
      bookmarked = (bookmarked == -1)? 0 : 1;
    }
    else //not page load; add/remove from list
    {
      bookmarked = bookmark.bookmark(itemID);

      updateUserData( bookmark.getUserData() );
    }
    socket.emit('bookmarkResult', bookmarked);
  });

  //like item
  socket.on('like', function(itemID, pageLoad)
  {
    var liked;
    if (pageLoad) //simply check if item is liked
    {
      liked = like.checkLike(itemID);
      liked = (liked == -1)? 0 : 1;
    }
    else //user clicked; add/remove from list
    {
      liked = like.like(itemID);
    }
    socket.emit('likeResult', liked);

  });
  
  socket.on('email', function(email, link)
  {
    share.email(email, link);
  });

  socket.on('changeDescription', function(description)
  {
    console.log("changeDescription: "+description);
    profile.changeDescription(description);
    updateUserData( profile.getUserData() );
  });

  //sends loginStatus directly froma app.js to avoid error from asynchronicity

  //console.log("app.js; loginStatus = "+profile.getLoginStatus());






});


//get all routes file and add it to an array
//updateUserData() loops through it
var routeFiles = [];
fs.readdirSync('./routes/').forEach(file =>
{
  var fileName = file.substring(0, file.length-3); //removes ".js"
  routeFiles.push( require('./routes/'+fileName) );
});

//manually update userData in every route files
//fixes "bug" (from asynchronicity) where loginStatus sometimes isn't updated
function updateUserData(userData)
{
  for (var i = 0; i < routeFiles.length; i++)
  {
    routeFiles[i].updateUserData(userData);
  }
}


function updateClient(socket, username, newRoom){
  socket.emit('updateChat', 'SERVER ', ' You\'ve connected to ' + newRoom);
}
function updateChatRoom(socket, message){
  socket.broadcast.to(socket.room).emit('updateChat', 'SERVER ', socket.username + ' has '  + message);
}

function updateGlobal(socket, message){
  socket.broadcast.emit('updateChat', 'SERVER ', socket.username + 'have ' + message);
}

function updateRoomList(socket, currentRoom) {
  socket.emit('updateRooms', rooms, currentRoom);
}
