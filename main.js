"use strict";

let THREECAMERA = null;

// callback: launched if a face is detected or lost.
function detect_callback(faceIndex, isDetected) {
  if (isDetected) {
    console.log('INFO in detect_callback(): DETECTED');
  } else {
    console.log('INFO in detect_callback(): LOST');
  }
}

// build the 3D. called once when Jeeliz Face Filter is OK
function init_threeScene(spec) {
  const threeStuffs = JeelizThreeHelper.init(spec, detect_callback);

   // CREATE A CUBE
  // const cubeGeometry = new THREE.BoxGeometry(1,1,1);
  // const cubeMaterial = new THREE.MeshNormalMaterial();
  // const threeCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  // threeCube.frustumCulled = false;
  // threeStuffs.faceObject.add(threeCube);

  const loader = new THREE.TextureLoader();
  loader.load(
    './images/logo.png',
    (texture) => {
      const leftGlass = createCircle({
        matParams: {
          map: texture,
          side: THREE.DoubleSide
        },
        position: { x: -0.32, y: 0.21, z: 0.5 },
        radius: 0.2
      });
      leftGlass.frustumCulled = false;
      threeStuffs.faceObject.add(leftGlass);

      const rightGlass = createCircle({
        matParams: {
          map: texture,
          side: THREE.DoubleSide
        },
        position: { x: 0.34, y: 0.21, z: 0.5 },
        radius: 0.2
      });
      rightGlass.frustumCulled = false;
      threeStuffs.faceObject.add(rightGlass);
    },
    //onProgress
    undefined,
    // onError callback
   (err) => {
      console.error( 'An error happened.' );
    }
  );

  loader.load(
    './images/beard4.png',
    (texture) => {
      const beard = createPlane({
        matParams: {
          map: texture,
          side: THREE.DoubleSide,
          transparent: true
        },
        position: { x: 0, y: 0.9, z: 0.4 },
        rotation: { x:90, y:0.4, z:0 },
        size: {x:1.6, y:1.6}
      });
      beard.frustumCulled = false;
      beard.name = "beard";
      threeStuffs.faceObject.add(beard);
    },
    //onProgress
    undefined,
    // onError callback
   (err) => {
      console.error( 'An error happened.' );
    }
  );

  createGltf(threeStuffs, 0.13);

  // const invisiblePlane = createPlane({
  //   matParams: {colorWrite: false},
  //   position: { x:0, y:0.5, z:0.3 },
  //   rotation: { x:0, y:0, z:0 },
  //   size: {x:1, y:3}
  // });
  // invisiblePlane.frustumCulled = false;
  // threeStuffs.faceObject.add(invisiblePlane);

  const hatFliter = document.querySelector(".filter-hat");
  const beardFliter = document.querySelector(".filter-beard");

  hatFliter.addEventListener("click", (event) => {
    const beardObject = threeStuffs.faceObject.getObjectByName("beard");
    event.preventDefault();
    loader.load(
      './images/beard4.png',
      (texture) => {
        beardObject.material.map = texture;
        beardObject.position.x = 0;
        beardObject.position.y = 0.9;
        beardObject.position.z = 0.4;
      })
  });

  beardFliter.addEventListener("click", (event) => {
    event.preventDefault();
    const beardObject = threeStuffs.faceObject.getObjectByName("beard");
    loader.load(
      './images/beard3.png',
      (texture) => {
        threeStuffs.faceObject.getObjectByName("beard").material.map = texture;
        beardObject.material.map = texture;
        beardObject.position.x = -0.05;
        beardObject.position.y = -0.55;
        beardObject.position.z = 0.4;
      })
  });
  //CREATE THE CAMERA
  THREECAMERA = JeelizThreeHelper.create_camera();
} // end init_threeScene()

// launched by body.onload():
function main(){
  JeelizResizer.size_canvas({
    canvasId: 'jeeFaceFilterCanvas',
    callback: function(isError, bestVideoSettings){
      init_faceFilter(bestVideoSettings);
    }
  })
}

function init_faceFilter(videoSettings){
  JEEFACEFILTERAPI.init({
    followZRot: true,
    canvasId: 'jeeFaceFilterCanvas',
    NNCPath: './lib/neuralNets/', // root of NN_DEFAULT.json file
    maxFacesDetected: 1,
    callbackReady: function(errCode, spec){
      if (errCode){
        console.log('AN ERROR HAPPENS. ERR =', errCode);
        return;
      }

      console.log('INFO: JEEFACEFILTERAPI IS READY');
      init_threeScene(spec);
    },

    // called at each render iteration (drawing loop):
    callbackTrack: function(detectState){
      JeelizThreeHelper.render(detectState, THREECAMERA);
    }
  }); //end JEEFACEFILTERAPI.init call
}

const captureBtn = document.querySelector(".capture-btn");
const captureImg = document.querySelector(".capture-img");
const captureMeta = document.querySelector(".capture-meta");
const arCanvas = document.querySelector(".ar-canvas");
const shareFb = document.querySelector(".share-fb");

captureBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let pngUrl = arCanvas.toDataURL(); // png in dataURL format
  const downloadLink = document.createElement("A");
  downloadLink.innerText = "Download";
  downloadLink.href = pngUrl;
  downloadLink.download = "lewagon-xmas.png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();
})
