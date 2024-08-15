
const { mat4, mat3, vec4, vec3 } = glMatrix;
const toRad = glMatrix.glMatrix.toRadian;

const shaderPrograms = {
    noLightProgram: new ShaderProgram(),
    gourandDiffuseProgram: new ShaderProgram(),
    gourandSpecularProgram: new ShaderProgram(),
    phongDiffuseProgram: new ShaderProgram(),
    phongSpecularProgram: new ShaderProgram(),
    cookTorranceProgram: new ShaderProgram()
}

const shaders = {
    noLight: "v-shader-nolight",
    fragment: "f-shader"
}

let currentShaderProgram = null;

const shaderInfo = {
    attributes: {
        vertexLocation: "vertexPosition",
        colorLocation: "vertexColor",
        normalLocation: "vertexNormal"
    }, uniforms: {
        modelViewMatrix: "modelViewMatrix",
        projectionMatrix: "projectionMatrix",
        viewMatrix: "viewMatrix",
        normalMatrix: "normalMatrix",
        lightViewPosition: "lightViewPosition",
        cameraPosition: "cameraPosition"
    }
}

const matrices = {
    viewMatrix: mat4.create(),
    projectionMatrix: mat4.create(),
}