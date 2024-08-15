precision mediump float;

float roughness = 0.4;
float metallic = 0.6;
float F0 = 2.0;

vec3 lightColor = vec3(0.5);  // Assuming a white light for simplicity

varying vec3 fragmentColor;
varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vLightDir;

// Helper functions for Cook-Torrance model
float DistributionGGX(vec3 N, vec3 H, float roughness) {
    float a = roughness * roughness;
    float a2 = a*a;
    float NdotH = max(dot(N, H), 0.0);
    float NdotH2 = NdotH*NdotH;

    float nom   = a2;
    float denom = (NdotH2 * (a2 - 1.0) + 1.0);
    denom = 3.14159265358979323846264 * denom * denom;

    return nom / denom;
}

float GeometrySchlickGGX(float NdotV, float roughness) {
    float r = (roughness + 1.0);
    float k = (r*r) / 8.0;

    float nom   = NdotV;
    float denom = NdotV * (1.0 - k) + k;

    return nom / denom;
}

float FresnelSchlick(float cosTheta, float F0) {
    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
}

void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewDir);
    vec3 L = normalize(vLightDir);
    vec3 H = normalize(V + L);

    // Cook-Torrance model calculations
    float NDF = DistributionGGX(N, H, roughness);   
    float G = GeometrySchlickGGX(max(dot(N, V), 0.0), roughness) * GeometrySchlickGGX(max(dot(N, L), 0.0), roughness);
    float F = FresnelSchlick(max(dot(H, V), 0.0), F0);

    vec3 specular = vec3(NDF * G * F) / (4.0 * max(dot(N, V), 0.0) * max(dot(N, L), 0.0) + 0.0001);

    vec3 kS = vec3(F);
    vec3 kD = vec3(1.0) - kS;
    kD *= 1.0 - metallic;

    // Adding ambient light
    vec3 ambient = vec3(0.9) * fragmentColor;

    vec3 numerator = kD * fragmentColor / 3.14159265358979323846264 + specular;
    float denominator = max(dot(N, V), 0.0) * max(dot(N, L), 0.0);
    vec3 color = numerator * lightColor * max(dot(N, L), 0.0);

    gl_FragColor = vec4(color + ambient, 1.0);
}
