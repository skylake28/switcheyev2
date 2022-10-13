let productsInCart = JSON.parse(localStorage.getItem('shoppingCart')); //for current shopping cart
if(!productsInCart){
	productsInCart = [];
}

const parentElementCart = document.querySelector('#buyItems');
const cartSumItem = document.querySelector('.cart p');
const cartSumItem2 = document.querySelector('.top span');
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
 
//get selected items and store in local storage
const updateShoppingCartHTML = function () {  // 3
	localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
	if (productsInCart.length > 0) {
		let result = productsInCart.map(product => {
			// console.log('yes');
			return `
				<li class="buyItem">
					<img src="${product.image}">
					<div class="cartProductDetails">
						<h5>${product.name}</h5>
						<h6>&#8369;<span>${product.price}</span></h6>

						<div class="addRemoveProd">
							<button class="btn button-minus" data-id=${product.id}>-</button>
							<span class="countOfProduct">${product.count}</span>
							<button class="btn button-plus" data-id=${product.id}>+</button>
						</div>
						
					</div>
					<span class="removeSelectedCartItem" data-id=${product.id}>&#10006;</span>
				</li>`
		});
		parentElementCart.innerHTML = result.join(''); //Displays/Join items on div with ID of #buyItems.
		document.querySelector('.checkout').classList.remove('hidden');
		cartSumItem.innerHTML = countTotal(); //Displays total amount on div with class cart and p tag.
		cartSumItem2.innerHTML = countTotal();
		checkOuttTotalPrice.innerHTML = '<p>Total Price: <span id="totalPrices">&#8369;' + countTheSumPrice() + '</span></p>';
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
		}
	});
}

const createCartHistory = document.querySelector('checkout');
let productsCheckOut = [];

function updateProductsInPaymentStorage() { 
	for(let i=0; i<localStorage.length; i++) {
		let key = localStorage.key(i);
		let dateObj = new Date();
		let month = dateObj.getUTCMonth() + 1; //months from 1-12
		let day = dateObj.getUTCDate();
		let year = dateObj.getUTCFullYear();
		newdate = year + "/" + month + "/" + day;
		console.log(newdate);
		productsCheckOut += localStorage.setItem('paymentCard', localStorage.getItem(key));
	}
}


updateShoppingCartHTML();