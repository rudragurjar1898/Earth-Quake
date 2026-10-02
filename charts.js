/**
 * Himalayan Region Earthquake Analytics & Dashboard Charts (Chart.js)
 * Synchronized with map spatial filters and magnitude ranges
 */

class HimalayanChartsManager {
  constructor() {
    this.charts = {
      magnitude: null,
      country: null,
      timeline: null,
      depth: null
    };

    // Default chart visual styling
    this.theme = {
      fontFamily: "'Outfit', sans-serif",
      monoFont: "'JetBrains Mono', monospace",
      gridColor: "rgba(255, 255, 255, 0.06)",
      textColor: "#94a3b8",
      primaryColor: "#38bdf8",
      dangerColor: "#ff2a51",
      amberColor: "#ff7a00",
      yellowColor: "#eab308",
      purpleColor: "#c084fc",
      emeraldColor: "#10b981"
    };
  }

  init() {
    if (typeof Chart === "undefined") {
      console.warn("Chart.js not loaded yet");
      return;
    }

    // Configure global Chart.js defaults
    Chart.defaults.color = this.theme.textColor;
    Chart.defaults.font.family = this.theme.fontFamily;
    Chart.defaults.plugins.tooltip.backgroundColor = "rgba(12, 20, 36, 0.95)";
    Chart.defaults.plugins.tooltip.borderColor = "rgba(56, 189, 248, 0.3)";
    Chart.defaults.plugins.tooltip.borderWidth = 1;
    Chart.defaults.plugins.tooltip.padding = 10;
    Chart.defaults.plugins.tooltip.cornerRadius = 8;

    this.renderMagnitudeChart();
    this.renderCountryChart();
    this.renderTimelineChart();
    this.renderDepthChart();
  }

  // 1. Earthquakes by Magnitude (Bar Chart)
  renderMagnitudeChart(dataList = HIMALAYAN_DATA.earthquakes) {
    const ctx = document.getElementById("chart-magnitude");
    if (!ctx) return;

    let m4_5 = 0, m5_6 = 0, m6_7 = 0, m7_plus = 0;

    dataList.forEach(eq => {
      const m = eq.magnitude;
      if (m < 5.0) m4_5++;
      else if (m < 6.0) m5_6++;
      else if (m < 7.0) m6_7++;
      else m7_plus++;
    });

    if (this.charts.magnitude) {
      this.charts.magnitude.data.datasets[0].data = [m4_5, m5_6, m6_7, m7_plus];
      this.charts.magnitude.update();
      return;
    }

    this.charts.magnitude = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["M 4.0 – 4.9", "M 5.0 – 5.9", "M 6.0 – 6.9", "M 7.0+ Mega"],
        datasets: [{
          label: "Earthquake Count",
          data: [m4_5, m5_6, m6_7, m7_plus],
          backgroundColor: [
            "rgba(56, 189, 248, 0.65)",
            "rgba(234, 179, 8, 0.7)",
            "rgba(255, 122, 0, 0.75)",
            "rgba(255, 42, 81, 0.85)"
          ],
          borderColor: [
            this.theme.primaryColor,
            this.theme.yellowColor,
            this.theme.amberColor,
            this.theme.dangerColor
          ],
          borderWidth: 1.5,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { weight: "600" } }
          },
          y: {
            grid: { color: this.theme.gridColor },
            ticks: { precision: 0 }
          }
        }
      }
    });
  }

  // 2. Earthquakes by Country / Region (Doughnut Chart)
  renderCountryChart(dataList = HIMALAYAN_DATA.earthquakes) {
    const ctx = document.getElementById("chart-country");
    if (!ctx) return;

    const counts = {
      "India": 0,
      "Nepal": 0,
      "Bhutan": 0,
      "Pakistan": 0,
      "China (Tibet)": 0
    };

    dataList.forEach(eq => {
      const c = (eq.country || "").toLowerCase();
      if (c.includes("nepal")) counts["Nepal"]++;
      else if (c.includes("india")) counts["India"]++;
      else if (c.includes("bhutan")) counts["Bhutan"]++;
      else if (c.includes("pakistan")) counts["Pakistan"]++;
      else if (c.includes("china") || c.includes("tibet")) counts["China (Tibet)"]++;
      else counts["India"]++;
    });

    const labels = Object.keys(counts);
    const values = Object.values(counts);

    if (this.charts.country) {
      this.charts.country.data.datasets[0].data = values;
      this.charts.country.update();
      return;
    }

    this.charts.country = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: [
            "#38bdf8", // India
            "#ff2a51", // Nepal
            "#10b981", // Bhutan
            "#ff7a00", // Pakistan
            "#c084fc"  // China/Tibet
          ],
          borderColor: "#0c1424",
          borderWidth: 2,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 12,
              padding: 12,
              font: { size: 11 }
            }
          }
        },
        cutout: "68%"
      }
    });
  }

  // 3. Earthquakes by Timeline & Energy Release (Line Chart)
  renderTimelineChart(dataList = HIMALAYAN_DATA.earthquakes) {
    const ctx = document.getElementById("chart-timeline");
    if (!ctx) return;

    // Group quakes into periods
    const periods = {
      "1890-1920": 0,
      "1921-1950": 0,
      "1951-1980": 0,
      "1981-2000": 0,
      "2001-2015": 0,
      "2016-Present": 0
    };

    dataList.forEach(eq => {
      const y = eq.year || (eq.date ? parseInt(eq.date.substring(0, 4)) : 2000);
      if (y <= 1920) periods["1890-1920"]++;
      else if (y <= 1950) periods["1921-1950"]++;
      else if (y <= 1980) periods["1951-1980"]++;
      else if (y <= 2000) periods["1981-2000"]++;
      else if (y <= 2015) periods["2001-2015"]++;
      else periods["2016-Present"]++;
    });

    const labels = Object.keys(periods);
    const counts = Object.values(periods);

    if (this.charts.timeline) {
      this.charts.timeline.data.datasets[0].data = counts;
      this.charts.timeline.update();
      return;
    }

    this.charts.timeline = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "Recorded Events",
          data: counts,
          borderColor: "#38bdf8",
          backgroundColor: "rgba(56, 189, 248, 0.15)",
          fill: true,
          tension: 0.35,
          pointBackgroundColor: "#ff2a51",
          pointBorderColor: "#fff",
          pointRadius: 4,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { display: false }
          },
          y: {
            grid: { color: this.theme.gridColor },
            ticks: { precision: 0 }
          }
        }
      }
    });
  }

  // 4. Depth Distribution (Pie Chart: Shallow, Intermediate, Deep)
  renderDepthChart(dataList = HIMALAYAN_DATA.earthquakes) {
    const ctx = document.getElementById("chart-depth");
    if (!ctx) return;

    let shallow = 0;       // < 70 km (crustal & decollement)
    let intermediate = 0;  // 70 - 300 km (subducting slab)
    let deep = 0;          // > 300 km (deep mantle lithosphere)

    dataList.forEach(eq => {
      const d = eq.depth || 15;
      if (d < 70) shallow++;
      else if (d <= 300) intermediate++;
      else deep++;
    });

    if (this.charts.depth) {
      this.charts.depth.data.datasets[0].data = [shallow, intermediate, deep];
      this.charts.depth.update();
      return;
    }

    this.charts.depth = new Chart(ctx, {
      type: "pie",
      data: {
        labels: [
          `Shallow (<70km) - Crustal`,
          `Intermediate (70-300km) - Slab`,
          `Deep (>300km) - Mantle`
        ],
        datasets: [{
          data: [shallow, intermediate, deep],
          backgroundColor: [
            "#ff2a51", // Shallow (Most destructive)
            "#ff7a00", // Intermediate
            "#38bdf8"  // Deep
          ],
          borderColor: "#0c1424",
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 12,
              padding: 10,
              font: { size: 11 }
            }
          }
        }
      }
    });
  }

  // Dynamic response when user alters map filters
  updateData(filteredList) {
    this.renderMagnitudeChart(filteredList);
    this.renderCountryChart(filteredList);
    this.renderTimelineChart(filteredList);
    this.renderDepthChart(filteredList);
  }
}

// Attach globally
window.HimalayanCharts = new HimalayanChartsManager();
