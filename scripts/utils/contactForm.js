
const formulaire = document.getElementById("form");

//DONNEES et VALIDATION FORMULAIRE

formulaire.addEventListener('submit',function(event){
  event.preventDefault();

  const first = document.getElementById('prenom').value;


  const last = document.getElementById('nom').value;
 
  const email = document.getElementById('email').value;


  const message = document.getElementById('msg').value;

   console.log(first,last, email, message);

})

