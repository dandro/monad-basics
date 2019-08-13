function makeSlice(radius, x, y, z) {
  const geometry = new THREE.OctahedronBufferGeometry(radius);
  const meshed = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xC1F546 }));
  geometry.translate(x, y, z);
  return { meshed, geometry };
}

function initCanvas() {
  const canvas = document.getElementById('canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 10;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 10;

  const scene = new THREE.Scene();

  // const material = new THREE.MeshPhongMaterial({ color: 0xC1F546 });
  // const shape = new THREE.Shape();
  //
  // const x = -10;
  // const y = -8;
  //
  // shape.moveTo(x, y);
  // shape.lineTo(x + 0.5, y + 0.5);
  // shape.lineTo(x + 0.5, y + 1.5);
  // shape.bezierCurveTo(x + 0.5, y + 1.5, x + 0.7, y + 2.5, x + 2 , y + 2.5);
  // shape.lineTo(x + 2.5, y);
  // shape.bezierCurveTo(x + 2 , y + 2.5, x + 0.7, y + 1.5, x + 1 , y + 3.5);
  // shape.bezierCurveTo(x + 1 , y + 3.5, x + 1, y + 2.5, x + 2.5 , y + 3.5);
  // shape.lineTo(x + 0.5, y);
  // const geometry = new THREE.ExtrudeGeometry(shape, {
  //   amount: 0.2,
  //   bevelEnabled: true,
  //   bevelSegments: 5,
  //   steps: 2,
  //   bevelSize: 0.5,
  //   bevelThickness: 0.5
  // });
  // const meshed = new THREE.Mesh(geometry, material);
  // scene.add(meshed);

  const Y = -5;
  const { geometry: g_one, meshed: m_one } = makeSlice(2, -8, Y, -1);
  // const bottomTwo = makeSlice(1, -8, Y, -1);

  // scene.add(bottomTwo);
  scene.add(m_one);

  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 13);
  scene.add(light);

  const min = -1;
  const max = 5;
  let cur = min;
  let dir = 'up';

  function animate(time) {
    // if (dir === 'up') {
    //   const nextCur = cur + 0.01;
    //   light.position.set(-1, 2, nextCur);
    //   cur = nextCur;
    //   if (cur > max) dir = 'down';
    // } else {
    //   const nextCur = cur - 0.01;
    //   light.position.set(-1, 2, nextCur);
    //   cur = nextCur;
    //   if (cur < min) dir = 'up';
    // }

    let nextY = 0.005;
    // g_one.position = new THREE.Vector3(-8, nextY, -1);
    g_one.rotateY(nextY);
    g_one.rotateX(nextY);

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
