let orderSummary = {
  // template
  // "how": '',
  // "type": '',
  // "quantity": '',
  // "grind": '',
  // "frequency": '',
};

let accordion = document.querySelectorAll('.accordion');
let option = document.querySelectorAll('.option');
let howFragment = document.querySelector('.how-fragment');
let typeFragment = document.querySelector('.type-fragment');
let quantityFragment = document.querySelector('.quantity-fragment');
let frequencyFragment = document.querySelector('.frequency-fragment');
let grindFragment = document.querySelector('.grind-fragment');

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
    openPanel(panel);
    }
    // thing = $0.parentElement.parentElement.nextElementSibling.firstElementChild.nextElementSibling; <- get the button of the next section from in a panel. 
  });
}

option.forEach((options) => {
  //Add event listener to all options
options.addEventListener('click', function() {
  //Remove class of selected from others in row
  let rowOptions = options.parentElement.querySelectorAll('.option');
  rowOptions.forEach((rowOptions) => {
    rowOptions.classList.remove('selected');
  });

  // Add class of selected to item in that row
  options.classList.add('selected');
  let selected = options.getAttribute('data-answer');
  // First, get the data-question
  let dataQuestion = options.getAttribute('data-question');
    // Add to order summary object
  orderSummary[dataQuestion] = selected;
  //if in the how row
  if(dataQuestion === 'how') {
    let grindBtn = document.querySelector('#grind-btn');
    if(orderSummary.how === 'Capsules') {
      howFragment.innerHTML = `using <span class="blue">${orderSummary.how}</span>,`;
      // disable grind option
      if(!grindBtn.classList.contains('disabled')) {
        grindBtn.classList.add('disabled');
        grindBtn.nextElementSibling.classList.add('disabled');
        closePanel(grindBtn.nextElementSibling);
      }
      //reset grind option
      delete orderSummary.grind;
      grindFragment.innerHTML = ``;
      let grindRow = document.querySelector('#grind-row');
      let grindOptions = grindRow.querySelectorAll('.option');
      grindOptions.forEach((option) => {
        option.classList.remove('selected');
      });
    } else {
      if(!orderSummary.hasOwnProperty('how')) {
        howFragment.innerHTML = `as <span class="blue">_____</span>,`;
      } else {
        howFragment.innerHTML = `as <span class="blue">${orderSummary.how}</span>,`;
      }
      if(grindBtn.classList.contains('disabled')) {
        grindBtn.classList.remove('disabled');
        grindBtn.nextElementSibling.classList.remove('disabled');
      }
    }
  } else if(dataQuestion === 'type') {
    typeFragment.innerHTML = orderSummary.type;
  } else if(dataQuestion === 'quantity') {
    quantityFragment.innerHTML = orderSummary.quantity;
  } else if(dataQuestion === 'grind') {
    if(orderSummary.grind === 'Wholebean') {
      grindFragment.innerHTML = ``;
    } else {
      grindFragment.innerHTML = ` ground ala <span class="blue">${orderSummary.grind}</span>`;
    }
  } else if(dataQuestion === 'frequency') {
    frequencyFragment.innerHTML = orderSummary.frequency;
  } else {
    console.log('unknown row');
  }
  // close panel that was just selected from
  let currentPanel = this.closest('.panel'); 
  // closePanel(currentPanel);

  // move up from the button then navigate to the next panel
  let nextPanel = this.closest('.accordian-wrap').nextElementSibling.firstElementChild.nextElementSibling;
    // open next panel
    if(!currentPanel.classList.contains('last')) {
      openPanel(nextPanel);
    }
  // console.log(this.parentElement.parentElement.nextElementSibling.firstElementChild.nextElementSibling);
      // thing = $0.parentElement.parentElement.nextElementSibling.firstElementChild.nextElementSibling; <- get the button of the next section from in a panel. 
});
});

// trigger closing of section, open next section
// active panel
// anchor linking


// TODO:
// Add id's to individual panels
// Select all options within panels?
// Add event listener to options in panel
// if option is selected add selected class
// add to object that tracks order

// if a panel is disabled don't let it be opened
