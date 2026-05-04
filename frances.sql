CREATE DATABASE frances;
USE frances;

CREATE TABLE usuarios (
	  ID INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador unico del usuario',
    EMAIL VARCHAR(100) NOT NULL COMMENT 'EMail del usuario',
    USERNAME VARCHAR(50) NOT NULL COMMENT 'Nombre de usuario',
    PASSWD CHAR(64) NOT NULL COMMENT 'Clave segura del usuario',
	  NOMBRE VARCHAR(50) NOT NULL COMMENT 'Nombre del usuario',
    APELLIDOS VARCHAR(150) NOT NULL COMMENT 'Apellidos del usuario',
    TELEFONO CHAR(9) NOT NULL COMMENT 'Telefono movil del usuario',
    INSTITUTO VARCHAR(50) NULL COMMENT 'Instituto al que asiste el usuario'
);
