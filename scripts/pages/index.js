import { photographerFactory } from "../factories/photographer.js"
import { getPhotographers } from "../utils/client.js"

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        console.log(userCardDOM);
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers();
    displayData(photographers);

};

init();

