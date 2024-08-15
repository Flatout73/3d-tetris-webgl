showObjectGrid = false;
showFullGrid = false;
movingFast = false;
isPaused = false;

class Game {
    shapes = Array();
    shapeFactory = new ShapeFactory();

    constructor(keyService) {
        this.keyService = keyService;
        

        const light = new LightObject();

        this.shapes[0] = new GenObject([light]);
        this.shapes[0].translate([0, 2, 0]);
        this.shapes[0].isSelected = true;

        this.grid = new GridObject();
        this.grid.translate([0, -1, 0]);
        this.shapes.push(this.grid);
        
        this.globalRotation = mat4.create();

        this.spawnObject();
    }

    spawnObject() {
        movingFast = false;
        let objectType = this.getRandomInt(0, 8);
        switch (objectType) {
            case 0:
                this.keyService.currentShape = this.shapeFactory.createI();
                break;
            case 1:
                this.keyService.currentShape = this.shapeFactory.createO([0.5, 1.0, 1.0]);
                break;
            case 2:
                this.keyService.currentShape = this.shapeFactory.createL([1.0, 1.0, 0.5]);
                break;
            case 3:
                this.keyService.currentShape = this.shapeFactory.createT([0.1, 0.8, 1.0]);
                break;
            case 4:
                this.keyService.currentShape = this.shapeFactory.createN([0.2, 1.0, 0.4]);
                break;
            case 5:
                this.keyService.currentShape = this.shapeFactory.createTowerLeft([0.9, 0.7, 1.0]);
                break;
            case 6:
                this.keyService.currentShape = this.shapeFactory.createTowerRight([1.0, 0.2, 0]);
                break;
            case 7:
                this.keyService.currentShape = this.shapeFactory.createTripod([0.5, 0.9, 0.5]);
                break;
            default:
                this.keyService.currentShape = this.shapeFactory.createL();
                break;
        }
        this.keyService.currentShape.translate([this.grid.size * 2, 5 * this.grid.size, 3 * this.grid.size]);
        this.keyService.currentShape.globalRotation = this.globalRotation;

        this.shapes.push(this.keyService.currentShape);
    }

    // Time from last frame
    then = 0;

    render(now) {
        // calculate time per frame in seconds
        let delta = now - this.then;
        delta *= 0.01;
        this.then = now;

        this.shapes.forEach(shape => {
            shape.draw();
        });

        if (!isPaused) {
        if(this.keyService.currentShape) {
            if (!this.grid.checkOccupation(this.keyService.currentShape)) {
                this.keyService.currentShape.translate([0, movingFast ? -delta : -0.01, 0]);
            } else {
                if (this.grid.occupy(this.keyService.currentShape)) {
                    isPaused = true;
                    this.keyService.currentShape = null;
                } else {
                    this.spawnObject();
                }
            }
        }
        }
    }

    async loadObject(name, scaleFactor = 1) {
        const data = await fetch(name).then(result => result.text());
        let teapotData = parseOBJ(data, scaleFactor);
    
        const teapot = new Shape();
        let colors = [];
        for (let i = 0; i < teapotData.position.length / 3; i++) {
            colors.push([1.0, 0, 0.0]);
        }
    
        teapot.initData(teapotData.position, colors, teapotData.normal);
    
        return teapot;
    }

    getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
        // The maximum is exclusive and the minimum is inclusive
      }

    rotateGlobally(x, y, z = 0) {
        
        this.shapes.forEach(shape => {
            shape.rotate(x, [0, 1, 0], true);
            shape.rotate(y, [1, 0, 0], true);
            shape.rotate(z, [0, 0, 1], true);
        })
        
        let newRotation = mat4.create();
        mat4.fromRotation(newRotation, x, [0, 1, 0]);
        mat4.mul(this.globalRotation, newRotation, this.globalRotation);

        mat4.fromRotation(newRotation, y, [1, 0, 0]);
        mat4.mul(this.globalRotation, newRotation, this.globalRotation);

        mat4.fromRotation(newRotation, z, [0, 0, 1]);
        mat4.mul(this.globalRotation, newRotation, this.globalRotation);
    }
}