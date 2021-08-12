function dateToYMD(date) {
    var date = new Date(date);
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return "" + (d <= 9 ? "0" + d : d) + "/" + (m <= 9 ? "0" + m : m) + "/" + y;
}

function reproductor(id, serieid = "") {
    if ($("#serieModal-" + serieid).length > 0) {
        $("#serieModal-" + serieid + " .btn-close").click();
    }
    $("#allList").addClass("d-none");
    $("#playVideo").removeClass("d-none");
    $("#closeVideo").removeClass("d-none");
    $("#playVideo").empty();
    $("#playVideo").html(
        `<iframe class="videoecv" src="//mdstrm.com/embed/${id}?autoplay=true" allowfullscreen></iframe>`
    );
}

function closeTop() {
    $("#titleSection").html(`Top 12 vídeos más vistos`);
    $("#mostVideos").empty();
    getVideos();
}

/**
 * Cargar todas las series
 */
function getShows() {
    window.localStorage.clear();
    $.ajax({
        url: "https://platform.mediastre.am/api/show?skip=1",
        type: "GET",
        dataType: "json",
        headers: {
            "X-API-Token": "215979b6242fdd636897c19bb6428cb5",
        },
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            let data = result.data;

            $.each(data, function (key, serie, id, _id) {

                let arry = serie.images;
                let ultElement = arry[arry.length - 1];
                let img = ultElement.path;
                //console.log(img);
                let image = "";
                if (arry) {
                    image = `
                        <div class="img-serie">
                            <img class="ser-show effect d-block w-100 hvr-grow" 
                            src="${img}" alt="${serie.title}" >
                        </div>
                    `;
                }

                let imagePortada = "";
                if (arry) {
                    imagePortada = `                       
                        <img class="d-block w-100 hvr-grow" 
                        src="${img}" alt="${serie.title}" >
                    `;
                }
                if (key != 0 && key != 1) {

                    $("#showsCovers").append(`
                        <section class="col-12 col-md-3 show-${serie._id} mb-5">
                            <a href="javascript:;" onclick="verSerie(${key})">
                                ${image}
                                <h3 class="serie-title effect">${serie.title}</h3>
                            </a>
                        </section>
                    `);
                } else {
                    $("#showsCoversPortada").append(`
                        <section class="new__portada show-${serie._id} mb-5">
                          <div class="new__content">
                              ${imagePortada}
                              <div class="cont__des__butt">
                                  <h3 class="serie-desc effect">${serie.description}</h3>
                                  <div class="btn__portada">
                                      <button type="button" class="btn btn-light"><img src="https://img.icons8.com/material-rounded/48/000000/play--v1.png" style="width: 24px;height: 24px;-webkit-mask-image: linear-gradient(to top, transparent 0, black 0%);"/> Play</button>
                                      <a class="btn btn-dark" href="javascript:;" onclick="verSerie(${key})">Ver más... </a>
                                  </div>
                              </div>                                
                          </div>                        
                      </section>
                    `);
                }

            });
            $("#showsCoversPortada").slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow: false,
                nextArrow: false,
                autoplay: true,
                autoplaySpeed: 3000
            });

            $("#showsCovers").slick({
                infinite: true,
                slidesToShow: 6,
                slidesToScroll: 3,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    }

                ]
            });
            $("#showsCovers .flickity-slider").addClass("row");
            $.each(data, function (key, serie) {
                $("#shows").append(`
                <section class="show-${serie._id} mb-5">
                    <h4 class="show-title">
                      <a href="javascript:;" onclick="verSerie(${key})">${serie.title}</a>
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
        url:
            "https://platform.mediastre.am/api/show/" +
            serieid +
            "/season/" +
            seasonsid +
            "/episode?limit=15",
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
                
                        <div class="col-12 col-xl-2 col-lg-3 col-md-3 video_serie">
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

            $("#vid-" + serieid).slick({
                infinite: false,
                slidesToShow: 5,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
            /*$("#vid-" + serieid + " .flickity-slider").addClass("row");*/
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
        x = parseInt(x.replace(/[^0-9.]+/g, ""));
        y = parseInt(y.replace(/[^0-9.]+/g, ""));
        return x > y ? -1 : x < y ? 1 : 0;
    });
}
/**
 * Ver serie popup
 * @param {*} id
 */
function verSerie(id) {
    let series = window.localStorage.getItem("series");
    series = JSON.parse(series);
    let serieData = series[id];
    if ($("#serieModal-" + serieData._id).length > 0) {
        var myModal = new bootstrap.Modal(
            document.getElementById("serieModal-" + serieData._id),
            {
                keyboard: false,
            }
        );
        myModal.show();
    } else {
        let arry = serieData.images;
        let ultElement = arry[arry.length - 1];
        let img = ultElement.path;
        let image = "";
        if (serieData.images) {
            image = `
                <div class="img-serie m-auto">
                    <img class="d-block w-100" src="${img}" alt="${serieData.title}" >
                </div>
            `;
        }

        let sinopsis = "";
        if (serieData.description) {
            sinopsis = `
                <div class="sinopsis">
                    <b>${serieData.title}</b>
                    <p>${serieData.description}</p>
                </div>
            `;
        }

        let seasonHtml = "";
        let contSeason = 1;
        serieData.seasons.forEach((season) => {
            seasonHtml += `<div class="seasons">
                            <div class="season-title">Temporada ${contSeason}</div>
                            <div class="season-episodes" data-season="${season._id}"></div>
                        </div>`;
            contSeason++;
        });

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
                   <div class="season-list">
                    ${seasonHtml}
                   </div>
                </div>
            </div>
            </div>
        `);
        getVideoList(serieData._id);
        var myModal = new bootstrap.Modal(
            document.getElementById("serieModal-" + serieData._id),
            {
                keyboard: false,
            }
        );
        myModal.show();
    }
}
/**
 * Mostrar lista de videos en el modal
 * @param {*} json
 */
function getVideoList(serieId) {
    $("#serieModal-" + serieId + " .seasons").each(function () {
        let seasonId = $(this).find(".season-episodes").attr("data-season");
        let selfDiv = $(this);
        $.ajax({
            url:
                "https://platform.mediastre.am/api/show/" +
                serieId +
                "/season/" +
                seasonId +
                "/episode",
            type: "GET",
            dataType: "json",
            headers: {
                "X-API-Token": "215979b6242fdd636897c19bb6428cb5",
            },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                let data = result.data;
                if (data[2]) {
                    let str = data[2].title.toLowerCase();
                    if (str.includes("episodio")) {
                        data = sortByKeyAsc(data, "title");
                    }
                }
                selfDiv.find(".season-episodes").empty();
                $.each(data, function (key, episode) {
                    if (episode.content && episode.content[0].value._id != null) {
                        let id = key;
                        let episodeHtml = `
                        <div class="col-12 col-xl-2 col-lg-3 col-md-3 video_serie">
                            <div class="episodio">
                                <a id="img-${episode._id}" class="img-vid" href="javascript:;" onclick="reproductor('${episode.content[0].value._id}', '${serieId}')">
                                    <img class="netimg d-block w-100 hvr-grow" src="${episode.images[0].path}" alt="${episode.title}" >
                                    <span class="iconPlay  left bottom"></span>
                                </a>
                                <a class="pt-3 season-title" href="javascript:;" onclick="reproductor('${episode.content[0].value._id}', '${serieId}')">${episode.title}</a>
                            </div>
                        </div>`;
                        selfDiv.find(".season-episodes").append(episodeHtml);
                    }
                });
                selfDiv.find(".season-episodes").slick({
                    infinite: false,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1,
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            },
            error: function (error) { },
        });
    });
}


$(document).ready(function () {

    getShows();
    $("#closeVideo").on("click", function () {
        $("#playVideo").addClass("d-none");
        $("#playVideo").empty();
        $("#closeVideo").addClass("d-none");
        $("#allList").removeClass("d-none");
    });
});