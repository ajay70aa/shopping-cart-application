document.addEventListener("DOMContentLoaded", () => {
  let currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    window.location.href = "../login/login.html";
    return;
  }
  const cartItemsContainer = document.querySelector(".items-container");
  const priceDetailsContainer = document.querySelector(".price-details");
  const cartTotal = document.getElementById("cart-total")
  const navbar = document.querySelector(".nav-items")
  
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  if(cartItems){
    renderNavbar()
    renderItems()
    renderPriceList()
    addCartTotal()
  } else{
    cartItemsContainer.innerHTML += "<div>Cart is Empty!</div>"
  }
  function renderNavbar() {
    navbar.innerHTML = ""
    navbar.innerHTML = currentUser ? 
    `<a href="../index.html">Home</a>
      <a href="../shop/index.html">Shop</a>
      <a href="cart/index.html">My Cart</a>
      <a href="../profile/index.html">My Profile</a>
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
  function renderItems(){
    cartItemsContainer.innerHTML = ""
    cartItems.forEach((item) => {
      const itemHTML = `
        <div class="item">
          <img src="${item.image}" alt="Item" />
          <div class="info">
            <div class="title">${item.title}</div><br/>
            <div class="price">$${item.price}</div>
          </div>
          <button class="removeBtn">Remove from Cart</button>
        </div>
      `
      cartItemsContainer.innerHTML += itemHTML
    })
    document.querySelectorAll(".removeBtn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        removeItem(index);
      });
    });
  }
  function renderPriceList(){
    priceDetailsContainer.innerHTML = ""
    cartItems.forEach((item) => {
      const listItemHTML = `
        <div class="list-item">
          <div class="item-title-wrapper">
            <p class="item-title">${item.title}</p>
            <span class="item-quantity">(x${item.quantity})</span>
          </div>
          <p item-price>$${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      `
      priceDetailsContainer.innerHTML += listItemHTML
    })
  }
  function addCartTotal(){
    let total = 0;
    cartItems.forEach((item => {
      total += item.price * item.quantity;
    }))
    cartTotal.textContent = `$${total.toFixed(2)}`;
  }
  function removeItem(index) {
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    renderItems();
    renderPriceList();
    addCartTotal();
  }
})