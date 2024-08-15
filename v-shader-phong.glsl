precision mediump float;

attribute vec3 vertexPosition;
attribute vec3 vertexColor;
attribute vec3 vertexNormal;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

varying vec3 fragmentColor;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
        // Transform vertex position to view space
    vec4 viewPosition = modelViewMatrix * vec4(vertexPosition, 1.0);
        // Pass the vertex position in view coordinates
    vPosition = viewPosition.xyz;

        // Transform and pass the normal
    vNormal = normalize(normalMatrix * vertexNormal);

        // Pass the vertex color
    fragmentColor = vertexColor;

        // Set the position of the current vertex
    gl_Position = projectionMatrix * viewPosition;
}