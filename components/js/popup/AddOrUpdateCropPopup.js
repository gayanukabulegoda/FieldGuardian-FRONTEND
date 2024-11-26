$(document).ready(function () {
  const $addCropForm = $("#addCropForm");
  const $actionType = $("#actionType");
  const $uploadArea = $("#uploadArea");
  const $fileInput = $("#cropImage");
  const $previewContainer = $("#previewContainer");
  const $imagePreview = $("#imagePreview");
  const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes

  function hideAddCropPopup() {
    $("#addCropPopup").fadeOut();
    $addCropForm[0].reset();
    resetImageUpload();
    enableCropButtonsAndInputs();
  }

  function resetImageUpload() {
    $fileInput.val("");
    $previewContainer.hide();
    $imagePreview.attr("src", "");
  }

  // Close button handler
  $("#addCropPopup #closeBtn").on("click", function () {
    hideAddCropPopup();
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

  // Form submission handler
  $addCropForm.on("submit", function (event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("commonName", $("#commonName").val());
    formData.append("scientificName", $("#scientificName").val());
    formData.append("category", $("#category").val());
    formData.append("season", $("#season").val());
    formData.append("field", $("#field").val());

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
      // TODO: Replace with actual API call for adding crop
      console.log("Adding crop:", formData);
      showSuccessMessage("Crop added successfully!");
    } else if (actionType === "update") {
      // TODO: Replace with actual API call for updating crop
      console.log("Updating crop:", formData);
      showSuccessMessage("Crop updated successfully!");
    }

    // Simulate successful save
    hideAddCropPopup();
  });

  // Form validation
  function validateForm(formData) {
    if (!formData.get("commonName")) {
      showError("Please enter common name");
      return false;
    }

    if (!formData.get("scientificName")) {
      showError("Please enter scientific name");
      return false;
    }

    if (!formData.get("category")) {
      showError("Please select category");
      return false;
    }

    if (!formData.get("season")) {
      showError("Please select season");
      return false;
    }

    if (!formData.get("field")) {
      showError("Please select field");
      return false;
    }

    if (!formData.get("image") && $actionType.val() === "add") {
      showError("Please select an image");
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
    // Load categories
    const categories = ["Vegetable", "Fruit", "Grain"];
    categories.forEach((category) => {
      $("#category").append(`<option value="${category}">${category}</option>`);
    });

    // Load seasons
    const seasons = ["Spring", "Summer", "Fall", "Winter"];
    seasons.forEach((season) => {
      $("#season").append(`<option value="${season}">${season}</option>`);
    });

    // Load fields
    // TODO: Replace with actual API call
    const fields = ["Field 1", "Field 2", "Field 3"];
    fields.forEach((field) => {
      $("#field").append(`<option value="${field}">${field}</option>`);
    });
  }

  initializePopup();
});
