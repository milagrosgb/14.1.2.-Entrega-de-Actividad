document.getElementById('btnBuscar').addEventListener('click', async () => {
    const query = document.getElementById('inputBuscar').value.trim();
    if (query) {
        await fetchImages(query);
    } else {
        alert('Por favor, ingresa un término de búsqueda.');
    }
});

async function fetchImages(query) {
    try {
        const response = await fetch(`https://images-api.nasa.gov/search?q=${query}`);
        if (!response.ok) throw new Error('Error en la solicitud'); // Manejo de errores
        
        const data = await response.json();
        displayImages(data.collection.items);
    } catch (error) {
        console.error('Error fetching images:', error);
        alert('No se pudieron obtener las imágenes. Intenta de nuevo.');
    }
}

function displayImages(items) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = ''; // Limpiar el contenedor anterior

    if (items.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron imágenes.</p>';
        return;
    }

    items.forEach(item => {
        if (item.links && item.links.length > 0) { // Asegurarse de que hay enlaces
            const { href } = item.links[0]; // Obtener la URL de la imagen
            const { title, description, date_created } = item.data[0];

            const card = `
                <div class="card my-2" style="width: 18rem;">
                    <img src="${href}" class="card-img-top" alt="${title}">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${description || 'Sin descripción'}</p>
                        <p class="card-text"><small class="text-muted">Fecha: ${date_created}</small></p>
                    </div>
                </div>
            `;
            contenedor.innerHTML += card;
        }
    });
}

