export interface IObjectRaycastEvent {
    name: string;
    isMouseOver?: boolean;
    onMouseOver: (intersects: THREE.Intersection<THREE.Object3D<THREE.Event>>) => void;
    onMouseExit?: () => void;
    onClick?: void;
}