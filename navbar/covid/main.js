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
        $("#ajaxLoad").html("<span>" + valObject.PVPrimeraDosis + "<span>");
        console.log(valObject);
    }
});


/*
var generalSheet = "https://docs.google.com/spreadsheets/d/1IGjMu_9US4IsvOjBsjVLeEml1EaISvHXzev-xq50X9o/edit#gid=883324876";

$('#generalSheet').sheetrock({
    url: generalSheet
});
*/

