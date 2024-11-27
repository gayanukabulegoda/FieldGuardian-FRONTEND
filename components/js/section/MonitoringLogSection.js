$(document).ready(function () {
  // Load monitoring log data
  function loadMonitoringData(filters = {}) {
    // Simulated API call - replace with actual backend call
    const monitoringData = [
      {
        code: "111-111",
        observedImage: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
        observation:
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa",
      },
      {
        code: "222-222",
        observedImage: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
        observation:
          "ObservationAB ASIEJFWPoisrejgovmoimpooimp po3imjvpwigcpwoi4 p textMMMMMMMMMMMMMMMMMMMMMMMMM MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMManjw ebdiojceoirjOMOokmdcijsnejljkaaaaaaaaaaaQQQQQQQ QQQQQQQQQQQQQQQQQxxxxxhnjaeffffffff ffffffffffffffffffffffffffffffff",
      },
      {
        code: "333-333",
        observedImage: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        code: "444-444",
        observedImage: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        code: "555-555",
        observedImage: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        code: "666-666",
        observedImage: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        code: "777-777",
        observedImage: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        code: "888-888",
        observedImage: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        code: "999-999",
        observedImage: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        code: "101-101",
        observedImage: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        code: "112-112",
        observedImage: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
    ];

    renderMonitoringTable(monitoringData);
  }

  // Truncate text to a specific character limit
  function truncateText(text, limit) {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  }

  // Format date to display format
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  // Render monitoring table
  function renderMonitoringTable(data) {
    const $tableBody = $("#monitoringTableBody");
    $tableBody.empty();

    data.forEach((log) => {
      const row = `
        <div class="table-row" data-log='${JSON.stringify(log)}'>
          <div>
            <img src="${log.observedImage}" alt="${
        log.field
      }" class="field-image">
          </div>
          <div>${formatDate(log.date)}</div>
          <div>${truncateText(log.field, 30)}</div>
          <div>${log.staffCount}</div>
          <div class="action-buttons">
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
      field: $("#searchField").val(),
      date: $("#dateFilter").val(),
    };
    loadMonitoringData(filters);
  });

  // Action button handlers
  $(document).on("click", ".action-btn.edit", function () {
    const logData = $(this).closest(".table-row").data("log");
    showUpdateMonitoringLogPopup(logData);
  });

  $(document).on("click", ".action-btn.view", function () {
    const logData = $(this).closest(".table-row").data("log");
    showViewMonitoringLogPopup(logData);
  });

  // View monitoring log popup -------------------------------------------------

  const populateMonitoringLogDetails = (monitoringData) => {
    $("#viewField")
      .text(truncateText(monitoringData.field, 30))
      .attr("data-full-text", monitoringData.field);
    if (monitoringData.observation) {
      $("#viewObservation")
        .text(monitoringData.observation)
        .attr("data-full-text", monitoringData.observation);
    } else {
      $("#viewObservation").text("No observation recorded...");
    }

    // Handle monitoring image
    if (monitoringData.observedImage) {
      // $("#viewMonitoringImage").attr(
      //   "src",
      //   `data:image/jpeg;base64,${monitoringData.observedImage}`
      // );
      $("#viewMonitoringImage").attr("src", `${monitoringData.observedImage}`);
      $("#previewViewContainer").show();
    } else {
      setDefaultImage("#viewMonitoringImage", "#previewViewContainer");
    }

    // Temporary data -------------------------------------------------
    const crops = [
      {
        name: "Rice",
        scientificName: "Oryza sativa",
      },
      {
        name: "Wheat",
        scientificName: "Triticum aestivum",
      },
      {
        name: "Maize",
        scientificName: "Zea mays",
      },
    ];

    const staffMembers = [
      {
        name: "John Doe",
        mobile: "9876543210",
      },
      {
        name: "Jane Doe",
        mobile: "9876543210",
      },
      {
        name: "John Smith",
        mobile: "9876543210",
      },
    ];
    // ---------------------------------------------------------------

    // Populate staff members
    const $staffViewContainer = $("#staffViewContainer");
    $staffViewContainer.empty();
    // monitoringData.staffMembers.forEach((staff) => {
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

    // Populate crops
    const $cropViewContainer = $("#cropViewContainer");
    $cropViewContainer.empty();
    // monitoringData.crops.forEach((crop) => {
    crops.forEach((crop) => {
      const row = `
        <div class="selection-row">
          <div class="selection-info">
            <span class="selection-name">${crop.name}</span>
            <span class="selection-detail">${crop.scientificName}</span>
          </div>
        </div>
      `;
      $cropViewContainer.append(row);
    });
  };

  const showViewMonitoringLogPopup = (monitoringData) => {
    populateMonitoringLogDetails(monitoringData);
    console.log(monitoringData);

    $("#viewMonitoringPopup").fadeIn(300);
    disableMonitoringLogButtonsAndInputs();
  };

  const hideViewMonitoringPopup = () => {
    $("#viewMonitoringPopup").fadeOut();
    enableMonitoringLogButtonsAndInputs();
  };

  // Close button handlers
  $("#closeViewBtn, #closeButton").on("click", function () {
    hideViewMonitoringPopup();
  });

  // Add monitoring log popup -------------------------------------------------

  const $addMonitoringPopup = $("#addMonitoringPopup");
  const $addMonitoringForm = $("#addMonitoringForm");
  const $popupTitle = $("#popupTitle");
  const $saveBtn = $("#saveBtn");
  const $actionType = $("#actionType");

  const showAddMonitoringLogPopup = () => {
    $addMonitoringForm[0].reset();
    $popupTitle.text("Add Monitoring Log");
    $saveBtn.text("SAVE");
    $actionType.val("add");
    $addMonitoringPopup.fadeIn(300);
    disableMonitoringLogButtonsAndInputs();
  };

  const showUpdateMonitoringLogPopup = (logData) => {
    $popupTitle.text("Update Monitoring Log");
    $saveBtn.text("UPDATE");
    $actionType.val("update");
    fillFormWithMonitoringLogData(logData);
    $addMonitoringPopup.fadeIn(300);
    disableMonitoringLogButtonsAndInputs();
  };

  const fillFormWithMonitoringLogData = (logData) => {
    $("#field").val(logData.field);
    $("#observation").val(logData.observation);
    if (logData.observedImage) {
      $("#imagePreview").attr("src", logData.observedImage);
      $("#previewContainer").show();
    } else {
      setDefaultImage("#imagePreview", "#previewContainer");
    }
  };

  const setDefaultImage = (imageId, previewContainerId) => {
    $(imageId).attr("src", "/assets/images/default_no_pic_image.png");
    $(previewContainerId).show();
  };

  $("#addBtn").on("click", function () {
    showAddMonitoringLogPopup();
  });

  // Function to disable buttons and inputs
  const disableMonitoringLogButtonsAndInputs = () => {
    $(".action-btn, #addBtn, #searchBtn, #searchField, #dateFilter").css(
      "pointer-events",
      "none"
    );
  };

  // Function to enable buttons and inputs
  const enableMonitoringLogButtonsAndInputs = () => {
    $(".action-btn, #addBtn, #searchBtn, #searchField, #dateFilter").css(
      "pointer-events",
      "auto"
    );
  };

  window.enableMonitoringLogButtonsAndInputs =
    enableMonitoringLogButtonsAndInputs;

  // Initialize page
  loadMonitoringData();
});
