import '../../index.css';
import { init } from '../main.js';
import Swal from 'sweetalert2';
import { totalCartCount } from '/cart/cart';

init();

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const img = document.getElementById('img');
const txtname = document.getElementById('productName');
const txtcost = document.getElementById('cost');
const detail = document.getElementById('detail');
let product;

const id_query = new URLSearchParams(location.search).get("id"); //querystring으로 상품아이디 받아옴


const getProduct= ()=> {
    fetch(`${API_BASE_URL}/products/${id_query}` , {
      method: 'GET',
    })
      .then((response) => 
        response.json())
      .then((data) => {
      
        loadItem(data);
        product = {
          id: data._id,
          name : data.name,
          order: target.value,
          imgUrl: data.img_url, //img.src로 하면 안돼서 일단 이렇게..
          price : data.price
      }
      
      })
      .catch(error => console.log(error));
  }
  
const loadItem =(data) =>{
    img.src = data.img_url;
    img.alt = data.img_url;
    txtname.innerHTML = data.name;
    txtcost.innerHTML = data.price.toLocaleString();
    detail.innerHTML = data.desc
}
  
getProduct();
//수량 counter
const target = document.getElementById('input');
let value = Number(target.value);
const decrementButtons = document.getElementById('decrease');
const incrementButtons = document.getElementById('increase');

decrementButtons.addEventListener("click", function() {
    if(value > 1)
    {value--;}
    target.value = value;
    }
);
incrementButtons.addEventListener("click", function() {  

    value++;
    target.value = value;
});

//이동
const cartbtn = document.getElementById('cartbtn');
const buybtn = document.getElementById('buybtn');

cartbtn.addEventListener("click", function(){
  // 모든 장바구니 버튼에 대한 클릭 핸들러
  let selectedProduct = product;
 

  // 이미 장바구니에 있는 상품인지 확인
  if (saveCartGoods.some((product) => product.id === selectedProduct.id)) {
    
    alert('장바구니에 있는 상품입니다.');
  } else {
    alert('장바구니에 담았습니다.');
    selectedProduct.order = target.value;
    saveCartGoods.push(selectedProduct);

  }
  // 장바구니 정보를 localStorage에 업데이트
  localStorage.setItem('cartList', JSON.stringify(saveCartGoods));
  saveCart(saveCartGoods);
 


    new Swal('장바구니에 담겼습니다', '', 'success').then(() => {
        location.href = '/cart/';
      });
})

buybtn.addEventListener("click", function(){
    product.order = target.value;
  
    let productlist = [];
    productlist.push(product);
  
    localStorage.setItem('product',JSON.stringify(productlist));
    location.href = '/order/?buy=1';
})


export function saveCart() {
  localStorage.setItem('cartList', JSON.stringify(saveCartGoods));
  location.href = '/cart/';
}

export let saveCartGoods = localStorage.getItem('cartList')
  ? JSON.parse(localStorage.getItem('cartList'))
  : [];

totalCartCount;