precision mediump float;

uniform vec4 lightViewPosition;  // Ensure this is passed in view coordinates
uniform vec4 cameraPosition;

varying vec3 fragmentColor;

varying vec3 vNormal;
varying vec3 vPosition;

vec3 lightColor = vec3(0.5);
float shininess = 1.0;

void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(lightViewPosition.xyz - vPosition);
    vec3 viewDir = normalize(cameraPosition.xyz - vPosition);
    
    // Diffuse shading
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = diff * lightColor.rgb * fragmentColor;

    // Ambient component (usually a small constant)
    vec3 ambient = 0.1 * fragmentColor;

    // Specular shading
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    vec3 specular = lightColor.rgb * spec;

    // Combine results
    vec3 result = diffuse + specular + ambient; // Specular intensity can be adjusted if needed
    gl_FragColor = vec4(result, 1.0);
}