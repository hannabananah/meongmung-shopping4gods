import '../../index.css';
import { init } from '../main.js';
import Swal from 'sweetalert2';

init();

const cartContainer = document.querySelector('.cart-container');
const cartTotalPrice = document.querySelector('.total-price');
const cartBox = document.querySelector('.cart-container-box');
const cartEmpty = document.querySelector('.empty');
const deleteAll = document.querySelector('#deleteAll');
const orderBtn = document.querySelector('#order-btn');
let saveCartGoods = localStorage.getItem('cartList')
  ? JSON.parse(localStorage.getItem('cartList'))
  : [];

if (orderBtn) {
  orderBtn.addEventListener('click', () => {
    const cartList = localStorage.getItem('cartList');
    const totalPrice = document.querySelector('.total-price');

    if (cartList === null || totalPrice.innerText === '0') {
      new Swal('주문 불가', `장바구니에 담긴 상품이 없습니다.`, 'warning');
    } else {
      location.href = '/order/';
    }
  });
}

function cartCreateHTML(product, i) {
  return `
    <div class="flex border-t border-gray-300 items-center pt-2">
    <div class=" w-3/6 py-2 ">
      <div class="flex items-center">
        <div class="w-1/3">
            <a href="#">
              <img
                src="${product.imgUrl}"
                alt="${product.name}"
                class="md:h-24 md:w-24 "
              />
            </a>
        </div>
        <div class="w-full px-4">
          <h2 class="mb-2 text-xl font-bold">
            <a
              href="#"
              class="text-lg font-bold hover:text-gray-400"
              >${product.name}</a
            >
          </h2>
         <button
         class="item-remove text-gray-500 hover:text-gray-400"
          id="${i}"
        >
          삭제
        </button>
        
        </div>
      </div>
    </div>
    <div class="w-2/12">
      <p class="text-lg text-center font-bold text-slate-800">${product.price.toLocaleString()}</p>
    </div>
    <div class="custom-number-input w-2/12 text-center">
          <button
            class="count-minus py-2 hover:text-gray-700"
            data-value="minus"
            id=${i}
          >
          <span class="m-auto text-2xl font">−</span>
          </button>
          <input
            type="number"
            class="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none 
            count w-10 px-1 py-1 items-center text-center border-1 rounded-md bg-gray-50"
            value=${product.order}
          />
          <button
            class="count-plus py-2 hover:text-gray-700"
            data-value="plus"
            id=${i}
          >
          <span class="m-auto text-2xl font">+</span>
          </button>
          </div>
    <div class="text-center  w-2/12">
      <p class="single-total-price text-lg font-bold text-slate-800">
        ${(product.price * product.order).toLocaleString()}
      </p>
    </div>
  </div>
 `;
}

if (deleteAll) {
  deleteAll.addEventListener('click', function () {
    localStorage.removeItem('cartList');

    while (cartContainer.hasChildNodes()) {
      cartContainer.removeChild(cartContainer.firstChild);
    }
    cartEmpty.classList.remove('hidden');
    cartBox.remove('hidden');
  });
}

//total price
function totalPrice() {
  const priceBox = saveCartGoods.reduce((prev, curr) => {
    return prev + curr.price * curr.order;
  }, 0);
  if (cartTotalPrice) {
    cartTotalPrice.innerHTML = priceBox.toLocaleString();
  }
  const totalcosts = document.querySelectorAll('.total-price');
  totalcosts.forEach((totalCost) => {
    totalCost.innerHTML = priceBox.toLocaleString();
    if (saveCartGoods.length === 0) {
      totalCost.innerHTML = 0;
    }
  });
}
window.addEventListener('load', totalPrice);

//cart total number of goods
export function totalCartCount() {
  const countBox = saveCartGoods.reduce((prev, curr) => {
    return prev + curr.order * 1;
  }, 0);
  const totalCounts = document.querySelectorAll('.top-cart-count');
  totalCounts.forEach((totalCount) => {
    totalCount.innerHTML = countBox;
    if (saveCartGoods.length === 0) {
      totalCount.innerHTML = 0;
    }
  });
}

window.addEventListener('load', totalCartCount);

// cart-page paint
export function paintCartPage() {
  let i = 0;
  const loadCartGoods = localStorage.getItem('cartList');

  if (localStorage.getItem('cartList') === null) {
    return;
  }

  if (cartContainer !== null) {
    cartContainer.innerHTML = JSON.parse(loadCartGoods)
      .map((product) => cartCreateHTML(product, i++))
      .join('');
    if (cartContainer.children.length !== 0) {
      cartEmpty.classList.add('hidden');
      cartBox.classList.remove('hidden');
    }
  }
  totalPrice();
}

window.addEventListener('load', paintCartPage);

//save cart
export function saveCart(saveCartGoods) {
  localStorage.setItem('cartList', JSON.stringify(saveCartGoods));
}

// 모든 장바구니 버튼에 대한 클릭 핸들러
export const buttonClickHandler = function (e) {
  // 클릭한 버튼의 데이터(product-id)를 가져옴
  e.stopPropagation();

  const productId = e.target.dataset.productId;

  // 해당 제품을 찾아냄

  const selectedProduct = data.goods.find(
    (product) => product.id === parseInt(productId),
  );

  // 이미 장바구니에 있는 상품인지 확인
  if (saveCartGoods.some((product) => product.id === selectedProduct.id)) {
    alert('장바구니에 있는 상품입니다.');
  } else {
    alert('장바구니에 담았습니다.');
    selectedProduct.cart = true;
    selectedProduct.order = 1;
    saveCartGoods.push(selectedProduct);
  }
  // 장바구니 정보를 localStorage에 업데이트
  localStorage.setItem('cartList', JSON.stringify(saveCartGoods));
  saveCart(saveCartGoods);
  totalCartCount();
  totalPrice();
};

// 모든 장바구니 버튼에 클릭 핸들러를 추가
export const cartbtns = document.querySelectorAll('cart-add');
cartbtns.forEach((cartbtn) => {
  cartbtn.addEventListener('click', buttonClickHandler);
});

//delete cart
function deleteCart(e) {
  const cartRemoveBtns = document.querySelectorAll('.item-remove');
  cartRemoveBtns.forEach((cartRemoveBtn) => {
    if (e.target === cartRemoveBtn) {
      const cleanCart = e.target.id;

      //cart-storage에서 삭제
      saveCartGoods.splice(cleanCart, 1);
      //cart-page에서 삭제
      cartContainer.removeChild(cartContainer.children[cleanCart]);
      //변경사항 저장
      saveCart(saveCartGoods);
      totalPrice();
      totalCartCount();
    }
  });
  if (cartContainer.children.length === 0) {
    cartEmpty.classList.remove('hidden');
    cartBox.classList.add('hidden');
  }
}

//single goods price and count
function singleGoodsControl(e, plusMinusBtns) {
  const goodsCount = document.querySelectorAll('.count');
  const singleGoodsPrice = document.querySelectorAll('.single-total-price');

  plusMinusBtns.forEach((plusMinusBtn) => {
    if (e.target.parentNode === plusMinusBtn) {
      const cartdataId = e.target.parentNode.id;
      const pickGoods = saveCartGoods[cartdataId];

      //cart-storage에서 수량 증감
      if (plusMinusBtn.dataset.value === 'plus') {
        pickGoods.order++;
      } else {
        pickGoods.order > 1 && pickGoods.order--;
      }
      //cart-page에서 수량 증감
      goodsCount[cartdataId].value = pickGoods.order;
      //수량에 따른 상품 가격
      singleGoodsPrice[cartdataId].innerHTML = (
        pickGoods.price * pickGoods.order
      ).toLocaleString();
      //변경사항 저장
      saveCart(saveCartGoods);
    }
  });
}

//cart-page controller
function cartListHandler(e) {
  const plusBtns = document.querySelectorAll('.count-plus');
  const minusBtns = document.querySelectorAll('.count-minus');

  //single goods price and count
  singleGoodsControl(e, plusBtns);
  singleGoodsControl(e, minusBtns);

  deleteCart(e);
  totalPrice();
  totalCartCount();
}

if (cartContainer !== null) {
  cartContainer.addEventListener('click', cartListHandler);
}
