import '../../index.css';
import { init } from '../main.js';
import Swal from 'sweetalert2';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const btn = document.querySelector('form');

const token = localStorage.getItem('token');
let userId = localStorage.getItem('userId');

const name = document.getElementById('name');
const size = document.getElementById('size');
const age = document.getElementById('age');


btn.addEventListener('submit', function (e) {
    e.preventDefault();
    
    postDog();
  
  });
  
  const postDog = () => {
    fetch(`${API_BASE_URL}/dogs` , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
         userId: userId,
         name: name.value,
         size: size.value,
         age: age.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
      })
      .catch(error => console.log(error));;
  };


  const getDog = () => {
    fetch(`${API_BASE_URL}dogs` , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
         userId: userId,
         name: name.value,
         size: size.value,
         age: age.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
      })
      .catch(error => console.log(error));;
  };