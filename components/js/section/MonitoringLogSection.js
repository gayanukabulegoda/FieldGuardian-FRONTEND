import MonitoringLogService from "../../../services/MonitoringLogService.js";
import FieldService from "../../../services/FieldService.js";

$(document).ready(function () {
  if (JSON.parse(localStorage.getItem("role")) === "ADMINISTRATIVE") {
    hideButtons();
  }
  async function loadMonitoringData() {
    try {
      const monitoringData = await getAllMonitoringLogData();
      renderMonitoringTable(monitoringData);
    } catch (error) {
      console.error("Error during monitoring logs retrieval:", error);
    }
  }

  async function loadTableWithFilteredData(filters = {}) {
    try {
      const monitoringData = await MonitoringLogService.filterMonitoringLogs(
        filters
      );
      if (monitoringData.length === 0) {
        alert("No monitoring log found for your search!");
        clearSearchInputs();
        loadMonitoringData();
      } else {
        renderMonitoringTable(monitoringData);
        clearSearchInputs();
      }
    } catch (error) {
      console.error("Error during monitoring logs retrieval:", error);
      alert("No monitoring log found for your search!");
      clearSearchInputs();
      loadMonitoringData();
    }
  }

  function clearSearchInputs() {
    $("#searchField").val("");
    $("#dateFilter").val("");
  }

  // Truncate text to a specific character limit
  function truncateText(text, limit) {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  function renderMonitoringTable(data) {
    const $tableBody = $("#monitoringTableBody");
    $tableBody.empty();

    data.forEach(async (log) => {
      let fieldName = "N/A";
      if (log.fieldCode) {
        const monitoredField = await getMonitoredField(log.fieldCode);
        fieldName = monitoredField ? monitoredField.name : "N/A";
      }
      const row = `
        <div class="table-row" data-log='${JSON.stringify(log)}'>
          <div>
            <img src="data:image/jpeg;base64,${log.observedImage}" alt="${
        log.field
      }" class="field-image">
          </div>
          <div>${formatDate(log.date)}</div>
          <div>${truncateText(fieldName, 30)}</div>
          <div>${log.staffCount}</div>
          <div class="action-buttons">
            <button class="action-btn edit" title="Edit">
              <img src="/assets/icons/edit-icon-silver.svg" alt="edit-icon" class="edit-icon">
            </button>
            <button class="action-btn view" title="View">
              <img src="/assets/icons/view-icon-silver.svg" alt="view-icon" class="view-icon">
            </button>
          </div>
        </div>
      `;
      $tableBody.append(row);
      if (JSON.parse(localStorage.getItem("role")) === "ADMINISTRATIVE") {
        hideButtons();
      }
    });
  }

  // Search button click handler
  $("#searchBtn").on("click", function () {
    const filters = {
      field: $("#searchField").val(),
      date: $("#dateFilter").val(),
    };
    if (!filters.field && !filters.date) {
      alert("Select a value to search!");
      clearSearchInputs();
      loadMonitoringData();
    } else {
      loadTableWithFilteredData(filters);
    }
  });

  // Action button handlers
  $(document).on("click", ".action-btn.edit", function () {
    const logData = $(this).closest(".table-row").data("log");
    showUpdateMonitoringLogPopup(logData);
  });

  $(document).on("click", ".action-btn.view", function () {
    const logData = $(this).closest(".table-row").data("log");
    showViewMonitoringLogPopup(logData);
  });

  // -------- View monitoring log popup --------
  const getFieldNameFromFieldCode = async (fieldCode) => {
    const fieldData = await getAssignedFieldData(fieldCode);
    return fieldData ? fieldData.name : "N/A";
  };

  const populateMonitoringLogDetails = async (monitoringData) => {
    let fieldName = "N/A";
    if (monitoringData.fieldCode) {
      fieldName = await getFieldNameFromFieldCode(monitoringData.fieldCode);
    }
    $("#viewField")
      .text(truncateText(fieldName, 30))
      .attr("data-full-text", fieldName);

    if (monitoringData.details) {
      $("#viewObservation")
        .text(monitoringData.details)
        .attr("data-full-text", monitoringData.details);
    } else {
      $("#viewObservation").text("No observation recorded...");
    }

    // Handle monitoring image
    if (monitoringData.observedImage) {
      $("#viewMonitoringImage").attr(
        "src",
        `data:image/jpeg;base64,${monitoringData.observedImage}`
      );
      $("#previewViewContainer").show();
    } else {
      setDefaultImage("#viewMonitoringImage", "#previewViewContainer");
    }

    try {
      const staffMembers = await getStaffDataByMonitoringLogId(
        monitoringData.code
      );
      // Populate staff members
      const $staffViewContainer = $("#staffViewContainer");
      $staffViewContainer.empty();
      if (staffMembers.length === 0) {
        $staffViewContainer.append(`
        <div class="selection-row">
          <div class="selection-info">
            <span class="selection-name">No staff assigned</span>
            <span class="selection-detail">----</span>
          </div>
        </div>`);
      } else {
        staffMembers.forEach((staff) => {
          const name = `${staff.firstName} ${staff.lastName}`;
          const row = `
        <div class="selection-row">
          <div class="selection-info">
            <span class="selection-name">${truncateText(name, 28)}</span>
            <span class="selection-detail">${truncateText(
              staff.contactNo,
              12
            )}</span>
          </div>
        </div>
      `;
          $staffViewContainer.append(row);
        });
      }
    } catch (error) {
      console.error("Error during staff retrieval:", error);
    }

    try {
      const crops = await getCropDataByMonitoringLogId(monitoringData.code);
      // Populate crops
      const $cropViewContainer = $("#cropViewContainer");
      $cropViewContainer.empty();
      if (crops.length === 0) {
        $cropViewContainer.append(`
        <div class="selection-row">
          <div class="selection-info">
            <span class="selection-name">No crops assigned</span>
            <span class="selection-detail">----</span>
          </div>
        </div>`);
      } else {
        crops.forEach((crop) => {
          const row = `
        <div class="selection-row">
          <div class="selection-info">
            <span class="selection-name">${truncateText(
              crop.commonName,
              28
            )}</span>
            <span class="selection-detail">${truncateText(
              crop.scientificName,
              28
            )}</span>
          </div>
        </div>
      `;
          $cropViewContainer.append(row);
        });
      }
    } catch (error) {
      console.error("Error during crops retrieval:", error);
    }
  };

  const showViewMonitoringLogPopup = (monitoringData) => {
    populateMonitoringLogDetails(monitoringData);
    $("#viewMonitoringPopup").fadeIn(300);
    disableMonitoringLogButtonsAndInputs();
  };

  const hideViewMonitoringPopup = () => {
    $("#viewMonitoringPopup").fadeOut();
    enableMonitoringLogButtonsAndInputs();
  };

  // Close button handlers
  $("#closeViewBtn, #closeButton").on("click", function () {
    hideViewMonitoringPopup();
  });

  // -------- Add monitoring log popup --------

  const $addMonitoringPopup = $("#addMonitoringPopup");
  const $addMonitoringForm = $("#addMonitoringForm");
  const $popupTitle = $("#popupTitle");
  const $saveBtn = $("#saveBtn");
  const $actionType = $("#actionType");

  const showAddMonitoringLogPopup = (logCode) => {
    $addMonitoringForm[0].reset();
    $popupTitle.text("Add Monitoring Log");
    $saveBtn.text("SAVE");
    $actionType.val("add");
    $("#logCode").val(logCode);
    $addMonitoringPopup.fadeIn(300);
    disableMonitoringLogButtonsAndInputs();
  };

  const showUpdateMonitoringLogPopup = (logData) => {
    $popupTitle.text("Update Monitoring Log");
    $saveBtn.text("UPDATE");
    $actionType.val("update");
    $("#logCode").val(logData.code);
    fillFormWithMonitoringLogData(logData);
    $addMonitoringPopup.fadeIn(300);
    disableMonitoringLogButtonsAndInputs();
  };

  const fillFormWithMonitoringLogData = (logData) => {
    $("#field").val(logData.fieldCode);
    $("#observation").val(logData.details);
    if (logData.observedImage) {
      $("#imagePreview").attr(
        "src",
        `data:image/jpeg;base64,${logData.observedImage}`
      );
      $("#previewContainer").show();
    } else {
      setDefaultImage("#imagePreview", "#previewContainer");
    }
  };

  const setDefaultImage = (imageId, previewContainerId) => {
    $(imageId).attr("src", "/assets/images/default_no_pic_image.png");
    $(previewContainerId).show();
  };

  $("#addBtn").on("click", function () {
    const firstRowLogCode = $("#monitoringTableBody .table-row:first").data(
      "log"
    ).code;
    const newLogCode = incrementLogCode(firstRowLogCode);
    showAddMonitoringLogPopup(newLogCode);
  });

  function incrementLogCode(logCode) {
    const parts = logCode.split("-");
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const todayDate = `${year}${month}${day}`;
    const numericPart = parseInt(parts[2], 10);
    const newNumericPart = String(numericPart + 1).padStart(3, "0");
    return `${parts[0]}-${todayDate}-${newNumericPart}`;
  }

  const disableMonitoringLogButtonsAndInputs = () => {
    $(".action-btn, #addBtn, #searchBtn, #searchField, #dateFilter").css(
      "pointer-events",
      "none"
    );
  };

  const enableMonitoringLogButtonsAndInputs = () => {
    $(".action-btn, #addBtn, #searchBtn, #searchField, #dateFilter").css(
      "pointer-events",
      "auto"
    );
  };
  window.enableMonitoringLogButtonsAndInputs =
    enableMonitoringLogButtonsAndInputs;

  // Initialize page
  loadMonitoringData();
});

const hideButtons = () => {
  $("#addBtn").hide();
  $(".action-btn.edit").hide();
};

const getAllMonitoringLogData = async () => {
  try {
    return await MonitoringLogService.getAllMonitoringLogs();
  } catch (error) {
    console.error("Error during monitoring logs retrieval:", error);
  }
};

const getMonitoredField = async (fieldId) => {
  try {
    return await FieldService.getField(fieldId);
  } catch (error) {
    console.error("Error during field retrieval:", error);
  }
};

const getAssignedFieldData = async (fieldId) => {
  try {
    return await FieldService.getField(fieldId);
  } catch (error) {
    console.error("Error during field retrieval:", error);
  }
};

const getCropDataByMonitoringLogId = async (logId) => {
  try {
    return await MonitoringLogService.getCropsByMonitoringLogId(logId);
  } catch (error) {
    console.error("Error during crops retrieval:", error);
  }
};

const getStaffDataByMonitoringLogId = async (logId) => {
  try {
    return await MonitoringLogService.getStaffByMonitoringLogId(logId);
  } catch (error) {
    console.error("Error during staff retrieval:", error);
  }
};
