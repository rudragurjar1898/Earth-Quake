/**
 * Himalayan Tectonic Collision Simulator & Canvas Seismic Wave Engine
 */

// Hero Canvas Particle / Seismic Wave Animation
function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Seismic pulse rings
  const pulses = [
    { x: width * 0.35, y: height * 0.45, r: 10, maxR: 260, color: "rgba(56, 189, 248, " },
    { x: width * 0.70, y: height * 0.55, r: 80, maxR: 320, color: "rgba(255, 42, 81, " },
    { x: width * 0.50, y: height * 0.35, r: 140, maxR: 280, color: "rgba(192, 132, 252, " }
  ];

  // Grid wave vertices
  const rows = 18;
  const cols = 32;
  let waveTime = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw topography/stress lines
    waveTime += 0.015;
    ctx.lineWidth = 1;

    for (let r = 0; r < rows; r++) {
      const yBase = (height / rows) * r + 20;
      ctx.beginPath();
      for (let c = 0; c < cols; c++) {
        const x = (width / (cols - 1)) * c;
        // 3D perspective sine deformation simulating crustal deformation
        const yOffset = Math.sin(c * 0.25 + waveTime + r * 0.4) * 16 * Math.sin((r / rows) * Math.PI);
        const y = yBase + yOffset;
        if (c === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(56, 189, 248, ${0.03 + (r / rows) * 0.08})`;
      ctx.stroke();
    }

    // Draw propagating seismic wave rings
    pulses.forEach(p => {
      p.r += 0.6;
      if (p.r > p.maxR) p.r = 5;

      const alpha = Math.max(0, 0.45 * (1 - p.r / p.maxR));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.strokeStyle = p.color + alpha + ")";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Secondary echo ring
      if (p.r > 30) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r - 20, 0, Math.PI * 2);
        ctx.strokeStyle = p.color + (alpha * 0.5) + ")";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    requestAnimationFrame(render);
  }

  render();
}

// Interactive Tectonic Collision Cross-Section SVG Controller
function initTectonicInteractive() {
  const stepCards = document.querySelectorAll(".tectonic-step-card");
  const svgStatus = document.getElementById("tectonic-diagram-status");
  const stressGlow = document.getElementById("svg-stress-zone");
  const ruptureWave = document.getElementById("svg-rupture-pulse");
  const indianPlateArrow = document.getElementById("svg-indian-arrow");

  stepCards.forEach(card => {
    card.addEventListener("click", () => {
      stepCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      const step = card.dataset.step;
      updateTectonicStep(step);
    });
  });

  function updateTectonicStep(step) {
    if (!svgStatus) return;

    if (step === "1") {
      svgStatus.textContent = "Step 01: Indian Plate converges northward at ~45 mm/year under Eurasia";
      if (stressGlow) stressGlow.setAttribute("opacity", "0.2");
      if (ruptureWave) ruptureWave.setAttribute("opacity", "0");
      if (indianPlateArrow) {
        indianPlateArrow.setAttribute("transform", "translate(10, 0)");
      }
    } else if (step === "2") {
      svgStatus.textContent = "Step 02: Tectonic stress accumulates along the locked Main Himalayan Thrust (MHT)";
      if (stressGlow) stressGlow.setAttribute("opacity", "0.85");
      if (ruptureWave) ruptureWave.setAttribute("opacity", "0.2");
      if (indianPlateArrow) {
        indianPlateArrow.setAttribute("transform", "translate(20, 0)");
      }
    } else if (step === "3") {
      svgStatus.textContent = "Step 03: Fault rupture releases centuries of strain — generating M7+ to M8+ megaquakes";
      if (stressGlow) stressGlow.setAttribute("opacity", "0.4");
      if (ruptureWave) ruptureWave.setAttribute("opacity", "1");
      if (indianPlateArrow) {
        indianPlateArrow.setAttribute("transform", "translate(0, 0)");
      }
    }
  }
}

// Auto-run when DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initHeroCanvas();
  initTectonicInteractive();
});
