import { Application } from "../Application"
import Environment from "./Environment";
import type GUI from "lil-gui";
import * as THREE from 'three';
import { default_fragment_shader, default_vertex_shader } from "../shaders/default/default.s";

export default class World {
    private app: Application;

    environment!: Environment;
    isReady = false;
    debug!: GUI;
    uniforms: { [uniform: string]: THREE.IUniform<any>; } = {};

    constructor() {
        this.app = new Application();
        this.app.resources.on('ready', () => this.OnReady());

        if (this.app.debug.active) {
            this.debug = this.app.debug.ui.addFolder('world');
        }

    }

    async OnReady() {
        this.environment = new Environment();

        const geometry = new THREE.PlaneBufferGeometry(2, 2);

        console.log(this.app.screen.resolution);
        this.uniforms = {
            u_time: { value: 0.0 },
            u_resolution: { value: this.app.screen.resolution },
            u_mouse: { value: this.app.raycaster.mouse }
        };

        const material = new THREE.ShaderMaterial({
            vertexShader: default_vertex_shader,
            fragmentShader: default_fragment_shader,
            uniforms: this.uniforms
        });

        const mesh = new THREE.Mesh(geometry, material);

        this.app.scene.add(mesh);

        console.log("World Ready");
    }

    Update() {
        this.uniforms.u_time.value = this.app.time.clock.getDelta();
    }
}