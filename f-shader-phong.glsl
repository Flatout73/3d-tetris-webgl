precision mediump float;

uniform vec4 lightViewPosition;

varying vec3 fragmentColor;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
            // Calculate normalized light vector
        vec3 lightVector = normalize(lightViewPosition.xyz - vPosition);

            // Normalize the interpolated normal
        vec3 normal = normalize(vNormal);

            // Calculate the diffuse lighting component
        float diff = max(dot(normal, lightVector), 0.0);

        // Ambient component (usually a small constant)
        vec3 ambient = 0.1 * fragmentColor;

        vec3 color = diff * fragmentColor;

            // Set the output color of the pixel
        gl_FragColor = vec4(color + ambient, 1.0);
}