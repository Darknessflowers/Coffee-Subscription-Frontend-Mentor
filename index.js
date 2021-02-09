let navButton = document.querySelector('.menu-toggle');
let nav = document.querySelector('header nav');
let header = document.querySelector('header');
let homeHero = document.querySelector('#home-hero');
const mediaQuery = window.matchMedia('(max-width: 600px)');

function closeMenu() {
  navButton.classList.remove('activated');
    nav.classList.remove('activated');
    header.classList.remove('activated');
    navButton.setAttribute('aria-pressed', false);
    document.body.style.overflow = 'auto';
    homeHero.style.paddingTop = 0;
}
function toggleBtn() {
  console.log('clicked');
  if(navButton.classList.contains('activated')) {
    closeMenu();
  } else {
    let headerHeight = header.offsetHeight;

    navButton.classList.add('activated');
    nav.classList.add('activated');
    header.classList.add('activated');
    navButton.setAttribute('aria-pressed', true);
    document.body.style.overflow = 'hidden';
    console.log(headerHeight);
    homeHero.style.paddingTop = headerHeight + 'px';
  }
}

navButton.addEventListener('click', toggleBtn);
// If the window is resized above mobile viewport close the menu
window.addEventListener('resize', () => {
if(!mediaQuery.matches) {
  closeMenu();
}
});