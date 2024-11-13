##obtener datos de mysql y guardar en variantes

<?php

  include("conn.php");
  
  $query = "SELECT * FROM taskList";

  $result = mysqli_query($connection, $query);

  if(!$result){
    die('Query failed', mysqli_error($connection));
  };

  $json = array[];
  
  while($row = msqli_fetch_array($result)){
    $json[] = array(
      'name'=>$row['t_name'],
      'description'=>$row['t_descript'],
      'createdAt'=>$row['t_createdAt'],
      'id'=>$row['t_id']
    );
  }
  
  
  $jsonStr = json_encode($json);
  echo $jsonStr;

