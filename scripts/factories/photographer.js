export function photographerFactory(data) {

    const { name, portrait, id } = data;
    const picture = `assets/photographers/${portrait}`;

    //Ajout des datas nécessaires d'un Photographe
    function getUserCardDOM() {

        const a = document.createElement('a');
        a.setAttribute("href", "photographer.html" + "?id=" + id);

        const article = document.createElement('article');
        
        const h1 = document.createElement('h1');
        h1.textContent = name;
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);

        const c = document.createElement('h2');
        c.textContent = data.city;
        const count = document.createElement('h3');
        count.textContent = data.city + ' , ' + data.country;
        const tag = document.createElement('tag');
        tag.textContent = data.tagline;
        const priceDay = document.createElement('p');
        priceDay.setAttribute("id", "priceDay");
        priceDay.textContent = data.price + '€/jour';

    //Implémentation des élèments dans le DOM

        a.appendChild(article);
        article.appendChild(img);
        article.appendChild(h1);
        article.appendChild(count);
        article.appendChild(tag);
        article.appendChild(priceDay); 

        return (a);
    }


    function getPhotographerCardDOM() {

        const p = document.querySelector(".photograph-header");
        const containerP =document.createElement('div');
        containerP.classList.add('containerP')
        const i = document.createElement('div');
        i.classList.add('infoP')
        const cont = document.createElement('div');
        cont.classList.add('contact')


        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");

        const h2 = document.createElement('h1');
        h2.textContent = name;
        const c = document.createElement('h2');
        c.textContent = data.city;
        const count = document.createElement('h2');
        count.classList.add('localisation')
        count.textContent = data.city + ' , ' + data.country;
        const tag = document.createElement('h3');
        tag.classList.add('citation')
        tag.textContent = data.tagline;

        const butt = document.querySelector("button");
        
    //Implémentation des élèments dans le DOM

        p.appendChild(containerP)
        
        containerP.appendChild(i);
        containerP.appendChild(cont);
        containerP.appendChild(img);
        
        cont.appendChild(butt);
        i.appendChild(h2);
        i.appendChild(count);
        i.appendChild(tag);
      

        return (containerP);

    }
    return { name, picture, getUserCardDOM, getPhotographerCardDOM }

}


