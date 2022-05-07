console.log(document.title);

let meta = document.querySelector('meta[data-voc-name="topic"]').content;

let deleteFirst = meta.slice(1);
let mayusFirst = meta.charAt(0).toUpperCase();
let topic = `${mayusFirst}${deleteFirst}`;
console.log(topic);

//CAMBIAR EL TITLE
// $(document).attr("title", `${topic}. Noticias sobre ${topic} | Ecuavisa`);
// $('meta[name=description]').remove();
// $('head').append( '<meta name="description" content="this is new">' );

document.title = `${topic}. Noticias sobre ${topic} | Ecuavisa`;

//CAMBIAR EL META DESCRIPTION
document.getElementsByTagName('meta')["description"].content = `Todas las noticias sobre ${topic} hoy. La información sobre las últimas noticias de ${topic} ahora y otros temas relacionados en Ecuavisa."`;



let fakeAd = document.createElement("div");
fakeAd.className =
    "textads banner-ads banner_ads ad-unit ad-zone ad-space adsbox"

fakeAd.style.height = "1px"

document.body.appendChild(fakeAd)

let x_width = fakeAd.offsetHeight;
let msg = document.getElementById("msg")


if (x_width) {
    // console.log("No AdBlocker Detected")
    alert("No AdBlocker Detected")
} else {
    // console.log("AdBlocker detected")
    alert("AdBlocker detected")
}