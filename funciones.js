// Pokémon de Johto:

let pokeBoton = document.querySelector('#pokeBoton')
pokeBoton.addEventListener('click',boton)
const datosEntrenador = ['https://i.imgur.com/dTA15Hr.gif']

// -- Movimientos -- //
const ataquesCyndaquil = [
    {nombre: 'placaje', poder: 25, precision: 100},
    {nombre: 'lanzallamas', poder: 50, precision: 75},
    {nombre: 'ascuas', poder:30, precision: 70}
]

const ataquesTotodile = [
    {nombre: 'placaje', poder: 25, precision: 100},
    {nombre: 'rayo burbuja', poder: 30, precision: 75},
    {nombre: 'pistola de agua', poder:50, precision: 65}
]

const ataquesChikorita = [
    {nombre: 'placaje', poder: 25, precision: 100},
    {nombre: 'látigo cepa', poder: 50, precision: 75},
    {nombre: 'hojas navaja', poder:30, precision: 70}
]

let imagenes = {
    152: 'https://i.imgur.com/pm3UBbA.gif',
    155: 'https://i.imgur.com/ISBKDS9.gif',
    158: 'https://i.imgur.com/KTeT2X6.gif',
}

// --- Esta función constructora es para los diferentes pokemon del juego --- //

function Pokemon(name, hp, imageUrl, ataque, velocidad, movimientos){
    this.name=name
    this.hp=hp
    this.imageUrl = imageUrl
    this.ataque=ataque
    this.velocidad=velocidad
    this.movimientos=movimientos
}

let obtenerPokemonApi = async(id) => {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    let info = await response.json()
    let nombre = info.name
    let nombreMayusculaInicial = nombre[0].toUpperCase() + nombre.slice(1)
    let stats = info.stats
    let hpBase = stats.find(e => e.stat.name === 'hp').base_stat
    let attack = stats.find(e => e.stat.name === 'attack').base_stat
    let speed = stats.find(e => e.stat.name === 'speed').base_stat
    let pokemon = new Pokemon(nombreMayusculaInicial, hpBase, imagenes[id],attack,speed)
    return pokemon
}

async function desplegarAlertaPokemonInicial(pokemon){
    await Swal.fire({
        text: `¡Felicidades! Ahora que has elegido a  ${pokemon.name} como pokémon inicial, sus datos se han añadido exitosamente a tu ficha de jugador.`,
        imageUrl: pokemon.imageUrl,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        confirmButtonText:'Continuar',
        allowOutsideClick: false
    })
}

// --- Con la siguiente función se ejecuta la toma y almacenamiento de datos del jugador --- //

async function boton(){

    const primerAlert = await Swal.fire({
        title: '¡Hola!',
        text: 'Yo soy el Profesor Oak y me encargo de estudiar el fenómeno de los Pokémon. Este mundo es extenso y todos somos parte de él. Para comenzar tu aventura, dime tu nombre:',
        input: 'text',
        imageUrl: 'https://i.imgur.com/Ts9Uq4O.gif',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        confirmButtonText:'Ese es mi nombre',
        allowOutsideClick: false,
        inputValidator: (value) => {
            if (!value) {
              return 'Vamos, no seas tímido. Dime como te llamas.'
            }
        }
    })
    const nombreEntrenador = primerAlert.value
    datosEntrenador.push(nombreEntrenador)

    const segundoAlert = await Swal.fire({
        imageUrl: 'https://i.imgur.com/Ts9Uq4O.gif',
        imageWidth: 400,
        imageHeight: 200,
        input: 'text',
        imageAlt: 'Custom image',
        text: `Ya veo... un gusto conocerte ${nombreEntrenador}. Cuéntame, ¿cuántos años tienes?`,
        confirmButtonText:'Esa es mi edad',
        allowOutsideClick: false,
        inputValidator: (value) => {
            if (!value) {
              return 'Debes ingresar tu edad para continuar'
            }
        }
    })
    const edadEntrenador = segundoAlert.value
    datosEntrenador.push(edadEntrenador + ' años')

    const tercerAlert = await Swal.fire({
        title: 'Profesor Oak:',
        text: 'Para dar inicio a tu aventura, elige a tu compañero pokémon de la región:',
        imageUrl: 'https://i.imgur.com/5EiSLq4.gif',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        confirmButtonText:'¡Yo te elijo!',
        allowOutsideClick: false,
        input: 'radio',
        inputOptions: {Cyndaquil: await (await obtenerPokemonApi(155)).name, Totodile: await (await obtenerPokemonApi(158)).name, Chikorita: await (await obtenerPokemonApi(152)).name},
        inputValidator: (value) => {
          if (!value) {
            return '¡Necesitas elegir uno!'
          }
        }
    })
    const eleccionInicial = tercerAlert.value

    if(eleccionInicial === 'Cyndaquil'){
        await desplegarAlertaPokemonInicial(await obtenerPokemonApi(155))
        let pokemonEscogido = await obtenerPokemonApi(155)
        pokemonEscogido.movimientos = ataquesCyndaquil
        datosEntrenador.push(pokemonEscogido)
    } else if(eleccionInicial==='Totodile'){
        await desplegarAlertaPokemonInicial(await obtenerPokemonApi(158))
        let pokemonEscogido = await obtenerPokemonApi(158)
        pokemonEscogido.movimientos = ataquesTotodile
        datosEntrenador.push(pokemonEscogido)
    } else{
        await desplegarAlertaPokemonInicial(await obtenerPokemonApi(152))
        let pokemonEscogido = await obtenerPokemonApi(152)
        pokemonEscogido.movimientos = ataquesChikorita
        datosEntrenador.push(pokemonEscogido)
    }

    await Swal.fire({
        text: `¡Wow! Ese  ${eleccionInicial} que has elegido tiene muy buena pinta. Puedes consultar sus datos en el botón "Ficha de jugador". Espero que juntos puedan emprender grandes aventuras.`,
        imageUrl: 'https://i.imgur.com/Ts9Uq4O.gif',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        confirmButtonText:'Finalizar',
        allowOutsideClick: false
    })

    localStorage.setItem('Datos entrenador', JSON.stringify(datosEntrenador))
    datosStringificados = localStorage.getItem('Datos entrenador')
}

let nuevoBoton = document.createElement('button')
nuevoBoton.innerText = 'Ficha de jugador'
nuevoBoton.setAttribute('id','estilosNuevoBoton')
let divContenedor = document.getElementById('flex')
divContenedor.append(nuevoBoton)
nuevoBoton.addEventListener('click',botonFicha)

async function botonFicha(){
    location.href = "#seccionFicha";
    if(localStorage.getItem('Datos entrenador')){
        let datosParseados = JSON.parse(localStorage.getItem('Datos entrenador'))
        const movimientos = datosParseados[3].movimientos 
        console.log(movimientos)
        let ficha = document.getElementById('seccionFicha')
        ficha.innerHTML = `<div id="fichaDeJugador">
            <table>
                <tr id="imagenJugador">
                    <td colspan="2"><img id="imagen" src="${datosParseados[0]}" alt="Personaje"></td>
                    <td></td>
                </tr>
                <tr id="nombreJugador">
                    <td><strong>Nombre:</strong></td>
                    <td>${datosParseados[1]}</td>
                </tr>
                <tr id="edadJugador">
                    <td><strong>Edad:</strong></td>
                    <td>${datosParseados[2]}</td>
                </tr>
                <tr id="pokemonInicial">
                    <td><strong>Nombre del Pokemon:</strong></td>
                    <td>${datosParseados[3].name}</td>
                </tr>
                <tr id="hp">
                    <td><strong>Puntos de salud</strong></td>
                    <td>${datosParseados[3].hp}</td>
                </tr>
                <tr id="ataque">
                    <td><strong>Puntos de ataque:</strong></td>
                    <td>${datosParseados[3].ataque}</td>
                </tr>
                <tr id="velocidad">
                    <td><strong>Puntos de velocidad:</strong></td>
                    <td>${datosParseados[3].velocidad}</td>
                </tr>
                <tr id="movimientos">
                    <td><strong>Movimientos:</strong></td>
                </tr>
                <tr class="caracteristicasMovimientos">
                    <td><strong>${movimientos[0].nombre}</strong></td>
                    <tr>
                        <tr>
                            <td>Poder:</td>
                            <td>${movimientos[0].poder}</td>
                        </tr>
                        <tr>
                            <td>Precisión:</td>
                            <td>${movimientos[0].precision}</td>
                        </tr>
                    </tr>
                </tr>
                <tr class="caracteristicasMovimientos">
                    <td><strong>${movimientos[1].nombre}</strong></td>
                    <tr>
                        <tr>
                            <td>Poder:</td>
                            <td>${movimientos[1].poder}</td>
                        </tr>
                        <tr>
                            <td>Precisión:</td>
                            <td>${movimientos[1].precision}</td>
                        </tr>
                    </tr>
                </tr>
                <tr class="caracteristicasMovimientos">
                    <td><strong>${movimientos[2].nombre}</strong></td>
                </tr>
                <tr>
                    <tr>
                        <td>Poder:</td>
                        <td>${movimientos[2].poder}</td>
                    </tr>
                    <tr>
                        <td>Precisión:</td>
                        <td>${movimientos[0].precision}</td>
                    </tr>
                </tr>
        </table>
    </div>`
    } else{
        await Swal.fire({
            text: `Aún no has creado tu ficha de jugador.`,
            icon: 'error',
            confirmButtonText:'Volver',
        })
    }
}