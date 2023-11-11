import '../../index.css';
import { init } from '../main.js';
import Swal from 'sweetalert2';

init();

const token = localStorage.getItem('token');
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const productListEl = document.querySelector('#product-list');

const params = location.search;

const param = new URLSearchParams(params);
const page = param.get('page'); // 5

let products = [];
let list = [];

window.addEventListener('DOMContentLoaded', () => {
  getProducts();
});

// 상품리스트 조회
const getProducts = async () => {
  return await fetch(`${API_BASE_URL}/products/?page=${page}?perPage=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 200) {
        renderPages(data.totalPages);
        products = data.products;
        renderList(data.products);
      } else {
        location.href = '/'; //로드 실패하면 리디렉션
      }
    })
    .catch((error) => {
      console.error('FETCH ERROR', error);
    });
};

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

const renderList = async (products) => {
  let template = ``;

  if (!products.length) {
    template += `<tr class=" border-t w-full border-gray-300"><td colspan="5" class="text-center py-20 col-span-2">상품 정보가 없습니다.</td>
    </tr>`;

    productListEl.insertAdjacentHTML('beforeend', template);
    return;
  }

  products.map(({ name, category, createdAt, price, _id }, index) => {
    template += `
      <tr class="border-t border-gray-300">
      <td class="px-4 py-2 checkbox-cell text-center">
        <input class="check" type="checkbox" name="product" value="${_id}" />
      </td>
      <td class="px-4 py-2 text-center">${index + 1}</td>
      <td class="px-4 py-2 text-center font-bold">${name}</td>
      <td class="px-4 py-2 text-center">${category ? category.name : '-'}</td>
      <td class="px-4 py-2 text-center">
          ${price.toLocaleString('ko-KR')}원
      </td>
      <td class="px-4 py-2 text-center">${formatDate(createdAt)}</td>
      <td class="px-4 py-2 text-center text-red-600"><button id="${_id}" class="update-btn hover:underline">수정하기</button></td>
      </tr>
      `;
  });
  productListEl.insertAdjacentHTML('beforeend', template);
  bindEvents(productListEl);

  // 수정하기 버튼
  function bindEvents(document) {
    const updateBtns = document.querySelectorAll('.update-btn');

    for (const btn of updateBtns) {
      btn.addEventListener('click', (e) => {
        location.href = `/admin-edit-product/?id=${e.target.id}`;
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
};

// 선택한 상품 삭제
function chooseOrder() {
  fetch(`${API_BASE_URL}/products`, {
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
        new Swal('상품삭제 성공', '', 'success').then(() => {
          location.href = '/admin-product-list/';
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
