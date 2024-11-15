$(document).ready(function () {
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
      // Here you would typically make an API call to verify the OTP
      console.log("Verifying OTP:", otp);
      // Add your verification logic here
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
    let countdown = 10;

    $resendLink.text(`Resend in ${countdown}s`);

    resendTimer = setInterval(function () {
      countdown--;
      if (countdown <= 0) {
        clearInterval(resendTimer);
        $resendLink.text("Resend");
        resendEnabled = true;
      } else {
        $resendLink.text(`Resend in ${countdown}s`);
      }
    }, 1000);

    // Here you would typically make an API call to resend the OTP
    console.log("Resending OTP...");
    // Add your resend logic here
  });

  // Clear timer on page unload
  $(window).on("unload", function () {
    if (resendTimer) {
      clearInterval(resendTimer);
    }
  });
});
