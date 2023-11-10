import '../../index.css';
import { init } from '../main.js';
import Swal from 'sweetalert2';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

init();
const name = document.getElementById('name');
const telnum = document.getElementById('telnum');
const email = document.getElementById('email');
const pswd = document.getElementById('password');
const pswdCfm = document.getElementById('confirm-password');
const pswdMsg = document.getElementById('pswdmessage');
const btn = document.querySelector('form');


btn.addEventListener('submit', function (e) {
  e.preventDefault();
  if(pswd.value !== pswdCfm.value) pswdMsg.style.display ='block'
  else postUser();

});

const postUser = () => {
  fetch(`${API_BASE_URL}/auth/signup` , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: pswd.value,
      phone: telnum.value,
      name: name.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
   
     if(!data.status){ 
     // 
      new Swal('회원가입 완료', '반갑습니다!', 'success').then(() => {
        location.href="/login/";
    });
  }else{
    new Swal('다시 시도해주세요', data.message,  'warning').then(() => {  
  });
  }
    })
    .catch(error => console.log(error));;
};

// 숫자가 아닌 정규식
let replaceNotInt = /[^0-9]/gi;
const form = document.getElementById('telnumform');

telnum.addEventListener('keyup', function () {
  telnum.value = telnum.value.replace(replaceNotInt, '');
});

telnum.addEventListener('focusout', function () {
  if (telnum.value) {
    if (telnum.value.match(replaceNotInt)) {
      telnum.value = telnum.value.replace(replaceNotInt, '');
    }
  }
});
