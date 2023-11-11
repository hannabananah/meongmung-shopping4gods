import '../../index.css';
import { init } from '../main.js';

init();

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem('token');

let users = {};

async function getUser() {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (data.user) {
    users = data.user;
    renderList(users);
  }
}

const renderList = (users) => {
  const nameElement = document.getElementById('name');
  const numberElement = document.getElementById('number');

  const emailElement = document.getElementById('email');

  nameElement.innerHTML = users.name;
  numberElement.innerHTML = users.phone;

  emailElement.innerHTML = users.email;
};

document.addEventListener('DOMContentLoaded', () => {
  getUser();
});
