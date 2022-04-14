var url =
  "https://suscripciones.ecuavisa.com/api/v1/users?status=active&limit=5";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Authorization", "Bearer wyleex+vistazo");
xhr.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    console.log(xhr.status);
    console.log(xhr.responseText);
  }
};

xhr.send();
