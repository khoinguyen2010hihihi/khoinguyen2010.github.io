document.querySelectorAll(".position").forEach(box => {
    box.addEventListener("click", function() {
        let positionText = this.textContent.trim();
        let target = Array.from(document.querySelectorAll(".players h2"))
            .find(h2 => h2.textContent.trim() === positionText);
        
        if (target) {
            target.scrollIntoView({ behavior: "auto", block: "start" });
            window.scrollBy(0, -180);
        }
    });
})

const researchElement = document.getElementById('research');
const searchBar = document.querySelector('.search-bar');

researchElement.addEventListener('click', () => {

    if (searchBar.style.opacity === '1') {
    searchBar.style.opacity = 0;
    searchBar.style.transform = 'translateY(-100%)';
    } else {
    searchBar.style.opacity = 1;
    searchBar.style.transform = 'translateY(0)';
    }

    searchBar.style.boxShadow = '0 50px 100px 20px rgba(0, 0, 0, .7)';
    searchBar.style.transition = 'all .3s ease';
});

const searchOpen = document.querySelector('.search__icon--open');
const searchClose = document.querySelector('.search__icon--close');

searchOpen.addEventListener('click', () => {
    searchOpen.style.display = 'none'; 
    searchClose.style.display = 'flex';
});

searchClose.addEventListener('click', () => {
    searchClose.style.display = 'none';
    searchOpen.style.display = 'flex';
});

const menuButton = document.querySelector('.barca__menu');
const settingSearch = document.querySelector('.setting__search');
const settingBar = document.querySelector('.setting__bar');

menuButton.addEventListener('click', function() {
    settingSearch.style.opacity = 1;
    settingSearch.style.transform = 'translateX(0)';
    settingBar.style.opacity = 1;
    settingBar.style.transform = 'translateX(0)';
});

const mobileClose = document.querySelector('.x__icon');

mobileClose.addEventListener('click', function() {
    settingSearch.style.opacity = 0;
    settingSearch.style.transform = 'translateX(100%)';
    settingBar.style.opacity = 0;
    settingBar.style.transform = 'translateX(100%)';
})