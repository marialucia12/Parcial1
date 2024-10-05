// Cargar usuarios desde el JSON en la nube
fetch('/JAVASCRIPT/JSON/usuarios.json')
    .then(response => response.json())
    .then(data => {
        const usuariosTable = document.getElementById('usuarios-table').querySelector('tbody');
        usuariosTable.innerHTML = '';

        data.users.forEach(user => {
            const row = `
                <tr>
                    <td>${user.nombre}</td>
                    <td>${user.email}</td>
                    <td>${user.rol}</td>
                    <td>
                        <button class="editar-usuario" data-email="${user.email}">Editar</button>
                        <button class="eliminar-usuario" data-email="${user.email}">Eliminar</button>
                    </td>
                </tr>
            `;
            usuariosTable.innerHTML += row;
        });

        // Añadir funcionalidad a los botones de eliminar usuario
        document.querySelectorAll('.eliminar-usuario').forEach(button => {
            button.addEventListener('click', (e) => {
                const email = e.target.getAttribute('data-email');
                eliminarUsuario(email);
            });
        });
    })
    .catch(error => console.error('Error al cargar los usuarios:', error));

// Eliminar usuario
function eliminarUsuario(email) {
    // Confirmar antes de eliminar
    if (confirm(`¿Estás seguro de que deseas eliminar al usuario con email ${email}?`)) {
        // Realizar la eliminación aquí (Ejemplo de simulación)
        alert(`Usuario con email ${email} eliminado`);
        // Aquí deberías hacer una solicitud DELETE a tu JSONBin
    }
}

// Cargar eventos desde el JSON en la nube
fetch('/JAVASCRIPT/JSON/eventos.json')
    .then(response => response.json())
    .then(data => {
        const eventosTable = document.getElementById('eventos-admin-table').querySelector('tbody');
        eventosTable.innerHTML = '';

        data.eventos.forEach(evento => {
            const row = `
                <tr>
                    <td>${evento.nombre}</td>
                    <td>${evento.fecha}</td>
                    <td>${evento.ubicacion}</td>
                    <td>
                        <button class="editar-evento" data-nombre="${evento.nombre}">Editar</button>
                        <button class="eliminar-evento" data-nombre="${evento.nombre}">Eliminar</button>
                    </td>
                </tr>
            `;
            eventosTable.innerHTML += row;
        });

        // Añadir funcionalidad a los botones de eliminar evento
        document.querySelectorAll('.eliminar-evento').forEach(button => {
            button.addEventListener('click', (e) => {
                const nombre = e.target.getAttribute('data-nombre');
                eliminarEvento(nombre);
            });
        });
    })
    .catch(error => console.error('Error al cargar los eventos:', error));

// Eliminar evento
function eliminarEvento(nombre) {
    // Confirmar antes de eliminar
    if (confirm(`¿Estás seguro de que deseas eliminar el evento "${nombre}"?`)) {
        // Aquí deberías hacer una solicitud DELETE a tu JSONBin
        fetch('/JAVASCRIPT/JSON/eventos.json', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: nombre })
        })
        .then(response => {
            if (response.ok) {
                alert(`Evento "${nombre}" eliminado con éxito`);
                // Recargar la tabla de eventos después de eliminar
                location.reload();
            } else {
                alert('Error al eliminar el evento');
            }
        })
        .catch(error => console.error('Error al eliminar el evento:', error));
    }
}

// Manejar el cierre de sesión
document.getElementById('cerrar-sesion').addEventListener('click', () => {
localStorage.removeItem('nombre_usuario');
localStorage.removeItem('usuario_email'); 
  // Redirigir al usuario a la página de inicio o al login
  window.location.href = 'index.html'; // Cambia 'index.html' por el nombre de tu página de inicio
});