 //Creación del mapa
    var mymap = L.map('mapatiempos').setView([22.728901368718923, -101.58837877213955], 5);
    mymap.scrollWheelZoom.disable();

    var Esri_WorldGrayCanvas = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
            attribution: ' © LaSexta',
            maxZoom: 16
        }).addTo(mymap);

    //Estilo sistema ferroviario
    var estilo_c_ferrocarril = {
        "color": "#cc9bff",
        "weight": 2,
        "opacity": 0.6
    };

    //Añadimos el mapa ferroviario
    var c_ferrocarril = L.geoJSON('', {
        style: estilo_c_ferrocarril
    }).addTo(mymap);

    c_ferrocarril.addData(datos_ferrocarril);

    function crear_mapa() {
        //Marcadores personalizados
        var marcador_poi = L.icon({
            iconUrl: 'https://www.antena3.com/newa3flash/modulos_blancos/tiempos_de_guerra/mapa/img/pinamarillo.svg?4',
            iconSize: [40, 40],
            iconAnchor: [20, 40]
        });

        //Estilo rutas migrantes
        var estilo_r_entrada_tabasco = {
            "color": "#4CAF50",
            "weight": 5,
            "opacity": 0.8
        };

        var estilo_r_entrada_chiapas = {
            "color": "#377F3A",
            "weight": 5,
            "opacity": 0.8
        };

        var estilo_r_golfo = {
            "color": "#37C6E8",
            "weight": 5,
            "opacity": 0.8
        };

        var estilo_r_intermedia = {
            "color": "#FF721C",
            "weight": 5,
            "opacity": 0.8
        };

        var estilo_r_nuevolaredo = {
            "color": "#dd1111",
            "weight": 5,
            "opacity": 0.8
        };

        var estilo_r_juarez = {
            "color": "#FF1414",
            "weight": 5,
            "opacity": 0.8
        };

        var estilo_r_tijuana = {
            "color": "#7F0A0A",
            "weight": 5,
            "opacity": 0.8
        };

        // Especificaciones PopUp
        var opciones_popup = {
            'maxWidth': '500',
            'className': 'custom'
        }

        //Listado de Marcadores
        //  ->Blocaos
        var m_tijuana = L.marker([32.553477, -116.896311], {
            icon: marcador_poi
        }).addTo(mymap);

        var m_juarez = L.marker([31.754297, -106.434525], {
            icon: marcador_poi
        }).addTo(mymap);

        var m_nuevolaredo = L.marker([27.499440, -99.504769], {
            icon: marcador_poi
        }).addTo(mymap);

        var m_irapuato = L.marker([20.679057, -101.355199], {
            icon: marcador_poi
        }).addTo(mymap);

        var m_mediasaguas = L.marker([17.682734, -95.027356], {
            icon: marcador_poi
        }).addTo(mymap);

        //Creamos el grupo de capas con todos los POI
        var c_poi = L.layerGroup([m_tijuana, m_juarez, m_nuevolaredo, m_irapuato, m_mediasaguas]);

        //Controladores de capas en los botones
        $("#b_ferrocarril").click(function (event) {
            $(this).addClass('boton_capas_seleccionado');
            if (mymap.hasLayer(c_ferrocarril)) {
                $(this).addClass('boton_capas_seleccionado');
                mymap.removeLayer(c_ferrocarril);
            } else {
                mymap.addLayer(c_ferrocarril);
                $(this).removeClass('boton_capas_seleccionado');
            }
        });

        $("#b_poi").click(function (event) {
            $(this).addClass('boton_capas_seleccionado');
            if (mymap.hasLayer(c_poi)) {
                $(this).addClass('boton_capas_seleccionado');
                mymap.removeLayer(c_poi);
            } else {
                mymap.addLayer(c_poi);
                $(this).removeClass('boton_capas_seleccionado');
            }
        });

        $("#b_r_entrada").click(function (event) {
            $(this).addClass('boton_capas_seleccionado');
            if (mymap.hasLayer(c_r_entrada)) {
                $(this).addClass('boton_capas_seleccionado');
                mymap.removeLayer(c_r_entrada);
            } else {
                mymap.addLayer(c_r_entrada);
                $(this).removeClass('boton_capas_seleccionado');
            }
        });

        $("#b_r_intermedia").click(function (event) {
            $(this).addClass('boton_capas_seleccionado');
            if (mymap.hasLayer(r_intermedia)) {
                $(this).addClass('boton_capas_seleccionado');
                mymap.removeLayer(r_intermedia);
            } else {
                mymap.addLayer(r_intermedia);
                $(this).removeClass('boton_capas_seleccionado');
            }
        });

        $("#b_r_golfo").click(function (event) {
            $(this).addClass('boton_capas_seleccionado');
            if (mymap.hasLayer(r_golfo)) {
                $(this).addClass('boton_capas_seleccionado');
                mymap.removeLayer(r_golfo);
            } else {
                mymap.addLayer(r_golfo);
                $(this).removeClass('boton_capas_seleccionado');
            }
        });

        $("#b_r_norte").click(function (event) {
            $(this).addClass('boton_capas_seleccionado');
            if (mymap.hasLayer(c_r_norte)) {
                $(this).addClass('boton_capas_seleccionado');
                mymap.removeLayer(c_r_norte);
            } else {
                mymap.addLayer(c_r_norte);
                $(this).removeClass('boton_capas_seleccionado');
            }
        });

        //Añadimos las rutas de migrantes
        var r_entrada_tabasco = L.geoJSON(datos_r_entrada_tabasco, {
            style: estilo_r_entrada_tabasco,
            snakingSpeed: 100
        }).addTo(mymap).snakeIn();

        var r_entrada_chiapas = L.geoJSON(datos_r_entrada_chiapas, {
            style: estilo_r_entrada_chiapas,
            snakingSpeed: 100
        }).addTo(mymap).snakeIn();

        var r_golfo = L.geoJSON(datos_r_golfo, {
            style: estilo_r_golfo,
            snakingSpeed: 100
        }).addTo(mymap).snakeIn();

        var r_intermedia = L.geoJSON(datos_r_intermedia, {
            style: estilo_r_intermedia,
            snakingSpeed: 100
        }).addTo(mymap).snakeIn();

        var r_nuevolaredo = L.geoJSON(datos_r_nuevolaredo, {
            style: estilo_r_nuevolaredo,
            snakingSpeed: 100
        }).addTo(mymap).snakeIn();

        var r_juarez = L.geoJSON(datos_r_juarez, {
            style: estilo_r_juarez,
            snakingSpeed: 100
        }).addTo(mymap).snakeIn();

        var r_tijuana = L.geoJSON(datos_r_tijuana, {
            style: estilo_r_tijuana,
            snakingSpeed: 100
        }).addTo(mymap).snakeIn();

        //Creamos el grupo de capas con todos las rutas de entrada
        var c_r_entrada = L.layerGroup([r_entrada_tabasco, r_entrada_chiapas]);
        var c_r_norte = L.layerGroup([r_tijuana, r_juarez, r_nuevolaredo]);

        //Chivato temporal de coordenadas
        // mymap.on('click', function(e) {
        //   console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
        // });

        m_tijuana.bindPopup('<p class="texto_popup">Paso a EEUU desde <span style="font-weight:bold;">Tijuana</span>. Frontera con el estado de California.</p>', opciones_popup);
        m_juarez.bindPopup('<p class="texto_popup">Paso a EEUU desde <span style="font-weight:bold;">Ciudad Juárez</span>. Frontera con el estado de Nuevo México.</p>', opciones_popup);
        m_nuevolaredo.bindPopup('<p class="texto_popup">Paso a EEUU desde <span style="font-weight:bold;">Nuevo Laredo</span>. Frontera con el estado de Texas.</p>', opciones_popup);
        m_irapuato.bindPopup('<p class="texto_popup"><span style="font-weight:bold;">Irapuato</span>. Ciudad donde conectan las rutas del norte con la intermedia que viene del sur.</p>', opciones_popup);
        m_mediasaguas.bindPopup('<p class="texto_popup"><span style="font-weight:bold;">Medias Aguas</span>. Ciudad donde conectan las rutas de entrada con la intermedia que va al norte.</p>', opciones_popup);

        mymap.scrollWheelZoom.disable();
        mymap.fitBounds(c_poi.getBounds);
    }



    var waypoint = new Waypoint({
        element: document.getElementById('mapatiempos'),
        handler: function (direction) {
            crear_mapa()
        },
        offset: '70%'
    })