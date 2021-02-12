let orderSummary = {
  "how": '',
  "type": '',
  "quantity": '',
  "grind": '',
  "frequency": '',
};

let accordion = document.querySelectorAll('.accordion');
let option = document.querySelectorAll('.option');

function openPanel(panel) {
  if(!panel.classList.contains("disabled")) {
    // otherwise open it
    panel.style.display = "grid";
    panel.classList.add('active');
    panel.previousElementSibling.classList.add('active');
  }
}

function closePanel(panel) {
  if(panel.classList.contains("active")) {
    panel.style.display = "none";
    panel.classList.remove('active');
    panel.previousElementSibling.classList.remove('active');
  }
}

//Open the accordian
for(let i=0; i < accordion.length; i++) {
  accordion[i].addEventListener('click', function() {
    let panel = this.nextElementSibling;
    // close the panel if it is open
    if(panel.classList.contains("active")) {
    closePanel(panel);
    }
     else {
        // if it is a disabled panel don't open it
    openPanel(panel);
    }
    // thing = $0.parentElement.parentElement.nextElementSibling.firstElementChild.nextElementSibling; <- get the button of the next section from in a panel. 
  });
}

option.forEach((options) => {
  //Add event listener to all options
options.addEventListener('click', function() {
  //Remove class of selected from others in row
  let rowPanels = options.parentElement.querySelectorAll('.option');
  rowPanels.forEach((rowOptions) => {
    rowOptions.classList.remove('selected');
  });

  // Add class of selected to item in that row
  options.classList.add('selected');
  let selected = options.querySelector('h4').textContent;
  console.log(options.querySelector('h4').textContent);
  // Add to order summary object
  // First, get the data-question
  let dataQuestion = options.getAttribute('data-question');
  console.log(dataQuestion);
  orderSummary[dataQuestion] = selected;
});
});




// TODO:
// Add id's to individual panels
// Select all options within panels?
// Add event listener to options in panel
// if option is selected add selected class
// add to object that tracks order

// if a panel is disabled don't let it be opened
