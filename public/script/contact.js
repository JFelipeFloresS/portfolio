let me = document.getElementById("me");

let moveImageUp = [
    {transform:  "translateY(50px)"},
    {transform:  "translateY(0px)"}
];

let moveImageDown = [
    {transform:  "translateY(0px)"},
    {transform:  "translateY(50px)"}
];

let movingTime = {
    duration: 150,
    iterations: 1
};

document.getElementById("contact-me").onmouseover = function(e) {
    if(window.getComputedStyle(me).transform !== 'none') return;

    me.style.top = "50px";
    me.animate(
        moveImageUp,
        movingTime
        );
    me.style.top = "0px";
};

document.getElementById("contact-me").onmouseout = function(e) {
    me.animate(
        moveImageDown,
        movingTime
        );
    setTimeout(() => {me.style.top = "50px";}, "100");
};