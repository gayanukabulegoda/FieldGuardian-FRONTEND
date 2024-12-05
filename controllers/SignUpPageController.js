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

  // Form validation
  $(".signup-form").submit(function (e) {
    e.preventDefault();

    const email = $("input[type='email']").val();
    const password = $("input[type='password']").first().val();
    const confirmPassword = $("input[type='password']").last().val();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const userSignUpRequestDTO = {
      email,
      password,
    };
    localStorage.setItem(
      "userSignUpRequestDTO",
      JSON.stringify(userSignUpRequestDTO)
    );
    window.location.href = "/pages/otpVerificationPage.html";
  });
});
