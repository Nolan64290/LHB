// ================================================================================================================
// 13. Espace réservé via auth0 :
// ================================================================================================================
import { createAuth0Client } from "https://cdn.jsdelivr.net/npm/@auth0/auth0-spa-js@2.1.0/dist/auth0-spa-js.production.esm.min.js";

let auth0;

async function initAuth0() {
  auth0 = await createAuth0Client({
    domain: "dev-functionality.eu.auth0.com",
    clientId: "aVpbK0cMJKpYxVWnOMnzvWv5GH4rlabe",
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: "https://lasseubehb.netlify.app/api"
    }
  });

  if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
    await auth0.handleRedirectCallback();
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  updateUI();
}

// UI login/logout et contenu privé
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

    const res = await fetch("/.netlify/functions/private", {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      const data = await res.json();
      privateDiv.style.display = "block";

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

// Login/logout sécurisés
document.getElementById("login-btn").addEventListener("click", async () => {
  if (auth0) await auth0.loginWithRedirect();
});
document.getElementById("logout-btn").addEventListener("click", () => {
  if (auth0) auth0.logout({ returnTo: window.location.origin });
});

// Lancement : on attend que le CDN soit chargé
initAuth0();