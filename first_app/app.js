$(document).ready(function() {
  
  $('#container').hide();

  $('#search').keyup(function(e) {
  
    let search = $('#search').val();  // Obtenemos el término de búsqueda
  
    if (search.length > 0) {
      $.ajax({
        url: 'search_server.php',
        type: 'POST',
        data: { search },
        dataType: 'text',  // Cambiamos el tipo de respuesta a texto
        success: function(res) {
          console.log('Respuesta recibida del servidor:', res);  // Mostramos la respuesta completa
          try {
            let tasks = JSON.parse(res);  // Intentamos parsear el JSON
            let template = '';
            if (tasks.length > 0) {             

              tasks.forEach(t => {
                template += `
                  <div class="col-md-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">${t.name}</h5>
                        <p class="card-text">${t.description}</p>
                      </div>
                    </div>
                  </div>
                `;
              });
            } else {
              template = '<p>No se encontraron tareas.</p>';
            }
            $('#task-result').html(template);  // Insertamos el HTML generado
            $('#container').show();
          } catch (e) {
            console.error("Error al parsear JSON: ", e);
          }
        },
        error: function(xhr, status, error) {
          console.error("Error en la solicitud AJAX:", status, error);
        }
      });
    } else {
      $('#task-result').html('');  // Limpiamos los resultados si no hay búsqueda
    }
  });





  // capturar formulario para agregar tareas
  //
  $('#task-form').submit(function(e){

    e.preventDefault();
    //console.log('cargando datos>>>')

    //input task-name
    //input task-description
    
    $name= $('#task-name').val()
    $description = $('#task-description').val()

    console.log($name)
    console.log($description)

    const data = {
      name: $name,
      description: $description
    }
    

    $.post('task_add.php', data, function(r){
      $('#task-name').val('');
      $('#task-description').val('');
      console.log(r)

    });

    // las funciones o peticiones que no estan dentro de un evento se ejecutan una vez que se inicia
    // la aplicación, por ende pueden ser utilizadas para rellenar una tabla, por ejemplo.
    
    $.ajax({
      url:"tasks_list.php",
      type: "GET",
      success: function(r){
        console.log('Petición ejecutada cuando se cargo la pagina: ', r)
      }
    })

  })

});













