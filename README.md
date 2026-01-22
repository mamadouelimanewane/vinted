# 🌟 Torodo-Avenue

**La marketplace premium de seconde main pour le Sénégal** 🇸🇳

Torodo-Avenue est une plateforme moderne inspirée de Vinted, adaptée au marché sénégalais avec des fonctionnalités de paiement mobile local (Wave & Orange Money).

---

## ✨ Fonctionnalités

### 🛍️ **Marketplace**
- ✅ Navigation et recherche de produits
- ✅ Filtres avancés (catégorie, prix, état)
- ✅ Pages produits détaillées
- ✅ Profils vendeurs
- ✅ Formulaire de mise en vente

### 🔐 **Authentification**
- ✅ Inscription/Connexion par email
- ✅ Connexion Google OAuth
- ✅ Sessions sécurisées avec NextAuth.js
- ✅ Gestion de profil utilisateur

### 💬 **Messagerie**
- ✅ Chat en temps réel entre acheteurs et vendeurs
- ✅ Historique des conversations
- ✅ Notifications de nouveaux messages

### 💳 **Paiements Locaux**
- ✅ Intégration Wave
- ✅ Intégration Orange Money
- ✅ Checkout sécurisé
- ✅ Historique des transactions

### 📸 **Upload d'Images**
- ✅ Upload via Cloudinary
- ✅ Optimisation automatique
- ✅ CDN global

---

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Compte Cloudinary (gratuit)
- Comptes API Wave & Orange Money (optionnel pour dev)

### 1. Cloner le projet
```bash
git clone https://github.com/votre-username/torodo-avenue.git
cd torodo-avenue
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration
Copiez `.env.example` vers `.env` et remplissez les variables:
```bash
cp .env.example .env
```

**Variables essentielles:**
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="générez-avec-openssl-rand-base64-32"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="votre-cloud-name"
```

### 4. Base de données
```bash
npx prisma db push
npx prisma db seed
```

### 5. Lancer le serveur
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

---

## 📦 Stack Technique

- **Framework**: Next.js 15+ (App Router)
- **Langage**: TypeScript
- **Base de données**: SQLite (dev) / MongoDB (production)
- **ORM**: Prisma
- **Authentification**: NextAuth.js
- **Upload**: Cloudinary
- **Paiements**: Wave API, Orange Money API
- **Styling**: CSS Modules + Variables CSS
- **Icons**: Lucide React

---

## 🌍 Déploiement

### Option 1: Vercel + MongoDB Atlas (Recommandé)

1. **Créer un compte MongoDB Atlas**
   - Allez sur [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Créez un cluster gratuit
   - Récupérez votre connection string

2. **Mettre à jour Prisma pour MongoDB**
   ```prisma
   datasource db {
     provider = "mongodb"
     url      = env("DATABASE_URL")
   }
   ```

3. **Déployer sur Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

4. **Configurer les variables d'environnement**
   - Dans le dashboard Vercel
   - Ajoutez toutes les variables de `.env`

### Option 2: Autres plateformes
- **Railway**: Support MongoDB natif
- **Render**: Déploiement gratuit
- **DigitalOcean**: VPS avec contrôle total

---

## 🔧 Configuration des APIs

### Google OAuth
1. Allez sur [console.cloud.google.com](https://console.cloud.google.com)
2. Créez un nouveau projet
3. Activez Google+ API
4. Créez des identifiants OAuth 2.0
5. Ajoutez `http://localhost:3000/api/auth/callback/google` aux URIs de redirection

### Cloudinary
1. Inscription sur [cloudinary.com](https://cloudinary.com)
2. Récupérez vos credentials dans le Dashboard
3. Ajoutez-les au `.env`

### Wave & Orange Money
1. Contactez Wave Sénégal pour l'API
2. Contactez Orange Money pour l'API
3. Suivez leur documentation d'intégration

---

## 📱 Fonctionnalités à venir

- [ ] Application mobile (React Native)
- [ ] Notifications push
- [ ] Système de reviews/notes
- [ ] Livraison intégrée
- [ ] Programme de fidélité
- [ ] Support multilingue (Français/Wolof)

---

## 🤝 Contribution

Les contributions sont les bienvenues ! 

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## 📄 Licence

MIT License - voir le fichier [LICENSE](LICENSE)

---

## 👨‍💻 Auteur

Créé avec ❤️ pour le marché sénégalais

**Contact**: [votre-email@example.com](mailto:votre-email@example.com)

---

## 🙏 Remerciements

- Design inspiré de Vinted
- Communauté Next.js
- Prisma Team
- Cloudinary
- Wave & Orange Money Sénégal

---

**⭐ Si ce projet vous plaît, n'hésitez pas à lui donner une étoile !**
