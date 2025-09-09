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
    11. Lancement du service worker
    12. Popup pour installer la webApp sur mobile
*/

// ================================================================================================================
// 1. Fonction changement de section :
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
// 2. Gestion du Menu de navigation :
// ================================================================================================================
// Fonction qui permet de désactiver le bouton 'le club' en mode pc
document.addEventListener("DOMContentLoaded", function () {
    const clubButton = document.getElementById("club-a-bt");

    function updateClubButton(width) {
        if (width > 767) { // Si écran PC
            clubButton.removeAttribute("onclick"); // Supprime l'événement de clic
        } else { // Si mobile
            clubButton.setAttribute("onclick", "toggleSousMenu()");
        }
    }

    // Exécution initiale
    updateClubButton(window.innerWidth);

    // Gestion du resize avec debounce pour éviter plusieurs recalculs de layout
    let resizeTimeout;
    window.addEventListener("resize", function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateClubButton(window.innerWidth);
        }, 100); // 100ms après la fin du redimensionnement
    });
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
// 3. Accueil
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
// 4. Equipes et Calendrier
// ================================================================================================================
// Equipe va de 0 à 100 et Calendrier de 101 à +200
// Changediv récupère le numéro de la div à afficher et en fonction de val
// il modifie la partie qu'il faut sans modifier l'autre

var currentDivIndexEquipes = 0;
var currentDivIndexCalendrier = 101;
function changeDiv(n, val) { // val étant la valeur pour savoir si c'est calendrier ou equipe
    console.log(val);
    if (val == 0){ // Cas 'Équipes'
        var currentDiv = document.getElementById(currentDivIndexEquipes);
        currentDiv.classList.remove('currentDiv');
        currentDivIndexEquipes = n;
        // console.log(currentDivIndexEquipes);
        var newCurrentDiv = document.getElementById(currentDivIndexEquipes);
        newCurrentDiv.classList.add('currentDiv');
        newCurrentDiv.scrollIntoView({ behavior: "smooth" });

    } else { // Cas 'Calendrier'
        var currentDiv = document.getElementById(currentDivIndexCalendrier);
        currentDiv.classList.remove('currentDiv');
        document.querySelectorAll('#calendrier iframe').forEach(iframe => {
            iframe.removeAttribute('src');
        });
        currentDivIndexCalendrier = n;
        var newCurrentDiv = document.getElementById(currentDivIndexCalendrier);
        newCurrentDiv.classList.add('currentDiv');
        newCurrentDiv.scrollIntoView({ behavior: "smooth" });
        var iframe = newCurrentDiv.querySelector('iframe');
        if (iframe && !iframe.getAttribute('src')) {
            iframe.src = iframe.dataset.src;
        }
    }
}



// ================================================================================================================
// 5. Téléchargement de favoris :
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
// 6. Formulaire de contact (à revoir) :
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

// Changement des icones des réseaux de la page formulaire
document.querySelectorAll('.icone-swap-red').forEach(img => {
    const originalSrc = img.src;
    const hoverSrc = img.dataset.hover;
    img.addEventListener('mouseover', () => {
        img.src = hoverSrc;
    });
    img.addEventListener('mouseout', () => {
        img.src = originalSrc;
    });
});

// Pareil pour le footer
document.querySelectorAll('.swap-wrapper').forEach(link => {
  const img = link.querySelector('.icone-swap-red');
  if (!img) return;
  const originalSrc = img.src;
  const hoverSrc = img.dataset.hover;
  link.addEventListener('mouseenter', () => {
    img.src = hoverSrc;
  });

  link.addEventListener('mouseleave', () => {
    img.src = originalSrc;
  });
});



// ================================================================================================================
// 7. Gestion de la gallerie :
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
}, { passive: true });
// Détecte quand l'utilisateur lève son doigt
modal.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
}, { passive: true });

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
// 8. Espace reservé :
// ================================================================================================================
// async function hashPassword(password) {
//     const encoder = new TextEncoder();
//     const data = encoder.encode(password);
//     const hashBuffer = await crypto.subtle.digest('SHA-256', data);
//     return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
// }

// // Console => hashPassword(mon_mot_de_passe);
// const correctHash = "dc766349c0ea0573832c437a343bba65cb5abe73ef2320702f2f7d4bf05064d5" // <-- Remplace ici par le vrai hash

// async function checkPassword() {
//     const password = document.getElementById("password-input").value;
//     const hash = await hashPassword(password);
//     if (hash === correctHash) {
//         document.getElementById("login-form").style.display = "none";
//         document.getElementById("protected-content").style.display = "block";
//     } else {
//         document.getElementById("login-error").style.display = "block";
//     }
// }
// // Lecture de validation par touche "entrée"
// document.getElementById("password-input").addEventListener("keydown", function(event) {
//     if (event.key === "Enter") {
//         event.preventDefault(); // Empêche le comportement par défaut (si nécessaire)
//         checkPassword(); // Appelle la fonction de vérification
//     }
// });



// ================================================================================================================
// 9. Newsletter :
// ================================================================================================================
document.getElementById("newsletter-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email2").value;
    const message = document.getElementById("message2");

    // Lien à changer à chaque nouveau déploiement du script
    fetch("https://script.google.com/macros/s/AKfycbyb6HSZdQN9BH8I-lgr1b4PzzyFIhLnq0by2WesfQb5ETbSmKRuGrFbSjsAMLdDEeov/exec", {
      method: "POST",
      mode: "no-cors", // pas de retour, mais fonctionne sans problème
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `email=${encodeURIComponent(email)}`
    });

    message.innerHTML = `Merci ! Votre inscription a bien été prise en compte.<br>Si vous voulez en savoir plus, consultez notre <a href="mentions_legales.html" taget="_blanck">page mentions légales<a/>`;
    message.style.color = "green";
    this.reset();
  });



// ================================================================================================================
// 10. Gestion des actualités :
// ================================================================================================================
async function afficherActualites() {
  try {
    const response = await fetch('/.netlify/functions/get-actus');
    if (!response.ok) throw new Error('Erreur lors de la récupération des actualités');

    const actus = await response.json();
    console.log('Données reçues:', actus);

    const container = document.getElementById('actus-container');
    if (!container) {
      console.error("Le container #actus-container n'existe pas dans le DOM");
      return;
    }
    container.innerHTML = '';

    actus.forEach(actu => {
      const article = document.createElement('article');

      // div texte
      const textDiv = document.createElement('div');
      textDiv.classList.add('text-content');

      const h3 = document.createElement('h3');
      h3.textContent = actu.titre || 'Titre manquant';
      textDiv.appendChild(h3);

      const pDate = document.createElement('p');
      pDate.textContent = new Date(actu.date).toLocaleDateString();
      pDate.classList.add('date');
      textDiv.appendChild(pDate);

      if (actu.contenu && actu.contenu.trim() !== '') {
        const pContenu = document.createElement('p');
        pContenu.textContent = actu.contenu;
        textDiv.appendChild(pContenu);
      }

      article.appendChild(textDiv);

      // div images
      const imagesDiv = document.createElement('div');
      imagesDiv.classList.add('images-container');

      if (Array.isArray(actu.images) && actu.images.length > 0) {
        imagesDiv.classList.add(
          actu.images.length === 1 ? 'one' :
          actu.images.length === 2 ? 'two' :
          actu.images.length >= 3 ? 'three' : ''
        );

        actu.images.slice(0, 3).forEach(image => {
          if (image.url) {
            const img = document.createElement('img');
            img.src = image.url; // URL optimisée
            img.alt = image.alt || 'Image actualité';
            img.draggable = false;
            img.loading = 'lazy'; // lazy loading ajouté
            imagesDiv.appendChild(img);
          }
        });
      }

      article.appendChild(imagesDiv);
      container.appendChild(article);
    });

  } catch (error) {
    console.error('Erreur affichage actualités :', error);
  }
}
// Lance l'affichage au chargement de la page
document.addEventListener('DOMContentLoaded', afficherActualites);



// ================================================================================================================
// 11. Lancement du service worker :
// ================================================================================================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => {
        console.log('Service Worker enregistré avec succès :', reg);
      })
      .catch(err => {
        console.error('Erreur d\'enregistrement du Service Worker :', err);
      });
  });
}



// ================================================================================================================
// 12. Popup pour installer la webApp sur mobile :
// ================================================================================================================
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  // Empêche l’affichage automatique de la fenêtre d’installation
  e.preventDefault();
  deferredPrompt = e;

  // Affiche le popup uniquement si pas déjà affiché, et si mobile
  if (!localStorage.getItem("installPromptShown") && window.innerWidth < 768) {
    document.getElementById("install-popup").style.display = "flex";
  }
});
document.getElementById("install-btn").addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  const choiceResult = await deferredPrompt.userChoice;
  if (choiceResult.outcome === 'accepted') {
    console.log('Utilisateur a accepté l’installation');
  } else {
    console.log('Utilisateur a refusé l’installation');
  }
  deferredPrompt = null;
  document.getElementById("install-popup").style.display = "none";
  localStorage.setItem("installPromptShown", "true");
});
document.getElementById("close-popup").addEventListener("click", () => {
  document.getElementById("install-popup").style.display = "none";
  localStorage.setItem("installPromptShown", "true");
});



// ================================================================================================================
// 12. Programme et résultats via Sanity :
// ================================================================================================================
async function chargerProgramme() {
    try {
        const res = await fetch('/.netlify/functions/get-programme');
        if (!res.ok) throw new Error('Erreur lors du fetch des données');

        const programme = await res.json();
        if (!programme) return;

        const programmeDiv = document.getElementById('programme_we');
        const resultatsDiv = document.getElementById('resultats_we');

        programmeDiv.innerHTML = '';
        resultatsDiv.innerHTML = '';

        const renderImages = (container, images) => {
            images.forEach(img => {
                const imageEl = document.createElement('img');
                imageEl.src = img.url; // une seule URL optimisée
                imageEl.alt = img.alt || '';
                imageEl.loading = 'lazy';
                imageEl.draggable = false;
                container.appendChild(imageEl);
            });
        };

        if (programme.programme_we?.length) {
            renderImages(programmeDiv, programme.programme_we);
        }

        if (programme.resultats_we?.length) {
            renderImages(resultatsDiv, programme.resultats_we);
        }

    } catch (err) {
        console.error('Erreur affichage programme:', err);
    }
}

document.addEventListener('DOMContentLoaded', chargerProgramme);



// ================================================================================================================
// 13. Espace réservé via auth0 :
// ================================================================================================================
let auth0;

async function initAuth0() {
  auth0 = await createAuth0Client({
    domain: "dev-functionality.eu.auth0.com",
    clientId: "aVpbK0cMJKpYxVWnOMnzvWv5GH4rlabe",
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: "https://lasseubehb.netlify.app/api"
    },
    cacheLocation: "memory",
    useRefreshTokens: false
  });

  if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
    await auth0.handleRedirectCallback();
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  updateUI();
}

async function updateUI() {
  const isAuthenticated = await auth0.isAuthenticated();
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const privateDiv = document.getElementById("private-content");

  if (isAuthenticated) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";

    const user = await auth0.getUser();
    const token = await auth0.getTokenSilently();

    // Vérifie le token avec Netlify Function
    const res = await fetch("/.netlify/functions/private", {
      headers: { Authorization: "Bearer " + token }
    });

    if (res.ok) {
      const data = await res.json();
      privateDiv.style.display = "block";

      // Récupère les rôles
      const claims = await auth0.getIdTokenClaims();
      const roles = claims["https://lasseubehb.netlify.app/roles"] || [];

      if (roles.includes("coach")) {
        privateDiv.innerHTML = `
          <h2>Bienvenue ${user.nickname} (Coach)</h2>
          <h3>Planning des matchs</h3>
          <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSH-WKQ-lQufjHdzKI6j3ZpvHJpD8fqSYTy1RauOtkSLxTNzIXn06IrOuyFV9A3iSWob1aVKGpILFf1/pubhtml?gid=718844545&single=true&widget=true&headers=false" width="100%" height="600"></iframe>
        `;
      } else if (roles.includes("seniors")) {
        privateDiv.innerHTML = `
          <h2>Bienvenue ${user.nickname} (Seniors)</h2>
          <div id="seniors-div">Contenu spécifique pour seniors</div>
        `;
      } else {
        privateDiv.innerHTML = `<p>Vous n’avez pas accès à cette page.</p>`;
      }
    } else {
      privateDiv.innerHTML = `<p>Token invalide, accès refusé.</p>`;
    }
  } else {
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    privateDiv.style.display = "none";
    privateDiv.innerHTML = "";
  }
}

// Boutons login/logout
document.getElementById("login-btn").onclick = () => auth0.loginWithRedirect();
document.getElementById("logout-btn").onclick = () => auth0.logout({ returnTo: window.location.origin });