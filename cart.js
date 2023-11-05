// cart functionality starts

const removealltext= document.querySelector(".removeall");

removealltext.addEventListener("click", removefromCart);

function removefromCart() {
  localStorage.removeItem("cartItems");
  getCartDataDetail();
}





function addToCart(name) {
  // get quanitity
  const counterElement = document.getElementById("counter");
  let currentCounterValue = parseInt(counterElement.textContent);
  var product='';
  if(name=='XX99 MK II'){
     product = {
        name: "XX99 MK II",
        price: 2999,
        quantity: currentCounterValue,
        imageUrl:'./assets/cart/image-xx99-mark-two-headphones.jpg'
      };
  }
  else if(name=='XX99 MK I'){
    product = {
        name: "XX99 MK I",
        price: 1750,
        quantity: currentCounterValue,
        imageUrl:'./assets/cart/image-xx99-mark-one-headphones.jpg'
      };
  }
  

  // Check if the cartItems array already exists in localStorage
  const existingItemsJSON = localStorage.getItem("cartItems");
  let cartItems = [];

  if (existingItemsJSON) {
    // If it exists, parse the JSON and update the array
    cartItems = JSON.parse(existingItemsJSON);
  }

  // Check if the product already exists in the cart
  const existingProductIndex = cartItems.findIndex(item => item.name === product.name);

  if (existingProductIndex !== -1) {
    // If it exists, update the quantity
    const existingProduct = cartItems[existingProductIndex];

    // Increment the quantity in both localStorage and the object
    existingProduct.quantity += currentCounterValue;
  } else {
    // If it doesn't exist, add the product to the cartItems array
    cartItems.push(product);
  }

  // Store the updated cartItems array back in localStorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // Update the displayed cart immediately
  getCartDataDetail();

  console.log("Cart Items in localStorage:", localStorage.getItem("cartItems"));
}



// Get references to the relevant elements
const plusButton = document.getElementById('max');
const minusButton = document.getElementById('min');
const counterElement = document.getElementById('counter');

// Add a click event listener to the "+" button
plusButton.addEventListener('click', () => {
  console.log("plus");
  // Get the current value
  let currentValue = parseInt(counterElement.textContent);

  // Increment the value
  currentValue++;

  // Update the <p> element with the new value
  counterElement.textContent = currentValue;
});

// Add a click event listener to the "-" button
minusButton.addEventListener('click', () => {
  console.log("minus");
  // Get the current value
  let currentValue = parseInt(counterElement.textContent);

  // Decrement the value, but ensure it doesn't go below 0
  if (currentValue > 1) {
    currentValue--;
  }

  // Update the <p> element with the new value
  counterElement.textContent = currentValue;
});


function getCartDataDetail(){
  // Get the JSON data from localStorage
  var cartlist=[];
  let cartlength=0;
  let cartlengthtext= document.querySelector('.cartlength');
  const cartListJSON = localStorage.getItem("cartItems");
  if (cartListJSON) {
    cartlist = JSON.parse(cartListJSON);
    cartlength=cartlist.length;
    // console.log('cart lengt',cartlength);
    cartlengthtext.innerText=cartlength;
    console.log("Cart Items in localStorage:", cartlist);
  } else {
    cartlengthtext.innerText=cartlength;
    console.log("No cart items found in localStorage.");
  }
  // 1. Retrieve the cart items from localStorage
  const cartItemsJSON = localStorage.getItem("cartItems");

  // 2. Calculate the total value
  let totalValue = 0;

  if (cartItemsJSON) {
    const cartItems = JSON.parse(cartItemsJSON);
    for (const item of cartItems) {
      totalValue += item.price * item.quantity;
    }
  }

  // 3. Store the total value in localStorage
  localStorage.setItem("totalamount", totalValue);

  // Find the HTML element with the "totalamount" class
  const totalAmountElement = document.querySelector(".totalamount");

  // Update the content of the element with the calculated total value
  totalAmountElement.textContent = `$${totalValue.toFixed(2)}`;

  const productItemsContainer = document.querySelector('.productlist');
  productItemsContainer.innerHTML = '';

  // Iterate through the items in localStorage
  for (const cartItem of cartlist) {
    // Create a new product item in the provided format
    const productItem = document.createElement('article');
    productItem.classList.add('productitem');

    productItem.innerHTML = `
      <article class="productitemcontainer">
        <article class="imgcontainer">
          <img src="${cartItem.imageUrl}" alt="${cartItem.name}" class="productimage">
        </article>
        <article class="productsmallinfo">
          <h3>${cartItem.name}</h3>
          <p>$${cartItem.price}</p>
        </article>
      </article>
      <article class="changecount">
        <p class="min">-</p>
        <p>${cartItem.quantity}</p>
        <p class="max">+</p>
      </article>
    `;

    // Append the newly created product item to the container
    productItemsContainer.appendChild(productItem);
  }
  
}
getCartDataDetail();
// cart functionality ends