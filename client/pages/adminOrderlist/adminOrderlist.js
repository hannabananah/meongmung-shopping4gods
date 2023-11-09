import '../../index.css';
import { init } from '../main.js';

init();
//test
const token = localStorage.getItem('token');
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

let orders = [];
let list = []; // Define the list array.

window.addEventListener('DOMContentLoaded', () => {
  getOrders();
});

// 모든 주문조회
function getOrders() {
  fetch(`${API_BASE_URL}/admins/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 200) {
        orders = data.orders;
        loadOrders(data.orders);
      }
    })
    .catch((error) => {
      console.error('FETCH ERROR', error);
    });
}

// selectAll 함수 정의
function selectAll(checkbox) {
  const selectAll = checkbox.checked;
  const checkList = document.querySelectorAll('.check');

  checkList.forEach((check) => {
    check.checked = selectAll;
  });

  if (selectAll) {
    list = Array.from(checkList).map((check) => check.value);
  } else {
    list = [];
  }
  console.log(list);
}

function loadOrders(orders) {
  const orderList = document.getElementById('order_list');
  let content = '';

  for (const order of orders) {
 
    content += `
    <tr class="border-t border-gray-300"> <td class="px-4 py-2 checkbox-cell text-center">
      <input class="check" type="checkbox" name="order" value="${order._id}" />
    </td>
    <td class="px-4 py-2 text-center">${formatDate(order.createdAt)}</td>
    <td class="px-4 py-2 text-center">${order.userId.name} (${
      order.userId.email
    })</td>
    <td class="px-4 py-2 text-center">${order._id}</td>
    <td class="px-4 py-2 text-center text-red-600"> `
      if(order.status ==='배송전') content+=` <select class='rounded border-gray-300'>
    <option value="배송전" selected>
    배송전
  </option>
  <option value="배송중" class="select-option">
    배송중
  </option>
  <option value="배송완료" class="select-option">
    배송완료
  </option></select></td></tr>`
 ;
  }
  orderList.innerHTML = content;

  const selectAllCheckbox = document.querySelector('input[value="selectall"]');
  const checkList = document.querySelectorAll('.check');

  selectAllCheckbox.addEventListener('change', function () {
    selectAll(this);
  });

  checkList.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      const check = this.value;
      if (this.checked) {
        list.push(check);
      } else {
        list = list.filter((item) => item !== check);
      }
      console.log(list);
    });
  });
}

// 선택한 주문 취소
function chooseOrder() {
  fetch(`${API_BASE_URL}/admins/orders`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ list }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 200) {
        console.log('삭제완료 모달 띄우기');
      }
    })
    .catch((error) => {
      console.error('FETCH ERROR', error);
    });
}

const deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('click', () => {
  chooseOrder();
});

// 날짜 형식 변환 함수
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
