import { Application } from "../Application"
import Environment from "./Environment";
import type GUI from "lil-gui";
import * as THREE from 'three';
import { writable } from "svelte/store";

export default class World {
    private app: Application;

    environment!: Environment;
    isReady = false;
    debug!: GUI;

    constructor() {
        this.app = new Application();
        this.app.resources.on('ready', () => this.OnReady());

        if (this.app.debug.active) {
            this.debug = this.app.debug.ui.addFolder('world');
        }

    }

    async OnReady() {
        this.environment = new Environment();

        const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhysicalMaterial({ color: 0xFF0FFF }));
        cube.position.set(0,0,0);
        this.app.scene.add(cube);
        
        console.log("World Ready");
    }

    Update() {
    }
}