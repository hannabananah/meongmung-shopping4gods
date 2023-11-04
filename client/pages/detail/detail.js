import '../../index.css';
import { init } from '../main.js';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'

init();

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
    //이미 장바구니에 있을 경우 예외처리
    // swal('잠시만요', '이미 장바구니에 추가되어 있습니다', 'warning').then(() => {
    //     // location.href = '../cart/';
    //    });
    new Swal('장바구니에 담겼습니다', '', 'success').then(() => {
        location.href = '/cart/';
      });
})

buybtn.addEventListener("click", function(){
    location.href = '/order/';
})