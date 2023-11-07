import '../../index.css';
import { init } from '../main.js';

init();

// select box 전체선택
function selectAll(selectAll) {
  const checkboxes = document.getElementsByName('product');

  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
  });
}

window.onload = function () {
  const selectAllCheckbox = document.querySelector('input[value="selectall"]');
  selectAllCheckbox.addEventListener('click', function () {
    selectAll(this);
  });
};
