import {getPhotographers} from "../utils/client.js";
import {photographerFactory} from "../factories/photographer.js";
import {mediaFactory} from "../factories/media.js";
import {closeModal } from "../utils/modalPhoto.js";
import {openModal } from "../utils/modalPhoto.js";
import {prevMedia } from "../utils/modalPhoto.js";
import {nextMedia } from "../utils/modalPhoto.js";



const queryString_url_id =window.location.search;

const urlSearchParams = new URLSearchParams(queryString_url_id);

const id = urlSearchParams.get("id");

async function displayData(photographer) {
    const photographerSection = document.querySelector(".photograph-header");
    const photographerModel = photographerFactory(photographer);
    const photographerCardDOM = photographerModel.getPhotographerCardDOM();
  //  photographerCardDOM.appendChild(photographerSection);

};

async function displayMedia(gallery) {
    const mediaSection = document.querySelector(".photograph-media");
    const mediaModel = mediaFactory(gallery);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaCardDOM.addEventListener("click",displayModal);
   // mediaCardDOM.appendChild(mediaSection);
   // gallery.sort();
}

/**
 * Ouvre la lightbox et montre le media sélectionné
 * 
 * @param {object} media 
 */
async function displayLightbox(media) {
    const lightbox = document.getElementById("lightbox");
    const content = lightbox.querySelector(".dialog-content");
    content.innerHTML= "";
    const $image = document.createElement("img");
    $image.setAttribute("src",`assets/photos/${media.image}`);
    content.appendChild($image);   
}

/**
 * Récupère l'id du media sélectionné et l'affiche dans la Lightbox
 * 
 * @param {object} event 
 */
function displayModal(event){
 
    const parent = event.target.closest('container');
    const mediaID = parent.getAttribute('data-id');
    currentIndexMedia = mymedia.findIndex(m => m.id == mediaID);
    const mediaSelected = mymedia[currentIndexMedia];
    displayLightbox(mediaSelected);

}

let mymedia;
let currentIndexMedia;
export async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers();
    mymedia = media;
    const photographer = photographers.find(p =>p.id == id);
    //recupere tous les médias d'un photographe depuis son Id
    const gallery = media.filter(function(elmt){
        return (elmt.photographerId == id);
    })

    const flecheDroite=  document.getElementById("prev");
    flecheDroite.addEventListener("click",prevMedia);
    //Boucle For pour afficher toutes les donnees de la galerie d'un photographe
for (const item of gallery){
    displayMedia(item);
}
displayData(photographer);
};
init();

