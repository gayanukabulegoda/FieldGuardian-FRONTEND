import CropService from "../../../services/CropService.js";
import FieldService from "../../../services/FieldService.js";

$(document).ready(function () {
  let fieldsArray = [];

  if (JSON.parse(localStorage.getItem("role")) === "ADMINISTRATIVE") {
    hideButtons();
  }
  // Fetch and populate field filter
  async function loadFields() {
    try {
      const fields = await getAllFieldData();
      fieldsArray = fields;
      const $select = $("#fieldFilter");
      fields.forEach((field) => {
        $select.append(new Option(field.name, field.code));
      });
    } catch (error) {
      console.error("Error during field retrieval:", error);
    }
  }

  async function loadCropData(filters = {}) {
    try {
      const cropData = await getAllCropData();
      renderCropTable(cropData);
      if (JSON.parse(localStorage.getItem("role")) === "ADMINISTRATIVE") {
        hideButtons();
      }
    } catch (error) {
      console.error("Error during crop retrieval:", error);
    }
  }

  // Truncate text to a specific character limit
  function truncateText(text, limit) {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  }

  function renderCropTable(data) {
    const $tableBody = $("#cropTableBody");
    $tableBody.empty();

    data.forEach((crop) => {
      const row = `
                <div class="table-row" data-crop='${JSON.stringify(crop)}'>
                    <div>${truncateText(crop.commonName, 28)}</div>
                    <div>${truncateText(crop.scientificName, 28)}</div>
                    <div>${truncateText(crop.category, 18)}</div>
                    <div>${truncateText(crop.season, 16)}</div>
                    <div class="action-buttons">
                        <button class="action-btn delete" title="Delete" data-id="${
                          crop.code
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
      field: $("#fieldFilter").val(),
    };
    loadCropData(filters);
  });

  // Action button handlers
  $(document).on("click", ".action-btn.delete", function () {
    const cropCode = $(this).data("id");
    showDeleteConfirmationPopup(cropCode);
  });

  $(document).on("click", ".action-btn.edit", function () {
    const cropData = $(this).closest(".table-row").data("crop");
    showUpdateCropPopup(cropData);
  });

  $(document).on("click", ".action-btn.view", function () {
    const cropData = $(this).closest(".table-row").data("crop");
    showViewCropPopup(cropData);
  });

  // -------- View crop popup --------

  const populateCropDetails = (cropData) => {
    $("#viewCommonName")
      .text(truncateText(cropData.commonName, 30))
      .attr("data-full-text", cropData.commonName);
    $("#viewScientificName")
      .text(truncateText(cropData.scientificName, 30))
      .attr("data-full-text", cropData.scientificName);
    $("#viewCategory")
      .text(cropData.category)
      .attr("data-full-text", cropData.category);
    $("#viewSeason")
      .text(cropData.season)
      .attr("data-full-text", cropData.season);
    $("#viewField")
      .text(truncateText(getFieldNameFromArray(cropData.fieldCode), 30))
      .attr("data-full-text", getFieldNameFromArray(cropData.fieldCode));

    if (cropData.cropImage) {
      $("#viewCropImage").attr(
        "src",
        `data:image/jpeg;base64,${cropData.cropImage}`
      );
      $("#viewCropPopup #previewContainer").show();
    } else {
      $("#viewCropImage").attr(
        "src",
        "/assets/images/default_no_pic_image.png"
      );
      $("#viewCropPopup #previewContainer").show();
    }
  };

  const getFieldNameFromArray = (fieldCode) => {
    const field = fieldsArray.find((field) => field.code === fieldCode);
    return field ? field.name : "Unknown Field";
  };

  const showViewCropPopup = (cropData) => {
    populateCropDetails(cropData);
    $("#viewCropPopup").fadeIn(300);
    disableCropButtonsAndInputs();
  };

  const hideViewCropPopup = () => {
    $("#viewCropPopup").fadeOut();
    enableCropButtonsAndInputs();
  };

  // Close button handler
  $("#closeViewBtn, #closeButton").on("click", function () {
    hideViewCropPopup();
  });

  // -------- Delete confirmation popup --------

  $("#closeDeletePopupBtn").on("click", function () {
    hideDeleteConfirmationPopup();
  });

  // Confirm delete button handler
  $("#confirmDeleteBtn").on("click", async function () {
    try {
      const cropCode = $(this).data("id");
      await CropService.deleteCrop(cropCode);
      $(`.table-row[data-id="${cropCode}"]`).remove();
    } catch (error) {
      console.error("Error during crop deletion:", error);
    }
    hideDeleteConfirmationPopup();
    loadCropData();
  });

  function showDeleteConfirmationPopup(cropCode) {
    $("#confirmDeleteBtn").data("id", cropCode);
    $("#deleteConfirmationPopup").fadeIn(300);
    disableCropButtonsAndInputs();
  }

  function hideDeleteConfirmationPopup() {
    $("#deleteConfirmationPopup").fadeOut(300);
    enableCropButtonsAndInputs();
  }

  // -------- Add crop popup --------

  const $addCropPopup = $("#addCropPopup");
  const $addCropForm = $("#addCropForm");
  const $popupTitle = $("#popupTitle");
  const $saveBtn = $("#saveBtn");
  const $actionType = $("#actionType");

  const showAddCropPopup = (cropCode) => {
    $addCropForm[0].reset();
    $popupTitle.text("Add Crop");
    $saveBtn.text("SAVE");
    $actionType.val("add");
    $("#cropCode").val(cropCode);
    $addCropPopup.fadeIn(300);
    disableCropButtonsAndInputs();
  };

  const showUpdateCropPopup = (crop) => {
    $popupTitle.text("Update Crop");
    $saveBtn.text("UPDATE");
    $actionType.val("update");
    $("#cropCode").val(crop.code);
    fillFromWithCropData(crop);
    $addCropPopup.fadeIn(300);
    disableCropButtonsAndInputs();
  };

  const fillFromWithCropData = (crop) => {
    $("#commonName").val(crop.commonName);
    $("#scientificName").val(crop.scientificName);
    $("#category").val(crop.category);
    $("#season").val(crop.season);
    $("#field").val(crop.fieldCode);
    if (crop.cropImage) {
      $("#imagePreview").attr(
        "src",
        `data:image/jpeg;base64,${crop.cropImage}`
      );
      $("#previewContainer").show();
    } else {
      $("#imagePreview").attr("src", "/assets/images/default_no_pic_image.png");
      $("#previewContainer").show();
    }
  };

  // Show add crop popup
  $("#addBtn").on("click", function () {
    showAddCropPopup();
  });

  function disableCropButtonsAndInputs() {
    $(".action-btn, #addBtn, #searchBtn, #searchName, #fieldFilter").css(
      "pointer-events",
      "none"
    );
  }

  function enableCropButtonsAndInputs() {
    $(".action-btn, #addBtn, #searchBtn, #searchName, #fieldFilter").css(
      "pointer-events",
      "auto"
    );
  }
  window.enableCropButtonsAndInputs = enableCropButtonsAndInputs;

  // Initialize page
  loadFields();
  loadCropData();
});

const hideButtons = () => {
  $("#addBtn").hide();
  $(".action-btn.edit").hide();
  $(".action-btn.delete").hide();
};

const getAllCropData = async () => {
  try {
    return await CropService.getAllCrops();
  } catch (error) {
    console.error("Error fetching crop data:", error);
    throw new Error("Failed to fetch crop data");
  }
};

const getAllFieldData = async () => {
  try {
    return await FieldService.getAllFields();
  } catch (error) {
    console.error("Error during field retrieval:", error);
    throw new Error("Failed to retrieve field");
  }
};
