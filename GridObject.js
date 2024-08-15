
class GridCell extends GenObject {
    drawY = false;
    drawX = false;
    drawZ = false;

    constructor(shapes) {
        super(shapes);
        this.isOccupied = false;
        
    }

    draw() {
        // draw grid
        if (this.drawY || showFullGrid && this.shapes.length > 3) {
            this.shapes[0].draw();
            this.shapes[1].draw();
            this.shapes[2].draw();
            this.shapes[3].draw();
        }
        if (this.drawX || showFullGrid && this.shapes.length > 7) {
            this.shapes[4].draw();
            this.shapes[5].draw();
            this.shapes[6].draw();
            this.shapes[7].draw();
        }
        if (this.drawZ || showFullGrid && this.shapes.length > 11) {
            this.shapes[8].draw();
            this.shapes[9].draw();
            this.shapes[10].draw();
            this.shapes[11].draw();
        }
    }
}

class GridObject {
    size = 0.2;
    dimension = 6;

    constructor() {
        this.grid = new Array();

        for (let i = 0; i < this.dimension; i++) {
            this.grid[i] = new Array();
            for (let j = 0; j < 10; j++) { 
                this.grid[i][j] = new Array();
                for (let k = 0; k < this.dimension; k++) { 
                    let yStep = this.size * 10 * j / 10;
                    let xStep = this.size * 10 * i / 10;
                    let kStep = this.size * 10 * k / 10;

                    let allShapes = [
                        this.createYRectangle(xStep, yStep, kStep),
                        this.createXRectangle(xStep, yStep, kStep),
                        this.createZRectangle(xStep, yStep, kStep),
                    ].flat();

                    this.grid[i][j][k] = new GridCell(allShapes);
                    if (i == 0) {
                        this.grid[i][j][k].drawY = true;
                    }

                    if (k == 0) {
                        this.grid[i][j][k].drawX = true;
                    }

                    if (j == 0) {
                        this.grid[i][j][k].drawZ = true;
                    }
                    
                }
            }
        }
    }

    createXRectangle(jStep, iStep, kStep) {
        let shape1 = new Shape(gl.LINES);
        let shape2 = new Shape(gl.LINES);
        let shape3 = new Shape(gl.LINES);
        let shape4 = new Shape(gl.LINES);

        let colors = [
            [1.0, 1.0, 1.0],
            [1.0, 1.0, 1.0]
        ];

        shape1.initData([
            jStep, iStep, kStep,
            jStep + this.size, iStep, kStep,
        ], colors, [1, 1, 1])
        shape2.initData([
            this.size + jStep, this.size + iStep, kStep,
            jStep, this.size + iStep, kStep,
        ], colors, [1, 1, 1])
        shape3.initData([
            this.size + jStep, this.size + iStep, kStep,
            this.size + jStep, iStep, kStep,
        ], colors, [1, 1, 1])
        shape4.initData([
            jStep, this.size + iStep, kStep,
            jStep, iStep, kStep,
        ], colors, [1, 1, 1])

        return [shape1, shape2, shape3, shape4]
    }

    createYRectangle(jStep = 0, iStep, kStep) {
        let shape1 = new Shape(gl.LINES);
        let shape2 = new Shape(gl.LINES);
        let shape3 = new Shape(gl.LINES);
        let shape4 = new Shape(gl.LINES);

        let colors = [
            [1.0, 1.0, 1.0],
            [1.0, 1.0, 1.0]
        ];

        shape1.initData([
            jStep, iStep, kStep,
            jStep, iStep, kStep + this.size,
        ], colors, [0, 1, 0])
        shape2.initData([
            jStep, iStep, kStep + this.size,
            jStep, this.size + iStep, kStep + this.size,
        ], colors, [0, 1, 0])
        shape3.initData([
            jStep, this.size + iStep, kStep + this.size,
            jStep, this.size + iStep, kStep,
        ], colors, [0, 1, 0])
        shape4.initData([
            jStep, this.size + iStep, kStep,
            jStep, iStep, kStep,
        ], colors, [0, 1, 0])

        return [shape1, shape2, shape3, shape4]
    }

    createZRectangle(jStep, iStep = 0, kStep) {
        let shape1 = new Shape(gl.LINES);
        let shape2 = new Shape(gl.LINES);
        let shape3 = new Shape(gl.LINES);
        let shape4 = new Shape(gl.LINES);

        let colors = [
            [1.0, 1.0, 1.0],
            [1.0, 1.0, 1.0]
        ];

        shape1.initData([
            jStep, iStep, kStep,
            jStep, iStep, kStep + this.size,
        ], colors, [0, 1, 0])
        shape2.initData([
            jStep, iStep, kStep + this.size,
            jStep + this.size, iStep, kStep + this.size,
        ], colors, [0, 1, 0])
        shape3.initData([
            jStep + this.size, iStep, kStep + this.size,
            jStep + this.size, iStep, kStep,
        ], colors, [0, 1, 0])
        shape4.initData([
            jStep + this.size, iStep, kStep,
            jStep, iStep, kStep,
        ], colors, [0, 1, 0])

        return [shape1, shape2, shape3, shape4]
    }

    draw() {
        this.grid.forEach(column => {
            column.forEach(row => {
                row.forEach(part => {
                    part.draw();
                });
            });
        });
     }
 
     rotate(angle, axis, global = false) {
         this.grid.forEach(column => {
            column.forEach(row => {
                row.forEach(part => {
                    part.rotate(angle, axis, global);
                });
            });
        });
     }
 
     translate(vector) {
         this.grid.forEach(column => {
            column.forEach(row => {
                row.forEach(part => {
                    part.translate(vector);
                });
            });
        });
     }
 
     scale(vector) {
         this.grid.forEach(column => {
            column.forEach(row => {
                row.forEach(part => {
                    part.scale(vector);
                });
            });
        });
     }

     checkOccupation(object) {
        for (let shape of object.shapes) {
            let [i, j, k] = this.calculateIJK(shape, object.invertedGlobalRotatationMatrix, 0)

            if(i >= this.dimension) {
                object.translate([-this.size, 0, 0]);
                i = this.dimension - 1;
                return false;
            } else if (i < 0) {
                object.translate([this.size, 0, 0]);
                i = 0;
                return false;
            }
            if(j >= 10) {
                object.translate([0, -this.size, 0]);
                j = 9;
                return false;
            }

            if(k >= this.dimension) {
                object.translate([0, 0, -this.size]);
                k = this.dimension - 1;
                return false;
            } else if(k < 0) {
                object.translate([0, 0, this.size]);
                k = 0;
                return false;
            }

            if (movingFast && (j == 1 || (this.grid[i][j - 1][k] && this.grid[i][j - 1][k].isOccupied))) {
                movingFast = false;
            }

            if (this.grid[i][j][k].isOccupied && object.lastTransformationInvert) {
                object.translationMatrix = object.lastTransformationInvert;
                return false;
            }
            object.lastTransformationInvert = null;

            if (this.grid[i][j][k] && this.grid[i][j][k].isOccupied || j < 0.001) {
                object.translate([0, -(this.size / 2), 0]);
                return true;
            }
        }

        return false;
     }

     occupy(object) {
        for (let shape of object.shapes) {
            let [i, j, k] = this.calculateIJK(shape, object.invertedGlobalRotatationMatrix)
    
            if (j >= 10) { // to pause the game
                return true;
            } else {
                this.grid[i][j][k].isOccupied = true;
            }
        }

        this.checkLastRow();
   
        return false;
     }

     // yOffset to check center of the object
     calculateIJK(shape, invertedRotationMatrix, yOffset = this.size / 2) {
        let i = 0;
        let j = 0;
        let k = 0;

        
        for(let index = 0; index < shape.vertices.length / 3; index++) {
            let vert = shape.calculateVertexPosition(index, invertedRotationMatrix);
            i += vert[0];
            j += 1 + vert[1];
            k += vert[2];
        }

        return [
            Math.floor(i / (shape.vertices.length / 3) / this.size, 10), 
            Math.floor((j / (shape.vertices.length / 3) + yOffset) / this.size, 10), 
            Math.floor(k / (shape.vertices.length / 3) / this.size, 10)
        ];
     }

     // to hide bottom grid when it is full
     checkLastRow() {
        let isFull = true;
        for (let i = 0; i < this.dimension; i++) {
            for (let k = 0; k < this.dimension; k++) { 
                if (!this.grid[i][0][k].isOccupied) {
                    isFull = false;
                    break;
                }
            }
        }

        if (isFull) {
            for (let i = 0; i < this.dimension; i++) {
                for (let k = 0; k < this.dimension; k++) { 
                    this.grid[i][0][k].drawZ = false;
                }
            }
        } 
     }
}