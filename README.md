# 3D Tetris

3D tetris realisation using WebGL. Not a real game, just rendering and collision detection.

You can enable different shading using "e", "r" and "t". Also, you can enable object's frames using "G" for better distinguishing of objects.

Known issue:

With some tetracubes, if you move them at the last second before grounding, they can stack one in another.

## Tested environments

Visual Studio Code (1.87.2 (Universal)) with Preview on Web Server and WebGL GLSL Editor plugins. Google Chrome (Version 123.0.6312.59). Mac OS Sonoma 14.2.1 on Macbook Pro M3 Max (ARM based).

## Additional and general remarks

GridObject.js is for showing the grid and handling collisions. 