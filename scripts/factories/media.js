import { openModal } from "../utils/modalPhoto.js";
import { photographerFactory } from "../factories/photographer.js";
import { init } from "../pages/photographer.js";
import { updateLikes} from "../pages/photographer.js";

export function mediaFactory(data) {

  const { photographerId, image, video, id} = data;


  //GALERY
  const picture = `assets/photos/${image}`;
  const mpp = `assets/photos/${video}`;


  function getMediaCardDOM() {

    const a = document.createElement('a');
    a.setAttribute("class", "dbox", "photographer.html" + "?id=" + photographerId);
    a.setAttribute("src", picture);

    let media;
    //IMAGES
    if (data.image) {
      media = document.createElement('img');
      media.setAttribute("src", picture);
      media.addEventListener('click', openModal); // Implémenté ici
      media.setAttribute("id", "meddia");

      //VIDEOS

    } else if (data.video) {

      media = document.createElement('video');
      const source = document.createElement('source');
      source.setAttribute("src", mpp);
      media.addEventListener('click', openModal);
      media.appendChild(source);
      media.toggleAttribute('controls')
      media.setAttribute("id", "meddia");
    }
    //DOM

    const cont = document.createElement('div');
    cont.setAttribute("data-id", id);
    cont.classList.add("mediaContainer");

    const img = document.createElement('img');
    img.setAttribute("src", picture);
    //img.setAttribute("alt", h3)

    const tag = document.createElement('tag');
    tag.textContent = data.tagline;


    const f = document.createElement('footer');
 
 function IncremLikes() {
 numberLikes.textContent ++;

    }
    const mediaLikes = document.createElement('div')
    mediaLikes.setAttribute("class","medialikes");
    const iconLikes = document.createElement('div');
    iconLikes.classList.add("fas", "fa-heart");
    iconLikes.addEventListener('click',IncremLikes, { once: true });
    iconLikes.setAttribute("aria-label","likes")

    const h3 = document.createElement('h3');
    h3.textContent = data.title;
    //const pr = document.createElement('div');
    //pr.textContent = data.price;
    let nbtotal;
  iconLikes.addEventListener('click',()=>{
 nbtotal = document.querySelector('.nbTotalLikes')
 nbtotal=nbtotal.textContent++;
    })
    const numberLikes = document.createElement('div');
    numberLikes.setAttribute("class", "numberL");
    numberLikes.textContent = data.likes;


   
    cont.appendChild(a);
   cont.appendChild(media);

    cont.appendChild(f);
    f.appendChild(h3);
    f.appendChild(mediaLikes);
    mediaLikes.appendChild(numberLikes);
    mediaLikes.appendChild(iconLikes)


    return (cont);

  }


  return { picture, mpp, getMediaCardDOM };

}
