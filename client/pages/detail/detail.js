import '../../index.css';
import { init } from '../main.js';
import Swal from 'sweetalert2';

init();

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const img = document.getElementById('img');
const txtname = document.getElementById('productName');
const txtcost = document.getElementById('cost');
let data;

const id_query = new URLSearchParams(location.search).get("id"); //querystring으로 상품아이디 받아옴
console.log(id_query);

const getProduct= ()=> {
    fetch(`${API_BASE_URL}/products/${id_query}` , {
      method: 'GET',
    })
      .then((response) => 
        response.json())
      .then((data) => {
        console.log(data);
        loadItem(data);
      })
      .catch(error => console.log(error));
  }
  
const loadItem =(data) =>{
    img.src = data.img_url;
    img.alt = data.img_url;
    txtname.value = data._id;
    txtname.innerHTML = data.name;
    txtcost.innerHTML = data.price;
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
    console.log(value);
    value++;
    target.value = value;
});

//이동
const cartbtn = document.getElementById('cartbtn');
const buybtn = document.getElementById('buybtn');

cartbtn.addEventListener("click", function(){
    localStorage.getItem('cart');
    //이미 장바구니에 있을 경우 예외처리
    // swal('잠시만요', '이미 장바구니에 추가되어 있습니다', 'warning').then(() => {
    //     // location.href = '../cart/';
    //    });
    let product ={
        id : product.id,
      //  name: ,
        quantity: target.value,
    //    imgUrl:
    }
    localStorage.setItem('cart', product);
    new Swal('장바구니에 담겼습니다', '', 'success').then(() => {
        location.href = '/cart/';
      });
})

buybtn.addEventListener("click", function(){
    const buynow = [{
        name : txtname.innerHTML,
        quantity: target.value,
        imgUrl: img.alt, //img.src로 하면 안돼서 일단 이렇게..
        cost : txtcost.innerHTML * target.value
    }]
    console.log(JSON.stringify(buynow));
    localStorage.setItem('product',JSON.stringify(buynow));
    location.href = '/order/?now=1';
})