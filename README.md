# ⚓ Port de plaisance de Russell – API de gestion des catways

# 🚀 Déploiement

Application déployée sur Render :

https://api-port-russel-cyda.onrender.com

##  Description du projet

Ce projet consiste à développer une **API REST sécurisée** permettant à la capitainerie du port de plaisance de Russell de gérer :

* les **catways** (appontements),
* les **réservations** associées aux catways,
* les **utilisateurs** de la capitainerie.

Une **interface frontend simple** permet aux utilisateurs authentifiés de gérer ces données via un tableau de bord.

---

## 🛠️ Technologies utilisées

### Backend

* **Node.js**
* **Express.js**
* **MongoDB** avec **Mongoose**
* **JWT** (authentification)
* **bcryptjs** (hash des mots de passe)
* **EJS**

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Fetch API

---

## 🔑 Compte de démonstration

Email : gdupuis@portrussell.com
Mot de passe : dupuis2026

---

## 📘 Documentation de l’API
### 🌍 Base URL

**Local**
http://localhost:3000

**En Ligne**
https://api-port-russel-cyda.onrender.com/

## 🔑 Authentification

### ➤ POST `/login`

Connexion d’un utilisateur.

```json
{
  "email": "admin@mail.com",
  "password": "password"
}
```
Réponses

* Code	/  **Description**
* 200	  /  **Connexion réussie**
* 401	  /  **Identifiants invalides**
* 500	  /  **Erreur serveur**

### ➤ GET `/logout`
Déconnexion de l’utilisateur.

### ➤ GET `/users`
Retourne la liste des utilisateurs.

### ➤ POST `/users`
```
{
  "username": "user1",
  "email": "user1@mail.com",
  "password": "password"
}
```

## 🛥️ Catways 🔒

### ➤ GET `/catways`
Retourne la liste des catways.

### ➤ GET `/catways/:id`
Retourne un catway par son ID.

### ➤ POST `/catways`
```
{
  "catwayNumber": 3,
  "catwayType": "long",
  "catwayState": "bon état"
}
```

### ➤ PUT `/catways/:id`
Mise à jour d’un catway.

### ➤ DELETE `/catways/:id`

## 📅 Réservations 🔒

### ➤ GET `/catways/:id/reservations`
Liste des réservations d’un catway.

### ➤ POST `/catways/:id/reservations`
Création d’une réservation.
```
{
  "clientName": "Jean Dupont",
  "boatName": "Le Neptune",
  "startDate": "2024-06-01",
  "endDate": "2024-06-10"
}
```

## 🧪 Installation et lancement en local
```
 npm install
 npm run dev
```

Créer un fichier .env :
```
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```
