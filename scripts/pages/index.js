import {photographerFactory} from "../factories/photographer.js"
import {getPhotographers} from "../utils/client.js"

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();//renvoie un element du DOM
    console.log(userCardDOM);
    photographersSection.appendChild(userCardDOM);//on ajoute lelement à la section

});


};

async function init() {
// Récupère les datas des photographes
const { photographers, media } = await getPhotographers();// je recupere les donnees et je les attends , une fois que je les ai j'appel display data
displayData(photographers);
};

init();

