export enum AssetType {
    gltfModel='gltfModel',
    cubeTexture='cubeTexture',
    texture='texture',
    audio='audio'
}

export default [] as IAssetData[];

export interface IAssetData {
    name: string;
    type: AssetType;
    path: string[] | string;
}