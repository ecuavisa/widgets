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
    $("#titleSection").html(`Top 12 vídeos más vistos`);
    $("#mostVideos").empty();
    getVideos();
}

function getVideos(url = "?sort=-views_stream_metrics&limit=12&status=OK") {
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
            data.shift();
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
                                    <a id="img-${id}" class="img-vid" href="javascript:;" onclick="reproductor('${video.id}')">
                                        <img class="netimg d-block w-100 h-200 hvr-grow" src="${thumbnail}" alt="${video.title}" >
                                        <span class="iconPlay  left bottom"></span>
                                    </a>
                                    <a class="title" href="javascript:;" onclick="reproductor('${video.id}')" >${video.title}</a>
                                    <div class="info">
                                        <div class="categories">${categories}</div>
                                        <div class="date">${dateVideo}</div>
                                    </div>
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
 * Cargar todas las series
 */
function getShows() {
    window.localStorage.clear();
    $.ajax({
        url: "https://platform.mediastre.am/api/show",
        type: "GET",
        dataType: "json",
        headers: {
            "X-API-Token": "215979b6242fdd636897c19bb6428cb5",
        },
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            let data = result.data;
            let seriePortada = data[0];
            let img = (seriePortada.images[1,0].path);
            $("#showsCoversPortada").append(`
                <section class="new__portada show-${seriePortada._id} mb-5">
                    <div class="new__content">
                        <img class=" d-block w-100 hvr-grow" src="${img}" alt="${seriePortada.title}" >
                        <div class="cont__des__butt">
                            <h3 class="serie-desc effect">${seriePortada.description}</h3>
                            <div class="btn__portada">
                                <button type="button" class="btn btn-light"><img src="https://img.icons8.com/material-rounded/48/000000/play--v1.png" style="width: 24px;height: 24px;-webkit-mask-image: linear-gradient(to top, transparent 0, black 0%);"/> Play</button>
                                <a class="btn btn-dark" href="javascript:;" onclick="verSerie(0)">Ver más </a>
                            </div>
                        </div>
                        
                    </div>
                   
                </section>
            `);
            //     let dataTem = data;
            // dataTem.shift();

            $.each(data, function (key, serie, _id) {
                if (key != 0) {
              let img = serie.images[0].path;
                    $("#showsCovers").append(`
                        <section class="col-12 col-md-3 show-${serie._id} mb-5">
                            <a href="javascript:;" onclick="verSerie(${key})">
                                <img class="ser-show effect d-block w-100 hvr-grow" 
                                src="${img}" alt="${serie.title}" >
                                <h3 class="serie-title effect">${serie.title}</h3>
                            </a>
                        </section>
                    `);
                }
            });

            $("#showsCovers").flickity({
                cellAlign: 'left',
                contain: true,
                pageDots: false
            });
            $("#showsCovers .flickity-slider").addClass("row");
            $.each(data, function (key, serie) {
                $("#shows").append(`
                <section class="show-${serie._id} mb-5">
                    <h4 class="show-title">${serie.title} 
                        <a href="javascript:;" onclick="verSerie(${key})" class="access float-end btn btn-danger btn-sm">Ver más</a>
                    </h4>
                    <div id="vid-${serie._id}"></div>   
                </section>
                `);
                getVideosInShows(serie._id, serie.seasons[0]._id);
            });


            window.localStorage.setItem('series', JSON.stringify(data));

        },
        error: function (error) { },
    });
}


/**
 * Ver listado de episodios
 * @param {*} serieid 
 * @param {*} seasonsid 
 */

function getVideosInShows(serieid, seasonsid) {
    $.ajax({
        url: "https://platform.mediastre.am/api/show/" + serieid + "/season/" + seasonsid + "/episode?limit=15",
        type: "GET",
        dataType: "json",
        headers: {
            "X-API-Token": "215979b6242fdd636897c19bb6428cb5",
        },
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            let data = result.data;
            //data.splice(0, 1);
            let str = data[2].title.toLowerCase();
            if (str.includes("episodio")) {
                data = sortByKeyAsc(data, "title");
            }

            $.each(data, function (key, serie) {
                if (serie.content && serie.content[0].value._id != null) {
                    let id = key;

                    $("#vid-" + serieid).append(`
                
                        <div class="col-12 col-md-3 video_serie">
                            <div class="episodio"> 
                                <a id="img-${id}" class="img-vid" href="javascript:;" onclick="reproductor('${serie.content[0].value._id}')">
                                    <img class="netimg d-block w-100 hvr-grow" src="${serie.images[0].path}" alt="${serie.title}" >
                                    <span class="iconPlay  left bottom"></span>
                                </a>
                                <a class="pt-3 season-title" href="javascript:;" onclick="reproductor('${serie.content[0].value._id}')">${serie.title}</a>
                            </div>
                        </div>
                    
                    `);
                }
            });

            $("#vid-" + serieid).flickity({
                cellAlign: 'left',
                contain: true,
                pageDots: false
            });
            $("#vid-" + serieid + " .flickity-slider").addClass("row");

        },
        error: function (error) { },
    });
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
        x = parseInt(x.replace(/[^0-9\.]+/g, ""));
        y = parseInt(y.replace(/[^0-9\.]+/g, ""));
        return x > y ? -1 : x < y ? 1 : 0;
    });
}
/**
 * Ver serie popup
 * @param {*} id 
 */
function verSerie(id) {
    let series = window.localStorage.getItem('series');
    series = JSON.parse(series);
    let serieData = series[id];
    if ($("#serieModal-" + serieData._id).length > 0) {
        var myModal = new bootstrap.Modal(document.getElementById('serieModal-' + serieData._id), {
            keyboard: false
        });
        myModal.show();
        $('.select-serie').on('change', function () {
            getVideoList(this.value);
        });
    } else {
        let image = "";
        if (serieData.images) {
            image = `
                <div class="img-serie">
                    <img class="d-block w-100" src="${serieData.images[0].path}" alt="${serieData.title}" >
                </div>
            `;
        }

        let sinopsis = "";
        if (serieData.description) {
            sinopsis = `
                <div class="sinopsis">
                    <b>Sinopsis:</b>
                    <p>${serieData.description}</p>
                </div>
            `;
        }

        let selectSeason = '<select id="seasons-' + serieData._id + '" class="form-select select-serie" aria-label="Serie select">';
        let contSeason = 1;
        let jsons = [];
        serieData.seasons.forEach(season => {
            let json = '{"season":"' + season._id + '","serie": "' + serieData._id + '"}';
            jsons.push(json);
            selectSeason += "<option value='" + json + "'>Temporada " + contSeason + "</option>";
            contSeason++;
        });
        selectSeason += '</select>';
        getVideoList(jsons[0]);
        $("body").append(`
                
            <div class="modal fade" id="serieModal-${serieData._id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="serieModalLabel">${serieData.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                   ${image}
                   ${sinopsis}
                   ${selectSeason}
                   <ul class="list-group episode-list">
                   </ul>
                </div>
            </div>
            </div>
        
        `);
        var myModal = new bootstrap.Modal(document.getElementById('serieModal-' + serieData._id), {
            keyboard: false
        });
        myModal.show();
        $('.select-serie').on('change', function () {
            getVideoList(this.value);
        });
    }
}
/**
 * Mostrar lista de videos en el modal
 * @param {*} json 
 */
function getVideoList(json) {
    let jsonData = JSON.parse(json);
    $.ajax({
        url: "https://platform.mediastre.am/api/show/" + jsonData.serie + "/season/" + jsonData.season + "/episode",
        type: "GET",
        dataType: "json",
        headers: {
            "X-API-Token": "215979b6242fdd636897c19bb6428cb5",
        },
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            let data = result.data;
            let str = data[2].title.toLowerCase();
            if (str.includes("episodio")) {
                data = sortByKeyAsc(data, "title");
            }
            $("#serieModal-" + jsonData.serie + " .episode-list").empty();
            $.each(data, function (key, episode) {
                if (episode.content && episode.content[0].value._id != null) {
                    let id = key;
                    $("#serieModal-" + jsonData.serie + " .episode-list").append(`
                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-md-2">
                                    <a class="img-list" id="episode-${episode._id}" href="javascript:;" onclick="reproductor('${episode.content[0].value._id}', '${jsonData.serie}')">
                                        <img class="netimg d-block w-100 h-100 hvr-grow" src="${episode.images[0].path}" alt="${episode.title}" >
                                    </a>
                                </div>
                                <div class="col-md-10">
                                   <a class="title-list" href="javascript:;" onclick="reproductor('${episode.content[0].value._id}', '${jsonData.serie}')"> ${episode.title}</a>
                                </div>
                            </div>
                        </li>
                    `);
                }
            });
        },
        error: function (error) { },
    });
}

/*
function getPlaylist(playlist = "603e76e0dc619107be83606a") {
    $.ajax({
        url: "https://platform.mediastre.am/api/playlist/" + playlist,
        type: "GET",
        dataType: "json",
        headers: {
            "X-API-Token": "215979b6242fdd636897c19bb6428cb5",
        },
        success: function (result) {
            let data = result.data;
            let medias = data.medias;
            $.each(medias, function (key, play) {
                if (play.id) {
                    let id = key;
                    let thumbnail = "";
                    play.thumbnails.forEach(img => {
                        if (img.is_default == true) {
                            thumbnail = img.url;
                        }
                    });
                    if (thumbnail == "") {
                        thumbnail = play.thumbnails[0].url;
                    }
                    $("#playlist").append(`
                
                        <div class="col-md-3 video_serie">
                            <div class="episodio"> 
                                <a id="img-${id}" class="img-vid" href="javascript:;" onclick="reproductor('${play._id}')">
                                    <img class="netimg d-block w-100 hvr-grow" src="${thumbnail}" alt="${play.title}" >
                                    <span class="iconPlay  left bottom"></span>
                                </a>
                                <a class="pt-3 season-title" href="javascript:;" onclick="reproductor('${play._id}')">${play.title}</a>
                            </div>
                        </div>
                    
                    `);
                }
            });

            $("#playlist").flickity({
                cellAlign: 'left',
                contain: true,
                pageDots: false
            });
            $("#playlist .flickity-slider").addClass("row");

        },
        error: function (error) { },
    });
}
*/
$(document).ready(function () {
    /*let url = "?sort=-views_stream_metrics&limit=12&status=OK&category_id=" + ms_category_id;
    getVideos(url);*/
    getShows();
    /*getPlaylist();*/
    $("#closeVideo").on("click", function () {
        $("#playVideo").addClass("d-none");
        $("#playVideo").empty();
        $("#closeVideo").addClass("d-none");
        $("#allList").removeClass("d-none");
    });
});