export async function getPhotographers() {
    return await fetch('data/photographers.json')
        .then(reponse => reponse.json())

}
