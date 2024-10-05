
fetch('/JAVASCRIPT/JSON/eventos.json')
    .then(response => response.json())
    .then(data => {
        const eventosTable = document.getElementById('eventos-table').querySelector('tbody');
        const eventoSelect = document.getElementById('evento-select');
        eventosTable.innerHTML = '';
        eventoSelect.innerHTML = '';

        
        data.eventos.forEach(evento => {
            
            const row = `
                <tr>
                    <td>${evento.nombre}</td>
                    <td>${evento.fecha}</td>
                    <td>${evento.ubicacion}</td>
                    <td><button class="reservar-btn" data-nombre="${evento.nombre}">Reservar</button></td>
                </tr>
            `;
            eventosTable.innerHTML += row;

        
            const option = `<option value="${evento.nombre}">${evento.nombre} - ${evento.fecha}</option>`;
            eventoSelect.innerHTML += option;
        });


        document.querySelectorAll('.reservar-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const eventoNombre = e.target.getAttribute('data-nombre');
                document.getElementById('evento-select').value = eventoNombre;
            });
        });
    })
    .catch(error => console.error('Error al cargar los eventos:', error));


document.getElementById('reservar-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombreUsuario = localStorage.getItem('nombre_usuario');
    const eventoNombre = document.getElementById('evento-select').value;
    const boletos = document.getElementById('boletos').value;

    const nuevaReserva = {
        nombre_usuario: nombreUsuario,
        evento: eventoNombre,
        boletos_reservados: boletos
    };

    
    fetch('https://api.jsonbin.io/v3/b/XXXXXXXX/reservas', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaReserva)
    })
    .then(response => response.json())
    .then(data => {
        alert('Reserva realizada con éxito');
        
    })
    .catch(error => console.error('Error al realizar la reserva:', error));
});
