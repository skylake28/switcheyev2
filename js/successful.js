let productsCheckOut = JSON.parse(localStorage.getItem('paymentCard')) || []; 
let buyerInfo = JSON.parse(localStorage.getItem('buyerInfo')); //for current buyer

function numberWithCommas(x) {

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

}

function getRandomArbitrary(min) {
    return Math.floor(Math.random() * min);
}

const countTheSumPrice = () => { // 4
	let sum = 0;
	productsCheckOut.forEach(item => {
		sum += item.price;
	});
	return sum;
}

const receipt = document.querySelector('.row2');
console.log(buyerInfo);
console.log(productsCheckOut);


receipt.innerHTML = `<p>Receipt Number: KODEGO` + getRandomArbitrary(10000) + `</p>`
            + `<p class="text-dark">Total Amount Paid: &#8369; <span class="text-success fw-bold">${numberWithCommas(countTheSumPrice())}</span>`
            + `<p class="text-dark">Paid by: ${buyerInfo.firstname} ${buyerInfo.lastname}</p>`
            + `<p class="text-dark">Phone number: ${buyerInfo.tel}</p>`
            + `<p class="text-dark">Email Adress: ${buyerInfo.email}</p>`
            + `<p class="text-dark">Shipping Address: ${buyerInfo.address}, ${buyerInfo.city}, ${buyerInfo.country}</p>`
            + `<p class="text-dark">For the Payment of:</p>`;


const receipt2 = document.querySelector('.customers');
for (let i = 0; i < productsCheckOut.length; i++) {
    const element = productsCheckOut[i];
    let result = `<tr>
                    <td>${element.name}</td>
                    <td>${element.count}</td>
                    <td>&#8369;${numberWithCommas(element.basePrice)}</td>
                    <td>&#8369;${numberWithCommas(element.price)}</td>
                </tr>`;
    receipt2.innerHTML += result; 
} 
