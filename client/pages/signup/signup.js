import '../../index.css';
import { init } from '../main.js';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

init();
const name = document.getElementById('name');
const telnum = document.getElementById('telnum');
const email = document.getElementById('email');
const pswd = document.getElementById('password');

const btn = document.querySelector('form');
let phone = '';

btn.addEventListener('submit', function (e) {
  e.preventDefault();
  
  postUser();

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
      
      console.log(data)
      
      localStorage.setItem('token', data.token);
      console.log(localStorage.getItem('token'));

      new Swal('회원가입 완료', '반갑습니다!', 'success').then(() => {
        location.href="/login/";
    });
    });
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
