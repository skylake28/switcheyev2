const submit = document.querySelector("#fromValidate");
const cancel = document.querySelector(".cancel");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const emailadd = document.querySelector("#email");
const deliveryAddress = document.querySelector("#address");
const deliveryCity = document.querySelector("#city");
const deliveryCountry  = document.querySelector("#country");
const zip_code = document.querySelector("#zip");
// const inputTelNum = document.querySelector(".inputTel");
const creditCardType = document.querySelector("#creditCardType");
const card_number = document.querySelector("#cc-number");
const card_code  = document.querySelector("#cc-cvv");
const exp_month = document.querySelector(".exp_month");
const exp_year = document.querySelector(".exp_year");


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
                alert("Not a valid Amercican Express credit card number!");
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
              alert("Not a valid Amercican Express credit card number!");
              return false;
              }
    }    else if (creditCardType.value == "master") {
        var cardno = /^(?:5[1-5][0-9]{14})$/;
        if(inputtxt.value.match(cardno))
              {
            return true;
              }
            else
              {
              alert("Not a valid Mastercard number!");
              return false;
              }
    }
}

let monthValue = 0;
let yearValue = 0;


function expiry () {

    let monthValue = exp_month.value;
    let yearValue = exp_year.value;
    let today, someday;
    today = new Date();
    console.log(today);
    console.log(tomonthValueday);
    console.log(yearValue);
    someday = new Date();
    someday.setFullYear(yearValue, monthValue, 1);
    console.log(someday);

    if (someday < today) {
       alert("The expiry date is before today's date. Please select a valid expiry date");
       return false;
    }
    return true;
}

cardnumber(card_number);
expiry();
// submit.addEventListener('click', (e) => {
// if (e.target.classList.contains('btn-submit')) {
//     if (cardnumber(card_number)===true && expiry()===true)  {

//         let formData =  {
//             firstname: firstName.value,
//             lastname: lastName.value,
//             email: emailadd.value,
//             address: deliveryAddress.value,
//             city: deliveryCity.value,
//             country: deliveryCountry.value,
//             tel: inputTelNum.value,
//             zip: zip_code.value,
//         } 
//         localStorage.setItem('buyerInfo', JSON.stringify(formData));
//         localStorage.removeItem('shoppingCart');
//         updateShoppingCartHTML();
        
//     } else {
//         e.preventDefault();
//         e.stopPropagation();
//     }
// }
// });




// const cancel = document.querySelector(".cancel");
submit.addEventListener('click', (e) => {
  if (e.target.classList.contains('cancel')) {
          localStorage.removeItem('shoppingCart');
          updateShoppingCartHTML();
      }
  });


  // Example starter JavaScript for disabling form submissions if there are invalid fields
// const formValidation = () => {
//   'use strict'

//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//   var forms = document.querySelectorAll('.needs-validation')

//   // Loop over them and prevent submission
//   Array.prototype.slice.call(forms)
//     .forEach(function (form) {
//       form.addEventListener('submit', function (event) {
//         if (!form.checkValidity() && cardnumber(card_number)===false && expiry()===false) {
//           event.preventDefault()
//           event.stopPropagation()
//         }
//         form.classList.add('was-validated');
//       }, false)
//     })

// }

const formValidation = () => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        console.log(cardnumber(card_number));
        console.log(expiry());
        if (!form.checkValidity() && cardnumber(card_number)===false && expiry()===false) {
          event.preventDefault()
          event.stopPropagation()
        } else {
            form.classList.add('was-validated');
            console.log(monthValue);
            console.log(card_number.value);
            alert(card_number.value);
            alert("okay");
            let formData =  {
                firstname: firstName.value,
                lastname: lastName.value,
                email: emailadd.value,
                address: deliveryAddress.value,
                city: deliveryCity.value,
                country: deliveryCountry.value,
                zip: zip_code.value
            } 
            localStorage.setItem('buyerInfo', JSON.stringify(formData));
            localStorage.removeItem('shoppingCart');
            updateShoppingCartHTML();
          }
        }
      )
    })

}

formValidation();
console.log(formValidation());