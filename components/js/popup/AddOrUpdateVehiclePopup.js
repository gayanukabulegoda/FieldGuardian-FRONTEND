import VehicleService from "../../../services/VehicleService.js";

$(document).ready(function () {
  const $addVehicleForm = $("#addVehicleForm");
  const $actionType = $("#actionType");
  const $remark = $("#remark");
  const $charCount = $("#currentCount");

  function hideAddVehiclePopup() {
    $("#addVehiclePopup").fadeOut();
    $addVehicleForm[0].reset();
    updateCharCount();
    enableVehicleButtonsAndInputs();
  }

  // Character count for remark
  function updateCharCount() {
    const currentLength = $remark.val().length;
    $charCount.text(currentLength);
  }
  $remark.on("input", updateCharCount);

  // Close button handler
  $("#addVehiclePopup #closeBtn").on("click", function () {
    hideAddVehiclePopup();
  });

  // Form submission handler
  $addVehicleForm.on("submit", async function (event) {
    event.preventDefault();

    const vehicleDTO = {
      code: $("#vehicleCode").val(),
      licensePlateNumber: $("#licensePlateNumber").val(),
      category: $("#category").val(),
      fuelType: $("#fuelType").val(),
      remark: $("#remark").val(),
      status: $("#status").val() || null,
      driverId: $("#staff").val() || null,
    };

    // Add validation
    if (!validateForm(vehicleDTO)) {
      return;
    }
    const actionType = $actionType.val();

    try {
      if (actionType === "add") {
        await addVehicleData(vehicleDTO);
        if (vehicleDTO.driverId) {
          await updateVehicleDriverData(vehicleDTO.code, vehicleDTO.driverId);
        }
      } else if (actionType === "update") {
        await updateVehicleData(vehicleDTO.code, vehicleDTO);
        if (vehicleDTO.driverId) {
          await updateVehicleDriverData(vehicleDTO.code, vehicleDTO.driverId);
        }
      }
    } catch (error) {
      console.error("Error during vehicle addition/update:", error);
    }
    hideAddVehiclePopup();
    window.location.reload();
  });

  // Form validation
  function validateForm(data) {
    if (!data.licensePlateNumber) {
      showError("Please enter license plate number");
      return false;
    }
    if (!data.category) {
      showError("Please select category");
      return false;
    }
    if (!data.fuelType) {
      showError("Please select fuel type");
      return false;
    }
    if (!data.remark) {
      showError("Please add your remark");
      return false;
    }
    return true;
  }

  function showError(message) {
    alert(message);
  }

  // Initialize popup
  function initializePopup() {
    updateCharCount();
  }
  initializePopup();
});

const addVehicleData = async (vehicleDTO) => {
  return VehicleService.saveVehicle(vehicleDTO)
    .then((response, textStatus, jqXHR) => {
      if (jqXHR.status !== 201) {
        alert("Failed to add vehicle");
      }
    })
    .catch((xhr, status, error) => {
      console.error("Error during vehicle addition:", error);
      alert("Failed to add vehicle");
    });
};

const updateVehicleData = async (id, vehicleDTO) => {
  return VehicleService.updateVehicle(id, vehicleDTO)
    .then((response, textStatus, jqXHR) => {
      if (jqXHR.status !== 204) {
        alert("Failed to update vehicle");
      }
    })
    .catch((xhr, status, error) => {
      console.error("Error during vehicle update:", error);
      alert("Failed to update vehicle");
    });
};

const updateVehicleDriverData = async (vehicleId, driverId) => {
  return VehicleService.updateVehicleDriver(vehicleId, driverId);
};
