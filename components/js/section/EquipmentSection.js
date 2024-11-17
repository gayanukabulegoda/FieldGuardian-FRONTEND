$(document).ready(function () {
  // Load equipment data
  function loadEquipmentData(filters = {}) {
    // Simulated API call - replace with actual backend call
    const equipmentData = [
      {
        name: "Tractor",
        type: "Agricultural",
        status: "UNDER_MAINTENANCE",
        field: "Evergreen Plains",
      },
      {
        name: "Tractor",
        type: "Agricultural",
        status: "AVAILABLE",
        field: "---",
      },
      {
        name: "Tractor",
        type: "Agricultural",
        status: "IN_USE",
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
                <div class="table-row">
                    <div>${truncateText(equipment.name, 30)}</div>
                    <div>${truncateText(equipment.type, 23)}</div>
                    <div>
                        <span class="status-badge ${statusClass}">${statusText}</span>
                    </div>
                    <div>${truncateText(equipment.field, 30)}</div>
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
      status: $("#statusFilter").val(),
    };
    loadEquipmentData(filters);
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
  loadEquipmentData();
});
