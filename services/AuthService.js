import config from "../config.js";

const AuthService = {
  signUp: function (userRequestDTO) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/auth/register`,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(userRequestDTO),
    });
  },

  signIn: function (userRequestDTO) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/auth/authenticate`,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(userRequestDTO),
    });
  },

  validateUser: function (token) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/auth/validate`,
      type: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during user validation:", error);
        throw new Error("Failed to validate user");
      },
    });
  },

  requestOtp: function (option, email) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/auth/otp?option=${option}&email=${email}`,
      type: "POST",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during OTP request:", error);
        throw new Error("Failed to request OTP");
      },
    });
  },
};

export default AuthService;