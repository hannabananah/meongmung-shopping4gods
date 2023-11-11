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
  if (pswd.value !== pswdCfm.value) pswdMsg.style.display = 'block';
  else postUser();
});

const postUser = () => {
  fetch(`${API_BASE_URL}/auth/signup`, {
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
      if (!data.status) {
        //
        new Swal('회원가입 완료', '반갑습니다!', 'success').then(() => {
          location.href = '/login/';
        });
      } else {
        new Swal('다시 시도해주세요', data.message, 'warning').then(() => {});
      }
    })
    .catch((error) => console.error(error));
};

telnum.addEventListener('keyup', function (e) {
  let x = e.target.value
    .replace(/\D/g, '')
    .match(/(\d{0,3})(\d{0,4})(\d{0,4})/);
  e.target.value = !x[2] ? x[1] : `${x[1]}-${x[2]}${x[3] ? `-${x[3]}` : ''}`;
});
