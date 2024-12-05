import EquipmentService from "../../../services/EquipmentService.js";

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
  $equipmentForm.on("submit", async function (event) {
    event.preventDefault();

    const equipmentDTO = {
      id: $("#equipmentId").val(),
      name: $("#name").val(),
      type: $("#type").val(),
      status: $("#status").val() || null,
      staffId: $("#staff").val() || null,
    };

    // Add validation
    if (!validateForm(equipmentDTO)) {
      return;
    }

    const actionType = $actionType.val();

    if (actionType === "add") {
      await addEquimentData(equipmentDTO);
      if (equipmentDTO.staffId) {
        const updateEquipmentStaffDTO = {
          equipmentId: equipmentDTO.id,
          staffId: equipmentDTO.staffId,
        };
        await updateEquipmentStaffData(updateEquipmentStaffDTO);
      }
    } else if (actionType === "update") {
      await updateEquipmentData(equipmentDTO.id, equipmentDTO);
      if (equipmentDTO.staffId) {
        const updateEquipmentStaffDTO = {
          equipmentId: equipmentDTO.id,
          staffId: equipmentDTO.staffId,
        };
        await updateEquipmentStaffData(updateEquipmentStaffDTO);
      }
    }
    hideEquipmentPopup();
    window.location.reload();
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

  function showError(message) {
    alert(message);
  }
});

const addEquimentData = async (equipmentDTO) => {
  return EquipmentService.saveEquipment(equipmentDTO)
    .done((response, textStatus, jqXHR) => {
      if (!jqXHR.status === 201) {
        alert("Failed to add equipment");
      }
    })
    .fail((xhr, status, error) => {
      console.error("Error during equipment addition:", error);
      alert("Failed to add equipment");
    });
};

const updateEquipmentData = async (id, equipmentDTO) => {
  return EquipmentService.updateEquipment(id, equipmentDTO)
    .done((response, textStatus, jqXHR) => {
      if (!jqXHR.status === 204) {
        alert("Failed to update equipment");
      }
    })
    .fail((xhr, status, error) => {
      console.error("Error during equipment update:", error);
      alert("Failed to update equipment");
    });
};

const updateEquipmentStaffData = async (updateEquipmentStaffDTO) => {
  return EquipmentService.updateEquipmentStaff(updateEquipmentStaffDTO)
    .done((response, textStatus, jqXHR) => {
      if (!jqXHR.status === 204) {
        alert("Failed to update equipment staff");
      }
    })
    .fail((xhr, status, error) => {
      console.error("Error during equipment staff update:", error);
      alert("Failed to update equipment staff");
    });
};
