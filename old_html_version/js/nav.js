export function animated_nav() {
    let menu = document.querySelector(".menu");
    let navcnt = document.querySelector(".navigation_menu");
    let close = document.querySelector(".close");
    let overlay = document.querySelector("#overlay");

    menu.onclick = function () {
        navcnt.classList.add("active");
        overlay.classList.add("active");
    };

    close.onclick = function () {
        navcnt.classList.remove("active");
        overlay.classList.remove("active");
    };

    overlay.onclick = function () {
        navcnt.classList.remove("active");
        overlay.classList.remove("active");
    };
}