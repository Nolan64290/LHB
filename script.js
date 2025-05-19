/*
    1. Changement de section
    2. Gestion du menu de navigation
    3. Accueil
    4. Equipes et Calendrier
    5. Téléchargement de favoris
    6. Formulaire de contact (à revoir)
    7. Gestion de la gallerie
    8. Espace reservé
    9. Newsletter
*/

// ================================================================================================================
// Fonction changement de section :
// ================================================================================================================
// Fonction qui gère l'affichage des différentes pages
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.classList.remove('active'));
    
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add('active');

    // Vérifier si on est sur mobile et forcer la fermeture du menu
    if ((screen.width <= 767) || (window.innerWidth <= 767)) {
        setTimeout(() => {
            if (state === 0) { // S'assurer que le menu est ouvert avant de tenter de le fermer
                toggleMenu();
            }
        }, 100); // Petite pause pour éviter un conflit d'événements
    } else {
        window.scrollTo({ top: activeSection.offsetTop, behavior: 'smooth' });
        // Pour enlever le déplacement au top de la section
        // window.scrollTo({ top: none, behavior: 'smooth' });
    }
}

// Script qui gère le bug de l'auto-scroll
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
    });
});



// ================================================================================================================
// Gestion du Menu de navigation :
// ================================================================================================================
// Fonction qui permet de désactiver le bouton 'le club' en mode pc
document.addEventListener("DOMContentLoaded", function () {
    let clubButton = document.getElementById("club-a-bt");
    function updateClubButton() {
        if (window.innerWidth > 767) { // Si écran PC
            clubButton.removeAttribute("onclick"); // Supprime l'événement de clic
        } else { // Si mobile
            clubButton.setAttribute("onclick", "toggleSousMenu()");
        }
    }
    // Exécuter au chargement
    updateClubButton();
    // Mettre à jour quand on redimensionne la fenêtre
    window.addEventListener("resize", updateClubButton);
});

// Fonction qui gère le menu en mode responsive
let state = 1;
let stateS = 1;
let sous_nav = document.getElementById("sous-nav");
let hitsoire = document.getElementById("histoire-bt");
let bureau = document.getElementById("bureau-bt");
let equipes = document.getElementById("equipes-bt");
let objectifs = document.getElementById("objectifs-bt");
let licence = document.getElementById("licence-bt");
let partenaires = document.getElementById("partenaires-bt");
let club = document.getElementById("club-bt");
let club_a = document.getElementById("club-a-bt");
let actus = document.getElementById("actus-bt");
let calendrier = document.getElementById("calendrier-bt");
let galerie = document.getElementById("galerie-bt");
let boutique = document.getElementById("boutique-bt");
let contact = document.getElementById("contact-bt");

// Toggle Menu :
function toggleMenu() {
    let menu = document.querySelector(".menu ul");
    let sousMenu = document.getElementById("sous-nav");
    let club = document.getElementById("club-bt");
    let onglets = document.querySelectorAll(".onglet:not(#club-bt)"); // Tous les onglets sauf "Le Club"

    if (state == 1) {
        menu.classList.add("menu-ouvert");
        state = 0;
    } else {
        menu.classList.remove("menu-ouvert");

        // Fermer le sous-menu en même temps
        sousMenu.classList.remove("sous-menu-ouvert");
        club.classList.remove("sous-menu-ouvert");
        onglets.forEach(onglet => onglet.style.display = "block"); // Réafficher les autres onglets
        stateS = 1; // Remettre l'état du sous-menu à fermé

        state = 1;
    }
}

function toggleSousMenu() {
    let sousMenu = document.getElementById("sous-nav");
    let club = document.getElementById("club-bt");
    let onglets = document.querySelectorAll(".onglet:not(#club-bt)"); // Tous les onglets sauf "Le Club"

    if (stateS == 1) {
        sousMenu.classList.add("sous-menu-ouvert");
        club.classList.add("sous-menu-ouvert");
        onglets.forEach(onglet => onglet.style.display = "none"); // Cache les autres onglets
        stateS = 0;
    } else {
        sousMenu.classList.remove("sous-menu-ouvert");
        club.classList.remove("sous-menu-ouvert");
        onglets.forEach(onglet => onglet.style.display = "block"); // Réaffiche les onglets
        stateS = 1;
    }
}



// ================================================================================================================
// Accueil
// ================================================================================================================
// Fonction permettant de déplier le programme du WE
let index = 1;
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
// Affichage aléatoire de sponsors
// Liste des images disponibles dans le dossier
const sponsorImages = [
    "assets/partenaires/aluminium habitat.jpg",
    "assets/partenaires/AC THERMIQUE.jpg",
    "assets/partenaires/amc lavage serrois.jpg",
    "assets/partenaires/andré paillas.jpg",
    "assets/partenaires/atelier-ossau.png",
    "assets/partenaires/auberge la promenade.jpg",
    "assets/partenaires/ATOL.jpg",
    "assets/partenaires/autosur.jpg",
    "assets/partenaires/bearn incendie.jpg",
    "assets/partenaires/bidart.jpg" ,
    "assets/partenaires/bordenave électricité.jpg" ,
    "assets/partenaires/boérie.jpg" ,
    "assets/partenaires/bricomarché_oloron.jpg" ,
    "assets/partenaires/buso.jpg" ,
    "assets/partenaires/camping belair.jpg" ,
    "assets/partenaires/carrey.jpg" ,
    "assets/partenaires/carrosserie-du-piemont.jpg" ,
    "assets/partenaires/cass auto vigneai.jpg" ,
    "assets/partenaires/cba_materiaux.jpg" ,
    "assets/partenaires/Centre de formation ac Fam.jpg" ,
    "assets/partenaires/CER les gaves.png.jpg" ,
    "assets/partenaires/Chouette peinture.jpg" ,
    "assets/partenaires/citroen.jpg" ,
    "assets/partenaires/clément pairault.jpg" ,
    "assets/partenaires/clement-servat.jpg" ,
    "assets/partenaires/coiffure mode conseil.jpg" ,
    "assets/partenaires/Déchetterie.jpg" ,
    "assets/partenaires/d'oc charpente.jpg" ,
    "assets/partenaires/euromagri.jpg" ,
    "assets/partenaires/Garage monteiro.jpg" ,
    "assets/partenaires/groupama gan.jpg" ,
    "assets/partenaires/guiraud.jpg" ,
    "assets/partenaires/hangar a 2 roues.jpg" ,
    "assets/partenaires/informatique FLORENT MIRO.jpg" ,
    "assets/partenaires/labat.jpg" ,
    "assets/partenaires/lacau.jpg" ,
    "assets/partenaires/Lacayrelle.jpg" ,
    "assets/partenaires/lagardere.jpg" ,
    "assets/partenaires/Le fournil de lasseube.jpg" ,
    "assets/partenaires/le tire bouchon.jpg" ,
    "assets/partenaires/les viandes du haut bearn.jpg" ,
    "assets/partenaires/l'escapade.jpg" ,
    "assets/partenaires/l'hair naturel.jpg" ,
    "assets/partenaires/LIENNE STEPHANE.jpg" ,
    "assets/partenaires/lopez.jpg" ,
    "assets/partenaires/macon yannick lassalle-001.jpg" ,
    "assets/partenaires/manutech-Logo.jpg" ,
    "assets/partenaires/Pedelaborde.jpg" ,
    "assets/partenaires/phillippe fleur.png.jpg" ,
    "assets/partenaires/point P.jpg" ,
    "assets/partenaires/pompes-funebres-lassalle.jpg" ,
    "assets/partenaires/sanguinet élagage.jpg" ,
    "assets/partenaires/serrurerie-industrie.jpg" ,
    "assets/partenaires/SOTRAVOS.jpg" ,
    "assets/partenaires/tardos maçonnerie.jpg" ,
    "assets/partenaires/technique tele Ent pon.jpg" ,
    "assets/partenaires/terrassement bourdet.jpg" ,
    "assets/partenaires/transport peyroutet.jpg" ,
    "assets/partenaires/transports mathieu.jpg" ,
    "assets/partenaires/valentine.jpg" ,
    "assets/partenaires/vitrage auto béarn.jpg" ,
    "assets/partenaires/Loustau sarl.jpg" ,
    "assets/partenaires/soubercaze.jpg" ,
    "assets/partenaires/bourdet pees.jpg" ,
    "assets/partenaires/kremer.jpg" ,
    "assets/partenaires/vival lasseube.jpg" ,
    "assets/partenaires/tpo.png" ,
    "assets/partenaires/informatic.jpg" ,
    "assets/partenaires/couralis.jpg" ,
];  

// Fonction pour choisir des images aléatoires
function getRandomSponsors(images, count) {
    const selected = [];
    const usedIndices = new Set();
    while (selected.length < count && usedIndices.size < images.length) {
            const randomIndex = Math.floor(Math.random() * images.length);

            if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex);
            selected.push(images[randomIndex]);
            }
    }
    return selected;
}
// Sélectionnez 4 images aléatoires
const randomSponsors = getRandomSponsors(sponsorImages, 4);
// Appliquez les images aux balises <img>
randomSponsors.forEach((image, index) => {
    const sponsorImg = document.getElementById(`sponsor${index + 1}`);
    sponsorImg.src = image;
});
  


// ================================================================================================================
// Equipes et Calendrier
// ================================================================================================================
// Equipe va de 0 à 100 et Calendrier de 101 à +200
// Changediv récupère le numéro de la div à afficher et en fonction de val
// il modifie la partie qu'il faut sans modifier l'autre

var currentDivIndexEquipes = 0;
var currentDivIndexCalendrier = 101;
function changeDiv(n, val) { // val étant la valeur pour savoir si c'est calendrier ou equipe
    console.log(val);
    if (val == 0){
        var currentDiv = document.getElementById(currentDivIndexEquipes);
        currentDiv.classList.remove('currentDiv');
        currentDivIndexEquipes = n;
        // console.log(currentDivIndexEquipes);
        var newCurrentDiv = document.getElementById(currentDivIndexEquipes);
        newCurrentDiv.classList.add('currentDiv');
    } else {
        var currentDiv = document.getElementById(currentDivIndexCalendrier);
        currentDiv.classList.remove('currentDiv');
        currentDivIndexCalendrier = n;
        // console.log(currentDivIndexCalendrier);
        var newCurrentDiv = document.getElementById(currentDivIndexCalendrier);
        newCurrentDiv.classList.add('currentDiv');
    }
}



// ================================================================================================================
// Téléchargement de favoris :
// ================================================================================================================
function generateBookmarks() {
    const checkboxes = document.querySelectorAll('#favorites-form input[type="checkbox"]:checked');
    let html = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
                <!-- Automatically generated by club tool -->
                <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
                <TITLE>Mes favoris FFBB</TITLE>
                <H1>Mes favoris FFBB</H1>
                <DL><p>`;
    checkboxes.forEach(cb => {
        html += `<DT><A HREF="${cb.value}" ADD_DATE="${Math.floor(Date.now() / 1000)}">${cb.parentElement.innerText}</A>\n`;
    });
    html += '</DL><p>';
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'favoris-ffbb.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}



// ================================================================================================================
// Formulaire de contact (à revoir) :
// ================================================================================================================
// Envoie de formulaire
const form = document.getElementById("contact-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      alert("Merci, votre message a bien été envoyé !");
      form.reset();
    } else {
      alert("Une erreur est survenue.");
    }
});



// ================================================================================================================
// Gestion de la gallerie :
// ================================================================================================================
// Sélection des éléments
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const images = Array.from(document.querySelectorAll(".gallery img"));
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const closeBtn = document.querySelector(".close");
let currentIndex = 0;

// Fonction pour afficher une image
function showImage(index) {
    if (index >= 0 && index < images.length) {
        modal.style.display = "flex";
        modalImg.src = images[index].src;
        currentIndex = index;
    }
}
// Ouvre l'image en grand lorsqu'on clique dessus
images.forEach((img, index) => {
    img.addEventListener("click", () => showImage(index));
});
// Ferme la modale en cliquant en dehors
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Gestion Mobile :
// ================
let touchStartX = 0;
let touchEndX = 0;
// Détecte quand l'utilisateur commence à toucher l'écran
modal.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
});
// Détecte quand l'utilisateur lève son doigt
modal.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});
// Fonction qui gère le swipe gauche/droite
function handleSwipe() {
    let swipeDistance = touchEndX - touchStartX;
    if (swipeDistance > 50) { 
        // Swipe vers la droite → image précédente
        showImage(currentIndex - 1);
    } else if (swipeDistance < -50) { 
        // Swipe vers la gauche → image suivante
        showImage(currentIndex + 1);
    }
}
// Gestion des boutons "précédent" et "suivant" sur PC
if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
    nextBtn.addEventListener("click", () => showImage(currentIndex + 1));
}
// Ferme la modale quand on clique sur la croix
if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none"; // Cache la modale
    });
}



// ================================================================================================================
// Espace reservé :
// ================================================================================================================
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Console => hashPassword(mon_mot_de_passe);
const correctHash = "dc766349c0ea0573832c437a343bba65cb5abe73ef2320702f2f7d4bf05064d5" // <-- Remplace ici par le vrai hash

async function checkPassword() {
    const password = document.getElementById("password-input").value;
    const hash = await hashPassword(password);
    if (hash === correctHash) {
        document.getElementById("login-form").style.display = "none";
        document.getElementById("protected-content").style.display = "block";
    } else {
        document.getElementById("login-error").style.display = "block";
    }
}
// Lecture de validation par touche "entrée"
document.getElementById("password-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Empêche le comportement par défaut (si nécessaire)
        checkPassword(); // Appelle la fonction de vérification
    }
});



// ================================================================================================================
// Newsletter :
// ================================================================================================================
document.getElementById("newsletter-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const message = document.getElementById("message");

    fetch("https://script.google.com/macros/s/AKfycbw5DilHQd6edPO7xagggV0DfHZZJBovQEbp9-Nl-4jVvuWHZw2o7RKax7TmyrS734pV1g/exec", {
      method: "POST",
      mode: "no-cors", // pas de retour, mais fonctionne sans problème
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `email=${encodeURIComponent(email)}`
    });

    message.textContent = "Merci ! Votre inscription a bien été prise en compte.";
    message.style.color = "green";
    this.reset();
  });















const container = document.getElementById("actus-container");

async function loadActus() {
  try {
    const res = await fetch("https://api.github.com/repos/Nolan64290/LHB/contents/admin/actus");
    const files = await res.json();

    if (!Array.isArray(files)) throw new Error("Dossier actus vide ou erreur API");

    const articles = [];

    for (const file of files) {
      if (file.name.endsWith(".md")) {
        const mdRes = await fetch(file.download_url);
        const mdText = await mdRes.text();

        const match = mdText.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
        let meta = {};
        let content = mdText;

        if (match) {
          const yaml = match[1];
          content = match[2];

          yaml.split('\n').forEach(line => {
            const [key, ...rest] = line.split(':');
            if (key && rest.length) {
              meta[key.trim()] = rest.join(':').trim();
            }
          });
        }

        articles.push({
          title: meta.title || "Titre non défini",
          date: meta.date ? new Date(meta.date) : new Date(0),
          image: meta.image || null,
          content: content
        });
      }
    }

    // 🔽 Tri des articles par date décroissante (plus récent en premier)
    articles.sort((a, b) => b.date - a.date);

    for (const meta of articles) {
      const article = document.createElement("article");
      article.style.padding = "1.5rem";
      article.style.marginBottom = "2rem";
      article.style.background = "#ffffff";
      article.style.border = "1px solid #ddd";
      article.style.borderRadius = "8px";
      article.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";

      article.innerHTML = `
        ${meta.date ? `<p style="color: #777; font-size: 0.9em;">${meta.date.toLocaleDateString()}</p>` : ""}
        <h3 style="margin-top: 1rem;">${meta.title}</h3>
        <div>${marked.parse(meta.content)}</div>
        ${meta.image ? `<img src="${meta.image}" alt="Image actu" style="width: 100%; max-width: 400px; height: auto; object-fit: cover; border-radius: 6px;">` : ""}
      `;

      container.appendChild(article);
    }
  } catch (error) {
    console.error("Erreur de chargement des actus :", error);
    container.innerHTML = "<p>Impossible de charger les actualités.</p>";
  }
}

loadActus();

