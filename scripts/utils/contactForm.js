function displayModal() {
  const modal = document.getElementById("contact_modal");
modal.style.display = "block";

}


//DONNEES et VALIDATION FORMULAIRE

const modal = document.getElementById("contact_modal");

var val = document.getElementById('send');

var first = document.getElementById('prenom');

var last = document.getElementById('nom');

var email = document.getElementById('email');

var message = document.getElementById('msg');

var preVaL = document.getElementById('prenomval');

var nomVaL = document.getElementById('nomval');

var emailVaL = document.getElementById('emailval');



function f_valid(e) {

e.preventDefault();

if (first.validity.valueMissing) {
  e.preventDefault();
  preVaL.setAttribute('data-error-visible', true);
 preVaL.setAttribute('data-error', 'Vous devez saisir votre prenom');
  first.focus();
  results.push(false);
}

if (last.validity.valueMissing) {
  e.preventDefault();
  nomVaL.setAttribute('data-error-visible', true);
  nomVaL.setAttribute('data-error', 'Vous devez saisir votre nom');
  last.focus();
  results.push(false);
}


if (email.validity.valueMissing) {
  e.preventDefault();
  emailVaL.setAttribute('data-error-visible', true);
  emailVaL.setAttribute('data-error', 'Vous devez saisir votre adresse email');
  email.focus();
  results.push(false);
}
if (message.validity.valueMissing) {
  e.preventDefault();
  message.focus();
  results.push(false);
}


if (results.every(e => e)) {
  // envoi le formulaire
  masquerformulaire();

}

}

function masquerformulaire() {

const masquerform = document.getElementById("contact_modal").style.display = 'none';

}

//val.addEventListener('click', f_valid());
