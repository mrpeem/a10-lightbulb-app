function check(itemID)
{  
  bookmark(itemID, true);
  like(itemID, true);
}


//itemID = id of item to check for bookmark
//pageLoad = when page first loads; if true, simply if item is bookmarked.
//  otherwise, add/remove item from bookmark list
function bookmark(itemID, pageLoad)
{
  socket.emit('bookmark', itemID, pageLoad); 
  socket.once('bookmarkResult', function(success)
  {
    if (success == 1)
    {
      if (!pageLoad) //user clicks bookmark; show confirmation 
      {
        $('.bookmark-popup').fadeIn(500);
        $('.bookmark-popup').fadeOut(2000);
      }
      //show bookmark icon
      $('#bookmark-iconDefault').hide();
      $('#bookmark-icon').show();
    }
    else if (success == 0) //unbookmark or not bookmarked
    { //hide bookmark icon
      $('#bookmark-iconDefault').show();
      $('#bookmark-icon').hide();
    }
    else //not logged in; bookmark fail
    {
      $('.bookmark-fail-popup').fadeIn(250);
      $('.bookmark-fail-popup').fadeOut(3000);
    }
  });
}

function like(itemID, pageLoad)
{
  socket.emit('like', itemID, pageLoad); 
  socket.once('likeResult', function(success)
  {
    if (success == 1)
    {
      if (!pageLoad) //user clicks bookmark; show confirmation 
      {
        $('.like-popup').fadeIn(500);
        $('.like-popup').fadeOut(2500);
      }
      //show bookmark icon
      $('#like-iconDefault').hide();
      $('#like-heart').show();
    }
    else if (success == 0) //unbookmark or not bookmarked
    { //hide bookmark icon
      $('#like-iconDefault').show();
      $('#like-heart').hide();
    }
    else //not logged in; bookmark fail
    {
      $('.like-fail-popup').fadeIn(250);
      $('.like-fail-popup').fadeOut(3000);
    }
  });
}
