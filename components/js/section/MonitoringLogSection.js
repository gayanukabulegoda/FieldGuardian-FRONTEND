$(document).ready(function () {
  // Load monitoring log data
  function loadMonitoringData(filters = {}) {
    // Simulated API call - replace with actual backend call
    const monitoringData = [
      {
        image: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field:
          "Evergreen Plains",
        staffCount: 10,
      },
      {
        image: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        image: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        image: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        image: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        image: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        image: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        image: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        image: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        image: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        image: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        image: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        image: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        image: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        image: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        image: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        image: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        image: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        image: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        image: "/assets/images/temp-image.jpg",
        date: "2024-11-11",
        field: "Evergreen Plains",
        staffCount: 10,
      },
      {
        image: "/assets/images/temp-image.jpg",
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
        <div class="table-row">
          <div>
            <img src="${log.image}" alt="${log.field}" class="field-image">
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
    console.log("Edit clicked");
  });

  $(document).on("click", ".action-btn.view", function () {
    console.log("View clicked");
  });

  // Initialize page
  loadMonitoringData();
});
