import '../../index.css';
import { init } from '../main.js';
import Swal from 'sweetalert2';

init();

const token = localStorage.getItem('token');
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const addressBtn = document.getElementById('getAddress');
const addressNum = document.getElementById('addressNum');
const address = document.getElementById('address');
const selectAddress = document.getElementById('selectAddress');


const txtQuantity = document.getElementById('quantity');
const txtCost = document.getElementById('cost');
const txtTotal = document.getElementById('totalcost');

const name = document.getElementById('name');
const telnum = document.getElementById('telnum');

const getUser = () => {
    fetch(`${API_BASE_URL}/users/me` , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.status === 200)
        { console.log(data)
            loadUser(data)}
      });
  };

  const loadUser = (data) =>{
    //TODO 화면세팅
    const user = data.user;
    name.value = user.name;
    telnum.value = user.phone;
    if(user.address)
    addressBtn.style.display ="none";
   
    else
    selectAddress.style.display = "none";
    
}


//장바구니/바로구매 상품 보여주기
const loadItem = () => {
   const orderlist = document.getElementById('order_list');
   
   let products = JSON.parse(localStorage.getItem('cart')); //장바구니 리스트로 변경해야 함
   if(localStorage.getItem('product')) {
     products = JSON.parse(localStorage.getItem('product'))
   }

   products.forEach((product) => {   
    console.log(product.id);
    const orderCard = document.createElement('div');
    orderCard.classList.add('product-card');
    orderCard.innerHTML = 
    `<table class="w-full h-full">
    <tr class='w-full border-b-2 items-center border-gray-100 flex pb-2'>
        <td class='items-center place-content-start '> 
        <img class='w-32 rounded-md border-2 border-gray-50 p-3' src='${product.imgUrl}' alt = '${product.imgUrl}'/> </td>
        <td><p class='text-sm text-gray-600'>${product.name} X ${product.quantity}개 </p><p class='font-semibold'>${product.cost}원 </p></td>
        </tr> 
    </table>`

    if (orderlist) {
        orderlist.appendChild(orderCard);
      }

    txtTotal.innerHTML = product.cost;
    txtCost.innerHTML =product.cost;
    txtQuantity.innerHTML = product.quantity;
})
}


//daum 주소 입력받기
addressBtn.addEventListener('click', function() {
    new daum.Postcode({
        oncomplete: function(data) {
            addressNum.value = data.zonecode;    
            address.value = data.address;

        }
    }).open();
})


//결제하기api
const postOrder = () => {
    fetch(`${API_BASE_URL}/orders` , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        body: JSON.stringify({
            
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          
         // console.log(data)
         // console.log(localStorage.getItem('token'));
    
          new Swal('주문이 완료되었습니다!', '', 'success').then(() => {
            location.href="/";
        });
        })
        .catch(error => console.log(error));
}


const btnSubmit = document.getElementById('submit');
btnSubmit.addEventListener('submit', function(e){
    e.preventDefault();
    postOrder();
    localStorage.removeItem('product'); //바로구매 초기화
})



window.addEventListener('DOMContentLoaded', () => {
    loadItem();
    getUser();
  });