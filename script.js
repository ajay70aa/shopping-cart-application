document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login");
  const signupBtn = document.getElementById("signup");
  const navbar = document.querySelector(".nav-items");

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  renderNavbar();

  if (currentUser) {
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";

    const shopBtn = document.createElement("button");
    shopBtn.id = "shop";
    shopBtn.textContent = "Shop";
    document.querySelector(".buttons").appendChild(shopBtn);

    shopBtn.addEventListener("click", () => {
      window.location.href = "shop/index.html";
    });
  } else {
    loginBtn.addEventListener("click", () => {
      window.location.href = "login/index.html";
    });
    signupBtn.addEventListener("click", () => {
      window.location.href = "register/index.html";
    });
  }

  function renderNavbar() {
    navbar.innerHTML = currentUser
      ? `
      <a href="index.html">Home</a>
      <a href="shop/index.html">Shop</a>
      <a href="cart/index.html">My Cart</a>
      <a class="logoutLink" href="#">Logout</a>
    `
      : `
      <a href="index.html">Home</a>
      <a href="login/login.html">Login</a>
      <a href="register/index.html">Signup</a>
    `;

    document.querySelector(".logoutLink")?.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "login/login.html";
    });
  }
});
