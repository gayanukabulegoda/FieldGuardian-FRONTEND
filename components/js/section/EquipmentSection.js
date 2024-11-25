$(document).ready(function () {
  // Load equipment data
  function loadEquipmentData(filters = {}) {
    // Simulated API call - replace with actual backend call
    const equipmentData = [
      {
        id: "111 - 111",
        name: "Tractor",
        type: "Agricultural",
        status: "UNDER_MAINTENANCE",
        staffId: 1,
        field: "Evergreen Plains",
      },
      {
        id: "222 - 222",
        name: "Tractor",
        type: "Agricultural",
        status: "AVAILABLE",
        staffId: 2,
        field: "---",
      },
      {
        id: "333 - 333",
        name: "Tractor",
        type: "Agricultural",
        status: "IN_USE",
        staffId: 3,
        field: "Evergreen Plains",
      },
    ];

    renderEquipmentTable(equipmentData);
  }

  // Get status badge class
  function getStatusBadgeClass(status) {
    switch (status) {
      case "AVAILABLE":
        return "status-available";
      case "UNDER_MAINTENANCE":
        return "status-maintenance";
      case "IN_USE":
        return "status-inuse";
      default:
        return "";
    }
  }

  // Format status text
  function formatStatusText(status) {
    return status
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

  // Render equipment table
  function renderEquipmentTable(data) {
    const $tableBody = $("#equipmentTableBody");
    $tableBody.empty();

    data.forEach((equipment) => {
      const statusClass = getStatusBadgeClass(equipment.status);
      const statusText = formatStatusText(equipment.status);
      const row = `
                <div class="table-row" data-equipment='${JSON.stringify(
                  equipment
                )}'>
                    <div>${truncateText(equipment.name, 30)}</div>
                    <div>${truncateText(equipment.type, 23)}</div>
                    <div>
                        <span class="status-badge ${statusClass}">${statusText}</span>
                    </div>
                    <div>${truncateText(equipment.field, 30)}</div>
                    <div class="action-buttons">
                        <button class="action-btn delete" title="Delete" data-id="${
                          equipment.id
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
      status: $("#statusFilter").val(),
    };
    loadEquipmentData(filters);
  });

  // Action button handlers
  $(document).on("click", ".action-btn.delete", function () {
    const equipmentId = $(this).data("id");
    showDeleteConfirmationPopup(equipmentId);
    disableEquipmentButtonsAndInputs();
  });

  $(document).on("click", ".action-btn.edit", function () {
    const equipmentData = $(this).closest(".table-row").data("equipment");
    showUpdateEquipmentPopup(equipmentData);
  });

  $(document).on("click", ".action-btn.view", function () {
    const equipmentData = $(this).closest(".table-row").data("equipment");
    showViewEquipmentPopup(equipmentData);
  });

  // View equipment popup ---------------------------------------------------

  // Populate equipment details with tooltips for full text
  function populateEquipmentDetails(equipmentData) {
    $("#viewName")
      .text(truncateText(equipmentData.name, 30))
      .attr("data-full-text", equipmentData.name);
    $("#viewType")
      .text(equipmentData.type)
      .attr("data-full-text", equipmentData.type);
    $("#viewStatus")
      .text(formatStatusText(equipmentData.status))
      .attr("data-full-text", formatStatusText(equipmentData.status));
    if (equipmentData.staffId) {
      $("#viewStaff")
        .text(truncateText(equipmentData.staffId, 30))
        .attr("data-full-text", equipmentData.staffId);
    } else $("#viewStaff").text("---");
    $("#viewField")
      .text(truncateText(equipmentData.field, 30))
      .attr("data-full-text", equipmentData.field);
  }

  function showViewEquipmentPopup(equipmentData) {
    populateEquipmentDetails(equipmentData);
    $("#viewEquipmentPopup").fadeIn(300);
    disableEquipmentButtonsAndInputs();
  }

  function hideViewEquipmentPopup() {
    $("#viewEquipmentPopup").fadeOut();
    enableEquipmentButtonsAndInputs();
  }

  // Close button handlers
  $("#closeViewBtn, #closeButton").on("click", function () {
    hideViewEquipmentPopup();
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
  function showDeleteConfirmationPopup(equipmentId) {
    $("#confirmDeleteBtn").data("id", equipmentId);
    $("#deleteConfirmationPopup").fadeIn(300);
    disableEquipmentButtonsAndInputs();
  }

  // Hide delete confirmation popup
  function hideDeleteConfirmationPopup() {
    $("#deleteConfirmationPopup").fadeOut(300);
    enableEquipmentButtonsAndInputs();
  }

  // Add equipment popup ---------------------------------------------------

  const $addEquipmentPopup = $("#addEquipmentPopup");
  const $equipmentForm = $("#equipmentForm");
  const $popupTitle = $("#popupTitle");
  const $saveBtn = $("#saveBtn");
  const $statusSelect = $("#status");
  const $staffSelect = $("#staff");
  const $statusInputDiv = $("#status").closest(".form-group");
  const $actionType = $("#actionType");

  function loadStatusDataForPopup() {
    // Simulated API call - replace with actual backend call
    const statusData = ["AVAILABLE", "IN_USE", "UNDER_MAINTENANCE"];
    $statusSelect.empty();
    statusData.forEach((status) => {
      $statusSelect.append(
        $("<option>", {
          value: getStatusBadgeClass(status),
          text: formatStatusText(status),
        })
      );
    });
  }

  // Load staff members for the dropdown
  function loadStaffMembersForPopup(isAddPopup) {
    // TODO: Replace with actual API call
    const staffMembers = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
      { id: 3, name: "Mike Johnson" },
    ];
    $staffSelect.empty();
    if (isAddPopup) {
      $staffSelect.append(
        '<option value="" disabled selected hidden>Staff (Optional)</option>'
      );
    } else {
      $staffSelect.append(
        '<option value="" disabled selected hidden>Staff</option>'
      );
    }
    staffMembers.forEach((staff) => {
      $staffSelect.append(
        $("<option>", {
          value: staff.id,
          text: staff.name,
        })
      );
    });
  }

  function showAddEquipmentPopup() {
    $equipmentForm[0].reset();
    $popupTitle.text("Add Equipment");
    $saveBtn.text("SAVE");
    $actionType.val("add");
    $statusInputDiv.css("display", "none");
    loadStaffMembersForPopup(true);
    $addEquipmentPopup.fadeIn(300);
    disableEquipmentButtonsAndInputs();
  }

  // Function to show popup for updating equipment
  function showUpdateEquipmentPopup(equipmentData) {
    $popupTitle.text("Update Equipment");
    $saveBtn.text("UPDATE");
    $actionType.val("update");
    $statusInputDiv.css("display", "block");
    loadStatusDataForPopup();
    loadStaffMembersForPopup(false);
    fillFormWithEquipmentData(equipmentData);
    $addEquipmentPopup.fadeIn(300);
    disableEquipmentButtonsAndInputs();
  }

  function fillFormWithEquipmentData(equipmentData) {
    $("#name").val(equipmentData.name);
    $("#type").val(equipmentData.type);
    $("#status").val(getStatusBadgeClass(equipmentData.status));
    if (equipmentData.staffId) $("#staff").val(equipmentData.staffId);
  }

  // Show add staff popup
  $("#addBtn").on("click", function () {
    showAddEquipmentPopup();
  });

  // Function to disable buttons and inputs
  function disableEquipmentButtonsAndInputs() {
    $(".action-btn, #addBtn, #searchBtn, #searchName, #statusFilter").css(
      "pointer-events",
      "none"
    );
  }

  // Function to enable buttons and inputs
  function enableEquipmentButtonsAndInputs() {
    $(".action-btn, #addBtn, #searchBtn, #searchName, #statusFilter").css(
      "pointer-events",
      "auto"
    );
  }

  // Expose enableButtonsAndInputs globally
  window.enableEquipmentButtonsAndInputs = enableEquipmentButtonsAndInputs;

  // Initialize page
  loadEquipmentData();
});
