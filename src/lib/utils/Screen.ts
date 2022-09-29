import EventEmitter from "./EventEmitter";

export default class Screen extends EventEmitter
{
    public width: number;
    public height: number;
    public pixelRatio: number;

    constructor()
    {
        super();

        // Setup
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);

        window.addEventListener('resize', () => this.OnResize());
    }

    private OnResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);

        this.trigger('resize');
    }
}