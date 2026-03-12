# Réponses du TP Séance 3

### ➤ Q1 : Pourquoi `<Navigate />` (composant) et pas `navigate()` (hook) ici ?
Parce que `ProtectedRoute` est un composant rendu lors de la phase de rendu ("render phase") de React. Il est interdit d'appeler un hook provoquant un effet de bord, tel que `navigate()`, directement dans le corps d'un composant durant cette phase. Le composant `<Navigate />` gère au contraire cette redirection à l'intérieur d'un effet (`useEffect`), de manière déclarative et sécurisée vis-à-vis du cycle de vie de React.

### ➤ Q2 : Quelle différence entre `navigate(from)` et `navigate(from, { replace: true })` ?
- `navigate(from)` ajoute une nouvelle entrée dans la pile de l'historique de navigation du navigateur (push). Ainsi, si l'utilisateur clique sur le bouton "Retour", il reviendra à la page précédente (dans ce cas, la page login).
- `navigate(from, { replace: true })` remplace l'entrée courante dans l'historique par la nouvelle. L'utilisateur ne pourra donc pas retourner à la page de login par le bouton "Retour", ce qui offre une meilleure expérience en empêchant de retourner à une page où l'on est déjà authentifié.

### ➤ Q3 : Après un POST, pourquoi fait-on `setProjects(prev => [...prev, data])` plutôt qu’un re-fetch `GET` ?
Cela permet d'éviter une requête réseau supplémentaire vers le serveur qui n'est pas nécessaire. En effet, lors du POST (création), le serveur (ou json-server) retourne dans la requête le projet fraîchement créé (incluant l'ID généré). On met ainsi l'état à jour directement, avec l'avantage de rendre l'application plus rapide et de réduire la charge sur l'API.

### ➤ Q4 : Testez ces scénarios :
a) **/dashboard sans être connecté** : L'application redirige automatiquement vers `/login`. La route mémorise le chemin de départ via `state={{ from: '/dashboard' }}` pour y revenir après connexion.
b) **/projects/1 sans être connecté** : Même comportement, redirection vers `/login` en conservant l'origin state `state={{ from: '/projects/1' }}` pour rediriger correctement après login.
c) **/nimportequoi** : L'utilisateur est redirigé vers `/dashboard` (via le Catch-all route `*` de l'application), puis la logique de la ProtectedRoute s'applique (redirection vers login si non connecté).
d) **/ (racine)** : La route `/` effectue un `Navigate replace` vers `/dashboard`. S'il n'est pas connecté, cela finit sur `/login`. S'il l'est, le dashboard s'affiche simplement.
e) **Connecté puis bouton Retour du navigateur** : Lors du succès de l'authentification dans la page `/login`, on redirige l'utilisateur avec `replace: true`. En conséquence, le login disparaît de l'historique récent, empêchant de revenir sur le formulaire d'authentification par le bouton Précédent.

### ➤ Q5 : Quelle différence entre `<Link>` et `<NavLink>` ? Pourquoi NavLink ici ?
`<Link>` sert à naviguer sans recharger complètement la page. `<NavLink>` est une version avancée de `<Link>` qui intègre des informations d'état (`isActive`). Lorsque l'URL actuelle du navigateur correspond à la destination du lien, `<NavLink>` permet d'appliquer du style conditionnel (ici, nos classes `.active` pour du vert clair). Nous voulons, au clic sur l'élément de la sidebar, que le projet sélectionné apparaisse mis en évidence.

### ➤ Q6 : Ce composant [ProjectForm] sert pour le POST ET le PUT. Qu’est-ce qui change entre les deux usages ?
Ce qui change, c'est la fonction `onSubmit` passée dans ses arguments. L'appel au PUT a besoin de connaître l'ID du projet pour le cibler dans l'API REST `/projects/:id` (généralement on fournit aussi `initialName` et `initialColor` pour pré-remplir les données actuelles dans le formulaire !). L'appel au POST ne vise que la route racine `/projects` pour créer la nouvelle ressource sans aucun identifiant. 

### ➤ Q7 : Arrêtez json-server et tentez un POST. Le message s’affiche ?
Oui, grâce au système de gestion d'erreurs (le `catch` interceptant `axios.isAxiosError(err)` ou par l'état `error`). L'utilisateur voit apparaître la variable `error` sous la forme de l'alerte 'Erreur...' dans la page.

### ➤ Q8 : Avec fetch, un 404 ne lance PAS d’erreur. Avec Axios, que se passe-t-il ?
Par défaut, contrairement à l'API interne `fetch`, Axios considère tout code HTTP se trouvant en dehors de la plage normale du succès `2xx` (tel que `404` NotFound, `500` ServerError, `401` Unauthorized) comme une exception. Il rejette la Promise, donc cela active immédiatement l'exécution des instructions situées dans le bloc `catch` sans avoir besoin de faire de contrôle manuel sur la réponse (`if (!res.ok) throw...`).
