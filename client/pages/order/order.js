import '../../index.css';
import { init } from '../main.js';
import Swal from 'sweetalert2';

init();

let id = localStorage.getItem('id');
const token = localStorage.getItem('token');
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const addressBtn = document.getElementById('getAddress');
const addressNum = document.getElementById('addressNum');
const addressmain = document.getElementById('address');
const addressDetail = document.getElementById('addressDetail');
const selectAddress = document.getElementById('selectAddress');
let totalPrice =0 
let totalOrder =0;

const txtQuantity = document.getElementById('quantity');
const txtCost = document.getElementById('cost');
const txtTotal = document.getElementById('totalcost');

const name = document.getElementById('name');
const telnum = document.getElementById('telnum');

let addresses = [];
let addressid;
let products;

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
    id = data._id;
}


//장바구니/바로구매 상품 보여주기
const loadItem = () => {
   const orderlist = document.getElementById('order_list');
   
    products = JSON.parse(localStorage.getItem('cartList')); //장바구니 리스트로 변경해야 함
   if(localStorage.getItem('product')) {
     products = JSON.parse(localStorage.getItem('product'))
   }

   products.forEach((product) => {   
    const orderCard = document.createElement('div');
    orderCard.classList.add('product-card');
    orderCard.innerHTML = 
    `<table class="w-full h-full">
    <tr class='w-full border-b-2 items-center border-gray-100 flex pb-2'>
        <td class='items-center place-content-start '> 
        <img class='w-32 rounded-md border-2 border-gray-50 p-3' src='${product.imgUrl}' alt = '${product.imgUrl}'/> </td>
        <td><p class='text-sm text-gray-600'>${product.name} X ${product.order}개 </p><p class='font-semibold'>${product.price}원 </p></td>
        </tr> 
    </table>`

    if (orderlist) {
        orderlist.appendChild(orderCard);
      }

    totalPrice += product.price * product.order;
    totalOrder += product.order * 1;
})    
    txtCost.innerHTML = totalPrice;
    txtQuantity.innerHTML = totalOrder;
    txtTotal.innerHTML = totalPrice;
}


const loadAddress = () =>{

  const selectAddress = document.getElementById('selectAddress');
  
  let inputhtml = `<option value='none' class='text-gray-500'>직접 입력</option>`
  addresses.forEach((address) => {   
    inputhtml +=`<option value='${address._id}' id ='' class='text-gray-500'>${address.name}</option>`
})
if(selectAddress) {selectAddress.innerHTML = inputhtml}
}

//daum 주소 입력받기
addressBtn.addEventListener('click', function() {
  new daum.Postcode({
      oncomplete: function(data) {
          addressNum.value = data.zonecode;    
          addressmain.value = data.address;
          addressDetail.readOnly = false;
          selectAddress.value = 'none';

      }
  }).open();
})

selectAddress.addEventListener('change', function(){
      if(selectAddress.value!='none'){let address = addresses.find(e=>e._id === selectAddress.value)
      console.log(address)
      addressNum.value = address.zipCode;    
      addressmain.value = address.name;
      addressDetail.value = address.detailAddress
      addressDetail.readOnly = true;
    }
      else{
        addressDetail.readOnly = false;
      }
})


//결제하기api
const postOrder = () => {
  let postProducts =[];
    products.forEach(element => {
      let product = {
        product: element.id,
        quantity: element.order
      }
      postProducts.push(product)
    });

    fetch(`${API_BASE_URL}/orders` , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        body: JSON.stringify({
          totalPrice: totalPrice,
          userId: id,
          products: postProducts,
          address: addressid
        }),
      })
        .then((response) => response.json())
        .then((data) => {
            if(data.status ===201)
            {  
              new Swal('주문이 완료되었습니다!', '', 'success').then(() => {
            location.href="/order/success/";
        });}
        })
        .catch(error => console.log(error));
}


//결제하기api
const postAddress = () => {
  fetch(`${API_BASE_URL}/addresses` , {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      body: JSON.stringify({
        userId: id,
        recipient: name.value,
        name : addressmain.value,
        zipCode:addressNum.value,
        detailAddress:addressDetail.value,
        phone: telnum.value,

      }),
    })
      .then((response) => response.json())
      .then((data) => {
        addressid = data.address._id;
        console.log(data)
        console.log(addressid)
        postOrder();
       // console.log(localStorage.getItem('token'));
      })
      .catch(error => console.log(error));
}

const getAddress = () => {
  fetch(`${API_BASE_URL}/addresses` , {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
    })
      .then((response) => response.json())
      .then((data) => {
        
        if(data.addresses){
          addresses= data.addresses;
          loadAddress();}
       // console.log(localStorage.getItem('token'));
      })
      .catch(error => console.log(error));
}





const btnSubmit = document.querySelector('form');
btnSubmit.addEventListener('submit', function(e){
    e.preventDefault();
    if(selectAddress.value === 'none' ) postAddress();
    else {
      addressid = selectAddress.value;
      postOrder(); 
    }
  if(localStorage.getItem('product')) {localStorage.removeItem('product');} //바로구매 초기화
  else  localStorage.removeItem('cartList'); //바로구매 초기화
})



window.addEventListener('DOMContentLoaded', () => {
    loadItem();
    getUser();
    getAddress();
  });