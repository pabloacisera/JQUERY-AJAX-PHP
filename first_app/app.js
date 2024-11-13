$(document).ready(function() {
  // Función para cargar todas las tareas
  function loadTasks() {
    $.ajax({
      url: "tasks_list.php",
      type: "GET",
      success: function(r) {
        console.log('Respuesta recibida: ', r);

        // Parsear la respuesta
        try {
          let tasks = (typeof r === 'string') ? JSON.parse(r) : r;
          
          let template = '';
          
          // Verificamos si hay tareas
          if (tasks.length > 0) {
            tasks.forEach(task => {
              template += `
                <tr>
                  <td>${task.id}</td>
                  <td>${task.name}</td>
                  <td>${task.description}</td>
                  <td>${task.createdAt}</td>
                  <td>
                    <button>eliminar</button>
                  </td>
                </tr>
              `;
            });
          } else {
            template = '<tr><td colspan="4">No se encontraron tareas.</td></tr>';
          }
          
          // Inyectar las tareas en el cuerpo de la tabla
          $('#task-table-body').html(template);
          $('#container').show();  // Mostrar la sección de tareas
        } catch (e) {
          console.error("Error al parsear JSON: ", e);
        }
      },
      error: function(xhr, status, error) {
        console.log('Error en la solicitud: ', status, error);
      }
    });
  }

  // Llamar la función para cargar las tareas cuando la página se cargue por primera vez
  loadTasks();

  // Capturar formulario para agregar tareas
  $('#task-form').submit(function(e) {
    e.preventDefault();
    
    // Obtener valores de los campos de formulario
    let $name = $('#task-name').val();
    let $description = $('#task-description').val();

    console.log('Tarea:', $name);
    console.log('Descripción:', $description);

    const data = {
      name: $name,
      description: $description
    };

    // Enviar datos al servidor para agregar la tarea
    $.post('task_add.php', data, function(r) {
      console.log('Respuesta del servidor: ', r);

      // Limpiar el formulario
      $('#task-name').val('');
      $('#task-description').val('');

      // Después de agregar la tarea, volvemos a cargar las tareas
      loadTasks(); // Aquí recargamos las tareas
    });
  });

  $('#search').keyup(function(e){
    let searchTerm = $('#search').val();
    console.log(searchTerm);
    $.ajax({
      url:'search_server.php',
      type:'POST',
      success: function(r){
       console.log('respuesta de busqueda', r); 
      }
    });
  })
});





