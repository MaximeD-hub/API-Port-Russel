const catwaysList = document.getElementById("catwaysList");
const reservationsList = document.getElementById("reservationsList");
const usersList = document.getElementById("usersList");
const message = document.getElementById("message");

/* =========================
   LOGOUT
========================= */
document.getElementById("logout").addEventListener("click", async () => {
  await fetch("/logout");
  window.location.href = "/";
});

/* =========================
   CATWAYS
========================= */

// FETCH CATWAYS
async function loadCatways() {
  const res = await fetch("/catways");
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
}

// CREATE CATWAY
document.getElementById("catwayForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const catwayNumber = document.getElementById("number").value;
  const catwayType = document.getElementById("type").value;
  const catwayState = document.getElementById("state").value;

  const res = await fetch("/catways", {
    method: "POST",
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

// CREATE RESERVATION
document.getElementById("reservationForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const catway = document.getElementById("resCatway").value;
  const clientName = document.getElementById("clientName").value;
  const boatName = document.getElementById("boatName").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  const res = await fetch(`/catways/${catway}/reservations`, {
    method: "POST",
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

// FETCH RESERVATIONS
async function loadReservations(catwayNumber) {
  const res = await fetch(`/catways/${catwayNumber}/reservations`);
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

async function loadUsers() {
  const res = await fetch("/users");
  const users = await res.json();

  usersList.innerHTML = "";

  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `${user.username} - ${user.email}`;
    usersList.appendChild(li);
  });
}

loadUsers();

document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("userEmail").value;
  const password = document.getElementById("userPassword").value;

  const res = await fetch("/users", {
    method: "POST",
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
