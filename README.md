## Bienvenue sur PaintBucket

Ce projet vous permet de colorier vos fichiers en noir et blanc au format PBM. Double-cliquez sur le fichier index.html
pour lancer le projet localement sur votre machine. Aucun serveur web n'est requis, seulement un navigateur web récent
(Chrome ou Chromium recommandé pour une meilleure gestion de la mémoire).

Utilisez le formulaire pour envoyer un fichier. Cochez la case Draw Picture pour afficher l'image directement dans le
navigateur (recommandé). Vous pouvez aussi demander à ce que le fichier soit généré, mais il est déconseillé de
télécharger les images de grande taille (plus d'explications ci-dessous), c'est à dire supérieures à 1Mo en noir et blanc
environ. Cela risque de faire crasher le navigateur.

### Choix du langage

Nous avons choisi d'utiliser le JavaScript comme langage de programmation pour ce projet.

#### Le JavaScript

JavaScript est un langage inadapté pour les tâches lourdes car l’exécution de scripts est rapidement limitée par les
navigateurs (ce que nous ignorions). Nous avons choisi ce langage afin d'améliorer nos compétences dans ce langage que
nous ne connaissions pas beaucoup (peu d’expérience) et éviter le Java avec lequel nous avons fait de très nombreux
projets à l'IUT.

L'application est découplée et conçue pour être évolutive et modulable :

  - **Bucket** est en charge de la gestion des images (gestion de l'upload, ...). Il est indépendant des modèles de
  données utilisés (listes, tableaux, autres) et délègue les opérations sur la matrice à Paint pour obtenir des données
  concrètes : Color ou Pixel.
  - **Paint** est en charge de la manipulation des matrices (conception, manipulation, colorisation, ...). Il est
  indépendant de Bucket et dépendant des modèles de données.
  - Le dossier **Components** contient les classes concrètes (Pixel, Color) utilisées dans nos algorithmes.
  - Le dossier **DataStructures** contient les modèles de données utilisés (LinkedElement et Head qui forment les
  LinkedLists et le DisjointSetsManager qui manipule les ensembles). Ces modèles de données sont indépendants du type
   de données qu'ils utilisent (Color, Pixel).
  - Le dossier **Exceptions** contient la définition des exceptions utilisées dans l'application.
  
L'application est également découplée du code HTML lui-même, il est possible de la greffer à n'importe quelle page
contenant un Canvas, un formulaire, une barre de chargement et quelques boutons.

#### Contraintes et limites

Le JavaScript provoque un certain nombre de contraintes majeures pour ce type de projet, que nous n'avions pas anticipées.

  - Le navigateur limite la RAM totale pouvant être utilisée par JavaScript. En conséquence, certaines
  images telles que la carte du monde (8,6 Mo) ne peuvent être colorées car beaucoup trop volumineuses une fois coloriées.
  - Le JavaScript ne sait pas manipuler les fichiers en dehors des formulaires. Il est nécessaire de passer par un
  formulaire pour pouvoir uploader l'image. Dans nos jeux de tests, nous ne pouvons donc pas simuler ce type d'upload.
  Nous avons donc utilisé des images générées pour vérifier le bon déroulement de l'algorithme (méthode testGenerate)
  avec un système pour "Mocker" Bucket, mais aussi testé chaque fonctionnalité unitairement. Cela garantit que la quasi-
  totalité des aspects fonctionnels soient testés.
  - Le JavaScript ne sait pas non plus écrire de fichiers. Lorsque vous téléchargez une image, vous accédez à un lien
  de type "data:" qui contient l'image encodée en base64. Cela provoque des ralentissements très, très importants lors
  du téléchargement. Cela est lié uniquement au navigateur (et non à notre algorithme) puisque l'image est déjà générée
  en mémoire.
  - Le JavaScript est un langage peu rapide dès qu'il nécessite de mettre en mémoire des objets. Par exemple, le parsing
  d'une image de 1Mo sans instanciations (donc sans "New", avec des tableaux uniquement) prend environ 150ms contre
  environ 1500ms avec instanciations, soit 10 fois plus, ce qui limite la manipulation d'images de grande taille.
  - Le JavaScript conserve le contexte d'exécution, tant que la page n'a pas été rafraîchie. Nous avons travaillé pour
  que le script se réinitialise correctement lors de plusieurs uploads successifs, mais il est recommandé de changer
  d'onglet si vous travaillez avec plusieurs images de grande taille, car la mémoire n'est pas toujours très bien gérée,
  surtout avec Iceweasel (Mozilla Firefox).
  
Nous avons donc travaillé afin d'optimiser au maximum nos algorithmes en limitant la consommation mémoire.

### Dépendances et bibliothèques

Nous n'utilisons aucune bibliothèque externe et ne nous reposons que sur les outils fournis nativement par JavaScript.

### Problèmes de performances

La version actuelle de notre projet contient les contraintes suivantes.

#### JavaScript

Le JavaScript étant un langage interprété, l'upload de fichiers de grande taille peut ralentir votre ordinateur
et consommer beaucoup de RAM. Certains fichiers peuvent même faire planter le navigateur. Nous avons travaillé afin
d'optimiser au mieux notre algorithme mais les performances ne peuvent atteindre celles d'un langage compilé.
Si votre navigateur indique que le script ne répond pas, vous pouvez cliquer sur continuer pour lui laisser plus
de temps. Continuer pendant une très longue durée peut ralentir votre ordinateur (sous Mozilla Firefox).

Nous avons réussi à colorier toutes les images fournies sauf la carte du monde qui provoque des dépassements mémoire.
Pour la carte de la France, il est conseillé de décocher la case de génération du lien de téléchargement.

#### Compatibilité

PaintBucket a été testé sous Google Chrome (Chromium) et Firefox (dont Iceweasel), dans leurs versions les plus récentes,
tournant sur Debian, Windows 7 et Windows 8.

Il semble que Google Chrome présente de meilleures performances que Firefox. Internet Explorer est fortement
déconseillé (risque de non support de certaines normes JavaScript).

#### Téléchargement

Il n'est actuellement pas possible de générer des fichiers de manière efficace nativement en JavaScript. La
technique que nous utilisons pour générer le fichier est la plus performante, mais les navigateurs ont des
difficultés à gérer des chaînes de caractères de plusieurs Mo (un fichier de 1 Mo aura un poids de 10 Mo en sortie
d'algorithme).

En cliquant sur le lien de téléchargement, vous serez redirigé vers une page dont l’URL contiendra l'ensemble
des données du fichier (qui sera alors immédiatement téléchargé). Cela peut planter votre navigateur. Le temps
d'attente n'est pas lié à notre algorithme (le fichier est généré et prêt à être téléchargé dès que l'image
s'affiche à l'écran) mais au temps de traitement des données par le navigateur.
