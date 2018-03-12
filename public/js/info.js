'use strict';


var isUp = false;
$(document).ready(function() {
  function toInt(n){ return Math.round(Number(n)); };

  $('.topNav-save-btn').click(function(){
    $('.save-popup').fadeIn(500);
    $('.save-popup').fadeOut(2000);
  })

  $('#temp-c0').click(function() {
    $('#temp-f0').removeClass('temp-active');
    $('#temp-c0').addClass('temp-active');
    var tempFVal = $('#temp-data0').text();
    var tempFValFloat = parseFloat(tempFVal);
    var tempCValInt = toInt((tempFValFloat-32) / 1.8);
    $('#temp-data0').text(tempCValInt);
  });

  $('#temp-f0').click(function() {
    $('#temp-c0').removeClass('temp-active');
    $('#temp-f0').addClass('temp-active');
    var tempCVal = $('#temp-data0').text();
    var tempCValFloat = parseFloat(tempCVal);
    var tempFValInt = toInt((tempCValFloat * 1.8) + 32);
    $('#temp-data0').text(tempFValInt);

  });

  $('#temp-c1').click(function() {
    $('#temp-f1').removeClass('temp-active');
    $('#temp-c1').addClass('temp-active');
    var tempFVal = $('#temp-data1').text();
    var tempFValFloat = parseFloat(tempFVal);
    var tempCValInt = toInt((tempFValFloat-32) / 1.8);
    $('#temp-data1').text(tempCValInt);
  });

  $('#temp-f1').click(function() {
    $('#temp-c1').removeClass('temp-active');
    $('#temp-f1').addClass('temp-active');
    var tempCVal = $('#temp-data1').text();
    var tempCValFloat = parseFloat(tempCVal);
    var tempFValInt = toInt((tempCValFloat * 1.8) + 32);
    $('#temp-data1').text(tempFValInt);
  });


  $('#temp-c2').click(function() {
    $('#temp-f2').removeClass('temp-active');
    $('#temp-c2').addClass('temp-active');
    var tempFVal = $('#temp-data2').text();
    var tempFValFloat = parseFloat(tempFVal);
    var tempCValInt = toInt((tempFValFloat-32) / 1.8);
    $('#temp-data2').text(tempCValInt);
  });

  $('#temp-f2').click(function() {
    $('#temp-c2').removeClass('temp-active');
    $('#temp-f2').addClass('temp-active');
    var tempCVal = $('#temp-data2').text();
    var tempCValFloat = parseFloat(tempCVal);
    var tempFValInt = toInt((tempCValFloat * 1.8) + 32);
    $('#temp-data2').text(tempFValInt);
  });

  $('#up-btn').click(function() {

  if (isUp) {
    isUp = false;
    console.log('it was Up so it should down');
    $('.message-window').animate({
      height: "7rem"
    });

    $('#up-icon').animate({
      borderSpacing: 0
    }, {
      step: function(now, fx) {
        $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
        $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
        $(this).css('transform', 'rotate(' + now + 'deg)');
      },
      duration: 'slow'
    }, 'linear');
  } else {
    isUp = true;
    console.log('it was Down so it should Up');
    $('.message-window').animate({
      height: "36rem"
    });
    $('#up-icon').animate({
      borderSpacing: -180
    }, {
      step: function(now, fx) {
        $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
        $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
        $(this).css('transform', 'rotate(' + now + 'deg)');
      },
      duration: 'slow'
    }, 'linear');

  }



})


});




function temperatureConverter(valNum) {
  valNum = parseFloat(valNum);
  document.getElementById("temp-data0").innerHTML = (valNum-32) / 1.8;
}
