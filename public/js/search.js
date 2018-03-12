document.getElementById("allCategoryUL").style.display = "none";


function myFunction() {


    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");

    if (input.value == '') {
      document.getElementById("allCategoryUL").style.display = "none";
    }
    else {
      document.getElementById("allCategoryUL").style.display = "";
    }

    filter = input.value.toUpperCase();
    ul = document.getElementById("allCategoryUL");
    li = ul.getElementsByTagName("li");

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }

}
function show_overlay()
{
  console.log('clicked');
  $('#search-icon-top').hide();
  $('#search-overlay').fadeIn();
}

function hide_overlay()
{
  $('#search-overlay').fadeOut();
  $('#search-icon-top').show();
}
