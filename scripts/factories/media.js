import { openModal } from "../utils/modalPhoto.js";


export function mediaFactory(data) {

  const { photographerId, image, video, id, alt } = data;
  const picture = `assets/mediaPhoto/${image}`;
  const mpp = `assets/mediaPhoto/${video}`;

  //Création des cards Média
  function getMediaCardDOM() {
    const a = document.createElement('a');
    a.setAttribute("class", "dbox", "photographer.html" + "?id=" + photographerId);
    a.setAttribute("src", picture);
    a.setAttribute("src", mpp);


    let media;


    //Créations des images pour la galerie
    if (data.image) {
      media = document.createElement('img');
      media.setAttribute("src", picture);
      media.setAttribute("tabindex", '0')
      media.setAttribute("alt", alt);
      media.addEventListener('click', openModal);
      media.addEventListener('keypress', openModal);
      media.setAttribute("id", "meddia");
      media.toggleAttribute('controls')

      //Créations des videos pour la galerie
    } else if (data.video) {
      media = document.createElement('video');
      const source = document.createElement('source');
      source.setAttribute("src", mpp);
      media.setAttribute("src", mpp);
      media.addEventListener('click', openModal);
      media.addEventListener('keypress', openModal);
      media.appendChild(source);
      media.setAttribute("alt", alt);
      //media.toggleAttribute('controls')
      media.setAttribute("id", "meddia");
    }
    //Elèments du DOM
    const cont = document.createElement('div');
    cont.setAttribute("data-id", id);
    cont.classList.add("mediaContainer");

    const img = document.createElement('img');
    img.setAttribute("src", picture);

    const tag = document.createElement('tag');
    tag.textContent = data.tagline;

    const f = document.createElement('footer');

    const h3 = document.createElement('h3');
    h3.textContent = data.title;
    h3.setAttribute("tabindex", '0')

    //Fonction qui incrémente le nombre de likes lorsque l'on clique sur l'icone coeur
    function IncremLikes() {

      numberLikes.textContent++;
    }

    const mediaLikes = document.createElement('div')
    mediaLikes.setAttribute("class", "medialikes");
    const iconLikes = document.createElement('div');
    iconLikes.classList.add("fas", "fa-heart");
    iconLikes.setAttribute("tabindex", '0')
    iconLikes.addEventListener('click', IncremLikes, { once: true });
    iconLikes.setAttribute("aria-label", "likes")

    let nbtotal;
    iconLikes.addEventListener('click', () => {
      nbtotal = document.querySelector('.nbTotalLikes')
      nbtotal = nbtotal.textContent++;
    })

    const numberLikes = document.createElement('div');
    numberLikes.setAttribute("class", "numberL");
    numberLikes.setAttribute("tabindex", '0')
    numberLikes.textContent = data.likes;

    //Incrémentation du nombre de likes lorsque l'on touche la touche "Entrée" sur l'icone coeur
    iconLikes.addEventListener("keypress", IncremLikes, { once: true });

    iconLikes.addEventListener('keypress', () => {
      nbtotal = document.querySelector('.nbTotalLikes')
      nbtotal = nbtotal.textContent++;
    })

    //Implémentation des élèments du DOM
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
