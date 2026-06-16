{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 # Backlog Produit & User Stories - Otaku Shop (V1 & V2)\
\
## \uc0\u55357 \u56534  Epic 1 : Navigation et Exp\'e9rience de Lecture (Le c\'9cur de la plateforme)\
\
**User Story 1.1 : Catalogue et D\'e9couverte**\
*En tant qu'utilisateur, je veux parcourir un catalogue m\'ealant hits mondiaux et p\'e9pites ind\'e9pendantes afin de d\'e9couvrir de nouvelles \'9cuvres \'e0 lire.*\
*   **Crit\'e8re 1 :** *\'c9tant donn\'e9* que je suis sur la page d'accueil, *Quand* je navigue sur le site, *Alors* je vois les \'9cuvres tri\'e9es par cat\'e9gories (Mangas, Webtoons, BD) et par popularit\'e9.\
*   **Crit\'e8re 2 :** *\'c9tant donn\'e9* que je cherche une \'9cuvre pr\'e9cise, *Quand* j'utilise la barre de recherche avec des mots-cl\'e9s, *Alors* le syst\'e8me me retourne des r\'e9sultats pertinents instantan\'e9ment.\
\
**User Story 1.2 : Lecteur Interactif**\
*En tant que lecteur, je veux utiliser un lecteur fluide et adapt\'e9 aux formats (scroll vertical pour webtoon, page par page pour manga) afin d'avoir une exp\'e9rience de lecture optimale.*\
*   **Crit\'e8re 1 :** *\'c9tant donn\'e9* que je lance un Webtoon, *Quand* je fais d\'e9filer l'\'e9cran, *Alors* la lecture se fait en scroll vertical continu sans coupure.\
*   **Crit\'e8re 2 :** *\'c9tant donn\'e9* que je quitte la plateforme au milieu d'un chapitre, *Quand* je me reconnecte, *Alors* le lecteur me propose de reprendre ma lecture exactement l\'e0 o\'f9 je m'\'e9tais arr\'eat\'e9.\
\
---\
\
## \uc0\u55357 \u56592  Epic 2 : Gestion des Comptes et S\'e9curit\'e9\
\
**User Story 2.1 : Inscription et V\'e9rification**\
*En tant que nouvel arrivant, je veux cr\'e9er un compte s\'e9curis\'e9 via e-mail et mot de passe afin d'acc\'e9der \'e0 l'\'e9cosyst\'e8me Otaku Shop*.\
*   **Crit\'e8re 1 :** *\'c9tant donn\'e9* que je remplis le formulaire d'inscription, *Quand* je valide, *Alors* je re\'e7ois un e-mail avec un lien de v\'e9rification pour activer mon compte.\
*   **Crit\'e8re 2 :** *\'c9tant donn\'e9* que je tente d'acc\'e9der aux contenus payants sans compte, *Quand* je clique sur "Lire", *Alors* le syst\'e8me me redirige vers le tunnel d'inscription obligatoire.\
\
**User Story 2.2 : R\'e9cup\'e9ration de compte**\
*En tant qu'utilisateur ayant oubli\'e9 ses identifiants, je veux pouvoir r\'e9initialiser mon mot de passe afin de retrouver l'acc\'e8s \'e0 ma biblioth\'e8que*.\
*   **Crit\'e8re 1 :** *\'c9tant donn\'e9* que je clique sur "Mot de passe oubli\'e9", *Quand* je saisis mon adresse e-mail, *Alors* je re\'e7ois un lien s\'e9curis\'e9 et temporaire pour d\'e9finir un nouveau mot de passe.\
\
---\
\
## \uc0\u55357 \u56499  Epic 3 : \'c9cosyst\'e8me \'c9conomique et Paiements Hybrides\
\
**User Story 3.1 : Paiement Fiat (Monnaie classique via Stripe)**\
*En tant qu'utilisateur classique, je veux pouvoir acheter des chapitres ou m'abonner en payant en euros (ou autre devise) par carte bancaire afin d'utiliser la plateforme simplement*.\
*   **Crit\'e8re 1 :** *\'c9tant donn\'e9* que je valide mon panier, *Quand* je choisis "Paiement par carte", *Alors* la passerelle Stripe s'ouvre, accepte ma devise locale et s\'e9curise la transaction.\
\
**User Story 3.2 : Paiement Web3 et Crypto-monnaie**\
*En tant qu'utilisateur technophile, je veux payer mes achats en Bitcoin ou avec la "Monnaie Maison" d'Otaku Shop afin de profiter de l'\'e9cosyst\'e8me Web3*.\
*   **Crit\'e8re 1 :** *\'c9tant donn\'e9* que je poss\'e8de de la crypto sur la plateforme, *Quand* je finalise un achat, *Alors* mon solde en crypto-monnaie est d\'e9bit\'e9 instantan\'e9ment et j'acc\'e8de au contenu.\
\
---\
\
## \uc0\u55356 \u57256  Epic 4 : Propri\'e9t\'e9 Intellectuelle et Espace Cr\'e9ateur\
\
**User Story 4.1 : Hi\'e9rarchie stricte des droits d'affichage**\
*En tant que cr\'e9ateur d'une \'9cuvre (poss\'e9dant le statut d'Admin), je veux \'eatre le seul avec le Super Admin \'e0 d\'e9tenir par d\'e9faut les droits de modification de l'affichage visuel de mon \'9cuvre, afin d'en prot\'e9ger l'identit\'e9 artistique*.\
*   **Crit\'e8re 1 :** *\'c9tant donn\'e9* qu'une \'9cuvre est publi\'e9e, *Quand* un utilisateur standard ou un administrateur non invit\'e9 tente de modifier le design de l'interface associ\'e9e, *Alors* le syst\'e8me bloque l'action, car ce droit est strictement r\'e9serv\'e9 au Cr\'e9ateur-Admin et au Super Admin.\
*   **Crit\'e8re 2 :** *\'c9tant donn\'e9* que je suis connect\'e9 avec le r\'f4le de Super Admin, *Quand* j'acc\'e8de aux param\'e8tres d'affichage d'une \'9cuvre, *Alors* le syst\'e8me m'octroie syst\'e9matiquement tous les droits de modification visuelle sans restriction.\
\
**User Story 4.2 : Partage des permissions restreint aux Administrateurs**\
*En tant que cr\'e9ateur (Admin), je veux pouvoir d\'e9l\'e9guer mes droits d'affichage sp\'e9cifiquement \'e0 d'autres profils administrateurs afin de travailler en \'e9quipe sur le design de mon \'9cuvre*.\
*   **Crit\'e8re 1 :** *\'c9tant donn\'e9* que je suis le cr\'e9ateur principal, *Quand* je partage l'acc\'e8s dans mes param\'e8tres de droits, *Alors* le syst\'e8me v\'e9rifie que l'invit\'e9 poss\'e8de bien le r\'f4le "Administrateur" avant de lui octroyer les droits de modification du design.\
\
---\
\
## \uc0\u55357 \u56401  Epic 5 : Administration, LLM et Analytique (V2)\
\
**User Story 5.1 : Connexion Admin S\'e9curis\'e9e**\
*En tant qu'administrateur, je veux utiliser un format de connexion sp\'e9cifique pour acc\'e9der au back-office afin d'\'e9viter les piratages*.\
*   **Crit\'e8re 1 :** *\'c9tant donn\'e9* que j'ai les droits admin, *Quand* je me connecte avec le format "mailenentier_admin" (ex: nom@mail.com_admin), *Alors* j'acc\'e8de au tableau de bord r\'e9serv\'e9 au staff.\
\
**User Story 5.2 : Gestion rapide du catalogue**\
*En tant qu'administrateur, je veux ajouter des mangas et des tableaux de donn\'e9es depuis le site web afin de mettre \'e0 jour le catalogue sans toucher au code*.\
*   **Crit\'e8re 1 :** *\'c9tant donn\'e9* que je suis dans le back-office, *Quand* j'utilise le formulaire d'ajout (drag & drop des planches, titre, auteur), *Alors* l'\'9cuvre est instantan\'e9ment format\'e9e, optimis\'e9e et publi\'e9e sur le site.\
\
**User Story 5.3 : Personnalisation UI assist\'e9e par LLM**\
*En tant qu'administrateur autoris\'e9, je veux utiliser une IA (LLM) pour g\'e9n\'e9rer des interfaces de lecture personnalis\'e9es, sans alt\'e9rer l'\'9cuvre, afin d'offrir des ambiances uniques*.\
*   **Crit\'e8re 1 :** *\'c9tant donn\'e9* que je demande \'e0 l'IA de modifier l'interface d'un webtoon, *Quand* la requ\'eate est g\'e9n\'e9r\'e9e, *Alors* le code source emp\'eache strictement le LLM de modifier le fichier image des planches originales.\
*   **Crit\'e8re 2 :** *\'c9tant donn\'e9* qu'une modification touche aux visuels, *Quand* le syst\'e8me la d\'e9tecte, *Alors* il bloque l'application jusqu'\'e0 ce qu'une demande explicite soit valid\'e9e par un profil autoris\'e9.\
\
**User Story 5.4 : Analytique et Suivi des Performances**\
*En tant qu'administrateur, je veux consulter les statistiques d'utilisation (Analytics) afin de piloter la croissance de la plateforme*.\
*   **Crit\'e8re 1 :** *\'c9tant donn\'e9* que j'ouvre l'onglet Analytics, *Quand* la page charge, *Alors* je visualise les statistiques d\'e9taill\'e9es (trafic, comportement, revenus, \'9cuvres performantes).\
\
**User Story 5.5 : Cr\'e9ation de profil Admin r\'e9serv\'e9e au Super Admin**\
*En tant que Super Admin, je veux \'eatre le seul \'e0 pouvoir cr\'e9er ou promouvoir un compte au r\'f4le "Admin" afin qu'aucun administrateur ne puisse accorder des droits d'administration sans ma supervision directe*.\
*   **Crit\'e8re 1 :** *\'c9tant donn\'e9* que je suis connect\'e9 avec le r\'f4le Super Admin, *Quand* je promeus un utilisateur au r\'f4le "Admin" depuis le panneau de gestion, *Alors* la promotion est enregistr\'e9e et l'utilisateur obtient les droits administrateur.\
*   **Crit\'e8re 2 :** *\'c9tant donn\'e9* que je suis connect\'e9 avec le r\'f4le Admin (pas Super Admin), *Quand* je tente de promouvoir un utilisateur au r\'f4le "Admin" \uc0舒  que ce soit via l'interface ou directement via l'API \uc0舒 , *Alors* le syst\'e8me bloque l'action et retourne une erreur explicite.\
*   **Crit\'e8re 3 :** *\'c9tant donn\'e9* qu'un utilisateur quelconque tente de modifier son propre champ `role` en base de donn\'e9es, *Quand* la requ\'eate est re\'e7ue, *Alors* le syst\'e8me la rejette automatiquement quel que soit le r\'f4le de l'appelant.\
\
---\
\
## \uc0\u55357 \u56496  Epic 7 : Acc\'e8s NFT\
\
**User Story 7.1 : Acc\'e8s complet via possession de NFT**\
*En tant que d\'e9tenteur d'un NFT Otaku Shop, je veux que la plateforme reconnaisse automatiquement ma possession afin d'obtenir un acc\'e8s complet sans souscrire \'e0 un abonnement classique*.\
*   **Crit\'e8re 1 :** *\'c9tant donn\'e9* que je connecte mon wallet crypto depuis mon compte, *Quand* je signe le message de v\'e9rification, *Alors* le syst\'e8me v\'e9rifie c\'f4t\'e9 serveur que mon adresse d\'e9tient bien le NFT requis et att\'e0che le tier "nft" \'e0 mon profil sans jamais exposer de cl\'e9 blockchain au navigateur.\
*   **Crit\'e8re 2 :** *\'c9tant donn\'e9* que mon profil est au tier "nft", *Quand* j'acc\'e8de aux sections prot\'e9g\'e9es (manga, jeux, my-remix), *Alors* j'y acc\'e8de librement, exactement comme un abonn\'e9 classique.\
*   **Crit\'e8re 3 :** *\'c9tant donn\'e9* que je ne d\'e9tiens plus le NFT (revente ou transfert), *Quand* le syst\'e8me effectue sa v\'e9rification p\'e9riodique (toutes les 24h), *Alors* mon tier repasse automatiquement \'e0 "free" et mon acc\'e8s aux contenus prot\'e9g\'e9s est r\'e9voqu\'e9.\
*   **Crit\'e8re 4 :** *\'c9tant donn\'e9* que je n'ai ni abonnement ni NFT, *Quand* je navigue sur le site, *Alors* je n'ai acc\'e8s qu'\'e0 la galerie, l'aide et mon compte.\
\
---\
\
## \uc0\u55356 \u57262  Epic 6 : Gamification et Mode Jeu (V2)\
\
**User Story 6.1 : Mode D\'e9veloppeur (Jeux)**\
*En tant que d\'e9veloppeur, je veux acc\'e9der \'e0 un mode d\'e9veloppeur pour les jeux afin de tester mes cr\'e9ations avant leur mise en ligne*.\
*   **Crit\'e8re 1 :** *\'c9tant donn\'e9* que j'ai un acc\'e8s d\'e9veloppeur, *Quand* j'active le mode test sur le module de jeu, *Alors* je peux lancer et d\'e9boguer les \'e9l\'e9ments ludiques sans que cela ne soit visible par la communaut\'e9 publique.}