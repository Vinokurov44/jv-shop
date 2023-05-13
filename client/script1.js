//buy page


const selectedProducts=localStorage.getItem('producArr')
let totalPrice=localStorage.getItem('priceArr');
let totalProd=localStorage.getItem('totalProd');
let email=localStorage.getItem('email')

let taxes=totalPrice/10;
let final=0;
 final=+totalPrice+10+taxes
console.log(final)

const totalContainer= document.getElementById('total');
const priceContainer= document.getElementById('price');
const purchaseContainer= document.getElementById('purchase');
const taxe = document.getElementById('taxes');
const total = document.getElementById('total1');
priceContainer.innerHTML=final+' ILS';
totalContainer.innerHTML=totalProd;
purchaseContainer.innerHTML=totalPrice+' ILS';
taxe.innerHTML=taxes+' ILS'
total.innerHTML=final+' ILS';

const container=document.getElementById('container2');

 




function submitOrder() {
    fetch('/buy', {
        headers: {
          'Content-Type': 'application/json'
        },
      method: 'post',
      body: JSON.stringify({
        email:email,
        productsName: selectedProducts
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message == 'success') {
          alert('Order placed successfully!');
          window.location.href='/signin'
        } else {
          alert('Error placing order.');
        }
      });
  }






