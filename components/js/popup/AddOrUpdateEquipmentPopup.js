$(document).ready(function () {
  const $equipmentForm = $("#equipmentForm");
  const $actionType = $("#actionType");

  function hideEquipmentPopup() {
    $("#addEquipmentPopup").fadeOut();
    $equipmentForm[0].reset();
    enableEquipmentButtonsAndInputs();
  }

  // Close button handler
  $("#addEquipmentPopup #closeBtn").on("click", function () {
    hideEquipmentPopup();
  });

  // Form submission handler
  $equipmentForm.on("submit", function (event) {
    event.preventDefault();

    const formData = {
      name: $("#name").val(),
      type: $("#type").val(),
      staffId: $("#staff").val() || null,
    };

    // Add validation
    if (!validateForm(formData)) {
      return;
    }

    const actionType = $actionType.val();

    if (actionType === "add") {
      // TODO: Replace with actual API call for adding equipment
      console.log("Adding equipment:", formData);
      showSuccessMessage("Equipment added successfully!");
    } else if (actionType === "update") {
      // TODO: Replace with actual API call for updating equipment
      console.log("Updating equipment:", formData);
      showSuccessMessage("Equipment updated successfully!");
    }

    // Simulate successful save
    hideEquipmentPopup();
  });

  // Form validation
  function validateForm(data) {
    if (!data.name.trim()) {
      showError("Please enter equipment name");
      return false;
    }

    if (!data.type) {
      showError("Please select equipment type");
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
});
