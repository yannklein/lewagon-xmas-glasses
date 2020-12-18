const createGltf = (scene, size) => {
  // Instantiate a loader
  var loader = new THREE.GLTFLoader();

  // Load a glTF resource
  loader.load(
    // resource URL
    'images/glasses/scene.gltf',
    // called when the resource is loaded
    (gltf) => {

      // scene.add( gltf.scene );
      const gltfObj = gltf.scene;
      gltfObj.scale.multiplyScalar(size);
      gltfObj.frustumCulled = false;
      scene.faceObject.add(gltfObj);
      gltfObj.position.z = -0.1;

      // gltf.animations; // Array<THREE.AnimationClip>
      // gltf.scene; // THREE.Group
      // gltf.scenes; // Array<THREE.Group>
      // gltf.cameras; // Array<THREE.Camera>
      // gltf.asset; // Object
    },
    // called while loading is progressing
    (xhr) => {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    (error) => {
      console.log( 'An error happened' );
    }
  );
}
