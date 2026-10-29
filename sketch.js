// -------------------------------------------------
// VARIABLES
// -------------------------------------------------
// Imágenes
let imgLogo, imgCalabaza, imgFondo, imgCalabazaFea, imgCalavera, imgFantasma, imgTela;

// Música
let musica, fx;

// Fuentes
let fontCreespter;

// Controles de cámara
let botonEmpezar, botonReiniciar;
let camaraInicializada = false;
let enMarcha = true;

let captura, faceMesh;
let faces = [];
let particulas = [];

// Puntos centrales de los labios en FaceMesh
let labioSuperiorIndice = 13; // Centro del labio superior
let labioInferiorIndice = 14; // Centro del labio inferior

// -------------------------------------------------
// Función SET UP -> Función asíncrona
// -------------------------------------------------
async function setup() {

    actualizarPrecarga(5, "Inicializando Halloween..."); // Mostrar progreso inicial
    createCanvas(windowWidth, windowHeight); // Creamosel lienzo

    // Probamos la carga de los assets
    try {
        // Cargar fuentes
        actualizarPrecarga(0, "Cargando murciélagos...");
        faceMesh = await ml5.faceMesh({ maxFaces: 1, flipped: false });
        
        // Cargar fuentes
        actualizarPrecarga(25, "Preparando fantasmas...");
        fontCreespter = await loadFont("fonts/Creepster-Regular.ttf");
        
        // Cargar imágenes
        actualizarPrecarga(50, "Cargando murciélagos...");
        imgLogo =  await loadImage("images/HealthySmile.png");
        imgCalabaza = await loadImage("images/calabaza.svg");
        imgFondo = await loadImage("images/fondo.png");
        imgCalabazaFea = await loadImage("images/calabazaFea.png");
        imgCalavera = await loadImage("images/calavera.png");
        imgFantasma = await loadImage("images/fantasma.png");
        imgTela = await loadImage("images/tela.png");

        // Cargar música
        actualizarPrecarga(75, "Invocando calabazas...");
        try {
            musica = await loadSound("music/nastelbom-spoky-halloween.mp3");
            fx = await loadSound("music/voz-fantasmal.mp3");
        } catch (error) {
          console.warn("Audio no disponible, continuando sin sonido:", error);
          fx = null;
        }

        actualizarPrecarga(90, "¡Casi listo!");

        // Variables de estado
        captura = null;
        enMarcha = false;
        camaraInicializada = false;

        // Completar carga
        actualizarPrecarga(100, "¡Bienvenido al Halloween!");
        // Ocultar la precarga
        ocultarPrecarga();

        // Esperar un momento antes de ocultar
        setTimeout(() => {
            // Creamos los controles de la camara
            crearControlesCamara();
        }, 1000);
    // SI la precarga no funciona mostramos un mensaje de error
    } catch (error) {
        console.error('Error en setup:', error);
        actualizarPrecarga(100, "Error cargando recursos");
        setTimeout(ocultarPrecarga, 2000);
    }
}

// -------------------------------------------------
// Función para crear los controles de la cámara
// -------------------------------------------------
function crearControlesCamara() {
    // Crear el botón de activar cámara
    botonEmpezar = createButton('Activar Cámara');
    botonEmpezar.position(windowWidth - 250, 20);
    botonEmpezar.class('btn-camara empezar');
    botonEmpezar.mousePressed(activarCamara);

    // Crear el botón de reiniciar la aplicación
    botonReiniciar = createButton(' ');
    botonReiniciar.position(windowWidth - 75, 20);
    botonReiniciar.class('btn-camara reiniciar');
    botonReiniciar.style('display', 'none');
    botonReiniciar.mousePressed(reiniciarHalloween);

    console.log('Botones de control creados');
}

// -------------------------------------------------
// Función asíncrona para activar la cámara
// -------------------------------------------------
async function activarCamara() {
    camaraInicializada = true;
    enMarcha = true;

    dibujarInterfaz(); // Dibujamos los motivos de Halloween

    // Cambiar visibilidad de botones
    botonEmpezar.style('display', 'none');
    botonReiniciar.style('display', 'block');
    
    // Creamos la captura de la cámara para visualizarla en el canvas
    captura = createCapture(VIDEO, { flipped: false });
    captura.size(640, 480);
    captura.hide(); // Ocultamos el elemento HTML nativo para dibujarlo en el lienzo
    faceMesh.detectStart(captura, gotFaces);
}

function gotFaces(results) {
    faces = results;
}

// -------------------------------------------------
// Actualizar la barra de progreso de la precarga
// -------------------------------------------------
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

// -------------------------------------------------
// Ocultar la barra de progreso de la precarga
// -------------------------------------------------
function ocultarPrecarga() {
    const precarga = document.getElementById('precargaHalloween');
    if (precarga) {
        precarga.classList.add('precarga-oculta');
        setTimeout(() => {
            precarga.style.display = 'none';
        }, 500);
    }
}

// -------------------------------------------------
// DRAW -> Función encargada del dibujado
// -------------------------------------------------
function draw() {

    if (!camaraInicializada || !captura) {
        // Texto 'ABRE LA BOCA' con letras de Halloween
        textAlign(CENTER, CENTER);
        textFont(fontCreespter);
        // Efecto de resplandor para el texto
        drawingContext.shadowBlur = 15; // Efecto deresplandor mediante un blur
        drawingContext.shadowColor = ('#ff5500'); // Naranja chillon (tiene que ir en hexadecimal)
        fill(255, 140, 0); 
        textSize(120);
        // Pequeño efecto de temblor
        let temblor = sin(frameCount * 0.2) * 2; 
        text('ABRE LA BOCA', windowWidth / 2 + temblor, windowHeight / 2 - 20);
        
        // Limpiamos la sombra para que no afecte a los demás textos
        drawingContext.shadowBlur = 0;

        // Mensaje de instrucciones
        fill(225);
        textSize(24);
        textFont("Arial, sans-serif");
        text('Haz clic en "Activar Cámara" para comenzar', windowWidth/2, windowHeight/2 + 100);
        text('y clic en el botón rojo para reiniciar', windowWidth/2, windowHeight/2 + 135);
    }
    
    if (captura) {
        push();
        scale(-1, 1);
        imageMode(CENTER);
        image(captura, -windowWidth/2, windowHeight/2, 640, 480);
        pop();
    }

    generarParticulasBoca(); // Generamos las partículas (calabazas) cuando la boca esta abierta
}

// -------------------------------------------------
// Función encargada de generar las partículas
// -------------------------------------------------
function generarParticulasBoca() {
    // Configuración de los puntos necesarios en FaceMesh
    if (faces.length > 0) {
        let face = faces[0];
        let labioSuperior = face.keypoints[labioSuperiorIndice];
        let labioInferior = face.keypoints[labioInferiorIndice];

        if (labioSuperior && labioInferior) {
            let bocaX = width - ((labioSuperior.x + labioInferior.x) / 2);
            let bocaY = (labioSuperior.y + labioInferior.y) / 2;
            let bocaAbierta = dist(labioSuperior.x, labioSuperior.y, labioInferior.x, labioInferior.y);

            // Si la boca está abierta realizamos dos acciones, emitir particulas y hacer sonar el efecto de sonido
            if (bocaAbierta > 12) {
                // Generamos una calabaza cada pocos fotogramas para no saturar
                if (frameCount % 3 === 0) {
                    particulas.push(new ParticulasCalabaza(bocaX - windowWidth/2 + 320, bocaY + windowHeight/2 - 240));
                }
                // Suena un sonido al abrir la boca
                if (fx) {
                    if (!fx.isPlaying()) {
                        fx.play();
                        fx.loop();
                    } 
                } else {
                    if (fx) {
                        fx.stop();
                    }
                }
            } else {
                fx.stop(); // Paramos el sonido al cerrar la boca
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
}

// -------------------------------------------------
// Función encargada de dibujar el fondo
// -------------------------------------------------
function dibujarInterfaz() {

    // Imagen tela de araña
    push();
    tint(255, 120); 
    image(imgFondo, 0, 0, windowWidth, windowHeight);
    pop();

    // Imagen tela de araña
    push();
    image(imgTela, 0, 0, 300, 350);
    pop();

    // Imagen de un fanstasma
    push();
    image(imgFantasma, windowWidth - 350, 100, 250, 300);
    pop();
    
    // Imagen de una calavera
    push();
    image(imgCalavera, 25, windowHeight - 275, 350, 250);
    pop();

    // Imagen de una calabaza
    push();
    image(imgCalabazaFea, windowWidth - 350, windowHeight - 325, 300, 300);
    pop();

}

// -------------------------------------------------
// Función encargada de reiniciar la aplicación
// -------------------------------------------------
function reiniciarHalloween() {
    window.location.reload(); // Reinicia por completo la aplicación y todo vuelve a su estado inicial
    console.log('Halloween reiniciado');
}
