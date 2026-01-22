# ⚡ Déploiement Rapide - Torodo-Avenue

## 🚀 Déploiement en 5 minutes

### Étape 1 : MongoDB Atlas (2 min)

1. **Créer un mot de passe** pour `mamadouelimane_db_user`
   - Allez sur [MongoDB Atlas](https://cloud.mongodb.com)
   - Database Access → Edit User → Create Password
   - **NOTEZ CE MOT DE PASSE !**

2. **Autoriser toutes les IPs**
   - Network Access → Add IP Address
   - Allow Access from Anywhere (0.0.0.0/0)

3. **Votre connection string** :
   ```
   mongodb+srv://mamadouelimane_db_user:VOTRE_MOT_DE_PASSE@cluster0.i1zrqwm.mongodb.net/torodo-avenue?retryWrites=true&w=majority
   ```

---

### Étape 2 : GitHub (1 min)

```bash
# Depuis c:\gravity\vinted
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/mamadouelimanewane/vinted.git
git branch -M main
git push -u origin main
```

---

### Étape 3 : Vercel (2 min)

1. **Connectez-vous** : https://vercel.com/mamadou-dias-projects-979b1f4f

2. **Importez le projet**
   - New Project → Import Git Repository
   - Sélectionnez `mamadouelimanewane/vinted`

3. **Ajoutez ces 3 variables d'environnement** :

   ```env
   DATABASE_URL=mongodb+srv://mamadouelimane_db_user:VOTRE_MOT_DE_PASSE@cluster0.i1zrqwm.mongodb.net/torodo-avenue?retryWrites=true&w=majority
   
   NEXTAUTH_URL=https://votre-app.vercel.app
   
   NEXTAUTH_SECRET=copiez-le-resultat-de-la-commande-ci-dessous
   ```

   **Pour générer NEXTAUTH_SECRET** :
   ```bash
   openssl rand -base64 32
   ```

4. **Déployez** !
   - Cliquez sur "Deploy"
   - Attendez 2-3 minutes

---

### Étape 4 : Initialiser la DB (30 sec)

Une fois déployé, dans le terminal Vercel ou localement :

```bash
# Assurez-vous que DATABASE_URL pointe vers MongoDB Atlas
npx prisma db push
npx prisma db seed
```

---

## ✅ C'est tout !

Votre app est maintenant live sur :
```
https://vinted-xxx.vercel.app
```

---

## 🔧 Configuration Optionnelle

### Google OAuth

1. [Google Cloud Console](https://console.cloud.google.com)
2. Créez un projet
3. OAuth 2.0 Credentials
4. Redirect URI : `https://votre-app.vercel.app/api/auth/callback/google`
5. Ajoutez dans Vercel :
   ```env
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   ```

### Cloudinary (Upload d'images)

1. [Cloudinary](https://cloudinary.com) - Inscription gratuite
2. Dashboard → Credentials
3. Ajoutez dans Vercel :
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   ```

### Wave & Orange Money

Contactez les fournisseurs pour les credentials API.

---

## 🆘 Problèmes ?

### Build échoue
```bash
# Vérifiez les logs
vercel logs

# Redéployez
vercel --prod
```

### Base de données vide
```bash
npx prisma db push
npx prisma db seed
```

### Variables d'environnement manquantes
- Vérifiez dans Vercel Dashboard → Settings → Environment Variables
- Les 3 variables essentielles doivent être présentes

---

**📞 Support** : Voir `DEPLOYMENT.md` pour le guide complet
