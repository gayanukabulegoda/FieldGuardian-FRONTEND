$(document).ready(function () {
  // Password visibility toggle
  $(".password-toggle").click(function () {
    const passwordInput = $(this).siblings("input");
    const type =
      passwordInput.attr("type") === "password" ? "text" : "password";
    passwordInput.attr("type", type);

    // Toggle eye icon (assuming you have both open and closed eye icons)
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
    }
  });
});
