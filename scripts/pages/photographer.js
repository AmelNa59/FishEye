import { getPhotographers } from "../utils/client.js";

import {photographerFactory} from "../factories/photographer.js"

import {mediaFactory} from "../factories/media.js"

const queryString_url_id =window.location.search;

const urlSearchParams = new URLSearchParams(queryString_url_id);

const id = urlSearchParams.get("id");

async function displayData(photographer) {
   const photographerSection = document.querySelector(".photograph-header");
    const photographerModel = photographerFactory(photographer);
    const photographerCardDOM = photographerModel.getPhotographerCardDOM();

};

async function displayMedia(gallery) {

    const mediaSection = document.querySelector(".photograph-media");
        const mediaModel = mediaFactory(gallery);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaCardDOM.addEventListener("click",displayModal);
      //mediaCardDOM.appendChild(mediaSection);
       // gallery.sort();
    }
    async function displayLightbox(media) {
        const lightbox = document.getElementById("lightbox");
        const content = lightbox.querySelector(".dialog-content");
        content.innerHTML= "";
        const $image = document.createElement("img");
        $image.setAttribute("src",`assets/photos/${media.image}`);
        content.appendChild($image);
        
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

//Boucle For pour afficher toutes les donnees de la galerie d'un photographe
for (const item of gallery){
    displayMedia(item);
}
displayData(photographer);
};

async function displayModal(event){

console.log("displayModal",event.target);
    const parent = event.target.closest('container');
    const mediaID = parent.getAttribute('data-id');

    const currentIndexMedia = mymedia.findIndex(m => m.id == mediaID);
    const mediaSelected = mymedia[currentIndexMedia];
    displayLightbox(mediaSelected);
}

init();

