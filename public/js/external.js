'use strict';


console.log('external.js loaded');
$(document).ready(function() {
  console.log('external.js loaded');
  $('.topNav-save-btn').click(function(){
    console.log('clicked');
    $('.save-popup').fadeIn(500);
    $('.save-popup').fadeOut(2000);
  })

});
