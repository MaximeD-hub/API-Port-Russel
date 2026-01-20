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
* **dotenv**

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

## 🔐 Authentification

L’API est **privée**.

* Connexion via `POST /login`
* Authentification par **JWT**
* Token stocké côté client (localStorage)
* Accès aux routes protégées via l’en-tête :

```http
Authorization: Bearer <token>
```

* Déconnexion via `GET /logout`
---

## 🖥️ Interface utilisateur

### Page d’accueil

* Connexion utilisateur

### Tableau de bord

* Gestion des catways
* Gestion des réservations liées aux catways
* Gestion des utilisateurs
* Déconnexion

---

## 🗃️ Données

Les collections **catways** et **reservations** sont pré-alimentées via les fichiers fournis (`catways.json`, `reservations.json`) et importées dans MongoDB.

---

## 🚀 Installation et lancement

### 1️⃣ Installer les dépendances

```bash
npm install
```

### 2️⃣ Configurer l’environnement

Créer un fichier `.env` :

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/port-russell
JWT_SECRET=secret
```

### 3️⃣ Lancer le serveur

```bash
npm run dev
```

---

## 👨‍💻 Auteur

Projet réalisé dans le cadre d’un devoir pédagogique – **Créer une API pour le port de plaisance Russell**.
Le projet m'a permis d'apprendre le back-end directement via la pratique, mais je ne cache pas avoir du mal avec le language coté serveur.
