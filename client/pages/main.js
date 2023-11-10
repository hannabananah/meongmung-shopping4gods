import '../style.css';
import '../index.css';
import 'flowbite';
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem('token');
export function init() {
  document.querySelector('#header-wrapper').innerHTML = `<header
  class="w-full h-[80px] md:px-20 lg:px-42 px-20 py-4 pb-0 flex justify-between items-center shadow-sm  fixed left-0 top-0 bg-white bg-opacity-50  z-[100]"
  >
  <h1 class="mx-auto sm:mx-0 text-center text-lg"><a href="/"><img class='w-[180px]' src='/images/mngmng_logo.png'/></a></h1>
  

  

  <div id="headerbtn" class="hidden sm:block">
   
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
            <a href="/cart/">장바구니</a>
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
  ).innerHTML = `<footer class='overflow-x-hidden w-screen p-12 bg-gray-700 text-center bottom-0'>
  <ul class='text-white'>
    <li><p>copyright &copy; 2023 All rights reserved by meongmung.</p></li>
    <li>이메일: <a href="mailto:mngmng@gmail.com" class="hover:underline">mngmng@gmail.com</a></li>
    <li>찾아오시는 길: (04799) <a target="_blank" href="https://naver.me/Fcu63dOf" class="hover:underline">서울 성동구 아차산로17길 48 성수낙낙 2F 멍뭉랩</a></li>
    <li><img class='w-[180px]' src='/images/mngmng_logo.png'/></li>
    <li>대표자: 구기윤</li>
    <li>대표전화: <a href='tel:0904-1229' class="hover:underline">0904-1229</a></li>
    <li><a href="https://feather-ticket-ba0.notion.site/323b434b07974e65954916c97cffb840" class="font-bold">개인정보처리방침</a> | <a href="https://feather-ticket-ba0.notion.site/01d0159518f8499e993c8aafe2a811a0" class="hover:underline">이용약관</a></li>
    <li>Follow us on: <a href="https://twitter.com/yourwebsite" class="underline">Twitter</a> | <a href="https://facebook.com/yourwebsite" class="underline">Facebook</a></li>
    <li>FAQ: <a href="/faq" class="underline">Frequently Asked Questions</a></li>
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
