let productsInCart = JSON.parse(localStorage.getItem('shoppingCart')); //for current shopping cart
if(!productsInCart){
	productsInCart = [];
}

const createCartHistory = document.querySelector('.createCartHistory');
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
					</td>
					<td class="align-middle text-center">
						<p class="text-dark">&#8369;<span class="text-dark">${numberWithCommas(product.basePrice)}</span></p>
					</td>

					<td class="align-middle text-center">
						<div class="container-sm d-flex justify-content-center text-center">

							<button class="btn btn-primary button-minus btn-sm" data-id=${product.id}>-</button>
							<span class="mx-2 countOfProduct">${product.count}</span>
							<button class="btn btn-primary button-plus btn-sm" data-id=${product.id}>+</button>

						</div>
					<td class="align-middle text-center">
						<h6>&#8369;<span>${numberWithCommas(product.price)}</span></h6>
					</td>	

					<td class="align-middle text-center"><button class="btn btn-danger btn-sm removeSelectedCartItem" data-id=${product.id}>
						Remove</button>
					</td>
				</tr>`
		});

		parentElementCart.innerHTML =`<thead class="table-primary text-center">
										<tr>
											<th>Product Image</th>
											<th>Product Name</th>
											<th>Product Price</th>
											<th>Product Quantity</th>
											<th>Total Price</th>
											<th>Remove from Cart</th>
										</tr>
									</thead>` + 
									`<tbody>` + result.join(''); + //Displays/Join items on div with ID of #buyItems.
									`</tbody>`
		document.querySelector('.checkout').classList.remove('hidden');
		cartSumItem.innerHTML = countTotal(); //Displays total amount on div with class cart and p tag.
		cartSumItem2.innerHTML = countTotal();
		checkOuttTotalPrice.innerHTML = '<p class="text-dark">Total Price: <span class="text-dark" id="totalPrices">&#8369;' + numberWithCommas(countTheSumPrice()) + '</span></p>';
		updateProductsInPaymentStorage();
	}
	else {
		document.querySelector('.checkout').classList.add('hidden');
		parentElementCart.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>';
		cartSumItem.innerHTML = '';
		cartSumItem2.innerHTML = '';
		checkOutt
		
		
		
		
		Price.innerHTML = '';
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
			const productPrice = e.target.dataset.price;
			const productImage = products.querySelector('img').src;
			console.log(productPrice);
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
			updateProductsInPaymentStorage();
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
			updateProductsInPaymentStorage();
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
			updateProductsInPaymentStorage();
			updateShoppingCartReview();
		}
	});
}

function updateProductsInPaymentStorage() { 
	let productsCheckOut = [];
	for(let i=0; i<localStorage.length; i++) {
		let key = localStorage.key(i);
		if (key === "shoppingCart"){
			// console.log("okay");
		productsCheckOut += localStorage.setItem('paymentCard', localStorage.getItem(key));
		}
	}
}

updateShoppingCartHTML();
updateProductsInPaymentStorage();
