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
    10. Gestion des actualités
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
    var bt = document.getElementById("programme-bt");
    if (index === 1) {
        bt.classList.remove('pulse');
        div.classList.add('expanded');
        index = 2;
    } else if (index === 2) {
        bt.classList.add('pulse');
        div.classList.remove('expanded');
        index = 1;
    }
}
// Affichage aléatoire de sponsors
// Liste des images disponibles dans le dossier
const sponsorImages = [
    "assets/partenaires/aluminium habitat.webp",
    "assets/partenaires/AC THERMIQUE.webp",
    "assets/partenaires/amc lavage serrois.webp",
    "assets/partenaires/andré paillas.webp",
    "assets/partenaires/atelier-ossau.webp",
    "assets/partenaires/auberge la promenade.webp",
    "assets/partenaires/ATOL.webp",
    "assets/partenaires/autosur.webp",
    "assets/partenaires/bearn incendie.webp",
    "assets/partenaires/bidart.webp",
    "assets/partenaires/bordenave électricité.webp",
    "assets/partenaires/boérie.webp",
    "assets/partenaires/bricomarché_oloron.webp",
    "assets/partenaires/buso.webp",
    "assets/partenaires/camping belair.webp",
    "assets/partenaires/carrey.webp",
    "assets/partenaires/carrosserie-du-piemont.webp",
    "assets/partenaires/cass auto vigneai.webp",
    "assets/partenaires/cba_materiaux.webp",
    "assets/partenaires/Centre de formation ac Fam.webp",
    "assets/partenaires/CER les gaves.png.webp",
    "assets/partenaires/Chouette peinture.webp",
    "assets/partenaires/citroen.webp",
    "assets/partenaires/clément pairault.webp",
    "assets/partenaires/clement-servat.webp",
    "assets/partenaires/coiffure mode conseil.webp",
    "assets/partenaires/Déchetterie.webp",
    "assets/partenaires/d'oc charpente.webp",
    "assets/partenaires/euromagri.webp",
    "assets/partenaires/Garage monteiro.webp",
    "assets/partenaires/groupama gan.webp",
    "assets/partenaires/guiraud.webp",
    "assets/partenaires/hangar a 2 roues.webp",
    "assets/partenaires/informatique FLORENT MIRO.webp",
    "assets/partenaires/labat.webp",
    "assets/partenaires/lacau.webp",
    "assets/partenaires/Lacayrelle.webp",
    "assets/partenaires/lagardere.webp",
    "assets/partenaires/Le fournil de lasseube.webp",
    "assets/partenaires/le tire bouchon.webp",
    "assets/partenaires/les viandes du haut bearn.webp",
    "assets/partenaires/l'escapade.webp",
    "assets/partenaires/l'hair naturel.webp",
    "assets/partenaires/LIENNE STEPHANE.webp",
    "assets/partenaires/lopez.webp",
    "assets/partenaires/macon yannick lassalle-001.webp",
    "assets/partenaires/manutech-Logo.webp",
    "assets/partenaires/Pedelaborde.webp",
    "assets/partenaires/phillippe fleur.png.webp",
    "assets/partenaires/point P.webp",
    "assets/partenaires/pompes-funebres-lassalle.webp",
    "assets/partenaires/sanguinet élagage.webp",
    "assets/partenaires/serrurerie-industrie.webp",
    "assets/partenaires/SOTRAVOS.webp",
    "assets/partenaires/tardos maçonnerie.webp",
    "assets/partenaires/technique tele Ent pon.webp",
    "assets/partenaires/terrassement bourdet.webp",
    "assets/partenaires/transport peyroutet.webp",
    "assets/partenaires/transports mathieu.webp",
    "assets/partenaires/valentine.webp",
    "assets/partenaires/vitrage auto béarn.webp",
    "assets/partenaires/Loustau sarl.webp",
    "assets/partenaires/soubercaze.webp",
    "assets/partenaires/bourdet pees.webp",
    "assets/partenaires/kremer.webp",
    "assets/partenaires/vival lasseube.webp",
    "assets/partenaires/tpo.webp",
    "assets/partenaires/informatic.webp",
    "assets/partenaires/couralis.webp",
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
        newCurrentDiv.scrollIntoView({ behavior: "smooth" });

    } else {
        var currentDiv = document.getElementById(currentDivIndexCalendrier);
        currentDiv.classList.remove('currentDiv');
        currentDivIndexCalendrier = n;
        // console.log(currentDivIndexCalendrier);
        var newCurrentDiv = document.getElementById(currentDivIndexCalendrier);
        newCurrentDiv.classList.add('currentDiv');
        newCurrentDiv.scrollIntoView({ behavior: "smooth" });

        var iframe = newCurrentDiv.querySelector('iframe');
        if (iframe && !iframe.src) {
            iframe.src = iframe.dataset.src;
        }

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

    const email = document.getElementById("email2").value;
    const message = document.getElementById("message");

    // Lien à changer à chaque nouveau déploiement du script
    fetch("https://script.google.com/macros/s/AKfycbyEZpyQNwTtuFl5dWMxp2ipvKjV0hl0OKnr-uJYdsacUrGkZMu_K2UoNlIQFqRJ3m2m/exec", {
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



// ================================================================================================================
// Gestion des actualités :
// ================================================================================================================
// Redirige sur la page de register de admin à partir du lien envoyé par mail lors d'une invitation si il y a un invite_token sur la page
const urlParams = new
URLSearchParams(window.location.hash.substring(1));
const inviteToken = urlParams.get('invite_token');
if(inviteToken) {
    window.location.replace(`/admin/#/invite?invite_token=${inviteToken}`);
}

// Affiche les actus du format .md => .html
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
        const yamlRaw = match[1];
        content = match[2];
        try {
            meta = jsyaml.load(yamlRaw); // ✅ utilise js-yaml
        } catch (e) {
            console.error("Erreur YAML", e);
        }
        }

        articles.push({
        title: meta.title || "Titre non défini",
        date: meta.date ? new Date(meta.date) : new Date(0),
        content: content,
        images: Array.isArray(meta.images) ? meta.images : (meta.image ? [meta.image] : [])
        });
    }
    }

    // 🔽 Tri des articles par date décroissante
    articles.sort((a, b) => b.date - a.date);

    for (const meta of articles) {
    const article = document.createElement("article");
    article.classList.add("actu-card");
    // article.style.padding = "1.5rem";
    // article.style.marginBottom = "2rem";
    // article.style.background = "#ffffff";
    // article.style.border = "1px solid #ddd";
    // article.style.borderRadius = "8px";
    // article.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";

    let imagesHTML = "";
    if (Array.isArray(meta.images)) {
        imagesHTML = meta.images
        .map(img => `<img src="${img}" alt="Image actu" class="actu-image">`)
        .join("");
    }

    article.innerHTML = `
    <div class="actu-text">
        ${meta.date ? `<p class="actu-date">${meta.date.toLocaleDateString()}</p>` : ""}
        <h3 class="actu-title">${meta.title}</h3>
        <div class="actu-content">${marked.parse(meta.content)}</div>
    </div>
    <div class="actu-images">
        ${meta.images.map(img => `<img src="${img}" alt="Image actu" class="actu-image">`).join("")}
    </div>
    `;


    container.appendChild(article);
    }
} catch (error) {
    console.error("Erreur de chargement des actus :", error);
    container.innerHTML = "<p>Impossible de charger les actualités.</p>";
}
}

loadActus();