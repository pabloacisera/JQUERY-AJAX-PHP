<?php
include "conn.php";  // Asegúrate de que esta línea esté correcta

// Establecemos el tipo de contenido como JSON
header('Content-Type: application/json');

// Recibimos el término de búsqueda
$search = isset($_POST['search']) ? $_POST['search'] : '';

// Si no hay término de búsqueda, devolvemos un array vacío
if (empty($search)) {
  echo json_encode([]);
  exit;
}

// Si hay un término de búsqueda, realizamos la consulta
$query = "SELECT * FROM taskList WHERE t_name LIKE '$search%'";
$result = mysqli_query($connection, $query);

// Verificamos si la consulta fue exitosa
if (!$result) {
  echo json_encode(['error' => 'Error en la consulta: ' . mysqli_error($connection)]);
  exit;
}

$json = array();  // Inicializamos el array para almacenar los resultados
while ($row = mysqli_fetch_array($result)) {
  // Agregamos cada tarea al array
  $json[] = array(
    'id' => $row['t_id'],
    'name' => $row['t_name'],
    'description' => $row['t_descript'],
    'createdAt' => $row['t_createdAt']
  );
}

// Devolvemos los resultados como JSON
echo json_encode($json);
?>

