import '../../index.css';
import { init } from '../main.js';
import Swal from 'sweetalert2';

init();

const token = localStorage.getItem('token');
const API_BASE_URL = import.meta.env.BASE_URL;

const addressBtn = document.getElementById('getAddress');
const addressNum = document.getElementById('addressNum');
const address = document.getElementById('address');

//id는 뭘 받아와야하는지?
let id = 1; //임시

const getUser = () => {
    fetch(`${API_BASE_URL}/users/${id}` , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        
        
     
      });
  };
  getUser();

//daum 주소 입력받기
addressBtn.addEventListener('click', function() {
    new daum.Postcode({
        oncomplete: function(data) {
            addressNum.value = data.zonecode;    
            address.value = data.address;

        }
    }).open();
})