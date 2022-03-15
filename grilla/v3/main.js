var principalSheet =
  "https://docs.google.com/spreadsheets/d/1Fw7a5tjulR1_wtB7nlTaI3I4kbb1y5iIjnwyhGZZnmo/edit#gid=1289015289";

//window.valObject = {};

/**
 * Extrayendo fechas de la semana
 */

 function fechasSemana() {
    var dias = [];
    var today = new Date();
    var tempDate = new Date();
    var day = today.getDay();
  
    if (today.getDate() == "15") {
      console.log(today.getDate());
      tempDate.setDate(today.getDate() + 6);
    } else if (today.getDate() == "16") {
      console.log(today.getDate());
      tempDate.setDate(today.getDate() + 5);
  
    }else if (today.getDate() == "17") {
      console.log(today.getDate());
      tempDate.setDate(today.getDate() + 4);
  
    }else if (today.getDate() == "18") {
      console.log(today.getDate());
      tempDate.setDate(today.getDate() + 3);
  
    }else if (today.getDate() == "19") {
      console.log(today.getDate());
      tempDate.setDate(today.getDate() + 2);
  
    }else if (today.getDate() == "20") {
      console.log(today.getDate());
      tempDate.setDate(today.getDate() + 1);
  
    }else{
        
    }
  
    for (var i = 7; i > 0; i--) {
      tempDate.setDate(tempDate.getDate() - 1);
      dias.push(moment(tempDate, "DD/MM/YYYY", true).format("DD/MM/YYYY"));
    }
    dias.sort();
    return dias;
  }
  /**
   * Generando template para tablas
   */
  var diasSemana = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];
  var fechaTemporal = new Date();
  var diaActual = diasSemana[fechaTemporal.getDay() - 1];
  
  var fechas = fechasSemana();
  console.log(fechas);
  for (let ds = 0; ds < diasSemana.length; ds++) {
    const diaSemana = diasSemana[ds];
    let classA = "";
    if (diaSemana == diaActual) {
      classA = "active";
    }
    $("#pills-tab").append(` <li class="nav-item" role="presentation">
          <button class="nav-link ${classA}" id="pills-${diaSemana.toLowerCase()}-tab" data-bs-toggle="pill" data-bs-target="#pills-${diaSemana.toLowerCase()}"
            type="button" role="tab" aria-controls="pills-${diaSemana.toLowerCase()}" aria-selected="true">${diaSemana}</button>
        </li>`);
    $("#pills-tabContent")
      .append(`<div class="tab-pane fade show ${classA}" id="pills-${diaSemana.toLowerCase()}" role="tabpanel" aria-labelledby="pills-${diaSemana.toLowerCase()}-tab">
          <div class="table-responsive"><table id="${diaSemana.toLowerCase()}Sheet" class="table table-borderless"></table></div>
        </div>`);
  }
  
  let horaActual = moment().format("HH:mm");
  sheetrock({
    url: principalSheet,
  
    query: "select A,B,C,D,E,F,G where G = 2",
    fetchSize: 900,
    callback: function (data, sheetrock, response) {
      let rows = response.raw.table.rows;
      for (let fi = 0; fi < fechas.length; fi++) {
        const fecha = fechas[fi];
        const clase = diasSemana[fi].toLowerCase();
        $("#" + clase + "Sheet").append(`<thead>
              <tr>
                  
              </tr>
              </thead><tbody id="tbody-${clase}"></tbody>`);
        rows.forEach((row, i) => {
          let fechaRow = row.c[5].f;
          let idshe = row.c[6].f;
  
          if (fechaRow == fecha) {
            let horaInicio = moment(row.c[3].f);
            let horaFin = moment(row.c[4].f);
            let nombre = row.c[0].v;
            let detalle = row.c[1] ?  row.c[1].v : "";
            let detalleFormat =  (detalle == 'FALSO') ? "" : detalle;
         
            
            let claseActiva = "";
            if (
              horaActual >= horaInicio.format("HH:mm") &&
              horaActual <= horaFin.format("HH:mm") &&
              diasSemana[fi] == diaActual
            ) {
              claseActiva = "bg-paleta";
            }
            $("#tbody-" + clase).append(`<tr class="${claseActiva}">
                  <td class="text-center" style="width: 16%"> 
                  <h5>
                  ${horaInicio.format("HH:mm")}
                  </h5>
                  </td>
                  <!-- <td class="text-center">
                  ${horaFin.format("LT")}
                  </td> -->
                  <td> 
                      <strong>${nombre}</strong>
                      <p>${detalleFormat}</p>                  
                  </td>                  
              </tr>`);
          }
        });
      }
    },
  });
  