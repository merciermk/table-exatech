# Projet

Mise en place d'un dashboard / page d'acceuil lisible et évolutif pour pgc

## Objectif & contrainte

Pour se faire : 
- Rendre les informations importantes lisibles et accessibles rapidement
- Doit clairement définir les éléments par items (Dossiers administratifs/ recrutement académique etc... )
- S'adapte aux droits de l'utilisateur
- Afficher de maniére lisible les taches à faire / terminées.
- Le dashboard va évoluer et pourra s'agrandir afin d'acceuillir les prochains éléments de l'app. Il est donc important de garder une navigation claire.
- toujours dans une optique de lisibilité, seul les infomations importantes doivent être séléctionnées

## Proposition

Tout comme la premiére version, cette version se fera sous forme de rang par élement du menu, des cartes seront dans les éléments afin d'afficher les informations.
Comme le montre le screenshot l'idée est de reduire le nombre de données afin de ne pas surcharger d'informations.
- Le format carré contiendra une à trois information importante (chiffre || pourcentage)
- les cards auront deux états : tache á faire || tache terminé
- Tache à faire : La carte est de couleur 
- Tache terminée : la carte prend une couleur moins visible (voir screenshot) qui permet de bien differencier les deux états. Les cartes pourront afficher d'autres élements dans ce cas de figure.
- les cartes sont toutes cliquables
- les cartes sont statiques (explication de ce choix dans le paragraphe Explication des choix)

# Explication des choix

### Cartes statiques

La question c'est posé entre des cartes statiques et des changements de place en fonction des taches à terminer. Dans cette proposition, nous avons retenu une version statique pour les contraintes suivantes: 
- Changer les places des cartes perturbera les habitudes d'usage de l'utilisateur et la navigation en sera plus complexe (l'utilisateur habitué a trouver ses information a un endroit se reperera plus facilement. Si les changement se font en fonction des taches à finir, les cartes peuvent changer plusieurs fois par jours de place et rendre la navigation complèxe, surtout si dans l'avenir, d'autres éléments viennent s'ajouter)
- Le jeu de contraste entre les cartes des taches a faire et terminé rend facile la recherche de cette information.

### Le format carré et une seule information

- Le dashboard va s'agrandir, limiter le nombre d'informations à 3 ou 4 chiffres par rang permettra de s'assurer de la lisibilité de celui-ci quel que soit le nombre de rangs.
- Le complément d'information se trouve pour la plupart directement dans le lien.


# Proposition des informations du dashboard: 

## <b>Recrutement Académique</b>
### **Dossiers Académiques**
- Dossiers total => Permet d'avoir une vision du nombre de candidats potentiels.

### **Sélection des intervenants**
- Intervenants manquants => L'information la plus importante de cette item. On peut déduire de cette information que les matières sont completes / incomplétes. Les informations complémentaires sont accéssibles directement en arrivant sur la page sélection des intervenants

- Procés-verbaux à signer / Procés-verbaux déjà signés => Permet d'avoir une vision claire des travaux finis.

Les informations choisis si dessus sont deux informations opposées dans la chaine de travail de cet item. Cela permet d'avoir en un coup d'oeil l'avancement des taches

### **Affectation des intervenants**
- Intervenants manquants => L'interêt d'avoir ici aussi les intervenants manquants est le temps entre l'étape de la selection et de l'affectation. Il peut se passer des semaines/mois entre les deux étapes entrainant de possibles pertes (Annulation de candidature de l'intervenant etc...).uo.

## <b>Dossiers Administratifs</b>

### **Dossiers Administratifs** 
- Dossier à vérifier => Permet de connaitre l'état d'avancement des taches a faire des cet item
- Dossier en attente de remplissage  => Afin de connaitre de nombre de dossiers en attente de retour de l'intervenant
- Dossiers total

L'ensemble des trois informations permet de comprendre rapidement le nombre de taches pouvant être faite et celle en attente d'un retour extérieur (et eventuellement les relancer).

NDLR : Ici, un graphique peut avoir du sens

### **contrats**
#### carte taches à faire
- contrats créés
- informations à valider
- contrat à publier

#### carte taches terminées
- Tous les contrats sont publiés
- total des contrats signés
- graphique (SPS / SOL)

### **Demande de remboursement**
- Demande de remboursement à traiter

### **Ordre de mission**
- Ordres de missions à traiter


## <b>Signature de la direction</b>
- Documents à signer
Seule information importante ici










