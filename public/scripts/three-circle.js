const createCircle = (
  params = {
    matParams: {color: 0xffff00, side: THREE.DoubleSide},
    position: { x:0, y:0, z:0 },
    rotation: { x:0, y:0, z:0 },
    radius: 1
  }) => {
  const geometry = new THREE.CircleBufferGeometry( params.radius, 32 );
  const material = new THREE.MeshBasicMaterial( params.matParams );
  const circle = new THREE.Mesh( geometry, material );

  if(params.position) {
    circle.translateX(params.position.x);
    circle.translateY(params.position.y);
    circle.translateZ(params.position.z);
  }

  if(params.rotation) {
    circle.rotateX(params.rotation.x);
    circle.rotateY(params.rotation.y);
    circle.rotateZ(params.rotation.z);
  }

  console.log(circle.rotation);
  return circle;
};
