import { getPhotographers } from "../utils/client.js";
import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";
import { openModal } from "../utils/modalPhoto.js";





const queryString_url_id = window.location.search;

const urlSearchParams = new URLSearchParams(queryString_url_id);

const id = urlSearchParams.get("id");

async function displayData(photographer) {
    const photographerSection = document.querySelector(".photograph-header");
    const photographerModel = photographerFactory(photographer);
    const photographerCardDOM = photographerModel.getPhotographerCardDOM();
    //photographerCardDOM.appendChild(photographerSection);

};

async function displayMedia(gallery) {

    const mediaSection = document.querySelector(".photograph-media");
    const mediaModel = mediaFactory(gallery);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaCardDOM.addEventListener("click", displayModal);
    //mediaSection.appendChild(mediaSection);

}

//const sortDate = document.getElementById("filter_date");
// sortDate.addEventListener("click",displaySortDate);


/**
 * Ouvre la lightbox et montre le media sélectionné
 * 
 * @param {object} media 
 */
async function displayLightbox(media) {

    const lightbox = document.getElementById("lightbox");
    const content = lightbox.querySelector(".dialog-content");
    content.innerHTML = "";

    let medias;
    if (media.image) {
        medias = document.createElement("img");
        medias.setAttribute("src", `assets/photos/${media.image}`);
        medias.setAttribute("aria-label", "")
        content.appendChild(medias);

    } else if (media.video) {
        medias = document.createElement('video');
        const source = document.createElement('source');
        source.setAttribute("src", `assets/photos/${media.video}`);
        medias.appendChild(source);
        content.appendChild(medias);
    }
    const h3 = document.createElement("h3");
    h3.textContent = media.title;
    content.appendChild(h3);
    //NOMBRE TOTAL DE LIKES



}

/**
 * Récupère l'id du media sélectionné et l'affiche dans la Lightbox
 * 
 * @param {object} event 
 */
function displayModal(event) {

    const parent = event.target.closest('container');
    const mediaID = parent.getAttribute('data-id');
    currentIndexMedia = mymedia.findIndex(m => m.id == mediaID);
    const mediaSelected = mymedia[currentIndexMedia];
    displayLightbox(mediaSelected);

}

//CONTACT FORM

let mymedia;
let currentIndexMedia;
export async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers();
    mymedia = media;
    const photographer = photographers.find(p => p.id == id);
    //recupere tous les médias d'un photographe depuis son Id
    const gallery = media.filter(function (elmt) {
        return (elmt.photographerId == id);
    })

    //TRIAGE PAR DATE


    //TRIAGE PAR TITLE
    const sortTitle = document.getElementById('filter_titre');

    function updateValueTitle() {
        document.querySelector(".photograph-media").innerHTML = "";
        gallery.sort(function (a, b) {
            if (a.title < b.title)
                return -1;
            if (a.title > b.title)
                return 1;

            return 0;

        });
        for (const item of gallery) {
            //TRIAGE PAR LIKES

            displayMedia(item);

        };


    }

    //  sortTitle.addEventListener("click", updateValueTitle);


    const sortDate = document.getElementById('filter_date');

    function updateValueDate() {
        document.querySelector(".photograph-media").innerHTML = "";

        gallery.sort(function compare(a, b) {
            if (a.date < b.date)
                return -1;
            if (a.date > b.date)
                return 1;
            return 0;

        })
        for (const item of gallery) {

            displayMedia(item);

        };

    } console.log(gallery);


    //sortDate.addEventListener('click', updateValueDate);

    function updateValueLikes() {
        document.querySelector(".photograph-media").innerHTML = "";
        gallery.sort(function compare(a, b) {

            if (a.likes > b.likes)
                return -1;
            if (a.likes < b.likes)
                return 1;
            return 0;
        });
        for (const item of gallery) {

            displayMedia(item);
            displayLightbox(mymedia);
        };
    }

    const sortLikes = document.getElementById('filter_pop');
    //  sortLikes.addEventListener('click',updateValueLikes);


    // NEXTMEDIA
    function nextMedia() {
        currentIndexMedia += 1;
        displayLightbox(mymedia[currentIndexMedia]);

    }
    const lightbox = document.querySelector('dialog')
    const rightArrow = lightbox.querySelector('.fa-chevron-right')
    rightArrow.addEventListener('click', nextMedia);
    rightArrow.setAttribute("aria-label", "Next image")

    //nb de likes
    let nbLikes = 0;
    gallery.forEach(media => nbLikes += media.likes
    );

    const rul = parseInt(nbLikes);




    //CLOSEMODAL
    function closeModal() {
        document.getElementById("lightbox").style.display = "none";
    }
    const closeButton = lightbox.querySelector('.fa-times')
    closeButton.addEventListener('click', closeModal);
    closeButton.setAttribute("aria-label", "Close dialog")

    //PREVMEDIA
    function prevMedia() {
        currentIndexMedia -= 1;
        displayLightbox(mymedia[currentIndexMedia]);
    }
    const leftArrow = lightbox.querySelector('.fa-chevron-left')
    leftArrow.addEventListener('click', prevMedia);
    leftArrow.setAttribute("aria-label", "Previous image")

    displayData(photographer);
};


init();

const selectTri = document.getElementsByClassName("photographer_elements")[0];

selectTri.addEventListener('change', (event) => console.log(event.target.value));


