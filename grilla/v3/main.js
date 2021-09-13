
var principalSheet = 'https://docs.google.com/spreadsheets/d/1Fw7a5tjulR1_wtB7nlTaI3I4kbb1y5iIjnwyhGZZnmo/edit#gid=1470802356';
//window.valObject = {};

/**
 * Extrayendo fechas de la semana
 */

function fechasSemana() {
    var dias = [];
    var today = new Date();
    var tempDate = new Date();
    var day = today.getDay();
    tempDate.setDate(today.getDate() + 3);
    for (var i = 7; i > 0; i--) {
        tempDate.setDate(tempDate.getDate() - 1);
        dias.push(moment(tempDate, 'DD/MM/YYYY', true).format('DD/MM/YYYY'));
    }
    dias.sort();
    return dias;
}
/**
 * Generando template para tablas
 */
var diasSemana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
var fechaTemporal = new Date();
var diaActual = diasSemana[fechaTemporal.getDay() - 1];

var fechas = fechasSemana();
for (let ds = 0; ds < diasSemana.length; ds++) {
    const diaSemana = diasSemana[ds];
    let classA = "";
    if (diaSemana == diaActual) {
        classA = "active";
    }
    $('#pills-tab').append(` <li class="nav-item" role="presentation">
        <button class="nav-link ${classA}" id="pills-${diaSemana.toLowerCase()}-tab" data-bs-toggle="pill" data-bs-target="#pills-${diaSemana.toLowerCase()}"
          type="button" role="tab" aria-controls="pills-${diaSemana.toLowerCase()}" aria-selected="true">${diaSemana}</button>
      </li>`);
    $('#pills-tabContent').append(`<div class="tab-pane fade show ${classA}" id="pills-${diaSemana.toLowerCase()}" role="tabpanel" aria-labelledby="pills-${diaSemana.toLowerCase()}-tab">
        <div class="table-responsive"><table id="${diaSemana.toLowerCase()}Sheet" class="table table-bordered"></table></div>
      </div>`);
}

let horaActual = moment().format('HH:mm');
sheetrock({
    url: principalSheet,

    query: "select A,B,C,D,E,F",
    fetchSize: 50,
    callback: function (data, sheetrock, response) {
        let rows = response.raw.table.rows;
        rows.splice(0, 2);
        for (let fi = 0; fi < fechas.length; fi++) {
            const fecha = fechas[fi];
            const clase = diasSemana[fi].toLowerCase();
            $('#' + clase + "Sheet").append(`<thead>
            <tr>
                <th class="text-center" style="width: 7%">Hora Inicio</th>
                <th class="text-center" style="width: 7%">Hora Fin</th>
                <th style="width: 20%">Título</th>
                <th>Detalle</th>
            </tr>
            </thead><tbody id="tbody-${clase}"></tbody>`);
            rows.forEach((row, i) => {
                let fechaRow = row.c[5].f;
                if (fechaRow == fecha) {
                    let horaInicio = moment(row.c[3].f);
                    let horaFin = moment(row.c[4].f);
                    let nombre = row.c[0].v;
                    let detalle = row.c[1] ? row.c[1].v : "";
                    /**
                     * Validacion de hora
                     */
                    let claseActiva = "";
                    if (horaActual >= horaInicio.format('HH:mm') && horaActual <= horaFin.format('HH:mm') && diasSemana[fi] == diaActual) {
                        claseActiva = "bg-info";
                    }
                    $('#tbody-' + clase).append(`<tr class="${claseActiva}">
                        <td class="text-center">
                        ${horaInicio.format('LT')}
                        </td>
                        <td class="text-center">
                        ${horaFin.format('LT')}
                        </td>
                        <td>
                        ${nombre}
                        </td>
                        <td>
                        ${detalle}
                        </td>
                    </tr>`);
                }
            });
        }

    }
});

