const form = document.getElementById("bookingForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    });

    const result = await response.json();

if (result.success) {
    form.reset();

    const success = document.createElement("div");
    success.className = "success-popup";
    success.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        <span>Booking submitted successfully!</span>
    `;

    document.body.appendChild(success);

    setTimeout(() => success.classList.add("show"), 10);

    setTimeout(() => {
        success.classList.remove("show");
        setTimeout(() => success.remove(), 300);
    }, 3000);

} else {
    alert("Failed to submit booking.");
}
});