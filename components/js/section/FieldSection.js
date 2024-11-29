$(document).ready(function () {
  // Load field data
  function loadFieldData(filters = {}) {
    // Simulated API call - replace with actual backend call
    const fieldData = [
      {
        code: "111-111",
        fieldImage1: "/assets/images/temp-image.jpg",
        fieldImage2: "/assets/images/default_no_pic_image.png",
        name: "Evergreen Plains",
        location: "40.7128,-74.0060",
        extentSize: 100.5,
      },
      {
        code: "222-222",
        fieldImage1: "/assets/images/temp-image.jpg",
        fieldImage2: "/assets/images/default_no_pic_image.png",
        name: "Evergreen Plainsz",
        location: "40.7128,-74.0060",
        extentSize: 100.5,
      },
      {
        code: "333-333",
        fieldImage1: "/assets/images/temp-image.jpg",
        name: "Evergreen PlainsV",
        location: "40.7128,-74.0060",
        extentSize: 100.5,
      },
    ];

    renderFieldTable(fieldData);
  }

  // Truncate text to a specific character limit
  function truncateText(text, limit) {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  }

  // Render field table
  function renderFieldTable(data) {
    const $tableBody = $("#fieldTableBody");
    $tableBody.empty();

    data.forEach((field) => {
      const row = `
        <div class="table-row" data-field='${JSON.stringify(field)}'>
          <div>
            <img src="${field.fieldImage1}" alt="${
        field.name
      }" class="field-image">
          </div>
          <div>${truncateText(field.name, 30)}</div>
          <div>${truncateText(field.location, 30)}</div>
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

  // View field popup --------------------------------------------------------

  const populateFieldDetails = (fieldData) => {
    $("#viewName")
      .text(truncateText(fieldData.name, 30))
      .attr("data-full-text", fieldData.name);
    $("#viewExtentSize")
      .text(fieldData.extentSize)
      .attr("data-full-text", fieldData.extentSize);
    $("#viewLocation").attr("href", fieldData.location);

    // Handle images
    if (fieldData.image1) {
      $("#viewFieldImage1").attr(
        "src",
        `data:image/jpeg;base64,${fieldData.image1}`
      );
      $("#previewViewContainer1").show();
    } else {
      setDefaultImage("#viewFieldImage1", "#previewViewContainer1");
    }

    if (fieldData.image2) {
      $("#viewFieldImage2").attr(
        "src",
        `data:image/jpeg;base64,${fieldData.image2}`
      );
      $("#previewContainer2").show();
    } else {
      setDefaultImage("#viewFieldImage2", "#previewViewContainer2");
    }

    // Temporary data ----------------------------------------------
    const staffMembers = [
      {
        name: "John Doe",
        mobile: "123-456-7890",
      },
      {
        name: "Jane Xavier",
        mobile: "123-456-7890",
      },
      {
        name: "John Smith",
        mobile: "123-456-7890",
      },
    ];

    const equipment = [
      {
        name: "Tractor",
        type: "Heavy",
      },
      {
        name: "Plough",
        type: "Medium",
      },
      {
        name: "Seeder",
        type: "Light",
      },
    ];
    // ---------------------------------------------------------------

    // Populate staff members
    const $staffViewContainer = $("#staffViewContainer");
    $staffViewContainer.empty();
    // fieldData.staffMembers.forEach((staff) => {
    staffMembers.forEach((staff) => {
      const row = `
        <div class="selection-row">
          <div class="selection-info">
            <span class="selection-name">${staff.name}</span>
            <span class="selection-detail">${staff.mobile}</span>
          </div>
        </div>
      `;
      $staffViewContainer.append(row);
    });

    // Populate equipment
    const $equipmentViewContainer = $("#equipmentViewContainer");
    $equipmentViewContainer.empty();
    // fieldData.equipment.forEach((equipment) => {
    equipment.forEach((equipment) => {
      const row = `
        <div class="selection-row">
          <div class="selection-info">
            <span class="selection-name">${equipment.name}</span>
            <span class="selection-detail">${equipment.type}</span>
          </div>
        </div>
      `;
      $equipmentViewContainer.append(row);
    });
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

  // Delete confirmation popup ----------------------------------------------

  $("#closeDeletePopupBtn").on("click", function () {
    hideDeleteConfirmationPopup();
  });

  // Confirm delete button handler
  $("#confirmDeleteBtn").on("click", function () {
    hideDeleteConfirmationPopup();
  });

  // Show delete confirmation popup
  const showDeleteConfirmationPopup = (fieldCode) => {
    $("#confirmDeleteBtn").data("id", fieldCode);
    $("#deleteConfirmationPopup").fadeIn(300);
    disableFieldButtonsAndInputs();
  };

  // Hide delete confirmation popup
  const hideDeleteConfirmationPopup = () => {
    $("#deleteConfirmationPopup").fadeOut(300);
    enableFieldButtonsAndInputs();
  };

  // Add field popup --------------------------------------------------------

  const $addFieldPopup = $("#addFieldPopup");
  const $addFieldForm = $("#addFieldForm");
  const $popupTitle = $("#popupTitle");
  const $saveBtn = $("#saveBtn");
  const $actionType = $("#actionType");
  const $staffSelectionTitle = $("#staffSelectionTitle");
  const $equipmentSelectionTitle = $("#equipmentSelectionTitle");

  const showAddFieldPopup = () => {
    $addFieldForm[0].reset();
    $popupTitle.text("Add Field");
    $saveBtn.text("SAVE");
    $actionType.val("add");
    $staffSelectionTitle.text("Select Staff (Optional)");
    $equipmentSelectionTitle.text("Select Equipment (Optional)");
    $addFieldPopup.fadeIn(300);
    disableFieldButtonsAndInputs();
  };

  const showUpdateFieldPopup = (fieldData) => {
    $popupTitle.text("Update Field");
    $saveBtn.text("UPDATE");
    $actionType.val("update");
    $staffSelectionTitle.text("Select Staff");
    $equipmentSelectionTitle.text("Select Equipment");
    fillFromWithFieldData(fieldData);
    $addFieldPopup.fadeIn(300);
    disableFieldButtonsAndInputs();
  };

  const fillFromWithFieldData = (fieldData) => {
    $("#name").val(fieldData.name);
    $("#location").val(fieldData.location);
    $("#extentSize").val(fieldData.extentSize);
    if (fieldData.fieldImage1) {
      $("#imagePreview1").attr("src", fieldData.fieldImage1);
      $("#previewContainer1").show();
    } else {
      setDefaultImage("#imagePreview1", "#previewContainer");
    }
    if (fieldData.fieldImage2) {
      $("#imagePreview2").attr("src", fieldData.fieldImage2);
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
    showAddFieldPopup();
  });

  // Function to disable buttons and inputs
  const disableFieldButtonsAndInputs = () => {
    $(".action-btn, #addBtn, #searchBtn, #searchName, #landSizeFilter").css(
      "pointer-events",
      "none"
    );
  };

  // Function to enable buttons and inputs
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
