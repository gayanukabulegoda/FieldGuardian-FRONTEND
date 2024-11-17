$(document).ready(function () {
  // Fetch and populate field filter
  function loadFields() {
    // Simulated API call - replace with actual backend call
    const fields = ["Field A", "Field B", "Field C"];

    const $select = $("#fieldFilter");
    fields.forEach((field) => {
      $select.append(new Option(field, field));
    });
  }

  // Load crop data
  function loadCropData(filters = {}) {
    // Simulated API call - replace with actual backend call
    const cropData = [
      {
        commonName: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Cereal",
        season: "Winter",
      },
      {
        commonName: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Cereal",
        season: "Winter",
      },
      {
        commonName: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Cereal",
        season: "Winter",
      },
      {
        commonName: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Cereal",
        season: "Winter",
      },
      {
        commonName: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Cereal",
        season: "Winter",
      },
      {
        commonName: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Cereal",
        season: "Winter",
      },
      {
        commonName: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Cereal",
        season: "Winter",
      },
      {
        commonName: "WheatAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        scientificName: "Triticum aestivumAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        category: "CerealAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        season: "WinterAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      },
      {
        commonName: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Cereal",
        season: "Winter",
      },
      {
        commonName: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Cereal",
        season: "Winter",
      },
      {
        commonName: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Cereal",
        season: "Winter",
      },
      {
        commonName: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Cereal",
        season: "Winter",
      },
      {
        commonName: "Wheat",
        scientificName: "Triticum aestivum",
        category: "Cereal",
        season: "Winter",
      },
      // Add more crop entries here
    ];

    renderCropTable(cropData);
  }

  // Truncate text to a specific character limit
  function truncateText(text, limit) {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  }

  // Render crop table
  function renderCropTable(data) {
    const $tableBody = $("#cropTableBody");
    $tableBody.empty();

    data.forEach((crop) => {
      const row = `
                <div class="table-row">
                    <div>${truncateText(crop.commonName, 28)}</div>
                    <div>${truncateText(crop.scientificName, 28)}</div>
                    <div>${truncateText(crop.category, 18)}</div>
                    <div>${truncateText(crop.season, 16)}</div>
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
      field: $("#fieldFilter").val(),
    };
    loadCropData(filters);
  });

  // Action button handlers
  $(document).on("click", ".action-btn.delete", function () {
    // Implement delete functionality
    console.log("Delete clicked");
  });

  $(document).on("click", ".action-btn.edit", function () {
    // Implement edit functionality
    console.log("Edit clicked");
  });

  $(document).on("click", ".action-btn.view", function () {
    // Implement view functionality
    console.log("View clicked");
  });

  // Initialize page
  loadFields();
  loadCropData();
});
