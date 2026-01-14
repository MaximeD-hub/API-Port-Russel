const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/";
}

const catwaysList = document.getElementById("catwaysList");
const message = document.getElementById("message");

// LOGOUT
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/";
});

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
    catwaysList.appendChild(li);
  });
}

loadCatways();

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
    message.textContent = data.message || "Erreur";
    return;
  }

  message.textContent = "Catway ajouté";
  loadCatways();
});


const reservationsList = document.getElementById("reservationsList");

// CREATE RESERVATION
document
  .getElementById("reservationForm")
  .addEventListener("submit", async (e) => {
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
      body: JSON.stringify({
        clientName,
        boatName,
        startDate,
        endDate
      })
    });

    const data = await res.json();

    if (!res.ok) {
      message.textContent = data.message || "Erreur réservation";
      return;
    }

    message.textContent = "Réservation ajoutée";
  });
