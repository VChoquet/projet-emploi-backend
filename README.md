# Lancement du projet

git clone https://github.com/VChoquet/projet-emploi-backend

cd projet-emploi-backend

npm install

npm run start:dev

# Requêtes POSTMAN

## Tests d'annonces

### get la totalité des annonces disponibles
GET http://localhost:8000/annonces

attendu => toutes les annonces apparaissent

### get une annonce parmi celle qui existe

GET http://localhost:8000/annonces/{id de l'annonce à récupérer} 

attendu => L'annonce apparait si l'id existe, sinon renvoi error 404

### creation d'une annonce

POST http://localhost:8000/annonces
body(raw JSON)
{
  "nom_employeur": "patron",
  "email": "patron@email.com",
  "intitule": "un poste",
  "ville": "Faaa",
  "description": "description complete",
  "type_contrat": "CDI",
  "date_creation": "Wed Dec 21 2022",
}
attendu => affiche l'annonce créée avec id généré et nb_visite initialisé à 0

### modifier une annonce parmi celles qui existe 
(utilisé pour update le nombre de visite de l'annonce)

PATCH http://localhost:8000/annonces/{id de l'annonce à modifier}
body (raw JSON)
{
  "nom_employeur": "un employeur",
  "email": "email@email.com",
  "intitule": "un poste sympa",
  "ville": "Papeete",
  "description": "la description d'un post",
  "type_contrat": "CDD",
  "date_creation": "Fri Dec 23 2022",
  "nb_visite": 22
}
attendu => rows_affected: 1 si l'annonce existe, rows_affected: 0 sinon
### suppression d'une annonce existante 

(pas utilisé mais utile dans l'optique de supprimer une annonce pour laquelle on a trouvé preneur)

DELETE http://localhost:8000/annonces/{id de l'annonce à supprimer}

attendu => rows_affected: 1 si l'annonce existe, rows_affected: 0 sinon

## Tests de candidatures:

### Get toutes les candidatures existantes

GET http://localhost:8000/candidatures

attendu => Toutes les candidatures apparaissent

### Get une candidature particulière

GET http://localhost:8000/candidatures/{id de la candidature}

attendu => la candidature apparait si elle existe, error 404 sinon


### creation d'une candidature

POST http://localhost:8000/candidatures/
body(raw JSON)
{
  "nom": "jean",
  "id_annonce": 1,
  "prenom": "peuplu",
  "email": "jeanPeuplu@email.com",
  "pathCV": "ici"
}
attendu => creation d'une candidature, pas de verification sur l'existance de l'annonce
### modifier une candidature
(pas utilisé mais envisageable de laisser les utilisateurs modifier le contenu de leur candidatures si erronée)

PATCH http://localhost:8000/candidatures/{id de la candidature a modifier}
body(raw JSON)
{
        "nom": "jean",
        "prenom": "peuplu",
        "email": "jeanPeuplu@email.com",
        "pathCV": "ici"
}
attendu => rows_affected: 1 si la candidature existe, rows_affected: 0 sinon

### suppression d'une candidature
(pas utilisé mais envisageable de supprimer toutes les candidatures liées à une annonce supprimée, ou si le candidat se désiste)

DELETE http://localhost:8000/candidatures/{id de la candidature a supprimer}

attendu => rows_affected: 1 si la candidature existe, rows_affected: 0 sinon
