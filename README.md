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
