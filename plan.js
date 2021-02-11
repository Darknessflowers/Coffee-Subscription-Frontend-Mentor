let accordion = document.querySelectorAll('.accordion');

for(let i=0; i < accordion.length; i++) {
  accordion[i].addEventListener('click', function() {
    // toggle the active class 
    // debugger;
    //toggle hide/showing the panel
    let panel = this.nextElementSibling;
    console.log(panel.style.display);

    if(panel.classList.contains("active")) {
      panel.style.display = "none";
      panel.classList.remove('active');
      panel.previousElementSibling.classList.remove('active');
    } else if(panel.classList.contains("disabled")) {
      // do nothing
    }
      else {
        console.log(panel.classList.contains("disabled"));
        if(!panel.classList.contains("disabled")) {
          panel.style.display = "grid";
      panel.classList.add('active');
      panel.previousElementSibling.classList.add('active');
        }
    }
  });
}

// TODO:
// Add id's to individual panels
// Select all options within panels?
// Add event listener to options in panel
// if option is selected add selected class
// add to object that tracks order

// if a panel is disabled don't let it be opened
