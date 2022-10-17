let buyerInfo = JSON.parse(localStorage.getItem('buyerInfo')) || []; //for current buyer


const cardYear = document.querySelector('.exp_year');
cardYear.innerHTML = `<option value="">Year</option>`;
for (let i = 0; i < 30; i++) {
    let today = new Date();
    let yyyy  = today.getFullYear();
    let year = yyyy + i;
    let result = `<option value="${year}">${year}</option>`;
    cardYear.innerHTML += result;
}  

// console.log(productsCheckOut.length);
const updateShoppingCartReview = function () {
    if (productsInCart.length > 0) {
        productsCheckOut = JSON.parse(localStorage.getItem('paymentCard')) || [];
		let result = productsCheckOut.map(product => {
			// console.log('yes');
			return `<div class="card d-flex flex-row border">
                        <img class="img-responsive card-img p-1" src="${product.image}"/>
                        <div class="card-body">
                            <div class="">${product.name}</div>
                            <div class=""><small>Quantity: <span>${product.count}</span></small></div>
                            <h6><span>&#8369;</span>${numberWithCommas(product.price)}</h6>
                        </div>
                    </div>`
        });
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
        else {
            document.querySelector('.checkout').classList.add('hidden');
        }
}
updateShoppingCartReview()
updateShoppingCartHTML();
updateProductsInPaymentStorage();

