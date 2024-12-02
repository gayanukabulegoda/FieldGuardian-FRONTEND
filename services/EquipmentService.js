import config from "../config.js";
import { setDefaultAjaxHeaders } from "../utils/utils.js";
/**
 * @description This file contains equipment service ajax calls.
 */
setDefaultAjaxHeaders();
const EquipmentService = {
  saveEquipment: function (equipmentDTO) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/equipment`,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(equipmentDTO),
    });
  },

  updateEquipment: function (id, equipmentDTO) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/equipment/${id}`,
      type: "PATCH",
      contentType: "application/json",
      data: JSON.stringify(equipmentDTO),
    });
  },

  updateFieldEquipments: function (fieldCode, equipmentIds) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/equipment/field/${fieldCode}`,
      type: "PATCH",
      contentType: "application/json",
      data: JSON.stringify(equipmentIds),
    });
  },

  updateEquipmentStaff: function (updateEquipmentStaffDTO) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/equipment/update-staff`,
      type: "PATCH",
      contentType: "application/json",
      data: JSON.stringify(updateEquipmentStaffDTO),
    });
  },

  deleteEquipment: function (id) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/equipment/${id}`,
      type: "DELETE",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during equipment deletion:", error);
        throw new Error("Failed to delete equipment");
      },
    });
  },

  getEquipment: function (id) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/equipment/${id}`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during equipment retrieval:", error);
        throw new Error("Failed to retrieve equipment");
      },
    });
  },

  getAllEquipments: function () {
    return $.ajax({
      url: `${config.baseURL}${config.version}/equipment`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during equipments retrieval:", error);
        throw new Error("Failed to retrieve equipments");
      },
    });
  },

  getAvailableEquipments: function () {
    return $.ajax({
      url: `${config.baseURL}${config.version}/equipment/available`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during available equipments retrieval:", error);
        throw new Error("Failed to retrieve available equipments");
      },
    });
  },

  getInUseFieldEquipments: function (fieldCode) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/equipment/field/${fieldCode}`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during in-use field equipments retrieval:", error);
        throw new Error("Failed to retrieve in-use field equipments");
      },
    });
  },
};

export default EquipmentService;
