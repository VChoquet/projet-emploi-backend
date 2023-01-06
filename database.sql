/*creation de la base de données*/
CREATE DATABASE "manaoProjectDB"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'French_France.1252'
    LC_CTYPE = 'French_France.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

/*Creation de la table annonce*/
CREATE TABLE IF NOT EXISTS public.annonce
(
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nom_employeur character varying COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    email character varying COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    intitule character varying COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    ville character varying COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    description character varying COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    type_contrat character varying COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    nb_visite integer NOT NULL DEFAULT 0,
    date_creation character varying COLLATE pg_catalog."default" NOT NULL DEFAULT 'maintenant'::character varying,
);

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.annonce
    OWNER to postgres;


/*Creation de la table candidature*/
    CREATE TABLE IF NOT EXISTS public.candidature
(
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nom character varying COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    prenom character varying COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    email character varying COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    "pathCV" character varying COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    id_annonce character varying COLLATE pg_catalog."default" NOT NULL DEFAULT '1'::character varying,
);

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.candidature
    OWNER to postgres;

/*Possibilité de les ajouter plusieurs fois pour simuler un grand nombre d'annonce sur le front-end*/
/*Tuples à insérer dans annonce*/
INSERT INTO annonce(nom_employeur, email, intitule, ville, description, type_contrat, date_creation, nb_visite) values
    ("manao", "hello@manao.agency", "developpeur full stack", "creation d'un nouveau produit, creation
    back-end et front-end. Propositions de soultions pour la création, l'automatisation, la sécurisation 
    et l'industrialisation de l'application. Back-end: Java spring-boot ou framework Node.js. Front-end: React ou vue.js.
    Base de données postgreSQL et/ou NoSQL. Authentification: OpenID Connect, OAuth 2 plateforme Cloud, Continuous Integration/
    Continuous developpement, test unitaires/d'intégration, containerisation. Maîtrise de l'anglais.", "Stage", "hier", 234);

INSERT INTO annonce(nom_employeur, email, intitule, ville, description, type_contrat, date_creation, nb_visite) values
    ("employeur", "boos@email.com", "Poste interessant", "Lorem ipsum dolor sit amet, consectetur adipiscing 
    elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
    deserunt mollit anim id est laborum.", "CDI", "maintenant", 5615);

/*Tuples à insérer dans candidature*/
INSERT INTO candidature(id_annonce, nom, prenom, email, pathCV) values 
    ("1", "Choquet", "Valentin", "ValChok@outlook.fr", "/public/uploads/CV_Choquet_Valentin.pdf");

INSERT INTO candidature(id_annonce, nom, prenom, email, pathCV) values 
    ("2", "Peuplu", "Jean", "JeanPeuplu@email.fr", "ici");