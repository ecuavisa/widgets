var principalSheet = 'https://docs.google.com/spreadsheets/d/1o5freStX7Hh-h548XVor8J-qrhLrn0xEJSuhOIM-d-g/edit#gid=1470802356';

var medallas = [""];
for (let me = 0; me < medallas.length; me++) {
    $('#medContent').append(`
    <div>
        <div class="table-responsive"><table id="Sheet" class="table table-bordered"></table></div>
        <div class="text-center">
        <a class="btn btn-dark" href="/medallero-olimpico-2021" target="_blank">Ver la tabla completa <b>aquí</b> </a></div>
    </div>`);
    
}

sheetrock({
    url: principalSheet,

    query: "select A,B,C,D,E,F",
    fetchSize: 4,
    callback: function (data, sheetrock, response) {
        let rows = response.raw.table.rows;

        $("#Sheet").append(`<thead>
            <tr>
                <th ></th>
                <th >Oro</th>
                <th >Plata</th>
                <th >Bronce</th>
                <th >Total</th>                
            </tr>
            </thead><tbody id="tbody"></tbody>`);
        rows.forEach((row, i) => {
            let bandera = (row.c[0].v);
            let equipo = (row.c[1].v);
            let oro = (row.c[2].f);
            let plata = row.c[3].f;
            let bronce = row.c[4].f;
            let total = row.c[5].f;           

            $('#tbody').append(`
            <tr>              
                <td><img src="${bandera}" alt="${equipo}"> ${equipo}</td>
                <td><span class="">${oro}</span></td>
                <td><span class="">${plata}</span></td>
                <td><span class="">${bronce}</span></td>
                <td>${total}</td>
            </tr>`);

        });
    }
});

