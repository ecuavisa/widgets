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

      console.log(data);

      $.each(data, function (key, video) {

        console.log(key + ' : ' + video.title);

        if (video != null) {
          let id = key;
          $(idcontainer).append(`
        <div class="video">
            <div class="card">
            <a id="img-${id}" href="javascript:;">
            <img class="d-block card-img-top" src="${video.thumbnails[0].url}" alt="${video.title}" >
          </a>
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
  let urlReferer = "";
  let api = "?category_id=6064cb5b00adc97db261b719&limit=4&tag=Televistazo 13h00";
  getVideoList("#blockVideos", api);
});

