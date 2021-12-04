const listProducts = document.querySelector('.items');
const listProductsCart = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');

async function sumPrice() {
  const prices = await localStorage.getItem('cartItems');
  const li = document.querySelectorAll('.cart__item');
  let valor = 0;

  if (prices) {
    li.forEach((item) => {
      valor += Number.parseFloat(item.innerText.split('R$')[1]);
    });
    totalPrice.innerText = `Total: R$${valor}`;
  } else {
    valor = 0;
    totalPrice.innerText = `Total: R$${valor}`;
  }
}

function cartItemClickListener(event) {
  const item = event.target.parentElement;
  item.remove();
  saveCartItems(listProductsCart.innerHTML);
  sumPrice();
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createCartItemElement({ id: sku, title: name, price: salePrice, thumbnail: image }) {
  const div = document.createElement('div');
  div.className = 'cart__item';
  div.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: R$${salePrice}`;
  div.appendChild(createProductImageElement(image));
  div.appendChild(createCustomElement('span', 'cart__icone', 'X'));
  div.addEventListener('click', cartItemClickListener);
  return div;
}

async function setProductsInCard(event) {
  const sku = getSkuFromProductItem(event.target.parentElement);
  const item = await fetchItem(sku);
  const cardItem = createCartItemElement(item);
  listProductsCart.appendChild(cardItem);
  saveCartItems(listProductsCart.innerHTML);
  sumPrice();
}

function formatPrice(price) {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function createProductItemElement({ id: sku, title: name, thumbnail: image, price: salePrice }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__price', formatPrice(salePrice)));
  section.appendChild(createCustomElement('span', 'item__title', name));
 
  const btn = createCustomElement(
    'button',
    'item__add',
    '.',
  );
  section.appendChild(btn);
  btn.addEventListener('click', setProductsInCard);

  return section;
}

function loadingMsg() {
  const loading = document.querySelector('.loading');
  loading.innerText = 'carregando...';
}

function deleteMsgLoading() {
  document.querySelector('.loading').remove();
}

async function searchProductsAndList(product) {
  loadingMsg();
  const products = await fetchProducts(product);
  deleteMsgLoading();
  products.results.forEach((item) => {
    const productItem = createProductItemElement(item);
    listProducts.appendChild(productItem);
  });
}

function clearCart() {
  listProductsCart.innerHTML = '';
  localStorage.removeItem('cartItems');
  sumPrice();
}

function btnCLear() {
  const btn = document.querySelector('.empty-cart');
  btn.addEventListener('click', clearCart);
}

function onLoadCart() {
  const cart = getSavedCartItems(); 
  listProductsCart.innerHTML = cart;
  const cartItems = document.querySelectorAll('.cart__item');
  cartItems.forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
  });
  sumPrice();
}

// ------------------------------------------------------------------------------- //

window.onload = () => {
  searchProductsAndList('computador');
  btnCLear();
  onLoadCart();
};
