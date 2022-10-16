let productsInCart = JSON.parse(localStorage.getItem('shoppingCart')); //for current shopping cart
if(!productsInCart){
	productsInCart = [];
}

const parentElementCart = document.querySelector('#buyItems');
const cartSumItem = document.querySelector('.cartTotalinNav');
const cartSumItem2 = document.querySelector('.totalitemsInsideModal');
const checkOuttTotalPrice = document.querySelector('#totalPrices');
const products = document.querySelector('.productUnder');

// const cartSumPrice = document.querySelector('#sum-prices');
//Sum of 
const countTheSumPrice = () => { // 4
	let sum = 0;
	productsInCart.forEach(item => {
		sum += item.price;
	});
	return sum;
}
 
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


//get selected items and store in local storage
const updateShoppingCartHTML = function () {  // 3
	localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
	if (productsInCart.length > 0) {
		let result = productsInCart.map(product => {
			// console.log('yes');
			return `
				<tr>
					<td class="align-middle text-center"><img src="${product.image}" class="img-modal"></td>
					<td class="align-middle text-center cartProductDetails">
						<h5>${product.name}</h5>
						<h6>&#8369;<span>${numberWithCommas(product.price)}</span></h6>

						<div class="align-middle text-center addRemoveProd">
							<button class="btn btn-primary button-minus btn-sm" data-id=${product.id}>-</button>
							<span class="countOfProduct">${product.count}</span>
							<button class="btn btn-primary button-plus btn-sm" data-id=${product.id}>+</button>
						</div>
						
					</td>
					<td class="align-middle text-center"><button class="btn btn-danger removeSelectedCartItem" data-id=${product.id}>Remove</button></td>
				</tr>`
		});
		parentElementCart.innerHTML =`<thead class="thead-light">
										<tr>
											<th>Product Image</th>
											<th>Product Name/Price/Quantity</th>
											<th>Remove from Cart</th>
										</tr>
									</thead>` + 
									`<tbody>` + result.join(''); + //Displays/Join items on div with ID of #buyItems.
									`</tbody>`
		document.querySelector('.checkout').classList.remove('hidden');
		cartSumItem.innerHTML = countTotal(); //Displays total amount on div with class cart and p tag.
		cartSumItem2.innerHTML = countTotal();
		checkOuttTotalPrice.innerHTML = '<p>Total Price: <span id="totalPrices">&#8369;' + numberWithCommas(countTheSumPrice()) + '</span></p>';
		updateProductsInPaymentStorage();
	}
	else {
		document.querySelector('.checkout').classList.add('hidden');
		parentElementCart.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>';
		cartSumItem.innerHTML = '';
		cartSumItem2.innerHTML = '';
		checkOuttTotalPrice.innerHTML = '';
	}
}


//update product array
function updateProductsInCart(product) { // 2
	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id) {
			productsInCart[i].count += 1;
			productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
            return;
		}
	}
	productsInCart.push(product);
}

//Total check out items
const countTotal = () => {
    total = 0;
    for (let i = 0; i < productsInCart.length; i++) {
        total += productsInCart[i].count;
    }
    return total;
} 

// console.log('produce', products);
if (products != null ){
	products.addEventListener('click', (e) => { // 1
		e.preventDefault();
		if (e.target.classList.contains('addToCart')) {
			const productID = e.target.dataset.productId;
			const productName = products.querySelector('.productName').innerHTML;
			const productPrice = products.querySelector('.priceValue').innerHTML;
			const productImage = products.querySelector('img').src;
			let product = {
				name: productName,
				image: productImage,
				id: productID,
				count: 1,
				price: +productPrice,
				basePrice: +productPrice,
			}
			updateProductsInCart(product);
			updateShoppingCartHTML();
			updateShoppingCartReview();
		}
	});
}

//increments and decrements value of item, also remove from shopping cart item with 0 count 
if (parentElementCart != null){
	parentElementCart.addEventListener('click', (e) => { // Last
		const isPlusButton = e.target.classList.contains('button-plus');
		const isMinusButton = e.target.classList.contains('button-minus');
		if (isPlusButton || isMinusButton) {
			for (let i = 0; i < productsInCart.length; i++) {
				if (productsInCart[i].id == e.target.dataset.id) {
					if (isPlusButton) {
						productsInCart[i].count += 1
					}
					else if (isMinusButton) {
						productsInCart[i].count -= 1
					}
					productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
				}
				if (productsInCart[i].count <= 0) {
					productsInCart.splice(i, 1);
				}
			}
			updateShoppingCartHTML();
			updateShoppingCartReview();
		}
	});
}

//delete whole item
if (parentElementCart != null){
	parentElementCart.addEventListener('click', (e) => { // Last
		const removeSelectedCartItem = e.target.classList.contains('removeSelectedCartItem');
		if (removeSelectedCartItem) {
			for (let i = 0; i < productsInCart.length; i++) {
				if (productsInCart[i].id == e.target.dataset.id) {
					productsInCart.splice(i, 1);
				}
			}
			updateShoppingCartHTML();
			updateShoppingCartReview();
		}
	});
}

const createCartHistory = document.querySelector('.createCartHistory');
let productsCheckOut = [];

function updateProductsInPaymentStorage() { 
	for(let i=0; i<localStorage.length; i++) {
		let key = localStorage.key(i);
		let dateObj = new Date();
		let month = dateObj.getUTCMonth() + 1; //months from 1-12
		let day = dateObj.getUTCDate();
		let year = dateObj.getUTCFullYear();
		newdate = year + "/" + month + "/" + day;
		// console.log(newdate);
		productsCheckOut += localStorage.setItem('paymentCard', localStorage.getItem(key));
	}
}

updateProductsInPaymentStorage();
updateShoppingCartHTML();