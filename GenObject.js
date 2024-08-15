
class GenObject {
    constructor(shapes) {
        this.shapes = shapes;
    }

    get maxY() {
        return Math.max(...this.shapes.map(shape => {
            return shape.maxY;
        }));
    }

    draw() {
       this.shapes.forEach((shape) => shape.draw());
    }

    rotate(angle, axis, global = false) {
        this.shapes.forEach((shape) => shape.rotate(angle, axis, global));
    }

    translate(vector) {
        this.shapes.forEach((shape) => shape.translate(vector));
    }

    scale(vector) {
        this.shapes.forEach((shape) => shape.scale(vector));
    }
}