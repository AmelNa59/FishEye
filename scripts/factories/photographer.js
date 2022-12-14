export function photographerFactory(data) {

    //appeler la fonction display data

    const { name, portrait, id } = data;

    const picture = `assets/photographers/${portrait}`;


    function getUserCardDOM() {// on ajoute les datas que l'on veut
        const a = document.createElement('a');
        a.setAttribute("href", "photographer.html" + "?id=" + id);

        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture)

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const c = document.createElement('c');
        c.textContent = data.city;
        const count = document.createElement('count');
        count.textContent = data.city + ' , ' + data.country;
        const tag = document.createElement('tag');
        tag.textContent = data.tagline;
        const priceDay = document.createElement('p');
        priceDay.setAttribute("id", "priceDay");
        priceDay.textContent = data.price + '€/jour';

        const encartt = document.getElementsByClassName("encart");

        a.appendChild(article);
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(count);
        article.appendChild(tag);
        article.appendChild(priceDay);   //permet d'afficher


        return (a);
    }


    function getPhotographerCardDOM() {
        const p = document.querySelector(".photograph-header");
        const i = document.createElement('info');
        const cont = document.createElement('contact');


        const img = document.createElement('img');
        img.setAttribute("src", picture);

        const h2 = document.createElement('h2');
        h2.textContent = name;
        const c = document.createElement('c');
        c.textContent = data.city;
        const count = document.createElement('count');
        count.textContent = data.city + ' , ' + data.country;
        const tag = document.createElement('tag');
        tag.textContent = data.tagline;

        const butt = document.querySelector("button");

        p.appendChild(i);
        p.appendChild(cont);
        cont.appendChild(butt);
        i.appendChild(h2);
        i.appendChild(count);
        i.appendChild(tag);
        p.appendChild(img);



        return (p);

    }
    return { name, picture, getUserCardDOM, getPhotographerCardDOM }

}


