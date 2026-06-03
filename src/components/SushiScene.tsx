import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import type { GLTF } from 'three/addons/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PIECE_COUNT   = 6;
const MODEL_SIZE    = 1.7;
const STACK_SPACING = 1.35;

const gltfLoader = new GLTFLoader();
let cachedGltf: GLTF | null = null;
let loadPromise: Promise<void> | null = null;

export function preloadSushiModel(): void {
  if (cachedGltf || loadPromise) return;
  loadPromise = gltfLoader
    .loadAsync('/sushi3d.glb')
    .then((g) => { cachedGltf = g; })
    .catch(() => {});
}

function makeFallback(): THREE.Mesh {
  const geo = new THREE.CylinderGeometry(0.84, 0.84, 0.22, 64);
  const mat = new THREE.MeshStandardMaterial({ color: 0x1a2e24, roughness: 0.65, metalness: 0.08 });
  const m   = new THREE.Mesh(geo, mat);
  m.frustumCulled = false;
  return m;
}

function buildWrapper(gltf: GLTF): THREE.Group {
  const wrapper = new THREE.Group();
  const model   = gltf.scene.clone(true);
  const box     = new THREE.Box3().setFromObject(model);
  const size    = box.getSize(new THREE.Vector3());
  const maxDim  = Math.max(size.x, size.y, size.z) || 1;
  const s       = MODEL_SIZE / maxDim;
  const center  = box.getCenter(new THREE.Vector3());
  model.scale.setScalar(s);
  model.position.set(-center.x * s, -center.y * s, -center.z * s);
  model.traverse((child) => { child.frustumCulled = false; });
  wrapper.add(model);
  return wrapper;
}

const SCATTER_X  = [ 1.1, -0.95,  0.65, -1.25,  0.80, -0.50];
const SCATTER_RX = [ 0.60, -0.40,  0.50, -0.55,  0.35, -0.45];
const SCATTER_RY = [ 0.00,  1.80,  0.90,  2.70,  3.60,  4.50];
const SCATTER_RZ = [ 0.45, -0.30,  0.50, -0.25,  0.30, -0.40];

interface Props {
  triggerRef: React.RefObject<HTMLElement | null>;
}

export default function SushiScene({ triggerRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // mobile detection (evaluated once on mount)
    const isMobile      = window.innerWidth < 680;
    const pieceCount    = isMobile ? 4 : PIECE_COUNT;
    const stackSpacing  = isMobile ? 0.95 : STACK_SPACING;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch { return; }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1 : 2));

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(isMobile ? 46 : 36, 1, 0.1, 100);
    camera.position.set(0, 0.5, 12);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xfff0e0, 0.9));
    const key  = new THREE.DirectionalLight(0xffead0, 2.6);
    key.position.set(3, 5, 4);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xe0eeff, 0.55);
    fill.position.set(-4, -2, 2);
    scene.add(fill);
    const rim  = new THREE.DirectionalLight(0xffe0f0, 0.35);
    rim.position.set(0, -4, -2);
    scene.add(rim);

    const fitCanvas = () => {
      const w = canvas.clientWidth  || 1;
      const h = canvas.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(fitCanvas);
    ro.observe(canvas);
    fitCanvas();

    const stackOffset = ((pieceCount - 1) * stackSpacing) / 2;
    const finalPos = Array.from({ length: pieceCount }, (_, i) => ({
      x: 0, y: i * stackSpacing - stackOffset, z: i * 0.015,
      rx: Math.PI / 2,
      ry: i % 2 === 0 ?  0.06 : -0.06,
      rz: i % 3 === 0 ?  0.04 : -0.03,
    }));

    const initPos = Array.from({ length: pieceCount }, (_, i) => ({
      x: SCATTER_X[i], y: 10.0 + i * 0.9, z: 0,
      rx: SCATTER_RX[i], ry: SCATTER_RY[i], rz: SCATTER_RZ[i],
    }));

    const pieces: THREE.Object3D[] = [];
    let rafId = 0;
    let stInstance: ScrollTrigger | null = null;

    const build = async () => {
      if (!cachedGltf && !loadPromise) preloadSushiModel();
      await loadPromise;

      for (let i = 0; i < pieceCount; i++) {
        const piece = cachedGltf ? buildWrapper(cachedGltf) : makeFallback();
        piece.position.set(initPos[i].x, initPos[i].y, initPos[i].z);
        piece.rotation.set(initPos[i].rx, initPos[i].ry, initPos[i].rz);
        scene.add(piece);
        pieces.push(piece);
      }

      const tl = gsap.timeline({ paused: true });
      pieces.forEach((piece, i) => {
        tl.fromTo(
          piece.position,
          { x: initPos[i].x, y: initPos[i].y, z: initPos[i].z },
          { x: finalPos[i].x, y: finalPos[i].y, z: finalPos[i].z, ease: 'power2.out', duration: 1 },
          i * 0.18,
        );
        tl.fromTo(
          piece.rotation,
          { x: initPos[i].rx, y: initPos[i].ry, z: initPos[i].rz },
          { x: finalPos[i].rx, y: finalPos[i].ry, z: finalPos[i].rz, ease: 'power2.out', duration: 1 },
          i * 0.18,
        );
      });

      if (triggerRef.current) {
        stInstance = ScrollTrigger.create({
          trigger: triggerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          animation: tl,
        });
      }

      const tick = () => {
        rafId = requestAnimationFrame(tick);
        renderer.render(scene, camera);
      };
      tick();
    };

    build();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      stInstance?.kill();
      renderer.dispose();
    };
  }, [triggerRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
