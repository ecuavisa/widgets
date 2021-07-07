var principalSheet = 'https://docs.google.com/spreadsheets/d/1Fw7a5tjulR1_wtB7nlTaI3I4kbb1y5iIjnwyhGZZnmo/edit#gid=0';
//window.valObject = {};
$('#principalSheet').sheetrock({
    url: principalSheet,

    query: "select A,B,C",
    fetchSize: 50,
    callback: function (data, sheetrock, response) {
        let rows = response.raw.table.rows;
        /*Se eliminan los primeros 2*/
        rows.splice(0, 2);
        let rowIndex = 2;
        let horaActual = moment().format("H");
        rows.forEach(row => {
            let horaStr = row.c[0].v;
            var hora = moment(horaStr, "H").format("H");
            if (hora == horaActual) {
                $('#principalSheet tr').eq(rowIndex).addClass("bg-danger");
            }
            rowIndex++;
        });
    }
});


$('#martes-data').sheetrock({
    url: principalSheet,

    query: "select D,E,F",
    fetchSize: 50,
    callback: function (data, sheetrock, response) {
        let rows = response.raw.table.rows;
        /*Se eliminan los primeros 2*/
        rows.splice(0, 2);
        let rowIndex = 2;
        let horaActual = moment().format("H");
        rows.forEach(row => {
            let horaStr = row.c[0].v;
            var hora = moment(horaStr, "H").format("H");
            if (hora == horaActual) {
                $('#martes-data tr').eq(rowIndex).addClass("bg-danger");
            }
            rowIndex++;
        });
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
        let horaActual = moment().format("H");
        rows.forEach(row => {
            let horaStr = row.c[0].v;
            var hora = moment(horaStr, "H").format("H");
            if (hora == horaActual) {
                $('#miercoles-data tr').eq(rowIndex).addClass("bg-danger");
            }
            rowIndex++;
        });
    }

});
