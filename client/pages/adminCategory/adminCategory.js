import '../../index.css';
import { init } from '../main.js';

init();

window.onload = function () {
  let category = [];

  window.addEventListener('DOMContentLoaded', () => {
    getCategories();
  });

  // 모든 카테고리 조회
  function getCategories() {
    fetch(`${API_BASE_URL}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          category = data.category;
          loadCategories(data.category);
        }
      })
      .catch((error) => {
        console.error('FETCH ERROR', error);
      });
  }

  function loadCategories(categories) {
    const categoryList = document.getElementById('category_list');
    let content = '';

    for (const category in categories) {
      content += `
      <tr class="border-t border-gray-300">
        <td class="px-4 py-2 checkbox-cell text-center">
          <input type="checkbox" name="category" value="${category}" />
        </td>
        <td class="px-4 py-2 text-center">${category.name}</td>
        <td class="px-4 py-2 text-center text-red-600"><img  mx-auto hover:cursor-pointer' src="/images/trash.svg"/></td>
      </tr>
    `;
    }
    categoryList.innerHTML = content;
  }
};
