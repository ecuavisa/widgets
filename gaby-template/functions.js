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
    if ('07:00' <= timeOfDay && timeOfDay <= '07:29') {
      console.log('inside');
      $(".inner").append(`
          <div>
            <img class="imgcintillo desk" src="https://www.ecuavisa.com/ecuavisa/main/envivo/contacto-directo.jpg" alt="imagen">
            <img class="imgcintillo mov" src=" https://i.imgur.com/vz5qSNV.png" alt="imagen">           
            <h2 class="ms-5">Estamos Presentado</h1>
            <h1 class="ms-5">Contacto Directo</h2>
            <a href="https://www.ecuavisa.com/envivo" class="ms-5 btn btn-primary stretched-link ">VER EN VIVO</a>
          </div>`
      );
    } else if ('07:30' <= timeOfDay && timeOfDay <= '09:00'){
      console.log('outside ');
      $(".inner").append(`
          <div>
            <img class="imgcintillo desk" src="https://i.imgur.com/RcqFJuy.png" alt="imagen">
            <img class="imgcintillo mov" src=" https://i.imgur.com/vz5qSNV.png" alt="imagen"> 
            <h2 class="ms-5">Estamos Presentado</h1>
            <h1 class="ms-5">Televistazo en la Comunidad</h2>
            <a href="https://www.ecuavisa.com/envivo" class="ms-5 btn btn-primary stretched-link ">VER EN VIVO</a>
          </div>`
      );
    }else if ('10:30' <= timeOfDay && timeOfDay <= '12:59'){
      console.log('outside ');
      $(".inner").append(`
          <div>
            <img class="imgcintillo desk" src="https://www.ecuavisa.com/ecuavisa/main/envivo/en-contacto.jpg" alt="imagen">
            <img class="imgcintillo mov" src=" https://i.imgur.com/vz5qSNV.png" alt="imagen"> 
            <h2 class="ms-5">Estamos Presentado</h1>
            <h1 class="ms-5">En Contacto</h2>
            <a href="https://www.ecuavisa.com/envivo" class="ms-5 btn btn-primary stretched-link ">VER EN VIVO</a>
          </div>`
      );
    }else if ('13:00' <= timeOfDay && timeOfDay <= '13:59'){
      console.log('outside ');
      $(".inner").append(`
          <div>
            <img class="imgcintillo desk" src="https://www.ecuavisa.com/ecuavisa/main/envivo/noti-1pm.jpg" alt="imagen">
            <img class="imgcintillo mov" src=" https://i.imgur.com/vz5qSNV.png" alt="imagen"> 
            <h2 class="ms-5">Estamos Presentado</h1>
            <h1 class="ms-5">Televistazo 13h00</h2>
            <a href="https://www.ecuavisa.com/envivo" class="ms-5 btn btn-primary stretched-link ">VER EN VIVO</a>
          </div>`
      );
    }else if ('14:00' <= timeOfDay && timeOfDay <= '16:00'){
      console.log('outside ');
      $(".inner").append(`
          <div>
            <img class="imgcintillo desk" src="https://i.imgur.com/RcqFJuy.png" alt="imagen">
            <img class="imgcintillo mov" src=" https://i.imgur.com/vz5qSNV.png" alt="imagen"> 
            <h2 class="ms-5">Estamos Presentado</h1>
            <h1 class="ms-5">El Poder del Amor</h2>
            <a href="https://www.ecuavisa.com/envivo" class="ms-5 btn btn-primary stretched-link ">VER EN VIVO</a>
          </div>`
      );
    }else if ('19:00' <= timeOfDay && timeOfDay <= '19:59'){
      console.log('outside ');
      $(".inner").append(`
          <div>
            <img class="imgcintillo desk" src="https://www.ecuavisa.com/ecuavisa/main/envivo/noticiero-7pm.jpg" alt="imagen">
            <img class="imgcintillo mov" src=" https://i.imgur.com/vz5qSNV.png" alt="imagen"> 
            <h2 class="ms-5">Estamos Presentado</h1>
            <h1 class="ms-5">Televistazo 19h00</h2>
            <a href="https://www.ecuavisa.com/envivo" class="ms-5 btn btn-primary stretched-link ">VER EN VIVO</a>
          </div>`
      );
    }else if ('20:00' <= timeOfDay && timeOfDay <= '23:30'){
      console.log('outside ');
      $(".inner").append(`
          <div>
            <img class="imgcintillo desk" src="https://www.ecuavisa.com/ecuavisa/main/envivo/novelas.jpg" alt="imagen">
            <img class="imgcintillo mov" src=" https://i.imgur.com/vz5qSNV.png" alt="imagen"> 
            <h2 class="ms-5">Estamos Presentado</h1>
            <h1 class="ms-5">Novelas</h2>
            <a href="https://www.ecuavisa.com/envivo" class="ms-5 btn btn-primary stretched-link ">VER EN VIVO</a>
          </div>`
      );
    }else{
      
    }
  } else if ((day === 6)) { //validacion de sabado
    console.log("es sabado");
        if ('19:00' <= timeOfDay && timeOfDay <= '19:30'){
          $(".inner").append(`
              <div>
                <img class="imgcintillo desk" src="https://www.ecuavisa.com/ecuavisa/main/envivo/noticiero-7pm.jpg" alt="imagen">
                <img class="imgcintillo mov" src=" https://i.imgur.com/vz5qSNV.png" alt="imagen"> 
                <h2 class="ms-5">Estamos Presentado</h1>
                <h1 class="ms-5">Televistazo 19h00</h2>
                <a href="https://www.ecuavisa.com/envivo" class="ms-5 btn btn-primary stretched-link ">VER EN VIVO</a>
              </div>`
          );
        } else if ('22:00' <= timeOfDay && timeOfDay <= '23:59'){
          console.log('outside ');
          $(".inner").append(`
              <div>
                <img class="imgcintillo desk" src="https://i.imgur.com/RcqFJuy.png" alt="imagen">
                <img class="imgcintillo mov" src=" https://i.imgur.com/vz5qSNV.png" alt="imagen"> 
                <h2 class="ms-5">Estamos Presentado</h1>
                <h1 class="ms-5">El Poder del Amor</h2>
                <a href="https://www.ecuavisa.com/envivo" class="ms-5 btn btn-primary stretched-link ">VER EN VIVO</a>
              </div>`
          );
        }else{
        }
  } else {
    console.log("es domingo"); //validacion de domingo
    if ('10:30' <= timeOfDay && timeOfDay <= '11:30'){
          $(".inner").append(`
              <div>
                <img class="imgcintillo desk" src="https://i.imgur.com/RcqFJuy.png" alt="imagen">
                <img class="imgcintillo mov" src=" https://i.imgur.com/vz5qSNV.png" alt="imagen"> 
                <h2 class="ms-5">Estamos Presentado</h1>
                <h1 class="ms-5">Políticamente Correcto</h2>
                <a href="https://www.ecuavisa.com/envivo" class="ms-5 btn btn-primary stretched-link ">VER EN VIVO</a>
              </div>`
          );
        } else if ('19:00' <= timeOfDay && timeOfDay <= '20:00'){
          $(".inner").append(`
              <div>
                <img class="imgcintillo desk" src="https://www.ecuavisa.com/ecuavisa/main/envivo/noticiero-7pm.jpg" alt="imagen">
                <img class="imgcintillo mov" src=" https://i.imgur.com/vz5qSNV.png" alt="imagen"> 
                <h2 class="ms-5">Estamos Presentado</h1>
                <h1 class="ms-5">Televistazo 19h00</h2>
                <a href="https://www.ecuavisa.com/envivo" class="ms-5 btn btn-primary stretched-link ">VER EN VIVO</a>
              </div>`
          );
        } else if ('22:00' <= timeOfDay && timeOfDay <= '23:59'){
          console.log('outside ');
          $(".inner").append(`
              <div>
                <img class="imgcintillo desk" src="https://i.imgur.com/RcqFJuy.png" alt="imagen">
                <img class="imgcintillo mov" src=" https://i.imgur.com/vz5qSNV.png" alt="imagen"> 
                <h2 class="ms-5">Estamos Presentado</h1>
                <h1 class="ms-5">El Poder del Amor</h2>
                <a href="https://www.ecuavisa.com/envivo" class="ms-5 btn btn-primary stretched-link ">VER EN VIVO</a>
              </div>`
          );
        }else{
        }
  }

});
