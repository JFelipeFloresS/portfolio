let logo = document.getElementById("mainlogo");
let footerLogos = [].slice.call(document.getElementById("socials").getElementsByTagName("img"), 0);
let isStop = true;

let rotateClockwise = [
    {transform: "rotate(0deg)"},
    {transform: "rotate(-5deg)"},
    {transform: "rotate(0deg)"},
    {transform: "rotate(5deg)"},
    {transform: "rotate(0deg)"}
];

let rotationTime = {
    duration: 1000,
    iterations: 1
};

function rotate() {
    logo.animate(rotateClockwise, rotationTime);
    if(!isStop) setTimeout(rotate, 1000);
}

logo.onmouseover = function(e) {
    if(window.getComputedStyle(logo).transform !== 'none') return;

    isStop = false;
    rotate();
};

logo.onmouseout = function(e) {
    isStop = true;
}

footerLogos.forEach(el => {
    el.onmouseenter = function(e) {
        el.style.width = '60px';
    }
    el.onmouseleave = function(e) {
        el.style.width = '50px';
    }
});