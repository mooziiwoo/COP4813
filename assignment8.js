const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const usagi = new Image();
usagi.src = "usagi.png";

let usagiSize = 150;

// Position
let x = 100;
let y = 100;

// Movement
let dx = 3;
let dy = 3;

// Rotation
let angle = 0;
let rotationSpeed = 0.03;

// YAHA Mode
let showYaha = false;
let yahaActive = false;

// Counters
let bounceCount = 0;
let yahaCount = 0;

function animate() {

    // Pastel gradient background
    const gradient = ctx.createLinearGradient(
        0, 0,
        0, canvas.height
    );

    gradient.addColorStop(0, "#fffdf0");
    gradient.addColorStop(0.5, "#f3fef9");
    gradient.addColorStop(1, "#f8f3ff");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Counters
    ctx.fillStyle = "#666";
    ctx.font = "18px Trebuchet MS";
    ctx.textAlign = "left";

    ctx.fillText(
        "Bounces: " + bounceCount,
        15,
        30
    );

    ctx.fillText(
        "YAHAs: " + yahaCount,
        15,
        55
    );

    // Save canvas state
    ctx.save();

    // Move to center of Usagi
    ctx.translate(
        x + usagiSize / 2,
        y + usagiSize / 2
    );

    // Rotate
    ctx.rotate(angle);

    // Draw Usagi
    ctx.drawImage(
        usagi,
        -usagiSize / 2,
        -usagiSize / 2,
        usagiSize,
        usagiSize
    );

    ctx.restore();

    // YAHA Text
    if (showYaha) {

        let wiggleY =
            Math.sin(Date.now() / 80) * 8;

        ctx.font = "bold 42px Comic Sans MS";
        ctx.fillStyle = "#ff69b4";
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 4;
        ctx.textAlign = "center";

        ctx.strokeText(
            "YAHA!!",
            x + usagiSize / 2,
            y - 20 + wiggleY
        );

        ctx.fillText(
            "YAHA!!",
            x + usagiSize / 2,
            y - 20 + wiggleY
        );
    }

    // Movement
    x += dx;
    y += dy;

    // Spin
    angle += rotationSpeed;

    // Horizontal bounce
    if (
        x <= 0 ||
        x + usagiSize >= canvas.width
    ) {
        dx = -dx;
        bounceCount++;
    }

    // Vertical bounce
    if (
        y <= 0 ||
        y + usagiSize >= canvas.height
    ) {
        dy = -dy;
        bounceCount++;
    }

    requestAnimationFrame(animate);
}

// Click Event
canvas.addEventListener("click", function(event) {

    const rect =
        canvas.getBoundingClientRect();

    const mouseX =
        event.clientX - rect.left;

    const mouseY =
        event.clientY - rect.top;

    // Check if Usagi was clicked
    if (
        mouseX >= x &&
        mouseX <= x + usagiSize &&
        mouseY >= y &&
        mouseY <= y + usagiSize
    ) {

        if (!yahaActive) {

            yahaActive = true;
            showYaha = true;

            yahaCount++;

            // Speed boost
            dx *= 2;
            dy *= 2;

            // Spin boost
            rotationSpeed = 0.15;

            setTimeout(() => {

                dx /= 2;
                dy /= 2;

                rotationSpeed = 0.03;

                showYaha = false;
                yahaActive = false;

            }, 3000);
        }
    }
});

// Start animation
usagi.onload = function() {
    animate();
};