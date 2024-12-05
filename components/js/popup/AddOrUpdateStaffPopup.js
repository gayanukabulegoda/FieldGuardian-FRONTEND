import StaffService from "../../../services/StaffService.js";

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
  $addStaffForm.on("submit", async function (event) {
    event.preventDefault();

    const staffDTO = {
      id: $("#staffId").val(),
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      dateOfBirth: formatDate($("#dateOfBirth").val()),
      address: $("#address").val(),
      postalCode: $("#postalCode").val(),
      contactNo: formatContactNumber($("#contactNumber").val()),
      email: $("#email").val(),
      joinedDate: formatDate($("#joinedDate").val()),
      gender: $("#gender").val(),
      designation: $("#designation").val(),
    };

    // Add validation
    if (!validateForm(staffDTO)) {
      return;
    }

    const actionType = $actionType.val();

    if (actionType === "add") {
      await addStaffMember(staffDTO);
      window.location.reload();
    } else if (actionType === "update") {
      await updateStaffMember(staffDTO.id, staffDTO);
      window.location.reload();
    }

    hideAddStaffPopup();
  });

  function formatContactNumber(contactNumber) {
    const cleanedNumber = contactNumber.replace(/\D/g, "");
    return cleanedNumber.replace(/(\d{3})(\d{3})(\d+)/, "$1 $2 $3");
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

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
    if (!phoneRegex.test(data.contactNo)) {
      showError("Please enter a valid contact number (E.g. 0771234567)");
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

  function showError(message) {
    alert(message);
  }
});

const addStaffMember = async (staffDTO) => {
  return StaffService.saveStaff(staffDTO)
    .done((response, textStatus, jqXHR) => {
      if (!jqXHR.status === 201) {
        alert("Failed to add staff");
      }
    })
    .fail((xhr, status, error) => {
      console.error("Error during staff addition:", error);
      alert("Failed to add staff");
      throw new Error("Failed to add staff");
    });
};

const updateStaffMember = async (id, staffDTO) => {
  return StaffService.updateStaff(id, staffDTO)
    .done((response, textStatus, jqXHR) => {
      if (!jqXHR.status === 204) {
        alert("Failed to update staff");
      }
    })
    .fail((xhr, status, error) => {
      console.error("Error during staff update:", error);
      alert("Failed to update staff");
      throw new Error("Failed to update staff");
    });
};
