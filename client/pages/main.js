import '../style.css';
import '../index.css';
import 'flowbite';
const userId = localStorage.getItem('id');
const token = localStorage.getItem('token');


export function init() {
  document.querySelector('#header-wrapper').innerHTML = `<header
  class=" w-full h-[80px] px-16 py-5 flex justify-between items-center shadow-sm  fixed left-0 top-0 bg-white border-b border-zinc-300 z-[100]"
  >
  <h1 class="w-30 text-center text-lg"><a href="/">멍뭉이들</a></h1>
  
  <div class="flex-1 mx-5">
    <input
      class="hidden w-full max-w-sm mx-auto border rounded-full py-2 px-4 outline-none md:block"
      type="text"
      placeholder="test"
    />
  </div>
  
  <div id="headerbtn">
   
  </div>
  </header>`;
 
const headerBtns = document.querySelector('#headerbtn');
if( localStorage.getItem('id') &&localStorage.getItem('token')){
  headerBtns.innerHTML =` 
      <ul class="flex gap-6">
          <li class="hover:text-gray-400">
            <a href="/mypage/">마이페이지</a>
          </li>
          <li class="hover:text-gray-400" id='logout'>
            <a href="">로그아웃</a>
          </li>
          <li class="hover:text-gray-400">
            <a href="/cart/">장바구니</a>
          </li>
        </ul>`
        const logoutbtn = document.getElementById('logout');

        logoutbtn.addEventListener('click',function(){
          localStorage.removeItem('id');
          localStorage.removeItem('token');
        })
      }else {
        headerBtns.innerHTML =` 
      <ul class="flex gap-6">
          <li class="hover:text-gray-400">
            <a href="/login/">로그인</a>
          </li>
          <li class="hover:text-gray-400">
            <a href="/signup/">회원가입</a>
          </li>
          <li class="hover:text-gray-400">
            <a href="/cart/">장바구니</a>
          </li>
        </ul>`
}

  document.querySelector('#footer').innerHTML = `<footer class='w-screen p-12 bg-gray-100 text-center bottom-0'>
  <ul>
    <li><p>copyright ⓒ 2023 All rights reserved by meungmung.</p></li>
    <li>
      <a href="">
      Contact : </a>
    </li>
  </ul>
</footer>`;
}

window.addEventListener('DOMContentLoaded', () => {
  init();

});

