$(document).ready(function () {
  const $addFieldForm = $("#addFieldForm");
  const $actionType = $("#actionType");
  const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes
  const selectedStaffIds = new Set();
  const selectedEquipmentIds = new Set();

  function hideAddFieldPopup() {
    $("#addFieldPopup").fadeOut();
    $addFieldForm[0].reset();
    resetImageUploads();
    resetSelections();
    enableFieldButtonsAndInputs();
  }

  function resetImageUploads() {
    $("#fieldImage1, #fieldImage2").val("");
    $("#previewContainer1, #previewContainer2").hide();
    $("#imagePreview1, #imagePreview2").attr("src", "");
  }

  function resetSelections() {
    selectedStaffIds.clear();
    selectedEquipmentIds.clear();
    $(".selection-row").removeClass("selected");
  }

  // Close button handler
  $("#addFieldPopup #closeBtn").on("click", function () {
    hideAddFieldPopup();
  });

  // Image upload handling
  $(".upload-area").each(function (index) {
    const areaId = index + 1;
    const $uploadArea = $(this);
    const $fileInput = $(`#fieldImage${areaId}`);
    const $previewContainer = $(`#previewContainer${areaId}`);
    const $imagePreview = $(`#imagePreview${areaId}`);

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
        resetImageUpload(areaId);
        return;
      }

      // Validate file size
      if (file.size > maxFileSize) {
        showError("File size must be less than 10MB");
        resetImageUpload(areaId);
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
  });

  function resetImageUpload(areaId) {
    $(`#fieldImage${areaId}`).val("");
    $(`#previewContainer${areaId}`).hide();
    $(`#imagePreview${areaId}`).attr("src", "");
  }

  // Load staff and equipment data
  function loadStaffData() {
    // TODO: Replace with actual API call
    const staffData = [
      { id: 1, name: "Xavier De Gunasekara", mobile: "071 234 5678" },
      { id: 2, name: "John Doe", mobile: "072 345 6789" },
      { id: 1, name: "Xavier De Gunasekara", mobile: "071 234 5678" },
      { id: 1, name: "Xavier De Gunasekara", mobile: "071 234 5678" },
      // Add more staff data
    ];
    renderStaffRows(staffData);
  }

  function loadEquipmentData() {
    // TODO: Replace with actual API call
    const equipmentData = [
      { id: 1, name: "Tractor", type: "Agricultural" },
      { id: 2, name: "Harvester", type: "Agricultural" },
      // Add more equipment data
    ];
    renderEquipmentRows(equipmentData);
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

  function renderEquipmentRows(equipmentData) {
    const $container = $("#equipmentContainer");
    $container.empty();

    equipmentData.forEach((equipment) => {
      const row = `
        <div class="selection-row" data-id="${equipment.id}">
          <div class="selection-info">
            <span class="selection-name">${equipment.name}</span>
            <span class="selection-detail">${equipment.type}</span>
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

  $("#equipmentContainer").on("click", ".selection-row", function () {
    const equipmentId = $(this).data("id");
    $(this).toggleClass("selected");

    if ($(this).hasClass("selected")) {
      selectedEquipmentIds.add(equipmentId);
    } else {
      selectedEquipmentIds.delete(equipmentId);
    }
  });

  // Form submission handler
  $addFieldForm.on("submit", function (event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", $("#name").val());
    formData.append("extentSize", $("#extentSize").val());
    formData.append("location", $("#location").val());
    formData.append("staffIds", Array.from(selectedStaffIds));
    formData.append("equipmentIds", Array.from(selectedEquipmentIds));

    const image1 = $("#fieldImage1")[0].files[0];
    const image2 = $("#fieldImage2")[0].files[0];
    if (image1) formData.append("image1", image1);
    if (image2) formData.append("image2", image2);

    // Add validation
    if (!validateForm(formData)) {
      return;
    }

    const actionType = $actionType.val();

    if (actionType === "add") {
      // TODO: Replace with actual API call for adding field
      console.log("Adding field:", formData);
      showSuccessMessage("Field added successfully!");
    } else if (actionType === "update") {
      // TODO: Replace with actual API call for updating field
      console.log("Updating field:", formData);
      showSuccessMessage("Field updated successfully!");
    }

    // Simulate successful save
    hideAddFieldPopup();
  });

  // Form validation
  function validateForm(formData) {
    if (!formData.get("name")) {
      showError("Please enter field name");
      return false;
    }

    if (!formData.get("extentSize")) {
      showError("Please enter extent size");
      return false;
    }

    if (!formData.get("location")) {
      showError("Please enter location");
      return false;
    }

    if (!formData.get("image1") && $actionType.val() === "add") {
      showError("Please select at least one image");
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
    loadStaffData();
    loadEquipmentData();
  }

  initializePopup();
});
