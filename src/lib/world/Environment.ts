import type GUI from 'lil-gui';
import * as THREE from 'three';
import { Application } from '../Application';
import World from './World';

export default class Environment {
    public app: Application;
    public sunLight!: THREE.DirectionalLight;
    environmentMap!: EnvironmentMap;
    debugFolder!: GUI;

    constructor() {
        this.app = new Application();

        // Setup
        this.setSunLight();
        // this.setEnvironmentMap();

        if (this.app.debug.active) {
            this.debugFolder = this.app.debug.ui.addFolder('environment');
        }
    }

    setSunLight() {
        this.sunLight = new THREE.DirectionalLight('#FFD49D', 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.radius = 8;
        this.sunLight.shadow.camera.far = 20 * 10;
        this.sunLight.shadow.camera.left = -20;
        this.sunLight.shadow.camera.right = 20;
        this.sunLight.shadow.camera.top = -20;
        this.sunLight.shadow.camera.bottom = 20;
        this.sunLight.shadow.mapSize.set(1024, 1024);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(10, 10, 10);

        this.app.scene.add(this.sunLight, this.sunLight.target);

        const light = new THREE.AmbientLight(0xd7f0ff, 0.3); // blue light
        this.app.scene.add(light);

        if (this.app.debug.active) {
            const axisHelper = new THREE.AxesHelper(3);
            // const gridHelper = new THREE.GridHelper(20 * 10, 20);
            // const camHelper = new THREE.CameraHelper(this.sunLight.shadow.camera);
            this.app.scene.add(axisHelper);
        }
    }

    setEnvironmentMap() {
        this.environmentMap = new EnvironmentMap(this.app.resources.items.environmentMapTexture as THREE.CubeTexture, 0.25);
        this.environmentMap.updateMaterials();
    }
}

class EnvironmentMap {
    private app: Application;

    public intensity: number;
    public texture: THREE.Texture;

    constructor(environmentMapTexture: THREE.Texture | THREE.CubeTexture, intensity: number) {
        this.intensity = intensity;
        this.app = new Application();
        this.texture = environmentMapTexture;

        this.texture.encoding = THREE.sRGBEncoding;
        this.app.scene.environment = this.texture;
    }

    public updateMaterials() {
        this.app.scene.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                child.material.envMap = this.texture;
                child.material.envMapIntensity = this.intensity;
                child.material.needsUpdate = true;
            }
        });
    };
}