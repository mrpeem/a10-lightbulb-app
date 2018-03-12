//for testing
var socket = io.connect('https://a9-team2.herokuapp.com/');
//var socket = io.connect('https://a8-cogs120team2.herokuapp.com/');//for deploying


socket.on('connect', function() {
  socket.emit('addUser', 'user');

});
socket.on('updateChat', function(username, data) {
  $('#conversation').append('<b>' + username + ':</b>' + data + '<br>');
});





$(function() {

  $('#datasend').click(function() {
    console.log('#datasend clicked');
    var message = $('#chat-input').val();
    $('#chat-input').val('');
    $('#chat-input').focus();

    socket.emit('sendChat', message);
  });
  $('#chat-input').keypress(function(e) {
    console.log('ketpree');
    if (e.which == 13) {
      $(this).blur();
      $('#datasend').focus().click();
      //$('#chat-input').focus();
    }
  })


})
