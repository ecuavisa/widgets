function dateToYMD(date) {
    var date = new Date(date);
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y;
}

function reproductor(id, serieid = "") {
    if ($("#serieModal-" + serieid).length > 0) {
        $("#serieModal-" + serieid + ' .btn-close').click();
    }
    $("#allList").addClass("d-none");
    $("#playVideo").removeClass("d-none");
    $("#closeVideo").removeClass("d-none");
    $("#playVideo").empty();
    $("#playVideo").html(`<iframe class="videoecv" src="//mdstrm.com/embed/${id}?autoplay=true" allowfullscreen></iframe>`);
}

function closeTop() {
    if (window.location.href.indexOf("noticias") > -1) {
        $("#titleSection2").html("NOTICIAS");
        $("#titleSection2").css("color", "#046CDF");
    } else if (window.location.href.indexOf("entretenimiento") > -1) {
        $("#titleSection2").html("ENTRETENIMIENTO");
        $("#titleSection2").css("color", "#FD7304");
    } else if (window.location.href.indexOf("estadio") > -1) {
        /* Entretenimiento */
        $("#titleSection2").html("ESTADIO");
        $("#titleSection2").css("color", "#008000");
    } else if (window.location.href.indexOf("tendencias") > -1) {
        /* Tendencias */
        $("#titleSection2").html("TENDENCIAS");
        $("#titleSection2").css("color", "#711B8B");
    }
    $("#mostVideos").empty();
    let url = localStorage.getItem("url");
    getVideos(url);
}

function getPagination(urlContador) {
    $.ajax({
        url: "https://platform.mediastre.am/api/media" + urlContador,
        type: "GET",
        dataType: "json",
        headers: {
            "X-API-Token": "645e5b4a29d27769f60f12ecb708b872",
        },
        success: function (result) {
            let contador = result.data;
            $('#pagination').twbsPagination({
                totalPages: contador,
                visiblePages: 5,
                prev: '<span aria-hidden="true">&laquo;</span>',
                next: '<span aria-hidden="true">&raquo;</span>',
                lastClass: 'd-none',
                firstClass: 'd-none',
                onPageClick: function (event, page) {
                    let skip = page * 12;
                    let url = "?sort=-views_stream_metrics&status=OK&all=true&category_id=" + ms_category_id + "&limit=12&skip=" + skip;
                    localStorage.setItem("url", url);
                    getVideos(url);
                }
            });
        },
        error: function (error) { },
    });
}

function getVideos(url) {
    $.ajax({
        url: "https://platform.mediastre.am/api/media" + url,
        type: "GET",
        dataType: "json",

        //data: data,
        headers: {
            "X-API-Token": "645e5b4a29d27769f60f12ecb708b872",
        },
        //contentType: "application/json",
        success: function (result) {
            let data = result.data;
            $("#mostVideos").empty();
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
                        categories += `<a class="category-item" href="javascript:;" onclick="showCategories('${video.categories[0]._id}', '${video.categories[0].name}')">
                            ${video.categories[0].name}
                        </a>`;
                    }
                    let dateVideo = dateToYMD(video.date_created);
                    $("#mostVideos").append(`
          
                    <div class="col-md-4 col-xl-3 col-lg-3">
                        <div class="video-popular">
                            <div id="video-${id}">
                                <div class="content">
                                  <div class="info">
                                        <div class="categories"><img src="https://ecuavisa.com/ecuavisa/main/punto-blue-video.png" alt="punto-blue"> ${categories}</div>
                                        <div class="date">${dateVideo}</div>
                                    </div>
                                    <a id="img-${id}" class="img-vid" href="javascript:;" onclick="reproductor('${video.id}')">
                                        <img class="netimg d-block w-100 h-200 hvr-grow" src="${thumbnail}" alt="${video.title}" >
                                        <span class="iconPlay  left bottom"></span>
                                    </a>
                                    <a class="title" href="javascript:;" onclick="reproductor('${video.id}')" >${video.title}</a>
                                    
                                    <div class="tags">${tags}</div>
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
}

/**
 * Mostrar tags
 */
function showTags(tag) {
    let url = "?limit=12&status=OK&tag=" + tag;
    $("#titleSection").html(`Tag: ${tag} <a class="closeTop" href="javascript:;" onclick="closeTop()"> Cerrar </a>`);
    $("#mostVideos").empty();
    getVideos(url);
}
/**
 * Mostrar categorias
 */
function showCategories(category, categoryName) {
    let url = "?limit=12&status=OK&category_id=" + category;
    $("#titleSection").html(`Categoría: ${categoryName} <a class="closeTop" href="javascript:;" onclick="closeTop()"> Cerrar </a>`);
    $("#mostVideos").empty();
    getVideos(url);
}

/**
 * Ordenar los episodios por key
 * @param {*} array 
 * @param {*} key 
 * @returns 
 */
function sortByKeyAsc(array, key) {
    return array.sort(function (a, b) {
        var x = b[key];
        var y = a[key];
        x = parseInt(x.replace(/[^0-9.]+/g, ""));
        y = parseInt(y.replace(/[^0-9.]+/g, ""));
        return x > y ? -1 : x < y ? 1 : 0;
    });
}



$(document).ready(function () {
    let urlContador = "?sort=-views_stream_metrics&status=OK&count=true&category_id=" + ms_category_id;
    getPagination(urlContador);
    $("#closeVideo").on("click", function () {
        $("#playVideo").addClass("d-none");
        $("#playVideo").empty();
        $("#closeVideo").addClass("d-none");
        $("#allList").removeClass("d-none");
    });
});