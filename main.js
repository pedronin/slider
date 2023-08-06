const arrPrev = document.querySelector('.slider__prev');
const arrNext = document.querySelector('.slider__next');
const stage = document.querySelector('.slider__stage-line');
const items = document.querySelectorAll('.slider__stage-item');

const nav = document.querySelector('.slider__nav-line');
const navCurrent = document.querySelector('.slider__nav-border');

for (let i = 0; i < items.length; i++) {
  const img = document.createElement('img');
  img.src = items[i].src;
  img.classList.add('slider__nav-item');
  nav.appendChild(img);
}
console.log(items);
const navWidth = nav.offsetWidth;
const navItemWidth = navWidth / 6.5;

arrNext.addEventListener('click', nextSlide);
arrPrev.addEventListener('click', prevSlide);

let offsetStage = 0;
let offsetBorder = 0;
let offsetNav = 0;

function nextSlide() {
  offsetStage -= navWidth;
  if (offsetStage < -navWidth * (items.length - 1)) {
    offsetStage = 0;
  }
  stage.style.transform = `translateX(${offsetStage}px)`;

  if (
    offsetBorder >= 3 * navItemWidth &&
    items.length * navItemWidth > navWidth &&
    items.length * navItemWidth + offsetNav > navWidth
  ) {
    offsetNav -= navItemWidth;
    nav.style.transform = `translateX(${offsetNav}px)`;
  } else {
    offsetBorder += navItemWidth;
  }

  if (items.length * navItemWidth + offsetNav - navWidth === (navItemWidth/2)) {
    offsetNav -= (navItemWidth/2);
    offsetBorder -= (navItemWidth/2);
    nav.style.transform = `translateX(${offsetNav}px)`;
  }

  if (offsetStage === 0) {
    offsetBorder = 0;
    offsetNav = 0;
    nav.style.transform = `translateX(${offsetNav}px)`;
  }
  navCurrent.style.left = `${offsetBorder}px`;
}

function prevSlide() {
  offsetStage += navWidth;
  if (offsetStage > 0) {
    offsetStage = -navWidth * (items.length - 1);
  }
  stage.style.transform = `translateX(${offsetStage}px)`;

  // сдвиг nav в зависимости от положения border
  // и сдвиг самого бордера
  if (
    offsetBorder <= 3.5 * navItemWidth &&
    items.length * navItemWidth > navWidth &&
    offsetNav != 0 &&
    items.length * navItemWidth - offsetNav + (navItemWidth/2) !== items.length * navItemWidth
  ) {
    offsetNav += navItemWidth;
    nav.style.transform = `translateX(${offsetNav}px)`;
  } else {
    offsetBorder -= navItemWidth;
  }

  if (offsetNav === (navItemWidth/2)) {
    offsetNav -= (navItemWidth/2);
    offsetBorder -= (navItemWidth/2);
    nav.style.transform = `translateX(${offsetNav}px)`;
  }

  if (offsetStage === -navWidth * (items.length - 1)) {
    offsetBorder = navWidth - navItemWidth;
    offsetNav = navWidth - items.length * navItemWidth;
    nav.style.transform = `translateX(${offsetNav}px)`;
  }
  navCurrent.style.left = `${offsetBorder}px`;
}
