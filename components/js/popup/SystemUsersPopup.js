$(document).ready(function () {
  // Load system users data
  function loadSystemUsers() {
    // Simulated API call - replace with actual backend call
    const userData = [
      {
        name: "Xavier De GunasekaraAAAAAAAAAAAAAAAA",
        role: "ADMINISTRATIVEAAAAAA",
        email: "xavierdegk999@gmail.comAAAAAAAAAAA",
      },
      {
        name: "Xavier De Gunasekara",
        role: "ADMINISTRATIVE",
        email: "xavierdegk999@gmail.com",
      },
      {
        name: "Xavier De Gunasekara",
        role: "ADMINISTRATIVE",
        email: "xavierdegk999@gmail.com",
      },
      {
        name: "Xavier De Gunasekara",
        role: "ADMINISTRATIVE",
        email: "xavierdegk999@gmail.com",
      },
      {
        name: "Xavier De Gunasekara",
        role: "ADMINISTRATIVE",
        email: "xavierdegk999@gmail.com",
      },
      {
        name: "Xavier De Gunasekara",
        role: "ADMINISTRATIVE",
        email: "xavierdegk999@gmail.com",
      },
      {
        name: "Xavier De Gunasekara",
        role: "ADMINISTRATIVE",
        email: "xavierdegk999@gmail.com",
      },
      {
        name: "Xavier De Gunasekara",
        role: "ADMINISTRATIVE",
        email: "xavierdegk999@gmail.com",
      },
    ];

    renderUsersTable(userData);
  }

  // Truncate text to a specific character limit
  function truncateText(text, limit) {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  }

  // Render users table
  function renderUsersTable(data) {
    const $tableBody = $("#usersTableBody");
    $tableBody.empty();

    data.forEach((user) => {
      const row = `
        <div class="table-row">
          <div>${truncateText(user.name, 28)}</div>
          <div>${truncateText(user.role, 14)}</div>
          <div>${truncateText(user.email, 28)}</div>
          <div>
            <button class="delete-btn" title="Delete">
              <img src="/assets/icons/delete-icon-silver.svg" alt="delete">
            </button>
          </div>
        </div>
      `;
      $tableBody.append(row);
    });
  }

  // Close button handler for system users popup
  $("#closeBtn").on("click", function () {
    hideDeleteConfirmationPopup();
    $(".system-users-popup").fadeOut();
  });

  // Delete button handler
  $(document).on("click", ".delete-btn", function () {
    showDeleteConfirmationPopup();
  });

  // Close button handler for delete confirmation popup
  $("#closeSystemUsersDeletePopupBtn").on("click", function () {
    hideDeleteConfirmationPopup();
  });

  // Confirm delete button handler
  $("#confirmSystemUsersDeleteBtn").on("click", function () {
    hideDeleteConfirmationPopup();
  });

  // Show delete confirmation popup
  function showDeleteConfirmationPopup() {
    $("#deleteConfirmationSystemUsersPopup").fadeIn(300);
  }

  // Hide delete confirmation popup
  function hideDeleteConfirmationPopup() {
    $("#deleteConfirmationSystemUsersPopup").fadeOut(300);
    enableStaffButtonsAndInputs(); 
  }

  // Initialize popup
  loadSystemUsers();
});
