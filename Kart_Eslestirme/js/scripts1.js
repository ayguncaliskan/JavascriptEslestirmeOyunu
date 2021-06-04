
const desteCards = ["Card9.png", "Card9.png", "Card10.png", "Card10.png", "Card11.png", "Card11.png", "Card12.png", "Card12.png", "Card13.png", "Card13.png","Card14.png","Card14.png"];

const deste = document.querySelector(".deste");
let opened = [];
let matched = [];
const modal = document.getElementById("modal");
const modal2 = document.getElementById("modal2");

const sıfırla = document.querySelector(".sıfırla-btn");
const yenidenOyna = document.querySelector(".play-again-btn");
const yenidenOyna2 = document.querySelector(".play-again-btn2");
const hamleCount = document.querySelector(".hamle-sayac");
const scoreCount = document.querySelector(".skor-sayac");
let hamle = 0;
let score=  0;
const star = document.getElementById("star-rating").querySelectorAll(".star");
let starCount = 3;
const timeCounter = document.querySelector(".timer");
let time;
let saniye = 0;
let dakika = 0;
let timeStart = false;
var dogru = new Audio('sounds/tik.mp3');
var yanlis = new Audio('sounds/yanlis.mp3');
var tebrik = new Audio('sounds/alkis.mp3');
var uzgun = new Audio('sounds/huzun.mp3');
function shuffle(array) {
let currentIndex = array.length, temporaryValue, randomIndex;
while (currentIndex !== 0) {
randomIndex = Math.floor(Math.random() * currentIndex);
currentIndex -= 1;
temporaryValue = array[currentIndex];
array[currentIndex] = array[randomIndex];
array[randomIndex] = temporaryValue;
}
return array;
}
function OyunaBasla() {

const shuffleddeste = shuffle(desteCards); 

for (let i = 0; i < shuffleddeste.length; i++) {

const liTag = document.createElement('LI');

liTag.classList.add('card');

const addImage = document.createElement("IMG");

liTag.appendChild(addImage);

addImage.setAttribute("src", "img/" + shuffleddeste[i]);

addImage.setAttribute("alt", "image of vault boy from fallout");

deste.appendChild(liTag);
}
}
OyunaBasla();
function removeCard() {

while (deste.hasChildNodes()) {
deste.removeChild(deste.firstChild);
}
}
function timer() {

time = setInterval(function() {
saniye++;
if (saniye === 60) {
  dakika++;
  saniye = 0;
  if(dakika==3){
    sureBitti();
  }
}


timeCounter.innerHTML = "" + "Zaman: " + dakika + " Dakika " + saniye + " Saniye" ;
}, 1000);
}
function stopTime() {
clearInterval(time);
}
function sıfırlatop() {

stopTime();
timeStart = false;
saniye = 0;
dakika = 0;
timeCounter.innerHTML = "" + " Zaman: 00:00";

star[1].firstElementChild.classList.add("fa-star");
star[2].firstElementChild.classList.add("fa-star");
starCount = 3;

hamle = 0;
hamleCount.innerHTML = 0;
score = 0;
scoreCount.innerHTML = 0;

matched = [];
opened = [];

removeCard();

OyunaBasla();
}
function hamleSayac() {

hamleCount.innerHTML ++;

hamle ++;
}
function skorSayac() {

scoreCount.innerHTML =score+10;

score +=10;
}
function starRating() {
if (hamle === 14) {

star[2].firstElementChild.classList.remove("fa-star");
starCount--;
}
if (hamle === 16) {
star[1].firstElementChild.classList.remove("fa-star");
starCount--;
}
}
function Karsilastir() {

if (opened.length === 2) {

document.body.style.pointerEvents = "none";
}

if (opened.length === 2 && opened[0].src === opened[1].src) {

eslesme();
dogru.play();
opened[0].style.visibility="hidden";
opened[1].style.visibility="hidden";

} else if (opened.length === 2 && opened[0].src != opened[1].src) {

yanlis.play();
eslesmeyen();

}
}
function eslesme() {

setTimeout(function() {
opened[0].parentElement.classList.add("eslesme");
opened[1].parentElement.classList.add("eslesme");

matched.push(...opened);

document.body.style.pointerEvents = "auto";

oyunKazan();

opened = [];
}, 600);

skorSayac();
hamleSayac();
starRating();
}
function eslesmeyen() {

setTimeout(function() {

opened[0].parentElement.classList.remove("flip");
opened[1].parentElement.classList.remove("flip");

document.body.style.pointerEvents = "auto";

opened = [];
}, 700);

hamleSayac();
starRating();
}
function AddStats() {

const stats = document.querySelector(".modal-content");


for (let i = 1; i <= 4; i++) {

const statsElement = document.createElement("p");

statsElement.classList.add("stats");

stats.appendChild(statsElement);
}

let p = stats.querySelectorAll("p.stats");

p[0].innerHTML = "Tamamlama Süreniz: " + dakika + " Dakika " + saniye + " Saniye";
p[1].innerHTML = "Hamle Sayısı: " + hamle;
p[2].innerHTML = "Sizin yıldız sayınız 3 üzerinden: "+ starCount ;
p[3].innerHTML=  "Toplam skorunuz: "+ score;
}
function AddStats2() {

  const stats2 = document.querySelector(".modal2-content");
  
  
  for (let i = 1; i <= 4; i++) {
  
  const stats2Element = document.createElement("p");
  
  stats2Element.classList.add("stats2");
  
  stats2.appendChild(stats2Element);
  }
  
  let p2 = stats2.querySelectorAll("p.stats2");
  
  p2[0].innerHTML = "Tamamlama Süreniz: " + dakika + " Dakika " + saniye + " Saniye";
  p2[1].innerHTML = "Hamle Sayısı: " + hamle;
  p2[2].innerHTML = "Sizin yıldız sayınız 3 üzerinden: "+ starCount ;
  p2[3].innerHTML=  "Toplam skorunuz: "+ score;
  }
function displayModal() {

const modalClose = document.getElementsByClassName("close")[0];

modal.style.display= "block";

modalClose.onclick = function() {
modal.style.display = "none";
};

window.onclick = function(event) {
if (event.target == modal) {
modal.style.display = "none";
}
};
}
function displayModal2() {

  const modalClose2 = document.getElementsByClassName("close2")[0];
  
  modal2.style.display= "block";
  
  modalClose2.onclick = function() {
  modal2.style.display = "none";
  };
  
  window.onclick = function(event) {
  if (event.target == modal2) {
  modal2.style.display = "none";
  }
  };
  }
function sureBitti(){
stopTime();
AddStats2();
displayModal2();
uzgun.play();
}
function oyunKazan() {
if (matched.length === 12) {
stopTime();
AddStats();
displayModal();
tebrik.play();
}
}
deste.addEventListener("click", function(evt) {
if (evt.target.nodeName === "LI") {

console.log(evt.target.nodeName + " Was clicked");

if (timeStart === false) {
timeStart = true; 
timer();
}

kartDondur();
}

function kartDondur() {

evt.target.classList.add("flip");

addToOpened();
}


function addToOpened() {

if (opened.length === 0 || opened.length === 1) {

opened.push(evt.target.firstElementChild);
}

Karsilastir();
}
});
sıfırla.addEventListener('click', sıfırlatop);
yenidenOyna.addEventListener('click',function() {
modal.style.display = "none";
modal2.style.display = "none";
sıfırlatop();
});
yenidenOyna2.addEventListener('click',function() {
modal.style.display = "none";
modal2.style.display = "none";
sıfırlatop();
});