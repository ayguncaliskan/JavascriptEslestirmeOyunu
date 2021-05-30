const desteCards = ["Card16.png", "Card16.png", "Card17.png", "Card17.png", "Card18.png", "Card18.png", "Card19.png", "Card19.png", "Card20.png", "Card20.png","Card21.png","Card21.png","Card22.png","Card22.png","Card23.png","Card23.png","Card24.png","Card24.png","Card25.png","Card25.png"];

const deste = document.querySelector(".deste");
let opened = [];
let matched = [];
const modal = document.getElementById("modal");
const sıfırla = document.querySelector(".sıfırla-btn");
const yenidenOyna = document.querySelector(".play-again-btn");
const hamleCount = document.querySelector(".hamle-sayac");
const scoreCount = document.querySelector(".score-counter");
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
if (hamle === 18) {
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
function sureBitti(){
stopTime();
AddStats();
displayModal();

}
function oyunKazan() {
if (matched.length === 20) {
stopTime();
AddStats();
displayModal();
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
sıfırlatop();
});