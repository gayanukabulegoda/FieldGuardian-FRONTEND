import DashboardService from "../../../services/DashboardService.js";
import FieldService from "../../../services/FieldService.js";

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

  async function loadDashboardStats() {
    try {
      const systemUsers = await DashboardService.getTotalUsers();
      const staffMembers = await DashboardService.getTotalActiveStaff();
      const crops = await DashboardService.getTotalActiveCrops();
      const vehicles = await DashboardService.getTotalActiveVehicles();
      const equipment = await DashboardService.getTotalActiveEquipment();

      const stats = {
        systemUsers,
        staffMembers,
        crops,
        vehicles,
        equipment,
      };

      Object.keys(stats).forEach((key) => {
        $(`#${key}Count`).text(formatNumber(stats[key]));
      });
    } catch (error) {
      console.error("Error loading dashboard statistics:", error);
    }
  }

  // Function to update chart legend
  function updateChartLegend(fieldNames) {
    const legendContainer = $(".chart-legend");
    legendContainer.empty();

    const colors = ["#2E7D32", "#4CAF50", "#1C5B1F", "#548957", "#587C5A"];

    fieldNames.forEach((fieldName, index) => {
      const legendItem = `
      <div class="legend-item">
        <div class="legend-color" style="background-color: ${colors[index]}"></div>
        <span class="legend-text">${fieldName}</span>
      </div>
    `;
      legendContainer.append(legendItem);
    });
  }

  // Initialize pie chart
  async function initializePieChart() {
    try {
      const topFields = await DashboardService.getTopMonitoredFields();
      const fieldNames = topFields.map((field) => field.fieldName);
      const monitoringCounts = topFields.map((field) => field.monitoringCount);

      const ctx = document
        .getElementById("monitoredFieldsChart")
        .getContext("2d");
      const colors = ["#2E7D32", "#4CAF50", "#1C5B1F", "#548957", "#587C5A"];

      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: fieldNames,
          datasets: [
            {
              data: monitoringCounts,
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
      updateChartLegend(fieldNames);
    } catch (error) {
      console.error("Error initializing pie chart:", error);
    }
  }

  // Truncate text to a specific character limit
  function truncateText(text, limit) {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  }

  // Load cultivation areas
  const loadCultivationAreas = async () => {
    try {
      const areas = await getAllFieldData();
      if (areas.length === 0) {
        $("#areasList").html("<p>No areas found</p>");
        return;
      } else {
        const $areasList = $("#areasList");
        $areasList.empty();

        areas.forEach((area) => {
          const areaItem = `
        <div class="area-item">
          <img src="data:image/jpeg;base64,${area.fieldImage1}" alt="${
            area.name
          }" class="area-image">
          <div class="area-info">
            <div class="area-name">${truncateText(area.name, 17)}</div>
            <div class="area-extent">Extent: ${area.extentSize} sq. m</div>
          </div>
        </div>
      `;
          $areasList.append(areaItem);
        });
      }
    } catch (error) {
      console.error("Error during cultivation area retrieval:", error);
    }
  };

  // Initialize dashboard
  function initializeDashboard() {
    loadDashboardStats();
    initializePieChart();
    loadCultivationAreas();
  }

  initializeDashboard();
});

const getAllFieldData = async () => {
  try {
    return await FieldService.getAllFields();
  } catch (error) {
    console.error("Error during field retrieval:", error);
  }
};
