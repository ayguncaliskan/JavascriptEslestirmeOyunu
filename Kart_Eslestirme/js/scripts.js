
const desteCards = ["Card1.png", "Card1.png", "Card2.png", "Card2.png", "Card3.png", "Card3.png", "Card4.png", "Card4.png", "Card5.png", "Card5.png","Card6.png","Card6.png","Card7.png","Card7.png","Card8.png","Card8.png"];

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
//Karıştırma işlevi, her sayfa yenilemede kartı karıştırmak için kullanılır.
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
// Karıştırma işlevini çağır ve değişkende sakla
const shuffleddeste = shuffle(desteCards); 
// Kart destesi dizisini yinele
for (let i = 0; i < shuffleddeste.length; i++) {
// <li> etiketlerini oluştur
const liTag = document.createElement('LI');
// <li> sınıfına kart ekle
liTag.classList.add('card');
// <img> etiketlerini oluştur
const addImage = document.createElement("IMG");
// <img>'yi <li>'ye ekle
liTag.appendChild(addImage);
 // Shuffledeste ile img src yolunu ayarlayın
addImage.setAttribute("src", "img/" + shuffleddeste[i]);
 // Resme bir alt etiketi ekleyin
addImage.setAttribute("alt", "kart eşleştirme");
 // Yeni <li>'yi <ul> destesine güncelle
deste.appendChild(liTag);
}
}
OyunaBasla();
//Deste etiketlerinden ve etiketlerinden tüm alt düğümleri kaldırır
function removeCard() {

while (deste.hasChildNodes()) {
deste.removeChild(deste.firstChild);
}
}
function timer() {
 // Sayıyı her 1 saniyede bir güncelle
time = setInterval(function() {
saniye++;
if (saniye === 60) {
  dakika++;
  saniye = 0;
  if(dakika==3){
    sureBitti();
  }
}

// Kullanıcının oyunu oynaması için geçen süre ile HTML'deki zamanlayıcıyı güncelle
timeCounter.innerHTML = "" + "Zaman: " + dakika + " Dakika " + saniye + " Saniye" ;
}, 1000);
}
function stopTime() {
clearInterval(time);
}
function sıfırlatop() {
// Zamanı durdur, dakikaları ve saniyeleri sıfırla,  HTML'yi güncelle
hamleCount.innerHTML = 0;
scoreCount.innerHTML=0;
removeCard();
OyunaBasla();
stopTime();
timeStart = false;
saniye = 0;
dakika = 0;
timeCounter.innerHTML = "" + " Zaman: 00:00";
// Yıldız sayısını sıfırla ve tekrar yıldızları göstermek için sınıfı geri ekle
star[1].firstElementChild.classList.add("fa-star");
star[2].firstElementChild.classList.add("fa-star");
starCount = 3;
// Hamle sayısını sıfırla ve HTMLi sıfırla
hamle = 0;
hamleCount.innerHTML = 0;
// Skor puanını sıfırla ve HTMLi sıfırla
score = 0;
scoreCount.innerHTML = 0;

matched = [];
opened = [];

removeCard();

OyunaBasla();
}

function hamleSayac() {
// Hamle sayacı için html'yi güncelle
hamleCount.innerHTML ++;
// Kontrol edilen her çift için hamle sayısını artırı
hamle ++;
}
function skorSayac() {
// Skor sayacı için html'yi güncelle
scoreCount.innerHTML =score+10;
// Kontrol edilen her çift için skor sayısını artırır
score +=10;
}
//Hamle sayılarını kontrol edip yıldız sayısını düşürür
function starRating() {
if (hamle === 16) {

star[2].firstElementChild.classList.remove("fa-star");
starCount--;
}
if (hamle === 18) {
star[1].firstElementChild.classList.remove("fa-star");
starCount--;
}
}
//İki kartın uyuşup uyuşmadığını görmek için karşılaştırır
function Karsilastir() {

if (opened.length === 2) {
 // Diğer kartlarda daha fazla fare tıklamasını devre dışı bırakır
document.body.style.pointerEvents = "none";
}
// 2 kartta açıldıysa ve 1.kart ve 2. kart birbirine eşitse eslesme sınıfını çağır dogru sesini çal kartları gizle
if (opened.length === 2 && opened[0].src === opened[1].src) {

eslesme();
dogru.play();
opened[0].style.visibility="hidden";
opened[1].style.visibility="hidden";

}
//2 kartta açıldıysa ve 1.kart ve 2. kart birbirine eşit değil ise eslesmeyen sınıfını çağır ve yanlış sesini çal
 else if (opened.length === 2 && opened[0].src != opened[1].src) {

yanlis.play();
eslesmeyen();

}
}
function eslesme() {
/* Açılan dizideki iki karta erişir ve ekler
  görüntülerin ebeveyniyle eşleşme sınıfı: <li> etiketi
  */
setTimeout(function() {
opened[0].parentElement.classList.add("eslesme");
opened[1].parentElement.classList.add("eslesme");
// Eşleşen kartları eşleşen diziye itin
matched.push(...opened);

document.body.style.pointerEvents = "auto";
// Oyunun  kazanılıp kazanılmadığını kontrol edin
oyunKazan();
// Açılan diziyi temizle
opened = [];
}, 600);

skorSayac();
hamleSayac();
starRating();
}
function eslesmeyen() {
/* 700 milisaniye sonra açık olan iki kart
  <li> resimlerin üst öğesinden flip sınıfı kaldırıldı */
setTimeout(function() {
// Resimler üzerindeki flip sınfını kaldır
opened[0].parentElement.classList.remove("flip");
opened[1].parentElement.classList.remove("flip");
// Kartlar üzerinde daha fazla fare tıklamasına izin verir
document.body.style.pointerEvents = "auto";
// Açılan diziden kartları çıkarın
opened = [];
}, 700);
 // hamlesayacı birer birer artırmak için çağırır
hamleSayac();
starRating();
}
function AddStats() {
// modal-contente erişin
const stats = document.querySelector(".modal-content");

// Dört farklı paragraf oluştur
for (let i = 1; i <= 4; i++) {
 // Yeni bir Paragraf oluştur
const statsElement = document.createElement("p");
// Yeni Paragrafa bir sınıf ekle
statsElement.classList.add("stats");
// Yeni oluşturulan <p> etiketini model2-content ekleyin
stats.appendChild(statsElement);
}
 // stats sınıfına sahip tüm p etiketlerini seçin ve içeriği güncelleyin
let p = stats.querySelectorAll("p.stats");
// Yeni <p>'yi stats2 içeriğine sahip olacak şekilde ayarlayın (zaman, hamle,yıldız derecelendirmesi,ve skor)
p[0].innerHTML = "Tamamlama Süreniz: " + dakika + " Dakika " + saniye + " Saniye";
p[1].innerHTML = "Hamle Sayısı: " + hamle;
p[2].innerHTML = "Sizin yıldız sayınız 3 üzerinden: "+ starCount ;
p[3].innerHTML=  "Toplam skorunuz: "+ score;
}
function AddStats2() {
  // modal2-contente erişin
  const stats2 = document.querySelector(".modal2-content");
  
  // Dört farklı paragraf oluştur
  for (let i = 1; i <= 4; i++) {
  // Yeni bir Paragraf oluştur
  const stats2Element = document.createElement("p");
  // Yeni Paragrafa bir sınıf ekle
  stats2Element.classList.add("stats2");
   // Yeni oluşturulan <p> etiketini model2-content ekleyin
  stats2.appendChild(stats2Element);
  }
  // stats2 sınıfına sahip tüm p etiketlerini seçin ve içeriği güncelleyin
  let p2 = stats2.querySelectorAll("p.stats2");
  // Yeni <p>'yi stats2 içeriğine sahip olacak şekilde ayarlayın (zaman, hamle,yıldız derecelendirmesi,ve skor)
  p2[0].innerHTML = "Tamamlama Süreniz: " + dakika + " Dakika " + saniye + " Saniye";
  p2[1].innerHTML = "Hamle Sayısı: " + hamle;
  p2[2].innerHTML = "Sizin yıldız sayınız 3 üzerinden: "+ starCount ;
  p2[3].innerHTML=  "Toplam skorunuz: "+ score;
  }
function displayModal() {
// Modalı kapatan modal <span> öğesine (x) erişir
const modalClose = document.getElementsByClassName("close")[0];
// Oyun kazanıldğında, modu göstermek için bloğu gösterecek şekilde ayarlar
modal.style.display= "block";
// Kullanıcı <span> (x) üzerine tıkladığında, kipi kapatın
modalClose.onclick = function() {
modal.style.display = "none";
};
// Kullanıcı ekranın dışında herhangi bir yere tıkladığında, onu kapatır
window.onclick = function(event) {
if (event.target == modal) {
modal.style.display = "none";
}
};
}
function displayModal2() {
 // Modalı kapatan modal <span> öğesine (x) erişir
  const modalClose2 = document.getElementsByClassName("close2")[0];
  // Oyun kaybedildğinde, modu göstermek için bloğu gösterecek şekilde ayarlar
  modal2.style.display= "block";
   // Kullanıcı <span> (x) üzerine tıkladığında, kipi kapatın
  modalClose2.onclick = function() {
  modal2.style.display = "none";
  };
  // Kullanıcı ekranın dışında herhangi bir yere tıkladığında, onu kapatır
  window.onclick = function(event) {
  if (event.target == modal2) {
  modal2.style.display = "none";
  }
  };
  }
// Süre bittiyse zamanı durdur istatistikleri ekle göster üzgün sesi çal
function sureBitti(){
stopTime();
AddStats2();
displayModal2();
uzgun.play();
}
// Eşleşme tamamsa zamanı durdur istatistikleri ekle göster tebrik sesini çal
function oyunKazan() {
if (matched.length === 16) {
stopTime();
AddStats();
displayModal();
tebrik.play();
}
}
deste.addEventListener("click", function(evt) {
if (evt.target.nodeName === "LI") {

console.log(evt.target.nodeName + " Was clicked");
 // Bir kartın ilk tıklamasından sonra zamanlayıcıyı başlat
// timer() fonksiyonunu çalıştırır
if (timeStart === false) {
timeStart = true; 
timer();
}

kartDondur();
}
 //Kartı çevir ve kartları göster 
function kartDondur() {
// <li> tıklandığında resmi göstermek için .flip sınıfını ekler
evt.target.classList.add("flip");

addToOpened();
}

//Çevrilen kartları açılan boş diziye ekleyin
function addToOpened() {
/* Açılan dizide sıfır veya başka bir img varsa, diğerini itin 
    diziye img koyun, böylece bu ikisini eşleştirilecek şekilde karşılaştırabiliriz
    */
if (opened.length === 0 || opened.length === 1) {
// Bu resimi açılan diziye ekler
opened.push(evt.target.firstElementChild);
}

Karsilastir();
}
});
//Tüm değerleri sıfırlar
sıfırla.addEventListener('click', sıfırlatop);
//Oyun kazanıldığında çıkan yeniden oynama butonu
yenidenOyna.addEventListener('click',function() {
modal.style.display = "none";
modal2.style.display = "none";
sıfırlatop();
});
////Oyun Kaybedildiğinde çıkan yeniden oynama butonu
yenidenOyna2.addEventListener('click',function() {
modal.style.display = "none";
modal2.style.display = "none";
sıfırlatop();
});