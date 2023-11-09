function getModalSummaryDataDetail() {
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
    const totalAmountElement = document.querySelector(".modaltotal");
    const modaltotalvalue=localStorage.getItem("grandtotal");
    // Update the content of the element with the calculated total value
    totalAmountElement.textContent = `${modaltotalvalue}`;

    // change format of number displayed
    if (totalAmountElement) {
      const value = parseInt(totalAmountElement.textContent, 10);
      if (!isNaN(value)) {
        // Format the number with a comma separator and update the content
        totalAmountElement.textContent = value.toLocaleString();
      }
    }

    

  
    const productItemsContainer = document.querySelector('.orderleftcontainer');
    productItemsContainer.innerHTML = '';

    // Check if there's at least one item in the cartlist
    if (cartlist.length > 0) {
        const cartItem = cartlist[0]; // Access the first item in cartlist

        // Create a new product item for the first item
        const productItem = document.createElement('article');
        productItem.classList.add('orderleftside');

        productItem.innerHTML = `
            
                <article class="leftsidecontainer">
                    <img src="${cartItem.imageUrl}" alt="${cartItem.name}" class="productorderimage">
                    <article>
                        <h3 class="ordermaintitle">${cartItem.name}</h3>
                        <p class="ordermainprice">$${cartItem.price}</p>
                    </article>
                    <p class="ordermaincount">x${cartItem.quantity}</p>
                </article>
                <hr class="hrorder">
                <p class="orderextradetail">and ${cartlist.length - 1} other item(s)</p>
            
        `;

        // Append the newly created product item to the container
        productItemsContainer.appendChild(productItem);
    }


    // other code
    // const productItemsContainer = document.querySelector('.orderleftcontainer');
    // productItemsContainer.innerHTML = '';

    // // Check if there's at least one item in the cartlist
    // if (cartlist.length > 0) {
    //     const cartItem = cartlist[0]; // Access the first item in cartlist

    //     // Create a new product item for the first item
    //     const productItem = document.createElement('article');
    //     productItem.classList.add('orderleftside');

    //     productItem.innerHTML = `
    //         <img src="${cartItem.imageUrl}" alt="${cartItem.name}" class="productorderimage">
    //         <article>
    //         <h3 class="ordermaintitle">${cartItem.name}</h3>
    //         <p class="ordermainprice">$${cartItem.price}</p>
    //         </article>
    //         <p class="ordermaincount">x${cartItem.quantity}</p>
    //         <hr class="hrorder">
    //         <p class="orderextradetail">and ${cartlist.length - 1} other item(s)</p>
    //     `;

    //     // Append the newly created product item to the container
    //     productItemsContainer.appendChild(productItem);
    // }



  }

  getModalSummaryDataDetail()