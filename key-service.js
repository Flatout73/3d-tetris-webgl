class KeyService {
    isMoving = false;
    currentShape = null;
    isPerspective = true;

    constructor(canvas, size) {
        this.canvas = canvas;
        this.size = size;
    }

    setup(rotateCamera) {
        this.canvas.addEventListener("mousemove", (e) => {
            if (this.isMoving) {
                rotateCamera((e.offsetX - this.x) / 1200, 0);
                this.x = e.offsetX;
                this.y = e.offsetY;
            }
        }
        );

        this.canvas.addEventListener("mousedown", (e) => {
            this.x = e.offsetX;
            this.y = e.offsetY;
            this.isMoving = true;
        });

        window.addEventListener("mouseup", (e) => {
            this.isMoving = false;
        });

        // Attach event listener for keyboard events to the window
        window.addEventListener("keydown", (event) => {
            if (event.key == 'r') {
                if (currentShaderProgram === shaderPrograms.phongDiffuseProgram) {
                    shaderPrograms.noLightProgram.enable();
                } else {
                    shaderPrograms.phongDiffuseProgram.enable();
                }
            } else if (event.key == 'e') {
                if (currentShaderProgram === shaderPrograms.gourandSpecularProgram) {
                    shaderPrograms.noLightProgram.enable();
                } else {
                    shaderPrograms.gourandSpecularProgram.enable();
                }
            } else if (event.key == 't') {
                if (currentShaderProgram === shaderPrograms.phongSpecularProgram) {
                    shaderPrograms.noLightProgram.enable();
                } else {
                    shaderPrograms.phongSpecularProgram.enable();
                }
            } else {
                switch (event.key) {
                    case "ArrowUp":
                    case "w":
                        if (this.currentShape) {
                            this.currentShape.translate([0, 0, -this.size]);
                        } else {
                            // translate view matrix
                            mat4.translate(matrices.viewMatrix, matrices.viewMatrix, [0, -0.1, 0]);
                        }
                        break;
                    case "ArrowDown":
                    case "s":
                        if (this.currentShape) {
                            this.currentShape.translate([0, 0, this.size]);
                        } else {
                            // translate view matrix
                            mat4.translate(matrices.viewMatrix, matrices.viewMatrix, [0, 0.1, 0]);
                        }
                        break;
                    case "ArrowLeft":
                    case "a":
                        if (this.currentShape) {
                            this.currentShape.translate([-this.size, 0, 0]);
                        } else {
                            // translate view matrix
                            mat4.translate(matrices.viewMatrix, matrices.viewMatrix, [0.1, 0, 0]);
                        }
                        break;
                    case "ArrowRight":
                    case "d":
                        if (this.currentShape) {
                            this.currentShape.translate([this.size, 0, 0]);
                        } else {
                            // translate view matrix
                            mat4.translate(matrices.viewMatrix, matrices.viewMatrix, [-0.1, 0, 0]);
                        }
                        break;
                    case "x":
                        if (this.currentShape) {
                            this.currentShape.rotateLocal(toRad(90), [1.0, 0.0, 0.0]);
                        }
                        break;
                    case "X":
                        if (this.currentShape) {
                            this.currentShape.rotateLocal(toRad(-90), [1.0, 0.0, 0.0]);
                        }
                        break;
                    case "Y":
                        if (this.currentShape) {
                            this.currentShape.rotateLocal(toRad(-90), [0.0, 1.0, 0.0]);
                        }
                        break;
                    case "y":
                        if (this.currentShape) {
                            this.currentShape.rotateLocal(toRad(90), [0.0, 1.0, 0.0]);
                        }
                        break;

                    case "z":
                        if (this.currentShape) {
                            this.currentShape.rotateLocal(toRad(90), [0.0, 0.0, 1.0]);
                        }
                        break;
                    case "Z":
                        if (this.currentShape) {
                            this.currentShape.rotateLocal(toRad(-90), [0.0, 0.0, 1.0]);
                        }
                        break;
                    case "g":
                        showFullGrid = !showFullGrid;
                        break;
                    case "G":
                        showObjectGrid = !showObjectGrid;
                        break;
                    case "p":
                        isPaused = !isPaused;
                        break;
                    case "v":
                        this.isPerspective = !this.isPerspective
                        if (this.isPerspective) {
                            mat4.perspective(matrices.projectionMatrix, toRad(45), canvas.clientWidth / canvas.clientHeight, 0.1, 100);
                        } else {
                            mat4.ortho(matrices.projectionMatrix, -2.0, 2.0, -2.0, 2.0, 0.1, 100);
                        }
                        currentShaderProgram.update(matrices.projectionMatrix);
                        break;
                    case "j":
                        rotateCamera(0.1, 0, 0);
                        break;
                    case "l":
                        rotateCamera(-0.1, 0);
                        break;
                    case "i":
                        rotateCamera(0, 0.1);
                        break;
                    case "k":
                        rotateCamera(0, -0.1);
                        break;
                    case "u":
                        rotateCamera(0, 0, 0.1);
                        break;
                    case "o":
                        rotateCamera(0, 0, -0.1);
                        break;
                    case "+":
                        vec3.add(cameraPosition, cameraPosition, [-0.5, 0, -0.5]);
                        mat4.lookAt(matrices.viewMatrix, cameraPosition, [0, 0, 0], [0, 1, 0]);
                        break;
                    case "-":
                        vec3.add(cameraPosition, cameraPosition, [0.5, 0, 0.5]);
                        mat4.lookAt(matrices.viewMatrix, cameraPosition, [0, 0, 0], [0, 1, 0]);
                        break;
                    case ' ':
                        if (this.currentShape) {
                            movingFast = true;
                        }
                        break;
                }
            }
        });
    }
}