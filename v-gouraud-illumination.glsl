precision mediump float;

attribute vec3 vertexPosition; 
attribute vec3 vertexColor;    
attribute vec3 vertexNormal;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform vec4 lightViewPosition;

vec3 lightColor = vec3(0.7, 0.7, 0.7);         // Light color for diffuse and specular
float shininess = 0.3;         // Shininess factor for specular highlight
vec3 ambientColor = vec3(0.3, 0.3, 0.3);

varying vec3 fragmentColor;

void main() {

    // Transform vertex position to view space
    vec4 viewPosition = modelViewMatrix * vec4(vertexPosition, 1.0);

    // Calculate and normalize light vector
    vec3 lightVector = normalize(lightViewPosition.xyz - viewPosition.xyz);
    // Transform and normalize the normal
    vec3 transformedNormal = normalize(normalMatrix * vertexNormal);
    // View direction is the reverse of the view position vector
    vec3 viewVector = normalize(-viewPosition.xyz);

    // Calculate light intensity (diffuse)
    float diffuseLightIntensity = max(dot(lightVector, transformedNormal), 0.0);

    // Calculate the reflection vector
    vec3 reflectVector = reflect(-lightVector, transformedNormal);
    float specularLightIntensity = pow(max(dot(reflectVector, viewVector), 0.0), shininess);

    // Combine all three light components
    vec3 ambientComponent = ambientColor * vertexColor;
    vec3 diffuseComponent = lightColor * vertexColor * diffuseLightIntensity;
    vec3 specularComponent = lightColor * specularLightIntensity;

    // Output color is the sum of ambient, diffuse, and specular components
    fragmentColor = ambientComponent + diffuseComponent + specularComponent;

    gl_Position = projectionMatrix * viewPosition;
}
