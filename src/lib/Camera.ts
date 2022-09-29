import { Application } from "./Application";
import * as THREE from 'three';
import type GUI from "lil-gui";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera {
    private app: Application;
    private cameraStartPos = new THREE.Vector3(0, 0, 3);

    public instance!: THREE.PerspectiveCamera;
    public raycaster = new THREE.Raycaster();
    public audioListener = new THREE.AudioListener();
    public controls!: OrbitControls;

    debugFolder!: GUI;

    constructor() {
        this.app = new Application();
        this.SetInstance();
    }

    private SetInstance() {
        let aspect = this.app.screen.width / this.app.screen.height;
        this.instance = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
        this.instance.position.set(this.cameraStartPos.x, this.cameraStartPos.y, this.cameraStartPos.z);
        this.instance.add(this.audioListener);
        this.app.scene.add(this.instance);

        this.controls = new OrbitControls(this.instance, this.app.canvas);
        this.controls.enableDamping = true;

        if (this.app.debug.active) {
            this.debugFolder = this.app.debug.ui.addFolder('camera');
            this.debugFolder.add(this.instance, 'far');
            this.debugFolder.add(this.instance, 'near');
            this.debugFolder.add(this.instance, 'fov');
        }
    }

    public Resize() {
        this.instance.aspect = this.app.screen.width / this.app.screen.height;
        this.instance.updateProjectionMatrix();
    }

    public Update() {
        this.controls.update();
    }

    public Destroy() {
    }
}