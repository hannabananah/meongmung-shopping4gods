import '../../../index.css';
import { init } from '../../main.js';

init();

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem('token');

const postcode = document.querySelector('.btn-info');
const btn = document.querySelector('form');
const name = document.getElementById('name');
const addressDetail = document.getElementById('address-detail');
const address = document.getElementById('address');
const number = document.getElementById('number');
const password = document.getElementById('password');
const pwCheck = document.getElementById('pwCheck');

function execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      let addr = '';

      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      $('#postcode').val(data.zonecode);
      $('#address').val(addr);
      $('#address').focus();
    },
  }).open();
}

postcode.addEventListener('click', execDaumPostcode);

function isSame() {
  const pw = password.value;
  const confirmPw = pwCheck.value;

  if (pw !== '' && confirmPw !== '') {
    if (pw === confirmPw) {
      document.getElementById('same').innerHTML = '비밀번호가 일치합니다.';
      document.getElementById('same').style.color = 'blue';
    } else {
      document.getElementById('same').innerHTML =
        '비밀번호가 일치하지 않습니다.';
      document.getElementById('same').style.color = 'red';
    }
  }
}

password.addEventListener('change', isSame);
pwCheck.addEventListener('change', isSame);

const submitFrom = () => {
  fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'POST',
    headers: {
      'Content-Typ': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: email.value,
      password: pswd.value,
      phone: telnum.value,
      name: name.value,
      addressDetail: addressDetail.value,
      address: address.value,
      number: number.value,
    }),
  }).then(() => {
    alert('회원수정이 완료되었습니다.', 'success');
    location.href = '/userdata/';
  });
};

btn.addEventListener('submit', submitFrom);
