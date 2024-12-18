document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.cta-button').forEach(button => {
      button.addEventListener('click', addCartItems);
  });
});

let cart = []; let total = 0;

// Open the cart sidebar
function openCart() {
    document.getElementById("cart-sidebar").style.width = "350px";
}

// Closes cart
function closeCart() {
    document.getElementById("cart-sidebar").style.width = "0";
}

function removeCartItems(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function addCartItems(event) {
    const product = event.target.closest('.product');
    const name = product.querySelector('h3').textContent;
    const price = parseFloat(product.querySelector('.price').textContent.replace('$', ''));
    const imageSrc = product.querySelector('img').src;
    const id = Date.now() + Math.random().toString(36).substring(2, 9); //keeps from removing all the instances of one item (multiples of an item)
    cart.push({ id, name, price, imageSrc });
    updateCart();
}

function updateCart() {
  total = 0;
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';

      cartItem.innerHTML = `
          <img src="${item.imageSrc}" alt="${item.name}">
          <div class="cart-item-info">
              <span class="cart-item-name">${item.name}</span>
              <span class="cart-item-price">$${item.price.toFixed(2)}</span>
          </div>
          <span class="cart-item-remove" onclick="removeCartItems('${item.id}')">remove</span>
      `;

      cartItems.appendChild(cartItem);
      total += item.price;
  });

  document.getElementById('cart-total').textContent = total.toFixed(2);
}

