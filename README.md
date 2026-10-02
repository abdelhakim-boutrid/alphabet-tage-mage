# Alphabet TAGE MAGE

Un convertisseur instantané pour apprendre la position des lettres : A ↔ 1, J ↔ 10, Q ↔ 17, Z ↔ 26.

## Lien🔗
  ↔ alphabettraining.vercel.app

## Utilisation

Saisir une lettre (majuscule ou minuscule) ou un entier entre 1 et 26. La réponse apparaît immédiatement. Les entrées invalides sont signalées sans afficher de correspondance trompeuse. Échap efface la saisie.

## Aperçu local

Depuis ce dossier, lancer `python3 -m http.server 4173 --directory dist`, puis ouvrir `http://localhost:4173`.

## Technique

HTML, CSS et JavaScript natifs. Aucun compte, dépendance, suivi ou serveur de calcul. Les conversions restent dans le navigateur. Interface française, responsive, compatible clavier et lecteurs d’écran.

Les fichiers à héberger sont dans `dist/`. Le fichier `vercel.json` configure leur publication sur Vercel.
