import { Application } from "../Application"
import Environment from "./Environment";
import type GUI from "lil-gui";
import * as THREE from 'three';
import { default_fragment_shader, default_vertex_shader } from "../shaders/default/default.s";
import { hw_fragment_shader } from "$lib/shaders/chapter_05/default.s";
import { chp_6_f } from "$lib/shaders/chapter_06/sunset/default.s";
import { chp_6_SpinHSB_f } from "$lib/shaders/chapter_06/spinHSB/default.s";
import { chp_7_box_f } from "$lib/shaders/chapter_07/box/default.s";
import { chp_7_cirlce_f } from "$lib/shaders/chapter_07/circle/default.s";
import { chp_7_shapes_f } from "$lib/shaders/chapter_07/shapes/default.s";

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

        this.uniforms = {
            u_time: { value: 1.0 },
            u_resolution: { value: this.app.screen.resolution },
            u_mouse: { value: this.app.raycaster.mouse }
        };

        const material = new THREE.ShaderMaterial({
            vertexShader: default_vertex_shader,
            fragmentShader: chp_7_shapes_f,
            uniforms: this.uniforms
        });

        const mesh = new THREE.Mesh(geometry, material);

        this.app.scene.add(mesh);

        console.log("World Ready");
    }

    Update() {
        this.uniforms.u_time.value += this.app.time.clock.getDelta();
    }
}