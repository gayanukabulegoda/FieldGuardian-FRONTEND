import StaffService from "../../../services/StaffService.js";

$(document).ready(function () {
  async function loadDesignations() {
    try {
      const designations = await getAllDesignations();
      const $select = $("#designationFilter");
      designations.forEach((designation) => {
        $select.append(
          new Option(formatDesignationText(designation), designation)
        );
      });
    } catch (error) {
      console.error("Error loading designations:", error);
    }
  }

  async function loadStaffData() {
    try {
      const staffData = await getAllStaffMembers();
      renderStaffTable(staffData);
      if (JSON.parse(localStorage.getItem("role")) === "SCIENTIST") {
        hideButtons();
      }
    } catch (error) {
      console.error("Error loading staff data:", error);
    }
  }

  async function loadTableWithFilteredData(filters = {}) {
    try {
      const staffData = await StaffService.filterStaff(filters);
      if (staffData.length === 0) {
        alert("No staff member for your search!");
        clearSearchInputs();
        loadStaffData();
      } else {
        renderStaffTable(staffData);
        clearSearchInputs();
      }
      if (JSON.parse(localStorage.getItem("role")) === "SCIENTIST") {
        hideButtons();
      }
    } catch (error) {
      console.error("Error loading staff data:", error);
      alert("No staff member for your search!");
      clearSearchInputs();
      loadStaffData();
    }
  }

  function clearSearchInputs() {
    $("#searchName").val("");
    $("#designationFilter").val("");
    $("#genderFilter").val("");
  }

  function formatDesignationText(text) {
    return text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  // Truncate text to a specific character limit
  function truncateText(text, limit) {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  }

  function renderStaffTable(data) {
    const $tableBody = $("#staffTableBody");
    $tableBody.empty();

    data.forEach((staff) => {
      const name = `${staff.firstName} ${staff.lastName}`;
      const row = `
                <div class="table-row" data-staff='${JSON.stringify(staff)}'>
                    <div>${truncateText(name, 28)}</div>
                    <div>${formatDesignationText(
                      truncateText(staff.designation, 24)
                    )}</div>
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
    loadTableWithFilteredData(filters);
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

  // -------- View staff popup --------

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
      .text(formatDesignationText(staffData.gender))
      .attr("data-full-text", formatDesignationText(staffData.gender));
    $("#viewDesignation")
      .text(formatDesignationText(staffData.designation))
      .attr("data-full-text", formatDesignationText(staffData.designation));
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
    showSystemUsersPopup();
  });

  const showSystemUsersPopup = () => {
    $(".system-users-popup").fadeIn();
    disableStaffButtonsAndInputs();
  };

  // -------- Delete confirmation popup --------

  $("#closeDeletePopupBtn").on("click", function () {
    hideDeleteConfirmationPopup();
  });

  // Confirm delete button handler
  $("#confirmDeleteBtn").on("click", async function () {
    try {
      const staffId = $(this).data("id");
      await StaffService.deleteStaff(staffId);
      $(`.table-row[data-id="${staffId}"]`).remove();
    } catch (error) {
      console.error("Error while deleting staff: ", error);
    }
    hideDeleteConfirmationPopup();
    loadStaffData();
  });

  function showDeleteConfirmationPopup(staffId) {
    $("#confirmDeleteBtn").data("id", staffId);
    $("#deleteConfirmationPopup").fadeIn(300);
    disableStaffButtonsAndInputs();
  }

  function hideDeleteConfirmationPopup() {
    $("#deleteConfirmationPopup").fadeOut(300);
    enableStaffButtonsAndInputs();
  }

  // -------- Add staff popup --------

  const $addStaffPopup = $("#addStaffPopup");
  const $addStaffForm = $("#addStaffForm");
  const $popupTitle = $("#popupTitle");
  const $saveBtn = $("#saveBtn");
  const $actionType = $("#actionType");

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

  function showUpdateStaffPopup(staffData) {
    $popupTitle.text("Update Staff");
    $saveBtn.text("UPDATE");
    $actionType.val("update");
    $("#staffId").val(staffData.id);
    formatDateInputs();
    loadDesignationsForStaffPopup();
    fillFormWithStaffData(staffData);
    $addStaffPopup.fadeIn(300);
    disableStaffButtonsAndInputs();
  }

  async function loadDesignationsForStaffPopup() {
    try {
      const designations = await getAllDesignations();
      const $select = $("#designation");
      $select.empty();
      if ($actionType.val() === "add") {
        const defaultOption = new Option("Select Designation", "", true, true);
        defaultOption.disabled = true;
        $select.append(defaultOption);
      }
      designations.forEach((designation) => {
        $select.append(
          new Option(formatDesignationText(designation), designation)
        );
      });
    } catch (error) {
      console.error("Error loading designations for staff popup:", error);
    }
  }

  // Fill form with staff data for updating
  function fillFormWithStaffData(data) {
    $("#firstName").val(data.firstName);
    $("#lastName").val(data.lastName);
    $("#dateOfBirth").val(formatDate(data.dateOfBirth));
    $("#address").val(data.address);
    $("#postalCode").val(data.postalCode);
    $("#contactNumber").val(data.contactNo);
    $("#email").val(data.email);
    $("#joinedDate").val(formatDate(data.joinedDate));
    $("#gender").val(data.gender);
    $("#designation").val(data.designation);
  }

  // Show add staff popup
  $("#addBtn").on("click", function () {
    showAddStaffPopup();
  });

  // Function to close popups when clicking outside
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

  function disableStaffButtonsAndInputs() {
    $(
      ".action-btn, #searchBtn, #searchName, #designationFilter, #genderFilter, #usersBtn, #addBtn"
    ).css("pointer-events", "none");
  }

  function enableStaffButtonsAndInputs() {
    $(
      ".action-btn, #searchBtn, #searchName, #designationFilter, #genderFilter, #usersBtn, #addBtn"
    ).css("pointer-events", "auto");
  }
  window.enableStaffButtonsAndInputs = enableStaffButtonsAndInputs;

  // Initialize page
  loadDesignations();
  loadStaffData();
});

const hideButtons = () => {
  $("#addBtn").hide();
  $("#usersBtn").hide();
  $(".action-btn.edit").hide();
  $(".action-btn.delete").hide();
};

const getAllStaffMembers = async () => {
  try {
    return await StaffService.getAllStaff();
  } catch (error) {
    console.error("Error during staff retrieval:", error);
    throw new Error("Failed to retrieve staff");
  }
};

const getAllDesignations = () => {
  try {
    return StaffService.getAllStaffDesignations();
  } catch (error) {
    console.error("Error fetching designations:", error);
    throw new Error("Failed to fetch designations");
  }
};
