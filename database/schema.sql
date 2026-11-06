-- Script de creación de Base de Datos y tablas para ELARA Books

CREATE DATABASE IF NOT EXISTS elara_books CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE elara_books;

-- Tabla de Categorías
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabla de Libros
CREATE TABLE IF NOT EXISTS libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(150) NOT NULL,
    categoria_id INT,
    calificacion DECIMAL(3, 2) DEFAULT 0.00,
    anio_publicacion INT NOT NULL,
    isbn VARCHAR(20) UNIQUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabla de Reseñas
CREATE TABLE IF NOT EXISTS resenas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    libro_id INT NOT NULL,
    usuario_id INT NOT NULL,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    comentario TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (libro_id) REFERENCES libros(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Datos de Prueba (Seed Data)
INSERT INTO categorias (nombre, descripcion) VALUES
('Ficción', 'Novelas de ficción general y literatura narrativa.'),
('Ciencia Ficción', 'Libros sobre tecnología futura, espacio y mundos distópicos.'),
('Desarrollo Personal', 'Guías de crecimiento personal, hábitos y productividad.'),
('Historia', 'Ensayos y relatos basados en eventos históricos.');

INSERT INTO libros (titulo, autor, categoria_id, calificacion, anio_publicacion, isbn) VALUES
('Cien Años de Soledad', 'Gabriel García Márquez', 1, 4.80, 1967, '978-0307474728'),
('Dune', 'Frank Herbert', 2, 4.70, 1965, '978-0441172719'),
('Hábitos Atómicos', 'James Clear', 3, 4.90, 2018, '978-0735211292'),
('Sapiens', 'Yuval Noah Harari', 4, 4.60, 2014, '978-0062316097'),
('Fahrenheit 451', 'Ray Bradbury', 2, 4.50, 1953, '978-1451673319');

INSERT INTO usuarios (nombre, correo) VALUES
('Edgar Polanco', 'edgar@example.com'),
('Henrik Oloroso', 'henrik@example.com'),
('Isaac Ramírez', 'isaac@example.com');

INSERT INTO resenas (libro_id, usuario_id, calificacion, comentario) VALUES
(1, 1, 5, 'Una obra maestra imprescindible de la literatura hispana.'),
(2, 2, 5, 'Excelente ambientación sci-fi y construcción de mundo impecable.'),
(3, 3, 4, 'Muy práctico y fácil de aplicar en el día a día.'),
(2, 1, 4, 'Un clásico genial del género.');
