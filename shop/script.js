document.addEventListener("DOMContentLoaded", () => {
  let currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    window.location.href = "../login/login.html";
    return;
  }

  const mensItemsContainer = document.querySelector("#mens-clothing .items");
  const womansItemsContainer = document.querySelector(
    "#womans-clothing .items"
  );
  const jeweleryItemsContainer = document.querySelector("#jewelery .items");
  const electronicsItemsContainer = document.querySelector(
    "#electronics .items"
  );

  const colorFilters = document.querySelectorAll(".color-filter");
  const sizeFilters = document.querySelectorAll(".size-filter");
  const priceFilters = document.querySelectorAll(".price-filter");
  const ratingSlider = document.getElementById("rating-filter");

  const navbar = document.querySelector(".nav-items")

  function renderNavbar(){
    navbar.innerHTML = ""
    navbar.innerHTML = currentUser ? 
    `<a href="../index.html">Home</a>
      <a href="index.html">Shop</a>
      <a href="../cart/index.html">My Cart</a>
      <a class="logoutLink">Logout</a>
    `: 
    `
    <a href="../index.html">Home</a>
    <a href="../login/login.html">Login</a>
    <a href="../register/index.html">Signup</a>
    <a href="../cart/index.html">My Cart</a>
    `;
    document.querySelector(".logoutLink").addEventListener("click", () => {
      localStorage.removeItem("currentUser")
      window.location.href = "../login/login.html"
    })
  }

  renderNavbar()

  function activeElement(event) {
    // Remove the active class from all filters
    const filters = document.querySelectorAll(".filter");
    filters.forEach((filter) => filter.classList.remove("active"));

    // Add the active class to the clicked filter
    event.target.classList.add("active");

    // Filter products based on the category clicked
    const category = event.target.dataset.category;
    renderProducts(category);
    
  }
  // Render products based on category
  function renderProducts(category) {
    let filteredProducts = [];

    switch (category) {
      case "mens-clothing":
        filteredProducts = products.filter(
          (product) => product.category === "men's clothing"
        );
        break;
      case "womens-clothing":
        filteredProducts = products.filter(
          (product) => product.category === "women's clothing"
        );
        break;
      case "jewelery":
        filteredProducts = products.filter(
          (product) => product.category === "jewelery"
        );
        break;
      case "electronics":
        filteredProducts = products.filter(
          (product) => product.category === "electronics"
        );
        break;
      default:
        filteredProducts = products;
        break;
    }

    // Clear the containers before rendering new products
    mensItemsContainer.innerHTML = "";
    womansItemsContainer.innerHTML = "";
    jeweleryItemsContainer.innerHTML = "";
    electronicsItemsContainer.innerHTML = "";

    // Render the filtered products
    filteredProducts.forEach((product) => {
      const colorCircles = product.colors
        .map(
          (color) => `
      <div class="circle" style="background-color: ${color}"></div>
    `
        )
        .join(" ");

      const itemHTML = `
      <div class="item">
        <img src="${product.image}" alt="Item" />
        <div class="info">
          <div class="title">${product.title}</div><br/>
          <div class="row">
            <div class="price">$${product.price}</div>
            <div class="sized">${product.sizes.join(", ")}</div>
          </div>
          <div class="colors">
            Colors:
            <div class="row">
              ${colorCircles}
            </div>
          </div>
          <div class="row">
            Rating: ${generateStarRating(parseFloat(product.rating.rate))}
            <span class="count-span">(${product.rating.count})</span>
          </div>
        </div>
        <button class="addBtn">Add to Cart</button>
      </div>
    `;

      if (product.category === "men's clothing") {
        mensItemsContainer.innerHTML += itemHTML;
      } else if (product.category === "women's clothing") {
        womansItemsContainer.innerHTML += itemHTML;
      } else if (product.category === "jewelery") {
        jeweleryItemsContainer.innerHTML += itemHTML;
      } else if (product.category === "electronics") {
        electronicsItemsContainer.innerHTML += itemHTML;
      }
    });
  }

  function renderFilteredProducts(filteredProducts) {
    // Clear all category containers
    mensItemsContainer.innerHTML = "";
    womansItemsContainer.innerHTML = "";
    jeweleryItemsContainer.innerHTML = "";
    electronicsItemsContainer.innerHTML = "";

    filteredProducts.forEach((product) => {
      const colorCircles = product.colors
        .map(
          (color) => `
      <div class="circle" style="background-color: ${color}"></div>
    `
        )
        .join("");

      const itemHTML = `
      <div class="item">
        <img src="${product.image}" alt="Item" />
        <div class="info">
          <div class="row">
            <div class="price">$${product.price}</div>
            <div class="sized">${product.sizes.join(", ")}</div>
          </div>
          <div class="colors">
            Colors:
            <div class="row">
              ${colorCircles}
            </div>
          </div>
          <div class="row">Rating: ${generateStarRating(
            parseFloat(product.rating.rate)
          )}</div>
        </div>
        <button class="addBtn">Add to Cart</button>
      </div>
    `;

      if (product.category === "men's clothing") {
        mensItemsContainer.innerHTML += itemHTML;
      } else if (product.category === "women's clothing") {
        womansItemsContainer.innerHTML += itemHTML;
      } else if (product.category === "jewelery") {
        jeweleryItemsContainer.innerHTML += itemHTML;
      } else if (product.category === "electronics") {
        electronicsItemsContainer.innerHTML += itemHTML;
      }
    });
  }
  function applyAllFilters() {
    const selectedColors = Array.from(colorFilters)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);
    const selectedSizes = Array.from(sizeFilters)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);
    const selectedPrices = Array.from(priceFilters)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);
    const minRating = parseFloat(ratingSlider.value);

    let filtered = products.filter((p) => {
      const matchColor =
        selectedColors.length === 0 ||
        (p.colors && p.colors.some((c) => selectedColors.includes(c)));
      const matchSize =
        selectedSizes.length === 0 ||
        (p.sizes && p.sizes.some((s) => selectedSizes.includes(s)));
      const matchRating = p.rating >= minRating;

      // Price Match
      let matchPrice = true;
      if (selectedPrices.length > 0) {
        matchPrice = selectedPrices.some((range) => {
          if (range === "100on") return p.price >= 100;
          const [min, max] = range.split("-").map(Number);
          return p.price >= min && p.price <= max;
        });
      }

      return matchColor && matchSize && matchRating && matchPrice;
    });
    renderFilteredProducts(filtered);
  }

  // Add click listeners to the filter buttons
  const filterButtons = document.querySelectorAll(".filter");
  filterButtons.forEach((button) => {
    button.addEventListener("click", activeElement);
  });

  // Fetch and store products if not already in localStorage
  let products = JSON.parse(localStorage.getItem("products"));
  if (products) {
    console.log(products);
    // Initial render: show all products by default
    renderProducts("all");
  } else {
    let colors = ["red", "blue", "black", "pink", "white"];
    let sizes = ["sm", "md", "lg", "xl"];
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        let newData = data.map((item) => {
          item.colors = colors.sort(() => 0.5 - Math.random()).slice(0, 3);
          item.sizes = sizes.sort(() => 0.5 - Math.random()).slice(0, 3);
          return item;
        });
        localStorage.setItem("products", JSON.stringify(newData));
        products = newData;

        colorFilters.forEach((cb) =>
          cb.addEventListener("change", applyAllFilters)
        );
        sizeFilters.forEach((cb) =>
          cb.addEventListener("change", applyAllFilters)
        );
        priceFilters.forEach((cb) =>
          cb.addEventListener("change", applyAllFilters)
        );
        ratingSlider.addEventListener("input", applyAllFilters);

        renderProducts("all");
      });
  }
  document.addEventListener("click", function (e) {
  if (e.target.classList.contains("addBtn")) {
    const itemElement = e.target.closest(".item");
    const img = itemElement.querySelector("img").src;
    const priceText = itemElement.querySelector(".price").innerText;
    const price = parseFloat(priceText.replace("$", ""));
    const title = itemElement.querySelector(".title").innerText;
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item already exists (based on image or title)
    const existingItem = cart.find(p => p.image === img);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        image: img,
        price: price,
        title: title,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
  }
  });

});

// Star rating generator function
function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  let starsHTML = "";
  for (let i = 0; i < fullStars; i++) {
    starsHTML += `<span style="color: gold;"><i class="fa-solid fa-star"></i></span>`;
  }
  if (halfStar) {
    starsHTML += `<span style="color: gold;"><i class="fa-solid fa-star-half"></i></span>`;
  }
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += `<span style="color: lightgray;"><i class="fa-solid fa-star"></i></span>`;
  }
  return starsHTML;
}
