class LightObject {
    constructor() {
        this.modelVector = vec4.fromValues(0, 0, 0, 1);
        this.lightViewPosition = vec4.fromValues(0, 0, 0, 1);
    }

    translate(vector) {
        this.modelVector = vec4.fromValues(
            this.modelVector[0] + vector[0],
            this.modelVector[1] + vector[1],
            this.modelVector[2] + vector[2],
            this.modelVector[3]
        );
    }

    draw() {
        // Set light position and move it to view space
        vec4.transformMat4(this.lightViewPosition, this.modelVector, matrices.viewMatrix);
        gl.uniform4fv(currentShaderProgram.uniforms.lightViewPosition, this.lightViewPosition);

        gl.uniform4fv(currentShaderProgram.uniforms.cameraPosition, new Float32Array(cameraPosition));
    }

    rotate(angle, axis, global = false) {

    }

    scale(vector) {

    }
}