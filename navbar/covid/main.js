var principalSheet = 'https://docs.google.com/spreadsheets/d/1IGjMu_9US4IsvOjBsjVLeEml1EaISvHXzev-xq50X9o/edit#gid=0';
window.valObject = {};
$('#principalSheet').sheetrock({
    url: principalSheet,
    callback: function (error, options, response) {
        let principalData = response.rows[1];
        for (let index = 0; index < principalData.labels.length; index++) {
            const key = principalData.labels[index];
            const value = principalData.cellsArray[index];
            valObject[key] = value;
        }
        $("#pv-1dosis").html(valObject.PVPrimeraDosis);
        $("#pv-2dosis").html(valObject.PVSegundaDosis);

        $("#por-2dosis").html( "<div  data-stroke='data:ldbar/res,gradient(0,1,#f99,#ff9)' class='ldBar' data-value='" + valObject.PorcentajePrimeraDosis + "' ></div>" );

        $("#por-1dosis").html( "<div data-stroke='data:ldbar/res,gradient(0,1,#f99,#ff9)' class='ldBar ' data-value='" + valObject.PorcentajeSegundaDosis + "' ></div>" );



        $("#tot-fallecidos").html(valObject.TotalFallecidos);
        $("#tot-infectados").html(valObject.TotalInfectados);
        $("#tot-recuperados").html(valObject.TotalRecuperados);

        $("#var-fallecidos").html(valObject.VariaciónFallecidos);
        $("#var-infectados").html(valObject.VariaciónInfectados);


        

        console.log(valObject);
    }
});


/*
var generalSheet = "https://docs.google.com/spreadsheets/d/1IGjMu_9US4IsvOjBsjVLeEml1EaISvHXzev-xq50X9o/edit#gid=883324876";

$('#generalSheet').sheetrock({
    url: generalSheet
});
*/

