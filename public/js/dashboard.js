/**
 * =========================
 * DASHBOARD.JS
 * Gestion du tableau de bord
 * Auth via cookie JWT
 * =========================
 */

const catwaysList = document.getElementById("catwaysList");
const reservationsList = document.getElementById("reservationsList");
const usersList = document.getElementById("usersList");
const message = document.getElementById("message");

/* =========================
   LOGOUT
========================= */
document.getElementById("logout").addEventListener("click", async () => {
  await fetch("/logout", {
    credentials: "same-origin"
  });
  window.location.href = "/";
});

/* =========================
   CATWAYS
========================= */

/**
 * Récupère et affiche les catways
 */
async function loadCatways() {
  try {
    const res = await fetch("/catways", {
      credentials: "same-origin"
    });

    if (res.status === 401) {
      window.location.href = "/";
      return;
    }

    const catways = await res.json();
    catwaysList.innerHTML = "";

    catways.forEach((catway) => {
      const li = document.createElement("li");
      li.textContent = `#${catway.catwayNumber} - ${catway.catwayType} - ${catway.catwayState}`;
      li.style.cursor = "pointer";

      li.addEventListener("click", () => {
        loadReservations(catway.catwayNumber);
      });

      catwaysList.appendChild(li);
    });
  } catch (err) {
    message.textContent = "Erreur chargement catways";
  }
}

/**
 * Création d’un catway
 */
document.getElementById("catwayForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const catwayNumber = document.getElementById("number").value;
  const catwayType = document.getElementById("type").value;
  const catwayState = document.getElementById("state").value;

  const res = await fetch("/catways", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ catwayNumber, catwayType, catwayState })
  });

  const data = await res.json();

  if (!res.ok) {
    message.textContent = data.message || "Erreur catway";
    return;
  }

  message.textContent = "Catway ajouté";
  loadCatways();
});

loadCatways();

/* =========================
   RÉSERVATIONS
========================= */

/**
 * Création d’une réservation
 */
document.getElementById("reservationForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const catway = document.getElementById("resCatway").value;
  const clientName = document.getElementById("clientName").value;
  const boatName = document.getElementById("boatName").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  const res = await fetch(`/catways/${catway}/reservations`, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientName, boatName, startDate, endDate })
  });

  const data = await res.json();

  if (!res.ok) {
    message.textContent = data.message || "Erreur réservation";
    return;
  }

  message.textContent = "Réservation ajoutée";
  loadReservations(catway);
});

/**
 * Récupère les réservations d’un catway
 * @param {number} catwayNumber
 */
async function loadReservations(catwayNumber) {
  reservationsList.innerHTML = "<li>Chargement...</li>";

  const res = await fetch(`/catways/${catwayNumber}/reservations`, {
    credentials: "same-origin"
  });

  if (res.status === 401) {
    window.location.href = "/";
    return;
  }

  const reservations = await res.json();
  reservationsList.innerHTML = "";

  if (!reservations.length) {
    reservationsList.innerHTML = "<li>Aucune réservation</li>";
    return;
  }

  reservations.forEach((r) => {
    const li = document.createElement("li");
    li.textContent = `${r.clientName} – ${r.boatName} (${r.startDate} → ${r.endDate})`;
    reservationsList.appendChild(li);
  });
}

/* =========================
   USERS
========================= */

/**
 * Récupère et affiche les utilisateurs
 */
async function loadUsers() {
  const res = await fetch("/users", {
    credentials: "same-origin"
  });

  if (res.status === 401) {
    window.location.href = "/";
    return;
  }

  const users = await res.json();
  usersList.innerHTML = "";

  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `${user.username} - ${user.email}`;
    usersList.appendChild(li);
  });
}

loadUsers();

/**
 * Création utilisateur
 */
document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("userEmail").value;
  const password = document.getElementById("userPassword").value;

  const res = await fetch("/users", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    message.textContent = data.message || "Erreur création utilisateur";
    return;
  }

  message.textContent = "Utilisateur ajouté";
  loadUsers();
});
