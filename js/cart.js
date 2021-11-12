(function () {
  /*  */
  const buttonCart = document.getElementById("cart-button");
  const modalCart = document.querySelector(".modal-cart");
  const modalBody = modalCart.querySelector(".modal-body");
  const close = modalCart.querySelector(".close");
  const buttonSend = modalCart.querySelector(".button-primary");
  let modalPricetag = document.querySelector(".modal-pricetag");

  const resetCart = () => {
    modalBody.innerHTML = "";
    localStorage.removeItem("cart");
    modalCart.classList.remove("is-open");
    cartArray.length = 0;
  };

  const incrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem("cart"));

    cartArray.find((item) => item.id === id).count++;

    localStorage.setItem("cart", JSON.stringify(cartArray));
    renderItems(cartArray);
  };
  const decrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem("cart"));

    let item = cartArray.find((item) => item.id === id);
    item.count = item.count > 0 ? --item.count : 0;

    localStorage.setItem("cart", JSON.stringify(cartArray));
    renderItems(cartArray);
  };

  const renderItems = (data) => {
    modalBody.innerHTML = "";
    let totalPrice = 0;
    if (data) {
      data.forEach(({ name, price, id, count }) => {
        let currentPrice = price * count;
        totalPrice += currentPrice;
        const cartElem = document.createElement("div");
        cartElem.classList.add("food-row");
        cartElem.innerHTML = `        
        <span class="food-name">${name}</span>
        <strong class="food-price">${currentPrice} ₽</strong>
        <div class="food-counter">
          <button class="counter-button btn-dec" data-index="${id}">-</button>
          <span class="counter">${count}</span>
          <button class="counter-button btn-inc" data-index="${id}">+</button>
        </div>				
      `;

        modalBody.append(cartElem);
      });
    }

    modalPricetag.textContent = `${totalPrice} ₽`;
  };
  // https://jsonplaceholder.typicode.com/posts
  modalBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-inc")) {
      incrementCount(e.target.dataset.index);
    } else if (e.target.classList.contains("btn-dec")) {
      decrementCount(e.target.dataset.index);
    }
  });

  buttonSend.addEventListener("click", (e) => {
    const cartArray = localStorage.getItem("cart");

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: cartArray,
    })
      .then((response) => {
        if (response.ok) {
          resetCart();
        }
      })
      .catch((e) => {
        console.error(e);
      });
  });

  buttonCart.addEventListener("click", (e) => {
    let cart = JSON.parse(localStorage.getItem("cart"));

    renderItems(cart);

    modalCart.classList.add("is-open");
  });
  close.addEventListener("click", (e) => {
    modalCart.classList.remove("is-open");
  });

  /*  */
})();
