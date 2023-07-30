const arrPrew = document.querySelector('.slider__prew')
const arrNext = document.querySelector('.slider__next')
const stage = document.querySelector('.slider__stage-line')
const items = document.querySelectorAll('.slider__stage-item')

const nav = document.querySelector('.slider__nav-line')
const navCurrent = document.querySelector('.slider__nav-border')

for (let i = 0; i < items.length; i++) {
    const img = document.createElement('img')
    img.src = items[i].src
    img.classList.add('slider__nav-item')
    nav.appendChild(img)
}

arrNext.addEventListener('click', nextSlide)
arrPrew.addEventListener('click', prewSlide)

let offsetStage = 0
let offsetBorder = 0
let offsetNav = 0

function nextSlide() {
    offsetStage -= nav.offsetWidth
    if (offsetStage < -nav.offsetWidth * (items.length-1)) {
        offsetStage = 0
    }
    stage.style.transform = `translateX(${offsetStage}px)`
    
    if (offsetBorder >= 3 * 120 && 
        (items.length) * 120 > nav.offsetWidth && 
        ((items.length) * 120 + offsetNav) > nav.offsetWidth) {
        offsetNav -= 120
        nav.style.transform = `translateX(${offsetNav}px)`
    } else {
        offsetBorder += 120
    }

    
    if ((items.length) * 120 + offsetNav - nav.offsetWidth === 60) {
        offsetNav -= 60
        offsetBorder -= 60
        nav.style.transform = `translateX(${offsetNav}px)`
    }
    
    if (offsetStage === 0) {
        offsetBorder = 0
        offsetNav = 0
        nav.style.transform = `translateX(${offsetNav}px)`
    }
    navCurrent.style.left = `${offsetBorder}px`
}

function prewSlide() {
    offsetStage += nav.offsetWidth
    if (offsetStage > 0) {
        offsetStage = -nav.offsetWidth * (items.length-1)
    }
    stage.style.transform = `translateX(${offsetStage}px)`

    // сдвиг nav в зависимости от положения border
    // и сдвиг самого бордера
    if (offsetBorder <= 3.5 * 120 && 
        (items.length) * 120 > nav.offsetWidth && 
        offsetNav != 0 &&
        ((items.length) * 120 - offsetNav +60) !== ((items.length) * 120)) {
        offsetNav += 120
        nav.style.transform = `translateX(${offsetNav}px)`
    } else {
        offsetBorder -= 120
    }

    if (offsetNav=== 60) {
        offsetNav -= 60
        offsetBorder -= 60
        nav.style.transform = `translateX(${offsetNav}px)`
    }
    

    if (offsetStage === -nav.offsetWidth * (items.length-1)) {
        offsetBorder = nav.offsetWidth - 120
        offsetNav = nav.offsetWidth - (items.length) * 120
        nav.style.transform = `translateX(${offsetNav}px)`
    }
    navCurrent.style.left = `${offsetBorder}px`
}

