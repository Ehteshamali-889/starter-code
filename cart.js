// cart functionality starts

const removealltext = document.querySelector(".removeall");
removealltext.addEventListener("click", removefromCart);

function removefromCart() {
  localStorage.removeItem("cartItems");
  getCartDataDetail();
}

function addToCart(name) {
  // Get quantity
  const counterElement = document.getElementById("counter");
  let currentCounterValue = parseInt(counterElement.textContent);
  var product = '';

  if (name == 'XX99 MK II') {
    product = {
      name: "XX99 MK II",
      price: 2999,
      quantity: currentCounterValue,
      imageUrl: './assets/cart/image-xx99-mark-two-headphones.jpg'
    };
  } else if (name == 'XX99 MK I') {
    product = {
      name: "XX99 MK I",
      price: 1750,
      quantity: currentCounterValue,
      imageUrl: './assets/cart/image-xx99-mark-one-headphones.jpg'
    };
  } else if (name == 'XX59') {
    product = {
      name: "XX59",
      price: 899,
      quantity: currentCounterValue,
      imageUrl: './assets/cart/image-xx59-headphones.jpg'
    };
  } else if (name == 'ZX7') {
    product = {
      name: "ZX7",
      price: 3500,
      quantity: currentCounterValue,
      imageUrl: './assets/cart/image-zx7-speaker.jpg'
    };
  }  else if (name == 'ZX9') {
    product = {
      name: "ZX9",
      price: 4500,
      quantity: currentCounterValue,
      imageUrl: './assets/cart/image-zx9-speaker.jpg'
    };
  } else if (name == 'YX1') {
    product = {
      name: "YX1",
      price: 599,
      quantity: currentCounterValue,
      imageUrl: './assets/cart/image-yx1-earphones.jpg'
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

  // console.log("Cart Items in localStorage:", localStorage.getItem("cartItems"));
}

// Get references to the relevant elements
const plusButton = document.getElementById('max');
const minusButton = document.getElementById('min');
const counterElement = document.getElementById('counter');

if (plusButton) {
  // Add a click event listener to the "+" button
  plusButton.addEventListener('click', () => {
    // console.log("plus");
    // Get the current value
    let currentValue = parseInt(counterElement.textContent);

    // Increment the value
    currentValue++;

    // Update the <p> element with the new value
    counterElement.textContent = currentValue;
  });
}
if (minusButton) {
// Add a click event listener to the "-" button
minusButton.addEventListener('click', () => {
  // console.log("minus");
  // Get the current value
  let currentValue = parseInt(counterElement.textContent);

  // Decrement the value, but ensure it doesn't go below 0
  if (currentValue > 1) {
    currentValue--;
  }

  // Update the <p> element with the new value
  counterElement.textContent = currentValue;
});
}

function getCartDataDetail() {
  // Get the JSON data from localStorage
  var cartlist = [];
  let cartlength = 0;
  let cartlengthtext = document.querySelector('.cartlength');
  const cartListJSON = localStorage.getItem("cartItems");

  if (cartListJSON) {
    cartlist = JSON.parse(cartListJSON);
    cartlength = cartlist.length;
    cartlengthtext.innerText = cartlength;
    console.log("cartitem",cartlength );
    if (cartlength == 4) {
      const cartContainer = document.querySelector('.cartcontainer');
      cartContainer.style.height = '588px';
    }
    if (cartlength == 5) {
      const cartContainer = document.querySelector('.cartcontainer');
      cartContainer.style.height = '688px';
    }
    // console.log("Cart Items in localStorage:", cartlist);
  } else {
    cartlengthtext.innerText = cartlength;
    // console.log("No cart items found in localStorage.");
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
  const totalAmountElement = document.querySelector(".totaldisplayed");

  // Update the content of the element with the calculated total value
  totalAmountElement.textContent = `${totalValue}`;

  // change format of number displayed
  if (totalAmountElement) {
    const value = parseInt(totalAmountElement.textContent, 10);
    if (!isNaN(value)) {
      // Format the number with a comma separator and update the content
      totalAmountElement.textContent = value.toLocaleString();
    }
  }

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
        <p class="singlemin" data-name="${cartItem.name}">-</p>
        <p data-name="${cartItem.name}-quantity">${cartItem.quantity}</p>
        <p class="singlemax" data-name="${cartItem.name}">+</p>
      </article>
    `;

    // Append the newly created product item to the container
    productItemsContainer.appendChild(productItem);
  }
}

// Get cart data immediately when the page loads
getCartDataDetail();

// Add a click event listener to the "+" button
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('singlemax')) {
      const itemName = event.target.getAttribute('data-name');
    //   console.log("itemName",itemName);
      updateQuantity(itemName, 1); // Increase the quantity by 1
    }
});
    



// Add a click event listener to the "-" button
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('singlemin')) {
      const itemName = event.target.getAttribute('data-name');
    //   console.log("itemName",itemName);
      updateQuantity(itemName, -1); // Increase the quantity by 1
    }
});



// Function to update the quantity for a specific item
function updateQuantity(itemName, change) {
  const cartItemsJSON = localStorage.getItem("cartItems");
  if (cartItemsJSON) {
    const cartItems = JSON.parse(cartItemsJSON);

    // Find the item by name and update its quantity
    const itemToUpdate = cartItems.find(item => item.name === itemName);
    // console.log("item",itemToUpdate);
    if (itemToUpdate) {
        const quantityElement = document.querySelector(`[data-name="${itemName}-quantity"]`);
        // console.log("quantity", quantityElement);

        let currentQuantity = parseInt(quantityElement.textContent);
        // console.log("count",currentQuantity);
        // Ensure the quantity doesn't go below 1
        if (currentQuantity + change >= 1) {
            currentQuantity += change;
            quantityElement.textContent = currentQuantity;

            // Update the quantity in localStorage
            itemToUpdate.quantity = currentQuantity;
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            // console.log(localStorage.getItem("cartItems"));
            // Recalculate and update the total amount
            getCartDataDetail();
        }
    }
  }
}
