$(document).ready(function () {
  // Fetch and populate field filter
  function loadFields() {
    // Simulated API call - replace with actual backend call
    const fields = ["Field A", "Field B", "Field C"];

    const $select = $("#fieldFilter");
    fields.forEach((field) => {
      $select.append(new Option(field, field));
    });
  }

  // Load crop data
  function loadCropData(filters = {}) {
    // Simulated API call - replace with actual backend call
    const cropData = [
      {
        code: "111-111",
        commonName: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Vegetable",
        season: "Winter",
        field: "Field 1",
        image: "/assets/images/temp-image.jpg",
      },
      {
        code: "222-222",
        commonName: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Fruit",
        season: "Winter",
        field: "Field 2",
        image: "/assets/images/temp-image.jpg",
      },
      {
        code: "333-333",
        commonName: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Vegetable",
        season: "Winter",
        field: "Field 3",
        image: "/assets/images/temp-image.jpg",
      },
      {
        code: "444-444",
        commonName: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Fruit",
        season: "Winter",
        field: "Field 3",
      },
      {
        code: "555-555",
        commonName: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Cereal",
        season: "Winter",
      },
      {
        code: "666-666",
        commonName: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Cereal",
        season: "Winter",
      },
      {
        code: "777-777",
        commonName: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Cereal",
        season: "Winter",
      },
      {
        code: "888-888",
        commonName: "WheatAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        scientificName:
          "Triticum aestivumAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        category: "CerealAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        season: "WinterAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      },
      {
        code: "999-999",
        commonName: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Cereal",
        season: "Winter",
      },
      {
        code: "101-101",
        commonName: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Cereal",
        season: "Winter",
      },
      {
        code: "112-112",
        commonName: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Cereal",
        season: "Winter",
      },
      // Add more crop entries here
    ];

    renderCropTable(cropData);
  }

  // Truncate text to a specific character limit
  function truncateText(text, limit) {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  }

  // Render crop table
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

  // View crop popup --------------------------------------------------------

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
      .text(truncateText(cropData.field, 30))
      .attr("data-full-text", cropData.field);

    if (cropData.image) {
      $("#viewCropImage").attr(
        "src",
        `data:image/jpeg;base64,${cropData.image}`
      );
      $("#viewCropImage").attr("src", cropData.image);
      $("#viewCropPopup #previewContainer").show();
    } else {
      $("#viewCropImage").attr(
        "src",
        "/assets/images/default_no_pic_image.png"
      );
      $("#viewCropPopup #previewContainer").show();
    }
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

  // Close button handlers
  $("#closeViewBtn, #closeButton").on("click", function () {
    hideViewCropPopup();
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
  function showDeleteConfirmationPopup(cropCode) {
    $("#confirmDeleteBtn").data("id", cropCode);
    $("#deleteConfirmationPopup").fadeIn(300);
    disableCropButtonsAndInputs();
  }

  // Hide delete confirmation popup
  function hideDeleteConfirmationPopup() {
    $("#deleteConfirmationPopup").fadeOut(300);
    enableCropButtonsAndInputs();
  }

  // Add crop popup --------------------------------------------------------

  const $addCropPopup = $("#addCropPopup");
  const $addCropForm = $("#addCropForm");
  const $popupTitle = $("#popupTitle");
  const $saveBtn = $("#saveBtn");
  const $actionType = $("#actionType");

  const showAddCropPopup = () => {
    $addCropForm[0].reset();
    $popupTitle.text("Add Crop");
    $saveBtn.text("SAVE");
    $actionType.val("add");
    $addCropPopup.fadeIn(300);
    disableCropButtonsAndInputs();
  };

  const showUpdateCropPopup = (crop) => {
    $popupTitle.text("Update Crop");
    $saveBtn.text("UPDATE");
    $actionType.val("update");
    fillFromWithCropData(crop);
    $addCropPopup.fadeIn(300);
    disableCropButtonsAndInputs();
  };

  const fillFromWithCropData = (crop) => {
    $("#commonName").val(crop.commonName);
    $("#scientificName").val(crop.scientificName);
    $("#category").val(crop.category);
    $("#season").val(crop.season);
    $("#field").val(crop.field);
    if (crop.image) {
      $("#imagePreview").attr("src", crop.image);
      $("#previewContainer").show();
    } else {
      resetImageUpload();
    }
  };

  function resetImageUpload() {
    $("#viewCropImage").val("");
    $("#previewContainer").hide();
    $("#imagePreview").attr("src", "");
  }

  // Show add staff popup
  $("#addBtn").on("click", function () {
    showAddCropPopup();
  });

  // Function to disable buttons and inputs
  function disableCropButtonsAndInputs() {
    $(".action-btn, #addBtn, #searchBtn, #searchName, #fieldFilter").css(
      "pointer-events",
      "none"
    );
  }

  // Function to enable buttons and inputs
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
