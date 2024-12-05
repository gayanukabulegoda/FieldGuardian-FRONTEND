import AuthService from "../services/AuthService.js";
import UserService from "../services/UserService.js";

$(document).ready(function () {
  const userSignUpRequestDTO = JSON.parse(
    localStorage.getItem("userSignUpRequestDTO")
  );
  if (userSignUpRequestDTO) {
    requestOtp(0, userSignUpRequestDTO.email);
  }

  const resetPasswordRequestDTO = JSON.parse(
    localStorage.getItem("resetPasswordRequestDTO")
  );
  if (resetPasswordRequestDTO) {
    requestOtp(1, resetPasswordRequestDTO.email);
  }

  const otpInputs = $(".otp-input");
  let resendTimer;
  let resendEnabled = true;

  // Focus handling and auto-tab
  otpInputs.on("input", function (e) {
    const input = $(this);
    const value = input.val();

    // Ensure only numbers
    if (!/^\d*$/.test(value)) {
      input.val("");
      return;
    }

    // Auto-tab to next input
    if (value.length === 1) {
      const nextInput = input.next(".otp-input");
      if (nextInput.length) {
        nextInput.focus();
      }
    }
  });

  // Backspace handling
  otpInputs.on("keydown", function (e) {
    const input = $(this);
    if (e.key === "Backspace" && !input.val()) {
      const prevInput = input.prev(".otp-input");
      if (prevInput.length) {
        prevInput.focus().val("");
      }
    }
  });

  // Paste handling
  otpInputs.first().on("paste", function (e) {
    e.preventDefault();
    const pastedData = (e.originalEvent.clipboardData || window.clipboardData)
      .getData("text")
      .slice(0, 6)
      .split("");

    otpInputs.each(function (index) {
      if (pastedData[index]) {
        $(this).val(pastedData[index]);
      }
    });

    // Focus the last filled input
    const lastFilledInput = otpInputs
      .filter(function () {
        return $(this).val() !== "";
      })
      .last();

    if (lastFilledInput.length) {
      lastFilledInput.focus();
    }
  });

  // Form submission
  $(".otp-form").on("submit", function (e) {
    e.preventDefault();

    let otp = "";
    otpInputs.each(function () {
      otp += $(this).val();
    });

    if (otp.length === 6) {
      if (userSignUpRequestDTO) {
        userSignUpRequestDTO.otp = otp;
        signUpUser(userSignUpRequestDTO);
      } else if (resetPasswordRequestDTO) {
        resetPasswordRequestDTO.otp = otp;
        updateCurrentUser(resetPasswordRequestDTO);
      } else {
        alert("Invalid request. Please try again.");
      }
    } else {
      alert("Please enter a complete 6-digit OTP");
    }
  });

  // Resend OTP handling
  $(".resend-link").on("click", function (e) {
    e.preventDefault();

    if (!resendEnabled) {
      return;
    }

    // Disable resend button and start countdown
    resendEnabled = false;
    const $resendLink = $(this);
    let countdown = 5;

    $resendLink.text(`Resend in ${countdown}s`);

    resendTimer = setInterval(function () {
      countdown--;
      if (countdown <= 0) {
        clearInterval(resendTimer);
        $resendLink.text("Resend");
        resendEnabled = true;
        resentOtp();
      } else {
        $resendLink.text(`Resend in ${countdown}s`);
      }
    }, 1000);

    const resentOtp = () => {
      if (userSignUpRequestDTO) {
        requestOtp(0, userSignUpRequestDTO.email);
      } else if (resetPasswordRequestDTO) {
        requestOtp(1, resetPasswordRequestDTO.email);
      }
    };
  });

  // Clear timer on page unload
  $(window).on("unload", function () {
    if (resendTimer) {
      clearInterval(resendTimer);
    }
  });
});

const requestOtp = (option, email) => {
  AuthService.requestOtp(option, email)
    .then((response) => {
      console.log("OTP requested successfully:", response);
      return response;
    })
    .catch((error) => {
      console.error("Error requesting OTP:", error);
    });
};

const signUpUser = (userSignUpRequestDTO) => {
  AuthService.signUp(userSignUpRequestDTO)
    .done((response, textStatus, jqXHR) => {
      if (jqXHR.status === 201) {
        localStorage.removeItem("userSignUpRequestDTO");
        localStorage.setItem(
          "email",
          JSON.stringify(userSignUpRequestDTO.email)
        );
        // Save the received token in a cookie
        document.cookie = `token=${response.token}; path=/`;
        window.location.href = "/pages/homePage.html";
      } else {
        alert("Failed to sign up. Please try again.");
        clearOtpInputs();
      }
    })
    .fail((xhr, status, error) => {
      console.error("Error during sign-up:", error);
      alert("Your OTP is invalid or your account has already been created.");
      clearOtpInputs();
    });
};

const updateCurrentUser = (resetPasswordRequestDTO) => {
  UserService.updateUser(resetPasswordRequestDTO)
    .done((response, textStatus, jqXHR) => {
      if (jqXHR.status === 204) {
        localStorage.removeItem("resetPasswordRequestDTO");
        window.location.href = "/index.html";
      } else {
        alert("Failed to reset password. Please try again.");
        clearOtpInputs();
      }
    })
    .fail((xhr, status, error) => {
      console.error("Error during password reset:", error);
      alert("Failed to reset password. Please try again.");
      clearOtpInputs();
    });
};

const clearOtpInputs = () => {
  $(".otp-input").val("");
};
