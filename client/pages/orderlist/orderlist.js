import '../../index.css';
import { init } from '../main.js';
import Swal from 'sweetalert2';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem('token');

if (!token) {
  location.href = '/';
}

const targetEl = document.querySelector('#targetEl');

const renderList = async (targetEl) => {
  let template = ``;

  const res = await getAllOrders();
  console.log(res);
  if (!res.orders.length) {
    template += `<div class='w-full border-b border-b-zinc-400 py-10 flex justify-between items-center px-10 text-center'>
    <div class='flex-1'>사용자의 주문 정보가 없습니다.</div>
    </div>`;
    targetEl.insertAdjacentHTML('beforeend', template);
    return;
  }

  for (const order of res.orders) {
    template += ` <section
    class="flex w-full justify-between items-center border border-slate-400 border-x-0 py-5"
  >
    <div class="w-[25%] text-center">
      <div class="mb-2">${order.createdAt.split('T')[0]}</div>
      <button
        name="${order._id}"
        class="order-cancel border bg-white py-2 px-4 rounded-md hover:bg-red-500 hover:text-white mb-2"
      >
        취소신청
      </button>
      <button
        name="${order._id}"
        data-state="${order.status}"
        class="order-update border bg-white py-2 px-4 rounded-md hover:bg-blue-500 hover:text-white"
      >
        수정
      </button>
    </div>
    <div class="w-full">
      <div class="w-full flex flex-col justify-center text-center divide-y-2">
      ${order.products
        .map(
          (product) => `<div class="flex w-full py-2 ">
        <div class="w-[55%] flex items-center justify-center">
        <img class="w-24 mr-4" src="${product.product.img_url}" alt="" />
        <p class="w-full text-left ">${product.product.name}</p>
        </div>
        <div class="w-[15%] flex items-center justify-center ">${
          product.quantity
        }</div>
        <div class="w-[15%] flex items-center justify-center font-bold">${(
          +product.product.price * +product.quantity
        ).toLocaleString('ko-KR')}</div>
        <div class="w-[15%] flex items-center justify-center text-red-500">${
          order.status
        }</div>
        </div>`,
        )
        .join('')}
      </div>
    </div>
  </section>
  <div class="mt-2 mb-5 mx-4 md:mx-10 text-right font-bold">
    총 결제 금액: <span class="text-red-500">${order.totalPrice.toLocaleString(
      'ko-KR',
    )}원</span>
  </div>`;
  }

  targetEl.insertAdjacentHTML('beforeend', template);
  bindEvents(targetEl);
};

const bindEvents = (document) => {
  const cancelBtn = document.querySelectorAll('.order-cancel');
  const updateBtn = document.querySelectorAll('.order-update');

  for (const btn of updateBtn) {
    btn.addEventListener('click', (e) => {
      console.log(e.target.name);
      const state = e.target.dataset.state;
      console.log(state);
      if (state !== '배송전') {
        new Swal('수정 불가', `주문이 이미 ${state} 상태 입니다.`, 'warning');
        return;
      }
      location.href = `/orderlist/edit/?id=${e.target.name}`;
    });
  }

  for (const btn of cancelBtn) {
    btn.addEventListener('click', (e) => {
      fetch(`${API_BASE_URL}/orders/${e.target.name}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) location.href = '/orderlist/';
          if (data.status === 400)
            new Swal('취소 불가', data.message, 'warning');
        })
        .catch((error) => console.log(error));
    });
  }
};

async function getAllOrders() {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  return data;
}

window.addEventListener('DOMContentLoaded', () => {
  init();
  renderList(targetEl);
});
