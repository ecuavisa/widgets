var principalSheetEcuador = 'https://docs.google.com/spreadsheets/d/1o5freStX7Hh-h548XVor8J-qrhLrn0xEJSuhOIM-d-g/edit#gid=1938084872';

var medallasec = [""];
for (let me = 0; me < medallasec.length; me++) {
    $('#medContent-ecuador').append(`
    <div>
        <div class="table-responsive"><table id="Sheet-ecuador" class="table table-bordered"></table></div>
    </div>`);
}

sheetrock({
    url: principalSheetEcuador,

    query: "select A,B,C,D",
    fetchSize: 10,
    callback: function (data, sheetrock, response) {
        let rows = response.raw.table.rows;

        $("#Sheet-ecuador").append(`<thead>
            <tr>
                <th ></th>
                <th >Nombre</th>
                <th >Disciplina</th>
                <th >Medalla</th>              
            </tr>
            </thead><tbody id="tbody-ecuador"></tbody>`);
        rows.forEach((row, i) => {
            let foto = (row.c[0].v);
            let nombre = (row.c[1].v);
            let disc = (row.c[2].f);
            let medalla = row.c[3].f;
                     

            $('#tbody-ecuador').append(`
            <tr>              
                <td><img src="${foto}" alt="${nombre}"> ${nombre}</td>
                <td><span class="">${disc}</span></td>
                <td><span class="">${medalla}</span></td>
            </tr>`);

        });
    }
});

