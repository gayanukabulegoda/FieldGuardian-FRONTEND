$(document).ready(function () {
  // Fetch and populate designation filter
  function loadDesignations() {
    // Simulated API call - replace with actual backend call
    const designations = [
      "SENIOR ASSISTANT MANAGER",
      "MANAGER",
      "ASSISTANT MANAGER",
    ];

    const $select = $("#designationFilter");
    designations.forEach((designation) => {
      $select.append(new Option(designation, designation));
    });
  }

  // Load staff data
  function loadStaffData(filters = {}) {
    // Simulated API call - replace with actual backend call
    const staffData = [
      {
        name: "Xavier De Gunasekara",
        designation: "SENIOR ASSISTANT MANAGER",
        contact: "071 234 5678",
        email: "xavierdegk999@gmail.com",
        firstName: "Xavier",
        lastName: "De Gunasekara",
        dateOfBirth: "1990-01-01",
        address: "123 Main St",
        postalCode: "12345",
        joinedDate: "2020-01-01",
        gender: "MALE",
      },
      {
        name: "Xavier De Gunasekara",
        designation: "SENIOR ASSISTANT MANAGER",
        contact: "071 234 5678",
        email: "xavierdegk999@gmail.com",
        firstName: "Xavier",
        lastName: "De Gunasekara",
        dateOfBirth: "1990-01-01",
        address: "123 Main St",
        postalCode: "12345",
        joinedDate: "2020-01-01",
        gender: "MALE",
      },
      {
        name: "Xavier De Gunasekara",
        designation: "SENIOR ASSISTANT MANAGER",
        contact: "071 234 5678",
        email: "xavierdegk999@gmail.com",
        firstName: "Xavier",
        lastName: "De Gunasekara",
        dateOfBirth: "1990-01-01",
        address: "123 Main St",
        postalCode: "12345",
        joinedDate: "2020-01-01",
        gender: "MALE",
      },
      // Add more staff members here
    ];

    renderStaffTable(staffData);
  }

  // Truncate text to a specific character limit
  function truncateText(text, limit) {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  }

  // Render staff table
  function renderStaffTable(data) {
    const $tableBody = $("#staffTableBody");
    $tableBody.empty();

    data.forEach((staff) => {
      const row = `
                <div class="table-row">
                    <div>${truncateText(staff.name, 28)}</div>
                    <div>${truncateText(staff.designation, 24)}</div>
                    <div>${truncateText(staff.contact, 12)}</div>
                    <div>${truncateText(staff.email, 28)}</div>
                    <div class="action-buttons">
                        <button class="action-btn delete" title="Delete">
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
      designation: $("#designationFilter").val(),
      gender: $("#genderFilter").val(),
    };
    loadStaffData(filters);
  });

  // Action button handlers
  $(document).on("click", ".action-btn.delete", function () {
    showDeleteConfirmationPopup();
    disableButtonsAndInputs();
  });

  $(document).on("click", ".action-btn.edit", function () {
    const staffData = {
      firstName: "Xavier",
      lastName: "De Gunasekara",
      dateOfBirth: "1990-01-01",
      address: "123 Main St",
      postalCode: "12345",
      contactNumber: "071 234 5678",
      email: "xavierdegk999@gmail.com",
      joinedDate: "2020-01-01",
      gender: "MALE",
      designation: "MANAGER",
    };
    showUpdateStaffPopup(staffData);
  });

  $(document).on("click", ".action-btn.view", function () {
    // Implement view functionality
    console.log("View clicked");
  });

  // Show system users popup
  $("#usersBtn").on("click", function () {
    $(".system-users-popup").fadeIn();
    disableButtonsAndInputs();
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
  function showDeleteConfirmationPopup() {
    $("#deleteConfirmationPopup").fadeIn(300);
    disableButtonsAndInputs();
  }

  // Hide delete confirmation popup
  function hideDeleteConfirmationPopup() {
    $("#deleteConfirmationPopup").fadeOut(300);
    enableButtonsAndInputs();
  }

  // Add staff popup --------------------------------------------------------

  const $addStaffPopup = $("#addStaffPopup");
  const $popupTitle = $("#popupTitle");
  const $saveBtn = $("#saveBtn");
  const $actionType = $("#actionType");

  // Show add staff popup function
  function showAddStaffPopup() {
    $popupTitle.text("Add Staff");
    $saveBtn.text("SAVE");
    $actionType.val("add");
    formatDateInputs();
    loadDesignationsForStaffPopup();
    $addStaffPopup.fadeIn(300);
    disableButtonsAndInputs();
  }

  // Show update staff popup function
  function showUpdateStaffPopup(staffData) {
    $popupTitle.text("Update Staff");
    $saveBtn.text("UPDATE");
    $actionType.val("update");
    formatDateInputs();
    loadDesignationsForStaffPopup();
    fillFormWithStaffData(staffData);
    $addStaffPopup.fadeIn(300);
    disableButtonsAndInputs();
  }

  function loadDesignationsForStaffPopup() {
    // Simulated API call - replace with actual backend call
    const designations = [
      "SENIOR ASSISTANT MANAGER",
      "MANAGER",
      "ASSISTANT MANAGER",
    ];

    const $select = $("#designation");
    $select.empty();
    if ($actionType.val() === "add")
      $select.append(new Option("Designation", "", true, true));
    designations.forEach((designation) => {
      $select.append(new Option(designation, designation));
    });
  }

  // Fill form with staff data for updating
  function fillFormWithStaffData(data) {
    $("#firstName").val(data.firstName);
    $("#lastName").val(data.lastName);
    $("#dateOfBirth").val(data.dateOfBirth);
    $("#address").val(data.address);
    $("#postalCode").val(data.postalCode);
    $("#contactNumber").val(data.contactNumber);
    $("#email").val(data.email);
    $("#joinedDate").val(data.joinedDate);
    $("#gender").val(data.gender);
    $("#designation").val(data.designation);
  }

  // Show add staff popup
  $("#addBtn").on("click", function () {
    showAddStaffPopup();
  });

  // Reusable function to close popups when clicking outside
  function closePopupOnClickOutside(popupSelector, triggerSelector) {
    $(document).on("click", function (event) {
      if (
        !$(event.target).closest(popupSelector + ", " + triggerSelector)
          .length &&
        $(popupSelector).is(":visible")
      ) {
        $(popupSelector).fadeOut();
        enableButtonsAndInputs();
      }
    });
  }

  closePopupOnClickOutside(".system-users-popup", "#usersBtn");

  // Format date inputs in Add/Update staff popup
  function formatDateInputs() {
    $('input[type="date"]').each(function () {
      const $input = $(this);
      const placeholder = $input.attr("placeholder");

      $input.attr("type", "text").val("").attr("placeholder", placeholder);

      $input.on("focus", function () {
        $input.attr("type", "date").attr("placeholder", "mm/dd/yyyy");
      });

      $input.on("blur", function () {
        if (!$input.val()) {
          $input.attr("type", "text").attr("placeholder", placeholder);
        }
      });
    });
  }

  // Function to disable buttons and inputs
  function disableButtonsAndInputs() {
    $(
      ".action-btn, #searchBtn, #searchName, #designationFilter, #genderFilter, #usersBtn, #addBtn"
    ).css("pointer-events", "none");
  }

  // Function to enable buttons and inputs
  function enableButtonsAndInputs() {
    $(
      ".action-btn, #searchBtn, #searchName, #designationFilter, #genderFilter, #usersBtn, #addBtn"
    ).css("pointer-events", "auto");
  }

  // Expose enableButtonsAndInputs globally
  window.enableButtonsAndInputs = enableButtonsAndInputs;

  // Initialize page
  loadDesignations();
  loadStaffData();
});
