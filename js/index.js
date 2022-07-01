
    const cargarPeliculas = async() => {
        try{
// medidor 1 de tiempo de peticion al servidor
var t0 = performance.now();

            const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=276e470698d68800db5697223acb8a64&language=es-ES`);

var t1 = performance.now();
// medidor 2 de tiempo de peticion al servidor
var tiempo = t1-t0; 
console.log("Tiempo top-carrusel: "+tiempo+"ms")  

            console.log(respuesta);
            
            //si la respuesta es correcta:
            if(respuesta.status === 200){
                const datos = await respuesta.json();
    
                datos.results.forEach(pelicula => {
    
                    top_carrusel_themoviedb.push(new informacion_peliculas(pelicula.title, pelicula.vote_average, pelicula.vote_count, pelicula.poster_path, pelicula.id));
    
                });
    
                // OWL
                let princ_Div = document.createElement("div");
    
                princ_Div.classList.add("owl-carousel");
    
                princ_Div.classList.add("owl-theme");
    
                const contenedor_carrusel_owl = document.querySelector("#contenedor_carrusel_owl");
    
                contenedor_carrusel_owl.appendChild(princ_Div);
    
    
                for(let i = 0; i < 20; i++ ){
    
                    let div = document.createElement("div");               
    
                    div.classList.add("item");
                    
                    princ_Div.appendChild(div);
    
                    div.innerHTML = `
                        
                            <img src="https://image.tmdb.org/t/p/w500/${top_carrusel_themoviedb[i].poster}" alt="">
     
                    `;
                }
            
            // funcion generada por OWL-carrusel con jquery para animar el carrusel:
            $(function(){ 
                var owl = $('.owl-carousel');
                owl.owlCarousel({
                    
                    loop:true,
                    margin:10,
                    autoplay:true,
                    nav:true,
                    autoplayTimeout:1700,
                    
                    // mediaQueries:
                    responsive:{
                        0:{
                            items:2
                        },
                        280:{
                            items:4
                        },
                        
                        500:{
                            items:4
                        },
                        700:{
                            items:5
                        },
                        900:{
                            items:6
                        },
                        1100:{
                            items:7
                        },
                        1300:{
                            items:8
                        }                        
                    }                    
                });
            });
            
            
            // progando grid bootstrap
            const peliculas_generales = document.querySelector("#peliculas_generales");
            for(let i = 0; i < 20; i++ ){
                let div_p_general = document.createElement("div");
                        div_p_general.classList.add("col-4");
                        div_p_general.classList.add("col-sm-3");
                        div_p_general.classList.add("col-md-3");
                        div_p_general.classList.add("col-lg-2");
                        div_p_general.classList.add("col-xl-2");

                peliculas_generales.appendChild(div_p_general)

                let nombre = `${top_carrusel_themoviedb[i].nombre}`;
                div_p_general.innerHTML = `
                
                    <div class="caja-item pelicula_general_p" > 

                    <div class="foto_caratula_peli">
                        <i class='bx bxs-star'>${top_carrusel_themoviedb[i].voto_promedio}</i>
                        <img class="img_pelicula-general" src="https://image.tmdb.org/t/p/w500/${top_carrusel_themoviedb[i].poster}" alt="">
                    </div>
                              
                        <div class="nombre_p_particular">${top_carrusel_themoviedb[i].nombre}</div>
                        <div 

                        <div class="d-flex justify-content-center">

                            <button id="${top_carrusel_themoviedb[i].id}" name="${top_carrusel_themoviedb[i].nombre}" class="boton_agregar" onClick="corazon_click(this.id, this.name)">
    
                                <i class='bx bx-heart corazon' ></i>
                                <i class='bx bxs-heart corazon' ></i>

                            </button>

                        </div>
                    
                    </div>

                `;

            }





            // tipos de errores:
            }else if(respuesta.status === 401){
                console.log ("llave erronea");
                
            }else if(respuesta.status === 404){
                console.log("La peli no existe")
            }else{
                console.log("WTF?")
            }
    
        }catch(error){
            console.log(error);
            
        }
    }
    
    cargarPeliculas();



    class informacion_peliculas {
        
        constructor (nombre, voto_promedio, recuento_votos, poster, id ){
            this.nombre = nombre;
            this.voto_promedio = voto_promedio;
            this.recuento_votos = recuento_votos;
            this.poster = poster;
            this.id = id;
        }
    }
    const top_carrusel_themoviedb = [ ];
    
    
    
    // Boton del modo OSCURO/CLARO:
    const modo = document.querySelector("#switch");
    modo.onclick =function(){
        document.body.classList.toggle("modo_claro");
        modo.classList.toggle("activo");
    } 

  
// ------------------------------------------------
// Peliculas favoritas:

class contruc_lista_corazones {
        
    constructor (id, nombre){
        this.id = id;
        this.nombre = nombre;
    }
}
const lista_corazones = [ ];


function corazon_click(id, nombre){
    console.log(id , nombre);
    document.getElementById(`${id}`).classList.add("estado_guardado")

    let comprobar = lista_corazones.some(x => x.id === id )
    if (comprobar){
        
        document.getElementById(`${id}`).classList.toggle("estado_guardado");

        let posicion = lista_corazones.findIndex(x => x.id === `${id}` );
        lista_corazones.splice(posicion, 1);
        console.log("Se eliminó");

        // eliminar del storage
        sessionStorage.removeItem(id)

        

    }else{
        console.log("Entró a lista")

        // se puede eliminar, solo para corroborar
        lista_corazones.push(new contruc_lista_corazones(id, nombre))

        ad_Peli(id);
    }


}
const ad_Peli = async(id) => {
    try{
        let devolver_peli = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=276e470698d68800db5697223acb8a64&language=es-ES`).then( (resp)=>resp.json()).then(
            (data)=>{
                console.log(data)
                const json = JSON.stringify(data)
                
                sessionStorage.setItem(id, json)
            }
        )      
        
    }catch{
        console.log("no se encontro link")
    }
};


function al_cargar(){

    if(sessionStorage.length === 0){

    }else{
        sessionStorage.forEach( key => {
            let retornar = json.parse(key)
            console.log(retornar)
        });
    }
    }









































