import { getPhotographers } from "../utils/client.js";

import {photographerFactory} from "../factories/photographer.js"

import {mediaFactory} from "../factories/media.js"


const queryString_url_id =window.location.search;
console.log(queryString_url_id);

const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

const id = urlSearchParams.get("id");
console.log(id);


async function displayData(photographer) {
   const photographerSection = document.querySelector(".photograph-header");
    const photographerModel = photographerFactory(photographer);
    const photographerCardDOM = photographerModel.getPhotographerCardDOM();//renvoie un element du DOM
    console.log(photographerCardDOM);
  photographerSection.appendChild(photographerCardDOM );
//on ajoute lelement à la section

};
async function displayMedia(gallery) {

const mediaSection = document.querySelector(".photograph-media");
    const mediaModel = mediaFactory(gallery);
    const mediaCardDOM = mediaModel.getMediaCardDOM();//renvoie un element du DOM
    console.log(mediaCardDOM);
    mediaSection.appendChild(mediaCardDOM);//on ajoute lelement à la section
    gallery.sort();
    displayMedia(gallery);
}


export async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers();// je recupere les donnees et je les attends , une fois que je les ai j'appel display data
       //recupere un photographe depuis son Id
    const photographer = photographers.find(p =>p.id == id);
    //recupere tous les médias d'un photographe depuis son Id
    const gallery = media.filter(function(elmt){
        return (elmt.photographerId == id);
    })

console.log(photographer);
console.log(gallery);

//Boucle For pour afficher toutes les donnees de la galerie d'un photographe
for (const item of gallery){
    console.log(item);
    displayMedia(item);
  
}

displayData(photographer);

};




init();

