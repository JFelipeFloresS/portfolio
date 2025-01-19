let pos = {}

let fadeIn = [
    {opacity: 0, easing: "ease-in"},
    {opacity: 0.25, easing: "ease-in"},
    {opacity: 0.5, easing: "ease-in"},
    {opacity: 0.75, easing: "ease-in"},
    {opacity: 1, easing: "ease-in"},
]

let fadeOut = [
    {opacity: 1, easing: "ease-out"},
    {opacity: 0.75, easing: "ease-out"},
    {opacity: 0.5, easing: "ease-out"},
    {opacity: 0.25, easing: "ease-out"},
    {opacity: 0, easing: "ease-out"},
]

let fadeTime = {
    duration: 500,
    iterations: 1
}

function setPos(items) {
    for (let i = 0; i < items.length; i++) {
        const el = items[i];
        el.style.opacity = 0;
        pos[i] = {
            'el': el,
            'top': el.getBoundingClientRect().top,
            'bottom': el.getBoundingClientRect().bottom,
            'visibility': 'hidden'
        }
    }
}

window.onload = () => {
    items = document.getElementsByClassName("timeline_item");
    setPos(items);
    // setup();
}

window.onscroll = (e) => {
    let isScrollDown = this.oldScroll < this.scrollY;
    this.oldScroll = this.scrollY;

    if(isScrollDown) {
        for (let i = 0; i < items.length; i++) {
            const el = pos[i];
            try {
                if (el.visibility !== "visible" && this.scrollY >= el.top - parseInt(screen.height * 0.6)) {
                    el.visibility = "visible";
                    el.el.style.opacity = 0;
                    el.el.animate(fadeIn, fadeTime);
                    el.el.style.opacity = 1;
                }
            } catch (error) {
                items = document.getElementsByClassName("timeline_item");
                setPos(items);
            }
        }
    } else {
        for (let i = 0; i < items.length; i++) {
            const el = pos[i];
            try {
                if (el.visibility === "visible" && this.scrollY < el.top - parseInt(screen.height * 0.6)) {
                    el.visibility = "hidden";
                    el.el.animate(fadeOut, fadeTime);
                    el.el.style.opacity = 0;
                }
            } catch (error) {
                items = document.getElementsByClassName("timeline_item");
                setPos(items);
            }
        }
    }
};