'use strict';

document.addEventListener('DOMContentLoaded', function() {

    // RAW DATA USED IN THE SIMULATION

    const stress = [295.4, 275.5, 253.6, 233.6, 199.4, 182.8, 177, 121, 112.8, 117.3, 102.9, 86.66, 80.17, 76.68, 57.94, 73.07, 65.65, 41.41, 49.67];
    const cycles = [133, 176, 200, 280, 350, 380, 444, 876, 907, 1708, 3000, 6690, 9750, 15990, 43560, 60150, 63300, 141300, 166560];
    const force = [140, 130, 120, 110, 94.5, 86.6, 83.9, 76.4, 67.9, 72.4, 58.8, 46.1, 41.6, 39.4, 28.4, 37.1, 32.7, 19.8, 24];

    const restartButton = document.getElementById('restart');
    restartButton.addEventListener('click', function() { restart(); });

    const playButton = document.getElementById('play');
    playButton.addEventListener('click', function() { play(); });

    const pauseButton = document.getElementById('pause');
    pauseButton.addEventListener('click', function() { pause(); });

    const slider = document.getElementById('speed');
    const output = document.getElementById('demo_speed');
    output.innerHTML = (slider.value) / 4;
    slider.oninput = function() {
        output.innerHTML = (this.value) / 4;
        fps = originalFPS * (output.innerHTML);
        restart();
    };

    function setAll() {
        height = 100;
        flag = 1;
        step = 0;

        document.getElementById("stress").innerHTML = "0.0 Mpa";
        document.getElementById("cycles").innerHTML = "0";
        document.getElementById("force").innerHTML = "0.0 N";

    }

    function restart() {
        window.clearTimeout(tmHandle);
        setAll();
        graph();
        play();
    }

    function play() {
        tmHandle = window.setTimeout(draw, 1000 / fps);
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
        ctx.strokeStyle = data.colors.strokestyle;
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
    let step = 0;
    let flag = 1;

    const canvas = document.getElementById("main");
    canvas.width = 900;
    canvas.height = 1200;
    canvas.style = "border:3px solid;";
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


    let height = 100;

    const midHeight = 150;
    const width = 160;

    let mid = [
        [topX, topY + topHeight + height],
        [topX, topY + topHeight + height + midHeight],
        [topX + topWidth, topY + topHeight + height + midHeight],
        [topX + topWidth, topY + topHeight + height],
    ];

    let mid2 = [
        [topX + topWidth / 2 - width / 2, topY + topHeight + height + midHeight],
        [topX + topWidth / 2 - width / 2, topY + topHeight + height + midHeight + 60],
        [topX + topWidth / 2 + width / 2, topY + topHeight + height + midHeight + 60],
        [topX + topWidth / 2 + width / 2, topY + topHeight + height + midHeight],
    ];


    const connecter1Width = 100;
    let connector1 = [
        [topX + topWidth / 2 - connecter1Width / 2, topY + topHeight + height + midHeight + 60],
        [topX + topWidth / 2 - connecter1Width / 2, firstSlabY],
        [topX + topWidth / 2 + connecter1Width / 2, firstSlabY],
        [topX + topWidth / 2 + connecter1Width / 2, topY + topHeight + height + midHeight + 60],
    ];

    const connecter2Width = 20;
    let connector2a = [
        [topX + topWidth / 2 - 200, topY + topHeight],
        [topX + topWidth / 2 - 200 + connecter2Width, topY + topHeight],
        [topX + topWidth / 2 - 200 + connecter2Width, topY + topHeight + height],
        [topX + topWidth / 2 - 200, topY + topHeight + height],
    ];

    let connector2b = [
        [topX + topWidth / 2 + 200, topY + topHeight],
        [topX + topWidth / 2 + 200 + connecter2Width, topY + topHeight],
        [topX + topWidth / 2 + 200 + connecter2Width, topY + topHeight + height],
        [topX + topWidth / 2 + 200, topY + topHeight + height],
    ];


    setAll();
    drawStatic();
    graph();

    function drawStatic() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        drawObject(ctx, base, data.colors.bench);
        drawObject(ctx, firstSlab, data.colors.slab1c);
        drawObject(ctx, top, data.colors.slab1c);
        drawObject(ctx, mid, data.colors.slab2c);
        drawObject(ctx, mid2, data.colors.slab1c);
        drawObject(ctx, connector1, data.colors.slab2c);
        drawObject(ctx, connector2a, data.colors.connector);
        drawObject(ctx, connector2b, data.colors.connector);
        ctx.font = "50px Arial";

        ctx.fillText("Fatigue Test Machine", 200, 50);
        if (step !== 0) {
            ctx.fillText(cycles[step - 1], 400, 200);
        }

    }



    function draw() {

        drawStatic();
        height += flag;
        if (height === 50 || height === 150) {
            flag = -1 * flag;
        }


        mid = [
            [topX, topY + topHeight + height],
            [topX, topY + topHeight + height + midHeight],
            [topX + topWidth, topY + topHeight + height + midHeight],
            [topX + topWidth, topY + topHeight + height],
        ];

        connector1 = [
            [topX + topWidth / 2 - connecter1Width / 2, topY + topHeight + height + midHeight + 60],
            [topX + topWidth / 2 - connecter1Width / 2, firstSlabY],
            [topX + topWidth / 2 + connecter1Width / 2, firstSlabY],
            [topX + topWidth / 2 + connecter1Width / 2, topY + topHeight + height + midHeight + 60],
        ];
        mid2 = [
            [topX + topWidth / 2 - width / 2, topY + topHeight + height + midHeight],
            [topX + topWidth / 2 - width / 2, topY + topHeight + height + midHeight + 60],
            [topX + topWidth / 2 + width / 2, topY + topHeight + height + midHeight + 60],
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
        if (step < cycles.length) {
            tmHandle = window.setTimeout(draw, 250 / fps);
            if (height === 50) {
                updateChart();
            }
        }

    }

    function graph() {

        chart = [{
            x: [0],
            y: [0],
            type: 'lines+markers'
        }];

        let layout = {
            title: {
                text: "log(Stress) v/s log(N)"
            },
            yaxis: {
                title: "log(Stress)",
                zeroline: true,

            },
            xaxis: {
                title: "log(N)",
                zeroline: true,

            }
        };
        Plotly.newPlot(chartContainer, chart, layout);
    }

    function updateChart() {

        let x = Math.log(cycles[step]);
        let y = Math.log(stress[step]);

        document.getElementById("stress").innerHTML = stress[step].toString() + " Mpa";
        document.getElementById("cycles").innerHTML = cycles[step].toString();
        document.getElementById("force").innerHTML = force[step].toString() + " N";
        if (step < cycles.length) {
            chart[0]['x'].push(x);
            chart[0]['y'].push(y);
            Plotly.redraw(chartContainer);
            step++;
        }
    }
});