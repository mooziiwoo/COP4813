function dampedOscillator(A, b, w, x) {
    return A * Math.exp(-b * x) * Math.cos(w * x);
}

function computeValues(A, b, w, xmin, xmax, step) {
    let data = [];
    for (let x = xmin; x <= xmax; x += step) {
        let y = dampedOscillator(A, b, w, x);
        data.push({ x: x, y: y });
    }
    return data;
}

function run() {
    let A = Number(document.getElementById("A").value);
    let b = Number(document.getElementById("b").value);
    let w = Number(document.getElementById("w").value);
    let xmin = Number(document.getElementById("xmin").value);
    let xmax = Number(document.getElementById("xmax").value);
    let step = Number(document.getElementById("step").value);

    let data = computeValues(A, b, w, xmin, xmax, step);

    Plotly.newPlot("plot", [{
        x: data.map(p => p.x),
        y: data.map(p => p.y),
        mode: "lines",
        line: { color: "#8a6bb8", width: 3 }
    }], {
        title: "Damped Harmonic Oscillator",
        xaxis: { title: "x" },
        yaxis: { title: "y" },
        paper_bgcolor: "#f6f0ff",
        plot_bgcolor: "#ffffff"
    });

    let tableHTML = "<table style='font-family:Arial; background:#fff; border-collapse:collapse; margin-left:auto; margin-right:auto; display:block;'>";
    tableHTML += "<tr><th style='padding:6px; border:1px solid #ccc;'>x</th><th style='padding:6px; border:1px solid #ccc;'>y</th></tr>";

    data.forEach(p => {
        tableHTML += `<tr>
            <td style='padding:6px; border:1px solid #ccc;'>${p.x.toFixed(3)}</td>
            <td style='padding:6px; border:1px solid #ccc;'>${p.y.toFixed(3)}</td>
        </tr>`;
    });

    tableHTML += "</table>";

    document.getElementById("solutions").innerHTML =
    `<div style="
        height:300px;
        overflow-y:auto;
        width:350px;
        margin-left:auto;
        margin-right:auto;
        display:block;
        text-align:center;
    ">
        ${tableHTML}
    </div>`;
}

