--
-- PostgreSQL database dump
--

-- Dumped from database version 13.6 (Debian 13.6-1.pgdg110+1)
-- Dumped by pg_dump version 14.1

-- Started on 2022-05-25 18:13:12 EDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
set search_path to public;

DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;

CREATE TABLE preference(
    preference_id SERIAL NOT NULL,
    nom varchar(200) NOT NULL,
    debut time NOT NULL,
    fin time NOT NULL,
    PRIMARY KEY (preference_id)
);

CREATE TABLE usager (
    cip CHAR(8) NOT NULL,
    prenom varchar(200) NOT NULL,
    nom varchar(200) NOT NULL,
    cote_preference float NOT NULL DEFAULT 0.0,
	preference_id int NOT NULL DEFAULT 1,
    PRIMARY KEY (cip),
	FOREIGN KEY (preference_id) REFERENCES preference(preference_id)
);

CREATE TABLE session (
    session_id SERIAL NOT NULL,
    identifiant varchar(20) NOT NULL,
    periode daterange NOT NULL,
    PRIMARY KEY (session_id)
);

CREATE TABLE app(
    app_id SERIAL NOT NULL,
    nom varchar(200) NOT NULL,
    cours varchar(100) NOT NULL,
    PRIMARY KEY (app_id)
);

CREATE TABLE app_usager(
    app_id SERIAL NOT NULL,
    cip CHAR(8) NOT NULL,
    PRIMARY KEY (app_id, cip),
    FOREIGN KEY (app_id) REFERENCES app(app_id),
    FOREIGN KEY (cip) REFERENCES usager(cip)
);

CREATE TABLE usager_preference(
    cip CHAR(8) NOT NULL,
    preference_id SERIAL NOT NULL,
    app_id SERIAL,
    intendant BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (cip, app_id),
    FOREIGN KEY (app_id) REFERENCES app(app_id),
    FOREIGN KEY (cip) REFERENCES usager(cip),
    FOREIGN KEY (preference_id) REFERENCES preference(preference_id)
);

CREATE TABLE type_activite(
    type_id SERIAL NOT NULL,
    nom varchar(200) NOT NULL,
    PRIMARY KEY(type_id)
);

CREATE TABLE activite(
    activite_id SERIAL NOT NULL,
    nom varchar(200) NOT NULL,
    nom_groupe varchar(200) NOT NULL,
    local varchar(50) NOT NULL,
    periode tsrange NOT NULL,
    app_id SERIAL NOT NULL,
    type_id SERIAL NOT NULL,
    PRIMARY KEY (activite_id),
    FOREIGN KEY (app_id) REFERENCES app(app_id),
    FOREIGN KEY (type_id) REFERENCES type_activite(type_id)
);

CREATE TABLE activite_usager(
    activite_id SERIAL NOT NULL,
    cip CHAR(8) NOT NULL,
    PRIMARY KEY(activite_id, cip),
    FOREIGN KEY(activite_id) REFERENCES activite(activite_id),
    FOREIGN KEY(cip) REFERENCES usager(cip)
);

CREATE TABLE intendant(
    cip CHAR(8) NOT NULL,
    app_id SERIAL NOT NULL,
    PRIMARY KEY (cip,app_id),
    FOREIGN KEY (cip) REFERENCES usager(cip),
    FOREIGN KEY (app_id) REFERENCES app(app_id)
);

CREATE TABLE session_app(
    session_id SERIAL NOT NULL,
    app_id SERIAL NOT NULL,
    PRIMARY KEY (session_id,app_id),
    FOREIGN KEY (session_id) REFERENCES session(session_id),
    FOREIGN KEY (app_id) REFERENCES app(app_id)
);

CREATE TABLE usager_session(
	session_id SERIAL NOT NULL,
	cip CHAR(8) NOT NULL,
	nbr_echange int NOT NULL DEFAULT 3,
	PRIMARY KEY (session_id,cip),
    FOREIGN KEY (session_id) REFERENCES session(session_id),
    FOREIGN KEY (cip) REFERENCES usager(cip)
);
CREATE TABLE groupe(
   cip CHAR(8) NOT NULL,
   activite_id SERIAL NOT NULL,
   intendant BOOLEAN NOT NULL,
   PRIMARY KEY (cip,activite_id),
   FOREIGN KEY (cip) REFERENCES usager(cip),
   FOREIGN KEY (activite_id) REFERENCES activite(activite_id)
);

CREATE TABLE changement_activite(
    cip CHAR(8) NOT NULL,
    activite_id SERIAL NOT NULL,
    date_changement timestamp NOT NULL,
    PRIMARY KEY (cip,activite_id),
    FOREIGN KEY (cip) REFERENCES usager(cip),
    FOREIGN KEY (activite_id) REFERENCES activite(activite_id)
);

INSERT INTO type_activite(nom) VALUES 
('Tutorat d''ouverture'),('Tutorat de fermeture');
INSERT INTO preference(nom,debut,fin) VALUES
('Avant-midi','08:00:00', '12:00:00'),
('Après-midi', '12:00:00', '18:00:00');
INSERT INTO usager(cip,prenom,nom) VALUES
('aubj1202', 'Joséanne', 'Aubut'),
('laft1301', 'Tristan', 'Lafontaine'),
('boie0601', 'Émile', 'Bois'),
('sehk2201', 'kenza', 'Sehnani'),
('sevm1802', 'Mathieu', 'Sévégny'),
('stds2101', 'Sébastien', 'St-Denis');
INSERT INTO session(session_id,identifiant,periode) VALUES
(1,'S3i','[2023-04-30 08:00:00, 2023-08-05]'),
(2,'S4i','[2023-08-30 08:00:00, 2023-12-24]');
INSERT INTO app(app_id,nom,cours) VALUES
(1, 'APP 1', 'GEN230'),
(2, 'APP 2', 'GEN230'),
(3, 'APP 3', 'GEN230'),
(4, 'APP 4', 'GEN230'),
(5, 'APP 5', 'GEN230'),
(6, 'APP 1', 'GEN430'),
(7, 'APP 2', 'GEN420');
INSERT INTO activite(nom,nom_groupe,local,periode,app_id,type_id)VALUES
('APP 1 : Tutorat 1', 'T1', 'C1-5130', '[2023-05-21 08:30:00, 2023-05-21 10:00:00]', 1, 1),
('APP 1 : Tutorat 1', 'T2', 'C1-5130', '[2023-05-21 10:00:00, 2023-05-21 11:30:00]', 1, 1),
('APP 1 : Tutorat 1', 'T3', 'C1-5130', '[2023-05-21 13:00:00, 2023-05-21 14:30:00]', 1, 1),
('APP 1 : Tutorat 1', 'T4', 'C1-5130', '[2023-05-21 14:30:00, 2023-05-21 16:00:00]', 1, 1),
('APP 1 : Tutorat 1', 'T5', 'C1-5130', '[2023-05-21 16:00:00, 2023-05-21 17:30:00]', 1, 1),

('APP 1 : Tutorat 2', 'T1', 'C1-5130', '[2023-05-28 08:30:00, 2023-05-28 10:00:00]', 1, 2),
('APP 1 : Tutorat 2', 'T2', 'C1-5130', '[2023-05-28 10:00:00, 2023-05-28 11:30:00]', 1, 2),
('APP 1 : Tutorat 2', 'T3', 'C1-5130', '[2023-05-28 13:00:00, 2023-05-28 14:30:00]', 1, 2),
('APP 1 : Tutorat 2', 'T4', 'C1-5130', '[2023-05-28 14:30:00, 2023-05-28 16:00:00]', 1, 2),
('APP 1 : Tutorat 2', 'T5', 'C1-5130', '[2023-05-28 16:00:00, 2023-05-28 17:30:00]', 1, 2),

('APP 2 : Tutorat 1', 'T1', 'C1-5130', '[2023-06-06 08:30:00, 2023-06-06 10:00:00]', 2, 1),
('APP 2 : Tutorat 1', 'T2', 'C1-5130', '[2023-06-06 10:00:00, 2023-06-06 11:30:00]', 2, 1),
('APP 2 : Tutorat 1', 'T3', 'C1-5130', '[2023-06-06 13:00:00, 2023-06-06 14:30:00]', 2, 1),
('APP 2 : Tutorat 1', 'T4', 'C1-5130', '[2023-06-06 14:30:00, 2023-06-06 16:00:00]', 2, 1),
('APP 2 : Tutorat 1', 'T5', 'C1-5130', '[2023-06-06 16:00:00, 2023-06-06 17:30:00]', 2, 1),

('APP 2 : Tutorat 2', 'T1', 'C1-5130', '[2023-06-13 08:30:00, 2023-06-13 10:00:00]', 2, 2),
('APP 2 : Tutorat 2', 'T2', 'C1-5130', '[2023-06-13 10:00:00, 2023-06-13 11:30:00]', 2, 2),
('APP 2 : Tutorat 2', 'T3', 'C1-5130', '[2023-06-13 13:00:00, 2023-06-13 14:30:00]', 2, 2),
('APP 2 : Tutorat 2', 'T4', 'C1-5130', '[2023-06-13 14:30:00, 2023-06-13 16:00:00]', 2, 2),
('APP 2 : Tutorat 2', 'T5', 'C1-5130', '[2023-06-13 16:00:00, 2023-06-13 17:30:00]', 2, 2),

('APP 3 : Tutorat 1', 'T1', 'C1-5130', '[2023-06-20 08:30:00, 2023-06-20 10:00:00]', 3, 1),
('APP 3 : Tutorat 1', 'T2', 'C1-5130', '[2023-06-20 10:00:00, 2023-06-20 11:30:00]', 3, 1),
('APP 3 : Tutorat 1', 'T3', 'C1-5130', '[2023-06-20 13:00:00, 2023-06-20 14:30:00]', 3, 1),
('APP 3 : Tutorat 1', 'T4', 'C1-5130', '[2023-06-20 14:30:00, 2023-06-20 16:00:00]', 3, 1),
('APP 3 : Tutorat 1', 'T5', 'C1-5130', '[2023-06-20 16:00:00, 2023-06-20 17:30:00]', 3, 1),

('APP 3 : Tutorat 2', 'T1', 'C1-5130', '[2023-06-27 08:30:00, 2023-06-27 10:00:00]', 3, 2),
('APP 3 : Tutorat 2', 'T2', 'C1-5130', '[2023-06-27 10:00:00, 2023-06-27 11:30:00]', 3, 2),
('APP 3 : Tutorat 2', 'T3', 'C1-5130', '[2023-06-27 13:00:00, 2023-06-27 14:30:00]', 3, 2),
('APP 3 : Tutorat 2', 'T4', 'C1-5130', '[2023-06-27 14:30:00, 2023-06-27 16:00:00]', 3, 2),
('APP 3 : Tutorat 2', 'T5', 'C1-5130', '[2023-06-27 16:00:00, 2023-06-27 17:30:00]', 3, 2),

('APP 4 : Tutorat 1', 'T1', 'C1-5130', '[2023-07-03 08:30:00, 2023-07-03 10:00:00]', 4, 1),
('APP 4 : Tutorat 1', 'T2', 'C1-5130', '[2023-07-03 10:00:00, 2023-07-03 11:30:00]', 4, 1),
('APP 4 : Tutorat 1', 'T3', 'C1-5130', '[2023-07-03 13:00:00, 2023-07-03 14:30:00]', 4, 1),
('APP 4 : Tutorat 1', 'T4', 'C1-5130', '[2023-07-03 14:30:00, 2023-07-03 16:00:00]', 4, 1),
('APP 4 : Tutorat 1', 'T5', 'C1-5130', '[2023-07-03 16:00:00, 2023-07-03 17:30:00]', 4, 1),

('APP 4 : Tutorat 2', 'T1', 'C1-5130', '[2023-07-10 08:30:00, 2023-07-10 10:00:00]', 4, 2),
('APP 4 : Tutorat 2', 'T2', 'C1-5130', '[2023-07-10 10:00:00, 2023-07-10 11:30:00]', 4, 2),
('APP 4 : Tutorat 2', 'T3', 'C1-5130', '[2023-07-10 13:00:00, 2023-07-10 14:30:00]', 4, 2),
('APP 4 : Tutorat 2', 'T4', 'C1-5130', '[2023-07-10 14:30:00, 2023-07-10 16:00:00]', 4, 2),
('APP 4 : Tutorat 2', 'T5', 'C1-5130', '[2023-07-10 16:00:00, 2023-07-10 17:30:00]', 4, 2),

('APP 5 : Tutorat 1', 'T1', 'C1-5130', '[2023-07-17 08:30:00, 2023-07-17 10:00:00]', 5, 1),
('APP 5 : Tutorat 1', 'T2', 'C1-5130', '[2023-07-17 10:00:00, 2023-07-17 11:30:00]', 5, 1),
('APP 5 : Tutorat 1', 'T3', 'C1-5130', '[2023-07-17 13:00:00, 2023-07-17 14:30:00]', 5, 1),
('APP 5 : Tutorat 1', 'T4', 'C1-5130', '[2023-07-17 14:30:00, 2023-07-17 16:00:00]', 5, 1),
('APP 5 : Tutorat 1', 'T5', 'C1-5130', '[2023-07-17 16:00:00, 2023-07-17 17:30:00]', 5, 1),

('APP 5 : Tutorat 2', 'T1', 'C1-5130', '[2023-07-24 08:30:00, 2023-07-24 10:00:00]', 5, 2),
('APP 5 : Tutorat 2', 'T2', 'C1-5130', '[2023-07-24 10:00:00, 2023-07-24 11:30:00]', 5, 2),
('APP 5 : Tutorat 2', 'T3', 'C1-5130', '[2023-07-24 13:00:00, 2023-07-24 14:30:00]', 5, 2),
('APP 5 : Tutorat 2', 'T4', 'C1-5130', '[2023-07-24 14:30:00, 2023-07-24 16:00:00]', 5, 2),
('APP 5 : Tutorat 2', 'T5', 'C1-5130', '[2023-07-24 16:00:00, 2023-07-24 17:30:00]', 5, 2);

INSERT INTO app_usager(app_id,cip) VALUES
(1,'aubj1202'),
(1,'laft1301'),
(1,'boie0601'),
(1,'sehk2201'),
(1,'sevm1802'),
(1,'stds2101'),
(2,'laft1301'),
(2,'sevm1802'),
(2,'stds2101'),
(3,'aubj1202'),
(3,'sehk2201');

INSERT INTO session_app (session_id,app_id) VALUES
(1,1),(1,2),(1,3),(1,4),(1,5),(2,6),(2,7);

INSERT INTO intendant(cip, app_id) VALUES
('laft1301',1),
('sevm1802',1),
('stds2101',2),
('aubj1202',3),
('sehk2201',3);

INSERT INTO usager_preference(cip, preference_id, app_id) VALUES
('laft1301',1,1),
('laft1301',1,2),
('stds2101',2,3),
('sevm1802',2,1),
('sevm1802',1,2);

INSERT INTO usager_session(cip,session_id)VALUES
('laft1301',1),
('sevm1802',1),
('stds2101',1),
('aubj1202',1),
('sehk2201',1);