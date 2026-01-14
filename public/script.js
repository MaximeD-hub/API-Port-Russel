const form = document.getElementById("loginForm");
const error = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      error.textContent = data.message || "Erreur de connexion";
      return;
    }

    localStorage.setItem("token", data.token);
    window.location.href = "/dashboard.html";
  } catch (err) {
    error.textContent = "Erreur serveur";
  }
});
