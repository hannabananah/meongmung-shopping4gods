import '../../../index.css';
import { init } from '../../main.js';
import Swal from 'sweetalert2';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem('token');
// const user = await getUser();
// console.log(user);

const postcode = document.querySelector('.btn-info');
const btn = document.querySelector('form');
const name = document.getElementById('name');
const zipCode = document.getElementById('zipCode');
const address = document.getElementById('address');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const pwCheck = document.getElementById('pwCheck');
const _id = document.getElementById('_id');

console.log(zipCode);
console.log(address);

function execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      zipCode.value = data.zonecode;
      address.value = data.address;
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

const submitFrom = async () => {
  saveUser();
  saveAddress();

  new Swal('수정 완료!', '회원수정이 완료되었습니다.', 'success').then(() => {
    location.href = '/me/';
  });
};

const saveUser = async () => {
  fetch(`${API_BASE_URL}/users`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      phone: phone.value,
    }),
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => console.error(err));
};

const saveAddress = async () => {
  fetch(`${API_BASE_URL}/addresses/${_id.value}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      zipCode: zipCode.value,
      detailAddress: address.value,
    }),
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => console.error(err));
};

btn.addEventListener('submit', (e) => {
  e.preventDefault();
  submitFrom();
});

document.addEventListener('DOMContentLoaded', async () => {
  init();
  getUser();
  getAddress();
});

async function getUser() {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  name.value = data.user.name;
  email.value = data.user.email;
  phone.value = data.user.phone;
  return data;
}

async function getAddress() {
  const response = await fetch(`${API_BASE_URL}/addresses`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  const defaultAddress = data.addresses.filter(
    (address) => address.mainAddress,
  );
  console.log(defaultAddress);
  zipCode.value = defaultAddress[0].zipCode;
  address.value = defaultAddress[0].detailAddress;
  _id.value = defaultAddress[0]._id;
  return data;
}
