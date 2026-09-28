console.log("Spirograph JS loaded!");

let ctx;
let t = 0;
let R, r, O;
let animationId = null;

function validateInputs() {
    R = Number(document.getElementById("R").value);
    r = Number(document.getElementById("r").value);
    O = Number(document.getElementById("O").value);

    if (r > R) {
        alert("Error: r cannot be greater than R.");
        return false;
    }
    return true;
}

function startDrawing() {
    if (!validateInputs()) return;

    const canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#8a6bb8";

    t = 0;
    drawStep();
}

function drawStep() {
    let x = (R + r) * Math.cos(t) - (r + O) * Math.cos(((R + r) / r) * t);
    let y = (R + r) * Math.sin(t) - (r + O) * Math.sin(((R + r) / r) * t);

    let cx = x + 300;
    let cy = y + 300;

    if (t === 0) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
    } else {
        ctx.lineTo(cx, cy);
        ctx.stroke();
    }

    t += 0.01;

    animationId = requestAnimationFrame(drawStep);
}

function stopDrawing() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

document.getElementById("startBtn").addEventListener("click", startDrawing);
document.getElementById("stopBtn").addEventListener("click", stopDrawing);
