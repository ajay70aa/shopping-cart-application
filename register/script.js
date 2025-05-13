// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))
const fname = document.getElementById("fname")
const lname = document.getElementById("lname")
const email = document.getElementById("email")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirmPassword")
const signupBtn = document.getElementById("signup")

const errorMsg = document.getElementById("error")

signupBtn.addEventListener("click", () => {
  if(fname.value.trim() == "" || lname.value.trim() == "" || email.value.trim() == "" || password.value.trim() == "" || confirmPassword.value.trim() == ""){
    errorMsg.textContent = "Enter all fields to continue.."
    setTimeout(() => {
      errorMsg.textContent = ""
    }, 2000)
  } else if(password.value == confirmPassword.value){
    let users = JSON.parse(localStorage.getItem("users") || "[]")
    let filteredUsers = users.filter((user) => user.email == email.value)

    if(filteredUsers.length > 0){
      errorMsg.textContent = "User already exists"
      
    } else {
      users.push({
        firstName: fname.value,
        lastName: lname.value,
        email: email.value,
        password: password.value,
        createdAt: new Date()
      })
      localStorage.setItem("users", JSON.stringify(users))
      fname.value = ""
      lname.value = ""
      email.value = ""
      password.value = ""
      confirmPassword.value = ""
      window.location.href = "../login/login.html"
    }
  } else {
    errorMsg.textContent = "Make sure password and confirm password are same"
  }
})