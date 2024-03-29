

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET default_with_oids = false;


CREATE TABLE finishes
(
    score integer NOT NULL,
    name character varying(30)
);


INSERT INTO finishes VALUES (1000, 'jj abrams');
INSERT INTO finishes VALUES (4000, 'Minekiller');   
INSERT INTO finishes VALUES (3000, 'scientologist 69'); 
INSERT INTO finishes VALUES (44000, 'Tommy Cruise');
INSERT INTO finishes VALUES (55000, 'Travolta');
INSERT INTO finishes VALUES (66000, 'Travolta2');

