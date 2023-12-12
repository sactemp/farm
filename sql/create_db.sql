DROP DATABASE farm;
DROP USER farm_user;

CREATE USER farm_user WITH password '12345';

CREATE DATABASE farm
    WITH 
    OWNER = farm_user
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

GRANT ALL ON DATABASE farm TO postgres;
GRANT ALL ON DATABASE farm TO farm_user;
GRANT TEMPORARY, CONNECT ON DATABASE farm TO PUBLIC;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


