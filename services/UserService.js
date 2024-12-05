import config from "../config.js";
import { setDefaultAjaxHeaders } from "../utils/utils.js";
/**
 * @description This file contains user service ajax calls.
 */
setDefaultAjaxHeaders();
const UserService = {
  updateUser: function (userRequestDTO) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/user/update`,
      type: "PATCH",
      contentType: "application/json",
      data: JSON.stringify(userRequestDTO),
    });
  },

  deleteUser: function (email) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/user?email=${email}`,
      type: "DELETE",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during user deletion:", error);
        throw new Error("Failed to delete user");
      },
    });
  },

  getUser: function (email) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/user?email=${email}`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during user retrieval:", error);
        throw new Error("Failed to retrieve user");
      },
    });
  },

  getAllUsers: function () {
    return $.ajax({
      url: `${config.baseURL}${config.version}/user/all`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during users retrieval:", error);
        throw new Error("Failed to retrieve users");
      },
    });
  },
};

export default UserService;
