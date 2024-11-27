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

  // Load fields, staff and crops data
  function loadFieldData() {
    // TODO: Replace with actual API call
    const fields = ["Field 1", "Field 2", "Field 3", "Evergreen Plains"];
    fields.forEach((field) => {
      $("#field").append(`<option value="${field}">${field}</option>`);
    });
  }

  function loadStaffData() {
    // TODO: Replace with actual API call
    const staffData = [
      { id: 1, name: "Xavier De Gunasekara", mobile: "071 234 5678" },
      { id: 2, name: "John Doe", mobile: "072 345 6789" },
      { id: 1, name: "Xavier De Gunasekara", mobile: "071 234 5678" },
      { id: 2, name: "John Doe", mobile: "072 345 6789" },
    ];
    renderStaffRows(staffData);
  }

  function loadCropData() {
    // TODO: Replace with actual API call
    const cropData = [
      { id: 1, name: "Wheat", scientificName: "Triticum aestivum" },
      { id: 2, name: "Rice", scientificName: "Oryza sativa" },
      { id: 1, name: "Wheat", scientificName: "Triticum aestivum" },
      { id: 2, name: "Rice", scientificName: "Oryza sativa" },
    ];
    renderCropRows(cropData);
  }

  function renderStaffRows(staffData) {
    const $container = $("#staffContainer");
    $container.empty();

    staffData.forEach((staff) => {
      const row = `
        <div class="selection-row" data-id="${staff.id}">
          <div class="selection-info">
            <span class="selection-name">${staff.name}</span>
            <span class="selection-detail">${staff.mobile}</span>
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
        <div class="selection-row" data-id="${crop.id}">
          <div class="selection-info">
            <span class="selection-name">${crop.name}</span>
            <span class="selection-detail">${crop.scientificName}</span>
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
  $addMonitoringForm.on("submit", function (event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("field", $("#field").val());
    formData.append("observation", $("#observation").val());
    formData.append("staffIds", Array.from(selectedStaffIds));
    formData.append("cropIds", Array.from(selectedCropIds));

    const file = $fileInput[0].files[0];
    if (file) {
      formData.append("image", file);
    }

    // Add validation
    if (!validateForm(formData)) {
      return;
    }

    const actionType = $actionType.val();

    if (actionType === "add") {
      // TODO: Replace with actual API call for adding monitoring log
      console.log("Adding monitoring log:", formData);
      showSuccessMessage("Monitoring log added successfully!");
    } else if (actionType === "update") {
      // TODO: Replace with actual API call for updating monitoring log
      console.log("Updating monitoring log:", formData);
      showSuccessMessage("Monitoring log updated successfully!");
    }

    // Simulate successful save
    hideAddMonitoringPopup();
  });

  // Form validation
  function validateForm(formData) {
    if (!formData.get("field")) {
      showError("Please select a field");
      return false;
    }

    if (!formData.get("observation")) {
      showError("Please add your observation");
      return false;
    }

    if (!formData.get("image") && $actionType.val() === "add") {
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

  // Error message display
  function showError(message) {
    // TODO: Implement error message display
    alert(message);
  }

  // Success message display
  function showSuccessMessage(message) {
    // TODO: Implement success message display
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
