export async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json

    return await fetch('data/photographers.json')
        .then(reponse => reponse.json())

}
