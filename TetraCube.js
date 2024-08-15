
class TetraCube extends GenObject {
    outline = [];
    lastTransformationInvert = null; // for avoiding collisions with other objects

    constructor(shapes) {
        super(shapes);
        let color = [0.5, 0.5, 0.5];
        let colorData = [
            color,    // Front face: pink
            color,       // left face: red
            color,       // back face: green
            color,       // Bottom face: blue
            color,       // Right face: yellow
            color,       // top face: purple
        ];

        let colors = [];
        for (let i = 0; i < 6; ++i) {
            for (let j = 0; j < 6; ++j) {
                colors.push(colorData[i]);
            }
        }

        for(let shape of shapes) {
            let clone = new Shape(gl.LINES, shape.vertices);
            clone.initData(null, colors, [shape.normals]);
            this.outline.push(clone)
        }

        this.translationMatrix = mat4.create();
        this.rotationMatrix = mat4.create();
        this.globalRotation = mat4.create();
    }

    get invertedGlobalRotatationMatrix() {
        let inverted = mat4.create();
        mat4.invert(inverted, this.globalRotation);
        return inverted;
    }

    // get maxY() {
    //     let min = 1;
    //     let shapeMax = null;
    //     for (let shape of this.shapes) {
    //         min = Math.min(min, shape.maxY);
    //         if (min == (shape.maxY)) {
    //             shapeMax = shape;
    //         }
    //     }
    //     return min;
    // }

    draw() {
        this.modelMatrix = mat4.create();

        mat4.mul(this.rotationMatrix, this.translationMatrix, this.rotationMatrix);
        mat4.mul(this.modelMatrix, this.rotationMatrix, this.modelMatrix);

        this.shapes.forEach((shape) => {
            mat4.mul(shape.modelMatrix, this.modelMatrix, shape.modelMatrix);
            mat4.mul(shape.modelMatrix, this.globalRotation, shape.modelMatrix);
        });

        super.draw();

        let inverted = mat4.create();
        mat4.invert(inverted, this.globalRotation);
        
        this.outline.forEach((shape) => {
            mat4.mul(shape.modelMatrix, this.modelMatrix, shape.modelMatrix);
            mat4.mul(shape.modelMatrix, this.globalRotation, shape.modelMatrix);
            if (showObjectGrid) {
                shape.draw();
            }

            mat4.mul(shape.modelMatrix, inverted, shape.modelMatrix);
        });

        
        this.shapes.forEach((shape) => {
            mat4.mul(shape.modelMatrix, inverted, shape.modelMatrix);
        });

        this.translationMatrix = mat4.create();
        this.rotationMatrix = mat4.create();
    }

    rotateLocal(angle, axis) {
        this.shapes.forEach((shape) =>{
            shape.rotate(angle, axis);
        });

        this.outline.forEach((shape) =>{
            shape.rotate(angle, axis);
        });
    }

    translate(vector) {
        mat4.translate(this.translationMatrix, this.translationMatrix, vector);

        // ignore if objects just fall because of the gravity, not by user control
        if (vector[1] == 0) {
            this.lastTransformationInvert = mat4.create();
            mat4.invert(this.lastTransformationInvert, this.translationMatrix);
        }
    }

    rotate(angle, axis, global = true) {
        let currentRotation = mat4.create();
        // some magic number, I don't know why, but without it, objects rotate with different speed comparing to the grid
        mat4.fromRotation(currentRotation, toRad(angle) / 10, axis); 

        mat4.mul(this.globalRotation, currentRotation, this.globalRotation);
    }
}