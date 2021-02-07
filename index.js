let navButton = document.querySelector('.menu-toggle');
let nav = document.querySelector('header nav');

function toggleBtn() {
  console.log('clicked');
  if(navButton.classList.contains('activated')) {
    navButton.classList.remove('activated');
    nav.classList.remove('activated');

    navButton.setAttribute('aria-pressed', false);

  } else {
    navButton.classList.add('activated');
    nav.classList.add('activated');
    navButton.setAttribute('aria-pressed', true);
  }
}

navButton.addEventListener('click', toggleBtn);