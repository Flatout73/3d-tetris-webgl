precision mediump float;

attribute vec3 vertexPosition;
attribute vec3 vertexColor;
attribute vec3 vertexNormal;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform vec4 lightViewPosition;

varying vec3 fragmentColor;

void main() {
            // Transform vertex position to view space
    vec4 viewPosition = modelViewMatrix * vec4(vertexPosition, 1.0);

            // Calculate and normalize light vector
    vec3 lightVector = normalize(lightViewPosition.xyz - viewPosition.xyz);
            // Transform and normalize the normal
    vec3 transformedNormal = normalize(normalMatrix * vertexNormal);

            // Calculate light intensity
            // This can be negative, so just make negative values 0
    float lightIntensity = max(dot(lightVector, transformedNormal), 0.0);

    gl_Position = projectionMatrix * viewPosition; 
            // Multiply vertex color with lightIntensity
    fragmentColor = vertexColor * lightIntensity;
}