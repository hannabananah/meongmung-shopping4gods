import '../style.css';
import '../index.css';
import 'flowbite';


export function init() {
  document.querySelector('#header-wrapper').innerHTML = `<header
  class=" w-full h-[80px] px-20 py-5 flex justify-between items-center shadow-sm  fixed left-0 top-0 bg-white border-b border-zinc-300 z-[100]"
  >
  <h1 class="w-30 text-center text-lg"><a href="/">멍뭉이들</a></h1>
  
  <div class="flex-1 mx-5">
    <input
      class="hidden w-full max-w-sm mx-auto border rounded-full py-2 px-4 outline-none md:block"
      type="text"
      placeholder="test"
    />
  </div>
  
  <div class="">
    <ul class="flex gap-10">
      <li class="hover:text-gray-400">
        <a href="/login/">로그인</a>
      </li>
      <li class="hover:text-gray-400">
        <a href="/signup/">회원가입</a>
      </li>
      <li class="hover:text-gray-400">
        <a href="/cart/">장바구니</a>
      </li>
    </ul>
  </div>
  </header>`;

  document.querySelector('#footer').innerHTML = `<footer class='w-screen p-12 bg-gray-200 text-center bottom-0'>
  <ul>
    <li><p>copyright ⓒ 2023 All rights reserved by meungmung.</p></li>
    <li>
      <a href="">
      Contact : </a>
    </li>
  </ul>
</footer>`
;
}


window.addEventListener('DOMContentLoaded', () => {
  init();
});

export function renderProducts(data) {
  const productList = document.getElementById('product-list');
  //TODO 카테고리 버튼 누를때마다 바뀌어야 되니까 초기화코드 추가해야함

  const products = data.productList; // JSON 데이터에서 제품 목록을 가져옴

  // 가져온 데이터를 사용하여 동적으로 제품 목록 생성
  products.forEach((product) => {
    // 제품 항목을 생성하고 추가하는 코드
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
    <div class="bg-white rounded-lg shadow p-8" id="product-${product._id}">
    <div class="relative overflow-hidden">
          <img class="object-cover w-full h-60" 
          src="${product.img_url}" alt="${product.img_url}" />
          <p class="text-lg text-gray-500 mt-4">${product.name}</p>
          <div class="flex items-center justify-between ">
          <span class="text-gray-900 font-bold text-2xl">${product.price}원</span>
          <img src="/images/cart.svg" id="cart-${product._id}"></img>
          </div>
          </div>
        `;
    if (productList) {
      productList.appendChild(productCard);
    }
    const card = document.querySelector(`#product-${product._id}`)
    card.addEventListener('click',function(){
      location.href = `/detail/?id=${product._id}`;
    })
  });
}

export function renderCategories(data) {
  const categoryList = document.getElementById('category-list');

  const categories = data.message; // JSON 데이터에서 제품 목록을 가져옴
  console.log(data.message);
  // 가져온 데이터를 사용하여 동적으로 제품 목록 생성
  categories.forEach((categories) => {
    // 제품 항목을 생성하고 추가하는 코드
      const categoryCard = document.createElement('div');
      categoryCard.classList.add('category-card');
      categoryCard.innerHTML = `
      <input type='radio' id = 'category-${categories._id}' name = 'buttons'
      class="hidden peer">
      <label for="category-${categories._id}" class="inline-flex items-center justify-between w-full p-4 text-lg text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
   ${categories.name}</label></input> `;
    
      if (categoryList) {
        categoryList.appendChild(categoryCard);
      }
      const btnCategory = document.querySelector(`#category-${categories._id}`)
      btnCategory.addEventListener('click',function(){
        
        console.log(categories.name);
        //api 왠지 안됨
     //   getProducts(`${api}${categories.name}/products`)
      })
  });
}



const API_BASE_URL = import.meta.env.VITE_BASE_URL;
let api = `${API_BASE_URL}/products/`;

const getProducts= (api)=> {
  fetch(api , {
    method: 'GET',
  })
    .then((response) => 
      response.json())
    .then((data) => {
      console.log(data);
      renderProducts(data);
    })
    .catch(error => console.log(error));
}


const getCategories= ()=> {
  fetch(`${API_BASE_URL}/categories/` , {
    method: 'GET',
  })
    .then((response) => 
      response.json())
    .then((data) => {
      console.log(data);
      renderCategories(data);
    })
    .catch(error => console.log(error));
}

getProducts(api);
getCategories();