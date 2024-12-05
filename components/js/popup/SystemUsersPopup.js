import UserService from "../../../services/UserService.js";

$(document).ready(function () {
  async function loadSystemUsers() {
    try {
      const userData = await getAllUserData();
      renderUsersTable(userData);
    } catch (error) {
      console.error("Error while loading system users: ", error);
    }
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
        <div class="table-row" data-mail="${user.email}">
          <div>${truncateText(user.name, 28)}</div>
          <div>${truncateText(user.role, 14)}</div>
          <div>${truncateText(user.email, 28)}</div>
          <div>
            <button class="delete-btn" title="Delete" data-email="${
              user.email
            }">
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
    const email = $(this).data("email");
    showDeleteConfirmationPopup(email);
  });

  // Close button handler for delete confirmation popup
  $("#closeSystemUsersDeletePopupBtn").on("click", function () {
    hideDeleteConfirmationPopup();
  });

  // Confirm delete button handler
  $("#confirmSystemUsersDeleteBtn").on("click", async function () {
    try {
      const email = $(this).data("email");
      await UserService.deleteUser(email);
      $(`.table-row[data-mail="${email}"]`).remove();
    } catch (error) {
      console.error("Error while deleting user: ", error);
    }
    hideDeleteConfirmationPopup();
  });

  function showDeleteConfirmationPopup(email) {
    $("#confirmSystemUsersDeleteBtn").data("email", email);
    $("#deleteConfirmationSystemUsersPopup").fadeIn(300);
  }

  function hideDeleteConfirmationPopup() {
    $("#deleteConfirmationSystemUsersPopup").fadeOut(300);
    enableStaffButtonsAndInputs();
  }

  // Initialize popup
  loadSystemUsers();
});

const getAllUserData = async () => {
  try {
    const response = await UserService.getAllUsers();
    return response;
  } catch (error) {
    console.error("Error while fetching user data: ", error);
  }
};
