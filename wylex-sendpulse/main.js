$(document).ready(function () {
  $.ajax({
    url: "https://suscripciones.ecuavisa.com/api/v1/users?status=active&limit=10",
    type: "GET",
    dataType: "json",
    headers: {
        "Authorization": "Bearer wyleex+vistazo",
    },
    contentType: "application/json; charset=utf-8",
    success: function (result) {
        let data = result.data;
        console.log(data);
    },
    error: function (error) { },
  })
});
