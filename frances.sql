CREATE DATABASE IF NOT EXISTS frances;
USE frances;

-- ======================================================
-- 1. CENTRO
-- ======================================================
CREATE TABLE Centro (
    Id_Centro INT(10) COMMENT 'Identificador único del Centro educativo',
    Localidad VARCHAR(50) COMMENT 'Nombre de la localidad donde se ubica el centro',
    PRIMARY KEY (Id_Centro, Localidad)
) COMMENT = 'Almacena la información de las sedes o centros educativos';

-- ======================================================
-- 2. ALUMNO
-- ======================================================
CREATE TABLE Alumno (
    Id_Alumno INT(10) AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único y autoincremental del Alumno',
    Nombre_Usuario VARCHAR(20) NOT NULL COMMENT 'Nombre de usuario para el acceso al sistema',
    Contrasena CHAR(64) NOT NULL COMMENT 'Hash de la contraseña del alumno (SHA-256)',
    Nombre CHAR(20) NOT NULL COMMENT 'Nombre de pila del estudiante',
    Apellidos CHAR(64) NOT NULL COMMENT 'Apellidos completos del estudiante',
    Instituto CHAR(50) DEFAULT NULL COMMENT 'Nombre del instituto de procedencia',
    Telefono INT(9) NOT NULL COMMENT 'Número de teléfono de contacto del alumno',
    Correo VARCHAR(50) NOT NULL COMMENT 'Dirección de correo electrónico',
    Nivel VARCHAR(10) NOT NULL COMMENT 'Nivel académico actual (ej. A1, B2)',
    Rango VARCHAR(20) DEFAULT NULL COMMENT 'Rango o categoría dentro de la plataforma'
) COMMENT = 'Información personal y de acceso de los alumnos';

-- ======================================================
-- 3. GRUPO
-- ======================================================
CREATE TABLE Grupo (
    Id_Grupo INT(10) AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único del grupo de clase',
    Nombre VARCHAR(50) NOT NULL COMMENT 'Nombre descriptivo del grupo (ej. Francés Avanzado A)',
    Centro VARCHAR(64) NOT NULL COMMENT 'Referencia textual al centro asociado',
    Tutor INT(10) NOT NULL COMMENT 'Identificador del tutor responsable del grupo',
    Id_Centro INT(10) COMMENT 'ID del centro (FK)',
    Localidad_Centro VARCHAR(50) COMMENT 'Localidad del centro (FK)',
    CONSTRAINT FK_Grupo_Centro FOREIGN KEY (Id_Centro, Localidad_Centro) 
        REFERENCES Centro(Id_Centro, Localidad)
) COMMENT = 'Agrupaciones de alumnos gestionadas por un tutor y un centro';

-- ======================================================
-- 4. ALUMNO_GRUPO (Relación N:M)
-- ======================================================
CREATE TABLE Alumno_Grupo (
    Id_Usuario INT(10) COMMENT 'ID del alumno vinculado',
    Id_Grupo INT(10) COMMENT 'ID del grupo vinculado',
    PRIMARY KEY (Id_Usuario, Id_Grupo),
    CONSTRAINT FK_Relacion_Alumno FOREIGN KEY (Id_Usuario) 
        REFERENCES Alumno(Id_Alumno) ON DELETE CASCADE,
    CONSTRAINT FK_Relacion_Grupo FOREIGN KEY (Id_Grupo) 
        REFERENCES Grupo(Id_Grupo) ON DELETE CASCADE
) COMMENT = 'Tabla intermedia para asignar alumnos a sus respectivos grupos';

-- ======================================================
-- 5. PROFESOR
-- ======================================================
CREATE TABLE profesor (
    ID_PROFESOR INT(10) NOT NULL COMMENT 'Identificador único del personal docente',
    NOMBRE_USUARIO VARCHAR(20) NOT NULL COMMENT 'Credencial de usuario para el docente',
    CONTRASENA CHAR(64) NOT NULL COMMENT 'Contraseña encriptada del profesor',
    NOMBRE CHAR(20) NOT NULL COMMENT 'Nombre del docente',
    APELLIDOS CHAR(64) NOT NULL COMMENT 'Apellidos del docente',
    INSTITUTO CHAR(50) NULL COMMENT 'Centro educativo de adscripción',
    TELEFONO INT(9) NOT NULL COMMENT 'Teléfono móvil o fijo del profesor',
    CORREO VARCHAR(50) NOT NULL COMMENT 'Email de contacto profesional',
    DIRECTOR TINYINT(1) NOT NULL COMMENT 'Booleano: 1 si es director, 0 si no lo es',
    CONSTRAINT PK_PROFESOR PRIMARY KEY (ID_PROFESOR)
) COMMENT = 'Registro de profesores y sus privilegios';

-- ======================================================
-- 6. ACTIVIDAD
-- ======================================================
CREATE TABLE actividad (
    ID_ACTIVIDAD INT(10) NOT NULL COMMENT 'Identificador único de la tarea o ejercicio',
    NOMBRE VARCHAR(50) NOT NULL COMMENT 'Título de la actividad académica',
    DIFICULTAD VARCHAR(64) NOT NULL COMMENT 'Nivel de complejidad de la actividad',
    ID_PROFESOR INT(10) NOT NULL COMMENT 'ID del profesor que diseñó la actividad',
    DURACION TIME NULL COMMENT 'Tiempo estimado para completar la tarea',
    FECHA_INICIO DATETIME NOT NULL COMMENT 'Momento en que se habilita la actividad',
    FECHA_FIN DATETIME NULL COMMENT 'Momento en que se oculta la actividad',
    FECHA_ENTREGA DATETIME NOT NULL COMMENT 'Fecha límite para que el alumno envíe la respuesta',
    CONSTRAINT PK_ACTIVIDAD PRIMARY KEY (ID_ACTIVIDAD),
    CONSTRAINT FK_PROF_ACTIVIDAD FOREIGN KEY (ID_PROFESOR) REFERENCES profesor(ID_PROFESOR)
) COMMENT = 'Ejercicios y tareas creadas por el profesorado';

-- ======================================================
-- 7. ACTIVIDAD_GRUPO (Asignación de tareas a grupos)
-- ======================================================
CREATE TABLE actividad_grupo (
    ID_GRUPO INT(10) NOT NULL COMMENT 'ID del grupo que debe realizar la actividad',
    ID_ACTIVIDAD INT(10) NOT NULL COMMENT 'ID de la actividad asignada',
    PRIMARY KEY (ID_GRUPO, ID_ACTIVIDAD),
    CONSTRAINT FK_GRUPO_REL FOREIGN KEY (ID_GRUPO) REFERENCES Grupo(Id_Grupo),
    CONSTRAINT FK_ACT_REL FOREIGN KEY (ID_ACTIVIDAD) REFERENCES actividad(ID_ACTIVIDAD)
);
-- ===================
--   CONEXIÓN
-- ===================
CREATE TABLE conexion (
    ID_ALUMNO NUMBER(10) NOT NULL COMMENT 'Identificador del alumno conectado',
    ENTRADA DATETIME NOT NULL COMMENT 'Fecha y hora de inicio de la conexión',
    SALIDA DATETIME NULL COMMENT 'Fecha y hora de fin de la conexión',

    -- Definición de restricciones
    CONSTRAINT PK_CONEXION PRIMARY KEY (ID_ALUMNO)
);
