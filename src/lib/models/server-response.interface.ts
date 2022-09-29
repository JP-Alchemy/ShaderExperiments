export interface IServerResponse<t = any> {
    success: boolean;
    refreshToken?: boolean;
    msg?: string;
    link?: string;
    data: t;
    error?: any;
}