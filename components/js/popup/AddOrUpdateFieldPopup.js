import FieldService from "../../../services/FieldService.js";
import EquipmentService from "../../../services/EquipmentService.js";
import StaffService from "../../../services/StaffService.js";

$(document).ready(function () {
  const $addFieldForm = $("#addFieldForm");
  const $actionType = $("#actionType");
  const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes
  const selectedStaffIds = new Set();
  const selectedEquipmentIds = new Set();

  function hideAddFieldPopup() {
    $("#addFieldPopup").fadeOut();
    $addFieldForm[0].reset();
    resetImageUploads();
    resetSelections();
    enableFieldButtonsAndInputs();
  }

  function resetImageUploads() {
    $("#fieldImage1, #fieldImage2").val("");
    $("#previewContainer1, #previewContainer2").hide();
    $("#imagePreview1, #imagePreview2").attr("src", "");
  }

  function resetSelections() {
    selectedStaffIds.clear();
    selectedEquipmentIds.clear();
    $(".selection-row").removeClass("selected");
  }

  // Close button handler
  $("#addFieldPopup #closeBtn").on("click", function () {
    hideAddFieldPopup();
  });

  // Image upload handling
  $(".upload-area").each(function (index) {
    const areaId = index + 1;
    const $uploadArea = $(this);
    const $fileInput = $(`#fieldImage${areaId}`);
    const $previewContainer = $(`#previewContainer${areaId}`);
    const $imagePreview = $(`#imagePreview${areaId}`);

    $uploadArea.on("click", function () {
      $fileInput.click();
    });

    $fileInput.on("change", function (event) {
      const file = event.target.files[0];
      if (!file) return;

      // Validate file type
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        showError("Please select a PNG, JPG, or JPEG image");
        resetImageUpload(areaId);
        return;
      }
      // Validate file size
      if (file.size > maxFileSize) {
        showError("File size must be less than 10MB");
        resetImageUpload(areaId);
        return;
      }

      // Preview image
      const reader = new FileReader();
      reader.onload = function (e) {
        $imagePreview.attr("src", e.target.result);
        $previewContainer.show();
        $uploadArea.addClass("has-image");
      };
      reader.readAsDataURL(file);
    });
  });

  function resetImageUpload(areaId) {
    $(`#fieldImage${areaId}`).val("");
    $(`#previewContainer${areaId}`).hide();
    $(`#imagePreview${areaId}`).attr("src", "");
  }

  // Load staff and equipment data
  async function loadStaffData() {
    try {
      const staffData = await getAllStaffMembers();
      renderStaffRows(staffData);
    } catch (error) {
      console.error("Error loading staff data:", error);
    }
  }

  async function loadEquipmentData() {
    try {
      const equipmentData = await getAllEquipmentData();
      renderEquipmentRows(equipmentData);
    } catch (error) {
      console.error("Error loading equipment data:", error);
    }
  }

  function truncateText(text, limit) {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  }

  function renderStaffRows(staffData) {
    const $container = $("#staffContainer");
    $container.empty();

    staffData.forEach((staff) => {
      const name = `${staff.firstName} ${staff.lastName}`;
      const row = `
        <div class="selection-row" data-id="${staff.id}">
          <div class="selection-info">
            <span class="selection-name">${truncateText(name, 28)}</span>
            <span class="selection-detail">${truncateText(
              staff.contactNo,
              12
            )}</span>
          </div>
        </div>
      `;
      $container.append(row);
    });
  }

  function renderEquipmentRows(equipmentData) {
    const $container = $("#equipmentContainer");
    $container.empty();

    equipmentData.forEach((equipment) => {
      const row = `
        <div class="selection-row" data-id="${equipment.id}">
          <div class="selection-info">
            <span class="selection-name">${truncateText(
              equipment.name,
              30
            )}</span>
            <span class="selection-detail">${truncateText(
              equipment.type,
              23
            )}</span>
          </div>
        </div>
      `;
      $container.append(row);
    });
  }

  // Selection handlers
  $("#staffContainer").on("click", ".selection-row", function () {
    const staffId = $(this).data("id");
    $(this).toggleClass("selected");

    if ($(this).hasClass("selected")) {
      selectedStaffIds.add(staffId);
    } else {
      selectedStaffIds.delete(staffId);
    }
  });

  $("#equipmentContainer").on("click", ".selection-row", function () {
    const equipmentId = $(this).data("id");
    $(this).toggleClass("selected");

    if ($(this).hasClass("selected")) {
      selectedEquipmentIds.add(equipmentId);
    } else {
      selectedEquipmentIds.delete(equipmentId);
    }
  });

  // Form submission handler
  $addFieldForm.on("submit", async function (event) {
    event.preventDefault();

    const fieldDTO = {
      code: $("#fieldCode").val(),
      name: $("#name").val(),
      extentSize: $("#extentSize").val(),
      location: extractCoordinates($("#location").val()),
    };
    const image1 = $("#fieldImage1")[0].files[0];
    const image2 = $("#fieldImage2")[0].files[0];
    if (image1) fieldDTO.fieldImage1 = image1;
    if (image2) fieldDTO.fieldImage2 = image2;

    // Add validation
    if (!validateForm(fieldDTO)) {
      return;
    }
    const actionType = $actionType.val();

    try {
      if (actionType === "add") {
        await addFieldData(fieldDTO);
        if (selectedStaffIds.size > 0) {
          await updateFieldStaffData(
            fieldDTO.code,
            Array.from(selectedStaffIds)
          );
        }
        if (selectedEquipmentIds.size > 0) {
          await updateFieldEquipmentData(
            fieldDTO.code,
            Array.from(selectedEquipmentIds)
          );
        }
      } else if (actionType === "update") {
        // Convert base64 images to File objects if necessary
        if (
          !fieldDTO.fieldImage1 &&
          $("#imagePreview1").attr("src").startsWith("data:image")
        ) {
          fieldDTO.fieldImage1 = base64ToFile(
            $("#imagePreview1").attr("src"),
            "fieldImage1.jpg"
          );
        }
        if (
          !fieldDTO.fieldImage2 &&
          $("#imagePreview2").attr("src").startsWith("data:image")
        ) {
          fieldDTO.fieldImage2 = base64ToFile(
            $("#imagePreview2").attr("src"),
            "fieldImage2.jpg"
          );
        }

        await updateFieldData(fieldDTO.code, fieldDTO);
        if (selectedStaffIds.size > 0) {
          await updateFieldStaffData(
            fieldDTO.code,
            Array.from(selectedStaffIds)
          );
        }
        if (selectedEquipmentIds.size > 0) {
          await updateFieldEquipmentData(
            fieldDTO.code,
            Array.from(selectedEquipmentIds)
          );
        }
      }
      window.location.reload();
    } catch (error) {
      console.error("Error during field addition/update:", error);
    }
    hideAddFieldPopup();
  });

  // Convert base64 to File
  function base64ToFile(base64, filename) {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  // Extract coordinates from Google Maps URL
  function extractCoordinates(url) {
    const regex1 = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const regex2 = /q=(-?\d+\.\d+),(-?\d+\.\d+)/;
    let match = url.match(regex1);
    if (!match) {
      match = url.match(regex2);
    }
    if (match) {
      return `${match[1]},${match[2]}`;
    }
    return null;
  }

  // Form validation
  function validateForm(fieldDTO) {
    if (!fieldDTO.name) {
      showError("Please enter field name");
      return false;
    }
    if (!fieldDTO.extentSize) {
      showError("Please enter extent size");
      return false;
    }
    if (!fieldDTO.location) {
      showError("Please enter location");
      return false;
    }
    if (!fieldDTO.fieldImage1 && $actionType.val() === "add") {
      showError("Please select at least one image");
      return false;
    }
    return true;
  }

  function showError(message) {
    alert(message);
  }

  function initializePopup() {
    loadStaffData();
    loadEquipmentData();
  }
  initializePopup();
});

const addFieldData = async (fieldDTO) => {
  return FieldService.saveField(fieldDTO)
    .then((response, textStatus, jqXHR) => {
      if (jqXHR.status !== 201) {
        alert("Failed to add field");
      }
    })
    .catch((xhr, status, error) => {
      console.error("Error during field addition:", error);
      alert("Failed to add field");
      throw new Error("Failed to add field");
    });
};

const updateFieldData = async (id, fieldDTO) => {
  return FieldService.updateField(id, fieldDTO)
    .then((response, textStatus, jqXHR) => {
      if (jqXHR.status !== 204) {
        alert("Failed to update field");
      }
    })
    .catch((xhr, status, error) => {
      console.error("Error during field update:", error);
      alert("Failed to update field");
      throw new Error("Failed to update field");
    });
};

const updateFieldStaffData = async (id, staffIds) => {
  return FieldService.updateFieldStaff(id, staffIds)
    .then((response, textStatus, jqXHR) => {
      if (jqXHR.status !== 204) {
        alert("Failed to update field staff");
      }
    })
    .catch((xhr, status, error) => {
      console.error("Error during field staff update:", error);
      alert("Failed to update field staff");
      throw new Error("Failed to update field staff");
    });
};

const updateFieldEquipmentData = async (fieldCode, equipmentIds) => {
  return EquipmentService.updateFieldEquipments(fieldCode, equipmentIds)
    .then((response, textStatus, jqXHR) => {
      if (jqXHR.status !== 204) {
        alert("Failed to update field equipment");
      }
    })
    .catch((xhr, status, error) => {
      console.error("Error during field equipment update:", error);
      alert("Failed to update field equipment");
      throw new Error("Failed to update field equipment");
    });
};

const getAllStaffMembers = async () => {
  try {
    return await StaffService.getAllStaff();
  } catch (error) {
    console.error("Error during staff retrieval:", error);
    throw new Error("Failed to retrieve staff");
  }
};

const getAllEquipmentData = async () => {
  try {
    return await EquipmentService.getAvailableEquipments();
  } catch (error) {
    console.error("Error during equipments retrieval:", error);
  }
};
