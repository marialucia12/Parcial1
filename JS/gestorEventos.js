// Verificación de sesión
(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.rol !== 'Gestor') {
    window.location.href = '/html/login.html';
    } else {
    document.getElementById('user-name').textContent = `Hola, ${user.nombre}`;
    }
})();

  // Cerrar sesión
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/html/login.html';
});

  // Cargar eventos en la tabla de eventos
(() => {
    fetch('eventos.json') // Reemplaza por tu JSONBin
    .then(response => response.json())
    .then(data => {
        const eventsTable = document.getElementById('events-table').querySelector('tbody');
        eventsTable.innerHTML = '';

        data.eventos.forEach(evento => {
    const row = `
            <tr>
    <td>${evento.nombre}</td>
        <td>${evento.fecha}</td>
<td>${evento.ubicacion}</td>
<td><button class="editar-btn">Editar</button></td>
            </tr>
        `;
        eventsTable.innerHTML += row;
        });

        // Agregar funcionalidad para editar eventos
        document.querySelectorAll('.editar-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const eventName = e.target.closest('tr').querySelector('td:nth-child(1)').textContent;
            // Aquí agregar la lógica para editar el evento
            alert(`Editar evento: ${eventName}`);
        });
        });
    })
    .catch(error => {
        console.error('Error al cargar los eventos:', error);
    });
})();
