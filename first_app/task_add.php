<?php
include "conn.php";

if (isset($_POST['name']) && isset($_POST['description']) && !empty($_POST['name']) && !empty($_POST['description'])) {
    $name = $_POST['name'];
    $description = $_POST['description'];
    $date = date('Y-m-d H:i:s');  // Obtener la fecha y hora actuales

    // Escapar las cadenas para evitar problemas con comillas y ataques de inyección SQL
    $name = mysqli_real_escape_string($connection, $name);
    $description = mysqli_real_escape_string($connection, $description);

    // Crear la consulta SQL
    $query = "INSERT INTO taskList (t_name, t_descript, t_createdAt) VALUES ('$name', '$description', '$date')";

    // Verificar si la consulta está vacía (aunque no debería serlo si las variables son correctas)
    if (empty($query)) {
        die('Query is empty');
    }

    // Ejecutar la consulta
    $result = mysqli_query($connection, $query);

    if (!$result) {
        die('Query failed: ' . mysqli_error($connection));
    }

    echo 'Task saved successfully';
} else {
    echo 'Please provide both a name and description';
}
?>

