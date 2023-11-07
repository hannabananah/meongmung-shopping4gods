import '../../index.css';
import { init } from '../main.js';

init();

function selectAll(selectAll) {
  const checkboxes = document.getElementsByName('category');

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
