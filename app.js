let participantes = []; // Lista para guardar los nombres

// Función para añadir participantes al grupo
function agregarAmigo() {
    const inputNombre = document.getElementById('amigo');
    const listaParticipantes = document.getElementById('listaAmigos');
    const nombreIngresado = inputNombre.value.trim();

    if (nombreIngresado === '') {
        alert('Ingresa un nombre válido.');
        return;
    }

    participantes.push(nombreIngresado); // Agrega el nombre al arreglo
    const nuevoItem = document.createElement('li');
    nuevoItem.textContent = nombreIngresado;
    listaParticipantes.appendChild(nuevoItem);

    inputNombre.value = ''; // Borra el campo de entrada
}

// Función para realizar el sorteo de amigo secreto
function sortearAmigo() {
    if (participantes.length < 2) {
        alert('Se necesitan al menos dos participantes para hacer el sorteo.');
        return;
    }

    const resultadoSorteo = document.getElementById('resultado');
    resultadoSorteo.innerHTML = ''; // Elimina resultados anteriores

    let emparejamientos;
    let intentos = 0;
    const limiteIntentos = 100; // Prevención de bucles infinitos

    do {
        emparejamientos = [...participantes].sort(() => Math.random() - 0.5);
        intentos++;
    } while (!esEmparejamientoValido(emparejamientos) && intentos < limiteIntentos);

    if (intentos >= limiteIntentos) {
        alert('No fue posible hacer un sorteo válido. Inténtalo nuevamente.');
        return;
    }

    // Mostrar los emparejamientos
    participantes.forEach((persona, index) => {
        const elementoLista = document.createElement('li');
        elementoLista.textContent = `${persona} le regala a ${emparejamientos[index]}`;
        resultadoSorteo.appendChild(elementoLista);
    });
}

// Verifica que ningún participante se asigne a sí mismo
function esEmparejamientoValido(emparejamientos) {
    return participantes.every((persona, index) => persona !== emparejamientos[index]);
}
