$(document).ready(function () {
  // Load field data
  function loadFieldData(filters = {}) {
    // Simulated API call - replace with actual backend call
    const fieldData = [
      {
        image: "/assets/images/temp-image.jpg",
        name: "Evergreen Plains",
        location: "40.7128,-74.0060",
        extentSize: 100.5,
      },
      {
        image: "/assets/images/temp-image.jpg",
        name: "Evergreen Plains",
        location: "40.7128,-74.0060",
        extentSize: 100.5,
      },
      {
        image: "/assets/images/temp-image.jpg",
        name: "Evergreen Plains",
        location: "40.7128,-74.0060",
        extentSize: 100.5,
      },
    ];

    renderFieldTable(fieldData);
  }

  // Truncate text to a specific character limit
  function truncateText(text, limit) {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  }

  // Render field table
  function renderFieldTable(data) {
    const $tableBody = $("#fieldTableBody");
    $tableBody.empty();

    data.forEach((field) => {
      const row = `
        <div class="table-row">
          <div>
            <img src="${field.image}" alt="${field.name}" class="field-image">
          </div>
          <div>${truncateText(field.name, 30)}</div>
          <div>${truncateText(field.location, 30)}</div>
          <div>${field.extentSize}</div>
          <div class="action-buttons">
            <button class="action-btn delete" title="Delete">
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
      landSize: $("#landSizeFilter").val(),
    };
    loadFieldData(filters);
  });

  // Action button handlers
  $(document).on("click", ".action-btn.delete", function () {
    console.log("Delete clicked");
  });

  $(document).on("click", ".action-btn.edit", function () {
    console.log("Edit clicked");
  });

  $(document).on("click", ".action-btn.view", function () {
    console.log("View clicked");
  });

  // Initialize page
  loadFieldData();
});
