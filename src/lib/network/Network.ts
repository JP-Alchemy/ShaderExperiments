import { io, Socket } from "socket.io-client";
import { environment } from "../environments/environment";

export class Network {

    // public socket: Socket;

    constructor() {
        // this.socket = io(environment.socket_endpoint);

        // this.socket.on("connect", () => {
        //     console.log("connected", this.socket.id);
        // });

        // this.socket.on('exception', (data) => {
        //     console.error('exception', data);
        // });

        // this.socket.on("disconnect", () => {
        //     console.error("disconnected", this.socket.id); // undefined
        // });

        // this.socket.on('events', (data) => {
        //     console.info('event', data);
        // });
    }

    // ping server response time
    ping() {
        // this.socket.emit('ping', { client_time: Date.now() }, (response: any) => {
        //     let now = Date.now();
        //     response.client_rec = now - response.server_time;
        //     response.total = now - response.client_time;
        //     console.log('R - ping:', response);
        // });
    }

    InitializeServer() {
    }

    emitAsync<T>(emit: string, data?: any) {
        // return new Promise<T>((resolve, reject) => {
        //     this.socket.emit(emit, data, (response: T) => {
        //         resolve(response);
        //     });
        // });
    }
}