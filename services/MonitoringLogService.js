import config from "../config.js";
import { setDefaultAjaxHeaders } from "../utils/utils.js";
/**
 * @description This file contains monitoring log service ajax calls.
 */
setDefaultAjaxHeaders();
const MonitoringLogService = {
  saveMonitoringLog: function (monitoringLogSaveDTO) {
    const formData = new FormData();
    for (const key in monitoringLogSaveDTO) {
      formData.append(key, monitoringLogSaveDTO[key]);
    }
    return $.ajax({
      url: `${config.baseURL}${config.version}/monitoring-log`,
      type: "POST",
      processData: false,
      contentType: false,
      data: formData,
    });
  },

  updateMonitoringLog: function (id, monitoringLogSaveDTO) {
    const formData = new FormData();
    for (const key in monitoringLogSaveDTO) {
      formData.append(key, monitoringLogSaveDTO[key]);
    }
    return $.ajax({
      url: `${config.baseURL}${config.version}/monitoring-log/${id}`,
      type: "PATCH",
      processData: false,
      contentType: false,
      data: formData,
    });
  },

  updateMonitoringLogStaffAndCrops: function (updateDTO) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/monitoring-log/update-staff-and-crops`,
      type: "PATCH",
      contentType: "application/json",
      data: JSON.stringify(updateDTO),
    });
  },

  deleteMonitoringLog: function (id) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/monitoring-log/${id}`,
      type: "DELETE",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during monitoring log deletion:", error);
        throw new Error("Failed to delete monitoring log");
      },
    });
  },

  getMonitoringLog: function (id) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/monitoring-log/${id}`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during monitoring log retrieval:", error);
        throw new Error("Failed to retrieve monitoring log");
      },
    });
  },

  getAllMonitoringLogs: function () {
    return $.ajax({
      url: `${config.baseURL}${config.version}/monitoring-log`,
      type: "GET",
      success: function (response) {
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error during monitoring logs retrieval:", error);
        throw new Error("Failed to retrieve monitoring logs");
      },
    });
  },

  getCropsByMonitoringLogId: function (id) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/monitoring-log/${id}/crops`,
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

  getStaffByMonitoringLogId: function (id) {
    return $.ajax({
      url: `${config.baseURL}${config.version}/monitoring-log/${id}/staff`,
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
};

export default MonitoringLogService;
