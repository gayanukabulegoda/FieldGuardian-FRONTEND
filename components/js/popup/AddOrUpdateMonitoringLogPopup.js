import MonitoringLogService from "../../../services/MonitoringLogService.js";
import FieldService from "../../../services/FieldService.js";
import StaffService from "../../../services/StaffService.js";
import CropService from "../../../services/CropService.js";

$(document).ready(function () {
  const $addMonitoringForm = $("#addMonitoringForm");
  const $actionType = $("#actionType");
  const $uploadArea = $("#uploadArea");
  const $fileInput = $("#monitoringImage");
  const $previewContainer = $("#previewContainer");
  const $imagePreview = $("#imagePreview");
  const $observation = $("#observation");
  const $charCount = $("#currentCount");
  const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes
  const selectedStaffIds = new Set();
  const selectedCropIds = new Set();

  function hideAddMonitoringPopup() {
    $("#addMonitoringPopup").fadeOut();
    $addMonitoringForm[0].reset();
    resetImageUpload();
    resetSelections();
    updateCharCount();
    enableMonitoringLogButtonsAndInputs();
  }

  function resetImageUpload() {
    $fileInput.val("");
    $previewContainer.hide();
    $imagePreview.attr("src", "");
  }

  function resetSelections() {
    selectedStaffIds.clear();
    selectedCropIds.clear();
    $(".selection-row").removeClass("selected");
  }

  // Character count for observation
  function updateCharCount() {
    const currentLength = $observation.val().length;
    $charCount.text(currentLength);
  }
  $observation.on("input", updateCharCount);

  // Close button handler
  $("#addMonitoringPopup #closeBtn").on("click", function () {
    hideAddMonitoringPopup();
  });

  // Image upload handling
  $uploadArea.on("click", function () {
    $fileInput.click();
  });

  $fileInput.on("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      showError("Please select a PNG, JPG, or JPEG image");
      resetImageUpload();
      return;
    }

    // Validate file size
    if (file.size > maxFileSize) {
      showError("File size must be less than 10MB");
      resetImageUpload();
      return;
    }

    // Preview image
    const reader = new FileReader();
    reader.onload = function (e) {
      $imagePreview.attr("src", e.target.result);
      $previewContainer.show();
      $uploadArea.addClass("has-image");
    };
    reader.readAsDataURL(file);
  });

  async function loadFieldData() {
    try {
      const fields = await getAllFieldData();
      fields.forEach((field) => {
        $("#field").append(
          `<option value="${field.code}">${field.name}</option>`
        );
      });
    } catch (error) {
      console.error("Error during field retrieval:", error);
    }
  }

  async function loadStaffData() {
    try {
      const staffData = await getAllStaffData();
      renderStaffRows(staffData);
    } catch (error) {
      console.error("Error during staff retrieval:", error);
    }
  }

  async function loadCropData() {
    try {
      const cropData = await getAllCropData();
      renderCropRows(cropData);
    } catch (error) {
      console.error("Error during crop retrieval:", error);
    }
  }

  function truncateText(text, limit) {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  }

  function renderStaffRows(staffData) {
    const $container = $("#staffContainer");
    $container.empty();

    staffData.forEach((staff) => {
      const name = `${staff.firstName} ${staff.lastName}`;
      const row = `
        <div class="selection-row" data-id="${staff.id}">
          <div class="selection-info">
            <span class="selection-name">${truncateText(name, 28)}</span>
            <span class="selection-detail">${truncateText(
              staff.contactNo,
              12
            )}</span>
          </div>
        </div>
      `;
      $container.append(row);
    });
  }

  function renderCropRows(cropData) {
    const $container = $("#cropContainer");
    $container.empty();

    cropData.forEach((crop) => {
      const row = `
        <div class="selection-row" data-id="${crop.code}">
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
      $container.append(row);
    });
  }

  // Selection handlers
  $("#staffContainer").on("click", ".selection-row", function () {
    const staffId = $(this).data("id");
    $(this).toggleClass("selected");

    if ($(this).hasClass("selected")) {
      selectedStaffIds.add(staffId);
    } else {
      selectedStaffIds.delete(staffId);
    }
  });

  $("#cropContainer").on("click", ".selection-row", function () {
    const cropId = $(this).data("id");
    $(this).toggleClass("selected");

    if ($(this).hasClass("selected")) {
      selectedCropIds.add(cropId);
    } else {
      selectedCropIds.delete(cropId);
    }
  });

  // Form submission handler
  $addMonitoringForm.on("submit", async function (event) {
    event.preventDefault();

    const date = new Date();
    const today = date.toISOString().split("T")[0];

    const monitoringLogDTO = {
      code: $("#logCode").val(),
      date: today,
      details: $("#observation").val(),
      fieldCode: $("#field").val(),
    };
    const file = $fileInput[0].files[0];
    if (file) monitoringLogDTO.observedImage = file;

    // Add validation
    if (!validateForm(monitoringLogDTO)) {
      return;
    }
    const actionType = $actionType.val();

    try {
      if (actionType === "add") {
        await addMontoringLogData(monitoringLogDTO);
        if (selectedStaffIds.size > 0 && selectedCropIds.size > 0) {
          const updateDTO = {
            monitoringLogId: monitoringLogDTO.code,
            staffIds: Array.from(selectedStaffIds),
            cropCodes: Array.from(selectedCropIds),
          };
          await updateMonitoringLogStaffAndCropsData(updateDTO);
        }
      } else if (actionType === "update") {
        // Convert base64 image to File objects if necessary
        if (
          !monitoringLogDTO.observedImage &&
          $imagePreview.attr("src").startsWith("data:image")
        ) {
          monitoringLogDTO.observedImage = base64ToFile(
            $imagePreview.attr("src"),
            "observed_image.png"
          );
        }

        await updateMontoringLogData(monitoringLogDTO.code, monitoringLogDTO);
        if (selectedStaffIds.size > 0 && selectedCropIds.size > 0) {
          const updateDTO = {
            monitoringLogId: monitoringLogDTO.code,
            staffIds: Array.from(selectedStaffIds),
            cropCodes: Array.from(selectedCropIds),
          };
          await updateMonitoringLogStaffAndCropsData(updateDTO);
        }
      }
      window.location.reload();
    } catch (error) {
      console.error("Error during monitoring log addition:", error);
    }
    hideAddMonitoringPopup();
  });

  // Convert base64 to File
  function base64ToFile(base64, filename) {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  // Form validation
  function validateForm(monitoringLogDTO) {
    if (!monitoringLogDTO.fieldCode) {
      showError("Please select a field");
      return false;
    }
    if (!monitoringLogDTO.details) {
      showError("Please add your observation");
      return false;
    }
    if (!monitoringLogDTO.observedImage && $actionType.val() === "add") {
      showError("Please select an image");
      return false;
    }
    if (selectedStaffIds.size === 0) {
      showError("Please select at least one staff member");
      return false;
    }
    if (selectedCropIds.size === 0) {
      showError("Please select at least one crop");
      return false;
    }
    return true;
  }

  function showError(message) {
    alert(message);
  }

  // Initialize popup
  function initializePopup() {
    loadFieldData();
    loadStaffData();
    loadCropData();
    updateCharCount();
  }
  initializePopup();
});

const addMontoringLogData = (monitoringLogDTO) => {
  return MonitoringLogService.saveMonitoringLog(monitoringLogDTO)
    .then((response, textStatus, jqXHR) => {
      if (jqXHR.status !== 201) {
        alert("Failed to add monitoring log");
      }
    })
    .catch((xhr, status, error) => {
      console.error("Error during monitoring log addition:", error);
      alert("Failed to add monitoring log");
    });
};

const updateMontoringLogData = (id, monitoringLogDTO) => {
  return MonitoringLogService.updateMonitoringLog(id, monitoringLogDTO)
    .then((response, textStatus, jqXHR) => {
      if (jqXHR.status !== 204) {
        alert("Failed to update monitoring log");
      }
    })
    .catch((xhr, status, error) => {
      console.error("Error during monitoring log update:", error);
      alert("Failed to update monitoring log");
    });
};

const updateMonitoringLogStaffAndCropsData = (updateDTO) => {
  return MonitoringLogService.updateMonitoringLogStaffAndCrops(updateDTO)
    .then((response, textStatus, jqXHR) => {
      if (jqXHR.status !== 204) {
        alert("Failed to update monitoring log staff and crops");
      }
    })
    .catch((xhr, status, error) => {
      console.error(
        "Error during monitoring log staff and crops update:",
        error
      );
      alert("Failed to update monitoring log staff and crops");
    });
};

const getAllFieldData = async () => {
  try {
    return await FieldService.getAllFields();
  } catch (error) {
    console.error("Error during field retrieval:", error);
  }
};

const getAllStaffData = async () => {
  try {
    return await StaffService.getAllStaff();
  } catch (error) {
    console.error("Error during staff retrieval:", error);
  }
};

const getAllCropData = async () => {
  try {
    return await CropService.getAllCrops();
  } catch (error) {
    console.error("Error during crop retrieval:", error);
  }
};
