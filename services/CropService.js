import config from "../config.js";
import { setDefaultAjaxHeaders } from "../utils/utils.js";
/**
 * @description This file contains crop service ajax calls.
 */
setDefaultAjaxHeaders();
const CropService = {
  saveCrop: function (cropSaveDTO) {
    const formData = new FormData();
    for (const key in cropSaveDTO) {
      formData.append(key, cropSaveDTO[key]);
    }
    return $.ajax({
      url: `${config.baseURL}${config.version}/crop`,
      type: "POST",
      processData: false,
      contentType: false,
      data: formData,
    });
  },

  updateCrop: function (id, cropSaveDTO) {
    const formData = new FormData();
    for (const key in cropSaveDTO) {
      formData.append(key, cropSaveDTO[key]);
    }
    return $.ajax({
      url: `${config.baseURL}${config.version}/crop/${id}`,
      type: "PATCH",
      processData: false,
      contentType: false,
      data: formData,
    });
  },

  deleteCrop: function (id) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/crop/${id}`,
      type: "DELETE",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during crop deletion:", error);
        throw new Error("Failed to delete crop");
      },
    });
  },

  getCrop: function (id) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/crop/${id}`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during crop retrieval:", error);
        throw new Error("Failed to retrieve crop");
      },
    });
  },

  getAllCrops: function () {
    return $.ajax({
      url: `${config.baseURL}${config.version}/crop`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during crops retrieval:", error);
        throw new Error("Failed to retrieve crops");
      },
    });
  },
};

export default CropService;
