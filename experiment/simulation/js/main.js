"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // RAW DATA USED IN THE SIMULATION

  const stress = [
    295.4, 275.5, 253.6, 233.6, 199.4, 182.8, 177, 121, 112.8, 117.3, 102.9,
    86.66, 80.17, 76.68, 57.94, 73.07, 65.65, 41.41, 49.67,
  ];
  const cycles = [
    "133",
    "176",
    "200",
    "280",
    "350",
    "380",
    "444",
    "876",
    "907",
    "1708",
    "3000",
    "6690",
    "9750",
    "15990",
    "43560",
    "60150",
    "63300",
    "141300",
    "166560",
  ];
  const force = [
    140, 130, 120, 110, 94.5, 86.6, 83.9, 76.4, 67.9, 72.4, 58.8, 46.1, 41.6,
    39.4, 28.4, 37.1, 32.7, 19.8, 24,
  ];

  const restartButton = document.getElementById("restart");
  restartButton.addEventListener("click", restart);

  const playButton = document.getElementById("play");
  playButton.addEventListener("click", play);

  const pauseButton = document.getElementById("pause");
  pauseButton.addEventListener("click", pause);
  const statusText = document.getElementById("status-text");
  const cycleCounter = document.getElementById("cycle-counter");
  const resultPanel = document.getElementById("result");
  const mainWorkspace = document.getElementById("main-workspace");
  const completionPage = document.getElementById("completion-page");
  const completionChartContainer = document.getElementById(
    "completion-chartContainer",
  );
  const resultSummary = document.getElementById("result-summary");
  const completionObservationBody = document.getElementById(
    "completion-observation-body",
  );

  const slider = document.getElementById("speed");
  const output = document.getElementById("demo_speed");
  output.innerHTML = slider.value / 4;
  slider.oninput = function () {
    output.innerHTML = this.value / 4;
    fps = originalFPS * output.innerHTML;
    restart();
  };

  function setAll() {
    height = 100;
    flag = 1;
    step = 0;
    statusText.textContent = "Ready";
    cycleCounter.textContent = "0";
    resultPanel.innerHTML = "";
    document.getElementById("stress").innerHTML = "0.0";
    document.getElementById("cycles").innerHTML = "0";
    document.getElementById("force").innerHTML = "0.0";
    resultSummary.innerHTML =
      '<p class="v-bold">Results</p><p>Stress = - MPa</p><p>Cycles to Failure = -</p><p>log(N) = -</p><p class="v-bold">Observation</p><p>-</p>';
    completionObservationBody.innerHTML = "";
    mainWorkspace.classList.remove("is-hidden");
    completionPage.classList.add("is-hidden");
  }

  function restart() {
    window.clearTimeout(tmHandle);
    setAll();
    graph();
    pauseButton.setAttribute("disabled", "true");
    playButton.removeAttribute("disabled");
    restartButton.setAttribute("disabled", "true");
  }

  function play() {
    tmHandle = window.setTimeout(draw, 1000 / fps);
    statusText.textContent = "Running...";
    pauseButton.removeAttribute("disabled");
    restartButton.removeAttribute("disabled");
    playButton.setAttribute("disabled", "true");
  }

  function pause() {
    window.clearTimeout(tmHandle);
    pauseButton.setAttribute("disabled", "true");
    playButton.removeAttribute("disabled");
  }

  function drawObject(ctx, obj, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = data.colors.black;
    ctx.beginPath();
    ctx.moveTo(obj[0][0], obj[0][1]);

    for (let i = 0; i < obj.length; ++i) {
      const next = (i + 1) % obj.length;
      ctx.lineTo(obj[next][0], obj[next][1]);
    }

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  let tmHandle;
  let chart;
  let step;
  let flag;

  const canvas = document.getElementById("main");
  canvas.width = 900;
  canvas.height = 1200;
  // canvas.style = "border:3px solid;";
  const ctx = canvas.getContext("2d");

  const lineWidth = 1.5;
  const originalFPS = 20;
  let fps = 20;

  const baseX = 0;
  const baseWidth = canvas.width;
  const baseHeight = 100;
  const baseY = canvas.height - baseHeight;

  const firstSlabX = 240;
  const firstSlabWidth = 400;
  const firstSlabHeight = 200;
  const firstSlabY = baseY - firstSlabHeight;

  const base = [
    [baseX, baseY],
    [baseX, baseY + baseHeight - 5],
    [baseX + baseWidth, baseY + baseHeight - 5],
    [baseX + baseWidth, baseY],
  ];

  const firstSlab = [
    [firstSlabX, firstSlabY],
    [firstSlabX, firstSlabY + firstSlabHeight - 5],
    [firstSlabX + firstSlabWidth, firstSlabY + firstSlabHeight - 5],
    [firstSlabX + firstSlabWidth, firstSlabY],
  ];

  const topX = 150;
  const topWidth = 600;
  const topHeight = 150;
  const topY = 100;

  const top = [
    [topX, topY],
    [topX, topY + topHeight],
    [topX + topWidth, topY + topHeight],
    [topX + topWidth, topY],
  ];

  let height;
  setAll();

  const midHeight = 150;
  const width = 160;

  let mid;
  let mid2;

  const connecter1Width = 100;
  let connector1;
  const connecter2Width = 20;
  let connector2a;
  let connector2b;

  drawStatic();
  graph();

  function drawStatic() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    mid = [
      [topX, topY + topHeight + height],
      [topX, topY + topHeight + height + midHeight],
      [topX + topWidth, topY + topHeight + height + midHeight],
      [topX + topWidth, topY + topHeight + height],
    ];

    connector1 = [
      [
        topX + topWidth / 2 - connecter1Width / 2,
        topY + topHeight + height + midHeight + 60,
      ],
      [topX + topWidth / 2 - connecter1Width / 2, firstSlabY],
      [topX + topWidth / 2 + connecter1Width / 2, firstSlabY],
      [
        topX + topWidth / 2 + connecter1Width / 2,
        topY + topHeight + height + midHeight + 60,
      ],
    ];
    mid2 = [
      [topX + topWidth / 2 - width / 2, topY + topHeight + height + midHeight],
      [
        topX + topWidth / 2 - width / 2,
        topY + topHeight + height + midHeight + 60,
      ],
      [
        topX + topWidth / 2 + width / 2,
        topY + topHeight + height + midHeight + 60,
      ],
      [topX + topWidth / 2 + width / 2, topY + topHeight + height + midHeight],
    ];

    connector2a = [
      [topX + topWidth / 2 - 200, topY + topHeight],
      [topX + topWidth / 2 - 200 + connecter2Width, topY + topHeight],
      [topX + topWidth / 2 - 200 + connecter2Width, topY + topHeight + height],
      [topX + topWidth / 2 - 200, topY + topHeight + height],
    ];

    connector2b = [
      [topX + topWidth / 2 + 200, topY + topHeight],
      [topX + topWidth / 2 + 200 + connecter2Width, topY + topHeight],
      [topX + topWidth / 2 + 200 + connecter2Width, topY + topHeight + height],
      [topX + topWidth / 2 + 200, topY + topHeight + height],
    ];

    drawObject(ctx, base, data.colors.bench);
    drawObject(ctx, firstSlab, data.colors.slab1c);
    drawObject(ctx, top, data.colors.slab1c);
    drawObject(ctx, mid, data.colors.black);
    drawObject(ctx, mid2, data.colors.slab1c);
    drawObject(ctx, connector1, data.colors.black);
    drawObject(ctx, connector2a, data.colors.connector);
    drawObject(ctx, connector2b, data.colors.connector);
    ctx.font = "50px Arial";

    ctx.fillText("Fatigue Test Machine", 200, 50);
    ctx.font = "24px Arial";
    ctx.fillText(
      "Rotating Beam Fatigue Test (ISO 1143 Demonstration)",
      150,
      90,
    );
    if (step !== 0) {
      ctx.fillText(cycles[step - 1], 400, 200);
    }
  }

  function draw() {
    height += flag;
    if (height === 50 || height === 150) {
      flag = -1 * flag;
    }
    drawStatic();
    if (step < cycles.length) {
      tmHandle = window.setTimeout(draw, 250 / fps);
      if (height === 50) {
        updateChart();
      }
    } else {
      statusText.textContent = "Specimen Failed";
      cycleCounter.textContent = cycles[cycles.length - 1];
      resultPanel.innerHTML =
        '<p class="v-bold">Specimen Failed</p><p>Cycles to Failure = ' +
        cycles[cycles.length - 1] +
        "</p>";
      const finalStress = stress[stress.length - 1];
      const finalCycles = Number(cycles[cycles.length - 1]);
      const finalLogN = Math.log(finalCycles).toFixed(2);
      resultSummary.innerHTML =
        '<p class="v-bold">Results</p><p>Stress = ' +
        finalStress.toFixed(2) +
        " MPa</p><p>Cycles to Failure = " +
        finalCycles +
        "</p><p>log(N) = " +
        finalLogN +
        '</p><p class="v-bold">Observation</p><p>The specimen failed due to fatigue under repeated cyclic loading.</p>';
      buildCompletionTable();
      mainWorkspace.classList.add("is-hidden");
      completionPage.classList.remove("is-hidden");
      renderCompletionGraph();
      pauseButton.setAttribute("disabled", "true");
    }
  }

  function graph() {
    chart = [
      {
        x: [0],
        y: [0],
        type: "lines+markers",
      },
    ];

    let layout = {
      title: {
        text: "Stress (MPa) vs log(Number of Cycles)",
      },
      yaxis: {
        title: "Stress (MPa)",
        zeroline: true,
      },
      xaxis: {
        title: "log(Number of Cycles)",
        zeroline: true,
      },
    };
    Plotly.newPlot(chartContainer, chart, layout);
  }

  function updateChart() {
    let x = Math.log(Number(cycles[step]));
    let y = stress[step];

    document.getElementById("stress").innerHTML = stress[step].toString();
    document.getElementById("cycles").innerHTML = cycles[step].toString();
    document.getElementById("force").innerHTML = force[step].toString();
    animateCycleCounter(Number(cycles[step]));
    if (step < cycles.length) {
      chart[0]["x"].push(x);
      chart[0]["y"].push(y);
      Plotly.redraw(chartContainer);
      step++;
    }
  }

  function animateCycleCounter(target) {
    const current = Number(cycleCounter.textContent.replace(/,/g, "")) || 0;
    const distance = target - current;
    if (distance <= 0) {
      cycleCounter.textContent = target.toString();
      return;
    }

    const increments = 6;
    const perStep = Math.max(1, Math.round(distance / increments));
    let value = current;

    function tick() {
      value = Math.min(target, value + perStep);
      cycleCounter.textContent = value.toString();
      if (value < target) {
        window.setTimeout(tick, 40);
      }
    }

    tick();
  }

  function renderCompletionGraph() {
    const liveX = chart[0]["x"].slice();
    const liveY = chart[0]["y"].slice();
    const completionChart = [
      {
        x: liveX,
        y: liveY,
        type: "lines+markers",
      },
    ];

    const completionLayout = {
      title: {
        text: "Stress (MPa) vs log(Number of Cycles)",
      },
      yaxis: {
        title: "Stress (MPa)",
        zeroline: true,
      },
      xaxis: {
        title: "log(Number of Cycles)",
        zeroline: true,
      },
    };

    Plotly.newPlot(completionChartContainer, completionChart, completionLayout);
  }

  function buildCompletionTable() {
    completionObservationBody.innerHTML = "";
    for (let i = 0; i < cycles.length; i++) {
      const row = document.createElement("tr");
      const result = i === cycles.length - 1 ? "Failed" : "Intermediate";
      row.innerHTML =
        "<td>" +
        (i + 1) +
        "</td><td>" +
        force[i] +
        "</td><td>" +
        stress[i].toFixed(2) +
        "</td><td>" +
        cycles[i] +
        "</td><td>" +
        Math.log(Number(cycles[i])).toFixed(2) +
        "</td><td>" +
        result +
        "</td>";
      completionObservationBody.appendChild(row);
    }
  }
});
