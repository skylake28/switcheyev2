const cardYear = document.querySelector('.exp_year');
cardYear.innerHTML = `<option value="">Year</option>`;
for (let i = 0; i < 30; i++) {
    let today = new Date();
    let yyyy  = today.getFullYear();
    let year = yyyy + i;
    let result = `<option value="${year}">${year}</option>`;
    cardYear.innerHTML += result;
}  

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// console.log(productsCheckOut.length);
const updateShoppingCartReview = function () {
    productsCheckOut = JSON.parse(localStorage.getItem('paymentCard'))
    if (productsInCart.length > 0) {
		let result = productsCheckOut.map(product2 => {
            // console.log(product2.image);
            // console.log(product2.name);
            // console.log(product2.price);
			// console.log('yes');
			return `<div class="card d-flex flex-row border">
                        <img class="img-responsive card-img p-1" src="${product2.image}"/>
                        <div class="card-body">
                            <div class="">${product2.name}</div>
                            <div class=""><small>Quantity: <span>${product2.count}</span></small></div>
                            <h6><span>&#8369;</span>${numberWithCommas(product2.price)}</h6>
                        </div>
                    </div>`
        });
        // console.log(result);
        createCartHistory.innerHTML = result.join('') + 
            `<div class="form-group">
                <div class="">
                    <strong>Subtotal</strong>
                    <div class="pull-right"><span>&#8369;</span><span>${numberWithCommas(countTheSumPrice())}</span></div>
                </div>
                <div class="">
                    <small>Shipping</small>
                    <div class="pull-right"><span>-</span></div>
                </div>
            </div>
            <div class="form-group"><hr /></div>
            <div class="form-group">
                <div class="">
                    <strong>Order Total</strong>
                <div class="pull-right"><span>&#8369;</span><span>${numberWithCommas(countTheSumPrice())}</span></div>
            </div>`;
        }
}

updateShoppingCartReview();