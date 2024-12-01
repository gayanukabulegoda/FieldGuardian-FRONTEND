$(document).ready(function () {
  // Password visibility toggle
  $(".password-toggle").click(function () {
    const passwordInput = $(this).siblings("input");
    const type =
      passwordInput.attr("type") === "password" ? "text" : "password";
    passwordInput.attr("type", type);

    // Toggle eye icon
    const img = $(this).find("img");
    const currentSrc = img.attr("src");
    img.attr(
      "src",
      currentSrc.includes("/assets/icons/password-eye-close.svg")
        ? "/assets/icons/password-eye-open.svg"
        : "/assets/icons/password-eye-close.svg"
    );
  });

  // Password validation
  function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  }

  $(".signin-link").click(function () {
    localStorage.removeItem("email");
  });

  $(".reset-form").on("submit", function (e) {
    e.preventDefault();

    const newPassword = $("#newPassword").val();
    const confirmPassword = $("#confirmPassword").val();

    // Validate password strength
    if (!validatePassword(newPassword)) {
      alert(
        "Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters."
      );
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const email = JSON.parse(localStorage.getItem("email"));
    if (!email) {
      alert("Failed to reset password. Please try again.");
      return;
    } else {
      const resetPasswordRequestDTO = {
        email,
        password: newPassword,
      };
      localStorage.setItem(
        "resetPasswordRequestDTO",
        JSON.stringify(resetPasswordRequestDTO)
      );
      localStorage.removeItem("email");
      window.location.href = "/pages/otpVerificationPage.html";
    }
  });

  // Clear form data on page load
  $("#newPassword, #confirmPassword").val("");
});
