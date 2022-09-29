import EventEmitter from "./EventEmitter";
import * as THREE from 'three';
import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AssetType, type IAssetData } from "../assets/sources";
import { Application } from "$lib/Application";

export default class Resources extends EventEmitter {
    
    private sources: IAssetData[];
    private toLoad: number;
    private loaded: number;
    private loaders: Loaders = new Loaders();
    private app: Application;
    private rerun = false;
    
    public items: { [name: string]: GLTF | THREE.Texture | THREE.CubeTexture | AudioBuffer };
    
    constructor(sources: IAssetData[]) {
        super();

        this.app = new Application();
        this.sources = sources;

        // Setup
        this.items = {};
        this.toLoad = this.sources.length;
        this.loaded = 0;

        if(this.toLoad === 0) this.Ready();
        else this.StartLoading();
    }

    async StartLoading() {
        // Load each source
        for (const source of this.sources) {
            if (source.type === AssetType.gltfModel) {
                let file = await this.loaders.gltfLoader.loadAsync(source.path as any);
                this.SourceLoaded(source, file);
            }
            else if (source.type === AssetType.texture) {
                let file = await this.loaders.textureLoader.loadAsync(source.path as any);
                this.SourceLoaded(source, file);
            }
            else if (source.type === AssetType.cubeTexture) {
                let file = await this.loaders.cubeTextureLoader.loadAsync(source.path as any);
                this.SourceLoaded(source, file);
            }
            else if (source.type === AssetType.audio) {
                let file = await this.loaders.audioLoader.loadAsync(source.path as string);
                this.SourceLoaded(source, file);
            }
        }
    }

    Ready() {
        if(this.app.isLoaded) this.trigger('ready');
        else this.rerun = true;
    }

    SourceLoaded(source: IAssetData, file: GLTF | THREE.Texture | THREE.CubeTexture | AudioBuffer) {
        this.items[source.name] = file;
        this.loaded++;
        if (this.loaded === this.toLoad) this.Ready();
    }

    ApplicationLoaded() {
        if(this.rerun) this.Ready();
    }
}

export class Loaders {
    public gltfLoader: GLTFLoader = new GLTFLoader;
    public textureLoader: THREE.TextureLoader = new THREE.TextureLoader;
    public cubeTextureLoader: THREE.CubeTextureLoader = new THREE.CubeTextureLoader;
    public audioLoader = new THREE.AudioLoader;
}