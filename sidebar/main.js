 //ORDEN DESCENDENTE
 function sortByKeyDesc(array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    x = parseInt(x.replace(/[^0-9\.]+/g, ""));
    y = parseInt(y.replace(/[^0-9\.]+/g, ""));
    return x > y ? -1 : x < y ? 1 : 0;
  });
}

//ORDEN ASCENDENTE
function sortByKeyAsc(array, key) {
  return array.sort(function (a, b) {
    var x = b[key];
    var y = a[key];
    x = parseInt(x.replace(/[^0-9\.]+/g, ""));
    y = parseInt(y.replace(/[^0-9\.]+/g, ""));
    return x > y ? -1 : x < y ? 1 : 0;
  });
}



function getVideoList(idcontainer, url) {
  $.ajax({
    url: "https://platform.mediastre.am/api/media/" + url,
    type: "GET",
    dataType: "json",

    //data: data,
    headers: {
      "X-API-Token": "645e5b4a29d27769f60f12ecb708b872",
    },
    //contentType: "application/json",
    success: function (result) {
      let data = result.data;
      data = sortByKeyAsc(data, "title");
      console.log(data);

      $.each(data, function (key, video) {

        console.log(key + ' : ' + video.title);
        //$(".card-body").css( "display", "none" );

        if (video != null) {
          let id = key;
          $(idcontainer).append(`
          
        <div class="video">
            <div class="card">
           
          <div id="video-${id}" class="embed-responsive embed-responsive-16by9"></div>
            <div class="card-body">
              <iframe class="embed-responsive-item" src="//mdstrm.com/embed/${video.id}" allowfullscreen></iframe>
              <div class="p-3 m-2 bg-primary text-white title">${video.title}</div>
            </div>
            </div>
        </div>
        
        `);
        }
      });
    },
    error: function (error) { },
  });
}


$(document).ready(function () {
  

  api = "";
  if (window.location.href.indexOf("videos2.html") > -1) {
    api = "?category_id=6064cb5b00adc97db261b719&limit=4&tag=Televistazo 13h00";
    $("#__block").css("display","block");
    getVideoList("#blockVideos", api);
  } else{console.log("Nada")}

  if (window.location.href.indexOf("estadio/nacional/") > -1) {
    api = "?category_id=60a45032648efa08306369e5&limit=4";
    $("#__block").css("display","block");
    getVideoList("#blockVideos", api);
  } else{console.log("Nada")}


});

