import CropService from "../../../services/CropService.js";
import FieldService from "../../../services/FieldService.js";

$(document).ready(function () {
  const $addCropForm = $("#addCropForm");
  const $actionType = $("#actionType");
  const $uploadArea = $("#uploadArea");
  const $fileInput = $("#cropImage");
  const $previewContainer = $("#previewContainer");
  const $imagePreview = $("#imagePreview");
  const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes

  function hideAddCropPopup() {
    $("#addCropPopup").fadeOut();
    $addCropForm[0].reset();
    resetImageUpload();
    enableCropButtonsAndInputs();
  }

  function resetImageUpload() {
    $fileInput.val("");
    $previewContainer.hide();
    $imagePreview.attr("src", "");
  }

  // Close button handler
  $("#addCropPopup #closeBtn").on("click", function () {
    hideAddCropPopup();
  });

  // Image upload handling
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
      resetImageUpload();
      return;
    }

    // Validate file size
    if (file.size > maxFileSize) {
      showError("File size must be less than 10MB");
      resetImageUpload();
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

  // Form submission handler
  $addCropForm.on("submit", async function (event) {
    event.preventDefault();

    const cropDTO = {
      code: $("#cropCode").val(),
      commonName: $("#commonName").val(),
      scientificName: $("#scientificName").val(),
      category: $("#category").val(),
      season: $("#season").val(),
      fieldCode: $("#field").val(),
    };

    const file = $fileInput[0].files[0];
    if (file) cropDTO.cropImage = file;

    // Add validation
    if (!validateForm(cropDTO)) {
      return;
    }
    const actionType = $actionType.val();

    try {
      if (actionType === "add") {
        await addCropData(cropDTO);
      } else if (actionType === "update") {
        // Convert base64 images to File objects if necessary
        if (
          !cropDTO.cropImage &&
          $("#imagePreview").attr("src").startsWith("data:image")
        ) {
          cropDTO.cropImage = base64ToFile(
            $("#imagePreview").attr("src"),
            "cropImage.jpg"
          );
        }
        await updateCropData(cropDTO.code, cropDTO);
      }
      window.location.reload();
    } catch (error) {
      console.error("Error adding/updating crop:", error);
    }
    hideAddCropPopup();
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

  // Form validation
  function validateForm(cropDTO) {
    if (!cropDTO.commonName) {
      showError("Please enter common name");
      return false;
    }
    if (!cropDTO.scientificName) {
      showError("Please enter scientific name");
      return false;
    }
    if (!cropDTO.category) {
      showError("Please select category");
      return false;
    }
    if (!cropDTO.season) {
      showError("Please select season");
      return false;
    }
    if (!cropDTO.fieldCode) {
      showError("Please select field");
      return false;
    }
    if (!cropDTO.cropImage && $actionType.val() === "add") {
      showError("Please select an image");
      return false;
    }
    return true;
  }

  function showError(message) {
    alert(message);
  }

  async function initializePopup() {
    // Load categories
    const categories = [
      "Vegetable",
      "Fruit",
      "Grain",
      "Legume",
      "Root and Tuber",
      "Spice",
      "Herb",
      "Other",
    ];
    categories.forEach((category) => {
      $("#category").append(`<option value="${category}">${category}</option>`);
    });

    // Load seasons
    const seasons = [
      "Maha Season",
      "Yala Season",
      "Crop Rotation",
      "Perennial",
    ];
    seasons.forEach((season) => {
      $("#season").append(`<option value="${season}">${season}</option>`);
    });

    // Load fields
    try {
      const fields = await getAllFieldData();
      fields.forEach((field) => {
        $("#field").append(
          `<option value="${field.code}">${field.name}</option>`
        );
      });
    } catch (error) {
      console.error("Error during field retrieval:", error);
    }
  }
  initializePopup();
});

const addCropData = async (cropDTO) => {
  return CropService.saveCrop(cropDTO)
    .then((response, textStatus, jqXHR) => {
      if (jqXHR.status !== 201) {
        alert("Failed to add crop");
      }
    })
    .catch((xhr, status, error) => {
      console.error("Error adding crop:", error);
      alert("Failed to add crop");
    });
};

const updateCropData = async (id, cropDTO) => {
  return CropService.updateCrop(id, cropDTO)
    .then((response, textStatus, jqXHR) => {
      if (jqXHR.status !== 204) {
        alert("Failed to update crop");
      }
    })
    .catch((xhr, status, error) => {
      console.error("Error updating crop:", error);
      alert("Failed to update crop");
    });
};

const getAllFieldData = async () => {
  try {
    return await FieldService.getAllFields();
  } catch (error) {
    console.error("Error during field retrieval:", error);
    throw new Error("Failed to retrieve field");
  }
};
