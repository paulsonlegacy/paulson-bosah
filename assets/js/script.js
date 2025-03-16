// VARIABLES

const menu = document.querySelector(".menu__icon"),
    responsiveNavList = document.querySelector(".nav__list"),
    portfolioImages = document.querySelectorAll('.portfolio__item img'),
    certImages = document.querySelectorAll('.cert__card img')
    closePopupBtn = document.querySelector('#close__popup'),
    popupContainer = document.querySelector('#popup__container');
  


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

// Function to dispay portfolio popup
async function displayPortfolio(portfolio) {
    const popupInfoContainer = document.querySelector('.popup__info');

    // Loading animation
    popupInfoContainer.innerHTML = `<img style="width: 5rem" src="assets/images/loading.gif">`;
    popupInfoContainer.classList.add('popup__animation');

    // Display popup
    popupContainer.classList.remove('hidden');

    setTimeout(()=>{
        try {
            // Removing loading animation style
            popupInfoContainer.classList.remove('popup__animation');
            // Generate DOM
            popupInfoContainer.innerHTML = `
                <h4>${portfolio.name}</h4>
                <img src="${portfolio.image}" alt="">
                <p>${portfolio.description}</p>
            `
        } catch {
            // If errors
            popupInfoContainer.innerHTML = `
                <h4 class="popup__info__error">Sorry there was an error while fetching portfolio data</h4>
                <img style="width: 15rem" src="assets/images/sorry.gif">
            `;
        }
    }, 3000);
}



// EVENT LISTENERS

// Event Listener for menu toggling
menu.addEventListener("click", ()=>{
    if (hasChildWithClass(menu, 'fa-times')) {
        responsiveNavList.style.visibility = 'hidden';
        menu.innerHTML = `<i class="fa fa-bars fa-2x"></i>`;
    } else if (hasChildWithClass(menu, 'fa-bars')) {
        responsiveNavList.style.visibility = 'visible';
        menu.innerHTML = `<i class="fa fa-times fa-2x"></i>`;
    }
});

// Event Listener for clicking outside the menu to close it
document.getElementsByTagName("main")[0].addEventListener("click", (event) => {
    if (hasChildWithClass(menu, 'fa-times')) {
        responsiveNavList.style.visibility = 'hidden';
        menu.innerHTML = `<i class="fa fa-bars fa-2x"></i>`;
    }
});

// Event Listener for portfolio image click
portfolioImages.forEach((portfolioImage)=>{
    portfolioImage.addEventListener('click', (e)=>{

        // Getting parent element of ckicked image
        const portfolioDiv = portfolioImage.parentElement;  // Can also use e.target.parentElement

        // Extracting info from this portfolio
        const portfolio = {
            'name': portfolioDiv.querySelector('h2').textContent,
            'description': portfolioDiv.querySelector('p').textContent,
            'image': portfolioDiv.querySelector('img').src
        };

        // Displaying popup
        displayPortfolio(portfolio);
    })
});

certImages.forEach((certImage)=>{
    certImage.addEventListener('click', (e)=>{

        // Getting parent element of ckicked image
        const certDiv = certImage.parentElement;  // Can also use e.target.parentElement

        // Extracting info from this cert
        const cert = {
            'name': certDiv.querySelector('h2').textContent,
            'description': certDiv.querySelector('p').textContent,
            'image': certDiv.querySelector('img').src
        };

        // Displaying popup
        displayPortfolio(cert);
    })
});

// Event Listener to close popup
closePopupBtn.addEventListener('click', ()=>{
    // Hide popup
    popupContainer.classList.add('hidden');
})



// CODE

//document.querySelector('#today').textContent = getCurrentDay();
//document.querySelector('#time__utc').textContent = getCurrentTimeUTC();