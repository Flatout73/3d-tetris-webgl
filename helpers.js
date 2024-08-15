
async function loadShader(shaderId, shaderType) {
    const shader = gl.createShader(shaderType);

    shaderText = document.getElementById(shaderId);
    if (shaderText != null) {
      gl.shaderSource(shader, shaderText.text);
    } else {
      shaderText = await parseShaderFile(shaderId);
      gl.shaderSource(shader, shaderText);
    }
    
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Error while compiling shader", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

async function parseShaderFile(name) {
  const data = await fetch(name).then(result => result.text());
  return data;
}

async function createShaderProgram(vShaderId, fShaderId) {
    const vShader = await loadShader(vShaderId, gl.VERTEX_SHADER);
    const fShader = await loadShader(fShaderId, gl.FRAGMENT_SHADER);

    const program = gl.createProgram();

    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Error while linking program", gl.getProgramInfoLog(program));
        return false;
    }

    return program;
}

// https://webglfundamentals.org/webgl/lessons/webgl-load-obj.html
function parseOBJ(text, scaleFactor = 1) {
    // because indices are base 1 let's just fill in the 0th data
    const objPositions = [[0, 0, 0]];
    const objTexcoords = [[0, 0]];
    const objNormals = [[0, 0, 0]];
  
    // same order as `f` indices
    const objVertexData = [
      objPositions,
      objTexcoords,
      objNormals,
    ];
  
    // same order as `f` indices
    let webglVertexData = [
      [],   // positions
      [],   // texcoords
      [],   // normals
    ];
  
    function newGeometry() {
      // If there is an existing geometry and it's
      // not empty then start a new one.
      if (geometry && geometry.data.position.length) {
        geometry = undefined;
      }
      setGeometry();
    }
  
    function addVertex(vert) {
      const ptn = vert.split('/');
      ptn.forEach((objIndexStr, i) => {
        if (!objIndexStr) {
          return;
        }
        const objIndex = parseInt(objIndexStr);
        const index = objIndex + (objIndex >= 0 ? 0 : objVertexData[i].length);
        webglVertexData[i].push(...objVertexData[i][index]);
      });
    }
  
    const keywords = {
      v(parts) {
        objPositions.push(parts.map(parseFloat));
      },
      vn(parts) {
        objNormals.push(parts.map(parseFloat));
      },
      vt(parts) {
        // should check for missing v and extra w?
        objTexcoords.push(parts.map(parseFloat));
      },
      f(parts) {
        const numTriangles = parts.length - 2;
        for (let tri = 0; tri < numTriangles; ++tri) {
          addVertex(parts[0]);
          addVertex(parts[tri + 1]);
          addVertex(parts[tri + 2]);
        }
      },
    };
  
    const keywordRE = /(\w*)(?: )*(.*)/;
    const lines = text.split('\n');
    for (let lineNo = 0; lineNo < lines.length; ++lineNo) {
      const line = lines[lineNo].trim();
      if (line === '' || line.startsWith('#')) {
        continue;
      }
      const m = keywordRE.exec(line);
      if (!m) {
        continue;
      }
      const [, keyword, unparsedArgs] = m;
      const parts = line.split(/\s+/).slice(1);
      const handler = keywords[keyword];
      if (!handler) {
        console.warn('unhandled keyword:', keyword);  // eslint-disable-line no-console
        continue;
      }
      handler(parts, unparsedArgs);
    }
  
    return {
      position: webglVertexData[0].map((v) => v * scaleFactor), // map object for complaince with other objects
      texcoord: webglVertexData[1],
      normal: webglVertexData[2].map((v) => v * scaleFactor),
    };
  }