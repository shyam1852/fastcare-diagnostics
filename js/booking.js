const form = document.getElementById("bookingForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById("fullName").value,
        phone: document.getElementById("phoneNumber").value,
        email: document.getElementById("email").value,
        test: document.querySelector('select[name="Blood Test"]').value,
        date: document.getElementById("appointmentDate").value,
        address: document.querySelector('textarea[name="Address"]').value
    };

    try {
        fetch("http://localhost:5000/book-test", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            alert("Booking submitted successfully!");
            form.reset();
        } else {
            alert("Failed to submit booking.");
        }
    } catch (err) {
    console.dir(err);
    alert("Server error.");
}
});