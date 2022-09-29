import EventEmitter from './EventEmitter'
import { Stats } from "stats.ts"
import * as THREE from 'three';

export default class Time extends EventEmitter {
    private start: number;
    public current: number;
    public elapsed = 0;
    public delta = 0;
    public cumulative = 0;

    stats: Stats;
    clock = new THREE.Clock()

    constructor() {
        super();

        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom 
        document.body.appendChild(this.stats.dom);

        // Setup
        this.start = Date.now();
        this.current = this.start;
        window.requestAnimationFrame(() => this.tick());
    }

    tick() {
        this.stats.begin();

        this.elapsed = this.clock.getElapsedTime();
        this.delta = this.elapsed - this.current;
        this.current = this.elapsed;
        this.cumulative += this.delta;

        this.trigger('tick');

        this.stats.end();
        window.requestAnimationFrame(() => this.tick());
    }
}