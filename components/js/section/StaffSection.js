$(document).ready(function () {
  // Fetch and populate designation filter
  function loadDesignations() {
    // Simulated API call - replace with actual backend call
    const designations = [
      "SENIOR ASSISTANT MANAGER",
      "MANAGER",
      "ASSISTANT MANAGER",
    ];

    const $select = $("#designationFilter");
    designations.forEach((designation) => {
      $select.append(new Option(designation, designation));
    });
  }

  // Load staff data
  function loadStaffData(filters = {}) {
    // Simulated API call - replace with actual backend call
    const staffData = [
      {
        name: "Xavier De Gunasekara",
        designation: "SENIOR ASSISTANT MANAGER",
        contact: "071 234 5678",
        email: "xavierdegk999@gmail.com",
      },
      // Add more staff members here
    ];

    renderStaffTable(staffData);
  }

  // Truncate text to a specific character limit
  function truncateText(text, limit) {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  }

  // Render staff table
  function renderStaffTable(data) {
    const $tableBody = $("#staffTableBody");
    $tableBody.empty();

    data.forEach((staff) => {
      const row = `
                <div class="table-row">
                    <div>${truncateText(staff.name, 28)}</div>
                    <div>${truncateText(staff.designation, 24)}</div>
                    <div>${truncateText(staff.contact, 12)}</div>
                    <div>${truncateText(staff.email, 28)}</div>
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
      designation: $("#designationFilter").val(),
      gender: $("#genderFilter").val(),
    };
    loadStaffData(filters);
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
  loadDesignations();
  loadStaffData();
});
