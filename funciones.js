// Pokémon de Kanto

let pokeBoton = document.querySelector('#pokeBoton')
pokeBoton.addEventListener('click',boton)

fetch('https://pokeapi.co/api/v2/generation/2/')
.then(response => response.json())
.then(info =>{
let pokemon = info.pokemon_species
console.log(pokemon)
})

// --- Esta función constructora es para los diferentes pokemon del juego --- //

function Pokemon(nombre, tipo, debilidad, vida, fase, ataque1, ataque1Valor, imageUrl){
    this.nombre=nombre,
    this.tipo=tipo,
    this.debilidad=debilidad,
    this.vida=vida,
    this.fase=fase,
    this.ataque1=ataque1
    this.ataque1Valor=ataque1Valor
    this.imageUrl = imageUrl
}

let pokemon010 = new Pokemon("Caterpie","Bicho","Volador",85,"Básico","Placaje",20,)
let pokemon016 = new Pokemon("Pidgey","Volador","Agua",100,"Básico","Ataque alado",35)
let pokemon025 = new Pokemon("Pikachu","Eléctrico","Lucha",100,"Básico","Impactrueno",35,'https://i.imgur.com/ALqmzhO.gif')
let pokemon042 = new Pokemon("Zubat","Veneno","Tierra",100,"Básico","Picotazo venenoso",40)
let pokemon056 = new Pokemon("Mankey","Lucha","Psíquico",100,"Básico","Golpe certero",40)
let pokemon063 = new Pokemon("Abra","Psíquico","Siniestro",100,"Básico","Confusión",30,'https://i.imgur.com/Lmsat0t.gif')
let pokemon124 = new Pokemon("Jynx","Hielo","Acero",100,"Básico","Ventisca",30)
let pokemon132 = new Pokemon("Ditto","Normal","Lucha",85,"Básico","Placaje",20)
let pokemon133 = new Pokemon("Eevee","Normal","Lucha",100,"Básico","Placaje",20,'https://i.imgur.com/pUwcrvc.gif')
let pokemon147 = new Pokemon("Dratini","Dragón","Hada",100,"Básico","Garra dragón",45)
let pokemon149 = new Pokemon("Dragonite","Dragón","Hada",150,"Fase 2","Garra dragón",60,'https://i.imgur.com/ajLI4SC.gif')
let pokemon152 = new Pokemon("Chikorita","Planta","Fuego",100,"Básico","Hojas navaja",35,"https://i.imgur.com/pm3UBbA.gif")
let pokemon155 = new Pokemon("Cyndaquil","Fuego","Agua",100,"Básico","Ascuas",35,"https://i.imgur.com/ISBKDS9.gif")
let pokemon158 = new Pokemon("Totodile","Agua","Eléctrico",100,"Básico","Chorro de agua",35,"https://i.imgur.com/KTeT2X6.gif")
let equipoPokemon = []

// --- Esta función constructora es para los distintos tipos de contrincantes del juego --- //

function Entrenador(nombreContrincante,equipoContrincante,objetoContrincante,imageUrl){
    this.nombreContrincante = nombreContrincante,
    this.equipoContrincante = equipoContrincante,
    this.objetoContrincante = objetoContrincante,
    this.imageUrl = imageUrl
}

const red = new Entrenador("Red",pokemon025,undefined,'https://i.imgur.com/ELBXnic.gif')
const serena = new Entrenador("Serena",pokemon063,undefined,'https://i.imgur.com/6McxONW.gif')
const oak = new Entrenador("Oak",pokemon124,undefined,'https://i.imgur.com/WJOAs50.gif')
const gary = new Entrenador("Gary",pokemon133,undefined,'https://i.imgur.com/l2Dx95N.gif')

async function desplegarAlertaPokemonInicial(pokemon){
    await Swal.fire({
        text: `¡Felicidades! Ahora te acompaña ${pokemon.nombre} y tiene ${pokemon.vida} puntos de salud`,
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
        inputOptions: {Cyndaquil: pokemon155.nombre, Totodile: pokemon158.nombre, Chikorita: pokemon152.nombre},
        inputValidator: (value) => {
          if (!value) {
            return '¡Necesitas elegir uno!'
          }
        }
    })
    const eleccionInicial = segundoAlert.value
    console.log(segundoAlert)

    if(eleccionInicial === 'Cyndaquil'){
        await desplegarAlertaPokemonInicial(pokemon155)
    } else if(eleccionInicial==='Totodile'){
        await desplegarAlertaPokemonInicial(pokemon158)
    } else{
        await desplegarAlertaPokemonInicial(pokemon152)
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