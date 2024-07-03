// FUNCTIONS

// Function to fetch current day
function getCurrentDay() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const now = new Date();
    return daysOfWeek[now.getDay()];
}

// Function to get current time in UTC
function getCurrentTimeUTC() {
    const now = new Date();
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds} UTC`;
}

// Function to check availability of an element of given class name
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
        responsiveNavList.style.right = "-100rem";
        menu.innerHTML = `<i class="fa fa-bars fa-2x"></i>`;
    } else if (hasChildWithClass(menu, 'fa-bars')) {
        responsiveNavList.style.right = "2rem";
        menu.innerHTML = `<i class="fa fa-times fa-2x"></i>`;
    }
});

// Event Listener for clicking outside the menu to close it
document.getElementsByTagName("main")[0].addEventListener("click", (event) => {
    if (hasChildWithClass(menu, 'fa-times')) {
        responsiveNavList.style.right = "-100rem";
        menu.innerHTML = `<i class="fa fa-bars fa-2x"></i>`;
    }
});


// CODE

document.querySelector('#today').textContent = getCurrentDay();
document.querySelector('#time__utc').textContent = getCurrentTimeUTC();