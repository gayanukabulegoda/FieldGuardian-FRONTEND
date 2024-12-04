import config from "../config.js";
import { setDefaultAjaxHeaders } from "../utils/utils.js";
/**
 * @description This file contains dashboard service ajax calls.
 */
setDefaultAjaxHeaders();
const DashboardService = {
  getTotalUsers: function () {
    return $.ajax({
      url: `${config.baseURL}${config.version}/dashboard/user-count`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error fetching total users:", error);
        throw new Error("Failed to fetch total users");
      },
    });
  },

  getTotalActiveStaff: function () {
    return $.ajax({
      url: `${config.baseURL}${config.version}/dashboard/staff-count`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error fetching total active staff:", error);
        throw new Error("Failed to fetch total active staff");
      },
    });
  },

  getTotalActiveCrops: function () {
    return $.ajax({
      url: `${config.baseURL}${config.version}/dashboard/crop-count`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error fetching total active crops:", error);
        throw new Error("Failed to fetch total active crops");
      },
    });
  },

  getTotalActiveVehicles: function () {
    return $.ajax({
      url: `${config.baseURL}${config.version}/dashboard/vehicle-count`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error fetching total active vehicles:", error);
        throw new Error("Failed to fetch total active vehicles");
      },
    });
  },

  getTotalActiveEquipment: function () {
    return $.ajax({
      url: `${config.baseURL}${config.version}/dashboard/equipment-count`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error fetching total active equipment:", error);
        throw new Error("Failed to fetch total active equipment");
      },
    });
  },

  getTopMonitoredFields: function () {
    return $.ajax({
      url: `${config.baseURL}${config.version}/dashboard/top-fields`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error fetching top monitored fields:", error);
        throw new Error("Failed to fetch top monitored fields");
      },
    });
  },
};

export default DashboardService;
