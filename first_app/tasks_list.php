<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include("conn.php");

header('Content-Type: application/json'); // Asegúrate de que la respuesta sea JSON

$query = "SELECT * FROM taskList";
$result = mysqli_query($connection, $query);

if (!$result) {
    die('Query failed: ' . mysqli_error($connection));
}

$json = array();
while ($row = mysqli_fetch_array($result)) {
    $json[] = array(
        'id' => $row['t_id'],
        'name' => $row['t_name'],
        'description' => $row['t_descript'],
        'createdAt' => $row['t_createdAt']
    );
}

echo json_encode($json);


