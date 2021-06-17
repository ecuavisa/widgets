function sortByKeyDesc(array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    x = parseInt(x.replace(/[^0-9.]+/g, ""));
    y = parseInt(y.replace(/[^0-9.]+/g, ""));
    return x > y ? -1 : x < y ? 1 : 0;
  });
}


function sortByKeyAsc(array, key) {
  return array.sort(function (a, b) {
    var x = b[key];
    var y = a[key];
    x = parseInt(x.replace(/[^0-9\.]+/g, ""));
    y = parseInt(y.replace(/[^0-9\.]+/g, ""));
    return x > y ? -1 : x < y ? 1 : 0;
  });
}


function mostrarVideo(key) {
  $("#img-" + key).hide();
  let urlvideo = $("#video-" + key).attr("data-src");
  $("#video-" + key).html(
    `<iframe class="embed-responsive-item" src="${urlvideo}" allowfullscreen></iframe>`
  );
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
      //data.splice(0, 1); //en el caso de secretos se elimina el primero, verificar con las otras series si el primero tiene content o no
      data = sortByKeyAsc(data, "title");
      console.log(data);
      //data.sort(function(a, b){return a-b});

      $.each(data, function (key, category) {

        console.log(key + ' : ' + category.title);

        if (category != null) {
          let id = key;
          $(idcontainer).append(`
        <div class="video">
            <div class="card">
            <a id="img-${id}" onclick="mostrarVideo(${id})" href="javascript:;">
            <img class="d-block card-img-top" src="${category.thumbnails[0].url}" alt="${category.title}" >
          </a>
          <div id="video-${id}" data-src="//mdstrm.com/embed/${category.meta[0].id}" class="embed-responsive embed-responsive-16by9"></div>
            <div class="card-body">
              <div class="p-3 m-2 bg-primary text-white title">${category.title}</div>
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
  let urlReferer = "";
  let api = "?category_id=6064cb5b00adc97db261b719&limit=4&tag=Televistazo 13h00";
  getVideoList("#blockVideos", api);
});

