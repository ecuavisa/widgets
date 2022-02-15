var principalSheet = 'https://docs.google.com/spreadsheets/d/1Fw7a5tjulR1_wtB7nlTaI3I4kbb1y5iIjnwyhGZZnmo/edit#gid=0';
//window.valObject = {};

var f = new Date();

let feAc = (f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
console.log(feAc);
$('#principalSheet').sheetrock({
    url: principalSheet,

    query: "select A,B,C",
    fetchSize: 100,
    callback: function (data, sheetrock, response) {
        let rows = response.raw.table.rows;
        /*Se eliminan los primeros 2*/
        rows.splice(0, 1);
        let rowIndex = 2;
        let horaActual = parseInt(moment().format("H"));
        let minutActual = moment().format("mm");
        let contador = 1;

        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            if (contador < (rows.length - 1)) {
                contador++;
            } else {
                contador = (rows.length - 1);
            }
            let horaStr = row.c[0].f;
            let nombre = row.c[1].v;
            var hora = parseInt(moment(horaStr, "HH:mm").format("H"));
            var minuto = moment(horaStr, "HH:mm").minutes();
            console.log(`la hora---->:${hora}`);
            /**
             * Siguiente
             */
            let tempRow = rows[contador];
            let horaStrSiguiente = tempRow.c[0].f;
            var horaSiguiente = parseInt(moment(horaStrSiguiente, "H").format("H"));
            var minutoSiguiente = moment(horaStrSiguiente, "HH:mm:ss").minutes();
            var nombreSiguiente = tempRow.c[1].v;
            // console.log("Hora:" + hora);
            // console.log('hora inicio - lunes',hora == horaActual && horaSiguiente == horaActual);
            //console.log("Hora actual:" + horaActual);
            if (hora == horaActual && horaActual <= horaSiguiente && nombre == nombreSiguiente) {
              
                $('#principalSheet tr').eq(rowIndex).addClass("bg-warning");
            }
            rowIndex++;
        }

    }
});


$('#martes-data').sheetrock({
    url: principalSheet,

    query: "select D,E,F",
    fetchSize: 50,
    callback: function (data, sheetrock, response) {
        let rows = response.raw.table.rows;
        /*Se eliminan los primeros 2*/
        rows.splice(0, 1);
        let rowIndex = 2;
        let horaActual = parseInt(moment().format("H"));
        let minutActual = moment().format("mm");
        let contador = 1;
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            if (contador < (rows.length - 1)) {
                contador++;
            } else {
                contador = (rows.length - 1);
            }
            let horaStr = row.c[0].f;
            let nombre = row.c[1].v;
            var hora = parseInt(moment(horaStr, "H").format("H"));
            var minuto = moment(horaStr, "HH:mm:ss").minutes();
            /**
             * Siguiente
             */
            let tempRow = rows[contador];
            let horaStrSiguiente = tempRow.c[0].f;
            var horaSiguiente = parseInt(moment(horaStrSiguiente, "H").format("H"));
            var minutoSiguiente = moment(horaStrSiguiente, "HH:mm:ss").minutes();
            var nombreSiguiente = tempRow.c[1].v;
            //console.log("Hora:" + hora);
            console.log(hora == horaActual && horaSiguiente == horaActual);
            //console.log("Hora actual:" + horaActual);
            if (hora == horaActual && horaActual <= horaSiguiente && nombre == nombreSiguiente) {
                
                $('#martes-data tr').eq(rowIndex).addClass("bg-warning");
            }
            rowIndex++;
        }
        
    }
});

$('#miercoles-data').sheetrock({
    url: principalSheet,

    query: "select G,H,I",
    fetchSize: 50,
    callback: function (data, sheetrock, response) {
        let rows = response.raw.table.rows;
        /*Se eliminan los primeros 2*/
        rows.splice(0, 2);
        let rowIndex = 2;
        let horaActual = parseInt(moment().format("H"));
        let minutActual = moment().format("mm");
        let contador = 1;
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            if (contador < (rows.length - 1)) {
                contador++;
            } else {
                contador = (rows.length - 1);
            }
            let horaStr = row.c[0].v;
            let nombre = row.c[1].v;
            var hora = parseInt(moment(horaStr, "H").format("H"));
            var minuto = moment(horaStr, "HH:mm:ss").minutes();
            /**
             * Siguiente
             */
            let tempRow = rows[contador];
            let horaStrSiguiente = tempRow.c[0].v;
            var horaSiguiente = parseInt(moment(horaStrSiguiente, "H").format("H"));
            var minutoSiguiente = moment(horaStrSiguiente, "HH:mm:ss").minutes();
            var nombreSiguiente = tempRow.c[1].v;
            //console.log("Hora:" + hora);
            console.log(hora == horaActual && horaSiguiente == horaActual);
            //console.log("Hora actual:" + horaActual);
            if (hora == horaActual && horaActual <= horaSiguiente && nombre == nombreSiguiente) {
                
                $('#miercoles-data tr').eq(rowIndex).addClass("bg-warning");
            }
            rowIndex++;
        }
        
    }

});


$('#jueves-data').sheetrock({
    url: principalSheet,

    query: "select J,K,L",
    fetchSize: 50,
    callback: function (data, sheetrock, response) {
        let rows = response.raw.table.rows;
        /*Se eliminan los primeros 2*/
        rows.splice(0, 2);
        let rowIndex = 2;
        let horaActual = parseInt(moment().format("H"));
        let minutActual = moment().format("mm");
        let contador = 1;
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            if (contador < (rows.length - 1)) {
                contador++;
            } else {
                contador = (rows.length - 1);
            }
            let horaStr = row.c[0].v;
            let nombre = row.c[1].v;
            var hora = parseInt(moment(horaStr, "H").format("H"));
            var minuto = moment(horaStr, "HH:mm:ss").minutes();
            /**
             * Siguiente
             */
            let tempRow = rows[contador];
            let horaStrSiguiente = tempRow.c[0].v;
            var horaSiguiente = parseInt(moment(horaStrSiguiente, "H").format("H"));
            var minutoSiguiente = moment(horaStrSiguiente, "HH:mm:ss").minutes();
            var nombreSiguiente = tempRow.c[1].v;
            //console.log("Hora:" + hora);
            console.log(hora == horaActual && horaSiguiente == horaActual);
            //console.log("Hora actual:" + horaActual);
            if (hora == horaActual && horaActual <= horaSiguiente && nombre == nombreSiguiente) {
                $('#miercoles-data tr').eq(rowIndex).addClass("bg-warning");
            }
            rowIndex++;
        }
        
    }

});