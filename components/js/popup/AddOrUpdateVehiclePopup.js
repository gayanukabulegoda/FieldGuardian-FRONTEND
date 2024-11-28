$(document).ready(function () {
  const $addVehicleForm = $("#addVehicleForm");
  const $actionType = $("#actionType");
  const $remark = $("#remark");
  const $charCount = $("#currentCount");
  const selectedStaffIds = new Set();

  function hideAddVehiclePopup() {
    $("#addVehiclePopup").fadeOut();
    $addVehicleForm[0].reset();
    resetSelections();
    updateCharCount();
    enableVehicleButtonsAndInputs();
  }

  function resetSelections() {
    selectedStaffIds.clear();
    $(".selection-row").removeClass("selected");
  }

  // Character count for remark
  function updateCharCount() {
    const currentLength = $remark.val().length;
    $charCount.text(currentLength);
  }

  $remark.on("input", updateCharCount);

  // Close button handler
  $("#addVehiclePopup #closeBtn").on("click", function () {
    hideAddVehiclePopup();
  });

  // Load staff data
  function loadStaffData() {
    // TODO: Replace with actual API call
    const staffData = [
      { id: 1, name: "Xavier De Gunasekara", mobile: "071 234 5678" },
      { id: 2, name: "John Doe", mobile: "072 345 6789" },
      { id: 3, name: "Jane Smith", mobile: "073 456 7890" },
      { id: 4, name: "Mike Johnson", mobile: "074 567 8901" },
      { id: 5, name: "Sarah Wilson", mobile: "075 678 9012" },
    ];
    renderStaffRows(staffData);
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

  // Form submission handler
  $addVehicleForm.on("submit", function (event) {
    event.preventDefault();

    const formData = {
      licensePlateNumber: $("#licensePlateNumber").val(),
      category: $("#category").val(),
      fuelType: $("#fuelType").val(),
      remark: $("#remark").val(),
      staffIds: Array.from(selectedStaffIds),
    };

    // Add validation
    if (!validateForm(formData)) {
      return;
    }

    const actionType = $actionType.val();

    if (actionType === "add") {
      // TODO: Replace with actual API call for adding vehicle
      console.log("Adding vehicle:", formData);
      showSuccessMessage("Vehicle added successfully!");
    } else if (actionType === "update") {
      // TODO: Replace with actual API call for updating vehicle
      console.log("Updating vehicle:", formData);
      showSuccessMessage("Vehicle updated successfully!");
    }

    // Simulate successful save
    hideAddVehiclePopup();
  });

  // Form validation
  function validateForm(data) {
    if (!data.licensePlateNumber) {
      showError("Please enter license plate number");
      return false;
    }

    if (!data.category) {
      showError("Please select category");
      return false;
    }

    if (!data.fuelType) {
      showError("Please select fuel type");
      return false;
    }

    if (!data.remark) {
      showError("Please add your remark");
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
    updateCharCount();
  }

  initializePopup();
});
