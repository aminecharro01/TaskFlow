# TP Séance 5 — Réponses

### Q1
Non, le script ne tourne pas. Dans `{dangerousName}`, React affiche la chaîne en texte : il échappe `<` et `>` donc pas de vrai tag HTML, pas d’`onerror`.

### Q2
Avec `dangerouslySetInnerHTML`, le HTML est injecté dans le DOM : le `<img>` existe, l’image plante, `onerror` peut s’exécuter (alerte en test). D’où l’interdit avec des données utilisateur.

### Q3
Oui après login : `setAuthToken` met `Authorization: Bearer …` sur l’instance Axios, donc le GET `/projects` l’a dans Network.

### Q4
`localStorage` est lisible par tout JS de la page (XSS). Le token en state Redux reste en RAM et n’est pas exposé pareil ; en prod on préfère souvent cookies HttpOnly.

### Q5
Plus de `switch` ni d’actions en string à la main : RTK génère les actions. Dans le reducer on modifie `state` comme si c’était mutable mais Immer produit un nouvel état derrière.

### Q6
Sans memo : le toggle ☰ refait rendre Dashboard donc en général Header, Sidebar, zone outils, MainContent. MainContent n’a pas besoin de se rafraîchir si seules `columns` comptent et qu’elles ne changent pas.

### Q7
`memo` refait le rendu seulement si les props changent (comparaison shallow par défaut). `columns` inchangé → MainContent skip.

### Q8
`useMemo` = valeur calculée mise en cache. `useCallback` = fonction stable. `useCallback` sert surtout pour les handlers passés à un enfant `memo`.

### Q10
Profiler : toggle sidebar → surtout Header / layout / Sidebar ; avec `memo` sur MainContent + callbacks stables, MainContent ne devrait plus apparaître. Ajout projet → formulaire + liste. Détail → la page projet. Déco → écran login. Temps : lire la colonne durée / flamegraph dans l’onglet Profiler. Captures avant/après memo pour comparer.

---

## TP Séance 6 — Next.js (`taskflow-next/`)

Lancer : `cd taskflow-next` puis `npm install` et `npm run dev`. Login : `admin@taskflow.com` / `password123`. Pas besoin de json-server : les routes `app/api` lisent `taskflow-next/db.json`.

### Q1
En SPA il fallait mettre à jour le state à la main (`setProjects`, refetch, etc.) après le POST. Ici `revalidatePath('/dashboard')` invalide le cache du Server Component : au prochain rendu le serveur refait le `fetch` et la liste est à jour sans toucher au client.

### Q3
Le dashboard est un Server Component : pas de handlers `onClick` côté client sans marquer un composant `'use client'`. Un `<form action={serverAction}>` envoie les données au serveur sans JS obligatoire (progressive enhancement).

### Q4
Dans le navigateur on voit le JSON du tableau `projects` (réponse GET de l’API Route).

### Q5
Une API Route = endpoint HTTP classique (GET/POST…), consommable par n’importe quel client. Une Server Action = fonction serveur appelée comme action de formulaire ou depuis le client via un bridge Next ; pas une URL REST publique par défaut.

### Q6
En SPA on avait souvent plusieurs `useState` (email, password, loading, error). Ici `useActionState` gère l’état renvoyé par l’action (ex. erreur) et `pending` : moins de `useState` locaux.

### Q7
Oui le cookie `session` apparaît sous Application → Cookies. Avec `httpOnly: true` il n’apparaît pas dans `document.cookie` (invisible au JS de la page).

### Q8
Pas de flash du dashboard : le middleware répond en redirect avant que la page protégée soit rendue. En SPA le composant montait puis `ProtectedRoute` redirigeait.

### Q9
Le middleware s’exécute sur le Edge/runtime Node avant le routeur `app/`. Le mettre à la racine du projet Next permet de l’appliquer à toutes les routes concernées sans ambiguïté de dossier.

### Q10
Ici le layout serveur lit `cookies()` directement. En SPA on passait par Context / `useAuth` / state après login côté client.

### Q11
Formulaire création projet : Server Action (simple, lié au rendu). App mobile qui consomme la même donnée : API Routes (HTTP stable, sans couplage Next Actions).

### Q12
Cookie `httpOnly` + contrôle côté serveur/middleware : le token de session n’est pas lisible par le JS du navigateur, donc mieux face au XSS qu’un JWT seulement en mémoire côté client (même si le reste compte aussi).

### Q13
Oui : les API Routes tournent dans le même processus Next et lisent `db.json` sur le disque ; json-server est optionnel.

### Q14
Non : `httpOnly` empêche `document.cookie` de lire ce cookie ; un XSS ne peut pas le récupérer ainsi (il reste d’autres risques, ex. CSRF selon la config).
