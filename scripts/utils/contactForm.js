
const formulaire = document.getElementById("form");
  function masquerformulaire() {

    formulaire.style.display = 'none';
  
  }
//DONNEES et VALIDATION FORMULAIRE



formulaire.addEventListener('submit',function(event){

  var first = document.getElementById('prenom').value;


  var last = document.getElementById('nom').value;
 
  var email = document.getElementById('email').value;


  var message = document.getElementById('msg').value;

   console.log(first,last, email, message);

})

