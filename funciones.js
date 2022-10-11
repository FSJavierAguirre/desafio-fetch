// Pokémon de Johto:

let pokeBoton = document.querySelector('#pokeBoton')
pokeBoton.addEventListener('click',boton)

let imagenes = {
    025: 'https://i.imgur.com/ALqmzhO.gif',
    063: 'https://i.imgur.com/Lmsat0t.gif',
    133: 'https://i.imgur.com/pUwcrvc.gif',
    149: 'https://i.imgur.com/ajLI4SC.gif',
    152: 'https://i.imgur.com/pm3UBbA.gif',
    155: 'https://i.imgur.com/ISBKDS9.gif',
    158: 'https://i.imgur.com/KTeT2X6.gif',
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

// --- Esta función constructora es para los diferentes pokemon del juego --- //

function Pokemon(name, hp, imageUrl, ataque1Valor, velocidad, tipo, debilidad, fase, ataque1){
    this.name=name
    this.hp=hp
    this.imageUrl = imageUrl
    this.ataque1Valor=ataque1Valor
    this.velocidad=velocidad
    // this.tipo=tipo
    // this.debilidad=debilidad,
    // this.fase=fase,
    // this.ataque1=ataque1
}

// --- Esta función constructora es para los distintos tipos de contrincantes del juego --- //

// function Entrenador(nombreContrincante,equipoContrincante,objetoContrincante,imageUrl){
//     this.nombreContrincante = nombreContrincante,
//     this.equipoContrincante = equipoContrincante,
//     this.objetoContrincante = objetoContrincante,
//     this.imageUrl = imageUrl
// }

// const red = new Entrenador("Red",pokemon025,undefined,'https://i.imgur.com/ELBXnic.gif')
// const serena = new Entrenador("Serena",pokemon063,undefined,'https://i.imgur.com/6McxONW.gif')
// const oak = new Entrenador("Oak",pokemon124,undefined,'https://i.imgur.com/WJOAs50.gif')
// const gary = new Entrenador("Gary",pokemon133,undefined,'https://i.imgur.com/l2Dx95N.gif')

async function desplegarAlertaPokemonInicial(pokemon){
    await Swal.fire({
        text: `¡Felicidades! Ahora te acompaña ${pokemon.name}. Tiene ${pokemon.hp} puntos de salud y ${pokemon.velocidad} puntos de velocidad.`,
        imageUrl: pokemon.imageUrl,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        confirmButtonText:'Continuar',
        allowOutsideClick: false
    })
}

async function iniciarCombatesFrenteDeBatalla(){
    await Swal.fire({
        title: `Has decidido ir a combatir al Frente de batalla`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        confirmButtonText:'¡A combatir!',
        imageUrl: 'https://i.imgur.com/2UsAXEI.png',
        allowOutsideClick: false
    })
}

async function puebloPrimavera(){
    await Swal.fire({
        title: `Has decidido permanecer en el Pueblo Primavera`,
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: 'Custom image',
        confirmButtonText:'Entendido',
        imageUrl: 'https://i.imgur.com/bNkP0BX.jpg',
        allowOutsideClick: false
    })
}

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

    await Swal.fire({
        imageUrl: 'https://i.imgur.com/Ts9Uq4O.gif',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        text: `Ya veo... un gusto conocerte ${nombreEntrenador}`,
        confirmButtonText:'Continuar',
        allowOutsideClick: false
    })

    const segundoAlert = await Swal.fire({
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
    const eleccionInicial = segundoAlert.value
    console.log(segundoAlert)

    if(eleccionInicial === 'Cyndaquil'){
        await desplegarAlertaPokemonInicial(await obtenerPokemonApi(155))
    } else if(eleccionInicial==='Totodile'){
        await desplegarAlertaPokemonInicial(await obtenerPokemonApi(158))
    } else{
        await desplegarAlertaPokemonInicial(await obtenerPokemonApi(152))
    }

    await Swal.fire({
        text: `¡Wow! Ahora que tienes a  ${eleccionInicial} como compañero Pokémon espero que sean grandes amigos y que comiencen una gran aventura juntos.`,
        imageUrl: 'https://i.imgur.com/Ts9Uq4O.gif',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        confirmButtonText:'Continuar',
        allowOutsideClick: false
    })

    const tercerAlert = await Swal.fire({
        text: `${nombreEntrenador}, quiero que sepas que existe un lugar llamado 'Frente de batalla'. En este lugar los entrenadores van a hacerse más fuertes con sus pokémon mientras libran combates. ¿Que te gustaría hacer?`,
        imageUrl: 'https://i.imgur.com/Ts9Uq4O.gif',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        confirmButtonText:'Eso decido',
        allowOutsideClick: false,
        input: 'radio',
        inputOptions: {option1: 'Combatir', option2: 'Permanecer en el pueblo'},
        inputValidator: (value) => {
          if (!value) {
            return 'Toma una decisión'
          }
        }
    })
    const eleccionCombate = tercerAlert.value

    if(eleccionCombate === 'option1'){
        await iniciarCombatesFrenteDeBatalla()
    } else{
        await puebloPrimavera()
    }
}