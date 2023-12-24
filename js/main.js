let signInEmail = document.getElementById("signInEmail");
let signInPw = document.getElementById("signInPassword");
let signUpName = document.getElementById("signUpName");
let signUpEmail = document.getElementById("signUpEmail");
let signUpPw = document.getElementById("signUpPassword");
let logoutBtn = document.getElementById("logoutBtn");
let signUpBtn = document.getElementById("signupBtn");
let emailRegex = /^[a-zA-Z0-9]{4,16}@[a-z]{1,5}\.[a-z]{2,3}$/;
let PwRegex = /^[A-Za-z0-9]{6,20}$/;
let signUpBox = [];

if (localStorage.getItem("usersInfo") != null) {
  signUpBox = JSON.parse(localStorage["usersInfo"]);
}

function isSignUpEmpty() {
  if (
    signUpEmail.value == "" ||
    signUpPw.value == "" ||
    signUpName.value == ""
  ) {
    return false;
  }
  return true;
}

function isEmailExist(emailToCheck) {
  for (let i = 0; i < signUpBox.length; i++) {
    if (signUpBox[i].email.toLowerCase() == emailToCheck.toLowerCase()) {
      document.querySelector(".exist").classList.replace("d-none", "d-block");
      return true;
    }
  }
  return false;
}

function signUp() {
  if (isSignUpEmpty() == false) {
    document.querySelector(".wrong").classList.replace("d-none", "d-block");
  } else {
    if (
      PwRegex.test(signUpPw.value) == false ||
      emailRegex.test(signUpEmail.value) == false
    ) {
      if (PwRegex.test(signUpPw.value) == false) {
        document
          .querySelector(".validatePass")
          .classList.replace("d-none", "d-block");
      }
      if (emailRegex.test(signUpEmail.value) == false) {
        document
          .querySelector(".validateEmail")
          .classList.replace("d-none", "d-block");
      }
    } else {
      let singUpData = {
        name: signUpName.value,
        email: signUpEmail.value,
        password: signUpPw.value,
      };
      if (isEmailExist(singUpData.email)) {
        signUpName.value = "";
        signUpEmail.value = "";
        signUpPw.value = "";
      } else {
        signUpBox.push(singUpData);
        localStorage.setItem("usersInfo", JSON.stringify(signUpBox));
        document
          .querySelector(".passed")
          .classList.replace("d-none", "d-block");
        localStorage.setItem("userName", singUpData.name);
        window.location.href = "home.html";
      }
    }
  }
}

function isLoginEmpty() {
  if (signInEmail.value == "" || signInPw.value == "") {
    return false;
  }
  return true;
}

function logIn() {
  if (isLoginEmpty() == false) {
    document.querySelector(".wrong").classList.replace("d-none", "d-block");
  } else {
    let password = signInPw.value;
    let email = signInEmail.value;
    for (let i = 0; i < signUpBox.length; i++) {
      if (
        password.toLowerCase() == signUpBox[i].password.toLowerCase() &&
        email.toLowerCase() == signUpBox[i].email.toLowerCase()
      ) {
        localStorage.setItem("userName", signUpBox[i].name);
        window.location.href = "home.html";
        return;
      }
    }
    document
      .querySelector(".wrongLogin")
      .classList.replace("d-none", "d-block");
  }
}

if (document.getElementById("logo") != null) {
  document.getElementById("welcome").innerHTML =
    "Welcome " + localStorage.getItem("userName");
}

function logout() {
  window.location.href = "index.html";
}
