import UserService from "../services/UserService.js";
import AuthService from "../services/AuthService.js";
import { getJwtToken } from "../utils/utils.js";

$(document).ready(function () {
  const email = JSON.parse(localStorage.getItem("email"));
  const jwtToken = getJwtToken();
  let currentUser = null;
  if (jwtToken) {
    refreshUserToken(jwtToken).then((response) => {
      if (response && response.token) {
        // Set the new token in the cookie
        document.cookie = `token=${response.token}; path=/`;
        localStorage.removeItem("role");
        if (email) {
          getCurrentUser(email).then((user) => {
            if (user) {
              currentUser = user;
              // Set initial user data
              $(".user-name").text(user.name.split(" ")[0]);
              $(".profile-name").text(truncateText(user.name, 18));
              $(".profile-email").text(truncateText(user.email, 24));
              setProfileImageBasedOnGender(
                user.gender,
                ".user-profile .profile-image img"
              );
              setProfileImageBasedOnGender(
                user.gender,
                "#headerProfileBtn img"
              );
              // Initialize with user data
              setMyProiflePopupData(user);
              setUpdatePasswordPopupData(user);
              localStorage.setItem("role", JSON.stringify(user.role));
            } else {
              console.error("Failed to retrieve current user.");
            }
          });
        } else {
          console.error("No email found in localStorage.");
        }
      }
    });
  }

  // Truncate text to a specific character limit
  function truncateText(text, limit) {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  }

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
    logoutUser();
  });

  updateDate();
  setInterval(updateDate, 60000); // Update date every minute

  // ------------ PopUps ------------

  // Event listeners for buttons
  $("#headerProfileBtn").on("click", function () {
    showMyProfilePopup();
  });

  $("#settingsBtn").on("click", function () {
    showUpdatePasswordPopup();
  });

  $("#profilePopup #closeBtn").on("click", function () {
    $("#profilePopup").fadeOut(300);
  });

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

    updateCurrentUser({ email: currentUser.email, password: newPassword });

    // Clear form data on page load
    $("#password, #confirmPassword").val("");
  });

  // Function to close popups when clicking outside the iframe
  function closePopupOutsideIframe(popupSelector) {
    $(document).on("click", function (event) {
      const iframe = document.getElementById("contentFrame");
      const iframeRect = iframe.getBoundingClientRect();
      const isInIframe =
        event.clientX >= iframeRect.left &&
        event.clientX <= iframeRect.right &&
        event.clientY >= iframeRect.top &&
        event.clientY <= iframeRect.bottom;

      if (!isInIframe) {
        const iframeDocument =
          iframe.contentDocument || iframe.contentWindow.document;
        if ($(iframeDocument).find(popupSelector).is(":visible")) {
          $(iframeDocument).find(popupSelector).fadeOut();
          if (iframe.contentWindow.enableStaffButtonsAndInputs) {
            iframe.contentWindow.enableStaffButtonsAndInputs();
          }
          if (iframe.contentWindow.enableEquipmentButtonsAndInputs) {
            iframe.contentWindow.enableEquipmentButtonsAndInputs();
          }
          if (iframe.contentWindow.enableCropButtonsAndInputs) {
            iframe.contentWindow.enableCropButtonsAndInputs();
          }
          if (iframe.contentWindow.enableFieldButtonsAndInputs) {
            iframe.contentWindow.enableFieldButtonsAndInputs();
          }
          if (iframe.contentWindow.enableMonitoringLogButtonsAndInputs) {
            iframe.contentWindow.enableMonitoringLogButtonsAndInputs();
          }
          if (iframe.contentWindow.enableVehicleButtonsAndInputs) {
            iframe.contentWindow.enableVehicleButtonsAndInputs();
          }
        }
      }
    });
  }

  // Close popups when clicking outside the popup
  closePopupOnClickOutside("#profilePopup", "#headerProfileBtn");
  closePopupOnClickOutside("#updatePasswordPopup", "#settingsBtn");

  // Close popups when clicking inside iframe
  closePopupOnClickInsideIframe("#contentFrame", [
    "#profilePopup",
    "#updatePasswordPopup",
  ]);

  // Close popups in iframe when clicking outside the iframe
  closePopupOutsideIframe(".system-users-popup");
  closePopupOutsideIframe(".delete-popup");
  closePopupOutsideIframe(".add-staff-popup");
  closePopupOutsideIframe(".view-staff-popup");
  closePopupOutsideIframe(".add-equipment-popup");
  closePopupOutsideIframe(".view-equipment-popup");
  closePopupOutsideIframe(".add-crop-popup");
  closePopupOutsideIframe(".view-crop-popup");
  closePopupOutsideIframe(".add-field-popup");
  closePopupOutsideIframe(".view-field-popup");
  closePopupOutsideIframe(".add-monitoring-popup");
  closePopupOutsideIframe(".view-monitoring-popup");
  closePopupOutsideIframe(".add-vehicle-popup");
  closePopupOutsideIframe(".view-vehicle-popup");

  function showMyProfilePopup() {
    setMyProiflePopupData(currentUser);
    $("#updatePasswordPopup").fadeOut(300);
    $("#profilePopup").fadeIn(300);
  }

  function setMyProiflePopupData(currentUser) {
    $("#profilePopup #userName").text(truncateText(currentUser.name, 18));
    $("#profilePopup #userEmail").text(truncateText(currentUser.email, 24));
    $("#profilePopup #userRole").text(currentUser.role);
    setProfileImageBasedOnGender(
      currentUser.gender,
      "#profilePopup .profile-image img"
    );
  }

  function showUpdatePasswordPopup() {
    setMyProiflePopupData(currentUser);
    $("#profilePopup").fadeOut(300);
    $("#updatePasswordPopup").fadeIn(300);
  }

  function setUpdatePasswordPopupData(currentUser) {
    $("#updatePasswordPopup #userName").text(
      truncateText(currentUser.name, 23)
    );
    $("#updatePasswordPopup #userEmail").text(
      truncateText(currentUser.email, 30)
    );
    setProfileImageBasedOnGender(
      currentUser.gender,
      "#updatePasswordPopup .profile-image img"
    );
  }

  function togglePasswordVisibility(toggleButton) {
    const passwordInput = toggleButton.siblings("input");
    const type =
      passwordInput.attr("type") === "password" ? "text" : "password";
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
          $(buttonSelector).focus();
        }
      }
    });
  }

  function closePopupOnClickOutside(popupSelector, triggerSelector) {
    $(document).on("click", function (event) {
      if (
        !$(event.target).closest(popupSelector + ", " + triggerSelector)
          .length &&
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
});

const setProfileImageBasedOnGender = (gender, container) => {
  if (gender === "FEMALE") {
    $(container).attr(
      "src",
      "/assets/images/default_female_user_profile_pic.jpg"
    );
  } else {
    $(container).attr(
      "src",
      "/assets/images/default_male_user_profile_pic.jpg"
    );
  }
};

const getCurrentUser = (email) => {
  return UserService.getUser(email)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error retrieving user:", error);
      return null;
    });
};

const updateCurrentUser = (updateUserDTO) => {
  UserService.updateUser(updateUserDTO)
    .done((response, textStatus, jqXHR) => {
      if (jqXHR.status === 204) {
        alert("Password updated successfully.");
        $("#updatePasswordPopup").fadeOut(300);
      } else {
        alert("Failed to update password. Please try again.");
        clearOtpInputs();
      }
    })
    .fail((xhr, status, error) => {
      console.error("Error during password update:", error);
      alert("Failed to update password. Please try again.");
      clearOtpInputs();
    });
};

const logoutUser = () => {
  localStorage.removeItem("email");
  localStorage.removeItem("role");
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  window.location.href = "/index.html";
};

const refreshUserToken = (refreshToken) => {
  return AuthService.refreshToken(refreshToken)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      logoutUser();
      console.error("Error refreshing token:", error);
      return null;
    });
};
