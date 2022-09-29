import EventEmitter from "./EventEmitter";
import * as THREE from 'three';

export default class Screen extends EventEmitter
{

    public resolution: THREE.Vector2;
    public width: number;
    public height: number;
    public pixelRatio: number;

    constructor()
    {
        super();

        // Setup
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.resolution = new THREE.Vector2(this.width, this.height);
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);

        window.addEventListener('resize', () => this.OnResize());
    }

    private OnResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);
        this.resolution = new THREE.Vector2(this.width, this.height);

        this.trigger('resize');
    }
}