-- Si existe, borramos la base de datos, y luego la creamos
-- Queremos que siempre que importemos este esquema se cree un esquema nuevo
DROP TABLE IF EXISTS frances;
CREATE DATABASE IF NOT EXISTS frances;
USE frances;

-- ======================================================
-- 1. CENTRO
-- ======================================================
CREATE TABLE CENTRO (
    ID_CENTRO INT AUTO_INCREMENT COMMENT 'Identificador único del centro educativo',
    NOMBRE VARCHAR(150) NOT NULL COMMENT 'Nombre del centro',
    LOCALIDAD VARCHAR(50) COMMENT 'Ciudad o localidad donde se encuentra el centro',
    
    PRIMARY KEY (ID_CENTRO)
) COMMENT = 'Tabla que almacena los centros educativos';

-- ======================================================
-- 2. ALUMNO
-- ======================================================
CREATE TABLE ALUMNO (
    ID_ALUMNO INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único del alumno',
    NOMBRE_USUARIO VARCHAR(20) NOT NULL UNIQUE COMMENT 'Nombre de usuario para iniciar sesión',
    CONTRASENA CHAR(64) NOT NULL COMMENT 'Contraseña encriptada en formato SHA-256',
    NOMBRE VARCHAR(20) NOT NULL COMMENT 'Nombre del alumno',
    APELLIDOS VARCHAR(64) NOT NULL COMMENT 'Apellidos completos del alumno',
    INSTITUTO VARCHAR(50) DEFAULT NULL COMMENT 'Nombre del instituto de procedencia',
    TELEFONO INT NOT NULL COMMENT 'Número de teléfono del alumno (incluye prefijo)',
    CORREO VARCHAR(50) NOT NULL UNIQUE COMMENT 'Correo electrónico del alumno',
    NIVEL VARCHAR(10) NOT NULL COMMENT 'Nivel académico de francés (A1, A2, B1, etc.)',
    RANGO VARCHAR(20) DEFAULT NULL COMMENT 'Categoría o rango dentro de la plataforma'
) COMMENT = 'Tabla que almacena la información de los alumnos';

-- ======================================================
-- 3. PROFESOR
-- ======================================================
CREATE TABLE PROFESOR (
    ID_PROFESOR INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único del profesor',
    NOMBRE_USUARIO VARCHAR(20) NOT NULL UNIQUE COMMENT 'Nombre de usuario del profesor',
    CONTRASENA CHAR(64) NOT NULL COMMENT 'Contraseña encriptada del profesor',
    NOMBRE VARCHAR(20) NOT NULL COMMENT 'Nombre del profesor',
    APELLIDOS VARCHAR(64) NOT NULL COMMENT 'Apellidos del profesor',
    INSTITUTO VARCHAR(50) COMMENT 'Centro educativo al que pertenece el profesor',
    TELEFONO INT NOT NULL COMMENT 'Número de teléfono del profesor',
    CORREO VARCHAR(50) NOT NULL UNIQUE COMMENT 'Correo electrónico del profesor',
    DIRECTOR TINYINT(1) NOT NULL COMMENT 'Indica si es director (1 = sí, 0 = no)'
) COMMENT = 'Tabla que almacena los profesores';

-- ======================================================
-- 4. GRUPO
-- ======================================================
CREATE TABLE GRUPO (
    ID_GRUPO INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único del grupo',
    NOMBRE VARCHAR(50) NOT NULL COMMENT 'Nombre del grupo (ej: Francés A1 Mañana)',
    TUTOR INT NOT NULL COMMENT 'ID del profesor que actúa como tutor del grupo',
    CODIGO VARCHAR(9) COMMENT 'Codigo autogenerado para unirse a un grupo, formato AAAA-0000'
    ID_CENTRO INT NOT NULL COMMENT 'ID del centro al que pertenece el grupo',
    
    CONSTRAINT FK_GRUPO_CENTRO FOREIGN KEY (ID_CENTRO) 
        REFERENCES CENTRO(ID_CENTRO),
        
    CONSTRAINT FK_GRUPO_TUTOR FOREIGN KEY (TUTOR) 
        REFERENCES PROFESOR(ID_PROFESOR)
) COMMENT = 'Tabla que almacena los grupos de alumnos';

-- ======================================================
-- 5. ALUMNO_GRUPO (N:M)
-- ======================================================
CREATE TABLE ALUMNO_GRUPO (
    ID_ALUMNO INT COMMENT 'ID del alumno asignado al grupo',
    ID_GRUPO INT COMMENT 'ID del grupo al que pertenece el alumno',
    
    PRIMARY KEY (ID_ALUMNO, ID_GRUPO),
    
    CONSTRAINT FK_ALUMNO_GRUPO_ALUMNO FOREIGN KEY (ID_ALUMNO) 
        REFERENCES ALUMNO(ID_ALUMNO) ON DELETE CASCADE,
        
    CONSTRAINT FK_ALUMNO_GRUPO_GRUPO FOREIGN KEY (ID_GRUPO) 
        REFERENCES GRUPO(ID_GRUPO) ON DELETE CASCADE
) COMMENT = 'Tabla intermedia que relaciona alumnos con grupos';

-- ======================================================
-- 6. ACTIVIDAD
-- ======================================================
CREATE TABLE ACTIVIDAD (
    ID_ACTIVIDAD INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único de la actividad',
    NOMBRE VARCHAR(50) NOT NULL COMMENT 'Nombre o título de la actividad',
    DIFICULTAD VARCHAR(64) NOT NULL COMMENT 'Nivel de dificultad de la actividad',
    ID_PROFESOR INT NOT NULL COMMENT 'Profesor que ha creado la actividad',
    DURACION TIME COMMENT 'Tiempo estimado para completar la actividad',
    FECHA_INICIO DATETIME NOT NULL COMMENT 'Fecha y hora en la que se activa la actividad',
    FECHA_FIN DATETIME COMMENT 'Fecha y hora en la que deja de estar disponible',
    FECHA_ENTREGA DATETIME NOT NULL COMMENT 'Fecha límite de entrega de la actividad',
    PREGUNTAS JSON COMMENT 'Contiene las preguntas que tendrá el ejercicio',
    RESPUESTAS_CORRECTAS JSON COMMENT 'Contiene las respuestas correctas a las preguntas',
    
    CONSTRAINT FK_ACTIVIDAD_PROFESOR FOREIGN KEY (ID_PROFESOR) 
        REFERENCES PROFESOR(ID_PROFESOR)
) COMMENT = 'Tabla que almacena las actividades académicas';

-- ======================================================
-- 7. ACTIVIDAD_GRUPO (N:M)
-- ======================================================
CREATE TABLE ACTIVIDAD_GRUPO (
    ID_GRUPO INT NOT NULL COMMENT 'ID del grupo al que se asigna la actividad',
    ID_ACTIVIDAD INT NOT NULL COMMENT 'ID de la actividad asignada',
    
    PRIMARY KEY (ID_GRUPO, ID_ACTIVIDAD),
    
    CONSTRAINT FK_AG_GRUPO FOREIGN KEY (ID_GRUPO) 
        REFERENCES GRUPO(ID_GRUPO) ON DELETE CASCADE,
        
    CONSTRAINT FK_AG_ACTIVIDAD FOREIGN KEY (ID_ACTIVIDAD) 
        REFERENCES ACTIVIDAD(ID_ACTIVIDAD) ON DELETE CASCADE
) COMMENT = 'Relación entre actividades y grupos';

-- ======================================================
-- 8. CONEXION
-- ======================================================
CREATE TABLE CONEXION (
    ID_CONEXION INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador unico de cada conexion'
    ID_ALUMNO INT NOT NULL COMMENT 'Alumno que inicia la sesión',
    ENTRADA DATETIME NOT NULL COMMENT 'Fecha y hora de inicio de sesión',
    SALIDA DATETIME COMMENT 'Fecha y hora de cierre de sesión',
    
    PRIMARY KEY (ID_CONEXION),
    
    CONSTRAINT FK_CONEXION_ALUMNO FOREIGN KEY (ID_ALUMNO) 
        REFERENCES ALUMNO(ID_ALUMNO) ON DELETE CASCADE
) COMMENT = 'Registro de accesos de los alumnos al sistema';
