'use strict';
var socket = io.connect();
//var socket = io.connect('https://a9-team2.herokuapp.com/');

function email(itemID)
{
  var email = $("#email").val();

  if (email == undefined || email == "undefined" || email == "")
  {
    $('.save-popup').html('<img id="check-icon" src="/images/icons/x-mark.png" alt=""> Enter email');
  }
  else
  {
    //var email = $("#email").val();
    var link = $("#link").val();
    socket.emit('email', email, link, itemID);

    console.log('emailed '+link+' to '+email);
    $('.save-popup').html('<img id="check-icon" src="/images/icons/check-500.png" alt=""> Sent Link');
  }
  $('.save-popup').fadeIn(500);
  $('.save-popup').fadeOut(2000);
}

$(document).ready(function() {

  $('#link-copy').click(function(){
    var textArea = document.createElement("textarea");
    var link = $("#link").val();
    textArea.value = "https://a9-team2.herokuapp.com/"+link;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
    $('.save-popup').html('<img id="check-icon" src="/images/icons/check-500.png" alt=""> Copied Link');
    $('.save-popup').fadeIn(500);
    $('.save-popup').fadeOut(2000);
  })

});
