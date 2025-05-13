const email = document.getElementById("email")
const password = document.getElementById("password")
const errorMsg = document.getElementById("error")

errorMsg.style.color = "red";

function generateToken(){
  return Math.random(0, 100000).toString()
}

document.getElementById("login").addEventListener("click", () => {
  if(email.value == "" || password.value == ""){
    errorMsg.textContent = "Enter all fields!"
    setTimeout(()=>{
      errorMsg.textContent = ""
    }, 2000)
  } else {
    let users = JSON.parse(localStorage.getItem("users") || "[]")
    let user = users.filter((user) => user.email == email.value)
    if(user.length > 0){
      let obj = user[0]
      if(obj.password == password.value){
        let currentUser = {
          email: obj.email,
          password: obj.password,
          token: generateToken(),
        }
        localStorage.setItem("currentUser", JSON.stringify(currentUser))
        email.value = ""
        password.value = ""
        window.location.href = "../profile/index.html"
      } else {
        errorMsg.textContent = "Invalid credentials."
        setTimeout(() => {
          errorMsg.textContent = ""
        }, 2000)
      }
    } else {
      errorMsg.textContent = "Invalid Credentials."
      setTimeout(() => {
        errorMsg.textContent = ""
      }, 2000)
    }
  }
})