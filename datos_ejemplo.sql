-- ======================================================
-- Script para generar los datos de ejemplo que 
-- usaremos para el testing del api y del frontend
-- ======================================================

USE frances;

-- ======================================================
-- 1. INSERTAR DATOS EN CENTRO (50 entradas)
-- ======================================================
INSERT INTO CENTRO (NOMBRE, LOCALIDAD) VALUES
('IES San Isidro', 'Madrid'), ('IES Goya', 'Zaragoza'), ('IES El Greco', 'Toledo'), ('IES Cervantes', 'Madrid'), ('IES Antonio Machado', 'Soria'),
('IES Rosalía de Castro', 'Santiago'), ('IES Ramón y Cajal', 'Zaragoza'), ('IES Ribalta', 'Castellón'), ('IES Luis Vives', 'Valencia'), ('IES Jovellanos', 'Gijón'),
('IES Maestro Juan de Ávila', 'Ciudad Real'), ('IES Santa María de Alarcos', 'Ciudad Real'), ('IES Torreón del Alcázar', 'Ciudad Real'), ('IES Hernán Pérez del Pulgar', 'Ciudad Real'), ('IES Atenea', 'Ciudad Real'),
('IES Maestre de Calatrava', 'Ciudad Real'), ('IES Galileo Galilei', 'Puertollano'), ('IES Fray Andrés', 'Puertollano'), ('IES Dámaso Alonso', 'Puertollano'), ('IES Comendador Juan de Távora', 'Puertollano'),
('IES Bernardo de Balbuena', 'Valdepeñas'), ('IES Francisco Nieva', 'Valdepeñas'), ('IES Gregorio Prieto', 'Valdepeñas'), ('IES Juan Bosco', 'Alcázar de San Juan'), ('IES Miguel de Cervantes', 'Alcázar de San Juan'),
('IES María Zambrano', 'Alcázar de San Juan'), ('IES Eladio Cabañero', 'Tomelloso'), ('IES García Pavón', 'Tomelloso'), ('IES Alto Guadiana', 'Tomelloso'), ('IES Azuer', 'Manzanares'),
('IES Sotomayor', 'Manzanares'), ('IES Los Batanes', 'Viso del Marqués'), ('IES San Juan Bautista', 'Madrid'), ('IES Lope de Vega', 'Madrid'), ('IES Quevedo', 'Madrid'),
('IES Calderón de la Barca', 'Madrid'), ('IES Tirso de Molina', 'Madrid'), ('IES Garcilaso de la Vega', 'Toledo'), ('IES Carlos III', 'Toledo'), ('IES Alfonso X El Sabio', 'Toledo'),
('IES Princesa Galiana', 'Toledo'), ('IES Sefarad', 'Toledo'), ('IES Universidad Laboral', 'Toledo'), ('IES El Bosque', 'Madrid'), ('IES Las Musas', 'Madrid'),
('IES Salvador Dalí', 'Madrid'), ('IES Pablo Picasso', 'Barcelona'), ('IES Joan Miró', 'Barcelona'), ('IES Antoni Gaudí', 'Barcelona'), ('IES Montserrat Roig', 'Barcelona');


-- ======================================================
-- 2. INSERTAR DATOS EN ALUMNO (50 entradas)
-- Contraseña simulada SHA-256 (64 caracteres) para "123456": 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
-- ======================================================
INSERT INTO ALUMNO (NOMBRE_USUARIO, CONTRASENA, NOMBRE, APELLIDOS, INSTITUTO, TELEFONO, CORREO, NIVEL, RANGO) VALUES
('alumno01', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Alejandro', 'García López', 'IES San Isidro', 600100001, 'al01@correo.com', 'A1', 'Novato'),
('alumno02', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Beatriz', 'Martínez Gómez', 'IES Goya', 600100002, 'al02@correo.com', 'A1', 'Novato'),
('alumno03', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Carlos', 'Fernández Ruiz', 'IES El Greco', 600100003, 'al03@correo.com', 'A2', 'Intermedio'),
('alumno04', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Diana', 'Sánchez Díaz', 'IES Cervantes', 600100004, 'al04@correo.com', 'B1', 'Avanzado'),
('alumno05', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Elena', 'Pérez Martín', 'IES Antonio Machado', 600100005, 'al05@correo.com', 'B2', 'Experto'),
('alumno06', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Fernando', 'Gómez Jiménez', 'IES Rosalía de Castro', 600100006, 'al06@correo.com', 'A1', 'Novato'),
('alumno07', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Gabriel', 'Ruiz Muñoz', 'IES Ramón y Cajal', 600100007, 'al07@correo.com', 'A2', 'Intermedio'),
('alumno08', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Hugo', 'Díaz Álvarez', 'IES Ribalta', 600100008, 'al08@correo.com', 'B1', 'Avanzado'),
('alumno09', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Irene', 'Martín Romero', 'IES Luis Vives', 600100009, 'al09@correo.com', 'B2', 'Experto'),
('alumno10', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Javier', 'Jiménez Alonso', 'IES Jovellanos', 600100010, 'al10@correo.com', 'C1', 'Maestro'),
('alumno11', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Karla', 'Muñoz Gutiérrez', 'IES Maestro Juan de Ávila', 600100011, 'al11@correo.com', 'A1', 'Novato'),
('alumno12', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Luis', 'Álvarez Navarro', 'IES Santa María de Alarcos', 600100012, 'al12@correo.com', 'A2', 'Intermedio'),
('alumno13', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'María', 'Romero Torres', 'IES Torreón del Alcázar', 600100013, 'al13@correo.com', 'B1', 'Avanzado'),
('alumno14', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Natalia', 'Alonso Domínguez', 'IES Hernán Pérez del Pulgar', 600100014, 'al14@correo.com', 'B2', 'Experto'),
('alumno15', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Oscar', 'Gutiérrez Vázquez', 'IES Atenea', 600100015, 'al15@correo.com', 'C1', 'Maestro'),
('alumno16', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Pablo', 'Navarro Ramos', 'IES Maestre de Calatrava', 600100016, 'al16@correo.com', 'A1', 'Novato'),
('alumno17', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Quintín', 'Torres Gil', 'IES Galileo Galilei', 600100017, 'al17@correo.com', 'A2', 'Intermedio'),
('alumno18', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Raquel', 'Domínguez Blanco', 'IES Fray Andrés', 600100018, 'al18@correo.com', 'B1', 'Avanzado'),
('alumno19', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Silvia', 'Vázquez Molina', 'IES Dámaso Alonso', 600100019, 'al19@correo.com', 'B2', 'Experto'),
('alumno20', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Tomás', 'Ramos Morales', 'IES Comendador Juan de Távora', 600100020, 'al20@correo.com', 'A1', 'Novato'),
('alumno21', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Ursula', 'Gil Suárez', 'IES Bernardo de Balbuena', 600100021, 'al21@correo.com', 'A2', 'Intermedio'),
('alumno22', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Víctor', 'Blanco Ortega', 'IES Francisco Nieva', 600100022, 'al22@correo.com', 'B1', 'Avanzado'),
('alumno23', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Wendy', 'Molina Delgado', 'IES Gregorio Prieto', 600100023, 'al23@correo.com', 'B2', 'Experto'),
('alumno24', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Xavier', 'Morales Castro', 'IES Juan Bosco', 600100024, 'al24@correo.com', 'C1', 'Maestro'),
('alumno25', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Yolanda', 'Suárez Ortiz', 'IES Miguel de Cervantes', 600100025, 'al25@correo.com', 'A1', 'Novato'),
('alumno26', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Zacarías', 'Ortega Rubio', 'IES María Zambrano', 600100026, 'al26@correo.com', 'A2', 'Intermedio'),
('alumno27', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Ana', 'Delgado Marín', 'IES Eladio Cabañero', 600100027, 'al27@correo.com', 'B1', 'Avanzado'),
('alumno28', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Bruno', 'Castro Sanz', 'IES García Pavón', 600100028, 'al28@correo.com', 'B2', 'Experto'),
('alumno29', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Celia', 'Ortiz Iglesias', 'IES Alto Guadiana', 600100029, 'al29@correo.com', 'A1', 'Novato'),
('alumno30', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'David', 'Rubio Nuñez', 'IES Azuer', 600100030, 'al30@correo.com', 'A2', 'Intermedio'),
('alumno31', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Eva', 'Marín Medina', 'IES Sotomayor', 600100031, 'al31@correo.com', 'B1', 'Avanzado'),
('alumno32', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Félix', 'Sanz Garrido', 'IES Los Batanes', 600100032, 'al32@correo.com', 'B2', 'Experto'),
('alumno33', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Gloria', 'Iglesias Cortes', 'IES San Juan Bautista', 600100033, 'al33@correo.com', 'A1', 'Novato'),
('alumno34', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Héctor', 'Nuñez Castillo', 'IES Lope de Vega', 600100034, 'al34@correo.com', 'A2', 'Intermedio'),
('alumno35', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Inés', 'Medina Santos', 'IES Quevedo', 600100035, 'al35@correo.com', 'B1', 'Avanzado'),
('alumno36', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Jorge', 'Garrido Lozano', 'IES Calderón de la Barca', 600100036, 'al36@correo.com', 'B2', 'Experto'),
('alumno37', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Laura', 'Cortes Guerrero', 'IES Tirso de Molina', 600100037, 'al37@correo.com', 'C1', 'Maestro'),
('alumno38', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Manuel', 'Castillo Cano', 'IES Garcilaso de la Vega', 600100038, 'al38@correo.com', 'A1', 'Novato'),
('alumno39', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Nuria', 'Santos Prieto', 'IES Carlos III', 600100039, 'al39@correo.com', 'A2', 'Intermedio'),
('alumno40', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Óliver', 'Lozano Méndez', 'IES Alfonso X El Sabio', 600100040, 'al40@correo.com', 'B1', 'Avanzado'),
('alumno41', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Paula', 'Guerrero Cruz', 'IES Princesa Galiana', 600100041, 'al41@correo.com', 'B2', 'Experto'),
('alumno42', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Quique', 'Cano Gallego', 'IES Sefarad', 600100042, 'al42@correo.com', 'A1', 'Novato'),
('alumno43', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Rosa', 'Prieto Márquez', 'IES Universidad Laboral', 600100043, 'al43@correo.com', 'A2', 'Intermedio'),
('alumno44', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Samuel', 'Méndez Herrera', 'IES El Bosque', 600100044, 'al44@correo.com', 'B1', 'Avanzado'),
('alumno45', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Teresa', 'Cruz Peña', 'IES Las Musas', 600100045, 'al45@correo.com', 'B2', 'Experto'),
('alumno46', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Unai', 'Gallego Flores', 'IES Salvador Dalí', 600100046, 'al46@correo.com', 'C1', 'Maestro'),
('alumno47', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Vanesa', 'Márquez Cabrera', 'IES Pablo Picasso', 600100047, 'al47@correo.com', 'A1', 'Novato'),
('alumno48', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Walter', 'Herrera Campos', 'IES Joan Miró', 600100048, 'al48@correo.com', 'A2', 'Intermedio'),
('alumno49', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Ximena', 'Peña Vega', 'IES Antoni Gaudí', 600100049, 'al49@correo.com', 'B1', 'Avanzado'),
('alumno50', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Yago', 'Flores León', 'IES Montserrat Roig', 600100050, 'al50@correo.com', 'B2', 'Experto');


-- ======================================================
-- 3. INSERTAR DATOS EN PROFESOR (50 entradas)
-- ======================================================
INSERT INTO PROFESOR (NOMBRE_USUARIO, CONTRASENA, NOMBRE, APELLIDOS, INSTITUTO, TELEFONO, CORREO, DIRECTOR) VALUES
('prof01', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Alberto', 'Sánchez', 'IES San Isidro', 610100001, 'pr01@correo.com', 1),
('prof02', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Blanca', 'Pérez', 'IES Goya', 610100002, 'pr02@correo.com', 0),
('prof03', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Cristian', 'Martínez', 'IES El Greco', 610100003, 'pr03@correo.com', 1),
('prof04', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Daniela', 'García', 'IES Cervantes', 610100004, 'pr04@correo.com', 0),
('prof05', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Esteban', 'López', 'IES Antonio Machado', 610100005, 'pr05@correo.com', 1),
('prof06', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Fátima', 'Fernández', 'IES Rosalía de Castro', 610100006, 'pr06@correo.com', 0),
('prof07', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Gonzalo', 'Ruiz', 'IES Ramón y Cajal', 610100007, 'pr07@correo.com', 0),
('prof08', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Helena', 'Díaz', 'IES Ribalta', 610100008, 'pr08@correo.com', 1),
('prof09', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Ismael', 'Martín', 'IES Luis Vives', 610100009, 'pr09@correo.com', 0),
('prof10', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Juana', 'Jiménez', 'IES Jovellanos', 610100010, 'pr10@correo.com', 0),
('prof11', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Kiko', 'Muñoz', 'IES Maestro Juan de Ávila', 610100011, 'pr11@correo.com', 1),
('prof12', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Lorena', 'Álvarez', 'IES Santa María de Alarcos', 610100012, 'pr12@correo.com', 0),
('prof13', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Marcos', 'Romero', 'IES Torreón del Alcázar', 610100013, 'pr13@correo.com', 0),
('prof14', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Noelia', 'Alonso', 'IES Hernán Pérez del Pulgar', 610100014, 'pr14@correo.com', 1),
('prof15', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Omar', 'Gutiérrez', 'IES Atenea', 610100015, 'pr15@correo.com', 0),
('prof16', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Patricia', 'Navarro', 'IES Maestre de Calatrava', 610100016, 'pr16@correo.com', 0),
('prof17', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Quirico', 'Torres', 'IES Galileo Galilei', 610100017, 'pr17@correo.com', 1),
('prof18', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Rebeca', 'Domínguez', 'IES Fray Andrés', 610100018, 'pr18@correo.com', 0),
('prof19', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Sergio', 'Vázquez', 'IES Dámaso Alonso', 610100019, 'pr19@correo.com', 0),
('prof20', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Tamara', 'Ramos', 'IES Comendador Juan de Távora', 610100020, 'pr20@correo.com', 1),
('prof21', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Uriel', 'Gil', 'IES Bernardo de Balbuena', 610100021, 'pr21@correo.com', 0),
('prof22', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Verónica', 'Blanco', 'IES Francisco Nieva', 610100022, 'pr22@correo.com', 0),
('prof23', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'William', 'Molina', 'IES Gregorio Prieto', 610100023, 'pr23@correo.com', 1),
('prof24', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Xenia', 'Morales', 'IES Juan Bosco', 610100024, 'pr24@correo.com', 0),
('prof25', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Yael', 'Suárez', 'IES Miguel de Cervantes', 610100025, 'pr25@correo.com', 0),
('prof26', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Zoe', 'Ortega', 'IES María Zambrano', 610100026, 'pr26@correo.com', 1),
('prof27', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Amparo', 'Delgado', 'IES Eladio Cabañero', 610100027, 'pr27@correo.com', 0),
('prof28', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Borja', 'Castro', 'IES García Pavón', 610100028, 'pr28@correo.com', 0),
('prof29', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Carmen', 'Ortiz', 'IES Alto Guadiana', 610100029, 'pr29@correo.com', 1),
('prof30', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Diego', 'Rubio', 'IES Azuer', 610100030, 'pr30@correo.com', 0),
('prof31', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Estefanía', 'Marín', 'IES Sotomayor', 610100031, 'pr31@correo.com', 0),
('prof32', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Francisco', 'Sanz', 'IES Los Batanes', 610100032, 'pr32@correo.com', 1),
('prof33', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Gema', 'Iglesias', 'IES San Juan Bautista', 610100033, 'pr33@correo.com', 0),
('prof34', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Héctor', 'Nuñez', 'IES Lope de Vega', 610100034, 'pr34@correo.com', 0),
('prof35', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Isabel', 'Medina', 'IES Quevedo', 610100035, 'pr35@correo.com', 1),
('prof36', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Juan', 'Garrido', 'IES Calderón de la Barca', 610100036, 'pr36@correo.com', 0),
('prof37', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Lourdes', 'Cortes', 'IES Tirso de Molina', 610100037, 'pr37@correo.com', 0),
('prof38', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Miguel', 'Castillo', 'IES Garcilaso de la Vega', 610100038, 'pr38@correo.com', 1),
('prof39', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Noemí', 'Santos', 'IES Carlos III', 610100039, 'pr39@correo.com', 0),
('prof40', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Octavio', 'Lozano', 'IES Alfonso X El Sabio', 610100040, 'pr40@correo.com', 0),
('prof41', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Pilar', 'Guerrero', 'IES Princesa Galiana', 610100041, 'pr41@correo.com', 1),
('prof42', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Roberto', 'Cano', 'IES Sefarad', 610100042, 'pr42@correo.com', 0),
('prof43', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Sonia', 'Prieto', 'IES Universidad Laboral', 610100043, 'pr43@correo.com', 0),
('prof44', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Tomás', 'Méndez', 'IES El Bosque', 610100044, 'pr44@correo.com', 1),
('prof45', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Úrsula', 'Cruz', 'IES Las Musas', 610100045, 'pr45@correo.com', 0),
('prof46', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Vicente', 'Gallego', 'IES Salvador Dalí', 610100046, 'pr46@correo.com', 0),
('prof47', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Wanda', 'Márquez', 'IES Pablo Picasso', 610100047, 'pr47@correo.com', 1),
('prof48', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Xoán', 'Herrera', 'IES Joan Miró', 610100048, 'pr48@correo.com', 0),
('prof49', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Yaiza', 'Peña', 'IES Antoni Gaudí', 610100049, 'pr49@correo.com', 0),
('prof50', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Zaragoza', 'Flores', 'IES Montserrat Roig', 610100050, 'pr50@correo.com', 1);


-- ======================================================
-- 4. INSERTAR DATOS EN GRUPO (50 entradas)
-- ======================================================
INSERT INTO GRUPO (NOMBRE, TUTOR, CODIGO, ID_CENTRO) VALUES
('Francés A1 - Mañana', 1, 'FRAN-0001', 1), ('Francés A2 - Tarde', 2, 'FRAN-0002', 2), ('Francés B1 - Mañana', 3, 'FRAN-0003', 3), ('Francés B2 - Noche', 4, 'FRAN-0004', 4), ('Francés C1 - Intensivo', 5, 'FRAN-0005', 5),
('Francés A1 - G1', 6, 'FRAN-0006', 6), ('Francés A2 - G2', 7, 'FRAN-0007', 7), ('Francés B1 - G3', 8, 'FRAN-0008', 8), ('Francés B2 - G4', 9, 'FRAN-0009', 9), ('Francés C1 - G5', 10, 'FRAN-0010', 10),
('A1 Iniciación', 11, 'FRAN-0011', 11), ('A2 Básico', 12, 'FRAN-0012', 12), ('B1 Intermedio', 13, 'FRAN-0013', 13), ('B2 Avanzado', 14, 'FRAN-0014', 14), ('C1 Dominio', 15, 'FRAN-0015', 15),
('Taller A1', 16, 'FRAN-0016', 16), ('Taller A2', 17, 'FRAN-0017', 17), ('Taller B1', 18, 'FRAN-0018', 18), ('Taller B2', 19, 'FRAN-0019', 19), ('Taller C1', 20, 'FRAN-0020', 20),
('Conversación A1', 21, 'FRAN-0021', 21), ('Conversación A2', 22, 'FRAN-0022', 22), ('Conversación B1', 23, 'FRAN-0023', 23), ('Conversación B2', 24, 'FRAN-0024', 24), ('Conversación C1', 25, 'FRAN-0025', 25),
('Gramática A1', 26, 'FRAN-0026', 26), ('Gramática A2', 27, 'FRAN-0027', 27), ('Gramática B1', 28, 'FRAN-0028', 28), ('Gramática B2', 29, 'FRAN-0029', 29), ('Gramática C1', 30, 'FRAN-0030', 30),
('Vocabulario A1', 31, 'FRAN-0031', 31), ('Vocabulario A2', 32, 'FRAN-0032', 32), ('Vocabulario B1', 33, 'FRAN-0033', 33), ('Vocabulario B2', 34, 'FRAN-0034', 34), ('Vocabulario C1', 35, 'FRAN-0035', 35),
('Escucha A1', 36, 'FRAN-0036', 36), ('Escucha A2', 37, 'FRAN-0037', 37), ('Escucha B1', 38, 'FRAN-0038', 38), ('Escucha B2', 39, 'FRAN-0039', 39), ('Escucha C1', 40, 'FRAN-0040', 40),
('Redacción A1', 41, 'FRAN-0041', 41), ('Redacción A2', 42, 'FRAN-0042', 42), ('Redacción B1', 43, 'FRAN-0043', 43), ('Redacción B2', 44, 'FRAN-0044', 44), ('Redacción C1', 45, 'FRAN-0045', 45),
('Preparación DELF A1', 46, 'FRAN-0046', 46), ('Preparación DELF A2', 47, 'FRAN-0047', 47), ('Preparación DELF B1', 48, 'FRAN-0048', 48), ('Preparación DELF B2', 49, 'FRAN-0049', 49), ('Preparación DALF C1', 50, 'FRAN-0050', 50);


-- ======================================================
-- 5. INSERTAR DATOS EN ALUMNO_GRUPO (50 entradas)
-- ======================================================
INSERT INTO ALUMNO_GRUPO (ID_ALUMNO, ID_GRUPO) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10),
(11, 11), (12, 12), (13, 13), (14, 14), (15, 15), (16, 16), (17, 17), (18, 18), (19, 19), (20, 20),
(21, 21), (22, 22), (23, 23), (24, 24), (25, 25), (26, 26), (27, 27), (28, 28), (29, 29), (30, 30),
(31, 31), (32, 32), (33, 33), (34, 34), (35, 35), (36, 36), (37, 37), (38, 38), (39, 39), (40, 40),
(41, 41), (42, 42), (43, 43), (44, 44), (45, 45), (46, 46), (47, 47), (48, 48), (49, 49), (50, 50);


-- ======================================================
-- 6. INSERTAR DATOS EN ACTIVIDAD (50 entradas)
-- ======================================================
INSERT INTO ACTIVIDAD (NOMBRE, DIFICULTAD, ID_PROFESOR, DURACION, FECHA_INICIO, FECHA_FIN, FECHA_ENTREGA, PREGUNTAS, RESPUESTAS_CORRECTAS) VALUES
('Presentaciones Básicas', 'Fácil', 1, '00:30:00', '2026-05-01 08:00:00', '2026-05-15 23:59:00', '2026-05-15 23:59:00', '{"preguntas": ["¿Cómo te llamas?", "¿De dónde eres?"]}', '{"respuestas": ["Comment tu t\'appelles?", "D\'où viens-tu?"]}'),
('Verbo Être', 'Fácil', 2, '00:45:00', '2026-05-02 08:00:00', '2026-05-16 23:59:00', '2026-05-16 23:59:00', '{"preguntas": ["Yo soy", "Tú eres"]}', '{"respuestas": ["Je suis", "Tu es"]}'),
('Verbo Avoir', 'Fácil', 3, '00:45:00', '2026-05-03 08:00:00', '2026-05-17 23:59:00', '2026-05-17 23:59:00', '{"preguntas": ["Yo tengo", "Él tiene"]}', '{"respuestas": ["J\'ai", "Il a"]}'),
('Los colores', 'Fácil', 4, '00:20:00', '2026-05-04 08:00:00', '2026-05-18 23:59:00', '2026-05-18 23:59:00', '{"preguntas": ["Rojo", "Azul"]}', '{"respuestas": ["Rouge", "Bleu"]}'),
('Los números del 1 al 20', 'Fácil', 5, '00:30:00', '2026-05-05 08:00:00', '2026-05-19 23:59:00', '2026-05-19 23:59:00', '{"preguntas": ["Cinco", "Doce"]}', '{"respuestas": ["Cinq", "Douze"]}'),
('Días de la semana', 'Fácil', 6, '00:15:00', '2026-05-06 08:00:00', '2026-05-20 23:59:00', '2026-05-20 23:59:00', '{"preguntas": ["Lunes", "Viernes"]}', '{"respuestas": ["Lundi", "Vendredi"]}'),
('Meses del año', 'Fácil', 7, '00:20:00', '2026-05-07 08:00:00', '2026-05-21 23:59:00', '2026-05-21 23:59:00', '{"preguntas": ["Enero", "Julio"]}', '{"respuestas": ["Janvier", "Juillet"]}'),
('La familia', 'Fácil', 8, '00:40:00', '2026-05-08 08:00:00', '2026-05-22 23:59:00', '2026-05-22 23:59:00', '{"preguntas": ["Hermano", "Madre"]}', '{"respuestas": ["Frère", "Mère"]}'),
('Partes del cuerpo', 'Fácil', 9, '00:35:00', '2026-05-09 08:00:00', '2026-05-23 23:59:00', '2026-05-23 23:59:00', '{"preguntas": ["Cabeza", "Mano"]}', '{"respuestas": ["Tête", "Main"]}'),
('Animales domésticos', 'Fácil', 10, '00:25:00', '2026-05-10 08:00:00', '2026-05-24 23:59:00', '2026-05-24 23:59:00', '{"preguntas": ["Perro", "Gato"]}', '{"respuestas": ["Chien", "Chat"]}'),
('Verbos grupo 1 (-er)', 'Media', 11, '01:00:00', '2026-05-01 08:00:00', '2026-05-15 23:59:00', '2026-05-15 23:59:00', '{"preguntas": ["Yo hablo", "Nosotros comemos"]}', '{"respuestas": ["Je parle", "Nous mangeons"]}'),
('Verbos grupo 2 (-ir)', 'Media', 12, '01:00:00', '2026-05-02 08:00:00', '2026-05-16 23:59:00', '2026-05-16 23:59:00', '{"preguntas": ["Yo termino", "Vosotros elegís"]}', '{"respuestas": ["Je finis", "Vous choisissez"]}'),
('Artículos partitivos', 'Media', 13, '00:45:00', '2026-05-03 08:00:00', '2026-05-17 23:59:00', '2026-05-17 23:59:00', '{"preguntas": ["Del pan", "De la carne"]}', '{"respuestas": ["Du pain", "De la viande"]}'),
('Preposiciones de lugar', 'Media', 14, '00:40:00', '2026-05-04 08:00:00', '2026-05-18 23:59:00', '2026-05-18 23:59:00', '{"preguntas": ["Sobre la mesa", "Debajo de la cama"]}', '{"respuestas": ["Sur la table", "Sous le lit"]}'),
('La hora', 'Media', 15, '00:30:00', '2026-05-05 08:00:00', '2026-05-19 23:59:00', '2026-05-19 23:59:00', '{"preguntas": ["Son las dos", "Es mediodía"]}', '{"respuestas": ["Il est deux heures", "Il est midi"]}'),
('El tiempo atmosférico', 'Media', 16, '00:30:00', '2026-05-06 08:00:00', '2026-05-20 23:59:00', '2026-05-20 23:59:00', '{"preguntas": ["Hace sol", "Llueve"]}', '{"respuestas": ["Il fait beau", "Il pleut"]}'),
('La ropa', 'Media', 17, '00:35:00', '2026-05-07 08:00:00', '2026-05-21 23:59:00', '2026-05-21 23:59:00', '{"preguntas": ["Pantalón", "Camisa"]}', '{"respuestas": ["Pantalon", "Chemise"]}'),
('Alimentos', 'Media', 18, '00:40:00', '2026-05-08 08:00:00', '2026-05-22 23:59:00', '2026-05-22 23:59:00', '{"preguntas": ["Manzana", "Queso"]}', '{"respuestas": ["Pomme", "Fromage"]}'),
('Profesiones', 'Media', 19, '00:45:00', '2026-05-09 08:00:00', '2026-05-23 23:59:00', '2026-05-23 23:59:00', '{"preguntas": ["Médico", "Profesor"]}', '{"respuestas": ["Médecin", "Professeur"]}'),
('Lugares de la ciudad', 'Media', 20, '00:50:00', '2026-05-10 08:00:00', '2026-05-24 23:59:00', '2026-05-24 23:59:00', '{"preguntas": ["Panadería", "Cine"]}', '{"respuestas": ["Boulangerie", "Cinéma"]}'),
('Passé Composé 1', 'Difícil', 21, '01:15:00', '2026-05-01 08:00:00', '2026-05-15 23:59:00', '2026-05-15 23:59:00', '{"preguntas": ["Yo he comido", "Ella ha cantado"]}', '{"respuestas": ["J\'ai mangé", "Elle a chanté"]}'),
('Passé Composé 2 (Être)', 'Difícil', 22, '01:15:00', '2026-05-02 08:00:00', '2026-05-16 23:59:00', '2026-05-16 23:59:00', '{"preguntas": ["Él ha ido", "Ellas han venido"]}', '{"respuestas": ["Il est allé", "Elles sont venues"]}'),
('Imparfait', 'Difícil', 23, '01:20:00', '2026-05-03 08:00:00', '2026-05-17 23:59:00', '2026-05-17 23:59:00', '{"preguntas": ["Yo era", "Nosotros teníamos"]}', '{"respuestas": ["J\'étais", "Nous avions"]}'),
('Futur Simple', 'Difícil', 24, '01:00:00', '2026-05-04 08:00:00', '2026-05-18 23:59:00', '2026-05-18 23:59:00', '{"preguntas": ["Yo hablaré", "Él irá"]}', '{"respuestas": ["Je parlerai", "Il ira"]}'),
('Conditionnel Présent', 'Difícil', 25, '01:10:00', '2026-05-05 08:00:00', '2026-05-19 23:59:00', '2026-05-19 23:59:00', '{"preguntas": ["Yo querría", "Tú podrías"]}', '{"respuestas": ["Je voudrais", "Tu pourrais"]}'),
('Pronombres COI', 'Difícil', 26, '01:30:00', '2026-05-06 08:00:00', '2026-05-20 23:59:00', '2026-05-20 23:59:00', '{"preguntas": ["Le hablo a él", "Os digo la verdad"]}', '{"respuestas": ["Je lui parle", "Je vous dis la vérité"]}'),
('Pronombres COD', 'Difícil', 27, '01:30:00', '2026-05-07 08:00:00', '2026-05-21 23:59:00', '2026-05-21 23:59:00', '{"preguntas": ["Lo veo (a él)", "Las como (manzanas)"]}', '{"respuestas": ["Je le vois", "Je les mange"]}'),
('Pronombres Y / EN', 'Muy Difícil', 28, '01:45:00', '2026-05-08 08:00:00', '2026-05-22 23:59:00', '2026-05-22 23:59:00', '{"preguntas": ["Yo voy allí", "Quiero de eso"]}', '{"respuestas": ["J\'y vais", "J\'en veux"]}'),
('Subjonctif Présent', 'Muy Difícil', 29, '01:45:00', '2026-05-09 08:00:00', '2026-05-23 23:59:00', '2026-05-23 23:59:00', '{"preguntas": ["Es necesario que yo vaya", "Quiero que tú hables"]}', '{"respuestas": ["Il faut que j\'aille", "Je veux que tu parles"]}'),
('Discurso Indirecto', 'Muy Difícil', 30, '02:00:00', '2026-05-10 08:00:00', '2026-05-24 23:59:00', '2026-05-24 23:59:00', '{"preguntas": ["Él dice que viene", "Ella dijo que vendría"]}', '{"respuestas": ["Il dit qu\'il vient", "Elle a dit qu\'elle viendrait"]}'),
('Redacción: Mi familia', 'Fácil', 31, '00:45:00', '2026-05-01 08:00:00', '2026-05-15 23:59:00', '2026-05-15 23:59:00', '{"preguntas": ["Describe tu familia en francés (100 palabras)"]}', '{"respuestas": ["Respuesta libre"]}'),
('Redacción: Vacaciones', 'Media', 32, '01:00:00', '2026-05-02 08:00:00', '2026-05-16 23:59:00', '2026-05-16 23:59:00', '{"preguntas": ["Narra tus últimas vacaciones (150 palabras)"]}', '{"respuestas": ["Respuesta libre"]}'),
('Redacción: El futuro', 'Difícil', 33, '01:15:00', '2026-05-03 08:00:00', '2026-05-17 23:59:00', '2026-05-17 23:59:00', '{"preguntas": ["Cómo ves el mundo en 50 años (200 palabras)"]}', '{"respuestas": ["Respuesta libre"]}'),
('Comprensión: Audio 1', 'Fácil', 34, '00:30:00', '2026-05-04 08:00:00', '2026-05-18 23:59:00', '2026-05-18 23:59:00', '{"preguntas": ["¿De qué color es el coche en el audio?"]}', '{"respuestas": ["Rojo"]}'),
('Comprensión: Audio 2', 'Media', 35, '00:45:00', '2026-05-05 08:00:00', '2026-05-19 23:59:00', '2026-05-19 23:59:00', '{"preguntas": ["¿A qué hora sale el tren?"]}', '{"respuestas": ["A las 14:30"]}'),
('Comprensión: Texto 1', 'Difícil', 36, '01:00:00', '2026-05-06 08:00:00', '2026-05-20 23:59:00', '2026-05-20 23:59:00', '{"preguntas": ["¿Cuál es el argumento principal del autor?"]}', '{"respuestas": ["La importancia de reciclar"]}'),
('Vocabulario: Tecnología', 'Media', 37, '00:40:00', '2026-05-07 08:00:00', '2026-05-21 23:59:00', '2026-05-21 23:59:00', '{"preguntas": ["Ordenador", "Pantalla"]}', '{"respuestas": ["Ordinateur", "Écran"]}'),
('Vocabulario: Medio Ambiente', 'Difícil', 38, '00:50:00', '2026-05-08 08:00:00', '2026-05-22 23:59:00', '2026-05-22 23:59:00', '{"preguntas": ["Calentamiento global", "Sequía"]}', '{"respuestas": ["Réchauffement climatique", "Sécheresse"]}'),
('Pronombres Relativos', 'Difícil', 39, '01:10:00', '2026-05-09 08:00:00', '2026-05-23 23:59:00', '2026-05-23 23:59:00', '{"preguntas": ["El hombre que canta", "El libro que leo"]}', '{"respuestas": ["L\'homme qui chante", "Le livre que je lis"]}'),
('La Voix Passive', 'Muy Difícil', 40, '01:20:00', '2026-05-10 08:00:00', '2026-05-24 23:59:00', '2026-05-24 23:59:00', '{"preguntas": ["La manzana es comida por el niño"]}', '{"respuestas": ["La pomme est mangée par l\'enfant"]}'),
('Falsos Amigos', 'Media', 41, '00:45:00', '2026-05-11 08:00:00', '2026-05-25 23:59:00', '2026-05-25 23:59:00', '{"preguntas": ["Constipé", "Déception"]}', '{"respuestas": ["Resfriado", "Decepción"]}'),
('Expresiones Idiomáticas 1', 'Difícil', 42, '00:50:00', '2026-05-12 08:00:00', '2026-05-26 23:59:00', '2026-05-26 23:59:00', '{"preguntas": ["Avoir un chat dans la gorge"]}', '{"respuestas": ["Tener un nudo en la garganta / Estar afónico"]}'),
('Expresiones Idiomáticas 2', 'Muy Difícil', 43, '01:00:00', '2026-05-13 08:00:00', '2026-05-27 23:59:00', '2026-05-27 23:59:00', '{"preguntas": ["Poser un lapin"]}', '{"respuestas": ["Dejar plantado a alguien"]}'),
('Cultura Francesa', 'Media', 44, '00:30:00', '2026-05-14 08:00:00', '2026-05-28 23:59:00', '2026-05-28 23:59:00', '{"preguntas": ["¿Capital de Francia?", "¿Día Nacional?"]}', '{"respuestas": ["Paris", "14 Juillet"]}'),
('Historia de Francia', 'Difícil', 45, '00:45:00', '2026-05-15 08:00:00', '2026-05-29 23:59:00', '2026-05-29 23:59:00', '{"preguntas": ["¿Quién fue Juana de Arco?"]}', '{"respuestas": ["Héroïne française de la Guerre de Cent Ans"]}'),
('Geografía de Francia', 'Fácil', 46, '00:30:00', '2026-05-16 08:00:00', '2026-05-30 23:59:00', '2026-05-30 23:59:00', '{"preguntas": ["Río que cruza París", "Montaña más alta"]}', '{"respuestas": ["La Seine", "Le Mont Blanc"]}'),
('Gastronomía', 'Fácil', 47, '00:20:00', '2026-05-17 08:00:00', '2026-05-31 23:59:00', '2026-05-31 23:59:00', '{"preguntas": ["Pan típico largo", "Postre típico"]}', '{"respuestas": ["Baguette", "Macaron"]}'),
('Arte y Cine', 'Media', 48, '00:40:00', '2026-05-18 08:00:00', '2026-06-01 23:59:00', '2026-06-01 23:59:00', '{"preguntas": ["Museo más famoso de París"]}', '{"respuestas": ["Le Louvre"]}'),
('Verbos Pronominales', 'Media', 49, '01:00:00', '2026-05-19 08:00:00', '2026-06-02 23:59:00', '2026-06-02 23:59:00', '{"preguntas": ["Yo me levanto", "Tú te lavas"]}', '{"respuestas": ["Je me lève", "Tu te laves"]}'),
('Simulación Examen Final', 'Muy Difícil', 50, '02:30:00', '2026-05-20 08:00:00', '2026-06-10 23:59:00', '2026-06-10 23:59:00', '{"preguntas": ["Test global de conocimientos B2"]}', '{"respuestas": ["Multiples respuestas correctas"]}');


-- ======================================================
-- 7. INSERTAR DATOS EN ACTIVIDAD_GRUPO (50 entradas)
-- ======================================================
INSERT INTO ACTIVIDAD_GRUPO (ID_GRUPO, ID_ACTIVIDAD) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10),
(11, 11), (12, 12), (13, 13), (14, 14), (15, 15), (16, 16), (17, 17), (18, 18), (19, 19), (20, 20),
(21, 21), (22, 22), (23, 23), (24, 24), (25, 25), (26, 26), (27, 27), (28, 28), (29, 29), (30, 30),
(31, 31), (32, 32), (33, 33), (34, 34), (35, 35), (36, 36), (37, 37), (38, 38), (39, 39), (40, 40),
(41, 41), (42, 42), (43, 43), (44, 44), (45, 45), (46, 46), (47, 47), (48, 48), (49, 49), (50, 50);


-- ======================================================
-- 8. INSERTAR DATOS EN CONEXION (50 entradas)
-- ======================================================
INSERT INTO CONEXION (ID_ALUMNO, ENTRADA, SALIDA) VALUES
(1, '2026-05-01 10:00:00', '2026-05-01 11:30:00'), (2, '2026-05-01 10:15:00', '2026-05-01 11:45:00'), (3, '2026-05-01 10:30:00', '2026-05-01 12:00:00'),
(4, '2026-05-01 10:45:00', '2026-05-01 12:15:00'), (5, '2026-05-01 11:00:00', '2026-05-01 12:30:00'), (6, '2026-05-01 11:15:00', '2026-05-01 12:45:00'),
(7, '2026-05-01 11:30:00', '2026-05-01 13:00:00'), (8, '2026-05-01 11:45:00', '2026-05-01 13:15:00'), (9, '2026-05-01 12:00:00', '2026-05-01 13:30:00'),
(10, '2026-05-01 12:15:00', '2026-05-01 13:45:00'), (11, '2026-05-02 09:00:00', '2026-05-02 10:30:00'), (12, '2026-05-02 09:15:00', '2026-05-02 10:45:00'),
(13, '2026-05-02 09:30:00', '2026-05-02 11:00:00'), (14, '2026-05-02 09:45:00', '2026-05-02 11:15:00'), (15, '2026-05-02 10:00:00', '2026-05-02 11:30:00'),
(16, '2026-05-02 10:15:00', '2026-05-02 11:45:00'), (17, '2026-05-02 10:30:00', '2026-05-02 12:00:00'), (18, '2026-05-02 10:45:00', '2026-05-02 12:15:00'),
(19, '2026-05-02 11:00:00', '2026-05-02 12:30:00'), (20, '2026-05-02 11:15:00', '2026-05-02 12:45:00'), (21, '2026-05-03 16:00:00', '2026-05-03 17:30:00'),
(22, '2026-05-03 16:15:00', '2026-05-03 17:45:00'), (23, '2026-05-03 16:30:00', '2026-05-03 18:00:00'), (24, '2026-05-03 16:45:00', '2026-05-03 18:15:00'),
(25, '2026-05-03 17:00:00', '2026-05-03 18:30:00'), (26, '2026-05-03 17:15:00', '2026-05-03 18:45:00'), (27, '2026-05-03 17:30:00', '2026-05-03 19:00:00'),
(28, '2026-05-03 17:45:00', '2026-05-03 19:15:00'), (29, '2026-05-03 18:00:00', '2026-05-03 19:30:00'), (30, '2026-05-03 18:15:00', '2026-05-03 19:45:00'),
(31, '2026-05-04 08:00:00', '2026-05-04 09:30:00'), (32, '2026-05-04 08:15:00', '2026-05-04 09:45:00'), (33, '2026-05-04 08:30:00', '2026-05-04 10:00:00'),
(34, '2026-05-04 08:45:00', '2026-05-04 10:15:00'), (35, '2026-05-04 09:00:00', '2026-05-04 10:30:00'), (36, '2026-05-04 09:15:00', '2026-05-04 10:45:00'),
(37, '2026-05-04 09:30:00', '2026-05-04 11:00:00'), (38, '2026-05-04 09:45:00', '2026-05-04 11:15:00'), (39, '2026-05-04 10:00:00', '2026-05-04 11:30:00'),
(40, '2026-05-04 10:15:00', '2026-05-04 11:45:00'), (41, '2026-05-05 18:00:00', '2026-05-05 19:30:00'), (42, '2026-05-05 18:15:00', '2026-05-05 19:45:00'),
(43, '2026-05-05 18:30:00', '2026-05-05 20:00:00'), (44, '2026-05-05 18:45:00', '2026-05-05 20:15:00'), (45, '2026-05-05 19:00:00', '2026-05-05 20:30:00'),
(46, '2026-05-05 19:15:00', '2026-05-05 20:45:00'), (47, '2026-05-05 19:30:00', '2026-05-05 21:00:00'), (48, '2026-05-05 19:45:00', '2026-05-05 21:15:00'),
(49, '2026-05-05 20:00:00', '2026-05-05 21:30:00'), (50, '2026-05-05 20:15:00', '2026-05-05 21:45:00');