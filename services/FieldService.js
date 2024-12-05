import config from "../config.js";
import { setDefaultAjaxHeaders } from "../utils/utils.js";
/**
 * @description This file contains field service ajax calls.
 */
setDefaultAjaxHeaders();
const FieldService = {
  saveField: function (fieldSaveDTO) {
    const formData = new FormData();
    for (const key in fieldSaveDTO) {
      formData.append(key, fieldSaveDTO[key]);
    }
    return $.ajax({
      url: `${config.baseURL}${config.version}/field`,
      type: "POST",
      processData: false,
      contentType: false,
      data: formData,
    });
  },

  updateField: function (id, fieldSaveDTO) {
    const formData = new FormData();
    for (const key in fieldSaveDTO) {
      formData.append(key, fieldSaveDTO[key]);
    }
    return $.ajax({
      url: `${config.baseURL}${config.version}/field/${id}`,
      type: "PATCH",
      processData: false,
      contentType: false,
      data: formData,
    });
  },

  updateFieldStaff: function (id, staffIds) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/field/${id}/staff`,
      type: "PATCH",
      contentType: "application/json",
      data: JSON.stringify(staffIds),
    });
  },

  deleteField: function (id) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/field/${id}`,
      type: "DELETE",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during field deletion:", error);
        throw new Error("Failed to delete field");
      },
    });
  },

  getField: function (id) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/field/${id}`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during field retrieval:", error);
        throw new Error("Failed to retrieve field");
      },
    });
  },

  getAllFields: function () {
    return $.ajax({
      url: `${config.baseURL}${config.version}/field`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during fields retrieval:", error);
        throw new Error("Failed to retrieve fields");
      },
    });
  },

  getFieldStaff: function (id) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/field/${id}/staff`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during field staff retrieval:", error);
        throw new Error("Failed to retrieve field staff");
      },
    });
  },

  getFieldCrops: function (fieldId) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/field/${fieldId}/crops`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during field crops retrieval:", error);
        throw new Error("Failed to retrieve field crops");
      },
    });
  },
};

export default FieldService;
