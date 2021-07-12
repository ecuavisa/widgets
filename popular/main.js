function dateToYMD(date) {
    var date = new Date(date);
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

let url = "?sort=-views_stream_metrics&limit=20&status=OK";

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
            if (video != null) {
                let thumbnail = "";
                let id = key;
                video.thumbnails.forEach(img => {
                    if (img.is_default == true) {
                        thumbnail = img.url;
                    }
                });
                if (thumbnail == "") {
                    thumbnail = video.thumbnails[0].url;
                }
                /**
                 * Tags
                 */
                let tags = "";
                if (video.tags) {
                    video.tags.forEach(tag => {
                        tags += `<a class="tag-item" href="javascript:;" onclick="showTags('${tag}')">
                                ${tag}
                            </a>`;
                    });
                }
                /**
                 * Categorias
                 */
                let categories = "";
                if (video.categories) {
                    video.categories.forEach(category => {
                        categories += `<a class="category-item" href="javascript:;" onclick="showCategories('${category.id}')">
                                ${category.name}
                            </a>`;
                    });
                }
                let dateVideo = dateToYMD(video.date_created);
                $("#mostVideos").append(`
          
                    <div class="col-md-4 col-xl-3 col-lg-3">
                        <div class="video-popular">
                            <div id="video-${id}">
                                <div class="content">
                                    <a id="img-${id}" class="img-vid" href="javascript:;" onclick="reproductor('${video.id}')">
                                        <img class="netimg d-block w-100 h-200 hvr-grow" src="${thumbnail}" alt="${video.title}" >
                                        <span class="iconPlay  left bottom"></span>
                                    </a>
                                    <div class="title">${video.title}</div>
                                    <div class="categories">${categories}</div>
                                    <div class="tags">${tags}</div>
                                    <div class="date">${dateVideo}</div>
                                </div>
                            </div>
                        </div>
                    </div>
        
                 `);
            }
        });
    },
    error: function (error) { },
});