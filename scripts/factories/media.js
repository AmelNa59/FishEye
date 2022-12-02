import { openModal } from "../utils/modalPhoto.js";
import { photographerFactory } from "../factories/photographer.js";
import { init } from "../pages/photographer.js";

export function mediaFactory(data) {

  const { photographerId, image, video, id } = data;


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
      media.appendChild(source);
      media.setAttribute("id", "meddia");
    }
    //DOM

    const pm = document.querySelector(".photograph-media");

    const cont = document.createElement('container');
    cont.setAttribute("data-id", id);

    const img = document.createElement('img');
    img.setAttribute("src", picture);

    const tag = document.createElement('tag');
    tag.textContent = data.tagline;

    const gal = document.createElement('galery');

    const f = document.createElement('footer');

    function IncremLikes() {
      numberLikes.textContent++;

    }

    const iconLikes = document.createElement('div');
    iconLikes.classList.add("fas", "fa-heart");
    iconLikes.addEventListener('click', IncremLikes, { once: true });


    const numberLikes = document.createElement('div');
    numberLikes.setAttribute("class", "numberL");
    numberLikes.textContent = data.likes;

    const h3 = document.createElement('h3');
    h3.textContent = data.title;
    //const pr = document.createElement('div');
    //pr.textContent = data.price;

    const enc = document.createElement("div");

    enc.setAttribute("class", "encart")
    const ppp = document.createElement("p");
    ppp.setAttribute("id", "accueil");




    pm.appendChild(a);
    pm.appendChild(cont);
    pm.appendChild(enc);



    a.appendChild(cont);
    cont.appendChild(gal);
    gal.appendChild(media);


    cont.appendChild(f);
    f.appendChild(h3);
    f.appendChild(numberLikes);

    enc.appendChild(ppp);



    return (pm);

  }


  return { picture, mpp, getMediaCardDOM };

}
