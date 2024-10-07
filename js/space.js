document.getElementById('btnBuscar').addEventListener('click', function () {
    const searchQuery = document.getElementById('inputBuscar').value.trim();
    if (searchQuery === '') {
      alert('Por favor, ingresa un término de búsqueda.');
      return;
    }
  
    const apiUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(searchQuery)}`;
  
    // Limpiar resultados anteriores
    document.getElementById('resultados').innerHTML = '';
  
    // Llamada a la API de NASA
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const results = data.collection.items;
  
        // Si no hay resultados
        if (results.length === 0) {
          document.getElementById('resultados').innerHTML = '<p class="text-center">No se encontraron resultados.</p>';
          return;
        }
  
        // Mostrar los resultados
        results.forEach(item => {
          const image = item.links ? item.links[0].href : 'https://via.placeholder.com/300'; // Link a la imagen
          const title = item.data[0].title || 'Sin título'; // Título de la imagen
          const description = item.data[0].description || 'Sin descripción'; // Descripción
          const dateCreated = item.data[0].date_created || 'Fecha no disponible'; // Fecha de creación
  
          // Crear la tarjeta de resultado
          const resultCard = `
            <div class="col-md-4 mb-3">
              <div class="card">
                <img src="${image}" class="card-img-top" alt="${title}">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">${description.substring(0, 100)}...</p>
                  <p class="card-text"><small class="text-muted">Fecha: ${new Date(dateCreated).toLocaleDateString()}</small></p>
                </div>
              </div>
            </div>
          `;
  
          // Agregar el resultado al contenedor
          document.getElementById('resultados').innerHTML += resultCard;
        });
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('resultados').innerHTML = '<p class="text-center">Ocurrió un error al realizar la búsqueda. Por favor, inténtalo nuevamente.</p>';
      });
  });
  