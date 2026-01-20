const form = document.getElementById("loginForm");
const error = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  error.textContent = "";

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password }),
      credentials: "include" // ⭐ IMPORTANT pour les cookies
    });

    // ❌ Mauvais identifiants
    if (!res.ok) {
      const data = await res.json();
      error.textContent = data.message || "Erreur de connexion";
      return;
    }

    // ✅ Connexion OK → redirection serveur
    window.location.href = "/dashboard";

  } catch (err) {
    console.error(err);
    error.textContent = "Erreur serveur";
  }
});
