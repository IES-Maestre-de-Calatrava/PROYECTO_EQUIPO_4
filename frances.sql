CREATE DATABASE frances;
USE frances;

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

CREATE TABLE actividad_grupo (
    ID_GRUPO NUMBER(10) NOT NULL COMMENT 'Identificador del grupo',
    ID_ACTIVIDAD NUMBER(10) NOT NULL COMMENT 'Identificador de la actividad',
    
    -- Definición de restricciones
    CONSTRAINT PK_ACTIVIDAD_GRUPO PRIMARY KEY (ID_GRUPO, ID_ACTIVIDAD),
    CONSTRAINT FK_GRUPO_REL FOREIGN KEY (ID_GRUPO) REFERENCES grupos(ID_GRUPO),
    CONSTRAINT FK_ACT_REL FOREIGN KEY (ID_ACTIVIDAD) REFERENCES actividad(ID_ACTIVIDAD)
);