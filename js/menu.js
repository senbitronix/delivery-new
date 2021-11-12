const cardsMenu = document.querySelector(".cards-menu");
const cartArray = JSON.parse(localStorage.getItem("cart")) || [];

let sectionHeading = document.querySelector(".section-heading");
let restaurant = JSON.parse(localStorage.getItem("restaurant"));

const changeTitle = (restor) => {
  sectionHeading.innerHTML = `
      <h2 class="section-title restaurant-title">${restor.name}</h2>
      <div class="card-info">
          <div class="rating">
            ${restor.stars}
          </div>
          <div class="price">${restor.price} ₽</div>
          <div class="category">${restor.kitchen}</div>
      </div>
  `;
};

const addToCart = (cartItem) => {
  if (cartArray.some((item) => item.id === cartItem.id)) {
    cartArray.find((item) => item.id === cartItem.id).count++;
  } else {
    cartArray.push(cartItem);
  }
  localStorage.setItem("cart", JSON.stringify(cartArray));
};

const renderItems = (data) => {
  data.forEach(({ id, name, description, price, image }) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `        
        <img src="${image}" alt="${name}" class="card-image" />
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title card-title-reg">${name}</h3>
          </div>
          <div class="card-info">
            <div class="ingredients">${description}</div>
          </div>
          <div class="card-buttons">
            <button class="button button-primary button-add-cart">
              <span class="button-card-text">В корзину</span>
              <span class="button-cart-svg"></span>
            </button>
            <strong class="card-price-bold">${price} ₽</strong>
          </div>
        </div>        
    `;

    cardsMenu.append(card);

    card.querySelector(".button-add-cart").addEventListener("click", (e) => {
      addToCart({
        name,
        price,
        count: 1,
        id,
      });
    });
  });
};

if (restaurant) {
  changeTitle(restaurant);
  fetch(
    `https://test-df8fb-default-rtdb.firebaseio.com/db/${restaurant.products}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => renderItems(data));
} else {
  window.location.href = "/";
}
