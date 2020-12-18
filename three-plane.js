const createPlane = (params) => {
  const geometry = new THREE.PlaneGeometry(params.size.x,params.size.y);
  const material = new THREE.MeshBasicMaterial(params.matParams);
  const plane = new THREE.Mesh(geometry, material);
  // plane.rotation.x = -Math.PI/2;
  plane.position.x = params.position.x;
  plane.position.y = params.position.y;
  plane.position.z = params.position.z;
  plane.rotation = params.rotation;

  return plane;
}
