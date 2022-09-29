import { Application } from "./Application";
import * as THREE from 'three';

export default class Renderer
{
    private app: Application;
    private instance!: THREE.WebGLRenderer;

    constructor()
    {
        this.app = new Application();
        this.setInstance();
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.app.canvas,
            antialias: true
        });
        this.instance.physicallyCorrectLights = true;
        this.instance.outputEncoding = THREE.sRGBEncoding;
        this.instance.toneMappingExposure = 1.75;
        this.instance.shadowMap.enabled = true;
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
        this.instance.setSize(this.app.screen.width, this.app.screen.height);
        this.instance.setClearColor('#707070');
        this.instance.setPixelRatio(Math.min(this.app.screen.pixelRatio, 2));
    }

    Resize()
    {
        this.instance.setSize(this.app.screen.width, this.app.screen.height);
        this.instance.setPixelRatio(Math.min(this.app.screen.pixelRatio, 2));
    }

    Update()
    {
        this.instance.render(this.app.scene, this.app.camera.instance);
    }

    Destroy() {
        this.instance.dispose();
    }
}