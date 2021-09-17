$(document).ready(function () {

  let d = new Date();
  let day = d.getDay();
  let hour = d.getHours();
  let min = d.getMinutes();
  let t = d.getTime();

  console.log('dia ' + day, 'hora ' + hour, 'minuto ' + min);

  // necesitamos una función que convierta las horas y los minutos en un número de dos dígitos
  Object.prototype.twoDigits = function () {
    return ("0" + this).slice(-2);
  }
  // obtener la fecha y hora actual
  //let d = new Date();

  // compila la hora y los minutos actuales en el formato 09:35
  timeOfDay = d.getHours().twoDigits() + ':' + d.getMinutes().twoDigits();

  // prueba si timeOfDay está dentro de un marco de tiempo determinado
  if ((day > 0 && day <= 5)) { //validacion de lunes a viernes
    if ('13:10' <= timeOfDay && timeOfDay <= '17:10') {
      console.log('inside');
      $(".inner").append(`
          <div>
            <img  src="https://i.imgur.com/RcqFJuy.png" alt="imagen">
            <h2 class="ms-5">Estamos Presentado</h1>
            <h1 class="ms-5"> Televistazo 13h00</h2>
            <a href="https://www.ecuavisa.com/envivo" class="ms-5 btn btn-primary stretched-link ">VER EN VIVO</a>
          </div>`
      );
    } else if ('17:13' <= timeOfDay && timeOfDay <= '17:30'){
      console.log('outside ');
      $(".inner").append(`
          <div>
            <a href="https://www.ecuavisa.com/envivo" class="ms-5 btn btn-primary stretched-link ">VER EN VIVO</a>
          </div>`
      );
    }else{
      
    }
  } else if ((day === 6)) { //validacion de sabado
    console.log("es sabado");
  } else {
    console.log("es domingo"); //validacion de domingo
  }

});