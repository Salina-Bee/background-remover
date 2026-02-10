const imageInput = document.getElementById("imageInput");
const removeBtn = document.getElementById("removeBtn");
const resultImage = document.getElementById("resultImage");
const downloadLink = document.getElementById("downloadLink");

removeBtn.addEventListener("click", async () => {
    
    // read image provided by user
    const file = imageInput.files[0];

    if (!file) {
        return;
    }

    // wrap in FormData so image can be sent to backend
    const formData = new FormData();
    formData.append("file", file);

    // send to /remove-bg endpoint
    const response = await fetch("https://background-remover-840813861915.us-central1.run.appremove-bg", {
        method: "POST",
        body: formData,
    });

    // receive processed image
    const blob = await response.blob(); // reads response as raw binary data; used when API returns images, PDFs, audio, or other non-text files
    const imageUrl = URL.createObjectURL(blob);

    resultImage.src = imageUrl; // display image
    downloadLink.href = imageUrl; // provide image download link
    downloadLink.style.display = "inline";
});