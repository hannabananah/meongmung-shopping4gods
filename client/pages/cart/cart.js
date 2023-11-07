import '../../index.css';
import { init } from '../main.js';

init();

const cartContainer = document.querySelector('.cart-container');
const cartTotalPrice = document.querySelector('.total-price');
const cartBox = document.querySelector('.cart-container-box');
const cartEmpty = document.querySelector('.empty');

let saveCartGoods = localStorage.getItem('cartList')
  ? JSON.parse(localStorage.getItem('cartList'))
  : [];

function cartCreateHTML(product) {
  return `
    <div class="flex border-t border-gray-300 items-center  ">
    <div class=" lg:w-6/12 py-2 ">
      <div class="flex items-center">
        <div class="md:w-1/3">
            <a href="#">
              <img
                src="${product.image}"
                alt="${product.productName}"
                class="md:h-24 md:w-24 "
              />
            </a>
        </div>
        <div class="w-2/3 px-4">
          <h2 class="mb-2 text-xl font-bold">
            <a
              href="#"
              class="text-lg font-bold hover:text-gray-200"
              >${product.productName}</a
            >
          </h2>
         <button
         class="item-remove text-gray-500 hover:text-gray-200"
          data-id="${product.id}"
        >
          삭제
        </button>
        
        </div>
      </div>
    </div>
    <div class=" px-4  lg:w-2/12">
      <p class="text-lg font-bold text-blue-500">${product.price}</p>
    </div>
    <div class="custom-number-input">
          <button
            class="count-minus py-2 hover:text-gray-700"
            data-value="minus"
            data-id=${product.id}
          >
          <span class="m-auto text-2xl font">−</span>
          </button>
          <input
            type="number"
            class="count w-10 px-1 py-1 items-center text-center border-1 rounded-md bg-gray-50"
            value=${product.order}
          />
          <button
            class="count-plus py-2 hover:text-gray-700"
            data-value="plus"
            data-id=${product.id}
          >
          <span class="m-auto text-2xl font">+</span>
          </button>
          </div>
    <div class=" px-4 ml-auto lg:w-2/12">
      <p class="single-total-price text-lg font-bold text-center text-blue-500">
        ${(product.price * product.order).toLocaleString()}
      </p>
    </div>
  </div>
 `;
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
    return prev + curr.order;
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
  const loadCartGoods = localStorage.getItem('cartList');
  if (cartContainer !== null) {
    cartContainer.innerHTML = JSON.parse(loadCartGoods)
      .map((product) => cartCreateHTML(product))
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
export const buttonClickHandler = function () {
  // 클릭한 버튼의 데이터(product-id)를 가져옴
  const productId = event.target.dataset.productId;

  // 해당 제품을 찾아냄
  const selectedProduct = data.goods.find(
    (product) => product.id === parseInt(productId),
  );

  // 이미 장바구니에 있는 상품인지 확인
  if (saveCartGoods.some((product) => product.id === selectedProduct.id)) {
    console.log('이미 장바구니에 있는 상품입니다.');
    alert('장바구니에 있는 상품입니다.');
  } else {
    alert('장바구니에 담았습니다.');
    selectedProduct.cart = true;
    selectedProduct.order = 1;
    saveCartGoods.push(selectedProduct);
    console.log('장바구니에 추가');
  }
  // 장바구니 정보를 localStorage에 업데이트
  localStorage.setItem('cartList', JSON.stringify(saveCartGoods));
  saveCart(saveCartGoods);
  totalCartCount();
  totalPrice();
  console.log('저장완료');
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
      const cleanCart = saveCartGoods.findIndex((item) => {
        return item.id === parseInt(cartRemoveBtn.dataset.id);
      });
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
      const cartdataId = saveCartGoods.findIndex((item) => {
        return item.id === parseInt(plusMinusBtn.dataset.id);
      });
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
