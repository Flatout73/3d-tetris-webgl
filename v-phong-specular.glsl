precision mediump float;

attribute vec3 vertexPosition;
attribute vec3 vertexColor;
attribute vec3 vertexNormal;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform vec4 lightViewPosition;
uniform vec4 cameraPosition;  // Camera position in world space

varying vec3 fragmentColor;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vec4 viewPosition = modelViewMatrix * vec4(vertexPosition, 1.0);

    vPosition = viewPosition.xyz;
    vNormal = normalize(normalMatrix * vertexNormal);
    fragmentColor = vertexColor;

    gl_Position = projectionMatrix * viewPosition;
}