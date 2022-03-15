function dateToYMD(date) {
  var date = new Date(date);
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  return "" + (d <= 9 ? "0" + d : d) + "/" + (m <= 9 ? "0" + m : m) + "/" + y;
}


function getVideos(url) {
  $.ajax({
    url: url ,
    type: "GET",
    dataType: "json",

    //data: data,
    // headers: {
    //   "X-API-Token": "215979b6242fdd636897c19bb6428cb5",
    // },
    //contentType: "application/json",
    success: function (result) {
      let data = result.data;

      $.each(data, function (key, video, id) {
        if (video != null) {
          // let thumbnail = "";
          // let id = key;
          // video.thumbnails.forEach((img) => {
          //   if (img.is_default == true) {
          //     thumbnail = img.url;
          //   }
          // });
          // if (thumbnail == "") {
          //   thumbnail = video.thumbnails[0].url;
          // }
          /**
           * Tags
           */
          // let tags = "";
          // if (video.tags) {
          //   video.tags.forEach((tag) => {
          //     tags += `<a class="tag-item" href="javascript:;" onclick="showTags('${tag}')">
          //                       ${tag}
          //                   </a>`;
          //   });
          // }

          let tracks = "";
          if (video.tracks) {
            video.tracks.forEach((track) => {
              const duration = moment.duration(track.position, "seconds");

              const h = duration.format('HH'); // 1F
              const m = duration.format('mm'); // 20
              const s = duration.seconds(); //('ss'); // 25

              console.log(`${h}:${m}:${s}`);

              tracks += `
                <a class=" link-dark track-item" href="javascript:;">
                    ${track.name}
                    <span> (${h}:${m}:${s})</span> 

                </a>`;
              // console.log(track)
            });
          }
          /**
           * Categorias
           */
          // let categories = "";
          // if (video.categories) {
          //     categories += `<a class="category-item" href="javascript:;" onclick="showCategories('${video.categories[0]._id}', '${video.categories[0].name}')">
          //         ${video.categories[0].name}
          //     </a>`;
          // }
          let dateVideo = dateToYMD(video.date_created);
          $("#trackVideos").append(`
          
                    <div class="">
                        <div class="video-popular">
                            <div id="video-${id}">
                                <div class="content">
                                  <div class="info">
                                    <p class="title">${video.title} </p>
                                    </div>
                                    <iframe class="videoecv netimg d-block w-100 h-400 hvr-grow" src="//mdstrm.com/embed/${video.id}?autoplay=false" allowfullscreen></iframe>
                                    <div class="tracks d-grid">${tracks}</div>
                                </div>
                            </div>
                        </div>
                    </div>
        
                 `);
        }
      });
    },
    error: function (error) {},
  });
}

function sortByKeyAsc(array, key) {
  return array.sort(function (a, b) {
    var x = b[key];
    var y = a[key];
    x = parseInt(x.replace(/[^0-9.]+/g, ""));
    y = parseInt(y.replace(/[^0-9.]+/g, ""));
    return x > y ? -1 : x < y ? 1 : 0;
  });
}


function showtracks(track) {
  let url = "?limit=12&status=OK&track=" + track;
  $("#titleSection").html(`
        track: ${track} <a class="closeTop" href="javascript:;" onclick="closeTop()"> Cerrar </a>
    `);
  $("#trackVideos").empty();
  getVideos(url);
}

$(document).ready(function () {
  let url = "https://platform.mediastre.am/api/media?id=6213c19add25b9082a667939&limit=10&token=215979b6242fdd636897c19bb6428cb5";
  getVideos(url);
  console.log(url);
  /*getShows();
    getPlaylist();*/
 
});
