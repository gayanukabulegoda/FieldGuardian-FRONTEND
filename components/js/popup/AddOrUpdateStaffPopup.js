$(document).ready(function () {
  const $addStaffForm = $("#addStaffForm");
  const $actionType = $("#actionType");

  function hideAddStaffPopup() {
    $("#addStaffPopup").fadeOut();
    $addStaffForm[0].reset();
    enableStaffButtonsAndInputs();
  }

  // Close button handler
  $("#addStaffPopup #closeBtn").on("click", function () {
    hideAddStaffPopup();
  });

  // Form submission handler
  $addStaffForm.on("submit", function (event) {
    event.preventDefault();

    const formData = {
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      dateOfBirth: $("#dateOfBirth").val(),
      address: $("#address").val(),
      postalCode: $("#postalCode").val(),
      contactNumber: $("#contactNumber").val(),
      email: $("#email").val(),
      joinedDate: $("#joinedDate").val(),
      gender: $("#gender").val(),
      designation: $("#designation").val(),
    };

    // Add validation
    if (!validateForm(formData)) {
      return;
    }

    const actionType = $actionType.val();

    if (actionType === "add") {
      // TODO: Replace with actual API call for adding staff
      console.log("Adding staff:", formData);
      showSuccessMessage("Staff member added successfully!");
    } else if (actionType === "update") {
      // TODO: Replace with actual API call for updating staff
      console.log("Updating staff:", formData);
      showSuccessMessage("Staff member updated successfully!");
    }

    // Simulate successful save
    hideAddStaffPopup();
  });

  // Form validation
  function validateForm(data) {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showError("Please enter a valid email address");
      return false;
    }

    // Phone number validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(data.contactNumber)) {
      showError("Please enter a valid contact number");
      return false;
    }

    // Date validations
    const today = new Date();
    const dob = new Date(data.dateOfBirth);
    const joinedDate = new Date(data.joinedDate);

    if (dob >= today) {
      showError("Date of birth cannot be in the future");
      return false;
    }

    if (joinedDate > today) {
      showError("Joined date cannot be in the future");
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
