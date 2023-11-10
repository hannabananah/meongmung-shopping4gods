import '../style.css';
import '../index.css';
import 'flowbite';
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem('token');
export function init() {
  document.querySelector('#header-wrapper').innerHTML = `<header
  class="w-full h-[80px] lg:px-42 px-32 py-4 pb-0 flex justify-between items-center shadow-sm  fixed left-0 top-0 bg-white bg-opacity-50  z-[100]"
  >
  <h1 class="text-center text-lg"><a href="/"><img class='w-[180px]' src='/images/mngmng_logo.png'/></a></h1>
  

  

  <div id="headerbtn">
   
 </div>
  </header>`;

  const headerBtns = document.querySelector('#headerbtn');
  if (localStorage.getItem('id') && localStorage.getItem('token')) {
    headerBtns.innerHTML = ` 
      <ul class="flex gap-6">
          <li class="hover:text-gray-400" id='mypage'>
            <a href="#" >마이페이지</a>
          </li>
          <li class="hover:text-gray-400" id='logout'>
            <a href="#">로그아웃</a>
          </li>
          <li class="hover:text-gray-400">
            <a href="/cart/"><img src='/images/cart.svg'/></a>
          </li>
        </ul>`;
    const logoutbtn = document.getElementById('logout');
    const mypagebtn = document.getElementById('mypage');

    mypagebtn.addEventListener('click', function (e) {
      e.preventDefault();
      me().then((data) => {
        if (data.user.isAdmin) {
          location.href = '/admin-mypage/';
        } else {
          location.href = '/mypage/';
        }
      });
    });

    logoutbtn.addEventListener('click', function () {
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      location.href = '/';
    });
  } else {
    headerBtns.innerHTML = ` 
      <ul class="flex gap-7">
          <li class="hover:text-gray-400">
            <a href="/login/">로그인</a>
          </li>
          <li class="hover:text-gray-400">
            <a href="/signup/">회원가입</a>
          </li>
          <li class="hover:text-gray-400">
            <a href="/cart/">장바구니</a>
          </li>
        </ul>`;
  }

  document.querySelector(
    '#footer',
  ).innerHTML = `<footer class='w-screen p-24 bg-gray-100 text-center bottom-0'>
  <ul>
    <li><p>copyright ⓒ 2023 All rights reserved by meungmung.</p></li>
  </ul>
</footer>`;
}

window.addEventListener('DOMContentLoaded', () => {
  init();
});

async function me() {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}
