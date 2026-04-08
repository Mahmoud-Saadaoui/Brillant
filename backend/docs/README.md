# 📚 Documentation Brillant Backend

Bienvenue dans la documentation du backend Brillant. Ce projet est une API REST modulaire construite avec Express, TypeScript et PostgreSQL.

## 🚀 Démarrage rapide

```bash
# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos credentials

# Initialiser la base de données
npm run db:reset

# Lancer le serveur en développement
npm run backend
```

## 📖 Sommaire

| Document | Description |
|----------|-------------|
| [Installation](./01-installation.md) | Installation et configuration complète |
| [Architecture](./02-architecture.md) | Structure du projet et organisation |
| [Base de données](./03-database.md) | Configuration et utilisation de PostgreSQL |
| [API Endpoints](./04-api.md) | Routes et endpoints disponibles |
| [Développement](./05-development.md) | Guide de développement |

## 🛠️ Scripts npm disponibles

```bash
npm start          # Production (node dist/server.js)
npm run backend    # Développement avec hot-reload
npm run build      # Compiler TypeScript
npm run type-check # Vérifier les types sans compiler
npm run db:init    # Créer la base de données
npm run db:schema  # Créer les tables
npm run db:reset   # Reset complet (init + schema)
```

## 🏗️ Stack technique

- **Runtime** : Node.js (ES modules)
- **Framework** : Express 5.x
- **Langage** : TypeScript 5.x
- **Base de données** : PostgreSQL
- **Sécurité** : Helmet, CORS, rate-limiting

## 📁 Structure du projet

```
backend/
├── src/
│   ├── config/          # Configuration DB + scripts SQL
│   ├── middlewares/     # Middlewares globaux
│   ├── modules/         # Modules fonctionnels
│   │   └── health/      # Exemple de module
│   ├── types/           # Types globaux partagés
│   ├── app.ts           # Application Express
│   └── server.ts        # Point d'entrée
├── docs/                # Documentation
└── package.json
```

---

**Pour commencer, consultez le [guide d'installation](./01-installation.md).**
