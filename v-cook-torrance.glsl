precision mediump float;

attribute vec3 vertexPosition; 
attribute vec3 vertexColor;    
attribute vec3 vertexNormal;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform vec4 lightViewPosition;

varying vec3 fragmentColor;
varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vLightDir;

void main() {
    // Transform vertex position to view space
    vec4 viewPosition = modelViewMatrix * vec4(vertexPosition, 1.0);

    // Compute vectors for fragment shader
    vNormal = normalize(normalMatrix * vertexNormal);
    vViewDir = -normalize(viewPosition.xyz);
    
    vec3 lightVector = normalize(lightViewPosition.xyz - viewPosition.xyz);
    vLightDir = lightVector;

    gl_Position = projectionMatrix * viewPosition;
    fragmentColor = vertexColor;
}
