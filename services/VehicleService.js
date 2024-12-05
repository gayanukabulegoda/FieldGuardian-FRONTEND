import config from "../config.js";
import { setDefaultAjaxHeaders } from "../utils/utils.js";
/**
 * @description This file contains vehicle service ajax calls.
 */
setDefaultAjaxHeaders();
const VehicleService = {
  saveVehicle: function (vehicleDTO) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/vehicle`,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(vehicleDTO),
    });
  },

  updateVehicle: function (id, vehicleDTO) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/vehicle/${id}`,
      type: "PATCH",
      contentType: "application/json",
      data: JSON.stringify(vehicleDTO),
    });
  },

  updateVehicleDriver: function (vehicleId, driverId) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/vehicle/${vehicleId}/driver/${driverId}`,
      type: "PATCH",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during vehicle driver update:", error);
        throw new Error("Failed to update vehicle driver");
      },
    });
  },

  deleteVehicle: function (id) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/vehicle/${id}`,
      type: "DELETE",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during vehicle deletion:", error);
        throw new Error("Failed to delete vehicle");
      },
    });
  },

  getVehicle: function (id) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/vehicle/${id}`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during vehicle retrieval:", error);
        throw new Error("Failed to retrieve vehicle");
      },
    });
  },

  getAllVehicles: function () {
    return $.ajax({
      url: `${config.baseURL}${config.version}/vehicle`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during vehicles retrieval:", error);
        throw new Error("Failed to retrieve vehicles");
      },
    });
  },

  filterVehicles: function (filterDTO) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/vehicle/filter`,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(filterDTO),
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during vehicle filtering:", error);
        throw new Error("Failed to filter vehicles");
      },
    });
  },
};

export default VehicleService;
