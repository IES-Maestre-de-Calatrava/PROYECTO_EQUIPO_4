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
CREATE TABLE Grupo (
    Id_Grupo INT(10) AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Centro VARCHAR(64) NOT NULL,
    Tutor INT(10) NOT NULL,
    FOREIGN KEY (Tutor) REFERENCES Usuarios(Id_Usuario)
);

CREATE TABLE Alumno_Grupo (
    Id_Usuario INT(10),
    Id_Grupo INT(10),
    PRIMARY KEY (Id_Usuario, Id_Grupo),
    FOREIGN KEY (Id_Usuario) REFERENCES Usuarios(Id_Usuario),
    FOREIGN KEY (Id_Grupo) REFERENCES Grupo(Id_Grupo)
);