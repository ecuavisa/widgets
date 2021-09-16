$(document).ready(function () {

    var d = new Date();
    var n = d.getDay();
    var hour = d.getHours();
    var min = d.getMinutes();

    console.log(hour,min);
   /* 
    if ((hour >= 17 && min <= 36) || (hour < 18) ) 
     { 
        $('#envivo').addClass('parpadea');
        $(".inner").append(`
        
        <img src="https://i.imgur.com/RcqFJuy.png" alt="imagen">
        <div> estamos presentado</div>
        ` );

      }

    else {
       $('#envivo').remove('parpadea');
       }*/

});