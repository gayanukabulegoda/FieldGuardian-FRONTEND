import AuthService from "../services/AuthService.js";
import { getJwtToken } from "../utils/utils.js";

$(document).ready(function () {
  localStorage.removeItem("userSignUpRequestDTO");
  localStorage.removeItem("resetPasswordRequestDTO");

  const token = getJwtToken();
  if (token) {
    AuthService.validateUser(token)
      .then((response) => {
        if (response === true) {
          window.location.href = "/pages/homePage.html";
        } else {
          loadSignInPage();
        }
      })
      .catch((error) => {
        console.error("Error during user validation:", error);
        loadSignInPage();
      });
  } else {
    loadSignInPage();
  }
});

// Load sign-in page function
const loadSignInPage = () => {
  // Password visibility toggle
  $(".password-toggle").click(function () {
    const passwordInput = $(this).siblings("input");
    const type =
      passwordInput.attr("type") === "password" ? "text" : "password";
    passwordInput.attr("type", type);

    const img = $(this).find("img");
    const currentSrc = img.attr("src");
    img.attr(
      "src",
      currentSrc.includes("/assets/icons/password-eye-close.svg")
        ? "/assets/icons/password-eye-open.svg"
        : "/assets/icons/password-eye-close.svg"
    );
  });

  // Forgot password validation
  $("#forgot-password-link").click(function (e) {
    const email = $("#email").val();
    if (!email) {
      e.preventDefault();
      alert(
        "Please enter your email address before proceeding to forgot password."
      );
    } else {
      localStorage.setItem("email", JSON.stringify(email));
    }
  });

  // Sign-in form submission
  $(".login-form").on("submit", function (e) {
    e.preventDefault();

    const email = $("#email").val();
    const password = $("#password").val();
    const userRequestDTO = {
      email,
      password,
    };

    AuthService.signIn(userRequestDTO)
      .done((response, textStatus, jqXHR) => {
        if (jqXHR.status === 200) {
          // Save the received token in a cookie
          document.cookie = `token=${response.token}; path=/`;
          localStorage.setItem("email", JSON.stringify(email));
          window.location.href = "/pages/homePage.html";
        } else {
          console.log(jqXHR.status, ": Failed to sign in. Please try again.");
          alert("Failed to sign in. Please try again.");
        }
      })
      .fail((xhr, status, error) => {
        console.error("Error during sign-in:", error);
        alert("Failed to sign in. Please try again.");
      });
  });
};
