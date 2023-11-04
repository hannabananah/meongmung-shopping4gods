import '../style.css';
import '../index.css';
import 'flowbite';
const data = {
  goods: [
    {
      id: 1,
      productName: '장난감 공',
      price: 8000,
      image: '../images/Dog_ball.jpg',
      cart: true,
      order: 0,
    },
    {
      id: 2,
      productName: '딩동펫',
      price: 10000,
      image: '../images/02.png',
      cart: false,
      order: 0,
    },
    {
      id: 3,
      productName: '도기맨',
      price: 12000,
      image: '../images/03.png',
      cart: false,
      order: 0,
    },
    {
      id: 4,
      productName: '도기맨',
      price: 12000,
      image: '../images/03.png',
      cart: false,
      order: 0,
    },
    {
      id: 5,
      productName: '장난감 공',
      price: 8000,
      image: '../images/Dog_ball.jpg',
      cart: true,
      order: 0,
    },
    {
      id: 6,
      productName: '장난감 공',
      price: 8000,
      image: '../images/Dog_ball.jpg',
      cart: true,
      order: 0,
    },
  ],
};

export function init() {
  document.querySelector('#header-wrapper').innerHTML = `<header
  class=" w-full h-[80px] px-20 py-5 flex justify-between items-center shadow-sm  fixed left-0 top-0 bg-white border-b border-zinc-300 z-[100]"
  >
  <h1 class="w-30 text-center text-lg"><a href="/">멍뭉이들</a></h1>
  
  <div class="flex-1 mx-5">
    <input
      class="hidden w-full max-w-sm mx-auto border rounded-full py-2 px-4 outline-none md:block"
      type="text"
      placeholder="test"
    />
  </div>
  
  <div class="">
    <ul class="flex gap-10">
      <li class="hover:text-gray-400">
        <a href="/login/">로그인</a>
      </li>
      <li class="hover:text-gray-400">
        <a href="/signup/">회원가입</a>
      </li>
      <li class="hover:text-gray-400">
        <a href="/cart/">장바구니</a>
      </li>
    </ul>
  </div>
  </header>`;
}

// document.querySelector('#footer').innerHTML = ``;
window.addEventListener('DOMContentLoaded', () => {
  init();
});

export function renderProducts() {
  const productList = document.getElementById('product-list');

  const products = data.goods; // JSON 데이터에서 제품 목록을 가져옴

  // 가져온 데이터를 사용하여 동적으로 제품 목록 생성
  products.forEach((product) => {
    // 제품 항목을 생성하고 추가하는 코드
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
    <div class="bg-white rounded-lg border border-gray-400 p-8">
    <div class="relative overflow-hidden">
            <a href='../detail/'>
              <img class="object-cover z-2 w-full" src="${product.image}" alt="${product.productName}" />
            </a>
          <h2 class="text-xl z-2 font-bold text-gray-900 mt-4">${product.productName}</h2>
          <div class="flex z-2 items-center justify-between mt-4">
          <span class="text-gray-900 z-2 font-bold text-lg">${product.price}원</span>
          <button data-action='add-to-cart' class="bg-gray-900 text-white z-2 py-2 px-4 rounded-full font-bold hover:bg-gray-800" data-product-id="${product.id}">장바구니</button>
          </div>
          </div>
          <script src="data.json" type="home/javascript"></script>
        `;

    if (productList) {
      productList.appendChild(productCard);
    }
  });
}
renderProducts();
