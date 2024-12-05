import VehicleService from "../../../services/VehicleService.js";
import StaffService from "../../../services/StaffService.js";

$(document).ready(function () {
  async function loadVehicleData() {
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

  async function loadTableWithFilteredData(filters = {}) {
    try {
      const vehicleData = await VehicleService.filterVehicles(filters);
      if (vehicleData.length === 0) {
        alert("No vehicle for your search!");
        clearSearchInputs();
        loadVehicleData();
      } else {
        renderVehicleTable(vehicleData);
        clearSearchInputs();
      }
      if (JSON.parse(localStorage.getItem("role")) === "SCIENTIST") {
        hideButtons();
      }
    } catch (error) {
      console.error("Error during vehicle retrieval:", error);
      alert("No vehicle for your search!");
      clearSearchInputs();
      loadVehicleData();
    }
  }

  function clearSearchInputs() {
    $("#searchName").val("");
    $("#categoryFilter").val("");
    $("#statusFilter").val("");
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
      licensePlateNumber: $("#searchName").val(),
      category: $("#categoryFilter").val(),
      status: $("#statusFilter").val(),
    };
    if (!filters.licensePlateNumber && !filters.category && !filters.status) {
      alert("No vehicle for your search!");
      clearSearchInputs();
      loadVehicleData();
    } else {
      loadTableWithFilteredData(filters);
    }
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

  // --------  View vehicle popup --------

  const getStaffNameAndNoFromStaffId = async (staffId) => {
    const staffData = await getAssignedStaffData(staffId);
    const name = staffData.firstName ? staffData.firstName : "N/A";
    const contactNo = staffData.contactNo ? staffData.contactNo : "N/A";
    return { name, contactNo };
  };

  const populateVehicleDetails = async (vehicleData) => {
    $("#viewLicensePlateNumber")
      .text(truncateText(vehicleData.licensePlateNumber, 12))
      .attr("data-full-text", vehicleData.licensePlateNumber);
    $("#viewCategory")
      .text(truncateText(vehicleData.category, 18))
      .attr("data-full-text", vehicleData.category);
    $("#viewFuelType")
      .text(truncateText(vehicleData.fuelType, 20))
      .attr("data-full-text", vehicleData.fuelType);
    $("#viewStatus")
      .text(formatStatusText(vehicleData.status))
      .attr("data-full-text", formatStatusText(vehicleData.status));

    let staff = { name: "N/A", contactNo: "N/A" };
    if (vehicleData.driverId) {
      staff = await getStaffNameAndNoFromStaffId(vehicleData.driverId);
    }
    $("#viewStaff")
      .text(truncateText(staff.name + " - " + staff.contactNo, 30))
      .attr("data-full-text", staff.name + " - " + staff.contactNo);

    if (vehicleData.remark) {
      $("#viewRemark")
        .text(vehicleData.remark)
        .attr("data-full-text", vehicleData.remark);
    } else {
      $("#viewRemark").text("No remark recorded...");
    }
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

  // -------- Delete confirmation popup --------

  $("#closeDeletePopupBtn").on("click", function () {
    hideDeleteConfirmationPopup();
  });

  // Confirm delete button handler
  $("#confirmDeleteBtn").on("click", async function () {
    try {
      const vehicleCode = $(this).data("id");
      await VehicleService.deleteVehicle(vehicleCode);
      $(`.table-row[data-id="${vehicleCode}"]`).remove();
    } catch (error) {
      console.error("Error during vehicle deletion:", error);
    }
    hideDeleteConfirmationPopup();
    loadVehicleData();
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

  // -------- Add vehicle popup --------

  const $addVehiclePopup = $("#addVehiclePopup");
  const $addVehicleForm = $("#addVehicleForm");
  const $popupTitle = $("#popupTitle");
  const $saveBtn = $("#saveBtn");
  const $actionType = $("#actionType");
  const $statusSelect = $("#status");
  const $staffSelect = $("#staff");
  const $fuelTypeSelect = $("#fuelType");
  const $categorySelect = $("#category");
  const $statusInputDiv = $("#status").closest(".form-group");

  const loadStatusDataForPopup = () => {
    const statusData = ["AVAILABLE", "IN_USE", "OUT_OF_SERVICE"];
    $statusSelect.empty();
    statusData.forEach((status) => {
      $statusSelect.append(
        $("<option>", {
          value: status,
          text: formatStatusText(status),
        })
      );
    });
  };

  const loadFuelTypesForPopup = () => {
    const fuelTypes = [
      { value: "DIESEL", text: "Diesel" },
      { value: "PETROL", text: "Petrol" },
      { value: "BIODIESEL", text: "Biodiesel" },
      { value: "ETHANOL", text: "Ethanol" },
      { value: "LPG", text: "Liquefied Petroleum Gas (LPG)" },
      { value: "ELECTRICITY", text: "Electricity" },
    ];
    $fuelTypeSelect.empty();
    $fuelTypeSelect.append(
      '<option value="" disabled selected hidden>Fuel type</option>'
    );
    fuelTypes.forEach((type) => {
      $fuelTypeSelect.append(
        $("<option>", {
          value: type.value,
          text: type.text,
        })
      );
    });
  };

  const vehicleCategories = [
    { value: "TRACTOR", text: "Tractor" },
    { value: "COMBINE_HARVESTER", text: "Combine Harvester" },
    { value: "FORAGE_HARVESTER", text: "Forage Harvester" },
    { value: "SUGARCANE_HARVESTER", text: "Sugarcane Harvester" },
    { value: "TRUCK", text: "Truck" },
    { value: "VAN", text: "Van" },
    { value: "LORRY", text: "Lorry" },
    { value: "TRAILER", text: "Trailer" },
    { value: "SEED_DRILL", text: "Seed Drill" },
    { value: "PLANTER", text: "Planter" },
    { value: "TRANSPLANTER", text: "Transplanter" },
    { value: "WATER_TANKER", text: "Water Tanker" },
    { value: "IRRIGATION_TRUCK", text: "Irrigation Truck" },
    { value: "SPRAYER", text: "Sprayer" },
    { value: "DUSTER", text: "Duster" },
  ];

  const loadVehicleCategories = () => {
    const $categoryFilter = $("#categoryFilter");
    $categoryFilter.empty();
    $categoryFilter.append(
      '<option value="" disabled selected hidden>Category</option>'
    );
    vehicleCategories.forEach((category) => {
      $categoryFilter.append(
        $("<option>", {
          value: category.value,
          text: category.text,
        })
      );
    });
  };

  const loadVehicleCategoriesForPopup = () => {
    $categorySelect.empty();
    $categorySelect.append(
      '<option value="" disabled selected hidden>Category</option>'
    );
    vehicleCategories.forEach((category) => {
      $categorySelect.append(
        $("<option>", {
          value: category.value,
          text: category.text,
        })
      );
    });
    $categorySelect.select2({
      placeholder: "Select a Type",
      allowClear: true,
      width: "100%",
    });
  };

  async function loadStaffMembersForPopup(isAddPopup) {
    try {
      const staffMembers = await getAllStaffMembers();
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
            text: staff.firstName + " - " + staff.contactNo,
          })
        );
      });
      $staffSelect.select2({
        placeholder: "Select a staff member",
        allowClear: true,
        width: "100%",
      });
    } catch (error) {
      console.error("Error during staff retrieval:", error);
    }
  }

  const showAddVehiclePopup = (vehicleCode) => {
    $addVehicleForm[0].reset();
    $popupTitle.text("Add Vehicle");
    $saveBtn.text("SAVE");
    $actionType.val("add");
    $statusInputDiv.css("display", "none");
    $("#vehicleCode").val(vehicleCode);
    loadStaffMembersForPopup(true);
    loadFuelTypesForPopup();
    loadVehicleCategoriesForPopup();
    loadStatusDataForPopup();
    $addVehiclePopup.fadeIn(300);
    disableVehicleButtonsAndInputs();
  };

  const showUpdateVehiclePopup = (vehicleData) => {
    $popupTitle.text("Update Vehicle");
    $saveBtn.text("UPDATE");
    $actionType.val("update");
    $statusInputDiv.css("display", "block");
    $("#vehicleCode").val(vehicleData.code);
    loadStaffMembersForPopup(false).then(() => {
      if (vehicleData.driverId) {
        const customOption = new Option(
          "Staff already assigned!",
          vehicleData.driverId,
          true,
          true
        );
        $("#staff").append(customOption).trigger("change");
        $("#staff").val("");
        $("#staff").prop("disabled", true);
      } else {
        $("#staff").prop("disabled", false);
      }
    });
    loadFuelTypesForPopup();
    loadVehicleCategoriesForPopup();
    loadStatusDataForPopup();
    fillWithVehicleData(vehicleData);
    $addVehiclePopup.fadeIn(300);
    disableVehicleButtonsAndInputs();
  };

  const fillWithVehicleData = (vehicleData) => {
    $("#licensePlateNumber").val(vehicleData.licensePlateNumber);
    $("#category").val(vehicleData.category).trigger("change");
    $("#status").val(vehicleData.status);
    $("#fuelType").val(vehicleData.fuelType);
    $("#remark").val(vehicleData.remark);
  };

  $("#addBtn").on("click", function () {
    const firstRowVehicleCode = $("#vehicleTableBody .table-row:first").data(
      "vehicle"
    ).code;
    const newVehicleCode = incrementVehicleCode(firstRowVehicleCode);
    showAddVehiclePopup(newVehicleCode);
  });

  function incrementVehicleCode(vehicleCode) {
    const parts = vehicleCode.split("-");
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const todayDate = `${year}${month}${day}`;
    const numericPart = parseInt(parts[2], 10);
    const newNumericPart = String(numericPart + 1).padStart(3, "0");
    return `${parts[0]}-${todayDate}-${newNumericPart}`;
  }

  const disableVehicleButtonsAndInputs = () => {
    $(
      ".action-btn, #addBtn, #searchBtn, #searchName, #categoryFilter, #statusFilter"
    ).css("pointer-events", "none");
  };

  const enableVehicleButtonsAndInputs = () => {
    $(
      ".action-btn, #addBtn, #searchBtn, #searchName, #categoryFilter, #statusFilter"
    ).css("pointer-events", "auto");
  };
  window.enableVehicleButtonsAndInputs = enableVehicleButtonsAndInputs;

  // Initialize page
  loadVehicleData();
  loadVehicleCategories();
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

const getAssignedStaffData = async (staffId) => {
  try {
    return await StaffService.getStaff(staffId);
  } catch (error) {
    console.error("Error during staff retrieval:", error);
  }
};

const getAllStaffMembers = async () => {
  try {
    return await StaffService.getAllStaff();
  } catch (error) {
    console.error("Error during staff retrieval:", error);
  }
};
