/**
 * Himalayan Region GIS Map Engine (Leaflet.js)
 * Manages spatial layers: Earthquakes, Fault Lines, Hazard Zones, Cities, and Tectonics
 */

class HimalayanGISMap {
  constructor() {
    this.map = null;
    this.layers = {
      earthquakes: null,
      faults: null,
      hazardZones: null,
      himalayanRange: null,
      cities: null,
      tectonicVectors: null
    };

    this.baseLayers = {};
    this.activeBaseLayer = null;

    this.filters = {
      minMagnitude: 4.0,
      depthCategory: "all", // "all", "shallow", "intermediate", "deep"
      searchQuery: ""
    };

    this.currentEarthquakesData = [...HIMALAYAN_DATA.earthquakes];
    this.isLiveFeedActive = false;
  }

  init() {
    const center = HIMALAYAN_DATA.meta.defaultCenter;
    const zoom = HIMALAYAN_DATA.meta.defaultZoom;

    // Initialize Leaflet map
    this.map = L.map("himalayan-map", {
      center: center,
      zoom: zoom,
      minZoom: 4,
      maxZoom: 13,
      zoomControl: false // Custom controls positioned via CSS
    });

    // Custom Zoom Control top-right
    L.control.zoom({ position: "topright" }).addTo(this.map);

    // Setup Basemaps
    this.initBaseLayers();

    // Setup GeoJSON Feature Layers
    this.initHazardZonesLayer();
    this.initHimalayanRangeLayer();
    this.initFaultsLayer();
    this.initTectonicVectorsLayer();
    this.initCitiesLayer();
    this.initEarthquakesLayer();

    // Bind UI Listeners
    this.bindControls();
    this.updateHUDStats();
  }

  initBaseLayers() {
    // 1. Dark Matter (CartoDB) - Default
    this.baseLayers.dark = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> | CartoDB Dark Matter',
        subdomains: "abcd",
        maxZoom: 19
      }
    ).addTo(this.map);

    // 2. Satellite (Esri World Imagery)
    this.baseLayers.satellite = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP",
        maxZoom: 18
      }
    );

    // 3. Topographic (OpenTopoMap)
    this.baseLayers.topo = L.tileLayer(
      "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',
        maxZoom: 17
      }
    );

    this.activeBaseLayer = this.baseLayers.dark;
  }

  setBasemap(type) {
    if (!this.baseLayers[type]) return;
    this.map.removeLayer(this.activeBaseLayer);
    this.activeBaseLayer = this.baseLayers[type];
    this.map.addLayer(this.activeBaseLayer);
  }

  // Hazard Zones Layer (Zones V to II)
  initHazardZonesLayer() {
    this.layers.hazardZones = L.geoJSON(HIMALAYAN_DATA.hazardZones, {
      style: (feature) => {
        const props = feature.properties;
        return {
          fillColor: props.color,
          fillOpacity: props.fillOpacity,
          color: props.borderColor,
          weight: 1.5,
          dashArray: "4, 4"
        };
      },
      onEachFeature: (feature, layer) => {
        const p = feature.properties;
        const tooltipContent = `
          <div style="font-family:'Outfit',sans-serif; font-size:12px;">
            <strong style="color:${p.color};">${p.zone} — ${p.level}</strong><br/>
            <span>PGA: ${p.pga}</span><br/>
            <span style="font-size:11px; color:#cbd5e1;">${p.regions ? p.regions.slice(0, 3).join(', ') : ''}</span>
          </div>
        `;
        layer.bindTooltip(tooltipContent, { sticky: true, className: "hazard-tooltip" });

        layer.on("mouseover", () => {
          layer.setStyle({ fillOpacity: p.fillOpacity + 0.25, weight: 2.5 });
        });
        layer.on("mouseout", () => {
          layer.setStyle({ fillOpacity: p.fillOpacity, weight: 1.5 });
        });
      }
    }).addTo(this.map);
  }

  // Himalayan Mountain Arc Belt Outline
  initHimalayanRangeLayer() {
    this.layers.himalayanRange = L.geoJSON(HIMALAYAN_DATA.himalayanRange, {
      style: {
        fillColor: "#38bdf8",
        fillOpacity: 0.04,
        color: "#38bdf8",
        weight: 1.5,
        dashArray: "6, 6"
      }
    }).addTo(this.map);

    this.layers.himalayanRange.bindTooltip(
      `<strong>Himalayan Mountain Arc</strong><br/>Length: 2,400 km | Continental Collision Zone`,
      { sticky: true }
    );
  }

  // Fault Systems Layer
  initFaultsLayer() {
    this.layers.faults = L.geoJSON(HIMALAYAN_DATA.faults, {
      style: (feature) => {
        const p = feature.properties;
        return {
          color: p.color || "#00f0ff",
          weight: 3.5,
          opacity: 0.9,
          dashArray: p.id === "fault-mht" ? "8, 4" : null
        };
      },
      onEachFeature: (feature, layer) => {
        const p = feature.properties;
        const popupContent = `
          <div style="padding: 10px; max-width: 280px; font-family:'Outfit', sans-serif;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:11px; font-family:'JetBrains Mono',monospace; background:rgba(0,240,255,0.15); color:${p.color}; padding:2px 8px; border-radius:4px; border:1px solid ${p.color}; font-weight:700;">${p.shortName}</span>
              <span style="font-size:11px; color:#94a3b8;">${p.category}</span>
            </div>
            <h4 style="font-size:15px; margin-bottom:6px; color:#ffffff;">${p.name}</h4>
            <p style="font-size:12px; color:#cbd5e1; line-height:1.45; margin-bottom:10px;">${p.description}</p>
            <div style="font-family:'JetBrains Mono',monospace; font-size:11px; background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; display:flex; flex-direction:column; gap:4px;">
              <div style="display:flex; justify-content:space-between;"><span style="color:#94a3b8;">Slip Rate:</span> <strong style="color:#38bdf8;">${p.slipRate}</strong></div>
              <div style="display:flex; justify-content:space-between;"><span style="color:#94a3b8;">Depth:</span> <span>${p.depth}</span></div>
              <div style="display:flex; justify-content:space-between;"><span style="color:#94a3b8;">Seismic Hazard:</span> <strong style="color:#ff3b5c;">${p.seismicHazard}</strong></div>
            </div>
          </div>
        `;
        layer.bindPopup(popupContent);

        layer.on("mouseover", () => {
          layer.setStyle({ weight: 6, opacity: 1 });
        });
        layer.on("mouseout", () => {
          layer.setStyle({ weight: 3.5, opacity: 0.9 });
        });
      }
    }).addTo(this.map);
  }

  // Tectonic Motion Vectors Layer (Arrows)
  initTectonicVectorsLayer() {
    this.layers.tectonicVectors = L.layerGroup();

    HIMALAYAN_DATA.plateMotion.vectors.forEach(v => {
      // Draw arrow marker
      const arrowIcon = L.divIcon({
        className: "tectonic-vector-marker",
        html: `
          <div style="transform: rotate(${v.azimuth}deg); display:flex; flex-direction:column; align-items:center;">
            <svg width="24" height="34" viewBox="0 0 24 34" fill="none">
              <path d="M12 2L5 12H19L12 2Z" fill="#c084fc"/>
              <line x1="12" y1="10" x2="12" y2="34" stroke="#c084fc" stroke-width="3" stroke-dasharray="3, 2"/>
            </svg>
            <span style="font-family:'JetBrains Mono',monospace; font-size:10px; color:#c084fc; font-weight:700; white-space:nowrap; background:rgba(7,11,19,0.85); padding:1px 5px; border-radius:3px; margin-top:2px;">${v.rate} mm/yr</span>
          </div>
        `,
        iconSize: [30, 45],
        iconAnchor: [15, 20]
      });

      const marker = L.marker([v.lat, v.lng], { icon: arrowIcon });
      marker.bindTooltip(`Indian Plate Convergence Vector: ${v.rate} mm/yr towards N${v.azimuth}°E`, { direction: "top" });
      this.layers.tectonicVectors.addLayer(marker);
    });

    this.layers.tectonicVectors.addTo(this.map);
  }

  // Major Cities Layer
  initCitiesLayer() {
    this.layers.cities = L.layerGroup();

    HIMALAYAN_DATA.cities.forEach(city => {
      const isZone5 = city.zone === "Zone V";
      const markerColor = isZone5 ? "#ff2a51" : "#ff7a00";

      const cityIcon = L.divIcon({
        className: "city-map-pin",
        html: `
          <div style="display:flex; align-items:center; gap:5px;">
            <div style="width:12px; height:12px; border-radius:50%; background:${markerColor}; border:2px solid #fff; box-shadow:0 0 8px ${markerColor};"></div>
            <span style="font-family:'Outfit',sans-serif; font-size:11px; font-weight:700; color:#fff; text-shadow:0 2px 4px rgba(0,0,0,0.9); background:rgba(12,20,36,0.75); padding:2px 6px; border-radius:4px; border:1px solid rgba(255,255,255,0.15); white-space:nowrap;">
              ${city.flag} ${city.name}
            </span>
          </div>
        `,
        iconSize: [90, 24],
        iconAnchor: [6, 12]
      });

      const marker = L.marker([city.lat, city.lng], { icon: cityIcon });

      const popupHtml = `
        <div style="padding:10px; min-width:250px; font-family:'Outfit',sans-serif;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span style="font-size:1.2rem;">${city.flag}</span>
            <span style="font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:700; color:${markerColor}; background:rgba(255,42,81,0.15); padding:2px 8px; border-radius:4px;">${city.zone}</span>
          </div>
          <h4 style="font-size:17px; margin-bottom:2px; color:#fff;">${city.name}</h4>
          <span style="font-size:11px; color:#94a3b8; display:block; margin-bottom:10px;">${city.country} • Population: ${city.population}</span>
          <p style="font-size:12px; color:#cbd5e1; line-height:1.4; margin-bottom:10px;">${city.keyRisk}</p>
          <div style="background:rgba(0,0,0,0.3); border-radius:6px; padding:8px; font-family:'JetBrains Mono',monospace; font-size:11px; display:flex; flex-direction:column; gap:4px;">
            <div style="display:flex; justify-content:space-between;"><span style="color:#94a3b8;">Expected PGA:</span> <strong style="color:#38bdf8;">${city.pgaExpected}</strong></div>
            <div style="display:flex; justify-content:space-between;"><span style="color:#94a3b8;">Risk Level:</span> <strong style="color:${markerColor};">${city.riskScore}</strong></div>
            <div style="display:flex; justify-content:space-between;"><span style="color:#94a3b8;">Soil:</span> <span style="font-size:10px; color:#e2e8f0;">${city.soilType}</span></div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);
      this.layers.cities.addLayer(marker);
    });

    this.layers.cities.addTo(this.map);
  }

  // Earthquakes Layer (Markers scaled by magnitude and colored by depth/hazard)
  initEarthquakesLayer() {
    if (this.layers.earthquakes) {
      this.map.removeLayer(this.layers.earthquakes);
    }

    this.layers.earthquakes = L.layerGroup();

    const filtered = this.getFilteredEarthquakes();

    filtered.forEach(eq => {
      const mag = eq.magnitude;
      const depth = eq.depth || 15;

      // Color scheme according to magnitude
      let color = "#38bdf8"; // M < 5.5
      let pulseColor = "rgba(56, 189, 248, 0.4)";
      if (mag >= 7.8) {
        color = "#ff2a51"; // Zone V Megaquake
        pulseColor = "rgba(255, 42, 81, 0.5)";
      } else if (mag >= 6.8) {
        color = "#ff7a00"; // Severe M6.8 - 7.7
        pulseColor = "rgba(255, 122, 0, 0.45)";
      } else if (mag >= 5.5) {
        color = "#eab308"; // Moderate-Strong
        pulseColor = "rgba(234, 179, 8, 0.4)";
      }

      // Radius scaled exponentially with magnitude
      const radius = Math.max(7, Math.pow(mag - 3.5, 1.8) * 3.8);

      const marker = L.circleMarker([eq.lat, eq.lng], {
        radius: radius,
        fillColor: color,
        color: "#ffffff",
        weight: 1.5,
        opacity: 0.9,
        fillOpacity: 0.75,
        className: "seismic-pulse-circle"
      });

      // Rich Inspector Popup
      const popupHtml = `
        <div class="eq-popup-card">
          <div class="eq-popup-header">
            <span class="eq-mag-badge" style="background:${color};">M ${mag.toFixed(1)}</span>
            <span style="font-family:'JetBrains Mono',monospace; font-size:11px; color:#94a3b8;">${eq.date || eq.year}</span>
          </div>
          <h4 class="eq-popup-title">${eq.name || `Earthquake (M ${mag.toFixed(1)})`}</h4>
          <div class="eq-popup-meta">
            <span><strong style="color:#94a3b8;">Region:</strong> ${eq.region || eq.epicenter || 'Himalayan Arc'}</span>
            <span><strong style="color:#94a3b8;">Depth:</strong> ${depth} km (${this.getDepthLabel(depth)})</span>
            <span><strong style="color:#94a3b8;">Coordinates:</strong> ${eq.lat.toFixed(2)}°N, ${eq.lng.toFixed(2)}°E</span>
            ${eq.faultAssociation ? `<span><strong style="color:#94a3b8;">Fault:</strong> ${eq.faultAssociation}</span>` : ''}
            ${eq.deaths ? `<span><strong style="color:#ff3b5c;">Casualties:</strong> ~${eq.deaths.toLocaleString()}</span>` : ''}
          </div>
          ${eq.description ? `<p style="font-size:12px; color:#cbd5e1; line-height:1.45; border-top:1px solid rgba(255,255,255,0.08); padding-top:8px;">${eq.description}</p>` : ''}
          <div style="margin-top:8px; font-size:10px; font-family:'JetBrains Mono',monospace; color:#64748b; text-align:right;">Source: USGS / ISC / NCS</div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      // Hover Tooltip
      marker.bindTooltip(`<strong>M ${mag.toFixed(1)}</strong> — ${eq.name || eq.region || 'Earthquake'} (${eq.year || ''})`, {
        direction: "top"
      });

      this.layers.earthquakes.addLayer(marker);
    });

    this.layers.earthquakes.addTo(this.map);
  }

  getDepthLabel(depth) {
    if (depth < 30) return "Shallow Crustal";
    if (depth <= 70) return "Mid-Crustal";
    if (depth <= 150) return "Intermediate";
    return "Deep Intraslab";
  }

  getFilteredEarthquakes() {
    return this.currentEarthquakesData.filter(eq => {
      // Magnitude Filter
      if (eq.magnitude < this.filters.minMagnitude) return false;

      // Depth Filter
      const d = eq.depth || 15;
      if (this.filters.depthCategory === "shallow" && d >= 70) return false;
      if (this.filters.depthCategory === "intermediate" && (d < 70 || d > 300)) return false;
      if (this.filters.depthCategory === "deep" && d <= 300) return false;

      return true;
    });
  }

  // Update HUD Metrics (Active Count, Max Mag, Avg Depth)
  updateHUDStats() {
    const list = this.getFilteredEarthquakes();
    const countEl = document.getElementById("hud-active-count");
    const maxMagEl = document.getElementById("hud-max-mag");
    const avgDepthEl = document.getElementById("hud-avg-depth");

    if (countEl) countEl.textContent = list.length;

    if (list.length > 0) {
      const maxM = Math.max(...list.map(e => e.magnitude));
      if (maxMagEl) maxMagEl.textContent = "M " + maxM.toFixed(1);

      const avgD = list.reduce((acc, cur) => acc + (cur.depth || 15), 0) / list.length;
      if (avgDepthEl) avgDepthEl.textContent = Math.round(avgD) + " km";
    } else {
      if (maxMagEl) maxMagEl.textContent = "N/A";
      if (avgDepthEl) avgDepthEl.textContent = "N/A";
    }

    // Trigger Chart.js refresh if analytics is loaded
    if (window.HimalayanCharts && typeof window.HimalayanCharts.updateData === "function") {
      window.HimalayanCharts.updateData(list);
    }
  }

  // Bind All UI Controls
  bindControls() {
    // 1. Layer Toggles
    const toggleBindings = [
      { id: "toggle-earthquakes", layer: "earthquakes" },
      { id: "toggle-faults", layer: "faults" },
      { id: "toggle-hazards", layer: "hazardZones" },
      { id: "toggle-himalaya-range", layer: "himalayanRange" },
      { id: "toggle-cities", layer: "cities" },
      { id: "toggle-tectonics", layer: "tectonicVectors" }
    ];

    toggleBindings.forEach(binding => {
      const el = document.getElementById(binding.id);
      if (el) {
        el.addEventListener("change", (e) => {
          const l = this.layers[binding.layer];
          if (!l) return;
          if (e.target.checked) {
            this.map.addLayer(l);
          } else {
            this.map.removeLayer(l);
          }
        });
      }
    });

    // 2. Basemap Pill Buttons
    const basemapBtns = document.querySelectorAll(".basemap-pill-btn");
    basemapBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        basemapBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const type = btn.dataset.basemap;
        this.setBasemap(type);
      });
    });

    // 3. Magnitude Range Slider
    const magSlider = document.getElementById("slider-min-mag");
    const magLabel = document.getElementById("label-min-mag");
    if (magSlider && magLabel) {
      magSlider.addEventListener("input", (e) => {
        const val = parseFloat(e.target.value);
        this.filters.minMagnitude = val;
        magLabel.textContent = `M ${val.toFixed(1)}+`;
        this.initEarthquakesLayer();
        this.updateHUDStats();
      });
    }

    // 4. Depth Select Filter
    const depthSelect = document.getElementById("select-depth-filter");
    if (depthSelect) {
      depthSelect.addEventListener("change", (e) => {
        this.filters.depthCategory = e.target.value;
        this.initEarthquakesLayer();
        this.updateHUDStats();
      });
    }

    // 5. Search Bar & Autocomplete
    this.setupSearch();

    // 6. Reset View Button
    const resetBtn = document.getElementById("btn-reset-map");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        this.map.flyTo(HIMALAYAN_DATA.meta.defaultCenter, HIMALAYAN_DATA.meta.defaultZoom, {
          duration: 1.2
        });
      });
    }

    // 7. Fullscreen Button
    const fsBtn = document.getElementById("btn-toggle-fullscreen");
    const mapContainer = document.getElementById("map-gis-container");
    if (fsBtn && mapContainer) {
      fsBtn.addEventListener("click", () => {
        mapContainer.classList.toggle("fullscreen");
        this.map.invalidateSize();
      });
    }

    // 8. Live USGS Feed Fetch Toggle
    const liveFeedBtn = document.getElementById("btn-toggle-live-feed");
    if (liveFeedBtn) {
      liveFeedBtn.addEventListener("click", () => {
        this.toggleLiveUSGSFeed(liveFeedBtn);
      });
    }
  }

  // Search Engine: Locations, Cities, Quakes, and Faults
  setupSearch() {
    const input = document.getElementById("map-search-input");
    const dropdown = document.getElementById("search-results-dropdown");
    if (!input || !dropdown) return;

    // Search targets index
    const searchTargets = [
      { name: "Kathmandu Valley", category: "City / Basin", lat: 27.7172, lng: 85.3240, zoom: 9 },
      { name: "Nepal", category: "Country", lat: 28.3949, lng: 84.1240, zoom: 7 },
      { name: "Uttarakhand (Garhwal & Kumaon)", category: "Seismic Gap", lat: 30.0668, lng: 79.0193, zoom: 8 },
      { name: "Kashmir Valley", category: "Region", lat: 34.0837, lng: 74.7973, zoom: 8 },
      { name: "Himachal Pradesh (Kangra)", category: "Region", lat: 31.8, lng: 77.0, zoom: 8 },
      { name: "Assam & Northeast India", category: "Seismic Belt", lat: 26.2, lng: 92.9, zoom: 7 },
      { name: "Bhutan", category: "Country", lat: 27.5142, lng: 90.4336, zoom: 8 },
      { name: "New Delhi (NCR)", category: "Capital City", lat: 28.6139, lng: 77.2090, zoom: 9 },
      { name: "Islamabad & Northern Pakistan", category: "Region", lat: 33.6844, lng: 73.0479, zoom: 8 },
      { name: "Sikkim Himalaya", category: "Region", lat: 27.5330, lng: 88.5122, zoom: 9 },
      { name: "Tibet Autonomous Region (Lhasa)", category: "Plateau", lat: 29.6525, lng: 91.1721, zoom: 7 },
      { name: "Main Himalayan Thrust (MHT)", category: "Fault System", lat: 28.2, lng: 84.5, zoom: 8 },
      { name: "Himalayan Frontal Fault (HFF)", category: "Fault System", lat: 29.8, lng: 78.5, zoom: 8 }
    ];

    input.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        dropdown.classList.remove("visible");
        dropdown.innerHTML = "";
        return;
      }

      const matches = searchTargets.filter(item => item.name.toLowerCase().includes(q));

      if (matches.length === 0) {
        dropdown.innerHTML = `<div class="search-result-item" style="color:#64748b;">No matches found in Himalayan region</div>`;
      } else {
        dropdown.innerHTML = matches.map(item => `
          <div class="search-result-item" data-lat="${item.lat}" data-lng="${item.lng}" data-zoom="${item.zoom}">
            <span><strong>${item.name}</strong></span>
            <span style="font-family:'JetBrains Mono',monospace; font-size:10px; color:#38bdf8;">${item.category}</span>
          </div>
        `).join("");
      }

      dropdown.classList.add("visible");
    });

    dropdown.addEventListener("click", (e) => {
      const item = e.target.closest(".search-result-item");
      if (!item || !item.dataset.lat) return;

      const lat = parseFloat(item.dataset.lat);
      const lng = parseFloat(item.dataset.lng);
      const zoom = parseInt(item.dataset.zoom) || 8;

      this.flyToLocation(lat, lng, zoom);
      dropdown.classList.remove("visible");
      input.value = item.querySelector("strong").textContent;
    });

    document.addEventListener("click", (e) => {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove("visible");
      }
    });
  }

  // Smoothly Fly to Map Location and Drop Pulse Ring
  flyToLocation(lat, lng, zoom = 8) {
    this.map.flyTo([lat, lng], zoom, {
      duration: 1.5,
      easeLinearity: 0.25
    });

    // Reticle pulse marker
    const pulseMarker = L.circleMarker([lat, lng], {
      radius: 24,
      color: "#00f0ff",
      weight: 2,
      fillColor: "#00f0ff",
      fillOpacity: 0.2
    }).addTo(this.map);

    setTimeout(() => {
      this.map.removeLayer(pulseMarker);
    }, 3500);
  }

  // Toggle Live USGS Feed
  async toggleLiveUSGSFeed(btn) {
    if (this.isLiveFeedActive) {
      // Revert to curated historical catalog
      this.currentEarthquakesData = [...HIMALAYAN_DATA.earthquakes];
      this.isLiveFeedActive = false;
      btn.classList.remove("active");
      btn.innerHTML = `<span>📡</span> Load Live USGS Feed`;
      this.initEarthquakesLayer();
      this.updateHUDStats();
      return;
    }

    btn.innerHTML = `<span>⏳</span> Connecting USGS...`;
    btn.disabled = true;

    try {
      // Query USGS for Himalayan bounding box (Last 120 days, M4.5+)
      const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2023-01-01&minmagnitude=4.5&minlatitude=20.0&maxlatitude=38.0&minlongitude=68.0&maxlongitude=102.0&limit=100`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("USGS Network error");
      const geojson = await response.json();

      if (geojson.features && geojson.features.length > 0) {
        const liveQuakes = geojson.features.map(f => {
          const coords = f.geometry.coordinates;
          const p = f.properties;
          return {
            id: f.id,
            name: p.title,
            magnitude: p.mag,
            depth: coords[2] || 10,
            lat: coords[1],
            lng: coords[0],
            date: new Date(p.time).toISOString().split('T')[0],
            region: p.place,
            description: `USGS Live Telemetry: Status: ${p.status}, Felt reports: ${p.felt || 0}, Tsunami alert: ${p.tsunami ? 'YES' : 'NO'}`
          };
        });

        // Combine live quakes with landmark historical quakes
        const historicKey = HIMALAYAN_DATA.earthquakes.filter(e => e.isSignificant);
        this.currentEarthquakesData = [...liveQuakes, ...historicKey];
        this.isLiveFeedActive = true;

        btn.classList.add("active");
        btn.innerHTML = `<span>🟢</span> Showing Live USGS (${liveQuakes.length})`;
      } else {
        alert("No recent M4.5+ earthquakes in the last 120 days within this bounding box. Displaying default catalog.");
        btn.innerHTML = `<span>📡</span> Load Live USGS Feed`;
      }
    } catch (err) {
      console.warn("USGS API live fetch could not be reached, using curated scientific catalog:", err);
      alert("Note: External USGS live API was unreachable (network or offline). Active local catalog is fully loaded with verified seismic events.");
      btn.innerHTML = `<span>📡</span> Load Live USGS Feed`;
    } finally {
      btn.disabled = false;
      this.initEarthquakesLayer();
      this.updateHUDStats();
    }
  }
}

// Make accessible globally
window.HimalayanGISMap = HimalayanGISMap;
