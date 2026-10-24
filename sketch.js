// Imágenes
let imgCalabaza, imgFondo;

// Música
let musica, fx;

//Fuentes
let fuente;

// Texto 3D
let bloqueTexto;
let h1 = "ABRE LA BOCA";
let bloqueTextoSize = 130;

// Variables para controles de cámara
let botonStart, botonStop;
let camaraInicializada = false;
let enMarcha = true;

// Variables de video
let aspectRatio, nuevaAnchuraVideo, nuevaAlturaVideo;

let captura;
let faceMesh;
let faces = [];
let particulas = [];
let webcam;

let labioSuperiorIndice = 13; // Centro del labio superior
let labioInferiorIndice = 14; // Centro del labio inferior


async function setup() {
    // Mostrar progreso inicial
    actualizarPrecarga(5, "Inicializando Halloween...");

    // Canvas siguiendo convenciones p5.js (400x400 base)
    createCanvas(640, 480); // Sin WEBGL da error en la carga de recursos

    try {
        // Cargar faceMesh primero
        actualizarPrecarga(0, "Cargando murciélagos...");
        
        // Cargar fuentes
        actualizarPrecarga(25, "Preparando fantasmas...");
        fuente = await loadFont("fonts/Creepster-Regular.ttf");
        
        // Cargar imágenes
        actualizarPrecarga(50, "Cargando murciélagos...");
        imgCalabaza = await loadImage("images/calabaza.svg");
        imgFondo = await loadImage("images/fondo.png");

        // Cargar música
        actualizarPrecarga(75, "Invocando calabazas...");
        //musica = await loadSound("music/nastelbom-spoky-halloween.mp3");
        try {
            fx = await loadSound("music/halloween-ghost.mp3");
        } catch (error) {
          console.warn("Audio no disponible, continuando sin sonido:", error);
          fx = null;
        }

        actualizarPrecarga(90, "¡Casi listo!");

        // Creamos los controles de la camara
        crearControlesCamara();
        
        // Variables de estado
        captura = null;
        enMarcha = false;
        camaraInicializada = false;

        // Completar carga
        actualizarPrecarga(100, "¡Bienvenido al Halloween!");
        
        // Esperar un momento antes de ocultar
        setTimeout(() => {
            ocultarPrecarga();
        }, 1000);

    } catch (error) {
        console.error('Error en setup:', error);
        actualizarPrecarga(100, "Error cargando recursos");
        setTimeout(ocultarPrecarga, 2000);
    }
    
}

// Función para crear los controles de la cámara
function crearControlesCamara() {
  // Crear botón de activar cámara
  botonStart = createButton('Activar Cámara');
  botonStart.position(windowWidth - 250, 20);
  botonStart.class('btn-camara start');
  botonStart.mousePressed(activarCamara);
  
  // Crear botón de pausar cámara
  botonStop = createButton(' ');
  botonStop.position(windowWidth - 50, 20);
  botonStop.class('btn-camara stop');
  botonStop.style('display', 'none');
  botonStop.mousePressed(pausarCamara);
  
  console.log('Controles de cámara creados');
}

// Función para activar la cámara
async function activarCamara() {
    captura = createCapture(VIDEO, { flipped: false });
    captura.size(640, 480);
    captura.hide(); // Ocultamos el elemento HTML nativo para dibujarlo en el lienzo
    faceMesh = await ml5.faceMesh({ maxFaces: 1, flipped: false });
    faceMesh.detectStart(captura, gotFaces);

    // Cambiar visibilidad de botones
    botonStart.style('display', 'none');
    botonStop.style('display', 'block');
}

function gotFaces(results) {
    faces = results;
}

// Función para pausar la cámara
function pausarCamara() {
  console.log('Pausando cámara...');
  
  if (captura) {
    captura.remove();
    captura = null;
  }
  enMarcha = false;
  camaraInicializada = false;
  
  // Cambiar visibilidad de botones
  botonStart.style('display', 'block');
  botonStop.style('display', 'none');
  
  // Limpiar partículas
  particles = [];
  
  console.log('Cámara pausada');
}

function actualizarPrecarga(progreso, texto) {
    const barraProgreso = document.getElementById('cargandoProgreso');
    const cargandoTexto = document.getElementById('cargandoTexto');
    
    if (barraProgreso) {
        barraProgreso.style.width = progreso + '%';
    }
    
    if (cargandoTexto) {
        cargandoTexto.textContent = texto;
    }
}

function ocultarPrecarga() {
    const precarga = document.getElementById('precargaHalloween');
    if (precarga) {
        precarga.classList.add('precarga-oculta');
        setTimeout(() => {
            precarga.style.display = 'none';
        }, 500);
    }
}

function draw() {

    //dibujarInterfaz();

    let capturaAnchura = captura.width;
    let capturaAltura = captura.height;
    console.log(capturaAltura, capturaAnchura);
    
    if (captura) {
        push();
        translate(width, 0);
        scale(-1, 1);
        image(captura, 0, 0, width, height);
        pop();
    }

    if (faces.length > 0) {
        let face = faces[0];
        let labioSuperior = face.keypoints[labioSuperiorIndice];
        let labioInferior = face.keypoints[labioInferiorIndice];

        if (labioSuperior && labioInferior) {
            let bocaX = width - ((labioSuperior.x + labioInferior.x) / 2);
            let bocaY = (labioSuperior.y + labioInferior.y) / 2;
            let bocaAbierta = dist(labioSuperior.x, labioSuperior.y, labioInferior.x, labioInferior.y);

            // Si la boca está abierta
            if (bocaAbierta > 12) {
                // Generamos una calabaza cada pocos fotogramas para no saturar
                if (frameCount % 3 === 0) {
                    particulas.push(new ParticulasCalabaza(bocaX, bocaY));
                }

                // Si la boca está abierta
                if (bocaAbierta > 12) {
                    // Generamos una calabaza cada pocos fotogramas para no saturar
                    if (frameCount % 3 === 0) {
                        particulas.push(new ParticulasCalabaza(bocaX, bocaY));
                    }
                    // Suena un sonido al abrir la boca
                    /* if (fx) {
                        if (!fx.isPlaying()) {
                            fx.play();
                            fx.loop();
                        } 
                    } else {
                        if (fx) {
                            fx.stop();
                        }
                    } */
                }
                
            }
        }
    }

    // Actualizar y renderizar las calabazas
    for (let i = particulas.length - 1; i >= 0; i--) {
        particulas[i].update();
        particulas[i].show();
        
        if (particulas[i].finished()) {
            particulas.splice(i, 1);
        }
    }
}

function dibujarInterfaz() {
    push();
    translate(width/2, height/2);
    rectMode(CENTER);
    noStroke();
    fill(0);
    rect(0, 40, 740, 580);  
    pop();
}
