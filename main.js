let gl = null;

let game;

cameraPosition = [3, 1, 4];

window.onload = async () => {
    // basic setup 
    let canvas = document.getElementById("canvas");
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    
    let keyService = new KeyService(canvas, 0.2);

    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    gl.clearColor(0.729, 0.764, 0.674, 1);

    // create & send projection matrix
    mat4.perspective(matrices.projectionMatrix, toRad(45), canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    //mat4.ortho(matrices.projectionMatrix, -2.0, 2.0, -2.0, 2.0, 0.1, 100);

    // create shader programs and enable one of them
    await shaderPrograms.noLightProgram.load(shaders.noLight, shaders.fragment, shaderInfo);

    await shaderPrograms.gourandDiffuseProgram.load("v-gouraud-diffuse.glsl", shaders.fragment, shaderInfo);
    await shaderPrograms.gourandSpecularProgram.load("v-gouraud-illumination.glsl", "f-gouraud-illumination.glsl", shaderInfo);
    await shaderPrograms.phongDiffuseProgram.load("v-shader-phong.glsl", "f-shader-phong.glsl", shaderInfo);
    await shaderPrograms.phongSpecularProgram.load("v-phong-specular.glsl", "f-phong-specular.glsl", shaderInfo);
    await shaderPrograms.cookTorranceProgram.load("v-cook-torrance.glsl", "f-cook-torrance.glsl", shaderInfo);

    shaderPrograms.noLightProgram.enable();

    // create view matrix
    mat4.lookAt(matrices.viewMatrix, cameraPosition, [0, 0, 0], [0, 1, 0]);

    game = new Game(keyService);

    keyService.setup(function (x, y, z) { // closure for rotating camera
        game.rotateGlobally(x, y, z);
    });
    
    // start render loop
    requestAnimationFrame(render);
}

function render(now) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    game.render(now);

    requestAnimationFrame(render);
}