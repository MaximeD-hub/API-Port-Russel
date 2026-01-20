const jwt = require("jsonwebtoken");

/**
 * Middleware de protection des routes
 * - Pages HTML : redirection vers /
 * - API : réponse JSON 401
 */
module.exports = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return handleUnauthorized(req, res);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return handleUnauthorized(req, res);
  }
};

function handleUnauthorized(req, res) {
  // Appel API (fetch, Postman, etc.)
  if (req.headers.accept?.includes("application/json")) {
    return res.status(401).json({ message: "Non authentifié" });
  }

  // Page HTML
  return res.redirect("/");
}
