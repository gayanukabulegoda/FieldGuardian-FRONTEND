import EquipmentService from "../../../services/EquipmentService.js";
import FieldService from "../../../services/FieldService.js";
import StaffService from "../../../services/StaffService.js";

$(document).ready(function () {
  async function loadEquipmentData(filters = {}) {
    try {
      const equipmentData = await getAllEquipmentData();
      renderEquipmentTable(equipmentData);
    } catch (error) {
      console.error("Error during equipment retrieval:", error);
    }
  }

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

  const getFieldNameFromFieldCode = async (fieldCode) => {
    const fieldData = await getAssignedFieldData(fieldCode);
    return fieldData ? fieldData.name : "N/A";
  };

  function renderEquipmentTable(data) {
    const $tableBody = $("#equipmentTableBody");
    $tableBody.empty();

    data.forEach(async (equipment) => {
      const statusClass = getStatusBadgeClass(equipment.status);
      const statusText = formatStatusText(equipment.status);

      let fieldName = "N/A";
      if (equipment.assignedFieldCode) {
        fieldName = await getFieldNameFromFieldCode(
          equipment.assignedFieldCode
        );
      }
      const row = `
                <div class="table-row" data-equipment='${JSON.stringify(
                  equipment
                )}'>
                    <div>${truncateText(equipment.name, 30)}</div>
                    <div>${truncateText(equipment.type, 23)}</div>
                    <div>
                        <span class="status-badge ${statusClass}">${statusText}</span>
                    </div>
                    <div>${truncateText(fieldName, 30)}</div>
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
      if (JSON.parse(localStorage.getItem("role")) === "SCIENTIST") {
        hideButtons();
      }
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
  });

  $(document).on("click", ".action-btn.edit", function () {
    const equipmentData = $(this).closest(".table-row").data("equipment");
    showUpdateEquipmentPopup(equipmentData);
  });

  $(document).on("click", ".action-btn.view", function () {
    const equipmentData = $(this).closest(".table-row").data("equipment");
    showViewEquipmentPopup(equipmentData);
  });

  // -------- View equipment popup --------

  const getStaffNameAndNoFromStaffId = async (staffId) => {
    const staffData = await getAssignedStaffData(staffId);
    const name = staffData.firstName ? staffData.firstName : "N/A";
    const contactNo = staffData.contactNo ? staffData.contactNo : "N/A";
    return { name, contactNo };
  };

  // Populate equipment details with tooltips for full text
  async function populateEquipmentDetails(equipmentData) {
    $("#viewName")
      .text(truncateText(equipmentData.name, 30))
      .attr("data-full-text", equipmentData.name);
    $("#viewType")
      .text(truncateText(equipmentData.type, 30))
      .attr("data-full-text", equipmentData.type);
    $("#viewStatus")
      .text(formatStatusText(equipmentData.status))
      .attr("data-full-text", formatStatusText(equipmentData.status));

    let staff = { name: "N/A", contactNo: "N/A" };
    if (equipmentData.assignedStaffId) {
      staff = await getStaffNameAndNoFromStaffId(equipmentData.assignedStaffId);
    }
    $("#viewStaff")
      .text(truncateText(staff.name + " - " + staff.contactNo, 30))
      .attr("data-full-text", staff.name + " - " + staff.contactNo);

    let fieldName = "N/A";
    if (equipmentData.assignedFieldCode) {
      fieldName = await getFieldNameFromFieldCode(
        equipmentData.assignedFieldCode
      );
    }
    $("#viewField")
      .text(truncateText(fieldName, 30))
      .attr("data-full-text", fieldName);
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

  // -------- Delete confirmation popup --------

  $("#closeDeletePopupBtn").on("click", function () {
    hideDeleteConfirmationPopup();
  });

  // Confirm delete button handler
  $("#confirmDeleteBtn").on("click", async function () {
    try {
      const equipmentId = $(this).data("id");
      await EquipmentService.deleteEquipment(equipmentId);
      $(`.table-row[data-id="${equipmentId}"]`).remove();
    } catch (error) {
      console.error("Error during equipment deletion:", error);
    }
    hideDeleteConfirmationPopup();
    loadEquipmentData();
  });

  function showDeleteConfirmationPopup(equipmentId) {
    $("#confirmDeleteBtn").data("id", equipmentId);
    $("#deleteConfirmationPopup").fadeIn(300);
    disableEquipmentButtonsAndInputs();
  }

  function hideDeleteConfirmationPopup() {
    $("#deleteConfirmationPopup").fadeOut(300);
    enableEquipmentButtonsAndInputs();
  }

  // -------- Add equipment popup --------

  const $addEquipmentPopup = $("#addEquipmentPopup");
  const $equipmentForm = $("#equipmentForm");
  const $popupTitle = $("#popupTitle");
  const $saveBtn = $("#saveBtn");
  const $statusSelect = $("#status");
  const $staffSelect = $("#staff");
  const $statusInputDiv = $("#status").closest(".form-group");
  const $actionType = $("#actionType");

  function loadStatusDataForPopup() {
    const statusData = ["AVAILABLE", "IN_USE", "UNDER_MAINTENANCE"];
    $statusSelect.empty();
    statusData.forEach((status) => {
      $statusSelect.append(
        $("<option>", {
          value: status,
          text: formatStatusText(status),
        })
      );
    });
  }

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
      // Initialize Select2 on the staff dropdown
      $staffSelect.select2({
        placeholder: "Select a staff member",
        allowClear: true,
        width: "100%",
      });
    } catch (error) {
      console.error("Error during staff retrieval:", error);
    }
  }

  const loadEquipmentTypes = () => {
    const equipmentTypes = [
      { value: "Tractor", text: "Tractor" },
      { value: "Plow", text: "Plow" },
      { value: "Harrow", text: "Harrow" },
      { value: "Cultivator", text: "Cultivator" },
      { value: "Rotavator", text: "Rotavator" },
      { value: "Seed Drill", text: "Seed Drill" },
      { value: "Planter", text: "Planter" },
      { value: "Transplanter", text: "Transplanter" },
      { value: "Sprinkler System", text: "Sprinkler System" },
      { value: "Drip Irrigation System", text: "Drip Irrigation System" },
      { value: "Water Pump", text: "Water Pump" },
      { value: "Sprayer", text: "Sprayer" },
      { value: "Duster", text: "Duster" },
      { value: "Combine Harvester", text: "Combine Harvester" },
      { value: "Reaper", text: "Reaper" },
      { value: "Thresher", text: "Thresher" },
      { value: "Grain Dryer", text: "Grain Dryer" },
      { value: "Rice Mill", text: "Rice Mill" },
      { value: "Winnower", text: "Winnower" },
      { value: "Trailer", text: "Trailer" },
      { value: "Farm Truck", text: "Farm Truck" },
      { value: "Power Tiller", text: "Power Tiller" },
      { value: "Weeder", text: "Weeder" },
      { value: "Mulcher", text: "Mulcher" },
    ];
    const $typeSelect = $("#type");
    $typeSelect.empty();
    $typeSelect.append(
      '<option value="" disabled selected hidden>Type</option>'
    );
    equipmentTypes.forEach((type) => {
      $typeSelect.append(
        $("<option>", {
          value: type.value,
          text: type.text,
        })
      );
    });
    $typeSelect.select2({
      placeholder: "Select a Type",
      allowClear: true,
      width: "100%",
    });
  };

  function showAddEquipmentPopup(equipmentId) {
    $equipmentForm[0].reset();
    $popupTitle.text("Add Equipment");
    $saveBtn.text("SAVE");
    $actionType.val("add");
    $statusInputDiv.css("display", "none");
    $("#equipmentId").val(equipmentId);
    loadStaffMembersForPopup(true);
    loadEquipmentTypes();
    $addEquipmentPopup.fadeIn(300);
    disableEquipmentButtonsAndInputs();
  }

  function showUpdateEquipmentPopup(equipmentData) {
    $popupTitle.text("Update Equipment");
    $saveBtn.text("UPDATE");
    $actionType.val("update");
    $statusInputDiv.css("display", "block");
    $("#equipmentId").val(equipmentData.id);
    loadStatusDataForPopup();
    loadStaffMembersForPopup(false).then(() => {
      if (equipmentData.assignedStaffId) {
        const customOption = new Option(
          "Staff already assigned!",
          equipmentData.assignedStaffId,
          true,
          true
        );
        $("#staff").append(customOption).trigger("change");
        $("#staff").prop("disabled", true);
      } else {
        $("#staff").prop("disabled", false);
      }
    })
    loadEquipmentTypes();
    fillFormWithEquipmentData(equipmentData);
    $addEquipmentPopup.fadeIn(300);
    disableEquipmentButtonsAndInputs();
  }

  function fillFormWithEquipmentData(equipmentData) {
    $("#name").val(equipmentData.name);
    $("#type").val(equipmentData.type).trigger("change");
    $("#status").val(equipmentData.status);
  }

  // Show add equipment popup
  $("#addBtn").on("click", function () {
    const firstRowEquipmentId = $("#equipmentTableBody .table-row:first").data(
      "equipment"
    ).id;
    const newEquipmentId = incrementEquipmentId(firstRowEquipmentId);
    showAddEquipmentPopup(newEquipmentId);
  });

  function incrementEquipmentId(equipmentId) {
    const parts = equipmentId.split("-");
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const todayDate = `${year}${month}${day}`;
    const numericPart = parseInt(parts[2], 10);
    const newNumericPart = String(numericPart + 1).padStart(3, "0");
    return `${parts[0]}-${todayDate}-${newNumericPart}`;
  }

  function disableEquipmentButtonsAndInputs() {
    $(".action-btn, #addBtn, #searchBtn, #searchName, #statusFilter").css(
      "pointer-events",
      "none"
    );
  }

  function enableEquipmentButtonsAndInputs() {
    $(".action-btn, #addBtn, #searchBtn, #searchName, #statusFilter").css(
      "pointer-events",
      "auto"
    );
  }
  window.enableEquipmentButtonsAndInputs = enableEquipmentButtonsAndInputs;

  // Initialize page
  loadEquipmentData();
});

const hideButtons = () => {
  $("#addBtn").hide();
  $(".action-btn.edit").hide();
  $(".action-btn.delete").hide();
};

const getAllEquipmentData = async () => {
  try {
    return await EquipmentService.getAllEquipments();
  } catch (error) {
    console.error("Error during equipments retrieval:", error);
  }
};

const getAssignedFieldData = async (fieldId) => {
  try {
    return await FieldService.getField(fieldId);
  } catch (error) {
    console.error("Error during field retrieval:", error);
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
