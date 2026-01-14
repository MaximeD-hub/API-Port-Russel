const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/";
}

const catwaysList = document.getElementById("catwaysList");
const reservationsList = document.getElementById("reservationsList");
const usersList = document.getElementById("usersList");
const message = document.getElementById("message");

/* =========================
   LOGOUT
========================= */
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/";
});

/* =========================
   CATWAYS
========================= */

// FETCH CATWAYS
async function loadCatways() {
  const res = await fetch("/catways", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

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
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
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
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
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


// FETCH RESERVATIONS FOR ONE CATWAY
async function loadReservations(catwayNumber) {
  const res = await fetch(`/catways/${catwayNumber}/reservations`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  reservationsList.innerHTML = "";

  // 🔥 CAS 1 : l'API renvoie directement un tableau
  const reservations = Array.isArray(data)
    ? data
    : data.reservations;

  if (!reservations || reservations.length === 0) {
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

// FETCH USERS
async function loadUsers() {
  const res = await fetch("/users", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

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
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
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
