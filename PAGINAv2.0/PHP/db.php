<?php

declare(strict_types=1);

function conectarBaseDeDatos(): PDO
{
    $dsn = 'mysql:host=localhost;dbname=bd_delicia;charset=utf8mb4';

    $pdo = new PDO($dsn, 'root', '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    $pdo->exec('ALTER TABLE usuarios MODIFY rol VARCHAR(20) NOT NULL');

    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS publicaciones (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            titulo VARCHAR(180) NOT NULL,
            precio DECIMAL(12,2) NOT NULL DEFAULT 0,
            descripcion TEXT NOT NULL,
            imagen LONGTEXT NULL,
            estado ENUM("pendiente", "aprobado", "rechazado") NOT NULL DEFAULT "pendiente",
            creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX (estado),
            INDEX (username)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'
    );
    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS compras (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            publicacion_id INT UNSIGNED NOT NULL,
            username VARCHAR(100) NOT NULL,
            creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY compra_unica (publicacion_id, username),
            CONSTRAINT compras_publicacion_fk FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'
    );
    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS comentarios_publicaciones (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            publicacion_id INT UNSIGNED NOT NULL,
            username VARCHAR(100) NOT NULL,
            comentario TEXT NOT NULL,
            estado ENUM("pendiente", "aprobado", "rechazado") NOT NULL DEFAULT "pendiente",
            creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT comentarios_publicacion_fk FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'
    );

    try {
        $pdo->exec('ALTER TABLE publicaciones ADD COLUMN id_producto INT UNSIGNED NULL');
    } catch (PDOException $error) {
        if ($error->errorInfo[1] !== 1060) {
            throw $error;
        }
    }
    $pdo->exec('ALTER TABLE productos MODIFY imagen LONGTEXT NULL');
    $columnasNuevas = [
        ['productos', 'etiquetas', 'LONGTEXT NULL'],
        ['publicaciones', 'etiquetas', 'LONGTEXT NULL'],
        ['publicaciones', 'mensaje_admin', 'TEXT NULL'],
    ];
    $buscarColumna = $pdo->prepare(
        'SELECT COUNT(*) FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :tabla AND COLUMN_NAME = :columna'
    );
    foreach ($columnasNuevas as [$tabla, $columna, $definicion]) {
        $buscarColumna->execute([':tabla' => $tabla, ':columna' => $columna]);
        if (!$buscarColumna->fetchColumn()) {
            $pdo->exec("ALTER TABLE {$tabla} ADD COLUMN {$columna} {$definicion}");
        }
    }

    $admin = $pdo->prepare(
        'INSERT IGNORE INTO usuarios
            (username, nombre, apellido, dni, correo, password_hash, fecha_nacimiento, pais, ciudad, rol)
         VALUES
            (:username, :nombre, :apellido, :dni, :correo, :password_hash, :fecha_nacimiento, :pais, :ciudad, :rol)'
    );
    $admin->execute([
        ':username' => 'admin', ':nombre' => 'Administrador', ':apellido' => 'Delicia',
        ':dni' => 'ADMIN-0001', ':correo' => 'admin@delicia.local',
        ':password_hash' => password_hash('admin123', PASSWORD_DEFAULT),
        ':fecha_nacimiento' => '2000-01-01', ':pais' => 'Argentina', ':ciudad' => 'San Nicolás',
        ':rol' => 'admin',
    ]);

    $categoria = $pdo->prepare('SELECT id_categoria FROM categorias WHERE nombre = :nombre LIMIT 1');
    $categoria->execute([':nombre' => 'Publicados recientemente']);
    $idCategoria = $categoria->fetchColumn();
    if (!$idCategoria) {
        $crearCategoria = $pdo->prepare(
            'INSERT INTO categorias (nombre, descripcion) VALUES (:nombre, :descripcion)'
        );
        $crearCategoria->execute([
            ':nombre' => 'Publicados recientemente',
            ':descripcion' => 'Productos aprobados recientemente por el administrador.',
        ]);
        $idCategoria = (int) $pdo->lastInsertId();
    }

    $pdo->exec(
        "INSERT INTO vendedores (id_usuario, nombre_negocio, descripcion)
         SELECT u.id_usuario, CONCAT(u.nombre, ' ', u.apellido), 'Vendedor registrado en Delicia'
         FROM usuarios u
         WHERE u.rol = 'vendedor'
           AND NOT EXISTS (
               SELECT 1 FROM vendedores v WHERE v.id_usuario = u.id_usuario
           )"
    );

    $pendientesMigracion = $pdo->query(
        "SELECT p.id, p.username, p.titulo, p.precio, p.descripcion, p.imagen, p.etiquetas, v.id_vendedor
         FROM publicaciones p
         JOIN usuarios u ON u.username = p.username
         JOIN vendedores v ON v.id_usuario = u.id_usuario
         WHERE p.estado = 'aprobado' AND p.id_producto IS NULL"
    )->fetchAll();
    $insertarProducto = $pdo->prepare(
        'INSERT INTO productos (id_vendedor, id_categoria, nombre, descripcion, precio, stock, imagen, etiquetas)
         VALUES (:id_vendedor, :id_categoria, :nombre, :descripcion, :precio, 1, :imagen, :etiquetas)'
    );
    $vincularProducto = $pdo->prepare(
        'UPDATE publicaciones SET id_producto = :id_producto WHERE id = :id'
    );
    foreach ($pendientesMigracion as $publicacion) {
        $insertarProducto->execute([
            ':id_vendedor' => $publicacion['id_vendedor'], ':id_categoria' => $idCategoria,
            ':nombre' => $publicacion['titulo'], ':descripcion' => $publicacion['descripcion'],
            ':precio' => $publicacion['precio'], ':imagen' => $publicacion['imagen'],
            ':etiquetas' => $publicacion['etiquetas'],
        ]);
        $vincularProducto->execute([
            ':id_producto' => $pdo->lastInsertId(), ':id' => $publicacion['id'],
        ]);
    }

    $pdo->exec(
        "INSERT INTO comentarios (id_usuario, id_producto, descripcion, estado)
         SELECT u.id_usuario, pub.id_producto, cp.comentario, cp.estado
         FROM comentarios_publicaciones cp
         JOIN publicaciones pub ON pub.id = cp.publicacion_id AND pub.id_producto IS NOT NULL
         JOIN usuarios u ON u.username = cp.username
         WHERE NOT EXISTS (
             SELECT 1 FROM comentarios c
             WHERE c.id_usuario = u.id_usuario
               AND c.id_producto = pub.id_producto
               AND c.descripcion = cp.comentario
         )"
    );

    return $pdo;
}
