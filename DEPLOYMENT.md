# 🚀 Guide de Déploiement Torodo-Avenue

## 📋 Prérequis

Avant de déployer, assurez-vous d'avoir :
- ✅ Un compte GitHub
- ✅ Un compte Vercel
- ✅ Un compte MongoDB Atlas (gratuit)
- ✅ Les credentials API (Google, Cloudinary, Wave, Orange Money)

---

## 🗄️ Étape 1 : Configuration MongoDB Atlas

### 1.1 Créer la base de données

1. Connectez-vous à [MongoDB Atlas](https://cloud.mongodb.com)
2. Votre cluster existe déjà : `Cluster0`
3. Cliquez sur **"Connect"** → **"Connect your application"**
4. Copiez votre connection string :
   ```
   mongodb+srv://mamadouelimane_db_user:<password>@cluster0.i1zrqwm.mongodb.net/
   ```

### 1.2 Créer un mot de passe

1. Allez dans **"Database Access"**
2. Cliquez sur **"Edit"** pour votre utilisateur `mamadouelimane_db_user`
3. Créez un nouveau mot de passe **FORT** (notez-le !)
4. Remplacez `<password>` dans votre `.env` par ce mot de passe

### 1.3 Autoriser les connexions

1. Allez dans **"Network Access"**
2. Cliquez sur **"Add IP Address"**
3. Sélectionnez **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Confirmez

### 1.4 Tester la connexion localement

```bash
# Mettez à jour votre .env avec le vrai mot de passe
DATABASE_URL="mongodb+srv://mamadouelimane_db_user:VOTRE_VRAI_MOT_DE_PASSE@cluster0.i1zrqwm.mongodb.net/torodo-avenue?retryWrites=true&w=majority"

# Générez le client Prisma
npx prisma generate

# Poussez le schéma vers MongoDB
npx prisma db push

# Seedez la base de données
npx prisma db seed
```

---

## 🐙 Étape 2 : Préparation GitHub

### 2.1 Initialiser Git (si pas déjà fait)

```bash
git init
git add .
git commit -m "Initial commit - Torodo-Avenue ready for deployment"
```

### 2.2 Créer un fichier .gitignore

Assurez-vous que `.gitignore` contient :
```
node_modules/
.next/
.env
.env.local
*.log
.DS_Store
prisma/dev.db
prisma/dev.db-journal
```

### 2.3 Pousser vers GitHub

```bash
# Ajoutez votre repo distant
git remote add origin https://github.com/mamadouelimanewane/vinted.git

# Poussez le code
git branch -M main
git push -u origin main
```

---

## ☁️ Étape 3 : Déploiement Vercel

### 3.1 Connecter le projet

1. Allez sur [Vercel](https://vercel.com/mamadou-dias-projects-979b1f4f)
2. Cliquez sur **"Add New Project"**
3. Importez votre repo GitHub : `mamadouelimanewane/vinted`
4. Vercel détectera automatiquement Next.js

### 3.2 Configurer les variables d'environnement

Dans les paramètres du projet Vercel, ajoutez ces variables :

#### **Essentielles (OBLIGATOIRES)**
```env
DATABASE_URL=mongodb+srv://mamadouelimane_db_user:VOTRE_MOT_DE_PASSE@cluster0.i1zrqwm.mongodb.net/torodo-avenue?retryWrites=true&w=majority
NEXTAUTH_URL=https://votre-app.vercel.app
NEXTAUTH_SECRET=générez-avec-openssl-rand-base64-32
```

Pour générer `NEXTAUTH_SECRET` :
```bash
openssl rand -base64 32
```

#### **Optionnelles (mais recommandées)**
```env
GOOGLE_CLIENT_ID=votre-google-client-id
GOOGLE_CLIENT_SECRET=votre-google-client-secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=votre-cloud-name
CLOUDINARY_API_KEY=votre-api-key
CLOUDINARY_API_SECRET=votre-api-secret
```

### 3.3 Déployer

1. Cliquez sur **"Deploy"**
2. Attendez 2-3 minutes
3. Votre app sera live sur : `https://vinted-xxx.vercel.app`

### 3.4 Initialiser la base de données en production

Une fois déployé, ouvrez le terminal Vercel ou utilisez :

```bash
# Depuis votre machine locale avec la DATABASE_URL de production
npx prisma db push
npx prisma db seed
```

---

## 🔑 Étape 4 : Configuration des APIs

### 4.1 Google OAuth (Optionnel)

1. Allez sur [Google Cloud Console](https://console.cloud.google.com)
2. Créez un nouveau projet "Torodo-Avenue"
3. Activez **Google+ API**
4. Créez des **Credentials OAuth 2.0**
5. Ajoutez ces URIs de redirection :
   ```
   http://localhost:3000/api/auth/callback/google
   https://votre-app.vercel.app/api/auth/callback/google
   ```
6. Copiez `Client ID` et `Client Secret` dans Vercel

### 4.2 Cloudinary (Upload d'images)

1. Inscription gratuite sur [Cloudinary](https://cloudinary.com)
2. Dans le Dashboard, récupérez :
   - Cloud Name
   - API Key
   - API Secret
3. Ajoutez-les dans Vercel

### 4.3 Wave API (Paiement Sénégal)

1. Contactez **Wave Sénégal** pour l'accès API
2. Documentation : [Wave Developer](https://developer.wave.com)
3. Récupérez vos credentials
4. Ajoutez-les dans Vercel

### 4.4 Orange Money API

1. Contactez **Orange Money Sénégal**
2. Documentation : [Orange Developer](https://developer.orange.com)
3. Récupérez vos credentials
4. Ajoutez-les dans Vercel

---

## 🧪 Étape 5 : Tests Post-Déploiement

### Checklist de vérification :

- [ ] L'app se charge sur Vercel
- [ ] La page d'accueil affiche les produits
- [ ] L'inscription/connexion fonctionne
- [ ] Les filtres fonctionnent
- [ ] La page produit s'affiche correctement
- [ ] Le formulaire de vente fonctionne
- [ ] La messagerie fonctionne
- [ ] Le checkout s'affiche

### Commandes de debug :

```bash
# Vérifier les logs Vercel
vercel logs

# Tester la connexion MongoDB
npx prisma studio

# Rebuild si nécessaire
vercel --prod
```

---

## 🔄 Étape 6 : Mises à jour continues

### Workflow de développement :

```bash
# 1. Faire des modifications localement
git add .
git commit -m "Description des changements"

# 2. Pousser vers GitHub
git push origin main

# 3. Vercel déploie automatiquement !
```

### En cas de changement de schéma Prisma :

```bash
# 1. Modifier prisma/schema.prisma
# 2. Générer le client
npx prisma generate

# 3. Pousser vers la DB de production
npx prisma db push

# 4. Commit et push
git add .
git commit -m "Update database schema"
git push origin main
```

---

## 🆘 Dépannage

### Erreur : "Cannot connect to database"
- Vérifiez que votre IP est autorisée dans MongoDB Atlas
- Vérifiez le mot de passe dans `DATABASE_URL`
- Vérifiez que le nom de la base de données est correct

### Erreur : "NEXTAUTH_SECRET is not set"
- Générez un secret : `openssl rand -base64 32`
- Ajoutez-le dans les variables Vercel

### Erreur : "Module not found"
- Supprimez `node_modules` et `.next`
- Relancez `npm install`
- Redéployez

---

## 📞 Support

- **Email** : support@torodo-avenue.com
- **GitHub Issues** : https://github.com/mamadouelimanewane/vinted/issues
- **Documentation Vercel** : https://vercel.com/docs
- **Documentation Prisma** : https://www.prisma.io/docs

---

**🎉 Félicitations ! Votre marketplace est maintenant en ligne !**
