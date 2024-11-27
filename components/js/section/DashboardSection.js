$(document).ready(function () {
  // Format numbers with comma separators, handle large numbers, and pad with leading zeros
  function formatNumber(num) {
    if (num > 999999) {
      return "999999+";
    }
    // Pad the number with leading zeros to ensure it has six characters
    const paddedNum = num.toString().padStart(6, "0");
    return paddedNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Load dashboard statistics
  function loadDashboardStats() {
    // Replace with actual API calls
    const stats = {
      systemUsers: "100",
      staffMembers: "100",
      crops: "000",
      vehicles: "10",
      equipment: "5",
    };

    Object.keys(stats).forEach((key) => {
      $(`#${key}Count`).text(formatNumber(stats[key]));
    });
  }

  // Initialize pie chart
  function initializePieChart() {
    const ctx = document
      .getElementById("monitoredFieldsChart")
      .getContext("2d");
    const colors = ["#2E7D32", "#4CAF50", "#1C5B1F", "#548957", "#587C5A"];

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [
          "Green Valley",
          "Harvest Ridge",
          "Evergreen Plains",
          "Verdant Valley",
          "Highland Meadow",
        ],
        datasets: [
          {
            data: [20, 20, 20, 20, 20],
            backgroundColor: colors,
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutout: "70%",
        plugins: {
          legend: {
            display: false,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  // Truncate text to a specific character limit
  function truncateText(text, limit) {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  }

  // Load cultivation areas
  function loadCultivationAreas() {
    // Replace with actual API call
    const areas = [
      {
        name: "Green ValleyQQQQQQQQQQQQQQQQQQQQQQQ",
        extent: "2,500",
        fieldImage1: "/assets/images/temp-image.jpg",
      },
      {
        name: "Harvest Ridge",
        extent: "2,500",
        fieldImage1: "/assets/images/temp-image.jpg",
      },
      {
        name: "Evergreen Plains",
        extent: "2,500",
        fieldImage1: "/assets/images/temp-image.jpg",
      },
      {
        name: "Verdant Valley",
        extent: "2,500",
        fieldImage1: "/assets/images/temp-image.jpg",
      },
      {
        name: "Verdant Valley",
        extent: "2,500",
        fieldImage1: "/assets/images/temp-image.jpg",
      },
      {
        name: "Verdant Valley",
        extent: "2,500",
        fieldImage1: "/assets/images/temp-image.jpg",
      },
      {
        name: "Verdant Valley",
        extent: "2,500",
        fieldImage1: "/assets/images/temp-image.jpg",
      },
    ];

    const $areasList = $("#areasList");
    $areasList.empty();

    areas.forEach((area) => {
      const areaItem = `
        <div class="area-item">
          <img src="${area.fieldImage1}" alt="${area.name}" class="area-image">
          <div class="area-info">
            <div class="area-name">${truncateText(area.name, 17)}</div>
            <div class="area-extent">Extent: ${area.extent} sq. m</div>
          </div>
        </div>
      `;
      $areasList.append(areaItem);
    });
  }

  // Initialize dashboard
  function initializeDashboard() {
    loadDashboardStats();
    initializePieChart();
    loadCultivationAreas();
  }

  initializeDashboard();
});
