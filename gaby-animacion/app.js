var showButton = {
  opacity: "1",
  visibility: "visible",
};
var hideButton = {
  opacity: "0",
  visibility: "hidden",
};
var opacityButton = {
  opacity: "0.24",
  cursor: "default",
  "pointer-events": "none",
};
var noOpacityButton = {
  opacity: "initial",
  cursor: "pointer",
  "pointer-events": "auto",
};
//ACCION - BOTON IZQUIERDA
$(".cv-b_a").click(function () {
  setTimeout(function () {
    $(".cv-f_b").fadeOut();
    $(".cv-f_b").css("width", "0%");
    $(".cv-f_a").css("width", "100%");
    $(".cv-v .cv-v_a").removeClass("ocultar");
  }, 100);
  setTimeout(function () {
    $(".cv-f_a").css("display", "none");
    $(".cv-b_x.izq").css(showButton);
    $(".cv-b_b").css(opacityButton);
    $(".cv-b_a").css(opacityButton);
  }, 500);
});


//ACCION - CLICK IZQUIERDA - SHOW BUTTON CENTER
$(".cv-b_x.izq").click(function () {
  setTimeout(function () {
    $(".cv-f_a").show();
  }, 100);
  setTimeout(function () {
    $(".cv-f_b").css("width", "50%");
  }, 120);
  setTimeout(function () {
    $(".cv-f_b").css("display", "block");
    $(".cv-f_a").css("width", "50%");
    $(".comparador-videos .cv-v").css("position", "absolute");
    $(".cv-b_x.izq").css(hideButton);
    $(".cv-b_b").css(noOpacityButton);
    $(".cv-b_a").css(noOpacityButton);
    $(".cv-v .cv-v_a").addClass("ocultar");
  }, 100);
});

//ACCION - BOTON DERECHA
$(".cv-b_b").click(function () {
  setTimeout(function () {
    $(".cv-f_a").fadeOut();
    $(".cv-f_a").css("width", "0%");
    $(".cv-f_b").css("width", "100%");
    $(".cv-v .cv-v_b").removeClass("ocultar");
  }, 100);
  setTimeout(function () {
    $(".cv-f_b").css("display", "none");
    $(".cv-b_x.der").css(showButton);
    $(".cv-b_b").css(opacityButton);
    $(".cv-b_a").css(opacityButton);
  }, 500);
});


//ACCION - CLICK DERECHA - SHOW BUTTON CENTER
$(".cv-b_x.der").click(function () {
  setTimeout(function () {
    $(".cv-f_a").show();
  }, 200);
  setTimeout(function () {
    $(".cv-f_b").css("width", "50%");
  }, 300);
  setTimeout(function () {
    $(".cv-f_b").css("display", "block");
    $(".cv-f_a").css("width", "50%");
    $(".comparador-videos .cv-v").css("position", "absolute");
    $(".cv-b_x.der").css(hideButton);
    $(".cv-b_b").css(noOpacityButton);
    $(".cv-b_a").css(noOpacityButton);
    $(".cv-v .cv-v_b").addClass("ocultar");
  }, 100);
});



document.getElementById("btnBajar").addEventListener("click", function (e) {
  e.preventDefault();
  let offset = 53;
  let newTop = window.innerHeight - offset;
  scroll({
    top: newTop,
    behavior: "smooth",
  });
});
