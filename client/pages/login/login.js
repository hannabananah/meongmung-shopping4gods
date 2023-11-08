import '../../index.css';
import { init } from '../main.js';
import Swal from 'sweetalert2';

init();

const loginbtn = document.querySelector('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const loginUser = () =>  {
    fetch(`${API_BASE_URL}/auth/login`, {  //요청url
    method: 'POST', //이용 메서드
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({
        email: email.value,
        password: password.value,
    }),
  })
    .then((response) => response.json())  //상태
    .then((data) => {
       
       if(!data.status){ 
        
        localStorage.setItem('id', email.value);
        localStorage.setItem('token', data.token);
        console.log(localStorage.getItem('token')); 

        new Swal('로그인 완료', '반갑습니다!', 'success').then(() => {
            location.href="/";
        });}
        else{
    new Swal('다시 시도해주세요', data.message,  'warning').then(() => {  
  });}
    })
    .catch(error => console.log(error));  //에러캐치
}

loginbtn.addEventListener('submit', function(e){
    e.preventDefault();
    loginUser();
})