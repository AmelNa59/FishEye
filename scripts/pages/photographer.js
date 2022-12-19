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
    console.log(gallery);
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
        medias.setAttribute("src", `assets/photos/${media.video}`);
        medias.addEventListener('mouseover',()=>{
        medias.play();})
        medias.addEventListener('mouseout',()=>{
            medias.pause();})
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
    console.log('init');
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers();
    const photographer = photographers.find(p => p.id == id);
    //recupere tous les médias d'un photographe depuis son Id
    mymedia = media.filter(function (elmt) {
        return (elmt.photographerId == id);
    })

    const nomPhotogInfo = document.querySelector('.modalInfo');
    const namePhotoInfo= document.createElement('p');
    namePhotoInfo.textContent=photographer.name;
    nomPhotogInfo.appendChild(namePhotoInfo)
    // NEXTMEDIA
    let currentIndexMedia = 0;

    function nextMedia() {
       if(currentIndexMedia < mymedia.length -1)
       {

        currentIndexMedia += 1;
        displayLightbox(mymedia[currentIndexMedia]);
       }
       else
       {
        currentIndexMedia =0;
       }
          
    }
  
    const lightbox = document.querySelector('dialog')
    const rightArrow = lightbox.querySelector('.fa-chevron-right')
    rightArrow.addEventListener('click', nextMedia);
    rightArrow.setAttribute("aria-label", "Next image")

    
    document.addEventListener('keyup',()=>{
        console.log('touche next')
        nextMedia();
     })


  //PREVMEDIA
  function prevMedia() {
  
    if(currentIndexMedia== 0)
    {
        currentIndexMedia = mymedia.length -1
       displayLightbox(mymedia[currentIndexMedia]);
  
    }
    else 
    {
        currentIndexMedia -= 1;
        displayLightbox(mymedia[currentIndexMedia]);
  
    }
       
}
const leftArrow = lightbox.querySelector('.fa-chevron-left')
leftArrow.addEventListener('click', prevMedia);
leftArrow.setAttribute("aria-label", "Previous image")


    //CLOSEMODAL
    function closeModal() {
        document.getElementById("lightbox").style.display = "none";
    }
    const closeButton = lightbox.querySelector('.fa-times')
    closeButton.addEventListener('click', closeModal);
    closeButton.setAttribute("aria-label", "Close dialog")



    displayData(photographer);
    console.log(mymedia);
    displayMedia(mymedia);

    updateLikes();

};
 //TRIAGE PAR DATE

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

 //TRIAGE PAR TITLE
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


 //tri Popularité
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

export function updateLikes(){
    let nbLikes = 0;
    mymedia.forEach(media =>nbLikes += media.likes
    );
    console.log(nbLikes);

    const encartLikes = document.querySelector(".encart");
encartLikes.innerHTML="";
const contentLikes=document.createElement('p');
contentLikes.textContent = `${nbLikes}`;
encartLikes.appendChild(contentLikes);

    }

    const form = document.getElementById('bg-modal');
  function openForm(){

  form.style.display = 'block'
  }

  function closeForm(){

    form.style.display = 'none'
    }

const btnOpenForm = document.getElementById('openButtonForm');
btnOpenForm.addEventListener('click',openForm);

const closeFormByButton = document.querySelector(".closeFormModal");
closeFormByButton.addEventListener('click',closeForm);

/*const closeFormBySubmit = document.querySelector("#send");
closeFormBySubmit.addEventListener('click',closeForm);*/

init();


//const selectTri = document.getElementsByClassName("photographer_elements")[0];

//selectTri.addEventListener('change', (event) => console.log(event.target.value));


