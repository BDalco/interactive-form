document.addEventListener('DOMContentLoaded', () => {
  const usernameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const ccNum = document.getElementById("cc-num");
  const zipCode = document.getElementById("zip");
  const cvv = document.getElementById("cvv");
  const form = document.querySelector("form");
  const nameHint = document.getElementById("name-hint");
  const emailHint = document.getElementById('email-hint');
  const activitiesHint = document.getElementById('activities-hint');
  const ccHint = document.getElementById('cc-hint');
  const zipHint = document.getElementById('zip-hint');
  const cvvHint = document.getElementById('cvv-hint');
  const titleSelect = document.getElementById('title');
  const otherJobRole = document.getElementById('other-job-role');
  const shirtDesigns = document.getElementById("design");
  const shirtColor = document.getElementById("color");
  const activities = document.getElementById("activities");
  const activitiesCost = document.getElementById("activities-cost");
  const paymentSelect = document.getElementById("payment");
  const creditCard = document.getElementById("credit-card");
  const paypal = document.getElementById("paypal");
  const bitcoin = document.getElementById("bitcoin");
  const activitiesCheckBox = activities.querySelectorAll('input[type="checkbox"]');
  

  // Focus on the user input field when the page loads
  usernameInput.focus();
  
  // Setting the other-job-role to not display when the page loads
  otherJobRole.style.display = 'none';
  
  // Setting the shirt-colors to not display when the page loads
  shirtColor.disabled = true

  // Setting the additional payment options not to display when the page loads
  paypal.style.display = 'none';
  bitcoin.style.display = 'none';

  // Setting the paymentSelect to default to Credit Card
  paymentSelect.selectedIndex = 1;
  paymentSelect.setAttribute('selected', true);

  /**
   * 
   * Job Role Hide event listener
   *  
   */
  titleSelect.addEventListener('change', (e) => {
    const jobSelection = e.target.value;

    if (jobSelection === 'other') {
      otherJobRole.style.display = 'inherit';
      otherJobRole.focus();
    } else {
      otherJobRole.style.display = 'none';
    }
  });

  /**
   * 
   * Shirt design event listener
   *  
   */
  shirtDesigns.addEventListener('change', (e) => {
    shirtColor.disabled = false;
    const shirtThemes = shirtColor.children;
    const shirtDesign = shirtDesigns.value;

    for(let i = 0; i < shirtThemes.length; i++) {
      const option = shirtColor.options[i];
      const shirtTheme = option.getAttribute('data-theme');

      if (shirtTheme === shirtDesign)  {
        shirtThemes[i].hidden = false;
        shirtThemes[i].setAttribute('selected', true);
        option.style.display = 'block';
      } else {
        shirtThemes[i].hidden = true;
        shirtThemes[i].removeAttribute('selected');
        option.style.display = 'none';
      }
    }
  });

  /**
   * 
   * Activities event listener
   *  
   */
  activities.addEventListener('change', (e) => {
    const boxChecked = e.target;

    if (boxChecked.type === 'checkbox'){
      const activityCost = parseInt(boxChecked.getAttribute('data-cost'));
      let activitiesTotal = parseInt(activitiesCost.textContent.replace(/[^0-9]/g, ''));

      if (boxChecked.checked) {
        activitiesTotal += activityCost;
      } else {
          activitiesTotal -= activityCost;
      }
      activitiesCost.textContent = 'Total: $' + activitiesTotal;
    }
  })

  // Function to add focus and blur to each checked activity
  activitiesCheckBox.forEach((isChecked) => {
    isChecked.addEventListener('focus', e => {
        const parentElement = e.target.parentElement;
        parentElement.classList.add('focus');
    });

    isChecked.addEventListener('blur', e => {
        const parentElement = e.target.parentElement;
        const focusLable = document.querySelector('.focus');
        
        if (focusLable === parentElement) {
          parentElement.classList.remove('focus');
        }
    });
  });

  /**
   * 
   * Payment event listener
   *  
   */

  paymentSelect.addEventListener('change', (e) => {
    const paymentOption = e.target.value;
    const paypalOption = (paymentOption === 'paypal');
    const bitcoinOption = (paymentOption === 'bitcoin');
    const creditCardOption = (paymentOption === 'credit-card');
    
    if (paypalOption) {
      paypal.style.display = 'inherit';
      bitcoin.style.display = 'none';
      creditCard.style.display = 'none';
    } else if (bitcoinOption) {
      paypal.style.display = ' none';
      bitcoin.style.display = 'inherit';
      creditCard.style.display = 'none';
    } else if (creditCardOption) {
      paypal.style.display = ' none';
      bitcoin.style.display = 'none';
      creditCard.style.display = 'inherit';
    }
  })

  form.addEventListener('submit', (e) => {
    
    // Validate Name Input Field
    const usernameValue = usernameInput.value.trim();
    const usernameCheck = (usernameValue === '');

    if(usernameCheck) {
      e.preventDefault();
      usernameInput.parentElement.classList.add('not-valid');
      usernameInput.parentElement.classList.remove('valid');
      nameHint.style.display = 'inherit';
    } else {
      usernameInput.parentElement.classList.add('valid');
      usernameInput.parentElement.classList.remove('not-valid');
      nameHint.style.display = 'none';
    }

    // Validate Email Input Field
    const validEmail = isValidEmail(emailInput.value);

    if(!validEmail) {
      e.preventDefault();
      emailInput.parentElement.classList.add('not-valid');
      emailInput.parentElement.classList.remove('valid');
      emailHint.style.display = 'inherit';
    } else {
      emailInput.parentElement.classList.add('valid');
      emailInput.parentElement.classList.remove('not-valid');
      emailHint.style.display = 'none';
    }

    // Validate Activities Field
    const activitiesCount = activities.querySelectorAll('input[type="checkbox"]:checked');
    const activitiesLength = (activitiesCount.length === 0);

    if(activitiesLength) {
      e.preventDefault();
      activities.parentElement.classList.add('not-valid');
      activities.parentElement.classList.remove('valid');
      activitiesHint.style.display = 'inherit';
    } else {
      activities.parentElement.classList.add('valid');
      activities.parentElement.classList.remove('not-valid');
      activitiesHint.style.display = 'none';
    }

    // Validate Credit Card
    const creditCardSelection = (paymentSelect.value === 'credit-card');

    if(creditCardSelection) {
      ccValue = ccNum.value.trim();
      const validCC = isValidCreditCard(ccValue);

      if(!validCC) {
        e.preventDefault();
        ccNum.parentElement.classList.add('not-valid');
        ccNum.parentElement.classList.remove('valid');
        ccHint.style.display = 'inherit';
      } else {
        ccNum.parentElement.classList.add('valid');
        ccNum.parentElement.classList.remove('not-valid');
        ccHint.style.display = 'none';
      }

      const validZipCode = isValidZipCode(zipCode.value);

      if(!validZipCode) {
        e.preventDefault();
        zipCode.parentElement.classList.add('not-valid');
        zipCode.parentElement.classList.remove('valid');
        zipHint.style.display = 'inherit';
      } else {
        zipCode.parentElement.classList.add('valid');
        zipCode.parentElement.classList.remove('not-valid');
        zipHint.style.display = 'none';
      }

      const validCVV = isValidCVV(cvv.value);

      if(!validCVV) {
        e.preventDefault();
        cvv.parentElement.classList.add('not-valid');
        cvv.parentElement.classList.remove('valid');
        cvvHint.style.display = 'inherit';
      } else {
        cvv.parentElement.classList.add('valid');
        cvv.parentElement.classList.remove('not-valid');
        cvvHint.style.display = 'none';
      }

    }

  })

  /**
   * 
   * Validator functions
   *  
   */

  // Must be a valid email address
  function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
  }

  // Must be a valid credit card
  function isValidCreditCard(creditCard) {
    return /^[0-9]{13,16}$/.test(creditCard);
  }

  // Must be a valid zip code
  function isValidZipCode(zipCode) {
    return /^[0-9]{5}$/.test(zipCode);
  }

  // Must be a valid CVV number
  function isValidCVV(cvvNum) {
    return /^[0-9]{3}$/.test(cvvNum);
  }
});
