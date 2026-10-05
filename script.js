const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get values
    const crn = document.getElementById("crn");
    const email = document.getElementById("email");
    const confirmEmail = document.getElementById("confirmEmail");
    const userId = document.getElementById("userId");
    const confirmUserId = document.getElementById("confirmUserId");

    // Remove previous errors
    document.querySelectorAll("input").forEach(input => {
        input.classList.remove("error");
    });

    message.className = "";
    message.textContent = "";

    // CRN / SS Number validation
    if (crn.value.trim() === "") {
        showError(crn, "Please enter your CRN / SS Number.");
        return;
    }

    // Email validation
    if (!validateEmail(email.value)) {
        showError(email, "Please enter a valid email address.");
        return;
    }

    // Confirm email
    if (email.value !== confirmEmail.value) {
        showError(confirmEmail, "Email addresses do not match.");
        return;
    }

    // User ID validation
    const userIdPattern = /^[A-Za-z][A-Za-z0-9_]{7,19}$/;

    if (!userIdPattern.test(userId.value)) {
        showError(
            userId,
            "User ID must be 8–20 characters, start with a letter, and contain only letters, numbers, or underscores."
        );
        return;
    }

    // Confirm User ID
    if (userId.value !== confirmUserId.value) {
        showError(confirmUserId, "User IDs do not match.");
        return;
    }

    // Success
    message.className = "success";
    message.textContent =
        "Registration information is valid! Your form is ready to be submitted.";

    // Scroll to message
    message.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function showError(input, text) {
    input.classList.add("error");

    message.className = "error";
    message.textContent = text;

    input.focus();

    message.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

// Remove error styling when user starts typing
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", function () {
        this.classList.remove("error");
    });
});

// Check email confirmation while typing
document.getElementById("confirmEmail").addEventListener("input", function () {
    const email = document.getElementById("email");

    if (this.value && this.value !== email.value) {
        this.classList.add("error");
    } else {
        this.classList.remove("error");
    }
});

// Check User ID confirmation while typing
document.getElementById("confirmUserId").addEventListener("input", function () {
    const userId = document.getElementById("userId");

    if (this.value && this.value !== userId.value) {
        this.classList.add("error");
    } else {
        this.classList.remove("error");
    }
});
