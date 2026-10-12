function initializeFood() {
  const foodArea = document.getElementById("food-area");
  foodArea.innerHTML = `
    <img src="Chia/fish.png" id="fish" class="food" draggable="true">
    <img src="Chia/milk.png" id="milk" class="food" draggable="true">
    <img src="Chia/food.png" id="food" class="food" draggable="true">
  `;

  const foods = document.querySelectorAll(".food");

  foods.forEach(food => {
    food.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", food.id);
    });
  });

  // Hide full message on reset
  const msg = document.getElementById("full-message");
  msg.classList.add("hidden");
  msg.classList.remove("visible");
}

initializeFood();

const bowl = document.getElementById("bowl");

// ✨ Sparkle generator
function createSparkle() {
  const sparkleContainer = document.getElementById("sparkles");
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");

  const emojis = ["✨", "💖", "🌟", "💫"];
  sparkle.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  sparkle.style.left = Math.random() * 80 + "%";

  sparkleContainer.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 1000);
}

bowl.addEventListener("dragover", (e) => {
  e.preventDefault();
  bowl.classList.add("over");
});

bowl.addEventListener("dragleave", () => {
  bowl.classList.remove("over");
});

bowl.addEventListener("drop", (e) => {
  e.preventDefault();
  bowl.classList.remove("over");

  const foodId = e.dataTransfer.getData("text/plain");
  const food = document.getElementById(foodId);

  // Custom messages for each food item
  let message = "";
  if (foodId === "fish") message = "Chia loves fishies!";
  if (foodId === "milk") message = "Chia is having a milk treat!";
  if (foodId === "food") message = "Chia is munching her kibble!";

  alert(message);

  food.remove();

  // ✨ Sparkle on each drop
  createSparkle();

  // Check if all food is gone
  const remainingFood = document.querySelectorAll(".food");
  if (remainingFood.length === 0) {
    const msg = document.getElementById("full-message");
    msg.classList.remove("hidden");
    msg.classList.add("visible");

    // Extra sparkles when full
    createSparkle();
    createSparkle();
    createSparkle();
  }
});

// RESET BUTTON
document.getElementById("reset-btn").addEventListener("click", () => {
  initializeFood();
});

