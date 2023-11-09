function getSummaryDataDetail() {
    // Get the JSON data from localStorage
    var cartlist = [];
    let cartlength = 0;
    // let cartlengthtext = document.querySelector('.cartlength');
    const cartListJSON = localStorage.getItem("cartItems");
  
    if (cartListJSON) {
      cartlist = JSON.parse(cartListJSON);
      cartlength = cartlist.length;
    //   cartlengthtext.innerText = cartlength;
      console.log("cartitem",cartlength );
      if (cartlength == 4) {
        const secondpartcheckout = document.querySelector('.secondpartcheckout');
        secondpartcheckout.style.height = '712px';
      }
      if (cartlength == 5) {
        const secondpartcheckout = document.querySelector('.secondpartcheckout');
        secondpartcheckout.style.height = '812px';
      }
      // console.log("Cart Items in localStorage:", cartlist);
    } else {
    //   cartlengthtext.innerText = cartlength;
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
    const totalAmountElement = document.querySelector(".summarytotal");
  
    // Update the content of the element with the calculated total value
    totalAmountElement.textContent = `${totalValue}`;

    const shippingElement = document.querySelector(".shipping");
    
    
    const vatElement = document.querySelector(".vat");
    
    const grandtotalElement = document.querySelector(".grandtotal");
    if(totalValue>0){
      shippingElement.textContent = 50;
      vatElement.textContent = 1000;
      var shippingValue = parseFloat(shippingElement.textContent);
      var vatValue = parseFloat(vatElement.textContent);

      var totalCharge = shippingValue + vatValue+totalValue;
      localStorage.setItem("grandtotal", totalCharge);
      console.log("total Charge",totalCharge);
      
      grandtotalElement.textContent = `${totalCharge.toFixed(2)}`;
      // change format of number displayed
      if (vatElement) {
        const value = parseInt(vatElement.textContent, 10);
        if (!isNaN(value)) {
          // Format the number with a comma separator and update the content
          vatElement.textContent = value.toLocaleString();
        }
      }
  
      if (totalAmountElement) {
        const value = parseInt(totalAmountElement.textContent, 10);
        if (!isNaN(value)) {
          // Format the number with a comma separator and update the content
          totalAmountElement.textContent = value.toLocaleString();
        }
      }
  
      if (grandtotalElement) {
        const value = parseInt(grandtotalElement.textContent, 10);
        if (!isNaN(value)) {
          // Format the number with a comma separator and update the content
          grandtotalElement.textContent = value.toLocaleString();
        }
      }
    }
    else{
      shippingElement.textContent = 0;
      vatElement.textContent = 0;
      grandtotalElement.textContent=0;
    }
    

  
    const productItemsContainer = document.querySelector('.checkoutlist');
    productItemsContainer.innerHTML = '';

    // Iterate through the items in localStorage
    for (const cartItem of cartlist) {
    // Create a new product item in the provided format
    const productItem = document.createElement('article');
    productItem.classList.add('checkoutitemcontainer');

    productItem.innerHTML = `
        <article class="leftsectionitem">
        <img src="${cartItem.imageUrl}" alt="${cartItem.name}" class="checkoutimg">
        <article>
            <h3 class="singleitemheading">${cartItem.name}</h3>
            <p class="singleitempara">$${cartItem.price}</p>
        </article>
        </article>
        <p class="itemcount">x${cartItem.quantity}</p>
    `;

    // Append the newly created product item to the container
    productItemsContainer.appendChild(productItem);
    }

  }

  getSummaryDataDetail()