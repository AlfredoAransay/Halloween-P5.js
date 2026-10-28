# Halloween P5.js
Proyecto interactivo de Halloween desarrollado en P5.js para la asignatura de 'Desarrollo de aplicaciones interactivas' en el grado Multimedia de la UOC.
Combina la detección facial en tiempo real con efectos de partículas dinámicas creando una experiencia visual.
## Descripción del proyecto
Esta aplicación web utiliza la cámara del dispositivo donde se ejecute para detectar expresiones faciales y generar efectos visuales en tiempo real. El proyecto Halloween P5.js se centra en la detección de la apertura de boca para activar un sistema de partículas con temática Halloween.
## Ver en p5.js
https://editor.p5js.org/alf.aransay/full/iFhmY1Ozy
## Funcionalidades
### Elementos visuales
* Imágenes decorativas, relacionadas con Halloween, que se adaptan a la pantalla.
* Efectos y color en el texto para conseguir una estética de Hallooween.
### Detección de gestos faciales
* Análisis de expresiones faciales en tiempo real mediante la libreria de aprendizaje automático ml5.js que usa FaceMesh.
* Detección de la apertura de la boca a través de la distancia de los puntos medios de cada labio.
### Sistema de partículas
* Generación de un sitema de partículas dinámicas al abrir la boca, en la posición central de la abertura.
* Física realista con gravedad y rotación aleatoria.
* Efectos de transparencia y desvanecimiento progresivo.
* Partícula temática de Halloween, una calabaza.
### Audio
* Integración la libreria p5.sound dediaca al manejo del audio dentro de P5.js
* Efectos que se activan al abrir la boca, y se paran al cerrarla.
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
* HTML5 Canvas - Superficie de dibujo para elementos 2D
* p5.js 2.3.4 - Framework principal para gráficos y animación
* ml5.js con FaceMesh - Detección facial y análisis de expresiones
* p5.sound - Sistema de audio interactivo
## FaceMesh (ml5.js)
Esla opción más popular y recomendable para usuarios de P5.js, ya que fue diseñada específicamente para acercar el *machine learning* a artistas y creativos web de forma accesible y sencilla.
>* **FaceMesh:** Ofrece una **malla en 3D de alta precisión en tiempo real con 468 de puntos clave** (*keypoints*) de la cara, ideal para realidad aumentada, máscaras o deformaciones.
>* **FaceAPI:** Permite detectar rostros, a través de una cámara web, mediante los puntos de referencia básicos (*landmarks*) y el análisis de las expresiones faciales resultantes.

**Ventajas:** Sintaxis muy sencilla, excelente documentación y total integración con la estructura de p5.js
## Herramientas alternativas a FaceMesh (ml5.js)
### MediaPipe (*Google*) con TensorFlow.js
Es una libreria para proyectos que requieren un **rendimiento excelente** (60 FPS) y **bajo consumo de recursos**.
**Ofrece 478 *landmarks* 3D**, junto a una serie de *blendshapes* que representan las expresiones faciales en valores normalizados (de 0 a 1).
>Entre ellos están *jawOpen* (apertura de mandíbula), *mouthFunnel* (forma de túnel o soplo) o *mouthSmile* (sonrisa), que simplifican muchísimo la lógica de interacción.

**Ventajas:** Extremadamente rápido, soportando seguimiento en tiempo real de múltiples rostros con gran precisión, funciona muy bien en dispositivos móviles.
### Alternativas no tan populares
>* **face-api.js.** Una veterana de JS para detección facial, construida sobre TensorFlow.js. Detecta caras, estima edad y género, reconociendo expresiones básicas ('*happy*', '*sad*', '*surprised*'…). Sin embargo, trabaja con solo 68 puntos 2D y sus expresiones son clasificaciones discretas, no valores continuos: sabe si alguien está “sorprendido”, pero no cuán abierta está su mandíbula.
>*  **Jeeliz (jeelizFaceFilter.js).** Una opción sorprendentemente rápida y ligera, que usa WebGL para ofrecer un rendimiento altísimo, ideal para proyectos de realidad aumentada tipo filtros de Snapchat. Incluye coeficientes de expresión parecidos a los *blendshapes*, entre ellos el de apertura de boca.
## Licencia
Proyecto con fines educativos bajo licencia MIT.

**UOC Universitat Oberta de Catalunya**
Grado multimeda 2026-2027 | *Desarrollo de aplicaciones interactivas*
