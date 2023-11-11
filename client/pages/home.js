import '../index.css';
import { init } from '/main.js';
import 'flowbite';
import { totalCartCount } from './cart/cart';
import Swal from 'sweetalert2';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
let api = `${API_BASE_URL}/products/`;
const dog = localStorage.getItem('dog');
const token = localStorage.getItem('token');

const all = document.getElementById('all');
const recommend = document.getElementById('recommendlabel');

const params = location.search;

const param = new URLSearchParams(params);
const page = param.get('page'); // 5

const getDog = async () => {
  return fetch(`${API_BASE_URL}/dogs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
};

function renderProducts(data) {
  const productList = document.getElementById('product-list');
  //TODO 카테고리 버튼 누를때마다 바뀌어야 되니까 초기화코드 추가해야함

  while (productList.hasChildNodes()) {
    productList.removeChild(productList.firstChild);
  }
  const products = data; // JSON 데이터에서 제품 목록을 가져옴

  // 가져온 데이터를 사용하여 동적으로 제품 목록 생성
  if (products < 1) {
    productList.innerHTML += `<p class='text-lg text-center text-gray-500 font-bold py-10'>상품 준비중입니다...</p>`;
  }
  products.forEach((product) => {
    // 제품 항목을 생성하고 추가하는 코드
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
          <div id="product-${
            product._id
          }" class="relative overflow-hidden rounded-md">
            <img class="bg-white object-cover w-full lg:h-[380px] md:h-[300px] sm:h-[380px] cursor-pointer lg:hover:scale-105 transition-transform ease-in-out duration-500" 
            src="${product.img_url}" alt="${product.img_url}" />
            <div class='px-2 pb-8'>
            <p class="text-lg text-gray-500 mt-4">${product.name}</p>

            
            <div class="flex items-center justify-between ">
            <span class="text-gray-900 font-bold text-3xl">${product.price.toLocaleString()}원</span>
            <button class ="cart-add" id="cart-${
              product._id
            }"><img class="w-[30px]" src="/images/cart.svg"/></button>
            </div>
            </div>
          `;
    if (productList) {
      productList.appendChild(productCard);
    }
    const card = document.querySelector(`#product-${product._id}`);
    card.addEventListener('click', function () {
      location.href = `/detail/?id=${product._id}`;
    });

    // 모든 장바구니 버튼에 클릭 핸들러를 추가
    const cartbtn = document.querySelector(`#cart-${product._id}`);

    cartbtn.addEventListener('click', function (e) {
      e.stopPropagation();

      buttonClickHandler(product);
    });
  });
}

function renderPages(datalen) {
  const pagelist = document.getElementById('pages');
  let puthtml = '';
  if (datalen > 1) {
    for (let i = 1; i <= datalen; i++) {
      puthtml += `<div><input type='radio' id='${i}' name= 'page' class='hidden peer' value = '${i}'><label for='${i}' id='page' name='${i}' class='p-3 peer-checked:text-teal-600 cursor-pointer peer-checked:font-bold peer-checked:border-b-2'>${i}</label></input></div>`;
    }
  }
  if (pagelist) pagelist.innerHTML = puthtml;
  if (datalen > 1) {
    const pages = document.querySelectorAll('#page');
    if (page) {
      pages[page - 1].parentNode.firstChild.checked = true;
    } else pages[0].parentNode.firstChild.checked = true;
    pages.forEach((page) => {
      page.addEventListener('click', function (e) {
        location = `?page=${e.target.innerHTML}`;
      });
    });
  }
}

const renderCategories= async(data)=> {
  const categoryList = document.getElementById('category-list');
  const res = await getDog();

  if (token && res.dogs.length >0) {
    recommend.style.display = 'block';
  }
  const categories = data.list; // JSON 데이터에서 제품 목록을 가져옴

  // 가져온 데이터를 사용하여 동적으로 제품 목록 생성
  categories.forEach((category) => {
    // 제품 항목을 생성하고 추가하는 코드
    const categoryCard = document.createElement('div');
    categoryCard.classList.add('category-card');
    categoryCard.innerHTML = `

        <input type='radio' id = 'category-${category._id}' name = 'buttons'
        class="hidden peer">
        <label for="category-${category._id}" class="border-l inline-flex items-center justify-between  px-6 my-4 text-lg text-gray-500 bg-white cursor-pointer  peer-checked:text-teal-600 peer-checked:font-bold  hover:font-bold text-teal-600">
     ${category.name}</label></input> `;

    if (categoryList) {
      categoryList.appendChild(categoryCard);
    }
    const btnCategory = document.querySelector(`#category-${category._id}`);
    btnCategory.addEventListener('click', function () {
      getProducts(`${API_BASE_URL}/categories/${category.name}/products`);
    });
    categories[categories.length - 1];
  });
}

const getProducts = (api) => {
  fetch(api, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      renderProducts(data.products);
      renderPages(data.totalPages);
    })
    .catch((error) => console.log(error));
};

const getCategories = () => {
  fetch(`${API_BASE_URL}/categories/`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      // if(token && (dog !== "0")) recommend.style.display = 'block';
      renderCategories(data);
    })
    .catch((error) => console.log(error));
};

all.addEventListener('click', function () {
  getProducts(api + `?page=${page}?perPage=${page}`);
});

recommend.addEventListener('click', function () {
  getRecommend();
});

const getRecommend = () => {
  fetch(`${API_BASE_URL}/categories/recommends`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 200) {
        renderProducts(data.recommends);
        renderPages(data.totalPages);
      }
    })
    .catch((error) => console.log(error));
};

// 모든 장바구니 버튼에 대한 클릭 핸들러
const buttonClickHandler = function (data) {
  const selectedProduct = {
    id: data._id,
    name: data.name,
    order: 0,
    imgUrl: data.img_url,
    price: data.price,
  };

  // 이미 장바구니에 있는 상품인지 확인
  if (saveCartGoods.some((product) => product.id === selectedProduct.id)) {
    showAlert('장바구니에 있는 상품입니다.');
  } else {
    showAlert('장바구니에 담았습니다.', true);
    selectedProduct.order = 1;
    saveCartGoods.push(selectedProduct);
  }
  // 장바구니 정보를 localStorage에 업데이트
  localStorage.setItem('cartList', JSON.stringify(saveCartGoods));
  // saveCart(saveCartGoods);
};

// 알림 띄우기
const showAlert = (message, success) => {
  let icon = 'warning';

  if (success) {
    icon = 'success';
  }

  // Using SweetAlert2
  Swal.fire({
    text: message,
    icon: icon,
    timer: 1500,
    showConfirmButton: false,
  });
};

// localStorage에 기본 장바구니 정보를 저장
export function saveCart() {
  localStorage.setItem('cartList', JSON.stringify(saveCartGoods));
  location.href = '/cart/';
}

export let saveCartGoods = localStorage.getItem('cartList')
  ? JSON.parse(localStorage.getItem('cartList'))
  : [];

totalCartCount;

window.addEventListener('DOMContentLoaded', () => {
  init();
  getProducts(api + `?page=${page}?perPage=${page}`);
  getCategories();
});


