$(document).ready(function () {
  // Load vehicle data
  function loadVehicleData(filters = {}) {
    // Simulated API call - replace with actual backend call
    const vehicleData = [
      {
        licensePlate: "ABC1234",
        category: "Truck",
        status: "AVAILABLE",
        fuelType: "Diesel",
      },
      {
        licensePlate: "ABC1234AAAAAAAAAAAAAAAAAAAAAAAAAAA",
        category: "TruckAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        status: "IN_USE",
        fuelType: "DieselAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      },
      {
        licensePlate: "ABC1234",
        category: "Truck",
        status: "OUT_OF_SERVICE",
        fuelType: "Diesel",
      },
      {
        licensePlate: "ABC1234",
        category: "Truck",
        status: "AVAILABLE",
        fuelType: "Diesel",
      },
      {
        licensePlate: "ABC1234",
        category: "Truck",
        status: "IN_USE",
        fuelType: "Diesel",
      },
      {
        licensePlate: "ABC1234",
        category: "Truck",
        status: "OUT_OF_SERVICE",
        fuelType: "Diesel",
      },
      {
        licensePlate: "ABC1234",
        category: "Truck",
        status: "AVAILABLE",
        fuelType: "Diesel",
      },
      {
        licensePlate: "ABC1234",
        category: "Truck",
        status: "IN_USE",
        fuelType: "Diesel",
      },
      {
        licensePlate: "ABC1234",
        category: "Truck",
        status: "OUT_OF_SERVICE",
        fuelType: "Diesel",
      },
      {
        licensePlate: "ABC1234",
        category: "Truck",
        status: "AVAILABLE",
        fuelType: "Diesel",
      },
      {
        licensePlate: "ABC1234",
        category: "Truck",
        status: "IN_USE",
        fuelType: "Diesel",
      },
      {
        licensePlate: "ABC1234",
        category: "Truck",
        status: "OUT_OF_SERVICE",
        fuelType: "Diesel",
      },
      {
        licensePlate: "ABC1234",
        category: "Truck",
        status: "AVAILABLE",
        fuelType: "Diesel",
      },
      {
        licensePlate: "ABC1234",
        category: "Truck",
        status: "IN_USE",
        fuelType: "Diesel",
      },
      {
        licensePlate: "ABC1234",
        category: "Truck",
        status: "OUT_OF_SERVICE",
        fuelType: "Diesel",
      },
      {
        licensePlate: "ABC1234",
        category: "Truck",
        status: "AVAILABLE",
        fuelType: "Diesel",
      },
      {
        licensePlate: "ABC1234",
        category: "Truck",
        status: "IN_USE",
        fuelType: "Diesel",
      },
      {
        licensePlate: "ABC1234",
        category: "Truck",
        status: "OUT_OF_SERVICE",
        fuelType: "Diesel",
      },
      {
        licensePlate: "ABC1234",
        category: "Truck",
        status: "AVAILABLE",
        fuelType: "Diesel",
      },
      {
        licensePlate: "ABC1234",
        category: "Truck",
        status: "IN_USE",
        fuelType: "Diesel",
      },
      {
        licensePlate: "ABC1234",
        category: "Truck",
        status: "OUT_OF_SERVICE",
        fuelType: "Diesel",
      },
    ];

    renderVehicleTable(vehicleData);
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
                <div class="table-row">
                    <div>${truncateText(vehicle.licensePlate, 12)}</div>
                    <div>${truncateText(vehicle.category, 18)}</div>
                    <div>
                        <span class="status-badge ${statusClass}">${statusText}</span>
                    </div>
                    <div>${truncateText(vehicle.fuelType, 20)}</div>
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
      category: $("#categoryFilter").val(),
      status: $("#statusFilter").val(),
    };
    loadVehicleData(filters);
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
  loadVehicleData();
});
