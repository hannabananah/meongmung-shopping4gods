import '../../index.css';
import { init } from '../main.js';


init();

const addressBtn = document.getElementById('getAddress');
const addressNum = document.getElementById('addressNum');
const address = document.getElementById('address');

//daum 주소 입력받기
addressBtn.addEventListener('click', function() {
    new daum.Postcode({
        oncomplete: function(data) {

            
            addressNum.value = data.zonecode;    
            address.value = data.address;

        }
    }).open();
})

