import config from "../config.js";
import { setDefaultAjaxHeaders } from "../utils/utils.js";
/**
 * @description This file contains staff service ajax calls.
 */
setDefaultAjaxHeaders();
const StaffService = {
  saveStaff: function (staffDTO) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/staff`,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(staffDTO),
    });
  },

  updateStaff: function (id, staffDTO) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/staff/${id}`,
      type: "PATCH",
      contentType: "application/json",
      data: JSON.stringify(staffDTO),
    });
  },

  deleteStaff: function (id) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/staff/${id}`,
      type: "DELETE",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during staff deletion:", error);
        throw new Error("Failed to delete staff");
      },
    });
  },

  getStaff: function (id) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/staff/${id}`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during staff retrieval:", error);
        throw new Error("Failed to retrieve staff");
      },
    });
  },

  getAllStaff: function () {
    return $.ajax({
      url: `${config.baseURL}${config.version}/staff`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during staff retrieval:", error);
        throw new Error("Failed to retrieve staff");
      },
    });
  },

  getStaffVehicles: function (id) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/staff/${id}/vehicles`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during staff vehicles retrieval:", error);
        throw new Error("Failed to retrieve staff vehicles");
      },
    });
  },

  getStaffFields: function (id) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/staff/${id}/fields`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during staff fields retrieval:", error);
        throw new Error("Failed to retrieve staff fields");
      },
    });
  },

  getStaffWithoutEquipment: function () {
    return $.ajax({
      url: `${config.baseURL}${config.version}/staff/without-equipment`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during staff without equipment retrieval:", error);
        throw new Error("Failed to retrieve staff without equipment");
      },
    });
  },

  getAllStaffDesignations: function () {
    return $.ajax({
      url: `${config.baseURL}${config.version}/staff/designations`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during staff designations retrieval:", error);
        throw new Error("Failed to retrieve staff designations");
      },
    });
  },

  filterStaff: function (filterDTO) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/staff/filter`,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(filterDTO),
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during staff filtering:", error);
        throw new Error("Failed to filter staff");
      },
    });
  },
};

export default StaffService;
