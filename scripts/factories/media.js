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
      media.setAttribute("onclick", "openModal()");
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

    const i = document.createElement('i');
    i.classList.add("fas", "fa-heart");

    const lik = document.createElement('likes');
    lik.textContent = data.likes;

    const tle = document.createElement('h3');
    tle.textContent = data.title;

    const pr = document.createElement('price');
    pr.textContent = data.price;

    pm.appendChild(a);
    pm.appendChild(cont);
    a.appendChild(cont);
    cont.appendChild(gal);
    gal.appendChild(media);

    cont.appendChild(f);
    f.appendChild(tle);
    f.appendChild(lik);
    f.appendChild(i);
    return (pm);

  }

  return { picture, mpp, getMediaCardDOM };

}

