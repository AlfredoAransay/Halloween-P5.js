// Clase para las partículas con forma de calabaza
class ParticulasCalabaza {
    constructor(x, y) {
        this.x = x + random(-10, 10);
        this.y = y;
        this.vx = random(-1, 1);
        this.vy = random(-3, -1); // Velocidad negativa, flotan hacia arriba
        this.alfa = 255;
        this.tamano = random(15, 25); // Tamaño de la calabaza
        this.rotacion = random(TWO_PI); // Rotacionación inicial aleatoria
        this.velocidadrotacionacion = random(-0.05, 0.05); // Velocidad de rotacion al flotar
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alfa -= 4; // Se desvanecen lentamente
        this.rotacion += this.velocidadrotacionacion; // Giran mientras flotan
    }

    finished() {
        return this.alfa <= 0;
    }

    // Dibujo de una calabaza
    show() {
        push();
        translate(this.x, this.y);
        rotate(this.rotacion);

        noStroke();

        // 1. Tallo de la calabaza (verde)
        fill(34, 139, 34, this.alfa);
        rect(-2, -this.tamano * 0.6, 4, 8, 2);

        // 2. Cuerpo de la calabaza (naranja Halloween)
        fill(255, 117, 24, this.alfa);
        ellipse(0, 0, this.tamano, this.tamano * 0.8);

        // 3. Detalles de las líneas de la calabaza (un naranja un poco más oscuro)
        stroke(200, 80, 10, this.alfa);
        strokeWeight(1.5);
        noFill();
        arc(0, 0, this.tamano * 0.5, this.tamano * 0.7, 0, PI);
        arc(0, 0, this.tamano * 0.5, this.tamano * 0.7, PI, TWO_PI);
        pop();
    }
}
