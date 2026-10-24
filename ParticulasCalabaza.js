// Clase para las partículas con forma de calabaza 🎃
class ParticulasCalabaza {
    constructor(x, y) {
        this.x = x + random(-10, 10);
        this.y = y;
        this.vx = random(-1, 1);
        this.vy = random(-3, -1); // Velocidad negativa, flotan hacia arriba
        this.alpha = 255;
        this.size = random(15, 25); // Tamaño de la calabaza
        this.rot = random(TWO_PI); // Rotación inicial aleatoria
        this.rotSpeed = random(-0.05, 0.05); // Velocidad de giro al flotar
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 4; // Se desvanecen lentamente
        this.rot += this.rotSpeed; // Giran mientras flotan
    }

    finished() {
        return this.alpha <= 0;
    }

    // Dibujo de una calabaza
    show() {
        push();
        translate(this.x, this.y);
        rotate(this.rot);

        noStroke();

        // 1. Tallo de la calabaza (verde)
        fill(34, 139, 34, this.alpha);
        rect(-2, -this.size * 0.6, 4, 8, 2);

        // 2. Cuerpo de la calabaza (naranja Halloween)
        fill(255, 117, 24, this.alpha);
        ellipse(0, 0, this.size, this.size * 0.8);

        // 3. Detalles de las líneas de la calabaza (un naranja un poco más oscuro)
        stroke(200, 80, 10, this.alpha);
        strokeWeight(1.5);
        noFill();
        arc(0, 0, this.size * 0.5, this.size * 0.7, 0, PI);
        arc(0, 0, this.size * 0.5, this.size * 0.7, PI, TWO_PI);
        pop();
    }
}