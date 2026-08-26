<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
session_start();
require_once __DIR__ . '/db.php';

function responder(array $datos, int $codigo = 200): void
{
    http_response_code($codigo);
    echo json_encode($datos, JSON_UNESCAPED_UNICODE);
    exit();
}

function usuarioActual(): string
{
    return trim((string) ($_SESSION['usuario'] ?? ''));
}

function exigirSesion(): string
{
    $usuario = usuarioActual();
    if ($usuario === '') {
        responder(['success' => false, 'message' => 'Necesitás iniciar sesión.'], 401);
    }
    return $usuario;
}

function exigirAdmin(PDO $pdo): string
{
    $usuario = exigirSesion();
    $consulta = $pdo->prepare('SELECT rol FROM usuarios WHERE username = :username LIMIT 1');
    $consulta->execute([':username' => $usuario]);
    if (($consulta->fetchColumn() ?: '') !== 'admin') {
        responder(['success' => false, 'message' => 'No tenés permisos de administrador.'], 403);
    }
    return $usuario;
}

try {
    $pdo = conectarBaseDeDatos();
    $accion = trim((string) ($_GET['accion'] ?? $_POST['accion'] ?? ''));

    if ($accion === 'publicaciones') {
        $consulta = $pdo->query(
                "SELECT pub.id, p.id_producto AS producto_id, pub.username, p.nombre AS titulo,
                    p.precio, p.descripcion, p.imagen, p.etiquetas, pub.creado_en
             FROM publicaciones pub
             JOIN productos p ON p.id_producto = pub.id_producto
             WHERE pub.estado = 'aprobado' ORDER BY pub.creado_en DESC"
        );
        responder(['success' => true, 'publicaciones' => $consulta->fetchAll()]);
    }

    if ($accion === 'crear-publicacion') {
        $usuario = exigirSesion();
        $titulo = trim((string) ($_POST['titulo'] ?? ''));
        $descripcion = trim((string) ($_POST['descripcion'] ?? ''));
        $precio = (float) ($_POST['precio'] ?? 0);
        $imagen = trim((string) ($_POST['imagen'] ?? ''));
        $etiquetas = json_decode((string) ($_POST['etiquetas'] ?? '[]'), true);
        $etiquetasPermitidas = [
            'Dulce', 'Salado', 'Agridulce', 'Relleno', 'Sin relleno',
            'Panificados', 'Facturas', 'Tortas', 'Budines', 'Galletitas',
            'Medialunas', 'Pastelería', 'Integral', 'Sin azúcar',
        ];
        $etiquetas = is_array($etiquetas) ? array_values(array_unique(array_intersect($etiquetas, $etiquetasPermitidas))) : [];
        if ($titulo === '' || $descripcion === '' || $precio < 0 || count($etiquetas) < 2) {
            responder(['success' => false, 'message' => 'Completá título, precio y descripción, y elegí al menos dos etiquetas.'], 422);
        }
        $consulta = $pdo->prepare(
            'INSERT INTO publicaciones (username, titulo, precio, descripcion, imagen, etiquetas)
             VALUES (:username, :titulo, :precio, :descripcion, :imagen, :etiquetas)'
        );
        $consulta->execute([
            ':username' => $usuario, ':titulo' => $titulo, ':precio' => $precio,
            ':descripcion' => $descripcion, ':imagen' => $imagen, ':etiquetas' => json_encode($etiquetas, JSON_UNESCAPED_UNICODE),
        ]);
        responder(['success' => true, 'message' => 'Tu solicitud fue enviada. Esperá la aprobación del administrador.']);
    }

    if ($accion === 'admin-publicaciones') {
        exigirAdmin($pdo);
        $consulta = $pdo->query(
            "SELECT id, username, titulo, precio, descripcion, imagen, etiquetas, estado, mensaje_admin, creado_en
             FROM publicaciones ORDER BY creado_en DESC"
        );
        responder(['success' => true, 'publicaciones' => $consulta->fetchAll()]);
    }

    if ($accion === 'decidir-publicacion') {
        exigirAdmin($pdo);
        $id = (int) ($_POST['id'] ?? 0);
        $estado = trim((string) ($_POST['estado'] ?? ''));
        $mensajeAdmin = trim((string) ($_POST['mensaje'] ?? ''));
        if ($id < 1 || !in_array($estado, ['aprobado', 'rechazado'], true)) {
            responder(['success' => false, 'message' => 'Decisión inválida.'], 422);
        }
        if ($estado === 'rechazado' && $mensajeAdmin === '') {
            responder(['success' => false, 'message' => 'Escribí el motivo del rechazo para el vendedor.'], 422);
        }
        $pdo->beginTransaction();
        $buscar = $pdo->prepare(
            "SELECT pub.*, v.id_vendedor
             FROM publicaciones pub
             JOIN usuarios u ON u.username = pub.username
             LEFT JOIN vendedores v ON v.id_usuario = u.id_usuario
             WHERE pub.id = :id LIMIT 1"
        );
        $buscar->execute([':id' => $id]);
        $publicacion = $buscar->fetch();
        if (!$publicacion) {
            $pdo->rollBack();
            responder(['success' => false, 'message' => 'La publicación no existe.'], 404);
        }
        if ($estado === 'aprobado' && empty($publicacion['id_producto'])) {
            if (empty($publicacion['id_vendedor'])) {
                $pdo->rollBack();
                responder(['success' => false, 'message' => 'El vendedor no tiene un registro válido.'], 422);
            }
            $categoria = $pdo->query(
                "SELECT id_categoria FROM categorias WHERE nombre = 'Publicados recientemente' LIMIT 1"
            )->fetchColumn();
            $insertar = $pdo->prepare(
                'INSERT INTO productos (id_vendedor, id_categoria, nombre, descripcion, precio, stock, imagen, etiquetas)
                 VALUES (:id_vendedor, :id_categoria, :nombre, :descripcion, :precio, 1, :imagen, :etiquetas)'
            );
            $insertar->execute([
                ':id_vendedor' => $publicacion['id_vendedor'], ':id_categoria' => $categoria,
                ':nombre' => $publicacion['titulo'], ':descripcion' => $publicacion['descripcion'],
                ':precio' => $publicacion['precio'], ':imagen' => $publicacion['imagen'],
                ':etiquetas' => $publicacion['etiquetas'],
            ]);
            $publicacion['id_producto'] = $pdo->lastInsertId();
            $vincular = $pdo->prepare('UPDATE publicaciones SET id_producto = :id_producto WHERE id = :id');
            $vincular->execute([':id_producto' => $publicacion['id_producto'], ':id' => $id]);
        }
        $consulta = $pdo->prepare('UPDATE publicaciones SET estado = :estado, mensaje_admin = :mensaje WHERE id = :id');
        $consulta->execute([':estado' => $estado, ':mensaje' => $estado === 'rechazado' ? $mensajeAdmin : null, ':id' => $id]);
        $pdo->commit();
        responder(['success' => true]);
    }

    if ($accion === 'comprar') {
        $usuario = exigirSesion();
        $rolConsulta = $pdo->prepare('SELECT rol FROM usuarios WHERE username = :username LIMIT 1');
        $rolConsulta->execute([':username' => $usuario]);
        if ($rolConsulta->fetchColumn() !== 'cliente') {
            responder(['success' => false, 'message' => 'Solo los compradores pueden comprar productos.'], 403);
        }
        $id = (int) ($_POST['publicacion_id'] ?? 0);
        $consulta = $pdo->prepare(
            "INSERT IGNORE INTO compras (publicacion_id, username)
             SELECT id, :username FROM publicaciones WHERE id = :id AND estado = 'aprobado'"
        );
        $consulta->execute([':username' => $usuario, ':id' => $id]);
        if ($consulta->rowCount() === 0) {
            responder(['success' => false, 'message' => 'El producto no está disponible para comprar.'], 422);
        }
        responder(['success' => true, 'message' => 'Compra registrada. Ya podés comentar este producto.']);
    }

    if ($accion === 'comentarios') {
        $id = (int) ($_GET['publicacion_id'] ?? 0);
        $producto = $pdo->prepare(
            "SELECT id_producto FROM publicaciones WHERE id = :id AND estado = 'aprobado' LIMIT 1"
        );
        $producto->execute([':id' => $id]);
        $idProducto = $producto->fetchColumn();
        if (!$idProducto) {
            responder(['success' => true, 'comentarios' => []]);
        }
        $consulta = $pdo->prepare(
            "SELECT u.username, c.descripcion AS comentario, c.fecha AS creado_en
             FROM comentarios c JOIN usuarios u ON u.id_usuario = c.id_usuario
             WHERE c.id_producto = :id_producto AND c.estado = 'aprobado'
             ORDER BY c.fecha DESC"
        );
        $consulta->execute([':id_producto' => $idProducto]);
        responder(['success' => true, 'comentarios' => $consulta->fetchAll()]);
    }

    if ($accion === 'crear-comentario') {
        $usuario = exigirSesion();
        $id = (int) ($_POST['publicacion_id'] ?? 0);
        $comentario = trim((string) ($_POST['comentario'] ?? ''));
        $compra = $pdo->prepare('SELECT 1 FROM compras WHERE publicacion_id = :id AND username = :username LIMIT 1');
        $compra->execute([':id' => $id, ':username' => $usuario]);
        if (!$compra->fetchColumn()) {
            responder(['success' => false, 'message' => 'Solo podés comentar un producto que compraste.'], 403);
        }
        if ($comentario === '') {
            responder(['success' => false, 'message' => 'Escribí un comentario.'], 422);
        }
        $usuarioConsulta = $pdo->prepare('SELECT id_usuario FROM usuarios WHERE username = :username LIMIT 1');
        $usuarioConsulta->execute([':username' => $usuario]);
        $idUsuario = $usuarioConsulta->fetchColumn();
        $productoConsulta = $pdo->prepare(
            "SELECT id_producto FROM publicaciones WHERE id = :id AND estado = 'aprobado' LIMIT 1"
        );
        $productoConsulta->execute([':id' => $id]);
        $idProducto = $productoConsulta->fetchColumn();
        if (!$idUsuario || !$idProducto) {
            responder(['success' => false, 'message' => 'El producto no está disponible.'], 422);
        }
        $consulta = $pdo->prepare(
            'INSERT INTO comentarios (id_usuario, id_producto, descripcion, estado)
             VALUES (:id_usuario, :id_producto, :descripcion, \'pendiente\')'
        );
        $consulta->execute([
            ':id_usuario' => $idUsuario, ':id_producto' => $idProducto, ':descripcion' => $comentario,
        ]);
        responder(['success' => true, 'message' => 'Tu comentario fue enviado para revisión.']);
    }

    if ($accion === 'admin-comentarios') {
        exigirAdmin($pdo);
        $consulta = $pdo->query(
            'SELECT c.id_comentario AS id, c.id_producto AS publicacion_id,
                    u.username, c.descripcion AS comentario, c.estado, c.fecha AS creado_en
             FROM comentarios c JOIN usuarios u ON u.id_usuario = c.id_usuario
             ORDER BY c.fecha DESC'
        );
        responder(['success' => true, 'comentarios' => $consulta->fetchAll()]);
    }

    if ($accion === 'admin-clientes') {
        exigirAdmin($pdo);
        $consulta = $pdo->query(
            "SELECT id_usuario, username, nombre, apellido, correo, ciudad, fecha_registro
             FROM usuarios WHERE rol = 'cliente' ORDER BY fecha_registro DESC"
        );
        responder(['success' => true, 'clientes' => $consulta->fetchAll()]);
    }

    if ($accion === 'admin-vendedores') {
        exigirAdmin($pdo);
        $consulta = $pdo->query(
            "SELECT u.id_usuario, u.username, u.nombre, u.apellido, u.correo, u.ciudad,
                    v.nombre_negocio, v.reputacion, u.fecha_registro
             FROM usuarios u
             LEFT JOIN vendedores v ON v.id_usuario = u.id_usuario
             WHERE u.rol = 'vendedor' ORDER BY u.fecha_registro DESC"
        );
        responder(['success' => true, 'vendedores' => $consulta->fetchAll()]);
    }

    if ($accion === 'notificaciones-vendedor') {
        $usuario = exigirSesion();
        $consulta = $pdo->prepare(
            "SELECT id, titulo, estado, mensaje_admin, creado_en
             FROM publicaciones WHERE username = :username AND estado = 'rechazado'
             AND mensaje_admin IS NOT NULL ORDER BY creado_en DESC"
        );
        $consulta->execute([':username' => $usuario]);
        responder(['success' => true, 'notificaciones' => $consulta->fetchAll()]);
    }

    if ($accion === 'decidir-comentario') {
        exigirAdmin($pdo);
        $id = (int) ($_POST['id'] ?? 0);
        $estado = trim((string) ($_POST['estado'] ?? ''));
        if ($id < 1 || !in_array($estado, ['aprobado', 'rechazado'], true)) {
            responder(['success' => false, 'message' => 'Decisión inválida.'], 422);
        }
        $consulta = $pdo->prepare('UPDATE comentarios SET estado = :estado WHERE id_comentario = :id');
        $consulta->execute([':estado' => $estado, ':id' => $id]);
        responder(['success' => true]);
    }

    responder(['success' => false, 'message' => 'Acción no reconocida.'], 404);
} catch (PDOException $error) {
    error_log($error->getMessage());
    responder(['success' => false, 'message' => 'No se pudo completar la operación.'], 500);
}
