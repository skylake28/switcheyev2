const submit = document.querySelector("#fromValidate");
const cancel = document.querySelector(".cancel");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const emailadd = document.querySelector("#email");
const deliveryAddress = document.querySelector("#address");
const deliveryCity = document.querySelector("#city");
const deliveryCountry  = document.querySelector("#country");
const zip_code = document.querySelector("#zip");
const inputTelNum = document.querySelector(".inputTel");
const creditCardType = document.querySelector("#creditCardType");
const card_number = document.querySelector(".cc-number");
const card_code  = document.querySelector("#cc-cvv");
const forms = document.querySelector('.needs-validation');
const checkCCnumber = document.querySelector(".cardCCnumber");

console.log("ngano mani", checkCCnumber);

//Change error message
function cardErrorMessageChanger(inputtxt){
  if (creditCardType.value == "visa"){
      let cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
      if(inputtxt.value.match(cardno))
              {
          return true;
              }
          else
              {
              let y = checkCCnumber.textContent = "Not a valid Visa card number!";
              return y;
              }
  } else if (creditCardType.value == "americanExpress") {
      let cardno = /^(?:3[47][0-9]{13})$/;
      if(inputtxt.value.match(cardno))
            {
          return true;
            }
          else
            {
            let y =  checkCCnumber.textContent = "Not a valid Amercican Express credit card number!";
            return y;
            }
      }   else if (creditCardType.value == "master") {
      var cardno = /^(?:5[1-5][0-9]{14})$/;
      if(inputtxt.value.match(cardno))
            {
          return true;
            }
          else
            {
            let y = checkCCnumber.textContent = "Not a valid Mastercard number!";
            return y;
            }
          } else if (!inputtxt) {
              return false;
          }
}

// Validate a Credit card
function cardnumber(inputtxt){
    if (creditCardType.value == "visa"){
        let cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
        if(inputtxt.value.match(cardno))
                {
            return true;
                }
            else
                {
                // checkCCnumber.textContent = "Not a valid Visa card number!";
                // document.getElementById("invalid-feedback").style.display = "block";
                return false;
                }
    } else if (creditCardType.value == "americanExpress") {
        let cardno = /^(?:3[47][0-9]{13})$/;
        if(inputtxt.value.match(cardno))
              {
            return true;
              }
            else
              {
              // checkCCnumber.textContent = "Not a valid Amercican Express credit card number!";
              return false;
              }
        }   else if (creditCardType.value == "master") {
        var cardno = /^(?:5[1-5][0-9]{14})$/;
        if(inputtxt.value.match(cardno))
              {
            return true;
              }
            else
              {
              // checkCCnumber.textContent = "Not a valid Mastercard number!";
              return false;
              }
            } else if (!inputtxt) {
                return false;
            }
}

function lastNameField () {
    if (!lastName.value) {
        return false;       
    }
    return true;
}

function email () {   

    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailadd.value))
        {
            return true;
        }
            return false;
  }

function address () {    
    if (!deliveryAddress.value) {
        return false;      
    }
    return true;
 }

 function city () {   
    if (!deliveryCity.value) {
        return false;             
    }
    return true;
 }

 function country () { 

    if(deliveryCountry.value.match("select country")) {

        return false;
    } else {

        return true;
     }
}

 function zipCode () {   
    if (!zip_code.value) {
        return false;         
    }

        return true;
 } 

 function inputTel () {

    if (/[+][6]{1}[3]{1}[0-9]{10}/.test(inputTelNum.value))
    {
        return true;
    }
        return false;
 } 

function firstNameField () {
      if (!firstName.value) {

          return false;
      } else {
        return true;
      }
  }

function cardCode () {

    if (/[0-9]{3}/.test(card_code.value))
    {
        return true;
    }

        return false;
}

const exp_month = document.querySelector(".exp_month");
const exp_year = document.querySelector(".exp_year");
let monthValue = 0;
let yearValue = 0;

function expiry () {


    let monthValue = exp_month.value;
    let yearValue = exp_year.value;
    let today, someday;
    today = new Date();

    someday = new Date();
    someday.setFullYear(yearValue, monthValue, 1);


    if (someday < today) {
      
       return false;
    }
    return true;
}


submit.addEventListener('click', (e) => {

if (e.target.classList.contains('btn-submit')) {

  cardErrorMessageChanger(card_number);
  console.log(cardErrorMessageChanger(card_number));

  if (cardnumber(card_number)===false){
    document.querySelector(".cardCCnumber").setAttribute('id', 'displayInvalidFeedback');
    card_number.setAttribute('id', 'cc-number');

  } else {
    document.querySelector(".cardCCnumber").removeAttribute('id');
    card_number.removeAttribute('id');
  };

  if (expiry()===false){
    document.querySelector(".exp_month_feedback").setAttribute('id', 'exp_month_feedback');
    document.querySelector(".exp_year_feedback").setAttribute('id', 'exp_year_feedback');
    exp_month.setAttribute('id', 'exp_month');
    exp_year.setAttribute('id', 'exp_year');
  
  } else {
    document.querySelector(".exp_month_feedback").removeAttribute('id');
    document.querySelector(".exp_year_feedback").removeAttribute('id');
    exp_month.removeAttribute('id');
    exp_year.removeAttribute('id');
  };

  forms.classList.add("was-validated");

    if (cardnumber(card_number)===true && expiry()===true && cardCode()===true && email()===true && inputTel()===true && lastNameField()===true && firstNameField()===true && address()===true && city()===true && country()===true)  {

        let formData =  {
            firstname: firstName.value,
            lastname: lastName.value,
            email: emailadd.value,
            address: deliveryAddress.value,
            city: deliveryCity.value,
            country: deliveryCountry.value,
            tel: inputTelNum.value,
            zip: zip_code.value,
        } 
        localStorage.setItem('buyerInfo', JSON.stringify(formData));

        localStorage.removeItem('shoppingCart');
        updateShoppingCartReview();
    } else {
        e.preventDefault();
        e.stopPropagation();
        }
    }

});


// const cancel = document.querySelector(".cancel");
submit.addEventListener('click', (e) => {
  if (e.target.classList.contains('cancel')) {
          localStorage.removeItem('shoppingCart');
          updateShoppingCartReview();
          updateProductsInPaymentStorage();
      }
  }); 