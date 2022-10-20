export function mediaFactory(data) { 
    
const {photographerId,image,video} = data;
//GALERY
const picture =`assets/photos/${image}`;
const mpp=`assets/photos/${video}`;

    function getMediaCardDOM() {

  const a = document.createElement('a');
  a.setAttribute("class","dbox", "photographer.html" + "?id=" +photographerId);
  a.setAttribute("src",picture);

  let media;
  //IMAGES
if(data.image){
  media = document.createElement('img');
  media.setAttribute("src",picture);
  media.setAttribute("onclick","openModal()");


  //VIDEOS
 
}else if(data.video){

  media = document.createElement('video');
  const source = document.createElement('source');
  source.setAttribute("src",mpp);
  media.appendChild(source);
}





  const pm = document.querySelector(".photograph-media");

  const cont = document.createElement('container');
 
  const gal = document.createElement('galery'); 

  const f = document.createElement('footer');

  const i= document.createElement('i');
  i.classList.add("fas","fa-heart");

  const lik = document.createElement('likes');
    lik.textContent = data.likes;

  const tle = document.createElement('h3');
    tle.textContent = data.title;

  const pr = document.createElement('price');
    pr.textContent = data.price;


/*MODAL*/

/*const modalPhoto = document.createElement("myModal");

const span =document.createElement('fermer');
span.innerHTML="<span>X</span>"
span.setAttribute("onclick","closeModal()");

const modalContent = document.createElement("modal-content");

const slides = document.getElementsByClassName('mySlides');

const medias = document.getElementsByClassName('hover-shadow');
*/
/*const picture2 =`assets/photos/${image}`;
const mpp2 =`assets/photos/${video}`;
console.log(picture2);
const pic= document.createElement('pic');
pic.setAttribute("src",picture2);
pic.setAttribute("src",mpp2);
*/
   pm.appendChild(a);
   pm.appendChild(cont);
   a.appendChild(cont);
   cont.appendChild(gal);
  gal.appendChild(media);

   cont.appendChild(f);
   f.appendChild(tle);
    f.appendChild(lik);
    f.appendChild(i);

  /*  modalPhoto.appendChild(modalContent);
    modalContent.appendChild(span);*/
   

   

    return (pm);

}
return {picture,mpp,getMediaCardDOM};




}

