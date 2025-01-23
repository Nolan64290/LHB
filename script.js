// All
//====

// Fonction qui gère l'affichage des différentes pages
function showSection(sectionId) {
    // Sélectionner toutes les sections
    const sections = document.querySelectorAll('section');
    // Masquer toutes les sections
    sections.forEach((section) => {section.classList.remove('active');});
    // Afficher la section demandée
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add('active');
    // Aller à la section demandée
    if(screen.width <=600){
        state = 0;
        toggleMenu();
    } else {
        window.scrollTo({top: activeSection.offsetTop, behavior: 'smooth'});
    }
}

// Fonction toggleMenu :
// Fonction qui gère le menu en mode responsive
let state = 1;
let club = document.getElementById("club-bt");
let actus = document.getElementById("actus-bt");
let calendrier = document.getElementById("calendrier-bt");
let galerie = document.getElementById("galerie-bt");
let boutique = document.getElementById("boutique-bt");
let contact = document.getElementById("contact-bt");

function toggleMenu() {
    console.log("toggle Menu :")
  if(state == 1){
    console.log("toggle1");
    // club.firstChild.style.display = "block";
    actus.firstChild.style.display = "block";
    calendrier.firstChild.style.display = "block";
    galerie.firstChild.style.display = "block";
    boutique.firstChild.style.display = "block";
    contact.firstChild.style.display = "block";
    club.style.height = "100%";
    actus.style.height = "100%";
    calendrier.style.height = "100%";
    galerie.style.height = "100%";
    boutique.style.height = "100%";
    contact.style.height = "100%";
    club.style.padding = "2% 0%";
    actus.style.padding = "2% 0%";
    calendrier.style.padding = "2% 0%";
    galerie.style.padding = "2% 0%";
    boutique.style.padding = "2% 0%";
    contact.style.padding = "2% 0%";
    club.style.opacity = "1";
    actus.style.opacity = "1";
    calendrier.style.opacity = "1";
    galerie.style.opacity = "1";
    boutique.style.opacity = "1";
    contact.style.opacity = "1";
    state = 0;
  } else {
    console.log("toggle2");
    club.style.height = "0";
    club.style.padding = "0";
    club.style.opacity = "0";
    actus.style.height = "0";
    actus.style.padding = "0";
    actus.style.opacity = "0";
    calendrier.style.height = "0";
    calendrier.style.padding = "0";
    calendrier.style.opacity = "0";
    galerie.style.height = "0";
    galerie.style.padding = "0";
    galerie.style.opacity = "0";
    boutique.style.height = "0";
    boutique.style.padding = "0";
    boutique.style.opacity = "0";
    contact.style.height = "0";
    contact.style.padding = "0";
    contact.style.opacity = "0";
    // club.firstChild.style.display = "none";
    actus.firstChild.style.display = "none";
    calendrier.firstChild.style.display = "none";
    galerie.firstChild.style.display = "none";
    boutique.firstChild.style.display = "none";
    contact.firstChild.style.display = "none";
    state = 1;
  }
}


// Accueil
//========
let index = 1;
// Fonction permettant de déplier le programme du WE
function programme() {
    var div = document.getElementById("toggle-div");
    if (index === 1) {
        div.classList.add('expanded');
        index = 2;
    } else if (index === 2) {
        div.classList.remove('expanded')
        index = 1;
    }
}


// Equipes et Calendrier
//======================
// Equipe va de 0 à 100 et Calendrier de 101 à +200
// Changediv récupère le numéro de la div à afficher et en fonction de val
// il modifie la partie qu'il faut sans modifier l'autre

currentDivIndexEquipes = 0;
currentDivIndexCalendrier = 101;
function changeDiv(n, val) { // val étant la valeur pour savoir si c'est calendrier ou equipe
    console.log(val);
    if (val == 0){
        var currentDiv = document.getElementById(currentDivIndexEquipes);
        currentDiv.classList.remove('currentDiv');
        currentDivIndexEquipes = n;
        var newCurrentDiv = document.getElementById(currentDivIndexEquipes);
        newCurrentDiv.classList.add('currentDiv');
    } else {
        var currentDiv = document.getElementById(currentDivIndexCalendrier);
        currentDiv.classList.remove('currentDiv');
        currentDivIndexCalendrier = n;
        var newCurrentDiv = document.getElementById(currentDivIndexCalendrier);
        newCurrentDiv.classList.add('currentDiv');
    }
}


// Contact (à revoir)
//===================
// Envoie de formulaire
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher le formulaire de soumettre de manière traditionnelle
    var formData = new FormData(event.target);
    var data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    fetch('https://example.com/send-email', { //http://localhost:3000/send-email
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            alert('Message envoyé avec succès !');
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Il y a eu un problème avec l\'envoi du message.');
        });
});