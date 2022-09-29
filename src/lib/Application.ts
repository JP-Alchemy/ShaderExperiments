import Screen from "./utils/Screen";
import Time from "./utils/Time";
import Camera from "./Camera";
import * as THREE from 'three';
import Renderer from "./Renderer";
import World from "./world/World";
import Resources from "./utils/Resources";
import sources from "./assets/sources";
import Debug from "./utils/Debug";
import { Raycaster } from "./utils/Raycaster";
import { Network } from "./network/Network";

export class Application {

    private static Instance: Application;
    private renderer!: Renderer;
    public isLoaded = false;

    public time!: Time;
    public camera!: Camera;
    public canvas!: HTMLCanvasElement;
    public screen!: Screen;
    public scene!: THREE.Scene;
    public world!: World;
    public resources!: Resources;
    public debug!: Debug;
    public raycaster!: Raycaster;
    public network!: Network;

    constructor(canvas?: HTMLCanvasElement) {
        // Singleton
        if (Application.Instance) return Application.Instance;
        if(!canvas) throw new Error('Canvas needs to be defined initialy');
        Application.Instance = this;

        this.canvas = canvas;

        this.debug = new Debug();
        this.screen = new Screen();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.raycaster = new Raycaster();
        this.resources = new Resources(sources);
        this.network = new Network();

        // World should be last
        this.world = new World();

        this.screen.on('resize', () => this.OnResize());
        this.time.on('tick', () => this.OnUpdate());

        this.isLoaded = true;
        this.resources.ApplicationLoaded();
    }

    private OnResize() {
        this.camera.Resize();
        this.renderer.Resize();
        console.log('A resize occurred')
    }

    private OnUpdate() {
        this.camera.Update();
        this.renderer.Update();
        this.raycaster.Update();
        this.world.Update();
    }

    public destroy() {
        this.screen.off('resize');
        this.time.off('tick');

        // Traverse the whole scene
        this.scene.traverse((child) => {
            // Test if it's a mesh
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()

                // Loop through the material properties
                for (const key in child.material) {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if (value && typeof value.dispose === 'function') {
                        value.dispose()
                    }
                }
            }
        });

        this.camera.Destroy();
        this.renderer.Destroy();
        this.debug.Destroy();
    }
}