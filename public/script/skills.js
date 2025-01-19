let dds = [].slice.call(document.getElementById("skills-and-abilities").getElementsByTagName("dd"), 0);
let dts = [].slice.call(document.getElementById("skills-and-abilities").getElementsByTagName("dt"), 0);
let skills = dds.concat(dts);

let wobble = [
    {transform: "rotate(-2deg) translateY(-2px) translateX(-2px)"},
    {transform: "rotate(0deg) translateY(-2px) translateX(0px)"},
    {transform: "rotate(2deg) translateY(-2px) translateX(2px)"},
    {transform: "rotate(2deg) translateY(0px) translateX(2px)"},
    {transform: "rotate(0deg) translateY(2px) translateX(2px)"},
    {transform: "rotate(-2deg) translateY(2px) translateX(0px)"},
    {transform: "rotate(-2deg) translateY(2px) translateX(-2px)"},
    {transform: "rotate(0deg) translateY(2px) translateX(-2px)"},
    {transform: "rotate(0deg) translateY(0px) translateX(-2px)"},
    {transform: "rotate(0deg) translateY(0px) translateX(0px)"},
];

let wobbleTime = {
    duration: 1000,
    iterations: 1
}

function moveIt(el) {
    if(window.getComputedStyle(el).transform === 'none') {
        el.animate(wobble, wobbleTime);
    }
}

skills.forEach(el => {
    el.onmouseenter = function(e) {
        moveIt(el);
    }
});