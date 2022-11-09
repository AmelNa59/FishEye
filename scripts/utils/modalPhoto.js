export function openModal() {
    document.getElementById("lightbox").style.display = "block";
}

export function closeModal() {
    document.getElementById("lightbox").style.display = "none";
    document.getElementById("contact_modal").style.display = "none";
  }

export function prevMedia() {
    currentIndexMedia -= 1;
    displayLightbox(mymedia[currentIndexMedia]);
}

export function nextMedia() {
    console.log("next Media");
    currentIndexMedia += 1;
    displayLightbox(mymedia[currentIndexMedia]);
  }