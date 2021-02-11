const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

/******* create scene function ******/

const createScene = function () {
  var scene = new BABYLON.Scene(engine);
  // clear colour is what colour is used to clear the render buffer
  scene.clearColor = new BABYLON.Color3(0.972, 0.847, 0.725);

  // arc rotate camera rotates around a central target
  var camera = new BABYLON.ArcRotateCamera(
    "camera1", //name
    0, //alpha
    0, // beta
    0, // radius
    new BABYLON.Vector3(10, -20, 0), //target
    scene // pass in scene
  );

  camera.setPosition(new BABYLON.Vector3(140, 70, -50));
  camera.attachControl(canvas, true);

  // like ambient light
  const light = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0.96, 0.86, 0.32),
    scene
  );
  light.intensity = 0.7;

  const pointLight1 = new BABYLON.PointLight(
    "pl",
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  pointLight1.diffuse = new BABYLON.Color3(1, 0.2, 0.8);
  pointLight1.specular = new BABYLON.Color3(1, 1, 0);
  pointLight1.intensity = 0.95;

  const pointLight2 = new BABYLON.PointLight(
    "p2",
    new BABYLON.Vector3(-100, -10, -100),
    scene
  );
  pointLight2.diffuse = new BABYLON.Color3(0, 0, 0.8);
  pointLight2.specular = new BABYLON.Color3(0, 0, 0.9);
  pointLight2.intensity = 0.95;

  const mat = new BABYLON.StandardMaterial("mat1", scene);
  mat.alpha = 1.0;
  mat.diffuseColor = new BABYLON.Color3(0.96, 0.86, 0.32);
  mat.backFaceCulling = false;
  //   mat.wireframe = true;

  // path function
  const pointsPerPath = 60;
  const createPath = function (zCoord) {
    const path = [];
    for (let pointIndex = 0; pointIndex < pointsPerPath; pointIndex++) {
      const x = pointIndex;
      const y = 1;
      const z = zCoord;
      path.push(new BABYLON.Vector3(x, y, z));
    }
    return path;
  };

  // update path function
  const updatePath = function (path, tick) {
    for (let pointIndex = 0; pointIndex < path.length; pointIndex++) {
      // keep x and y constant
      const x = path[pointIndex].x;
      const z = path[pointIndex].z;

      // y is a function of z and time
      const y = 20 * Math.sin(0.5) * Math.sin(tick + z / 5);
      path[pointIndex].x = x;
      path[pointIndex].y = y;
      path[pointIndex].z = z;
    }
  };

  // ribbon creation
  const pathArray = [];
  const numberOfPathsInRibbon = 100;
  const startZ = -numberOfPathsInRibbon / 2;
  const endZ = numberOfPathsInRibbon / 2;

  for (let zCoord = startZ; zCoord < endZ; zCoord++) {
    pathArray.push(createPath(zCoord));
  }

  let mesh = BABYLON.MeshBuilder.CreateRibbon(
    "ribbon",
    {
      pathArray,
      updatable: true,
      sideOrientation: BABYLON.Mesh.BACKSIDE,
    },
    scene
  );

  mesh.material = mat;

  // morphing
  var tick = 0;
  scene.registerBeforeRender(function () {
    // update pathArray
    for (let pathIndex = 0; pathIndex < pathArray.length; pathIndex++) {
      updatePath(pathArray[pathIndex], tick);
    }
    // ribbon update
    mesh = BABYLON.Mesh.CreateRibbon(
      null,
      pathArray,
      null,
      null,
      null,
      null,
      null,
      null,
      mesh
    );
    tick += 0.05;
    pointLight1.position = camera.position;
  });

  return scene;
};

/******* End of the create scene function ******/

var scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});
