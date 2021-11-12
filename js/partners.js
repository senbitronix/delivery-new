const cardsRestaurants = document.querySelector(".cards-restaurants");

const renderItems = (data) => {
  data.forEach((oneRestaurant) => {
    const { image, kitchen, name, price, products, stars, time_of_delivery } =
      oneRestaurant;
    const a = document.createElement("a");
    a.href = "/restaurant.html";
    a.classList.add("card");
    a.classList.add("card-restaurant");
    /* a.products = products; */
    a.innerHTML = `
            <img src="${image}" alt="${name}" class="card-image" />
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">${name}</h3>
								<span class="card-tag tag">${time_of_delivery} мин</span>
							</div>
							<div class="card-info">
								<div class="rating">
									${stars}
								</div>
								<div class="price">${price}</div>
								<div class="category">${kitchen}</div>
							</div>
						</div>
      `;

    cardsRestaurants.append(a);

    a.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.setItem("restaurant", JSON.stringify(oneRestaurant));
      window.location.href = "restaurant.html";
    });
  });
};

fetch("https://test-df8fb-default-rtdb.firebaseio.com/db/partners.json")
  .then((response) => {
    return response.json();
  })
  .then(
    (data) => {
      renderItems(data);
    },
    (error) => console.error(error)
  )
  .finally(() => console.log("finally"));
