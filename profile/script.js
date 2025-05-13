// Write your script here
const fName = document.getElementById("fName")
const lName = document.getElementById("lName")
const saveInfo = document.getElementById("saveInfo")
const oldPassword = document.getElementById("oldPassword")
const newPassword = document.getElementById("newPassword")
const confirmNewPassword = document.getElementById("confirmNewPassword")
const changePassword = document.getElementById("changePassword")
const logout = document.getElementById("logout")
const errMsg1 = document.getElementById("error1")
const errMsg2 = document.getElementById("error2")
const userInfo = document.getElementById("user-info")

let currentUser = JSON.parse(localStorage.getItem("currentUser"))
if(currentUser){
  let users = JSON.parse(localStorage.getItem("users") || "[]")
  function displayUser(){
    let userIndex = users.findIndex((user) => user.email == currentUser.email)
    if(userIndex !== -1){
      let userFirstName = users[userIndex].firstName
      userInfo.textContent = `Welcome ${userFirstName}`
    }
  }
  displayUser()
  saveInfo.addEventListener("click", () => {
    if(fName.value.trim() == "" || lName.value.trim() == ""){
      errMsg1.textContent = "Fields can't be empty."
      setTimeout(() => {
        errMsg1.textContent = ""
      }, 2000)
    } else {
      let userIndex = users.findIndex((user) => user.email == currentUser.email)
      if(userIndex !== -1){
        users[userIndex].firstName = fName.value;
        users[userIndex].lastName = lName.value;
        localStorage.setItem("users", JSON.stringify(users))
      }
    }
  })

  changePassword.addEventListener("click", () => {
    if(oldPassword.value == "" || newPassword.value == "" || confirmNewPassword.value == ""){
      errMsg2.textContent = "Fields can't be empty."
      setTimeout(() => {
        errMsg2.textContent = ""
      }, 2000)
    } else if(newPassword.value === confirmNewPassword.value){
        let userIndex = users.findIndex((user) => user.email == currentUser.email && user.password == oldPassword.value)
        if(userIndex !== -1){
          users[userIndex].password = newPassword.value;
          localStorage.setItem("users", JSON.stringify(users))
        } else {
          errMsg2.textContent = "Incorrect Old Password."
          setTimeout(() => {
            errMsg2.textContent = ""
          }, 2000)
      }
    } else {
      errMsg2.textContent = "New passwords do not match.";
      setTimeout(() => (errMsg2.textContent = ""), 2000);
    }
  })

  logout.addEventListener("click", () => {
    localStorage.removeItem("currentUser")
    window.location.href = "../login/login.html"
  })
  document.querySelector(".logoutLink").addEventListener("click", () => {
  localStorage.removeItem("currentUser")
  window.location.href = "../login/login.html"
})
} else {
  window.location.href = "../login/login.html"
}
