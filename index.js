pokElementos = []

var mostreAvisoEquipoRocketRoboBorrado = false

function listaInicial() {
    // pokElementos.push({nombre: '- Vamo a calmarno', cantidad: 1, tipo: 'agua', precio: '200'})
    // pokElementos.push({nombre: '- Vamo a calmarno', cantidad: 1, tipo: 'agua', precio: '200'})
    // pokElementos.push({nombre: '- La rata eléctrica', cantidad: 1, tipo: 'rayo', precio: '500'})
}

function comprar(nombre, tipo, precio) {
    pokElementos.push({nombre: nombre, cantidad: 1, tipo: tipo, precio: precio})
    agregarElementoHtml()
    pokePrecio()
}

function agregarElementoHtml() {
    resetearContenedor()
    let posicion = 0
    pokElementos.forEach(pokElemnto => {
        document.getElementById('pokElementos').innerHTML += pokElementoBase(pokElemnto, posicion)
        posicion++;
    });
}

function resetearContenedor() {
    document.getElementById('pokElementos').innerHTML = ""
    pokePrecio()
}

function pokElementoBase(pokeDatos, posicion) {
    return `<div class="${pokeDatos.tipo}">
    <img src="assets/${pokeAsset(pokeDatos.tipo)}" alt="" width="50px">
    <p class="pRayo" id="nombre"> - ${pokeDatos.nombre}</p>
    <p class="valorRayo"> $${pokeDatos.precio}</p>
    <button onclick="decrementarPoke(${posicion})">-</button>
    <span style="align-self: center">${pokeDatos.cantidad}</span>
    <button onclick="incrementarPoke(${posicion})">+</button>
    </div>`;
}

function pokeAsset(tipo) {
    switch (tipo) {
        case 'agua': return '11-2-pokemon-png.png';
        case 'rayo': return '6-2-pokemon-png-hd.png';
    }
}

function decrementarPoke(pokePosicion) {
    if(pokElementos[pokePosicion].cantidad == 1) {
        if(!mostreAvisoEquipoRocketRoboBorrado) {
            alert('El equipo Rocket se robó el borrado')
            mostreAvisoEquipoRocketRoboBorrado = true
        }
        pokeBorrar(pokePosicion)
    } else {
        pokElementos[pokePosicion].cantidad--
    }
    agregarElementoHtml()
    pokePrecio()
}

function pokeBorrar(pokePosicion) {
    pokElementos.splice(pokePosicion, 1)
    alert(mostreAvisoEquipoRocketRoboBorrado ? 'El equipo Rocket se robó tu pokemón' : 'Ya la devolvió y se robó tu pokemón')
}

function incrementarPoke(pokePosicion) {
    pokElementos[pokePosicion].cantidad++
    agregarElementoHtml()
    pokePrecio()
}

function pokePrecio() {
    let total = 0;
    pokElementos.forEach(pokeDatos => {
        total += pokeSubTotal(pokeDatos);
    });

    document.getElementById('pokePrecio').innerHTML = `$${total}`;
}

function pokeSubTotal(pokeDatos) {
    return pokeDatos.precio * pokeDatos.cantidad
}

function alertFinalizarCompra() {
    alert('Terminaste tu pokecompra')
    pokElementos = []
    resetearContenedor()
}


listaInicial()
agregarElementoHtml()
pokePrecio()
