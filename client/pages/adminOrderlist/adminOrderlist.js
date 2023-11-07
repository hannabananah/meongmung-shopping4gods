import '../../index.css';
import { init } from '../main.js';

init();

const token = localStorage.getItem('token');
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

window.addEventListener('DOMContentLoaded', () => {
  getOrders();
});

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
        loadOrders(data.orders);
      }
    })
    .catch((error) => {
      console.error('FETCH ERROR', error);
    });
}

function loadOrders(orders) {
  const orderList = document.getElementById('order_list');

  orderList.innerHTML = '';

  orders.forEach((order) => {
    const orderRow = document.createElement('tr');

    orderRow.innerHTML = `
      <td class="px-4 py-2 checkbox-cell text-center">
        <input type="checkbox" name="order" value="${order._id}" />
      </td>
      <td class="px-4 py-2 text-center">${formatDate(order.createdAt)}</td>
      <td class="px-4 py-2 text-center">${order.userId.name} (${
      order.userId.email
    })</td>
      <td class="px-4 py-2 text-center">${order._id}</td>
      <td class="px-4 py-2 text-center">
        <a href="#" class="text-lg font-bold hover:text-gray-200">
          주문 상세 보기
        </a>
      </td>
      <td class="px-4 py-2 text-center text-red-600">${order.status}</td>
    `;

    orderList.appendChild(orderRow);
  });
}

// select box 전체선택
function selectAll(selectAll) {
  const checkboxes = document.getElementsByName('order');

  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
  });
}

// 날짜 형식 변환 함수
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
