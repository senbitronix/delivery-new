const buttonAuth = document.querySelector(".button-auth");
const buttonOut = document.querySelector(".button-out");
const userName = document.querySelector(".user-name");

const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.getElementById("logInForm");
const inputLogin = document.getElementById("login");
const inputPassword = document.getElementById("password");

const buttonCart = document.querySelector(".button-cart");

const login = (user) => {
  buttonAuth.style.display = "none";
  buttonOut.style.display = "block";
  userName.style.display = "block";
  userName.textContent = user.login;
  modalAuth.style.display = "none";
  buttonCart.style.display = "flex";
};
const logOut = () => {
  buttonCart.style.display = "none";
  buttonAuth.style.display = "flex";
  buttonOut.style.display = "none";
  userName.style.display = "none";
  modalAuth.style.display = "none";
  localStorage.removeItem("user");
};

buttonAuth.addEventListener("click", (e) => {
  modalAuth.style.display = "flex";
});

buttonOut.addEventListener("click", (e) => {
  logOut();
});

closeAuth.addEventListener("click", (e) => {
  modalAuth.style.display = "none";
});

logInForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = {
    login: inputLogin.value,
    password: inputPassword.value,
  };

  localStorage.setItem("user", JSON.stringify(user));
  login(user);
});

let localUser = localStorage.getItem("user");
if (localUser) {
  login(JSON.parse(localUser));
}
