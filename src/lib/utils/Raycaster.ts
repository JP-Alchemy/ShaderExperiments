import * as THREE from 'three';
import { Application } from '../Application';
import type { IObjectRaycastEvent } from '$lib/models/ObjectRaycast.interface';

export class Raycaster {
    private app!: Application;
    private raycastObjectsEvents: { [name: string]: IObjectRaycastEvent } = {};
    private cursor: HTMLElement;
    // TODO: Seperate out the Cursor logic in it's own class instance
    private rotateCursor: string = '';
    
    public raycastObjects: THREE.Object3D<THREE.Event>[] = [];
    public mouse = new THREE.Vector2();
    public instance = new THREE.Raycaster();
    public isMouseActive = false;

    constructor() {
        this.app = new Application();
        window.addEventListener('mousemove', (e) => this.OnMouseMove(e));
        this.cursor = document.querySelector('.rounded') as HTMLElement;
    }

    public AddRaycastObject(object: THREE.Object3D<THREE.Event>, data: IObjectRaycastEvent) {
        this.raycastObjects.push(object);
        this.raycastObjectsEvents[data.name] = data;
    }

    public OnMouseMove(e: MouseEvent) {
        this.mouse.x = e.clientX / this.app.screen.width * 2 - 1;
        this.mouse.y = -(e.clientY / this.app.screen.height) * 2 + 1;
        this.cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) ${this.rotateCursor}`;
        this.isMouseActive = true;
    }

    public Update() {
        if (!this.isMouseActive) return;
    }
}