import '../../index.css';
import { init } from '../main.js';
import Swal from 'sweetalert2';

init();

const token = localStorage.getItem('token');
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const params = location.search;
const param = new URLSearchParams(params);
const page = param.get('page'); // 5

let orders = [];
let list = [];

window.addEventListener('DOMContentLoaded', () => {
  getOrders();
});

// 모든 주문조회
function getOrders() {
  fetch(`${API_BASE_URL}/admins/orders/?page=${page}?perPage=${page}`, {
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
        console.log(data);
        renderPages(data.orders.totalPages);
        loadOrders(data.orders.orders);
      } else {
        location.href = '/';
      }
    })
    .catch((error) => {
      console.error('FETCH ERROR', error);
    });
}

function putOrders(orderStatus, id) {
  fetch(`${API_BASE_URL}/admins/orders/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      status: orderStatus,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('FETCH ERROR', error);
    });
}

function renderPages(datalen) {
  const pagelist = document.getElementById('pages');
  let puthtml = '';
  if (datalen > 1) {
    for (let i = 1; i <= datalen; i++) {
      puthtml += `<div><input type='radio' id='${i}' name= 'page' class='hidden peer' value = '${i}'><label for='${i}' id='page' name='${i}' class='p-3 peer-checked:text-teal-600 peer-checked:font-bold peer-checked:border-b-2'>${i}</label></input></div>`;
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
}

function loadOrders(orders) {
  const orderList = document.getElementById('order_list');
  let content = '';
  if (!orders.length) {
    content = `<tr class=" border-t w-full border-gray-300"><td colspan="5" class="text-center py-20 col-span-2">회원의 주문내역이 없습니다.</td>
</tr>`;
    orderList.innerHTML = content;
    return;
  }
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

    <td class="px-4 py-2 text-center text-red-600"> 
    <select id="${order._id}_${order.status}"  class='rounded border-gray-300'>
    <option value="배송전" class="select-option" >
    배송전
  </option>
  <option value="배송중" class="select-option">
    배송중
  </option>
  <option value="배송완료" class="select-option">
    배송완료
  </option></select></td></tr>`;
  }
  orderList.innerHTML = content;

  const dropdownlist = document.querySelectorAll('select');
  dropdownlist.forEach((dropdown) => {
    const dropdownState = dropdown.id.split('_');
    dropdown.value = dropdownState[1];
    dropdown.addEventListener('change', function () {
      putOrders(this.value, dropdownState[0]);
    });
  });

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
        new Swal('주문취소 성공', '', 'success').then(() => {
          location.href = '/admin-order-list/';
        });
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
