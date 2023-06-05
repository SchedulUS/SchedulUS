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
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP SCHEMA IF EXISTS public;
CREATE SCHEMA public;

CREATE TABLE usager (
    cip CHAR(8) NOT NULL,
    prenom varchar(200) NOT NULL,
    nom varchar(200) NOT NULL,
    cote_preference float NOT NULL DEFAULT 0.0,
    PRIMARY KEY (cip)
);

CREATE TABLE `session` (
    session_id SERIAL NOT NULL,
    identifiant varchar(20) NOT NULL,
    periode daterange NOT NULL,
    PRIMARY KEY (`session`)
);

CREATE TABLE usager_session(
    cip CHAR(8) NOT NULL,
    session_id SERIAL NOT NULL,
    nbr_echange INT NOT NULL DEFAULT 3,
    PRIMARY KEY (cip, session_id)
    FOREIGN KEY (cip) REFERENCES usager(cip),
    FOREIGN KEY (session_id) REFERENCES `session`(session_id)
);

CREATE TABLE preference(
    preference_id SERIAL NOT NULL,
    nom varchar(200) NOT NULL,
    periode tsrange NOT NULL,
    PRIMARY KEY (preference_id)
);

CREATE TABLE app(
    app_id SERIAL NOT NULL,
    nom varchar(200) NOT NULL,
    cours varchar(100) NOT NULL,
    PRIMARY KEY (app_id)
);

CREATE TABLE usager_preference(
    cip CHAR(8) NOT NULL,
    preference_id SERIAL NOT NULL,
    app_id SERIAL,
    PRIMARY KEY (cip),
    FOREIGN KEY (app_id) REFERENCES app(app_id),
    FOREIGN KEY (cip) REFERENCES usager(cip),
    FOREIGN KEY (preference_id) REFERENCES `session`(preference_id)
);

CREATE TABLE type_activite(
    type_id SERIAL NOT NULL,
    nom varchar(200) NOT NULL,
    PRIMARY KEY(type_id)
);

CREATE TABLE activite(
    activite_id SERIAL NOT NULL,
    nom varchar(200) NOT NULL,
    periode daterange NOT NULL,
    app_id SERIAL NOT NULL,
    type_id SERIAL NOT NULL,
    PRIMARY KEY (activite_id),
    FOREIGN KEY (app_id) REFERENCES app(app_id),
    FOREIGN KEY (type_id) REFERENCES type_activite(type_id)
);