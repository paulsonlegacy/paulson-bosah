// FUNCTIONS

function getCurrentDay() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const now = new Date();
    return daysOfWeek[now.getDay()];
}

function getCurrentDate() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; // Months are zero-indexed
    const year = now.getFullYear();
    return `${day} July ${year}`;
}

function hasChildWithClass(parentElement, className) {
    return parentElement.querySelector(`.${className}`) !== null;
}


// VARIABLES

let menu = document.querySelector(".menu__icon"),
    responsiveNavList = document.querySelector(".nav__list");


// EVENT LISTENERS

// Event Listener for menu toggling
menu.addEventListener("click", ()=>{
    if (hasChildWithClass(menu, 'fa-times')) {
        responsiveNavList.style.right = "-1000rem";
        menu.innerHTML = `<i class="fa fa-bars fa-2x"></i>`;
    } else if (hasChildWithClass(menu, 'fa-bars')) {
        responsiveNavList.style.right = "-50rem";
        menu.innerHTML = `<i class="fa fa-times fa-2x"></i>`;
    }
});

// Event Listener for clicking outside the menu to close it
document.getElementsByTagName("main")[0].addEventListener("click", (event) => {
    if (responsiveNavList.style.right === "-50rem" && !menu.contains(event.target)) {
        responsiveNavList.style.right = "-1000rem";
        menu.innerHTML = `<i class="fa fa-bars fa-2x"></i>`;
    }
});



document.querySelector('#today').textContent = getCurrentDay();
document.querySelector('#date').textContent = getCurrentDate();