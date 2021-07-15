var end = new Date("07/23/2021 00:00 AM");

var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var timer;

function showRemaining() {
  var now = new Date();
  var distance = end - now;
  if (distance < 0) {
    clearInterval(timer);
    document.getElementById("countdown").innerHTML = "EXPIRED!";

    return;
  }
  var days = Math.floor(distance / _day);
  var hours = Math.floor((distance % _day) / _hour);
  var minutes = Math.floor((distance % _hour) / _minute);
  var seconds = Math.floor((distance % _minute) / _second);

  document.getElementById("countdown").innerHTML = `
    <div class=" me-2"> 
      <div class="numero float-start"> ${days} </div> 
      <span class="text-warning puntos">:</span>
      <div class="letra"> Días</div> 
    </div> 
    `;

  document.getElementById("countdown").innerHTML += `
    <div class=" me-2"> 
      <div class="numero float-start"> ${hours} </div>  
      <span class="text-warning puntos">:</span>
      <div class="letra"> Horas</div> 
    </div> 
    `;

  document.getElementById("countdown").innerHTML += `
    <div class=" me-2"> 
      <div class="numero float-start"> ${minutes} </div> 
      <span class="text-warning puntos">:</span> 
      <div class="letra"> Minútos</div> 
    </div> 
    `;

  document.getElementById("countdown").innerHTML += `
    <div class="me-2"> 
      <div class="numero"> ${seconds} </div>  
      <div class="letra"> Segundos</div> 
    </div> 
    `;
}

timer = setInterval(showRemaining, 1000);