# Halloween P5.js
Proyecto interactivo de Halloween desarrollado en P5.js para la asignatura de 'Desarrollo de aplicaciones interactivas' en el grado Multimedia de la UOC.
Combina la detección facial en tiempo real con efectos de partículas dinámicas creando una experiencia visual.
## Descripción del proyecto
Esta aplicación web utiliza la cámara del dispositivo donde se ejecute para detectar expresiones faciales y generar efectos visuales en tiempo real. El proyecto Halloween P5.js se centra en la detección de la apertura de boca para activar un sistema de partículas con temática Halloween.
## Funcionalidades
### Elementos visuales
* pass
### Detección de gestos faciales
* Análisis de expresiones faciales en tiempo real mediante la libreria de aprendizaje automático ml5.js que usa FaceMesh.
* Detección de la apertura de la boca a través de la distancia de los puntos medios de cada labio.
### Sistema de partículas
* Generación de un sitema de partículas dinámicas al abrir la boca, en la posición central de la abertura.
* Física realista con gravedad y rotación aleatoria.
* Efectos de transparencia y desvanecimiento progresivo.
* Partícula temática de Halloween, una calabaza.
### Audio
* pass
## Estructura del código
```
Halloween P5js/
├── fonts/
│   └── Creepster-Regular.ttf
├── images/
│   ├── calabaza.svg
│   ├── facemesh-map.jpg
│   └── fondo.png
├── libs/
│   ├── ml5.min.js
│   ├── p5.min.js
│   └── p5.sound.min.js
├── music/
│   ├── halloween-ghost.mp3
│   ├── nastelbom-spoky-halloween.mp3
├── index.html
├── ParticulasCalabaza.js
├── Sketch.js
├── styles.css
└── README.md
```
## Tecnologías utilizadas
* HTML5 Canvas _ Superficie de dibujo para elementos 2D
* p5.js 2.3.3 _ Framework principal para gráficos y animación
* ml5.js con FaceMesh - Detección facial y análisis de expresiones
* p5.sound _ Sistema de audio interactivo
## Licencia
Proyecto con fines educativos bajo licencia MIT.
## 
**UOC Universitat Oberta de Catalunya**
Grado multimeda 2026-2027 | *Desarrollo de aplicaciones interactivas*
