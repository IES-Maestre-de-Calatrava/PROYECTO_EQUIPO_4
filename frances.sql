CREATE DATABASE frances;
USE frances;

CREATE DATABASE IF NOT EXISTS GestionAcademica;
USE GestionAcademica;

-- ===================
--       CENTRO
-- ===================
CREATE TABLE Centro (
    Id_Centro INT(10),
    Localidad VARCHAR(50),
    PRIMARY KEY (Id_Centro, Localidad)
);

-- ===================
--       ALUMNO
-- ===================
CREATE TABLE Alumno (
    Id_Alumno INT(10) AUTO_INCREMENT PRIMARY KEY,
    Nombre_Usuario VARCHAR(20) NOT NULL,
    Contrasena CHAR(64) NOT NULL,
    Rol VARCHAR(20) NOT NULL,
    Nombre CHAR(20) NOT NULL,
    Apellidos CHAR(64) NOT NULL,
    Instituto CHAR(50) DEFAULT NULL,
    Telefono INT(9) NOT NULL,
    Correo VARCHAR(50) NOT NULL,
    Nivel VARCHAR(10) NOT NULL,
    Rango VARCHAR(20) DEFAULT NULL,
);

-- ===================
--        GRUPO
-- ===================
CREATE TABLE Grupo (
    Id_Grupo INT(10) AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Centro VARCHAR(64) NOT NULL, -- Referencia conceptual al nombre/centro
    Tutor INT(10) NOT NULL,
    Id_Centro INT(10),
    Localidad_Centro VARCHAR(50),
    -- Definición de la FK hacia Centro (Clave compuesta)
    CONSTRAINT FK_Grupo_Centro FOREIGN KEY (Id_Centro, Localidad_Centro) 
        REFERENCES Centro(Id_Centro, Localidad)
);

-- ===================
--    ALUMNO_GRUPO
-- ===================
CREATE TABLE Alumno_Grupo (
    Id_Usuario INT(10) COMMENT 'Identificador único del Usuario',
    Id_Grupo INT(10) COMMENT 'Identificador único del Grupo',
    PRIMARY KEY (Id_Usuario, Id_Grupo),
    CONSTRAINT FK_Relacion_Alumno FOREIGN KEY (Id_Usuario) 
        REFERENCES Alumno(Id_Alumno) ON DELETE CASCADE,
    CONSTRAINT FK_Relacion_Grupo FOREIGN KEY (Id_Grupo) 
        REFERENCES Grupo(Id_Grupo) ON DELETE CASCADE
);
-- ===================
--      PROFESOR
-- ===================
CREATE TABLE profesor (
    ID_PROFESOR NUMBER(10) NOT NULL COMMENT 'Identificador único del profesor',
    NOMBRE_USUARIO VARCHAR2(20) NOT NULL COMMENT 'Nombre de usuario en el sistema',
    CONTRASENA CHAR(64) NOT NULL COMMENT 'Clave segura (hash SHA-256)',
    NOMBRE CHAR(20) NOT NULL COMMENT 'Nombre del profesor',
    APELLIDOS CHAR(64) NOT NULL COMMENT 'Apellidos del profesor',
    INSTITUTO CHAR(50) NULL COMMENT 'Centro educativo al que pertenece',
    TELEFONO NUMBER(9) NOT NULL COMMENT 'Teléfono de contacto',
    CORREO VARCHAR2(50) NOT NULL COMMENT 'Correo electrónico institucional',
    DIRECTOR BOOLEAN NOT NULL COMMENT 'Indica si tiene rango de director',

    -- Definición de restricciones
    CONSTRAINT PK_PROFESOR PRIMARY KEY (ID_PROFESOR)
);
-- ===================
--      ACTIVIDAD
-- ===================
CREATE TABLE actividad (
    ID_ACTIVIDAD NUMBER(10) NOT NULL COMMENT 'Identificador único de la actividad',
    NOMBRE VARCHAR2(50) NOT NULL COMMENT 'Nombre descriptivo de la actividad',
    DIFICULTAD VARCHAR(64) NOT NULL COMMENT 'Nivel de dificultad de la tarea',
    ID_PROFESOR NUMBER(10) NOT NULL COMMENT 'Identificador del profesor que crea la actividad',
    DURACION DATE NULL COMMENT 'Duración estimada de la actividad',
    FECHA_INICIO DATETIME NOT NULL COMMENT 'Fecha y hora de inicio',
    FECHA_FIN DATETIME NULL COMMENT 'Fecha y hora de finalización',
    FECHA_ENTREGA DATETIME NOT NULL COMMENT 'Fecha límite de entrega',

    -- Definición de restricciones
    CONSTRAINT PK_ACTIVIDAD PRIMARY KEY (ID_ACTIVIDAD),
    CONSTRAINT FK_PROF_ACTIVIDAD FOREIGN KEY (ID_PROFESOR) REFERENCES profesor(ID_PROFESOR)
);
-- ===================
--   ACTIVIDAD_GRUPO
-- ===================
CREATE TABLE actividad_grupo (
    ID_GRUPO NUMBER(10) NOT NULL COMMENT 'Identificador del grupo',
    ID_ACTIVIDAD NUMBER(10) NOT NULL COMMENT 'Identificador de la actividad',
    
    -- Definición de restricciones
    CONSTRAINT PK_ACTIVIDAD_GRUPO PRIMARY KEY (ID_GRUPO, ID_ACTIVIDAD),
    CONSTRAINT FK_GRUPO_REL FOREIGN KEY (ID_GRUPO) REFERENCES grupos(ID_GRUPO),
    CONSTRAINT FK_ACT_REL FOREIGN KEY (ID_ACTIVIDAD) REFERENCES actividad(ID_ACTIVIDAD)
);