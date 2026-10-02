/**
 * Main Application Orchestrator & UI Interaction Engine
 * Handles historical earthquake card deck, fault viewer, city risk profiles,
 * safety preparedness tabs, and smooth fly-to-map actions.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize GIS Leaflet Map
  window.gisApp = new HimalayanGISMap();
  window.gisApp.init();

  // 2. Initialize Charts
  if (window.HimalayanCharts) {
    window.HimalayanCharts.init();
  }

  // 3. Render Historical Earthquakes Deck
  renderHistoricalCards("all");
  setupHistoricalFilters();

  // 4. Setup City Vulnerability Explorer
  setupCityVulnerabilityExplorer();

  // 5. Setup Faults "View on Map" Handlers
  setupFaultMapLinks();

  // 6. Setup Safety Tabs
  setupSafetyTabs();

  // 7. Mobile Navigation Toggle
  setupMobileNav();
});

// Render Historical Earthquake Cards
function renderHistoricalCards(filter = "all") {
  const container = document.getElementById("history-cards-container");
  if (!container) return;

  const keyQuakes = HIMALAYAN_DATA.earthquakes.filter(e => e.isSignificant);

  let filtered = keyQuakes;
  if (filter === "m8") {
    filtered = keyQuakes.filter(e => e.magnitude >= 8.0);
  } else if (filter === "recent") {
    filtered = keyQuakes.filter(e => (e.year || 2000) >= 2000);
  } else if (filter === "nepal") {
    filtered = keyQuakes.filter(e => (e.country || "").toLowerCase().includes("nepal"));
  } else if (filter === "india") {
    filtered = keyQuakes.filter(e => (e.country || "").toLowerCase().includes("india"));
  }

  container.innerHTML = filtered.map(eq => {
    return `
      <div class="history-card" data-id="${eq.id}">
        <div class="history-card-top">
          <span class="history-year-tag">${eq.year || eq.date.split('-')[0]}</span>
          <span class="history-mag-pill">M ${eq.magnitude.toFixed(1)}</span>
        </div>
        <h3>${eq.name}</h3>
        <div class="history-region-spec">
          <span>📍 ${eq.epicenter || eq.region}</span>
        </div>
        <p>${eq.description}</p>
        <div class="history-metrics-row">
          <div>
            <span>Focal Depth</span>
            <div class="val">${eq.depth} km</div>
          </div>
          <div>
            <span>Max Intensity</span>
            <div class="val">${eq.mmi || 'VIII+'}</div>
          </div>
          <div>
            <span>Countries</span>
            <div class="val">${eq.country}</div>
          </div>
          <div>
            <span>Casualties</span>
            <div class="val" style="color:var(--color-zone-v);">${eq.deaths ? eq.deaths.toLocaleString() : 'Documented'}</div>
          </div>
        </div>
        <button class="btn-secondary" style="width:100%; justify-content:center;" onclick="flyToHistoricalEpicenter(${eq.lat}, ${eq.lng}, '${eq.name.replace(/'/g, "\\'")}', ${eq.magnitude})">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
          </svg>
          Locate Epicenter on Map
        </button>
      </div>
    `;
  }).join("");
}

function setupHistoricalFilters() {
  const btns = document.querySelectorAll(".history-pill-btn");
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      renderHistoricalCards(filter);
    });
  });
}

// Fly to Historical Epicenter
window.flyToHistoricalEpicenter = function(lat, lng, name, mag) {
  const mapSection = document.getElementById("interactive-map");
  if (mapSection) {
    mapSection.scrollIntoView({ behavior: "smooth" });
  }

  if (window.gisApp) {
    setTimeout(() => {
      window.gisApp.flyToLocation(lat, lng, 9);
    }, 400);
  }
};

// Setup Fault Map Links
function setupFaultMapLinks() {
  const buttons = document.querySelectorAll(".btn-view-fault");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const lat = parseFloat(btn.dataset.lat);
      const lng = parseFloat(btn.dataset.lng);
      const mapSection = document.getElementById("interactive-map");
      if (mapSection) {
        mapSection.scrollIntoView({ behavior: "smooth" });
      }
      if (window.gisApp) {
        setTimeout(() => {
          window.gisApp.flyToLocation(lat, lng, 8);
        }, 400);
      }
    });
  });
}

// City Seismic Vulnerability Explorer
function setupCityVulnerabilityExplorer() {
  const buttons = document.querySelectorAll(".city-selector-btn");
  const nameEl = document.getElementById("city-prof-name");
  const popEl = document.getElementById("city-prof-pop");
  const zoneEl = document.getElementById("city-prof-zone");
  const pgaEl = document.getElementById("city-prof-pga");
  const soilEl = document.getElementById("city-prof-soil");
  const riskEl = document.getElementById("city-prof-risk");
  const riskDescEl = document.getElementById("city-prof-desc");
  const evacListEl = document.getElementById("city-prof-evac");
  const flyCityBtn = document.getElementById("btn-fly-city");

  function updateCityProfile(city) {
    if (nameEl) nameEl.textContent = `${city.flag} ${city.name} (${city.country})`;
    if (popEl) popEl.textContent = city.population;
    if (zoneEl) {
      zoneEl.textContent = city.zone;
      zoneEl.style.color = city.zone === "Zone V" ? "var(--color-zone-v)" : "var(--color-zone-iv)";
    }
    if (pgaEl) pgaEl.textContent = city.pgaExpected;
    if (soilEl) soilEl.textContent = city.soilType;
    if (riskEl) {
      riskEl.textContent = city.riskScore;
      riskEl.style.color = city.riskScore.includes("Critical") || city.riskScore.includes("Extreme") ? "var(--color-zone-v)" : "var(--color-amber)";
    }
    if (riskDescEl) riskDescEl.textContent = city.keyRisk;

    if (evacListEl && city.evacuationPoints) {
      evacListEl.innerHTML = city.evacuationPoints.map(pt => `<li>🛡️ ${pt}</li>`).join("");
    }

    if (flyCityBtn) {
      flyCityBtn.onclick = () => {
        const mapSection = document.getElementById("interactive-map");
        if (mapSection) mapSection.scrollIntoView({ behavior: "smooth" });
        if (window.gisApp) {
          setTimeout(() => {
            window.gisApp.flyToLocation(city.lat, city.lng, 10);
          }, 400);
        }
      };
    }
  }

  // Load first city (Kathmandu)
  if (HIMALAYAN_DATA.cities.length > 0) {
    updateCityProfile(HIMALAYAN_DATA.cities[0]);
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cityName = btn.dataset.city;
      const match = HIMALAYAN_DATA.cities.find(c => c.name.toLowerCase().includes(cityName.toLowerCase()));
      if (match) updateCityProfile(match);
    });
  });
}

// Safety Tabs Switching (Before / During / After)
function setupSafetyTabs() {
  const tabBtns = document.querySelectorAll(".safety-tab-btn");
  const stagePanels = document.querySelectorAll(".safety-stage-content");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      stagePanels.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const stage = btn.dataset.stage;
      const target = document.getElementById(`safety-stage-${stage}`);
      if (target) target.classList.add("active");
    });
  });
}

// Mobile Nav Toggle
function setupMobileNav() {
  const toggleBtn = document.querySelector(".mobile-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("mobile-open");
    });

    // Close when clicking a link
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-open");
      });
    });
  }
}
