// -----------------------------
// 🌸 Mini Captcha Generator
// -----------------------------
let captchaCode = "";

function generateCaptcha() {
    captchaCode = Math.random().toString(36).substring(2, 7).toUpperCase();
    const display = document.getElementById("captchaDisplay");
    if (display) {
        display.innerText = captchaCode;
    }
}

// Run captcha on page load
window.onload = generateCaptcha;


// -----------------------------
// 🌸 Phone Number Input Mask
// -----------------------------
const phoneInput = document.getElementById("phone");

if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
        let x = e.target.value.replace(/\D/g, "").substring(0, 10);
        let formatted = "";

        if (x.length > 0) formatted = "(" + x.substring(0, 3);
        if (x.length >= 4) formatted += ") " + x.substring(3, 6);
        if (x.length >= 7) formatted += "-" + x.substring(6, 10);

        e.target.value = formatted;
    });
}


// -----------------------------
// 🌸 Form Validation
// -----------------------------
function validateForm() {
    const first = document.getElementById("firstName").value.trim();
    const last = document.getElementById("lastName").value.trim();
    const street = document.getElementById("street").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value.trim().toUpperCase();
    const zip = document.getElementById("zip").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const birth = document.getElementById("birthdate").value;
    const message = document.getElementById("message").value.trim();
    const captchaInput = document.getElementById("captchaInput").value.trim();

    // -----------------------------
    // 🌸 Validation Rules
    // -----------------------------
    if (!first || !last) return alert("Please enter both first and last name.");

    if (!street || !city || !state || !zip)
        return alert("Please complete all address fields.");

    if (!/^[A-Za-z]+$/.test(city))
        return alert("City must contain letters only.");

    if (!/^[A-Z]{2}$/.test(state))
        return alert("State must be 2 uppercase letters.");

    if (!/^\d{5}$/.test(zip))
        return alert("Zip code must be 5 digits.");

    if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(phone))
        return alert("Phone must be in format (000) 000-0000.");

    if (!email.includes("@") || !email.includes("."))
        return alert("Invalid email format.");

    if (!birth)
        return alert("Please enter your birthdate.");

    const today = new Date();
    const bday = new Date(birth);

    if (bday > today)
        return alert("Birthdate cannot be in the future.");

    if (!message)
        return alert("Message cannot be empty.");

    if (captchaInput !== captchaCode)
        return alert("Captcha incorrect. Please try again.");

    // -----------------------------
    // 🌸 Populate Confirmation Page
    // -----------------------------
    const confirmBox = `
        <p><strong>Name:</strong> ${first} ${last}</p>
        <p><strong>Address:</strong> ${street}, ${city}, ${state} ${zip}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Birthdate:</strong> ${birth}</p>
        <p><strong>Message:</strong> ${message}</p>
    `;

    document.getElementById("confirmData").innerHTML = confirmBox;

    // Hide form, show confirmation
    document.querySelector(".form-wrapper").style.display = "none";
    document.getElementById("confirmation-box").style.display = "block";
}


// -----------------------------
// 🌸 Go Back to Form
// -----------------------------
function goBack() {
    document.getElementById("confirmation-box").style.display = "none";
    document.querySelector(".form-wrapper").style.display = "block";
}


// -----------------------------
// 🌸 Send Email via mailto:
// -----------------------------
function sendEmail() {
    const emailBody = document.getElementById("confirmData").innerText;

    // Replace with your actual email address
    const mailtoLink =
        "mailto:samanthamiller124@gmail.com?subject=Form Submission&body=" +
        encodeURIComponent(emailBody);

    window.location.href = mailtoLink;
}
