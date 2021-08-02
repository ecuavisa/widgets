var principalSheetEcuador = 'https://docs.google.com/spreadsheets/d/1o5freStX7Hh-h548XVor8J-qrhLrn0xEJSuhOIM-d-g/edit#gid=1938084872';

var medallasec = [""];
for (let me = 0; me < medallasec.length; me++) {
    $('#medContent-ecuador').append(`
    <div>
    
        <div class="table-responsive c-ec"><table id="Sheet-ecuador" class="table table-bordered"></table></div>
    </div>`);
}

sheetrock({
    url: principalSheetEcuador,

    query: "select A,B,C,D",
    fetchSize: 50,
    callback: function (data, sheetrock, response) {
        let rows = response.raw.table.rows;
        //rows.shift();
        $("#Sheet-ecuador").append(`<thead>
            <tr>
                   

            </tr>
            </thead><tbody id="tbody-ecuador"></tbody>`);
        rows.forEach((row, i) => {
            console.log(row);
            let foto = (row.c[0].v);
            let nombre = (row.c[1].v);
            let disc = (row.c[2].v);
            let fechaHora = (row.c[3].f);
            


            $('#tbody-ecuador').append(`
            <tr>              
                <td><img src="${foto}" alt="${nombre}"> </td>
                <td>
                    <span class="">${nombre}</span> <br> 
                    <span class="badge bg-primary">${disc}</span>
                </td>
                <td><span class="">${fechaHora}</span></td>

            </tr>`);

        });
    }
});






