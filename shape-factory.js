class ShapeFactory {
    size = 0.2;

    createI(color = [0.8, 1.0, 0.1]) {
        let cube1 = this.createCube(color, -2 * this.size);
        let cube2 = this.createCube(color, -this.size);
        let cube3 = this.createCube(color, 0);
        let cube4 = this.createCube(color, this.size);

        return new TetraCube([cube1, cube2, cube3, cube4]);
    }

    createL(color = [0.8, 1.0, 0.1]) {
        let cube1 = this.createCube(color, -this.size, -this.size);
        let cube2 = this.createCube(color, 0, -this.size);
        let cube3 = this.createCube(color, this.size, -this.size);
        let cube4 = this.createCube(color, this.size, 0);

        return new TetraCube([cube1, cube2, cube3, cube4]);
    }

    createT(color = [0.8, 1.0, 0.1]) {
        let cube1 = this.createCube(color, -this.size, -this.size);
        let cube2 = this.createCube(color, 0, -this.size);
        let cube3 = this.createCube(color, 0, 0);
        let cube4 = this.createCube(color, this.size, -this.size);

        return new TetraCube([cube1, cube2, cube3, cube4]);
    }

    createO(color = [0.8, 1.0, 0.1]) {
        let cube1 = this.createCube(color, -this.size, -this.size);
        let cube2 = this.createCube(color, 0, -this.size);
        let cube3 = this.createCube(color, -this.size, 0);
        let cube4 = this.createCube(color, 0, 0);

        return new TetraCube([cube1, cube2, cube3, cube4]);
    }

    createTripod(color = [0.8, 1.0, 0.1]) {
        let cube1 = this.createCube(color, -this.size, -this.size, -this.size);
        let cube2 = this.createCube(color, 0, -this.size, -this.size);
        let cube3 = this.createCube(color, -this.size, 0, -this.size);
        let cube4 = this.createCube(color, -this.size, -this.size, 0);

        return new TetraCube([cube1, cube2, cube3, cube4]);
    }

    createN(color = [0.8, 1.0, 0.1]) {
        let cube1 = this.createCube(color, -this.size, -this.size);
        let cube2 = this.createCube(color, 0, -this.size);
        let cube3 = this.createCube(color, 0, 0);
        let cube4 = this.createCube(color, this.size, 0);

        return new TetraCube([cube1, cube2, cube3, cube4]);
    }

    createTowerRight(color = [0.8, 1.0, 0.1]) {
        let cube1 = this.createCube(color, 0, -this.size, -this.size);
        let cube2 = this.createCube(color, 0, 0, -this.size);
        let cube3 = this.createCube(color, 0, -this.size, 0);
        let cube4 = this.createCube(color, -this.size, -this.size, 0);

        return new TetraCube([cube1, cube2, cube3, cube4]);
    }

    createTowerLeft(color = [0.8, 1.0, 0.1]) {
        let cube1 = this.createCube(color, 0, -this.size, -this.size);
        let cube2 = this.createCube(color, 0, 0, -this.size);
        let cube3 = this.createCube(color, 0, -this.size, 0);
        let cube4 = this.createCube(color, this.size, -this.size, 0);

        return new TetraCube([cube1, cube2, cube3, cube4]);
    }

    createCube(color, xOffset = 0, yOffset = 0, zOffset = 0) {
        // define vertex positions & colors
        const vertices = [
        // Front face
        xOffset, yOffset, zOffset,
        xOffset + this.size, yOffset, zOffset,
        xOffset + this.size, yOffset + this.size, zOffset,
        xOffset, yOffset, zOffset,
        xOffset + this.size, yOffset + this.size, zOffset,
        xOffset, yOffset + this.size, zOffset,

        // Back face
        xOffset, yOffset, zOffset - this.size,
        xOffset, yOffset + this.size, zOffset - this.size,
        xOffset + this.size, yOffset + this.size, zOffset - this.size,
        xOffset, yOffset, zOffset - this.size,
        xOffset + this.size, yOffset + this.size, zOffset - this.size,
        xOffset + this.size, yOffset, zOffset - this.size,

        // Top face
        xOffset, yOffset + this.size, zOffset - this.size,
        xOffset, yOffset + this.size, zOffset,
        xOffset + this.size, yOffset + this.size, zOffset,
        xOffset, yOffset + this.size, zOffset - this.size,
        xOffset + this.size, yOffset + this.size, zOffset,
        xOffset + this.size, yOffset + this.size, zOffset - this.size,

        // Bottom face
        xOffset, yOffset, zOffset - this.size,
        xOffset + this.size, yOffset, zOffset - this.size,
        xOffset + this.size, yOffset, zOffset,
        xOffset, yOffset, zOffset - this.size,
        xOffset + this.size, yOffset, zOffset,
        xOffset, yOffset, zOffset,

        // Right face
        xOffset + this.size, yOffset, zOffset - this.size,
        xOffset + this.size, yOffset + this.size, zOffset - this.size,
        xOffset + this.size, yOffset + this.size, zOffset,
        xOffset + this.size, yOffset, zOffset - this.size,
        xOffset + this.size, yOffset + this.size, zOffset,
        xOffset + this.size, yOffset, zOffset,

        // Left face
        xOffset, yOffset, zOffset - this.size,
        xOffset, yOffset, zOffset,
        xOffset, yOffset + this.size, zOffset,
        xOffset, yOffset, zOffset - this.size,
        xOffset, yOffset + this.size, zOffset,
        xOffset, yOffset + this.size, zOffset - this.size,
        ];

        const colorData = [
            color,    // Front face: pink
            color,       // left face: red
            color,       // back face: green
            color,       // Bottom face: blue
            color,       // Right face: yellow
            color,       // top face: purple
        ];

        const colors = [];

        const normalData = [
            [0, 0, 1], // front
            [-1, 0, 0], // left
            [0, 0, -1], // back
            [0, -1, 0], // bottom
            [1, 0, 0], // right
            [0, 1, 0], // top
        ];

        // add one color and normal per vertex
        const normals = [];

        for (let i = 0; i < 6; ++i) {
            for (let j = 0; j < 6; ++j) {
                normals.push(normalData[i]);
                colors.push(colorData[i]);
            }
        }

        // create shape object and initialize data
        const cube = new Shape();
        cube.initData(vertices, colors, normals)

        //cube.translate([this.size, this.size, this.size]);
        return cube;
    }

    createXLine(color) {
        var vertices = [
            0, 0.0, 0.0,
            0.3, 0.0, 0.0
        ];

        var colors = [
            color,
            color
        ];

        const line = new Shape(gl.LINES);
        line.initData(vertices, colors, [0, 0, 0])

        return line;
    }

    createYLine(color) {
        var vertices = [
            0, 0.0, 0.0,
            0, 0.3, 0.0
        ];

        var colors = [
            color,
            color
        ];

        const line = new Shape(gl.LINES);
        line.initData(vertices, colors, [0, 0, 0])

        return line;
    }

    createZLine(color) {
        var vertices = [
            0, 0.0, 0.0,
            0, 0.0, 0.3
        ];

        var colors = [
            color,
            color
        ];

        const line = new Shape(gl.LINES);
        line.initData(vertices, colors, [0, 0, 0])

        return line;
    }
}