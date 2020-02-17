var documentDim = require('lib/windowSize');
var classes = require('lib/classes');

var body = document.body;
var menu = document.querySelector('#pageMenu');
var menuInner = menu.querySelector('.menu_inner');
var headerElem = document.querySelector('.menu__header');
var menuFooter = 100;
var menuHalves = document.getElementsByClassName('menu__half');
var menuRight = document.querySelector('.menu__right');
var menuLeft = document.querySelector('.menu__left')
var menuButton = document.querySelector('.menu-holder');
var closeButton = document.querySelector('.close');
var menuCards = document.getElementsByClassName('card');
var menuLeftClone = menuLeft.cloneNode(true);
var hamburger = document.querySelector('.hamburger');
var menuLabel = document.querySelector('.menu-label');
var closeLabel = document.querySelector('.menu-label__close');

var tradeMark = document.querySelector('.trade-mark');
var tradeWings = document.getElementsByClassName('trade-mark__wing');


var calcMenuHeights = function() {
  if (documentDim.height() > 640) {
    for(var i = 0; i < menuHalves.length; i++){
      menuHalves[i].style.height = ((documentDim.height() - (headerElem.offsetHeight + menuFooter + menuHalves[i].style.marginBottom))/2) + 'px';
    }
  //18 is the $vr height defined in spacing.scss
    //menuRight.style.height = ((menuHalves[0].offsetHeight * 2) + 18) + 'px';
    menuLeft.style.height = ((menuHalves[0].offsetHeight * 2) + 18) + 'px';
    menu.classList.remove('menu-is-scrollable');
  } else {
    for(var i = 0; i < menuHalves.length; i++){
      menuHalves[i].style.height =  '340px';
    }
    menuLeft.style.height = (340*2) + 'px';
    menu.classList.add('menu-is-scrollable');
  }
}

function tradeMarkWingWidth() {
  for (var i = 0; i < tradeWings.length; i++) {
    tradeWings[i].style.width = ((tradeMark.offsetWidth - document.querySelector('#tradeMarkLogo').offsetWidth )/ 2) + 'px';
    //document.querySelector('#widths').innerHTML = tradeMark.offsetwidth;
  }
}

function responsiveMenuRemove() {
  if(menuHalves[0].children.length <= 1){
    var cloneFirst = menuCards[0].cloneNode(true);
    cloneFirst.classList.add('card__half');
    menuCards[1].classList.add('card__half');
    menuHalves[0].insertBefore(cloneFirst, menuHalves[0].childNodes[0]);
  }
}

function reponsiveMenuAdd() {
  if(menuHalves[0].children.length > 1){
    //menuCards[0].classList.remove('card__half');
    //menuCards[1].classList.remove('card__half');
    menuHalves[0].children[1].classList.remove('card__half');
    menuHalves[0].removeChild(menuHalves[0].children[0]);
  }
}

function responsiveMenu() {
  if(documentDim.width()<=730) {
    if(menuHalves[0].children.length <= 1){
      var cloneFirst = menuCards[0].cloneNode(true);
      cloneFirst.classList.add('card__half');
      menuCards[1].classList.add('card__half');
      menuHalves[0].insertBefore(cloneFirst, menuHalves[0].childNodes[0]);
    }
  } else {
    if(menuHalves[0].children.length > 1){
      //menuCards[0].classList.remove('card__half');
      //menuCards[1].classList.remove('card__half');
      menuHalves[0].children[1].classList.remove('card__half');
      menuHalves[0].removeChild(menuHalves[0].children[0]);
    }
  }
}

calcMenuHeights();
tradeMarkWingWidth();
responsiveMenu();


//menu.classList.add('menu-open');
//body.classList.add('is-not-scrollable');

window.addEventListener('resize', function() {
  /*if(documentDim.width()<=730) {
    responsiveMenuRemove();
  } else {
    reponsiveMenuAdd();
  }*/

  calcMenuHeights();
  tradeMarkWingWidth();
  responsiveMenu()

});


//keeps the overlay up
function goAway() {
  window.theTime = setInterval(function(){
    menu.classList.remove('menu-overlay');
  }, 100);
}

for(var i = 0; i < menuCards.length; i++) {
  if (menuCards[i].classList.contains('card-inactive')) {
    menuCards[i].addEventListener('mouseenter', function(e){
        clearInterval(window.theTime);
//        menu.classList.add('menu-overlay');
    }, false);
  } else {
    menuCards[i].addEventListener('mouseenter', function(e){
        clearInterval(window.theTime);
        menu.classList.add('menu-overlay');
    }, false);
  }
  menuCards[i].addEventListener('mouseout', function(e){
   goAway();
  }, false);
}


menuButton.addEventListener('click', function(){
  menu.classList.toggle('menu-open');
  window.scrollTo(0, 0);
  body.classList.toggle('is-not-scrollable');
});

menuLabel.addEventListener('click', function() {
  menu.classList.toggle('menu-open');
  hamburger.classList.toggle('close');
  window.scrollTo(0, 0);
  body.classList.toggle('is-not-scrollable');
});

closeLabel.addEventListener('click', function() {
  menu.classList.toggle('menu-open');
  hamburger.classList.toggle('close');
  window.scrollTo(0, 0);
  body.classList.toggle('is-not-scrollable');
});

hamburger.addEventListener('click', function() {
  menu.classList.toggle('menu-open');
  hamburger.classList.toggle('close');
  window.scrollTo(0, 0);
  body.classList.toggle('is-not-scrollable');
});

closeButton.addEventListener('click', function(){

  menu.classList.toggle('menu-open');
  body.classList.toggle('is-not-scrollable');
});


// Adds class to pages so menu animation can be different
var productPage = document.querySelector('.product-masthead');
var homepage = document.querySelector('.homepage-masthead');

if (productPage) {
  body.classList.add('product-page');
} else if (homepage) {
  body.classList.add('homepage');
}
