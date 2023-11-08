import '../../../index.css';
import { init } from '../../main.js';
import Swal from 'sweetalert2';
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const content = document.querySelector('#targetEl');
const token = localStorage.getItem('token');

async function renderContent() {
  console.dir(location);
  const id = location.search.split('=')[1];
  const res = await getOrderById(id);

  if (res.status === 200) {
    const template = generatorTemplate(res.order);
    content.innerHTML = template;

    const form = content.querySelector('.quantity');
    const updateBtn = content.querySelector('.update-btn');
    const orderForm = content.querySelector('#order-form');
    const btns = content.querySelectorAll('button');

    for (const btn of btns) {
      if (btn.innerText === '수정하기') {
      } else {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const wrap = content.querySelector(`#wrap-${btn.id}`);
          wrap.remove();
        });
      }
    }

    bindEvent(form, updateBtn, orderForm, id);
  }
}

function bindEvent(target, btn, form, id) {
  let products = [];

  btn.addEventListener('click', (e) => {
    e.preventDefault();

    for (const input of form) {
      if (input.nodeName === 'INPUT') {
        products.push({ product: input.id, quantity: input.value });
      }
    }

    fetch(`${API_BASE_URL}orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        products,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          new Swal('수정 완료', '정상적으로 수정 되었습니다!', 'success').then(
            () => {
              location.href = '/orderlist/';
            },
          );
        }
      })
      .catch((error) => console.log(error));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e.target.id);
    console.log(e.target.value);
  });
}

async function getOrderById(id) {
  const res = await fetch(`${API_BASE_URL}orders/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  return data;
}

function generatorTemplate(order) {
  const { createdAt, _id, products, status } = order;
  let totalPrice = 0;

  for (let i = 0; i < products.length; i++) {
    const price = products[i].product.price;
    const quantity = products[i].quantity;

    totalPrice += +price * +quantity;
  }

  let template = `<section
  class="flex w-full justify-between items-center border border-slate-400 border-x-0 py-5"
>
  <div class="w-[25%] text-center">
    <div class="mb-2">${createdAt.split('T')[0]}</div>
    <button
      name="${_id}"
      class="update-btn border bg-white py-2 px-4 rounded-md hover:bg-blue-500 hover:text-white mb-2"
    >
      수정하기
    </button>
  </div>
  <div class="w-full relative">
    <div class="w-full flex flex-col justify-center text-center divide-y-2">
    <form id='order-form' class="space-y-4 md:space-y-6">
    ${products
      .map(
        (product) => `<div id="wrap-${
          product.product._id
        }" class="flex w-full py-2 ">
      <div class="w-[25%] flex items-center justify-center">
      <img class="w-24 mr-4" src="../../images/02.png" alt="" />
      <p class="w-full text-left">${product.product.name}</p>
      </div>
      <div class="w-[25%] flex items-center justify-center ">
      <input id="${
        product.product._id
      }" class="quantity w-14" type="number" value="${
        product.quantity
      }"></input>
      </div>
      <div class="w-[25%] flex items-center justify-center font-bold">${(
        +product.product.price * +product.quantity
      ).toLocaleString('ko-KR')}</div>
      <button id=${
        product.product._id
      } class="w-[25%] flex items-center justify-center text-red-500">삭제</button>
      </div>`,
      )
      .join('')}
      </form>
    </div>
  </div>
</section>
<div class="mt-2 mb-5 text-right font-bold">
  총 결제 금액: <span class="text-red-500">${totalPrice.toLocaleString(
    'ko-KR',
  )}원</span>
</div>`;
  return template;
}

document.addEventListener('DOMContentLoaded', () => {
  init();
  renderContent();
});
