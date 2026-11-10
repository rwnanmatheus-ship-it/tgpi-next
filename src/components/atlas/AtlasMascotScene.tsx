'use client';

import { useEffect, useRef } from 'react';
import {
  ACESFilmicToneMapping, AnimationMixer, Box3, DirectionalLight, Group, HemisphereLight, LoopOnce, Mesh,
  OrthographicCamera, PMREMGenerator, Scene, Vector3, WebGLRenderer, type AnimationAction,
} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import type { AtlasPose } from './AtlasMascot';
import styles from './mascot.module.css';

function disposeModel(model: Group) {
  model.traverse(object => {
    if (!(object instanceof Mesh)) return;
    object.geometry.dispose();
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) material.dispose();
  });
}

export default function AtlasMascotScene({ pose, compact, onReady }: {
  pose: AtlasPose; compact: boolean; onReady: (ready: boolean) => void;
}) {
  const host = useRef<HTMLSpanElement>(null);
  const desired = useRef(pose);

  useEffect(() => { desired.current = pose; }, [pose]);

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    onReady(false);
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: !compact, powerPreference: 'low-power' });
    } catch { return; }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, compact ? 1.5 : 1.7));
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.17;
    container.appendChild(renderer.domElement);

    const scene = new Scene();
    const room = new RoomEnvironment();
    const pmrem = new PMREMGenerator(renderer);
    const environment = pmrem.fromScene(room, .12);
    scene.environment = environment.texture;
    scene.environmentIntensity = .78;
    room.dispose();
    pmrem.dispose();

    const light = new HemisphereLight(0xf2e3cc, 0x263d76, 2);
    scene.add(light);
    const key = new DirectionalLight(0xffdbad, 2.9);
    key.position.set(-3, 5, 7);
    scene.add(key);
    const edge = new DirectionalLight(0x599eff, 2.3);
    edge.position.set(4, 2, -3);
    scene.add(edge);

    const camera = new OrthographicCamera(-1, 1, 1, -1, .1, 30);
    camera.position.set(.18, .24, 8);
    camera.lookAt(0, 0, 0);

    let closed = false;
    let frame = 0;
    let model: Group | undefined;
    let mixer: AnimationMixer | undefined;
    let size = 1.78;
    let target = 0;
    const actions = new Map<string, AnimationAction>();
    let current: AnimationAction | undefined;
    let currentPose: AtlasPose | undefined;
    let lastTime = 0;

    function resize() {
      if (!container) return;
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      const aspect = width / height;
      const halfHeight = size * Math.max(1, 1 / aspect);
      camera.left = -halfHeight * aspect;
      camera.right = halfHeight * aspect;
      camera.top = halfHeight;
      camera.bottom = -halfHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    function play(name: AtlasPose) {
      const next = actions.get(name) ?? actions.get('Idle');
      if (!next || next === current) return;
      current?.fadeOut(.22);
      next.reset().setEffectiveWeight(1).fadeIn(.22).play();
      current = next;
    }

    function draw(now: number) {
      if (closed || !model || !mixer) return;
      const delta = Math.min(lastTime ? (now - lastTime) / 1000 : 0, .05);
      lastTime = now;
      if (desired.current !== currentPose) {
        currentPose = desired.current;
        play(currentPose);
      }
      model.rotation.y += (target - model.rotation.y) * .055;
      mixer.update(delta);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(draw);
    }

    function point(event: PointerEvent) {
      if (compact || event.pointerType !== 'mouse' || !container) return;
      const rect = container.getBoundingClientRect();
      target = ((event.clientX - rect.left) / rect.width - .5) * .55;
    }
    function reset() { target = 0; }
    function lost() { cancelAnimationFrame(frame); onReady(false); }
    container.addEventListener('pointermove', point);
    container.addEventListener('pointerleave', reset);
    renderer.domElement.addEventListener('webglcontextlost', lost);

    const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
    loader.load('/brand/atlas/owl-articulated.glb', gltf => {
      if (closed) { disposeModel(gltf.scene); return; }
      model = new Group();
      const bounds = new Box3().setFromObject(gltf.scene);
      gltf.scene.position.sub(bounds.getCenter(new Vector3()));
      size = Math.max(bounds.getSize(new Vector3()).x, bounds.getSize(new Vector3()).y) * .56;
      model.add(gltf.scene);
      scene.add(model);
      mixer = new AnimationMixer(gltf.scene);
      for (const clip of gltf.animations) {
        const action = mixer.clipAction(clip);
        if (clip.name === 'Invite') {
          action.setLoop(LoopOnce, 1);
          action.clampWhenFinished = true;
        }
        actions.set(clip.name, action);
      }
      mixer.addEventListener('finished', () => play('Idle'));
      resize();
      draw(performance.now());
      onReady(true);
    }, undefined, () => onReady(false));

    return () => {
      closed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      container.removeEventListener('pointermove', point);
      container.removeEventListener('pointerleave', reset);
      renderer.domElement.removeEventListener('webglcontextlost', lost);
      mixer?.stopAllAction();
      if (model) disposeModel(model);
      environment.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [compact, onReady]);

  return <span ref={host} className={styles.stage} />;
}
