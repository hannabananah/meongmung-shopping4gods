import '../../index.css';
import { init } from '../main.js';

init();

// 가격 세자릿수마다 콤마 붙이기
function numberWithCommas(x) {
  return x.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

window.onload = function () {
  const priceInput = document.getElementById('price');

  priceInput.addEventListener('input', function (e) {
    const originalValue = e.target.value;
    const cleanedValue = originalValue.replace(/[^0-9,]/g, '');
    const formattedValue = numberWithCommas(cleanedValue);

    e.target.value = formattedValue;
  });
};
