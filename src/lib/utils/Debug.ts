import * as dat from 'lil-gui';

export default class Debug
{
    public active: boolean;
    public ui!: dat.GUI;

    constructor()
    {
        this.active = window.location.hash === '#debug';

        if(this.active) {
            this.ui = new dat.GUI()
        }

    }
    
    Destroy() {
        if(this.active) this.ui.destroy();
    }
}