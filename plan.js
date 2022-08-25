let orderSummary = {
  // template
  // "how": '',
  // "type": '',
  // "quantity": '',
  // "grind": '',
  // "frequency": '',
};
let pricing = {
  '250g': {
    'Every Week': 7.20 * 4,
    'Every Fortnight': 9.60 * 2,
    'Every Month': 12.00,
  },
  '500g': {
    'Every Week': 13.00 * 4,
    'Every Fortnight': 17.50 * 2,
    'Every Month': 22.00,
  },
  '1000g': {
    'Every Week': 22.00 * 4,
    'Every Fortnight': 32.00 * 2,
    'Every Month': 42.00,
  },
};

const accordion = document.querySelectorAll('.accordion');
const option = document.querySelectorAll('.option');
const howFragment = document.querySelector('.how-fragment');
const typeFragment = document.querySelector('.type-fragment');
const quantityFragment = document.querySelector('.quantity-fragment');
const frequencyFragment = document.querySelector('.frequency-fragment');
const grindFragment = document.querySelector('.grind-fragment');
const subMenuItems = document.querySelectorAll('.sub-menu li');
const modalContainer = document.querySelector('.checkout-modal-outer');
const modalInner = document.querySelector('.checkout-modal-inner');
const modalOrderInner = document.querySelector('.order');
const orderAsText = document.querySelector('.order-text');
const priceDisplay = document.querySelector('.checkout-modal-inner .price');
const proceedToCheckoutBtn = document.querySelector('.proceed-to-checkout');
const checkoutBtn = document.querySelector('.checkout');
const grindMenu = document.querySelector('.sub-menu [data-question="grind"] a');
let nextPanel;
let totalPrice = 0;
const mobileMediaQuery = window.matchMedia("(max-width: 705px)")

function openPanel(panel) {
  subMenuItems.forEach((item) => {
    if(item.getAttribute('data-question') === panel.getAttribute('data-question')) {
      item.classList.add('active');
      return;
    }
  });
  if(!panel.classList.contains("disabled") && panel.classList.contains("panel")) {
    // otherwise open it
    panel.style.display = "grid";
    panel.classList.add('active');
    panel.previousElementSibling.classList.add('active');
  }
}

function closePanel(panel) {
  subMenuItems.forEach((item) => {
    if(item.getAttribute('data-question') === panel.getAttribute('data-question')) {
      item.classList.remove('active');
      return;
    } 
  });
  if(panel.classList.contains("active")) {
    panel.style.display = "none";
    panel.classList.remove('active');
    panel.previousElementSibling.classList.remove('active');
  }
}

function subMenuSelect(e) {
  let attr = e.currentTarget.getAttribute('data-question');
  let panelToOpen = document.querySelector(`#${attr}`).nextElementSibling;
  if(!e.currentTarget.classList.contains('active')) {
    openPanel(panelToOpen);
  } else {
    closePanel(panelToOpen);
  }
}
subMenuItems.forEach((item) => {
  item.addEventListener('click', subMenuSelect);
});

function openandCloseModal() {
  //open Modal
  calcPrice();
  document.body.style.overflow = 'hidden';
  modalContainer.classList.add('open');
  // change checkout button text based on device size
  if(mobileMediaQuery.matches) {
    checkoutBtn.innerText = `Checkout - $${totalPrice} / mo`;
    document.querySelector('.checkout-modal-inner .price').style.display = "none";
  } else {
    checkoutBtn.innerText = 'Checkout';
    document.querySelector('.checkout-modal-inner .price').style.display = "block";
  }
  

  // Detect clicks outside to close
  modalContainer.addEventListener('click', function(e) {
    //close
    if(e.target.closest('.checkout-modal-inner') === null) {
      closeModal();
      document.body.style.overflow = 'auto';
    }
  });
}

function closeModal() { 
  modalContainer.classList.remove('open');
}


//Open the accordion
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
  });
}

function calcPrice() {
  let valueToAccess = orderSummary.quantity;
  let frequencyToAccess = orderSummary.frequency;
  let price = pricing[valueToAccess][frequencyToAccess];
  totalPrice = price.toFixed(2);
  priceDisplay.innerText = `$${price.toFixed(2)} / mo`;
  if(price > 0) {
    return true;
  }
}

option.forEach((options) => {
  //Add event listener to all options
options.addEventListener('click', function() {
  // debugger;
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
    let grindBtn = document.querySelector('#grind');
    if(orderSummary.how === 'Capsules') {
      howFragment.innerHTML = `using <span class="blue">${orderSummary.how}</span>,`;
      // add grind to order summary still but as null
      orderSummary.grind = null;

      // disable grind option
      if(!grindBtn.classList.contains('disabled')) {
        grindBtn.classList.add('disabled');
        grindBtn.nextElementSibling.classList.add('disabled');
        //add disabled class to sub-menu 
        grindMenu.classList.add('disabledsub');
        //close panel
        closePanel(grindBtn.nextElementSibling);
      }
      //reset grind option
      // delete orderSummary.grind;
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
      if(grindMenu.classList.contains('disabledsub')) {
        grindMenu.classList.remove('disabledsub');
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
  closePanel(currentPanel);

  // move up from the button then navigate to the next panel
  nextPanel = this.closest('.accordion-wrap').nextElementSibling.firstElementChild.nextElementSibling;
  // if the next panel is disabled skip it
  if(nextPanel.classList.contains('disabled')) {
    nextPanel = this.closest('.accordion-wrap').nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling;
  } 
    openPanel(nextPanel);
    if(nextPanel.classList.contains("panel")) {
    nextPanel.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
    }

    updateOrderSummaryModal();
    // if every option is selected enable create plan
    if(Object.entries(orderSummary).length == 5) {
      //enable create plan button
      let createPlanBtn = document.querySelector('.proceed-to-checkout');
      // if how is not set to capsule then only enable if grind isn't false
      if(orderSummary.how !== "Capsules" && orderSummary.grind === null) {
        createPlanBtn.disabled = true;
      } else {
        createPlanBtn.disabled = false;
      }
    }
});
});

function updateOrderSummaryModal() {
  modalOrderInner.innerHTML = orderAsText.innerHTML;
}

proceedToCheckoutBtn.addEventListener('click', openandCloseModal);
// trigger closing of section, open next section
// active panel
// anchor linking


// TODO:
// Add id's to individual panels
// Select all options within panels?
// Add event listener to options in panel
// if option is selected add selected class
// add to object that tracks order

// skip disabled panel, and open next one
// scroll to next panel - Element.scrollIntoView()
// checkout button enables if options are selected and there is a price
// hover effect on sidebar
