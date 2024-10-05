document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === "" || password === "") {
        document.getElementById('error-message').textContent = "Por favor, complete todos los campos.";
        return;
    }

    
    fetch('/JAVASCRIPT/JSON/usuarios.json') 
        .then(response => response.json())
        .then(data => {
            const users = data.users;

            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));

                if (user.rol === 'Administrador') {
                    window.location.href = 'admin.html';
                } else if (user.rol === 'Gestor') {
                    window.location.href = 'gestor_eventos.html';
                } else if (user.rol === 'Visitante') {
                    window.location.href = 'visitante_eventos.html';
                }
            } else {
                document.getElementById('error-message').textContent = "Credenciales inválidas.";
            }
        })
        .catch(error => {
            console.error('Error al cargar los usuarios:', error);
        });
});
