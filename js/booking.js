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
        alert("Booking submitted successfully!");
        form.reset();
    } else {
        alert("Submission failed.");
        console.log(result);
    }
});