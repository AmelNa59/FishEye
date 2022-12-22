import { getPhotographers } from "../utils/client.js";
import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";


//Récupération de l'id du Photographe
const queryString_url_id = window.location.search;
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("id");

//Récupération des infos liées au Photographe
async function displayData(photographer) {
    const photographerSection = document.querySelector(".photograph-header");
    const photographerModel = photographerFactory(photographer);
    const photographerCardDOM = photographerModel.getPhotographerCardDOM();
};

//Affiche la galerie média de chaque photographe
async function displayMedia(gallery) {

    const mediaSection = document.querySelector(".photograph-media");
    gallery.forEach(media => {
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaCardDOM.addEventListener("click", displayModal);
        mediaSection.appendChild(mediaCardDOM);
    })
}

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
        medias.setAttribute("src", `assets/videos/${media.video}`);
        medias.toggleAttribute('controls')
        medias.addEventListener('mouseover', () => {
            medias.play();
        })
        medias.addEventListener('mouseout', () => {
            medias.pause();
        })
        medias.appendChild(source);
        content.appendChild(medias);
    }
    const h3 = document.createElement("h3");
    h3.textContent = media.title;
    content.appendChild(h3);
}

/**
 * Récupère l'id du media sélectionné et l'affiche dans la Lightbox
 * 
 * @param {object} event 
 */
function displayModal(event) {

    const parent = event.target.closest('.mediaContainer');
    const mediaID = parent.getAttribute('data-id');
    currentIndexMedia = mymedia.findIndex(m => m.id == mediaID);
    const mediaSelected = mymedia[currentIndexMedia];
    displayLightbox(mediaSelected);
}

let mymedia;
let currentIndexMedia;
export async function init() {

    // Récupère les datas des photographes
    const { photographers, media,name } = await getPhotographers();
    const photographer = photographers.find(p => p.id == id);
    const nomPhotogInfo = document.querySelector('.modalInfo');
    const namePhotoInfo = document.createElement('p');

    namePhotoInfo.textContent = photographer.name;
    namePhotoInfo.setAttribute("class", "namePhotoInfo")
    nomPhotogInfo.appendChild(namePhotoInfo);
    //Affiche l'encart avec les infos(likes+prix par jour)
    const encartLikes = document.querySelector(".encart");
    encartLikes.innerHTML = "";



    const contentPrice = document.createElement('p');
    contentPrice.textContent = photographer.price + '€ / jour';
    contentPrice.setAttribute("class", "pricePerDay")
    encartLikes.appendChild(contentPrice)

    mymedia = media.filter(function (elmt) {
        return (elmt.photographerId == id);
    })

    //  Infos Lightbox
        
    let currentIndexMedia = 0;
        //Next média
    function nextMedia() {
        if (currentIndexMedia < mymedia.length - 1) {
            currentIndexMedia += 1;
            displayLightbox(mymedia[currentIndexMedia]);
        }
        else {
            currentIndexMedia = 0;
        }
    }
        
    const lightbox = document.querySelector('dialog')
    const rightArrow = lightbox.querySelector('.fa-chevron-right')
    rightArrow.addEventListener('click', nextMedia);
    rightArrow.setAttribute("aria-label", "Next image")

        //Previous média
    function prevMedia() {
        if (currentIndexMedia == 0) {
            currentIndexMedia = mymedia.length - 1
            displayLightbox(mymedia[currentIndexMedia]);
        }
        else {
            currentIndexMedia -= 1;
            displayLightbox(mymedia[currentIndexMedia]);
        }
    }

    const leftArrow = lightbox.querySelector('.fa-chevron-left')
    leftArrow.addEventListener('click', prevMedia);
    leftArrow.setAttribute("aria-label", "Previous image")

    //Ferme la modal Formulaire Contact
    function closeModal() {
        document.getElementById("lightbox").style.display = "none";
    }
    const closeButton = lightbox.querySelector('.fa-times')
    closeButton.addEventListener('click', closeModal);
    closeButton.setAttribute("aria-label", "Close dialog")

    displayData(photographer);
    displayMedia(mymedia);
    updateLikes();

    //Accessibilité: Lightbox(Arrows)+close Form,Lightbox(Esc)
    document.onkeydown = checkKey;

    function checkKey(e) {

        e = e || window.event;

        if (e.keyCode == '37') {
            prevMedia()
        }
        else if (e.keyCode == '39') {
            //right arrow
            nextMedia()
            displayMedia()
        } else if (e.keyCode == '27') {
            closeModal()
            closeForm()
        }
    }
};

//Tri des médias (SELECT)

    //Tri par Date
const sortDate = document.getElementById("filter_date");

function updateValueDate() {

    document.querySelector(".photograph-media").innerHTML = "";
    mymedia.sort(function compare(a, b) {
        if (a.date < b.date)
            return -1;
        if (a.date > b.date)
            return 1;
        return 0;
    })
    displayMedia(mymedia);
}
sortDate.addEventListener('click', updateValueDate);

    //Tri par titre

const sortTitle = document.getElementById('filter_titre');

function updateValueTitle() {
    document.querySelector(".photograph-media").innerHTML = "";
    mymedia.sort(function (a, b) {
        if (a.title < b.title)
            return -1;
        if (a.title > b.title)
            return 1;
        return 0;
    });
    displayMedia(mymedia);
}
sortTitle.addEventListener("click", updateValueTitle);

    //Tri par Popularité

function updateValueLikes() {

    document.querySelector(".photograph-media").innerHTML = "";
    mymedia.sort(function compare(a, b) {

        if (a.likes > b.likes)
            return -1;
        if (a.likes < b.likes)
            return 1;
        return 0;
    });
    displayMedia(mymedia);
}
const sortLikes = document.getElementById('filter_pop');
sortLikes.addEventListener('click', updateValueLikes);

//Affiche le nombre de likes dans l'encart
export function updateLikes() {
    let nbLikes = 0;
    mymedia.forEach(media => nbLikes += media.likes);

    const encartLikes = document.querySelector(".encart");
    const divLikes = document.createElement("div");
    divLikes.setAttribute('class', 'divLikes')
    encartLikes.appendChild(divLikes);


    const contentLikes = document.createElement('p');
    contentLikes.setAttribute("class", "nbTotalLikes")
    contentLikes.textContent = `${nbLikes}`;

    const iconLikes = document.createElement('div');
    iconLikes.classList.add("fas", "fa-heart");
    divLikes.appendChild(contentLikes);
    divLikes.appendChild(iconLikes)

    //Accessibilité:Touché Enter pour choisir le tri
const selectEnter = document.querySelector('.photographer_elements');
selectEnter.addEventListener('keypress', updateValueLikes);
}

//MODALE Formulaire
const form = document.getElementById('bg-modal');

function openForm() {
    
    form.style.display = 'block'
}

function closeForm() {

    form.style.display = 'none'
}

const btnOpenForm = document.getElementById('openButtonForm');
btnOpenForm.addEventListener('click', openForm);

const closeFormByButton = document.querySelector(".closeFormModal");
closeFormByButton.addEventListener('click', closeForm);

const closeFormBySubmit = document.querySelector("#send");
closeFormBySubmit.addEventListener('click', closeForm);

init();



