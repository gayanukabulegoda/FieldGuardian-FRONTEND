import VehicleService from "../../../services/VehicleService.js";

$(document).ready(function () {
  async function loadVehicleData(filters = {}) {
    try {
      const vehicleData = await getAllVehicleData();
      renderVehicleTable(vehicleData);
      if (JSON.parse(localStorage.getItem("role")) === "SCIENTIST") {
        hideButtons();
      }
    } catch (error) {
      console.error("Error during vehicle retrieval:", error);
    }
  }

  // Get status badge class
  function getStatusBadgeClass(status) {
    switch (status) {
      case "AVAILABLE":
        return "status-available";
      case "IN_USE":
        return "status-inuse";
      case "OUT_OF_SERVICE":
        return "status-outofservice";
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

  // Render vehicle table
  function renderVehicleTable(data) {
    const $tableBody = $("#vehicleTableBody");
    $tableBody.empty();

    data.forEach((vehicle) => {
      const statusClass = getStatusBadgeClass(vehicle.status);
      const statusText = formatStatusText(vehicle.status);
      const row = `
                <div class="table-row" data-vehicle='${JSON.stringify(
                  vehicle
                )}'>
                    <div>${truncateText(vehicle.licensePlateNumber, 12)}</div>
                    <div>${truncateText(vehicle.category, 18)}</div>
                    <div>
                        <span class="status-badge ${statusClass}">${statusText}</span>
                    </div>
                    <div>${truncateText(vehicle.fuelType, 20)}</div>
                    <div class="action-buttons">
                        <button class="action-btn delete" title="Delete" data-id="${
                          vehicle.code
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
      category: $("#categoryFilter").val(),
      status: $("#statusFilter").val(),
    };
    loadVehicleData(filters);
  });

  // Action button handlers
  $(document).on("click", ".action-btn.delete", function () {
    const vehicleCode = $(this).data("id");
    showDeleteConfirmationPopup(vehicleCode);
  });

  $(document).on("click", ".action-btn.edit", function () {
    const vehicleData = $(this).closest(".table-row").data("vehicle");
    showUpdateVehiclePopup(vehicleData);
  });

  $(document).on("click", ".action-btn.view", function () {
    const vehicleData = $(this).closest(".table-row").data("vehicle");
    showViewVehiclePopup(vehicleData);
  });

  // View vehicle popup --------------------------------------------------------

  const populateVehicleDetails = (vehicleData) => {
    $("#viewLicensePlateNumber")
      .text(vehicleData.licensePlate)
      .attr("data-full-text", vehicleData.licensePlate);
    $("#viewCategory")
      .text(vehicleData.category)
      .attr("data-full-text", vehicleData.category);
    $("#viewFuelType")
      .text(vehicleData.fuelType)
      .attr("data-full-text", vehicleData.fuelType);
    if (vehicleData.remark) {
      $("#viewRemark")
        .text(vehicleData.remark)
        .attr("data-full-text", vehicleData.remark);
    } else {
      $("#viewRemark").text("No remark recorded...");
    }

    // Temporary data -------------------------------------------------
    const staffMembers = [
      {
        name: "Xavier De Gunasekara",
        mobile: "071 234 5678",
      },
      {
        name: "John Doe",
        mobile: "072 345 6789",
      },
      {
        name: "Jane Smith",
        mobile: "073 456 7890",
      },
      {
        name: "Xavier De Gunasekara",
        mobile: "071 234 5678",
      },
      {
        name: "John Doe",
        mobile: "072 345 6789",
      },
      {
        name: "Jane Smith",
        mobile: "073 456 7890",
      },
    ];
    // ---------------------------------------------------------------

    // Populate staff members
    const $staffViewContainer = $("#staffViewContainer");
    $staffViewContainer.empty();
    // vehicleData.staffMembers.forEach((staff) => {
    staffMembers.forEach((staff) => {
      const row = `
        <div class="selection-row">
          <div class="selection-info">
            <span class="selection-name">${staff.name}</span>
            <span class="selection-detail">${staff.mobile}</span>
          </div>
        </div>
      `;
      $staffViewContainer.append(row);
    });
  };

  const showViewVehiclePopup = (vehicleData) => {
    populateVehicleDetails(vehicleData);
    $("#viewVehiclePopup").fadeIn(300);
    disableVehicleButtonsAndInputs();
  };

  const hideViewVehiclePopup = () => {
    $("#viewVehiclePopup").fadeOut();
    enableVehicleButtonsAndInputs();
  };

  $("#closeViewBtn, #closeButton").on("click", function () {
    hideViewVehiclePopup();
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
  function showDeleteConfirmationPopup(vehicleCode) {
    $("#confirmDeleteBtn").data("id", vehicleCode);
    $("#deleteConfirmationPopup").fadeIn(300);
    disableVehicleButtonsAndInputs();
  }

  // Hide delete confirmation popup
  function hideDeleteConfirmationPopup() {
    $("#deleteConfirmationPopup").fadeOut(300);
    enableVehicleButtonsAndInputs();
  }

  // Add vehicle popup ------------------------------------------------------

  const $addVehiclePopup = $("#addVehiclePopup");
  const $addVehicleForm = $("#addVehicleForm");
  const $popupTitle = $("#popupTitle");
  const $saveBtn = $("#saveBtn");
  const $actionType = $("#actionType");
  const $staffSelectionTitle = $("#staffSelectionTitle");

  const showAddVehiclePopup = () => {
    $addVehicleForm[0].reset();
    $popupTitle.text("Add Vehicle");
    $saveBtn.text("SAVE");
    $actionType.val("add");
    $staffSelectionTitle.text("Select Staff (Optional)");
    $addVehiclePopup.fadeIn(300);
    disableVehicleButtonsAndInputs();
  };

  const showUpdateVehiclePopup = (vehicleData) => {
    $popupTitle.text("Update Vehicle");
    $saveBtn.text("UPDATE");
    $actionType.val("update");
    $staffSelectionTitle.text("Select Staff");
    fillWithVehicleData(vehicleData);
    $addVehiclePopup.fadeIn(300);
    disableVehicleButtonsAndInputs();
  };

  const fillWithVehicleData = (vehicleData) => {
    $("#licensePlateNumber").val(vehicleData.licensePlate);
    $("#category").val(vehicleData.category.toUpperCase());
    $("#fuelType").val(vehicleData.fuelType.toUpperCase());
    $("#remark").val(vehicleData.remark);
  };

  $("#addBtn").on("click", function () {
    showAddVehiclePopup();
  });

  // Function to disable buttons and inputs
  const disableVehicleButtonsAndInputs = () => {
    $(
      ".action-btn, #addBtn, #searchBtn, #searchName, #categoryFilter, #statusFilter"
    ).css("pointer-events", "none");
  };

  // Function to enable buttons and inputs
  const enableVehicleButtonsAndInputs = () => {
    $(
      ".action-btn, #addBtn, #searchBtn, #searchName, #categoryFilter, #statusFilter"
    ).css("pointer-events", "auto");
  };

  window.enableVehicleButtonsAndInputs = enableVehicleButtonsAndInputs;

  // Initialize page
  loadVehicleData();
});

const hideButtons = () => {
  $("#addBtn").hide();
  $(".action-btn.edit").hide();
  $(".action-btn.delete").hide();
};

const getAllVehicleData = async () => {
  try {
    return await VehicleService.getAllVehicles();
  } catch (error) {
    console.error("Error during vehicle retrieval:", error);
    throw new Error("Failed to retrieve vehicle");
  }
};
