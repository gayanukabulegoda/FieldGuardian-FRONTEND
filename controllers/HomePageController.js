// Current user data (simulate backend data)
let currentUser = {
  name: "Gayanuka Bulegoda",
  email: "grbulegoda@gmail.com",
  role: "ADMINISTRATIVE",
};

// Update date in header
function updateDate() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const now = new Date();
  const dateString = `Today is ${days[now.getDay()]}, ${now.getDate()} ${
    months[now.getMonth()]
  } ${now.getFullYear()}`;
  $(".current-date").text(dateString);
}

// Navigation handling
$(".nav-item").click(function () {
  $(".nav-item").removeClass("active");
  $(this).addClass("active");
  $("#contentFrame").attr("src", $(this).data("page"));
});

// Logout handling
$("#logoutBtn").click(() => {
  window.location.href = "/index.html";
});

// Initialize
$(document).ready(() => {
  updateDate();
  setInterval(updateDate, 60000); // Update date every minute

  // Set initial user data
  $(".user-name").text(currentUser.name.split(" ")[0]);
  $(".profile-name").text(currentUser.name);
  $(".profile-email").text(currentUser.email);

  // PopUps -------------------

  // Initialize with user data
  setMyProiflePopupData(currentUser);
  setUpdatePasswordPopupData(currentUser);

  // Event listeners for buttons
  $("#headerProfileBtn").on("click", function () {
    showMyProfilePopup();
  });

  $("#settingsBtn").on("click", function () {
    showUpdatePasswordPopup();
  });

  // Close profile popup
  $("#profilePopup #closeBtn").on("click", function () {
    $("#profilePopup").fadeOut(300);
  });

  // Close profile popup
  $("#updatePasswordPopup #closeBtn").on("click", function () {
    $("#updatePasswordPopup").fadeOut(300);
  });

  // Password visibility toggle
  $(".toggle-password").click(function () {
    togglePasswordVisibility($(this));
  });

  // Move cursor to next input field on Enter key press
  moveToNextInputOnEnter("#updatePasswordPopup input", "#updatePasswordBtn");

  // Update password handler
  $("#updatePasswordBtn").on("click", function () {
    const newPassword = $("#password").val();
    const confirmPassword = $("#confirmPassword").val();

    // Validate password strength
    if (!validatePassword(newPassword)) {
      alert(
        "Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Here you would typically make an API call to update the password
    console.log("Password update request sent");

    // Clear form data on page load
    $("#password, #confirmPassword").val("");
  });

  // Close popups when clicking outside
  closePopupOnClickOutside("#profilePopup", "#headerProfileBtn");
  closePopupOnClickOutside("#updatePasswordPopup", "#settingsBtn");

  // Close popups when clicking inside iframe
  closePopupOnClickInsideIframe("#contentFrame", [
    "#profilePopup",
    "#updatePasswordPopup",
  ]);
});

// Show profile popup
function showMyProfilePopup() {
  setMyProiflePopupData(currentUser);
  $("#updatePasswordPopup").fadeOut(300);
  $("#profilePopup").fadeIn(300);
}

function setMyProiflePopupData(currentUser) {
  $("#profilePopup #userName").text(currentUser.name);
  $("#profilePopup #userEmail").text(currentUser.email);
  $("#profilePopup #userRole").text(currentUser.role);
}

function showUpdatePasswordPopup() {
  setMyProiflePopupData(currentUser);
  $("#profilePopup").fadeOut(300);
  $("#updatePasswordPopup").fadeIn(300);
}

function setUpdatePasswordPopupData(currentUser) {
  $("#updatePasswordPopup #userName").text(currentUser.name);
  $("#updatePasswordPopup #userEmail").text(currentUser.email);
}

function togglePasswordVisibility(toggleButton) {
  const passwordInput = toggleButton.siblings("input");
  const type = passwordInput.attr("type") === "password" ? "text" : "password";
  passwordInput.attr("type", type);

  // Toggle eye icon
  const img = toggleButton.find("img");
  const currentSrc = img.attr("src");
  img.attr(
    "src",
    currentSrc.includes("/assets/icons/password-eye-close.svg")
      ? "/assets/icons/password-eye-open.svg"
      : "/assets/icons/password-eye-close.svg"
  );
}

function moveToNextInputOnEnter(inputSelector, buttonSelector) {
  $(inputSelector).keypress(function (e) {
    if (e.which === 13) {
      // Enter key pressed
      e.preventDefault();
      const nextInput = $(this)
        .closest(".form-group")
        .next(".form-group")
        .find("input");
      if (nextInput.length) {
        nextInput.focus();
      } else {
        $(buttonSelector).focus(); // Focus the button if no more input fields
      }
    }
  });
}

function closePopupOnClickOutside(popupSelector, triggerSelector) {
  $(document).on("click", function (event) {
    if (
      !$(event.target).closest(popupSelector + ", " + triggerSelector).length &&
      $(popupSelector).is(":visible")
    ) {
      $(popupSelector).fadeOut(300);
    }
  });
}

function closePopupOnClickInsideIframe(iframeSelector, popupSelectors) {
  const iframe = $(iframeSelector);
  iframe.on("load", function () {
    $(this)
      .contents()
      .on("click", function () {
        popupSelectors.forEach((popupSelector) => {
          if ($(popupSelector).is(":visible")) {
            $(popupSelector).fadeOut(300);
          }
        });
      });
  });
}

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
