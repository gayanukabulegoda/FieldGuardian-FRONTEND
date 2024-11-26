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
        id: "111-111",
        designation: "SENIOR ASSISTANT MANAGER",
        contactNo: "071 234 5678",
        email: "xavierdegk999@gmail.com",
        firstName: "Xavier",
        lastName: "De GunasekaraA",
        dateOfBirth: "1990-01-01",
        address: "123 Main St",
        postalCode: "12345",
        joinedDate: "2020-01-01",
        gender: "MALE",
      },
      {
        id: "222-222",
        designation: "SENIOR ASSISTANT MANAGER",
        contactNo: "071 234 5678",
        email: "xavierdegk999@gmail.com",
        firstName: "Xavier",
        lastName: "De GunasekaraX",
        dateOfBirth: "1990-01-01",
        address: "123 Main St",
        postalCode: "12345",
        joinedDate: "2020-01-01",
        gender: "MALE",
      },
      {
        id: "333-333",
        designation: "SENIOR ASSISTANT MANAGER",
        contactNo: "071 234 5678",
        email: "xavierdegk999@gmail.com",
        firstName: "Xavier",
        lastName: "De GunasekaraY",
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
      const name = `${staff.firstName} ${staff.lastName}`;
      const row = `
                <div class="table-row" data-staff='${JSON.stringify(staff)}'>
                    <div>${truncateText(name, 28)}</div>
                    <div>${truncateText(staff.designation, 24)}</div>
                    <div>${truncateText(staff.contactNo, 12)}</div>
                    <div>${truncateText(staff.email, 28)}</div>
                    <div class="action-buttons">
                        <button class="action-btn delete" title="Delete" data-id="${
                          staff.id
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
      designation: $("#designationFilter").val(),
      gender: $("#genderFilter").val(),
    };
    loadStaffData(filters);
  });

  // Action button handlers
  $(document).on("click", ".action-btn.delete", function () {
    const staffId = $(this).data("id");
    showDeleteConfirmationPopup(staffId);
  });

  $(document).on("click", ".action-btn.edit", function () {
    const staffData = $(this).closest(".table-row").data("staff");
    showUpdateStaffPopup(staffData);
  });

  $(document).on("click", ".action-btn.view", function () {
    const staffData = $(this).closest(".table-row").data("staff");
    showViewStaffPopup(staffData);
  });

  // view staff popup --------------------------------------------------------

  // Populate staff details with tooltips for full text
  function populateStaffDetails(staffData) {
    $("#viewFirstName")
      .text(truncateText(staffData.firstName, 26))
      .attr("data-full-text", staffData.firstName);
    $("#viewLastName")
      .text(truncateText(staffData.lastName, 26))
      .attr("data-full-text", staffData.lastName);
    $("#viewDateOfBirth")
      .text(formatDate(staffData.dateOfBirth))
      .attr("data-full-text", formatDate(staffData.dateOfBirth));
    $("#viewAddress")
      .text(truncateText(staffData.address, 26))
      .attr("data-full-text", staffData.address);
    $("#viewPostalCode")
      .text(staffData.postalCode)
      .attr("data-full-text", staffData.postalCode);
    $("#viewContactNumber")
      .text(staffData.contactNo)
      .attr("data-full-text", staffData.contactNo);
    $("#viewEmail")
      .text(truncateText(staffData.email, 26))
      .attr("data-full-text", staffData.email);
    $("#viewJoinedDate")
      .text(formatDate(staffData.joinedDate))
      .attr("data-full-text", formatDate(staffData.joinedDate));
    $("#viewGender")
      .text(staffData.gender)
      .attr("data-full-text", staffData.gender);
    $("#viewDesignation")
      .text(staffData.designation)
      .attr("data-full-text", staffData.designation);
  }

  // Format date for display
  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  function showViewStaffPopup(staffData) {
    populateStaffDetails(staffData);
    $("#viewStaffPopup").fadeIn(300);
    disableStaffButtonsAndInputs();
  }

  function hideViewStaffPopup() {
    $("#viewStaffPopup").fadeOut();
    enableStaffButtonsAndInputs();
  }

  // Close button handlers
  $("#closeViewBtn, #closeButton").on("click", function () {
    hideViewStaffPopup();
  });

  // Show system users popup
  $("#usersBtn").on("click", function () {
    $(".system-users-popup").fadeIn();
    disableStaffButtonsAndInputs();
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
  function showDeleteConfirmationPopup(staffId) {
    $("#confirmDeleteBtn").data("id", staffId);
    $("#deleteConfirmationPopup").fadeIn(300);
    disableStaffButtonsAndInputs();
  }

  // Hide delete confirmation popup
  function hideDeleteConfirmationPopup() {
    $("#deleteConfirmationPopup").fadeOut(300);
    enableStaffButtonsAndInputs();
  }

  // Add staff popup --------------------------------------------------------

  const $addStaffPopup = $("#addStaffPopup");
  const $addStaffForm = $("#addStaffForm");
  const $popupTitle = $("#popupTitle");
  const $saveBtn = $("#saveBtn");
  const $actionType = $("#actionType");

  // Show add staff popup function
  function showAddStaffPopup() {
    $addStaffForm[0].reset();
    $popupTitle.text("Add Staff");
    $saveBtn.text("SAVE");
    $actionType.val("add");
    formatDateInputs();
    loadDesignationsForStaffPopup();
    $addStaffPopup.fadeIn(300);
    disableStaffButtonsAndInputs();
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
    disableStaffButtonsAndInputs();
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
    $("#contactNumber").val(data.contactNo);
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
        enableStaffButtonsAndInputs();
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
  function disableStaffButtonsAndInputs() {
    $(
      ".action-btn, #searchBtn, #searchName, #designationFilter, #genderFilter, #usersBtn, #addBtn"
    ).css("pointer-events", "none");
  }

  // Function to enable buttons and inputs
  function enableStaffButtonsAndInputs() {
    $(
      ".action-btn, #searchBtn, #searchName, #designationFilter, #genderFilter, #usersBtn, #addBtn"
    ).css("pointer-events", "auto");
  }

  // Expose enableStaffButtonsAndInputs globally
  window.enableStaffButtonsAndInputs = enableStaffButtonsAndInputs;

  // Initialize page
  loadDesignations();
  loadStaffData();
});
