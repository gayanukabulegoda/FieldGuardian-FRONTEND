import FieldService from "../../../services/FieldService.js";
import EquipmentService from "../../../services/EquipmentService.js";

$(document).ready(function () {
  if (JSON.parse(localStorage.getItem("role")) === "ADMINISTRATIVE") {
    hideButtons();
  }
  async function loadFieldData(filters = {}) {
    try {
      const fieldData = await getAllFieldData();
      renderFieldTable(fieldData);
      if (JSON.parse(localStorage.getItem("role")) === "ADMINISTRATIVE") {
        hideButtons();
      }
    } catch (error) {
      console.error("Error during field retrieval:", error);
    }
  }

  // Truncate text to a specific character limit
  function truncateText(text, limit) {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  }

  // Extract coordinates from location string
  function extractCoordinates(location) {
    const regex = /Point \[x=(-?\d+\.\d+), y=(-?\d+\.\d+)\]/;
    const match = location.match(regex);
    if (match) {
      return { lat: match[1], lng: match[2] };
    }
    return null;
  }

  function renderFieldTable(data) {
    const $tableBody = $("#fieldTableBody");
    $tableBody.empty();

    data.forEach((field) => {
      const coordinates = extractCoordinates(field.location);
      const googleMapsLink = coordinates
        ? `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
        : "#";
      const row = `
        <div class="table-row" data-field='${JSON.stringify(field)}'>
          <div>
            <img src="data:image/jpeg;base64,${field.fieldImage1}" alt="${
        field.name
      }" class="field-image">
          </div>
          <div>${truncateText(field.name, 30)}</div>
          <div>
            <a href="${googleMapsLink}" target="_blank" class="location-link">
              View Location
            </a>
          </div>
          <div>${field.extentSize}</div>
          <div class="action-buttons">
            <button class="action-btn delete" title="Delete" data-id="${
              field.code
            }">
              <img src="/assets/icons/delete-icon-silver.svg" alt="delete-icon" class="delete-icon">
            </button>
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
    });
  }

  // Search button click handler
  $("#searchBtn").on("click", function () {
    const filters = {
      name: $("#searchName").val(),
      landSize: $("#landSizeFilter").val(),
    };
    loadFieldData(filters);
  });

  // Action button handlers
  $(document).on("click", ".action-btn.delete", function () {
    const fieldCode = $(this).data("id");
    showDeleteConfirmationPopup(fieldCode);
  });

  $(document).on("click", ".action-btn.edit", function () {
    const fieldData = $(this).closest(".table-row").data("field");
    showUpdateFieldPopup(fieldData);
  });

  $(document).on("click", ".action-btn.view", function () {
    const fieldData = $(this).closest(".table-row").data("field");
    showViewFieldPopup(fieldData);
  });

  // -------- View field popup --------

  const populateFieldDetails = async (fieldData) => {
    $("#viewName").text("");
    $("#viewExtentSize").text("");
    $("#viewLocation").attr("href", "#");
    $("#viewFieldImage1").attr("src", "");
    $("#viewFieldImage2").attr("src", "");
    $("#staffViewContainer").empty();
    $("#equipmentViewContainer").empty();

    const coordinates = extractCoordinates(fieldData.location);
    const googleMapsLink = coordinates
      ? `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
      : "#";
    $("#viewName")
      .text(truncateText(fieldData.name, 30))
      .attr("data-full-text", fieldData.name);
    $("#viewExtentSize")
      .text(fieldData.extentSize)
      .attr("data-full-text", fieldData.extentSize);
    $("#viewLocation").attr("href", googleMapsLink);

    // Handle images
    if (fieldData.fieldImage1) {
      $("#viewFieldImage1").attr(
        "src",
        `data:image/jpeg;base64,${fieldData.fieldImage1}`
      );
      $("#previewViewContainer1").show();
    } else {
      setDefaultImage("#viewFieldImage1", "#previewViewContainer1");
    }

    if (fieldData.fieldImage2) {
      $("#viewFieldImage2").attr(
        "src",
        `data:image/jpeg;base64,${fieldData.fieldImage2}`
      );
      $("#previewContainer2").show();
    } else {
      setDefaultImage("#viewFieldImage2", "#previewViewContainer2");
    }

    try {
      const staffMembers = await getAllFieldStaff(fieldData.code);
      // Populate staff members
      const $staffViewContainer = $("#staffViewContainer");
      $staffViewContainer.empty();
      if (staffMembers.length === 0) {
        $staffViewContainer.append(
          `<div class="selection-row">
          <div class="selection-info">
            <span class="selection-name">No Staff Assingned</span>
            <span class="selection-detail">----</span>
          </div>  
        </div>`
        );
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
      const equipments = await getAllFieldEquipment(fieldData.code);
      // Populate equipment
      const $equipmentViewContainer = $("#equipmentViewContainer");
      $equipmentViewContainer.empty();
      if (equipments.length === 0) {
        $equipmentViewContainer.append(
          `<div class="selection-row">
          <div class="selection-info">
            <span class="selection-name">No Equipment Assingned</span>
            <span class="selection-detail">----</span>
          </div>
        </div>`
        );
      } else {
        equipments.forEach((equipment) => {
          const row = `
        <div class="selection-row">
          <div class="selection-info">
            <span class="selection-name">${truncateText(
              equipment.name,
              30
            )}</span>
            <span class="selection-detail">${truncateText(
              equipment.type,
              23
            )}</span>
          </div>
        </div>
      `;
          $equipmentViewContainer.append(row);
        });
      }
    } catch (error) {
      console.error("Error during equipment retrieval:", error);
    }
  };

  const showViewFieldPopup = (fieldData) => {
    populateFieldDetails(fieldData);
    $("#viewFieldPopup").fadeIn(300);
    disableFieldButtonsAndInputs();
  };

  const hideViewFieldPopup = () => {
    $("#viewFieldPopup").fadeOut();
    enableFieldButtonsAndInputs();
  };

  // Close button handlers
  $("#closeViewBtn, #closeButton").on("click", function () {
    hideViewFieldPopup();
  });

  // -------- Delete confirmation popup --------

  $("#closeDeletePopupBtn").on("click", function () {
    hideDeleteConfirmationPopup();
  });

  // Confirm delete button handler
  $("#confirmDeleteBtn").on("click", async function () {
    try {
      const fieldCode = $(this).data("id");
      await FieldService.deleteField(fieldCode);
      $(`.table-row[data-id="${fieldCode}"]`).remove();
    } catch (error) {
      console.error("Error during field deletion:", error);
    }
    hideDeleteConfirmationPopup();
    loadFieldData();
  });

  const showDeleteConfirmationPopup = (fieldCode) => {
    $("#confirmDeleteBtn").data("id", fieldCode);
    $("#deleteConfirmationPopup").fadeIn(300);
    disableFieldButtonsAndInputs();
  };

  const hideDeleteConfirmationPopup = () => {
    $("#deleteConfirmationPopup").fadeOut(300);
    enableFieldButtonsAndInputs();
  };

  // -------- Add field popup --------

  const $addFieldPopup = $("#addFieldPopup");
  const $addFieldForm = $("#addFieldForm");
  const $popupTitle = $("#popupTitle");
  const $saveBtn = $("#saveBtn");
  const $actionType = $("#actionType");
  const $staffSelectionTitle = $("#staffSelectionTitle");
  const $equipmentSelectionTitle = $("#equipmentSelectionTitle");

  const showAddFieldPopup = (fieldCode) => {
    $addFieldForm[0].reset();
    $popupTitle.text("Add Field");
    $saveBtn.text("SAVE");
    $actionType.val("add");
    $staffSelectionTitle.text("Select Staff (Optional)");
    $equipmentSelectionTitle.text("Select Equipment (Optional)");
    $("#fieldCode").val(fieldCode);
    $addFieldPopup.fadeIn(300);
    disableFieldButtonsAndInputs();
  };

  const showUpdateFieldPopup = (fieldData) => {
    $popupTitle.text("Update Field");
    $saveBtn.text("UPDATE");
    $actionType.val("update");
    $staffSelectionTitle.text("Select Staff");
    $equipmentSelectionTitle.text("Select Equipment");
    $("#fieldCode").val(fieldData.code);
    fillFromWithFieldData(fieldData);
    $addFieldPopup.fadeIn(300);
    disableFieldButtonsAndInputs();
  };

  const fillFromWithFieldData = (fieldData) => {
    const coordinates = extractCoordinates(fieldData.location);
    const googleMapsLink = coordinates
      ? `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
      : "#";
    $("#name").val(fieldData.name);
    $("#location").val(googleMapsLink);
    $("#extentSize").val(fieldData.extentSize);
    if (fieldData.fieldImage1) {
      $("#imagePreview1").attr(
        "src",
        `data:image/jpeg;base64,${fieldData.fieldImage1}`
      );
      $("#previewContainer1").show();
    } else {
      setDefaultImage("#imagePreview1", "#previewContainer");
    }
    if (fieldData.fieldImage2) {
      $("#imagePreview2").attr(
        "src",
        `data:image/jpeg;base64,${fieldData.fieldImage2}`
      );
      $("#previewContainer2").show();
    } else {
      setDefaultImage("#imagePreview2", "#previewContainer2");
    }
  };

  const setDefaultImage = (imageId, previewContainerId) => {
    $(imageId).attr("src", "/assets/images/default_no_pic_image.png");
    $(previewContainerId).show();
  };

  // Show add field popup
  $("#addBtn").on("click", function () {
    const firstRowFieldCode = $("#fieldTableBody .table-row:first").data(
      "field"
    ).code;
    const newFieldCode = incrementFieldCode(firstRowFieldCode);
    showAddFieldPopup(newFieldCode);
  });

  function incrementFieldCode(fieldCode) {
    const parts = fieldCode.split("-");
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const todayDate = `${year}${month}${day}`;
    const numericPart = parseInt(parts[2], 10);
    const newNumericPart = String(numericPart + 1).padStart(3, "0");
    return `${parts[0]}-${todayDate}-${newNumericPart}`;
  }

  const disableFieldButtonsAndInputs = () => {
    $(".action-btn, #addBtn, #searchBtn, #searchName, #landSizeFilter").css(
      "pointer-events",
      "none"
    );
  };

  const enableFieldButtonsAndInputs = () => {
    $(".action-btn, #addBtn, #searchBtn, #searchName, #landSizeFilter").css(
      "pointer-events",
      "auto"
    );
  };
  window.enableFieldButtonsAndInputs = enableFieldButtonsAndInputs;

  // Initialize page
  loadFieldData();
});

const hideButtons = () => {
  $("#addBtn").hide();
  $(".action-btn.edit").hide();
  $(".action-btn.delete").hide();
};

const getAllFieldData = async () => {
  try {
    return await FieldService.getAllFields();
  } catch (error) {
    console.error("Error during field retrieval:", error);
    throw new Error("Failed to retrieve field");
  }
};

const getAllFieldStaff = async (fieldId) => {
  try {
    return await FieldService.getFieldStaff(fieldId);
  } catch (error) {
    console.error("Error during field staff retrieval:", error);
    throw new Error("Failed to retrieve field staff");
  }
};

const getAllFieldEquipment = async (fieldId) => {
  try {
    return await EquipmentService.getInUseFieldEquipments(fieldId);
  } catch (error) {
    console.error("Error during field equipment retrieval:", error);
    throw new Error("Failed to retrieve field equipment");
  }
};
