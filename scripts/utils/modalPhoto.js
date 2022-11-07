function openModal() {
  document.getElementById("lightbox").style.display = "block";

}


function closeModal() {
  document.getElementById("lightbox").style.display = "none";
  document.getElementById("contact_modal").style.display = "none";
  }

function prevMedia() {
    currentIndexMedia -= 1;
    displayLightbox(mymedia[currentIndexMedia]);
  }

function nextMedia() {
    currentIndexMedia += 1;
    displayLightbox(mymedia[currentIndexMedia]);
  }