const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

BABYLON.Effect.ShadersStore["myshaderVertexShader"] = `
precision highp float;

// Attributes
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

// Uniforms
uniform mat4 worldViewProjection;

// Varying
varying vec4 vPosition;
varying vec3 vNormal;

void main() {

    vec4 p = vec4( position, 1. );

    vPosition = p;
    vNormal = normal;

    gl_Position = worldViewProjection * p;

}`;

BABYLON.Effect.ShadersStore["myshaderFragmentShader"] = `
precision highp float;

uniform mat4 worldView;

varying vec4 vPosition;
varying vec3 vNormal;

uniform sampler2D textureSampler;
uniform sampler2D refSampler;

void main(void) {

    vec3 e = normalize( vec3( worldView * vPosition ) );
    vec3 n = normalize( worldView * vec4(vNormal, 0.0) ).xyz;

    vec3 r = reflect( e, n );
    float m = 2. * sqrt(
        pow( r.x, 2. ) +
        pow( r.y, 2. ) +
        pow( r.z + 1., 2. )
    );
    vec2 vN = r.xy / m + .5;

    vec3 base = texture2D( refSampler, vN).rgb;

    gl_FragColor = vec4( base, 1. );
}
`;

/******* create scene function ******/

const createScene = function () {
  var scene = new BABYLON.Scene(engine);
  // clear colour is what colour is used to clear the render buffer
  scene.clearColor = new BABYLON.Color3(0.972, 0.847, 0.725);

  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    3,
    new BABYLON.Vector3(0, 0, 0)
  );
  camera.attachControl(canvas, true);

  //   const mat = new BABYLON.StandardMaterial("mat1", scene);
  var shaderMaterial = new BABYLON.ShaderMaterial(
    "shader",
    scene,
    {
      vertexElement: "myshader",
      fragmentElement: "myshader",
    },
    {
      attributes: ["position", "normal", "uv"],
      uniforms: [
        "world",
        "worldView",
        "worldViewProjection",
        "view",
        "projection",
        "cameraPosition",
      ],
      needAlphaBlending: true,
    }
  );
  shaderMaterial.setFloat("time", 0);
  shaderMaterial.setVector3("cameraPosition", BABYLON.Vector3.Zero());
  shaderMaterial.backFaceCulling = false;

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
  box.material = shaderMaterial;
  //   mat.alpha = 1.0;
  //   mat.diffuseColor = new BABYLON.Color3(0.96, 0.86, 0.32);
  //   mat.backFaceCulling = false;
  //   mat.wireframe = true;

  //   // path function
  //   const pointsPerPath = 60;
  //   const createPath = function (zCoord) {
  //     const path = [];
  //     for (let pointIndex = 0; pointIndex < pointsPerPath; pointIndex++) {
  //       const x = pointIndex;
  //       const y = 1;
  //       const z = zCoord;
  //       path.push(new BABYLON.Vector3(x, y, z));
  //     }
  //     return path;
  //   };

  //   // update path function
  //   const updatePath = function (path, tick) {
  //     for (let pointIndex = 0; pointIndex < path.length; pointIndex++) {
  //       // keep x and y constant
  //       const x = path[pointIndex].x;
  //       const z = path[pointIndex].z;

  //       // y is a function of z and time
  //       const y = 20 * Math.sin(0.5) * Math.sin(tick + z / 5);
  //       path[pointIndex].x = x;
  //       path[pointIndex].y = y;
  //       path[pointIndex].z = z;
  //     }
  //   };

  //   // ribbon creation
  //   const pathArray = [];
  //   const numberOfPathsInRibbon = 100;
  //   const startZ = -numberOfPathsInRibbon / 2;
  //   const endZ = numberOfPathsInRibbon / 2;

  //   for (let zCoord = startZ; zCoord < endZ; zCoord++) {
  //     pathArray.push(createPath(zCoord));
  //   }

  //   let mesh = BABYLON.MeshBuilder.CreateRibbon(
  //     "ribbon",
  //     {
  //       pathArray,
  //       updatable: true,
  //       sideOrientation: BABYLON.Mesh.BACKSIDE,
  //     },
  //     scene
  //   );

  //   mesh.material = shaderMaterial;

  // morphing
  var tick = 0;
  scene.registerBeforeRender(function () {
    // update pathArray
    // for (let pathIndex = 0; pathIndex < pathArray.length; pathIndex++) {
    //   updatePath(pathArray[pathIndex], tick);
    // }
    // // ribbon update
    // mesh = BABYLON.Mesh.CreateRibbon(
    //   null,
    //   pathArray,
    //   null,
    //   null,
    //   null,
    //   null,
    //   null,
    //   null,
    //   mesh
    // );
    // tick += 0.05;
    // pointLight1.position = camera.position;
  });

  return scene;
};

/******* End of the create scene function ******/

var scene = createScene(); //Call the createScene function
var time = 0;

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  var shaderMaterial = scene.getMaterialByName("shader");
  shaderMaterial.setFloat("u_time", time);

  time += 0.02;

  //   shaderMaterial.setVector3("cameraPosition", scene.activeCamera.position);
  scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});
